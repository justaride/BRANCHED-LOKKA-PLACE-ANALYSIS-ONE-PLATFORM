/**
 * Convert Vulkan Området CSV data to 5-minute analysis JSON
 */

const fs = require('fs');
const path = require('path');

const sourceDir = '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/ASPELIN RAMM - VULKAN OMRÅDET ';
const outputDir = 'src/data/aspelin-ramm/vulkan-omradet/5min';

// CSV Parsing
function readCSV(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

function parseSimpleCSV(content, delimiter = ',') {
  if (!content) return [];
  const lines = content.split('\n').filter(line => line.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if ((char === delimiter || char === ';') && !inQuotes) {
        parts.push(current.trim().replace(/"/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    parts.push(current.trim().replace(/"/g, ''));
    result.push(parts);
  }

  return result;
}

function parseNumber(str) {
  if (!str) return 0;
  const cleaned = str.replace(/"/g, '').replace(',', '.').trim();
  return parseFloat(cleaned) || 0;
}

// DEMOGRAFI Converter
function convertDemografi() {
  console.log('  Converting DEMOGRAFI...');

  const nokkeltallPath = path.join(sourceDir, 'Vulkan_Omraadet_NOKKELTALL.json');
  const data = JSON.parse(fs.readFileSync(nokkeltallPath, 'utf8'));

  const nokkeltall = {
    befolkning: data.nokkelstall?.demografi?.befolkning_2023 || 241,
    befolkningstetthet: parseInt((data.nokkelstall?.demografi?.befolkningstetthet_2023 || '8826/km2').replace('/km2', '')) || 8826,
    områdestørrelse: data.nokkelstall?.demografi?.omradestorrelse_km2 || 0.027,
    vekst: 0
  };

  // Aldersfordeling
  const aldersContent = readCSV(path.join(sourceDir, 'Aldersfordeling DEMOGRAFI.csv'));
  const aldersfordeling = { mann: [], kvinne: [] };

  if (aldersContent) {
    const rows = parseSimpleCSV(aldersContent);
    for (const row of rows) {
      if (row.length >= 3) {
        aldersfordeling.mann.push({ kategori: row[0], antall: parseNumber(row[1]) });
        aldersfordeling.kvinne.push({ kategori: row[0], antall: parseNumber(row[2]) });
      }
    }
  }

  // Inntektsfordeling
  const inntektContent = readCSV(path.join(sourceDir, 'Inntektsfordeling DEMOGRAFI.csv'));
  const inntektsfordeling = [];

  if (inntektContent) {
    const rows = parseSimpleCSV(inntektContent);
    for (const row of rows) {
      if (row.length >= 2) {
        inntektsfordeling.push({ kategori: row[0], antall: Math.round(parseNumber(row[1])) });
      }
    }
  }

  // Husholdninger
  const husholdningerContent = readCSV(path.join(sourceDir, 'Antall husholdninger DEMOGRAFI.csv'));
  const husholdninger = [];

  if (husholdningerContent) {
    const rows = parseSimpleCSV(husholdningerContent);
    for (const row of rows) {
      if (row.length >= 2) {
        husholdninger.push({ type: row[0], antall: Math.round(parseNumber(row[1])) });
      }
    }
  }

  // Medianinntekt per husholdningstype
  const medianContent = readCSV(path.join(sourceDir, 'Medianinntekt per husholdningstype DEMOGRAFI.csv'));
  const medianInntektPerHusholdningstype = [];

  if (medianContent) {
    const rows = parseSimpleCSV(medianContent);
    for (const row of rows) {
      if (row.length >= 2) {
        medianInntektPerHusholdningstype.push({
          type: row[0],
          median: Math.round(parseNumber(row[1]))
        });
      }
    }
  }

  // Demografi over tid
  const demografiTidContent = readCSV(path.join(sourceDir, 'Demografi over tid DEMOGRAFI.csv'));
  const demografiOverTid = [];

  if (demografiTidContent) {
    const rows = parseSimpleCSV(demografiTidContent);
    for (const row of rows) {
      if (row.length >= 3) {
        demografiOverTid.push({
          år: row[0],
          befolkning: Math.round(parseNumber(row[1])),
          trend: Math.round(parseNumber(row[2]))
        });
      }
    }
  }

  return {
    nøkkeltall: nokkeltall,
    aldersfordeling,
    inntektsfordeling,
    husholdninger,
    medianInntektPerHusholdningstype,
    demografiOverTid
  };
}

// KONKURRANSEBILDET Converter
function convertKonkurransebilde() {
  console.log('  Converting KONKURRANSEBILDET...');

  const nokkeltallPath = path.join(sourceDir, 'Vulkan_Omraadet_NOKKELTALL.json');
  const data = JSON.parse(fs.readFileSync(nokkeltallPath, 'utf8'));

  const nokkeltall = {
    konseptTetthet: parseInt((data.nokkelstall?.konkurransebildet?.konsepttetthet || '1318/km2').replace('/km2', '')) || 1318,
    totalOmsetning: 360,
    omsetningTetthet: 13000,
    trend: { konseptTetthet: 0, omsetning: 1 }
  };

  // Konseptmiks
  const konseptmiksContent = readCSV(path.join(sourceDir, 'Konseptmiks KONKURRANSEBILDET.csv'));
  const konseptmiks = [];

  if (konseptmiksContent) {
    const rows = parseSimpleCSV(konseptmiksContent);
    for (const row of rows) {
      if (row.length >= 4) {
        konseptmiks.push({
          kategori1: row[1],
          kategori2: row[2],
          antall: Math.round(parseNumber(row[3]))
        });
      }
    }
  }

  // Kjeder vs uavhengige
  const kjederContent = readCSV(path.join(sourceDir, 'Kjeder vs. uavhengige konsepter KONKURRANSEBILDET.csv'));
  const kjederVsUavhengige = [];

  if (kjederContent) {
    const rows = parseSimpleCSV(kjederContent);
    for (const row of rows) {
      if (row.length >= 3) {
        kjederVsUavhengige.push({
          år: row[0],
          uavhengig: Math.round(parseNumber(row[1]) * 100) / 100,
          kjeder: Math.round(parseNumber(row[2]) * 100) / 100
        });
      }
    }
  }

  // Over-/underandel vs kommune
  const overUnderContent = readCSV(path.join(sourceDir, 'Over- og underandel vs. kommune KONKURRANSEBILDET.csv'));
  const overUnderandel = { matOpplevelser: 0, handel: 0, tjenester: 0 };

  if (overUnderContent) {
    const rows = parseSimpleCSV(overUnderContent);
    for (const row of rows) {
      const kategori = row[0]?.toLowerCase() || '';
      if (kategori.includes('mat')) {
        overUnderandel.matOpplevelser = Math.round(parseNumber(row[1]) * 100) / 100;
      } else if (kategori.includes('handel')) {
        overUnderandel.handel = Math.round(parseNumber(row[2]) * 100) / 100;
      } else if (kategori.includes('tjenester')) {
        overUnderandel.tjenester = Math.round(parseNumber(row[3]) * 100) / 100;
      }
    }
  }

  // Utvikling per år
  const utviklingContent = readCSV(path.join(sourceDir, 'Utvikling per år KONKURRANSEBILDET.csv'));
  const utviklingPerÅr = [];

  if (utviklingContent) {
    const rows = parseSimpleCSV(utviklingContent);
    for (const row of rows) {
      if (row.length >= 4) {
        utviklingPerÅr.push({
          år: row[0],
          matOpplevelser: Math.round(parseNumber(row[1]) * 10) / 10,
          handel: Math.round(parseNumber(row[2]) * 10) / 10,
          tjenester: Math.round(parseNumber(row[3]) * 10) / 10
        });
      }
    }
  }

  return {
    nøkkeltall: nokkeltall,
    konseptmiks,
    kjederVsUavhengige,
    overUnderandel,
    utviklingPerÅr
  };
}

// KORTHANDEL Converter
function convertKorthandel() {
  console.log('  Converting KORTHANDEL...');

  const nokkeltallPath = path.join(sourceDir, 'Vulkan_Omraadet_NOKKELTALL.json');
  const data = JSON.parse(fs.readFileSync(nokkeltallPath, 'utf8'));

  const nokkeltall = {
    dagligKorthandel: 1.1,
    totalKorthandel: 779,
    beløpPerTransaksjon: 239,
    endring30d: 6
  };

  // Tidsserie
  const tidsserieContent = readCSV(path.join(sourceDir, 'Korthandel i valgt tidsrom KORTHANDEL.csv'));
  const tidsserie = [];

  if (tidsserieContent) {
    const rows = parseSimpleCSV(tidsserieContent);
    for (const row of rows) {
      if (row.length >= 4) {
        const dateStr = row[3];
        const total = parseNumber(row[2]);
        if (dateStr && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
          tidsserie.push({
            date: dateStr,
            mat_opplevelser: Math.round(total * 0.80 * 1000) / 1000,
            handel: Math.round(total * 0.17 * 1000) / 1000,
            tjenester: Math.round(total * 0.03 * 1000) / 1000
          });
        }
      }
    }
  }

  // Årlig vekst
  const vekstContent = readCSV(path.join(sourceDir, 'Årlig vekst KORTHANDEL.csv'));
  const årligVekst = [];

  if (vekstContent) {
    const rows = parseSimpleCSV(vekstContent);
    for (const row of rows) {
      if (row.length >= 9) {
        årligVekst.push({
          år: row[0],
          område: Math.round(parseNumber(row[2]) * 100) / 100,
          oslo: Math.round(parseNumber(row[5]) * 100) / 100,
          norge: Math.round(parseNumber(row[8]) * 100) / 100
        });
      }
    }
  }

  // Indeksert vekst
  const indeksContent = readCSV(path.join(sourceDir, 'Indeksert vekst (indeks = 100) KORTHANDEL.csv'));
  const indeksertVekst = [];

  if (indeksContent) {
    const rows = parseSimpleCSV(indeksContent);
    for (const row of rows) {
      if (row.length >= 4) {
        indeksertVekst.push({
          år: row[0],
          område: Math.round(parseNumber(row[1]) * 100) / 100,
          oslo: Math.round(parseNumber(row[2]) * 100) / 100,
          norge: Math.round(parseNumber(row[3]) * 100) / 100
        });
      }
    }
  }

  // Korthandel per ukedag
  const ukedagContent = readCSV(path.join(sourceDir, 'Korthandel per ukedag KORTHANDEL.csv'));
  const korthandelPerUkedag = [];

  if (ukedagContent) {
    const rows = parseSimpleCSV(ukedagContent);
    for (const row of rows) {
      if (row.length >= 3) {
        korthandelPerUkedag.push({
          dag: row[0],
          år2023: Math.round(parseNumber(row[1]) * 1000) / 1000,
          år2024: Math.round(parseNumber(row[2]) * 1000) / 1000
        });
      }
    }
  }

  return {
    nøkkeltall: nokkeltall,
    tidsserie,
    årligVekst,
    indeksertVekst,
    korthandelPerUkedag
  };
}

// BEVEGELSE Converter
function convertBevegelse() {
  console.log('  Converting BEVEGELSE...');

  const nokkeltallPath = path.join(sourceDir, 'Vulkan_Omraadet_NOKKELTALL.json');
  const data = JSON.parse(fs.readFileSync(nokkeltallPath, 'utf8'));

  const nokkeltall = {
    dagligBesøk: data.nokkelstall?.bevegelse?.gj_snitt_daglige_besok || 4641,
    besøkPerKm2: data.nokkelstall?.bevegelse?.gj_snitt_daglige_besok_per_km2 || 35636,
    travlesteDag: data.nokkelstall?.bevegelse?.travleste_dag || 'fredag',
    lørdagAndel: 15,
    periode: '01.10.2022 - 30.09.2025'
  };

  // Per time
  const perTimeContent = readCSV(path.join(sourceDir, 'Besøk per time i tidsperioden (daglig gjennomsnitt) BEVEGELSE.csv'));
  const perTime = [];

  if (perTimeContent) {
    const rows = parseSimpleCSV(perTimeContent);
    for (const row of rows) {
      if (row.length >= 2) {
        perTime.push({
          time: row[0],
          besøk: Math.round(parseNumber(row[1]))
        });
      }
    }
  }

  // Per ukedag
  const perUkedagContent = readCSV(path.join(sourceDir, 'Besøk per ukedag i tidsperioden (daglig gjennomsnitt) BEVEGELSE.csv'));
  const perUkedag = [];

  if (perUkedagContent) {
    const rows = parseSimpleCSV(perUkedagContent);
    for (const row of rows) {
      if (row.length >= 4) {
        perUkedag.push({
          dag: row[0],
          besøkende: Math.round(parseNumber(row[1])),
          påJobb: Math.round(parseNumber(row[2])),
          hjemme: Math.round(parseNumber(row[3]))
        });
      }
    }
  }

  // Bevegelsesmønster
  const mønsterContent = readCSV(path.join(sourceDir, 'Bevegelsesmønster (gjennomsnittlig daglige besøk) BEVEGELSE.csv'));
  const bevegelsesmønster = [];

  if (mønsterContent) {
    const rows = parseSimpleCSV(mønsterContent);
    for (const row of rows) {
      if (row.length >= 4) {
        bevegelsesmønster.push({
          kategori: row[0],
          besøkende: Math.round(parseNumber(row[1])),
          påJobb: Math.round(parseNumber(row[2])),
          hjemme: Math.round(parseNumber(row[3]))
        });
      }
    }
  }

  return {
    nøkkeltall: nokkeltall,
    perTime,
    perUkedag,
    bevegelsesmønster
  };
}

// BESØKENDE Converter
function convertBesokende() {
  console.log('  Converting BESØKENDE...');

  // Områder besøkende kommer fra
  const områderContent = readCSV(path.join(sourceDir, 'Omrader_besokende_kommer_fra.csv'));
  const områderBesøkendeKommerFra = [];

  if (områderContent) {
    const rows = parseSimpleCSV(områderContent, ';');
    for (const row of rows) {
      if (row.length >= 3) {
        const prosent = parseNumber(row[2]);
        if (prosent > 0) {
          områderBesøkendeKommerFra.push({
            område: row[0],
            prosent: Math.round(prosent * 100) / 100
          });
        }
      }
    }
  }

  return {
    periode: '31.12.2023 - 30.12.2024',
    aldersfordeling: { mann: [], kvinne: [] },
    husholdningstyper: [],
    inntektsfordeling: [],
    medianInntektPerHusholdningstype: [],
    områderBesøkendeKommerFra
  };
}

// INTERNASJONALT Converter
function convertInternasjonalt() {
  console.log('  Converting INTERNASJONALT...');

  const landContent = readCSV(path.join(sourceDir, 'Topp 20 land besøkende til området (i %).csv'));
  const toppLand = [];

  if (landContent) {
    const rows = parseSimpleCSV(landContent);
    for (const row of rows) {
      if (row.length >= 2) {
        toppLand.push({
          land: row[0],
          prosent: Math.round(parseNumber(row[1]) * 100) / 100
        });
      }
    }
  }

  return {
    periode: '2024, Q4',
    toppLand
  };
}

// AKTØRER Converter
function convertAktorer() {
  console.log('  Converting AKTØRER...');

  // Use temp file copied via find command (original has trailing space issues)
  const csvPath = '/tmp/vulkan-aktorer.csv';
  if (!fs.existsSync(csvPath)) {
    console.log('    No AKTØRER file found at', csvPath);
    return {
      actors: [],
      categoryStats: {},
      metadata: {
        totalActors: 0,
        totalCategories: 0,
        totalRevenue: 0,
        generatedAt: new Date().toISOString().split('T')[0],
        analysisType: '5min-gange',
        areaSize: '0.027 km²'
      }
    };
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const actors = [];

  const lines = content.split('\n');
  let currentRecord = [];
  let inQuotes = false;
  let currentCell = '';
  let headerSkipped = false;

  for (const line of lines) {
    if (!headerSkipped && line.startsWith('#,')) {
      headerSkipped = true;
      continue;
    }
    if (!headerSkipped) continue;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        currentRecord.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }

    if (!inQuotes) {
      currentRecord.push(currentCell.trim());
      currentCell = '';

      if (currentRecord.length >= 6 && currentRecord[0].startsWith('#')) {
        const rank = currentRecord[0];
        const navn = currentRecord[1];
        const type = currentRecord[2];
        const adresse = currentRecord[3];
        const kommune = currentRecord[4] || 'Oslo';

        const omsetningStr = currentRecord[5] || '';
        const omsetningMatch = omsetningStr.match(/NOK\s*(\d+)/);
        const omsetning = omsetningMatch ? parseInt(omsetningMatch[1]) : 0;

        const kjedeMatch = omsetningStr.match(/(\d+\.?\d*)%\s*av\s*kjede/);
        const kjedeProsent = kjedeMatch ? kjedeMatch[1] + '%' : null;

        const yoyStr = currentRecord[6] || '';
        const yoyMatch = yoyStr.match(/([-\d.]+)%/);
        const yoyVekst = yoyMatch ? parseFloat(yoyMatch[1]) : null;

        const ansatteStr = currentRecord[7] || '';
        const ansatteLokaltMatch = ansatteStr.match(/^(\d+)/);
        const ansatteLokalt = ansatteLokaltMatch ? parseInt(ansatteLokaltMatch[1]) : 0;

        const markedsandelStr = currentRecord[8] || '';
        const markedsandelMatch = markedsandelStr.match(/([\d.]+)%/);
        const markedsandel = markedsandelMatch ? parseFloat(markedsandelMatch[1]) : 0;

        actors.push({
          rank,
          navn,
          type,
          adresse,
          kommune,
          omsetning,
          kjedeProsent,
          yoyVekst,
          ansatteLokalt,
          ansatteKjede: 0,
          kjedeLokasjoner: 1,
          markedsandel
        });
      }

      currentRecord = [];
    } else {
      currentCell += '\n';
    }
  }

  const categoryStats = {};
  for (const actor of actors) {
    const cat = actor.type;
    if (!categoryStats[cat]) {
      categoryStats[cat] = { count: 0, totalRevenue: 0, avgRevenue: 0 };
    }
    categoryStats[cat].count++;
    categoryStats[cat].totalRevenue += actor.omsetning;
  }

  for (const cat of Object.keys(categoryStats)) {
    categoryStats[cat].avgRevenue = categoryStats[cat].count > 0
      ? Math.round(categoryStats[cat].totalRevenue / categoryStats[cat].count * 10) / 10
      : 0;
  }

  const totalRevenue = actors.reduce((sum, a) => sum + a.omsetning, 0);

  return {
    actors,
    categoryStats,
    metadata: {
      totalActors: actors.length,
      totalCategories: Object.keys(categoryStats).length,
      totalRevenue,
      generatedAt: new Date().toISOString().split('T')[0],
      analysisType: '5min-gange',
      areaSize: '0.027 km²'
    }
  };
}

// MAIN
console.log('Converting Vulkan Området to 5-minute analysis JSON...\n');

const fullOutputDir = path.join(process.cwd(), outputDir);
if (!fs.existsSync(fullOutputDir)) {
  fs.mkdirSync(fullOutputDir, { recursive: true });
}

const demografi = convertDemografi();
const konkurransebilde = convertKonkurransebilde();
const korthandel = convertKorthandel();
const bevegelse = convertBevegelse();
const besokende = convertBesokende();
const internasjonalt = convertInternasjonalt();
const aktorer = convertAktorer();

fs.writeFileSync(path.join(fullOutputDir, 'demografi.json'), JSON.stringify(demografi, null, 2));
fs.writeFileSync(path.join(fullOutputDir, 'konkurransebilde.json'), JSON.stringify(konkurransebilde, null, 2));
fs.writeFileSync(path.join(fullOutputDir, 'korthandel.json'), JSON.stringify(korthandel, null, 2));
fs.writeFileSync(path.join(fullOutputDir, 'bevegelse.json'), JSON.stringify(bevegelse, null, 2));
fs.writeFileSync(path.join(fullOutputDir, 'besokende.json'), JSON.stringify(besokende, null, 2));
fs.writeFileSync(path.join(fullOutputDir, 'internasjonalt.json'), JSON.stringify(internasjonalt, null, 2));
fs.writeFileSync(path.join(fullOutputDir, 'aktorer.json'), JSON.stringify(aktorer, null, 2));

console.log(`  Output: ${outputDir}`);
console.log(`  Summary:`);
console.log(`    - Demografi: ${demografi.aldersfordeling.mann.length} age categories`);
console.log(`    - Konkurransebilde: ${konkurransebilde.konseptmiks.length} concepts`);
console.log(`    - Korthandel: ${korthandel.tidsserie.length} days`);
console.log(`    - Bevegelse: ${bevegelse.perTime.length} hourly datapoints`);
console.log(`    - Besøkende: ${besokende.områderBesøkendeKommerFra.length} areas`);
console.log(`    - Internasjonalt: ${internasjonalt.toppLand.length} countries`);
console.log(`    - Aktører: ${aktorer.actors.length} actors`);

console.log('\n\nDone!');
