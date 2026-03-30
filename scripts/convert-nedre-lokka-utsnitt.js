const fs = require('fs');
const path = require('path');

const SRC = '/Users/gabrielboen/Downloads/nedre løkka utsnitt -30.3.26';
const DEST = path.join(__dirname, '..', 'src/data/main-board/nedre-lokka-utsnitt');

function readCsv(filename, delimiter = ',') {
  const raw = fs.readFileSync(path.join(SRC, filename), 'utf8').replace(/^\uFEFF/, '');
  return raw;
}

function parseCsvSimple(filename) {
  const raw = readCsv(filename);
  const lines = raw.trim().split('\n');
  const headers = parseRow(lines[0]);
  return lines.slice(1).map(line => {
    const vals = parseRow(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i]; });
    return obj;
  });
}

function parseRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function num(v) {
  if (v === undefined || v === null || v === '') return null;
  const n = parseFloat(v);
  return isNaN(n) ? null : n;
}

function roundInt(v) {
  const n = num(v);
  return n === null ? 0 : Math.round(n);
}

function writeJson(relPath, data) {
  const fullPath = path.join(DEST, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`  ✓ ${relPath}`);
}

// ============================================================
// BEVEGELSE
// ============================================================
function convertBevegelse() {
  console.log('\n--- Bevegelse ---');

  // Besøk per time
  const perTime = parseCsvSimple('Besøk per time i tidsperioden (daglig gjennomsnitt).csv');
  writeJson('bevegelse/besok-per-time.json', perTime.map(r => ({
    time: r.Category,
    besokende: num(Object.values(r)[1]),
    paJobb: num(Object.values(r)[2]),
    hjemme: num(Object.values(r)[3]),
  })));

  // Besøk per ukedag
  const perUkedag = parseCsvSimple('Besøk per ukedag i tidsperioden (daglig gjennomsnitt).csv');
  writeJson('bevegelse/besok-per-ukedag.json', perUkedag.map(r => ({
    ukedag: r.Category,
    besokende: num(Object.values(r)[1]),
    paJobb: num(Object.values(r)[2]),
    hjemme: num(Object.values(r)[3]),
  })));

  // Bevegelsesmønster
  const monster = parseCsvSimple('Bevegelsesmønster (gjennomsnittlig daglige besøk).csv');
  writeJson('bevegelse/bevegelsesmonster.json', monster.map(r => ({
    ar: r.Category,
    besokende: num(Object.values(r)[1]),
    paJobb: num(Object.values(r)[2]),
    hjemme: num(Object.values(r)[3]),
  })));
}

// ============================================================
// DEMOGRAFI
// ============================================================
function convertDemografi() {
  console.log('\n--- Demografi ---');

  // Aldersfordeling
  const alder = parseCsvSimple('Aldersfordeling.csv');
  writeJson('demografi/aldersfordeling.json', alder.map(r => ({
    aldersgruppe: r.Category,
    mann: num(Object.values(r)[1]),
    kvinne: num(Object.values(r)[2]),
  })));

  // Antall hus
  const hus = parseCsvSimple('Antall hus.csv');
  writeJson('demografi/antall-hus.json', hus.map(r => ({
    type: r.Category,
    antall: num(Object.values(r)[1]),
  })));

  // Antall husholdninger
  const hushold = parseCsvSimple('Antall husholdninger.csv');
  writeJson('demografi/antall-husholdninger.json', hushold.map(r => ({
    type: r.Category,
    antall: num(Object.values(r)[1]),
  })));

  // Demografi over tid
  const overTid = parseCsvSimple('Demografi over tid.csv');
  writeJson('demografi/demografi-over-tid.json', overTid.map(r => ({
    ar: r.Category,
    befolkning: num(Object.values(r)[1]),
  })));

  // Inntektsfordeling
  const inntekt = parseCsvSimple('Inntektsfordeling.csv');
  const totalInntekt = inntekt.reduce((s, r) => s + num(Object.values(r)[1]), 0);
  writeJson('demografi/inntektsfordeling.json', inntekt.map(r => {
    const raw = num(Object.values(r)[1]);
    return {
      inntektsgruppe: r.Category,
      antall: roundInt(raw),
      prosent: Math.round((raw / totalInntekt) * 1000) / 10,
    };
  }));

  // Medianinntekt per husholdningstype
  const median = parseCsvSimple('Medianinntekt per husholdningstype.csv');
  writeJson('demografi/medianinntekt-per-husholdningstype.json', median.map(r => ({
    husholdningstype: r.Category,
    medianinntekt: roundInt(Object.values(r)[1]),
  })));
}

