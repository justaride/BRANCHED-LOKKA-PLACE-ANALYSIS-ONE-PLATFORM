import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Geokoder aktøradresser mot Kartverkets offisielle adresseregister
 * (Geonorge adresse-API). Dette gir eksakt bygningskoordinat for hver
 * offisielle norske adresse — i motsetning til Nominatim, som ofte faller
 * tilbake til gate-/områdesenter og dermed plasserer markører i parker
 * eller midt i kvartaler.
 *
 * Kjør: node scripts/geocode-actors.mjs
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const aktorerDir = resolve(__dirname, '../src/data/main-board/aktorer');
const outPath = resolve(aktorerDir, '2025-arsrapport-coordinates.json');

// Alle aktørfiler som bruker den delte koordinatfila.
const AKTOR_FILES = [
  '2025-arsrapport.json',
  '2024-arsrapport.json',
  'midt-i-markveien.json',
  'nederst-i-markveien.json',
  'nedre-thorvald-meyers-gate.json',
  'ovre-thorvald-meyers-gate.json',
  'olaf-ryes-plass-7eleven.json',
  'olaf-ryes-plass-boots.json',
  'markveien-35.json',
];

const KOMMUNENUMMER_OSLO = '0301';

// Adresser som ikke er reelle gateadresser (holdingselskap o.l.) — hoppes over.
const SKIP_ADDRESSES = new Set(['OSLO']);

/** Deler "OLAF RYES PLASS 5 A" → { adressenavn, nummer, bokstav }. */
function parseAddress(raw) {
  const match = raw.trim().match(/^(.+?)\s+(\d+)\s*([A-Za-z])?$/);
  if (!match) return null;
  return {
    adressenavn: match[1].trim(),
    nummer: match[2],
    bokstav: match[3] ? match[3].toUpperCase() : '',
  };
}

function round(n) {
  return Math.round(n * 1_000_000) / 1_000_000;
}

async function geonorgeSok(params) {
  const url = `https://ws.geonorge.no/adresser/v1/sok?${params.toString()}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'lokka-gardeierforening-platform/1.0 (geocoding)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.adresser ?? [];
}

/** Geokoder én adresse. Returnerer { lat, lng } eller null. */
async function geocode(raw) {
  const parsed = parseAddress(raw);
  if (!parsed) return null;

  // 1) Strukturert søk med gatenavn + nummer + bokstav i Oslo kommune.
  const structured = new URLSearchParams({
    adressenavn: parsed.adressenavn,
    nummer: parsed.nummer,
    kommunenummer: KOMMUNENUMMER_OSLO,
    treffPerSide: '5',
  });
  if (parsed.bokstav) structured.set('bokstav', parsed.bokstav);

  let hits = await geonorgeSok(structured);

  // 2) Uten bokstav hvis ingen treff (bokstav kan mangle i registeret).
  if (hits.length === 0 && parsed.bokstav) {
    const noLetter = new URLSearchParams({
      adressenavn: parsed.adressenavn,
      nummer: parsed.nummer,
      kommunenummer: KOMMUNENUMMER_OSLO,
      treffPerSide: '5',
    });
    hits = await geonorgeSok(noLetter);
  }

  // 3) Fritekst-fallback (fuzzy) hvis fortsatt ingenting.
  if (hits.length === 0) {
    const fuzzy = new URLSearchParams({
      sok: `${raw}, Oslo`,
      fuzzy: 'true',
      treffPerSide: '5',
    });
    hits = await geonorgeSok(fuzzy);
  }

  if (hits.length === 0) return null;

  const pkt = hits[0].representasjonspunkt;
  if (!pkt || typeof pkt.lat !== 'number' || typeof pkt.lon !== 'number') return null;

  return { lat: round(pkt.lat), lng: round(pkt.lon) };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  // Samle unike adresser fra alle aktørfiler.
  const addresses = new Set();
  for (const file of AKTOR_FILES) {
    try {
      const data = JSON.parse(readFileSync(resolve(aktorerDir, file), 'utf-8'));
      for (const actor of data.actors ?? []) {
        if (actor.adresse) addresses.add(actor.adresse);
      }
    } catch {
      console.warn(`Hopper over manglende fil: ${file}`);
    }
  }
  const list = [...addresses].sort();
  console.log(`Geokoder ${list.length} unike adresser mot Kartverket...\n`);

  // Behold eksisterende koordinater som fallback ved feil.
  let existing = {};
  try {
    existing = JSON.parse(readFileSync(outPath, 'utf-8'));
  } catch {
    /* ingen eksisterende fil */
  }

  const coordinates = {};
  let ok = 0;
  let fallback = 0;
  let skipped = 0;

  for (let i = 0; i < list.length; i++) {
    const addr = list[i];
    const tag = `[${i + 1}/${list.length}]`;

    if (SKIP_ADDRESSES.has(addr)) {
      coordinates[addr] = null;
      skipped++;
      console.log(`${tag} SKIP   "${addr}"`);
      continue;
    }

    let result = null;
    try {
      result = await geocode(addr);
    } catch (err) {
      console.warn(`${tag} ERROR  "${addr}": ${err.message}`);
    }

    if (result) {
      coordinates[addr] = result;
      ok++;
      console.log(`${tag} OK     "${addr}" → ${result.lat}, ${result.lng}`);
    } else if (existing[addr] && existing[addr].lat) {
      coordinates[addr] = existing[addr];
      fallback++;
      console.log(`${tag} BEHOLD "${addr}" (ikke funnet — beholder gammel koordinat)`);
    } else {
      coordinates[addr] = null;
      fallback++;
      console.log(`${tag} MANGLER "${addr}" (ingen koordinat)`);
    }

    await sleep(150);
  }

  writeFileSync(outPath, JSON.stringify(coordinates, null, 2) + '\n');
  console.log(`\nFerdig! ${ok} geokodet, ${fallback} fallback/mangler, ${skipped} hoppet over.`);
  console.log(`Skrevet: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
