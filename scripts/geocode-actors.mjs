import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(__dirname, '../src/data/main-board/aktorer/2025-arsrapport.json');
const outPath = resolve(__dirname, '../src/data/main-board/aktorer/2025-arsrapport-coordinates.json');

const BOUNDS = {
  minLat: 59.91,
  maxLat: 59.94,
  minLng: 10.74,
  maxLng: 10.77,
};

const KNOWN_COORDS = {
  'VULKAN 5': { lat: 59.9222, lng: 10.7510 },
  'VULKAN 2': { lat: 59.9220, lng: 10.7505 },
  'VULKAN 11': { lat: 59.9225, lng: 10.7515 },
  'VULKAN 12': { lat: 59.9224, lng: 10.7512 },
  'VULKAN 26': { lat: 59.9228, lng: 10.7508 },
  'VULKAN 28': { lat: 59.9229, lng: 10.7506 },
  'VULKAN 38': { lat: 59.9230, lng: 10.7510 },
  'OSLO': null,
};

async function geocode(address) {
  if (KNOWN_COORDS[address] !== undefined) {
    return KNOWN_COORDS[address];
  }

  const query = `${address}, Grünerløkka, Oslo, Norway`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=no`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'lokka-gardeierforening-platform/1.0 (geocoding script)' },
  });

  if (!res.ok) {
    console.error(`HTTP ${res.status} for "${address}"`);
    return null;
  }

  const results = await res.json();
  if (results.length === 0) {
    const fallbackQuery = `${address}, Oslo, Norway`;
    const fallbackUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fallbackQuery)}&format=json&limit=1&countrycodes=no`;
    const fallbackRes = await fetch(fallbackUrl, {
      headers: { 'User-Agent': 'lokka-gardeierforening-platform/1.0 (geocoding script)' },
    });
    const fallbackResults = await fallbackRes.json();
    if (fallbackResults.length === 0) {
      return null;
    }
    const { lat, lon } = fallbackResults[0];
    return checkBounds(parseFloat(lat), parseFloat(lon));
  }

  const { lat, lon } = results[0];
  return checkBounds(parseFloat(lat), parseFloat(lon));
}

function checkBounds(lat, lng) {
  if (lat < BOUNDS.minLat || lat > BOUNDS.maxLat || lng < BOUNDS.minLng || lng > BOUNDS.maxLng) {
    return null;
  }
  return { lat: Math.round(lat * 10000) / 10000, lng: Math.round(lng * 10000) / 10000 };
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
  const addresses = [...new Set(data.actors.map(a => a.adresse))];

  console.log(`Geocoding ${addresses.length} unique addresses...`);

  const coordinates = {};
  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < addresses.length; i++) {
    const addr = addresses[i];
    const result = await geocode(addr);
    coordinates[addr] = result;

    if (result === null && KNOWN_COORDS[addr] === null) {
      skipped++;
      console.log(`[${i + 1}/${addresses.length}] SKIP: "${addr}"`);
    } else if (result) {
      success++;
      console.log(`[${i + 1}/${addresses.length}] OK: "${addr}" → ${result.lat}, ${result.lng}`);
    } else {
      failed++;
      console.log(`[${i + 1}/${addresses.length}] FAIL: "${addr}"`);
    }

    if (!KNOWN_COORDS[addr]) {
      await sleep(1100);
    }
  }

  writeFileSync(outPath, JSON.stringify(coordinates, null, 2));
  console.log(`\nDone! ${success} OK, ${failed} failed, ${skipped} skipped`);
  console.log(`Output: ${outPath}`);
}

main().catch(console.error);