// ============================================================
// BESØKENDE (visitor demographics)
// ============================================================
function convertBesokende() {
  console.log('\n--- Besøkende ---');

  // Alders- og kjønnsfordeling
  const besAlder = parseCsvSimple('Alders- og kjønnsfordeling (besøkende).csv');
  writeJson('besokende/alders-kjonnsfordeling.json', besAlder.map(r => ({
    aldersgruppe: r.Category,
    mann: roundInt(Object.values(r)[1]),
    kvinne: roundInt(Object.values(r)[2]),
  })));

  // Antall hus (besøkende)
  const besHus = parseCsvSimple('Antall hus (besøkende).csv');
  writeJson('besokende/antall-hus.json', besHus.map(r => ({
    type: r.Category,
    antall: roundInt(Object.values(r)[1]),
  })));

  // Husholdningstypefordeling
  const besHushold = parseCsvSimple('Husholdningstypefordeling (besøkende).csv');
  writeJson('besokende/husholdningstypefordeling.json', besHushold.map(r => ({
    type: r.Category,
    antall: roundInt(Object.values(r)[1]),
  })));

  // Inntektsfordeling (besøkende)
  const besInntekt = parseCsvSimple('Inntektsfordeling (besøkende).csv');
  const totalBesInntekt = besInntekt.reduce((s, r) => s + num(Object.values(r)[1]), 0);
  writeJson('besokende/inntektsfordeling.json', besInntekt.map(r => {
    const raw = num(Object.values(r)[1]);
    return {
      inntektsgruppe: r.Category,
      antall: roundInt(raw),
      prosent: Math.round((raw / totalBesInntekt) * 1000) / 10,
    };
  }));

  // Medianinntekt per husholdningstype (besøkende)
  const besMedian = parseCsvSimple('Medianinntekt per husholdningstype (besøkende).csv');
  writeJson('besokende/medianinntekt-per-husholdningstype.json', besMedian.map(r => ({
    husholdningstype: r.Category,
    medianinntekt: roundInt(Object.values(r)[1]),
  })));

  // Områder besøkende kommer fra (semicolon-delimited, decimal comma)
  const raw = readCsv('Omrader_besokende_kommer_fra.csv');
  const lines = raw.trim().split('\n');
  const besOmrader = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].replace(/"/g, '');
    const parts = line.split(';');
    if (parts.length < 3 || !parts[0].trim()) continue;
    besOmrader.push({
      omrade: parts[0].trim(),
      antallBesok: parseInt(parts[1]) || 0,
      prosentAndel: parseFloat(parts[2].replace(',', '.')) || 0,
    });
  }
  writeJson('besokende/omrader-besokende-kommer-fra.json', besOmrader);
}

// ============================================================
// KONKURRANSEBILDE
// ============================================================
function convertKonkurransebilde() {
  console.log('\n--- Konkurransebilde ---');

  // Konseptmiks
  const konsept = parseCsvSimple('Konseptmiks..csv');
  writeJson('konkurransebilde/konseptmiks.json', konsept.map(r => ({
    kategori: r['Kategori (Nivå 1)'],
    underkategori: r['Kategori (Nivå 2)'],
    antall: num(r['No.']),
  })));

  // Kjeder vs uavhengige
  const kjeder = parseCsvSimple('Kjeder vs. uavhengige konsepter..csv');
  writeJson('konkurransebilde/kjeder-vs-uavhengige.json', kjeder.map(r => ({
    ar: r.Category,
    uavhengig: num(Object.values(r)[1]),
    kjeder: num(Object.values(r)[2]),
  })));

  // Over- og underandel vs kommune
  const overUnder = parseCsvSimple('Over- og underandel vs. kommune..csv');
  writeJson('konkurransebilde/over-og-underandel-vs-kommune.json', overUnder.map(r => {
    const vals = Object.values(r);
    const nonNull = num(vals[1]) || num(vals[2]) || num(vals[3]);
    return {
      kategori: r.Category,
      avvik: nonNull,
    };
  }));

  // Utvikling per år
  const utvikling = parseCsvSimple('Utvikling per år..csv');
  writeJson('konkurransebilde/utvikling-per-ar.json', utvikling.map(r => ({
    ar: r.Category,
    matOgOpplevelser: num(r['Mat og opplevelser']),
    handel: num(r['Handel']),
    tjenester: num(r['Tjenester']),
  })));

  // Estimert omsetning (complex multi-line CSV)
  convertEstimerOmsetning();
}

