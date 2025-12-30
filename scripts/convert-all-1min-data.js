/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Convert all CSV data to new 1-minute analysis JSON structure
 *
 * Sections:
 * 1. DEMOGRAFI - demografi.json
 * 2. KONKURRANSEBILDET - konkurransebilde.json
 * 3. KORTHANDEL - korthandel.json
 * 4. BEVEGELSE - bevegelse.json
 * 5. BESØKENDE - besokende.json
 * 6. INTERNASJONALT - internasjonalt.json
 * + AKTØRER - aktorer.json
 */

const fs = require('fs');
const path = require('path');

// Property configurations
const properties = [
  {
    id: 'olaf-ryes-plass-3',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Olaf Ryes Plass 3',
    outputDir: 'src/data/roger-vodal/olaf-ryes-plass-3/1min',
    nokkeltallFile: 'Olaf_Ryes_Plass_3_NOKKELTALL.json',
    aktorerFile: 'Olaf Ryes Plass 3 - Sheet1.csv'
  },
  {
    id: 'thorvald-meyersgate-33',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gata 33',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-33/1min',
    nokkeltallFile: null,
    aktorerFile: 'Thorvald Meyers gata 33 - Sheet1.csv'
  },
  {
    id: 'thorvald-meyersgate-40',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gate 40',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-40/1min',
    nokkeltallFile: null,
    aktorerFile: 'Thorvald Meyers gate 40 AKTØRLISTE - Sheet1.csv'
  },
  {
    id: 'thorvald-meyersgate-44',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gate 44',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-44/1min',
    nokkeltallFile: null,
    aktorerFile: 'Thorvald Meyers gate 44  - Sheet1 Aktørkartlegging.csv'
  }
];

// ============================================================================
// CSV PARSING UTILITIES
// ============================================================================

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

// ============================================================================
// 1. DEMOGRAFI CONVERTER
// ============================================================================