function convertEstimerOmsetning() {
  const raw = readCsv('Estimert omsetning (eks mva) fra fysiske utsalgssteder  ( 2024 )  - Sheet1.csv');
  const lines = raw.split('\n');
  const actors = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^#(\d+),(.+)/);
    if (!match) { i++; continue; }

    const rank = parseInt(match[1]);
    let fullRecord = line;
    let openQuotes = (line.match(/"/g) || []).length % 2;

    while (openQuotes !== 0 && i + 1 < lines.length) {
      i++;
      fullRecord += '\n' + lines[i];
      openQuotes += (lines[i].match(/"/g) || []).length;
      openQuotes = openQuotes % 2;
    }

    const fields = [];
    let current = '';
    let inQ = false;
    const str = fullRecord.substring(match[0].length - match[2].length);

    for (let j = 0; j < str.length; j++) {
      const ch = str[j];
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { fields.push(current.trim()); current = ''; }
      else { current += ch; }
    }
    fields.push(current.trim());

    const navn = fields[0] || '';
    const type = fields[1] || '';
    const adresse = fields[2] || '';
    const kommune = fields[3] || '';
    const omsetningRaw = (fields[4] || '').split('\n')[0].trim();
    const yoyRaw = (fields[5] || '').split('\n')[0].trim();
    const ansatteRaw = (fields[6] || '').split('\n')[0].trim();
    const markedsandelRaw = (fields[7] || '').split('\n')[0].trim();

    let omsetning = 0;
    if (omsetningRaw.includes('mill.')) {
      omsetning = parseFloat(omsetningRaw.replace(/[^0-9.]/g, '')) || 0;
    } else if (omsetningRaw.includes('k')) {
      omsetning = (parseFloat(omsetningRaw.replace(/[^0-9.]/g, '')) || 0) / 1000;
    }

    let yoyVekst = null;
    const yoyMatch = yoyRaw.match(/-?\d+/);
    if (yoyMatch) yoyVekst = parseInt(yoyMatch[0]);

    const ansatte = parseInt(ansatteRaw) || 0;

    let markedsandel = 0;
    const msMatch = markedsandelRaw.match(/([\d.]+)%/);
    if (msMatch) markedsandel = parseFloat(msMatch[1]);

    actors.push({
      rank,
      navn,
      type,
      adresse,
      kommune,
      omsetning,
      omsetning_raw: omsetningRaw,
      yoy_vekst: yoyVekst,
      ansatte,
      markedsandel,
    });

    i++;
  }

  writeJson('konkurransebilde/estimert-omsetning.json', { year: 2024, actors });
  console.log(`    → ${actors.length} aktører parsed`);
}

// ============================================================
// KORTHANDEL
// ============================================================
function convertKorthandel() {
  console.log('\n--- Korthandel ---');

  // Korthandel per ukedag
  const perUkedag = parseCsvSimple('Korthandel per ukedag.csv');
  const dagMap = {
    'Monday': 'man.', 'Tuesday': 'tir.', 'Wednesday': 'ons.',
    'Thursday': 'tor.', 'Friday': 'fre.', 'Saturday': 'lør.', 'Sunday': 'søn.'
  };
  writeJson('korthandel/korthandel-per-ukedag.json', perUkedag.map(r => {
    const vals = Object.entries(r);
    const obj = { ukedag: dagMap[r.DateTime] || r.DateTime };
    vals.forEach(([k, v]) => {
      if (k !== 'DateTime') obj[k] = num(v);
    });
    return obj;
  }));

  // Årlig vekst
  const vekst = parseCsvSimple('Årlig vekst.csv');
  writeJson('korthandel/arlig-vekst.json', vekst.map(r => {
    const vals = Object.values(r);
    return {
      ar: r.DateTime || r.Category,
      grunerlokka: {
        omsetningMillioner: num(vals[3]),
        vekstProsent: num(vals[2]),
      },
      oslo: {
        omsetningMillioner: num(vals[6]),
        vekstProsent: num(vals[5]),
      },
      norge: {
        omsetningMillioner: num(vals[9]),
        vekstProsent: num(vals[8]),
      },
    };
  }));

  // Indeksert vekst - aggregate to annual
  const indeksRaw = readCsv('Indeksert vekst (indeks = 100).csv');
  const indeksLines = indeksRaw.trim().split('\n');
  const indeksHeaders = parseRow(indeksLines[0]);
  const yearlyData = {};
  for (let i = 1; i < indeksLines.length; i++) {
    const vals = parseRow(indeksLines[i]);
    const weekStr = vals[0];
    const yearMatch = weekStr.match(/(\d{4})/);
    if (!yearMatch) continue;
    const year = yearMatch[1];
    if (!yearlyData[year]) yearlyData[year] = { sums: [0, 0, 0], count: 0 };
    yearlyData[year].sums[0] += num(vals[1]) || 0;
    yearlyData[year].sums[1] += num(vals[2]) || 0;
    yearlyData[year].sums[2] += num(vals[3]) || 0;
    yearlyData[year].count++;
  }
  writeJson('korthandel/indeksert-vekst.json', Object.entries(yearlyData).map(([ar, d]) => ({
    ar,
    grunerlokka: Math.round(d.sums[0] / d.count * 10) / 10,
    oslo: Math.round(d.sums[1] / d.count * 10) / 10,
    norge: Math.round(d.sums[2] / d.count * 10) / 10,
  })));

  // Korthandel i valgt tidsrom - aggregate to monthly
  const tidsromRaw = readCsv('Korthandel i valgt tidsrom.csv');
  const tidsromLines = tidsromRaw.trim().split('\n');
  const monthlyData = {};
  for (let i = 1; i < tidsromLines.length; i++) {
    const vals = parseRow(tidsromLines[i]);
    const batchDate = vals[3];
    if (!batchDate) continue;
    const month = batchDate.substring(0, 7);
    if (!monthlyData[month]) monthlyData[month] = 0;
    monthlyData[month] += num(vals[2]) || 0;
  }
  writeJson('korthandel/korthandel-tidsrom.json', Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([maaned, belop]) => ({
      maaned,
      belop: Math.round(belop * 100) / 100,
    })));
}

// ============================================================
// INTERNASJONALT
// ============================================================
function convertInternasjonalt() {
  console.log('\n--- Internasjonalt ---');

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const result = [];

  quarters.forEach(q => {
    const filename = `Antall hus (besøkende) ${q} 2024.csv`;
    try {
      const rows = parseCsvSimple(filename);
      result.push({
        kvartal: q,
        ar: 2024,
        land: rows.map(r => ({
          land: r.Category,
          prosent: num(Object.values(r)[1]),
        })),
      });
    } catch (e) {
      console.log(`  ⚠ Skipped ${filename}: ${e.message}`);
    }
  });

  writeJson('internasjonalt/kvartalsvis-2024.json', result);
}

// ============================================================
// NØKKELDATA
// ============================================================
function createNokkeldata() {
  console.log('\n--- Nøkkeldata ---');

  writeJson('nokkeldata.json', {
    "Besøkende verktøy oversikt": {
      "Besøkende": {
        "Status": "Estimert",
        "Datakilde": ["Telia"]
      },
      "Demografi av Besøkende": {
        "Status": "Estimert",
        "Datakilde": ["Telia", "Statistisk sentralbyrå"]
      }
    },
    "Bevegelse NØKKELTALL": {
      "Bevegelse": {
        "Datoperiode": "01.01.2023 – 31.12.2025",
        "Status": "Faktiske data",
        "Datakilde": ["Telia"]
      },
      "Gjennomsnittlig daglige besøk": {
        "Verdi": 38792,
        "Kommentar": "Basert på alle besøk"
      },
      "Gjennomsnittlig daglige besøk per km2": {
        "Verdi": 55545
      },
      "Travleste dag": {
        "Dag": "Lørdag",
        "Andel": "16% av ukesbesøk"
      }
    },
    "Korthandel NØKKELTALL": {
      "Korthandel": {
        "Status": "Faktiske data",
        "Datakilde": ["BankAxept"]
      },
      "Daglig korthandel for valgt periode": "NOK 2,6 mill.",
      "Total korthandel for valgt periode": "NOK 948 mill.",
      "Beløp per transaksjon for valgt periode": "275 NOK"
    },
    "konkurransebildet NØKKELTALL": {
      "Konkurransebildet": {
        "Status": "Estimerte tall",
        "Datakilde": ["Plaace.ai", "Analysebutikken"]
      },
      "Konsepttetthet": "541/km²",
      "Total omsetning": "NOK 1,4 mrd.",
      "Omsetningstetthet": "NOK 5,3 mrd./km²"
    },
    "Demografi NØKKELTALL": {
      "Demografi": {
        "Status": "Estimert",
        "Datakilde": ["SSB"]
      },
      "Befolkning (2024)": "5 691 innbyggere",
      "Befolkningstetthet": "20 819/km²",
      "Områdestørrelse": "0,27 km²"
    }
  });
}

// ============================================================
// RUN
// ============================================================
console.log('Converting Nedre Løkka Utsnitt CSV → JSON\n');
console.log(`Source: ${SRC}`);
console.log(`Dest:   ${DEST}`);

convertBevegelse();
convertDemografi();
convertBesokende();
convertKonkurransebilde();
convertKorthandel();
convertInternasjonalt();
createNokkeldata();

console.log('\n✅ Done!');