function convertDemografi(sourceDir, nokkeltallFile) {
  console.log('  Converting DEMOGRAFI...');

  // Load nøkkeltall
  let nokkeltall = {
    befolkning: 8200,
    befolkningstetthet: 17901,
    områdestørrelse: 0.46,
    vekst: 1.2
  };

  if (nokkeltallFile) {
    const nokkeltallPath = path.join(sourceDir, nokkeltallFile);
    if (fs.existsSync(nokkeltallPath)) {
      const data = JSON.parse(fs.readFileSync(nokkeltallPath, 'utf8'));
      nokkeltall.befolkning = data.nokkelstall?.demografi?.befolkning_2023 || 8200;
      nokkeltall.områdestørrelse = data.nokkelstall?.demografi?.omradestorrelse_km2 || 0.46;
      const tetthetStr = data.nokkelstall?.demografi?.befolkningstetthet_2023 || '17901/km2';
      nokkeltall.befolkningstetthet = parseInt(tetthetStr.replace('/km2', '')) || 17901;
    }
  }

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

  // Calculate vekst from demografiOverTid
  if (demografiOverTid.length >= 2) {
    const lastTwo = demografiOverTid.slice(-2);
    const vekst = ((lastTwo[1].befolkning - lastTwo[0].befolkning) / lastTwo[0].befolkning) * 100;
    nokkeltall.vekst = Math.round(vekst * 100) / 100;
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

// ============================================================================
// 2. KONKURRANSEBILDET CONVERTER
// ============================================================================

function convertKonkurransebilde(sourceDir, nokkeltallFile) {
  console.log('  Converting KONKURRANSEBILDET...');

  // Load nøkkeltall
  let nokkeltall = {
    konseptTetthet: 452,
    totalOmsetning: 2200,
    omsetningTetthet: 4700,
    trend: { konseptTetthet: 0, omsetning: 1 }
  };

  if (nokkeltallFile) {
    const nokkeltallPath = path.join(sourceDir, nokkeltallFile);
    if (fs.existsSync(nokkeltallPath)) {
      const data = JSON.parse(fs.readFileSync(nokkeltallPath, 'utf8'));
      const konseptTetthetStr = data.nokkelstall?.konkurransebildet?.konsepttetthet || '452/km2';
      nokkeltall.konseptTetthet = parseInt(konseptTetthetStr.replace('/km2', '')) || 452;
    }
  }

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
  const utviklingFile = fs.existsSync(path.join(sourceDir, 'Utvikling per år KONKURRANSEBILDETE.csv'))
    ? 'Utvikling per år KONKURRANSEBILDETE.csv'
    : 'Utvikling per år KONKURRANSEBILDET.csv';
  const utviklingContent = readCSV(path.join(sourceDir, utviklingFile));
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

  // Calculate totalOmsetning from latest year
  if (utviklingPerÅr.length > 0) {
    const latest = utviklingPerÅr[utviklingPerÅr.length - 1];
    nokkeltall.totalOmsetning = Math.round(latest.matOpplevelser + latest.handel + latest.tjenester);
  }

  return {
    nøkkeltall: nokkeltall,
    konseptmiks,
    kjederVsUavhengige,
    overUnderandel,
    utviklingPerÅr
  };
}

// ============================================================================
// 3. KORTHANDEL CONVERTER
// ============================================================================

function convertKorthandel(sourceDir, nokkeltallFile) {
  console.log('  Converting KORTHANDEL...');

  // Load nøkkeltall
  let nokkeltall = {
    dagligKorthandel: 3.0,
    totalKorthandel: 2200,
    beløpPerTransaksjon: 267,
    endring30d: 1
  };

  if (nokkeltallFile) {
    const nokkeltallPath = path.join(sourceDir, nokkeltallFile);
    if (fs.existsSync(nokkeltallPath)) {
      const data = JSON.parse(fs.readFileSync(nokkeltallPath, 'utf8'));
      const dagligStr = data.nokkelstall?.korthandel?.daglig_korthandel || '3 mill NOK';
      nokkeltall.dagligKorthandel = parseFloat(dagligStr.replace(/[^\d.]/g, '')) || 3.0;
    }
  }

  // Tidsserie (daily data)
  const tidsserieContent = readCSV(path.join(sourceDir, 'Korthandel i valgt tidsrom KORTHANDEL.csv'));
  const tidsserie = [];

  if (tidsserieContent) {
    const rows = parseSimpleCSV(tidsserieContent);
    for (const row of rows) {
      if (row.length >= 4) {
        const dateStr = row[3];
        const total = parseNumber(row[2]);
        if (dateStr && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
          // Split by approximate category distribution (50% mat, 35% handel, 15% tjenester)
          tidsserie.push({
            date: dateStr,
            mat_opplevelser: Math.round(total * 0.50 * 1000) / 1000,
            handel: Math.round(total * 0.35 * 1000) / 1000,
            tjenester: Math.round(total * 0.15 * 1000) / 1000
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

// ============================================================================
// 4. BEVEGELSE CONVERTER
// ============================================================================

function convertBevegelse(sourceDir, nokkeltallFile) {
  console.log('  Converting BEVEGELSE...');

  // Load nøkkeltall
  let nokkeltall = {
    dagligBesøk: 46476,
    besøkPerKm2: 52198,
    travlesteDag: 'Lørdag',
    lørdagAndel: 16,
    periode: '01.10.2022 - 30.09.2025'
  };

  if (nokkeltallFile) {
    const nokkeltallPath = path.join(sourceDir, nokkeltallFile);
    if (fs.existsSync(nokkeltallPath)) {
      const data = JSON.parse(fs.readFileSync(nokkeltallPath, 'utf8'));
      nokkeltall.dagligBesøk = data.nokkelstall?.bevegelse?.gj_snitt_daglige_besok || 46476;
      nokkeltall.besøkPerKm2 = data.nokkelstall?.bevegelse?.gj_snitt_daglige_besok_per_km2 || 52198;
      nokkeltall.travlesteDag = data.nokkelstall?.bevegelse?.travleste_dag || 'lørdag';
      nokkeltall.periode = data.nokkelstall?.bevegelse?.periode?.replace(' to ', ' - ') || nokkeltall.periode;
    }
  }

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

// ============================================================================
// 5. BESØKENDE CONVERTER
// ============================================================================

function convertBesokende(sourceDir) {
  console.log('  Converting BESØKENDE...');

  // Check if we have besøkende data
  const aldersFile = path.join(sourceDir, 'Alders- og kjønnsfordeling (besøkende) BESØKENDE.csv');
  if (!fs.existsSync(aldersFile)) {
    console.log('    No BESØKENDE data found');
    return null;
  }

  // Aldersfordeling besøkende
  const aldersContent = readCSV(aldersFile);
  const aldersfordeling = { mann: [], kvinne: [] };

  if (aldersContent) {
    const rows = parseSimpleCSV(aldersContent);
    for (const row of rows) {
      if (row.length >= 3) {
        aldersfordeling.mann.push({ kategori: row[0], antall: Math.round(parseNumber(row[1])) });
        aldersfordeling.kvinne.push({ kategori: row[0], antall: Math.round(parseNumber(row[2])) });
      }
    }
  }

  // Husholdningstyper besøkende
  const husholdningerContent = readCSV(path.join(sourceDir, 'Husholdningstypefordeling (besøkende) BESØKENDE.csv'));
  const husholdningstyper = [];

  if (husholdningerContent) {
    const rows = parseSimpleCSV(husholdningerContent);
    for (const row of rows) {
      if (row.length >= 2) {
        husholdningstyper.push({ type: row[0], antall: Math.round(parseNumber(row[1])) });
      }
    }
  }

  // Inntektsfordeling besøkende
  const inntektContent = readCSV(path.join(sourceDir, 'Inntektsfordeling (besøkende) BESØKENDE.csv'));
  const inntektsfordeling = [];

  if (inntektContent) {
    const rows = parseSimpleCSV(inntektContent);
    for (const row of rows) {
      if (row.length >= 2) {
        inntektsfordeling.push({ kategori: row[0], antall: Math.round(parseNumber(row[1])) });
      }
    }
  }

  // Medianinntekt besøkende
  const medianContent = readCSV(path.join(sourceDir, 'Medianinntekt per husholdningstype (besøkende) BESØKENDE.csv'));
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

  // Områder besøkende kommer fra
  const områderContent = readCSV(path.join(sourceDir, 'Omrader_besokende_kommer_fra BESØKENDE.csv'));
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
    aldersfordeling,
    husholdningstyper,
    inntektsfordeling,
    medianInntektPerHusholdningstype,
    områderBesøkendeKommerFra
  };
}

// ============================================================================
// 6. INTERNASJONALT CONVERTER
// ============================================================================

function convertInternasjonalt(sourceDir) {
  console.log('  Converting INTERNASJONALT...');

  const landFile = path.join(sourceDir, 'Topp 20 land besøkende til området (i %) INTERNASJONALT BESØKENDE.csv');
  if (!fs.existsSync(landFile)) {
    console.log('    No INTERNASJONALT data found');
    return null;
  }

  const landContent = readCSV(landFile);
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

// ============================================================================
// AKTØRER CONVERTER (already exists, but update format)
// ============================================================================

function convertAktorer(sourceDir, aktorerFile) {
  console.log('  Converting AKTØRER...');

  const csvPath = path.join(sourceDir, aktorerFile);
  if (!fs.existsSync(csvPath)) {
    console.log('    No AKTØRER file found');
    return {
      actors: [],
      categoryStats: {},
      metadata: {
        totalActors: 0,
        totalCategories: 0,
        totalRevenue: 0,
        generatedAt: new Date().toISOString().split('T')[0],
        analysisType: '1min-gange',
        areaSize: '0.46 km²'
      }
    };
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const actors = [];

  // Parse CSV with multi-line cells
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

        const kjedeAnsatteMatch = ansatteStr.match(/(\d+)\s*i\s*(\d+)\s*lokasjoner/);
        const ansatteKjede = kjedeAnsatteMatch ? parseInt(kjedeAnsatteMatch[1]) : 0;
        const kjedeLokasjoner = kjedeAnsatteMatch ? parseInt(kjedeAnsatteMatch[2]) : 1;

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
          ansatteKjede,
          kjedeLokasjoner,
          markedsandel
        });
      }

      currentRecord = [];
    } else {
      currentCell += '\n';
    }
  }

  // Build categoryStats
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
      analysisType: '1min-gange',
      areaSize: '0.46 km²'
    }
  };
}

// ============================================================================
// MAIN PROCESSING
// ============================================================================

console.log('Converting all 1-minute analysis data...\n');

for (const property of properties) {
  console.log(`\n=== Processing ${property.id} ===`);

  const outputDir = path.join(process.cwd(), property.outputDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Convert each section
  const demografi = convertDemografi(property.sourceDir, property.nokkeltallFile);
  const konkurransebilde = convertKonkurransebilde(property.sourceDir, property.nokkeltallFile);
  const korthandel = convertKorthandel(property.sourceDir, property.nokkeltallFile);
  const bevegelse = convertBevegelse(property.sourceDir, property.nokkeltallFile);
  const besokende = convertBesokende(property.sourceDir);
  const internasjonalt = convertInternasjonalt(property.sourceDir);
  const aktorer = convertAktorer(property.sourceDir, property.aktorerFile);

  // Write individual JSON files
  fs.writeFileSync(path.join(outputDir, 'demografi.json'), JSON.stringify(demografi, null, 2));
  fs.writeFileSync(path.join(outputDir, 'konkurransebilde.json'), JSON.stringify(konkurransebilde, null, 2));
  fs.writeFileSync(path.join(outputDir, 'korthandel.json'), JSON.stringify(korthandel, null, 2));
  fs.writeFileSync(path.join(outputDir, 'bevegelse.json'), JSON.stringify(bevegelse, null, 2));
  fs.writeFileSync(path.join(outputDir, 'aktorer.json'), JSON.stringify(aktorer, null, 2));

  if (besokende) {
    fs.writeFileSync(path.join(outputDir, 'besokende.json'), JSON.stringify(besokende, null, 2));
  }

  if (internasjonalt) {
    fs.writeFileSync(path.join(outputDir, 'internasjonalt.json'), JSON.stringify(internasjonalt, null, 2));
  }

  console.log(`  Output files written to ${property.outputDir}`);

  // Summary
  console.log(`  Summary:`);
  console.log(`    - Demografi: ${demografi.aldersfordeling.mann.length} age categories`);
  console.log(`    - Konkurransebilde: ${konkurransebilde.konseptmiks.length} concepts`);
  console.log(`    - Korthandel: ${korthandel.tidsserie.length} days`);
  console.log(`    - Bevegelse: ${bevegelse.perTime.length} hourly datapoints`);
  console.log(`    - Besøkende: ${besokende ? besokende.områderBesøkendeKommerFra.length + ' areas' : 'N/A'}`);
  console.log(`    - Internasjonalt: ${internasjonalt ? internasjonalt.toppLand.length + ' countries' : 'N/A'}`);
  console.log(`    - Aktører: ${aktorer.actors.length} actors`);
}

console.log('\n\nDone!');
