#!/usr/bin/env ts-node

/**
 * Nedre Løkka Data Aggregation Script
 *
 * Aggregates data from 6 micro-areas into unified "Nedre Løkka" profile:
 * 1. Øvre Thorvald Meyers gate
 * 2. Nedre Thorvald Meyers gate
 * 3. Olaf Ryes Plass v/ Boots
 * 4. Olaf Ryes Plass v/ 7-Eleven
 * 5. Midt i Markveien
 * 6. Nederst i Markveien
 *
 * Output: JSON files in public/data/main-board/nedre-lokka-omradeprofil/
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Micro-area identifiers
const MICRO_AREAS = [
  'ovre-thorvald-meyers-gate',
  'nedre-thorvald-meyers-gate',
  'olaf-ryes-plass-boots',
  'olaf-ryes-plass-7eleven',
  'midt-i-markveien',
  'nederst-i-markveien'
];

// Friendly names for display
const AREA_NAMES: { [key: string]: string } = {
  'ovre-thorvald-meyers-gate': 'Øvre Thorvald Meyers gate',
  'nedre-thorvald-meyers-gate': 'Nedre Thorvald Meyers gate',
  'olaf-ryes-plass-boots': 'Olaf Ryes Plass v/ Boots',
  'olaf-ryes-plass-7eleven': 'Olaf Ryes Plass v/ 7-Eleven',
  'midt-i-markveien': 'Midt i Markveien',
  'nederst-i-markveien': 'Nederst i Markveien'
};

// Business category mapping (user categories → data types)
const CATEGORY_MAPPING: { [key: string]: string[] } = {
  'Butikker': [
    'Matbutikk', 'Klesbutikk', 'Bokhandel', 'Blomsterbutikk',
    'Interiørbutikk', 'Kunstgalleri', 'Vinmonopol', 'Elektronikkbutikk',
    'Sportsbutikk', 'Lekebutikk', 'Musikkbutikk'
  ],
  'Kaféer og restauranter': [
    'Restaurant', 'Kafé', 'Bar', 'Nattklubb', 'Bakeri', 'Pub', 'Ølbar'
  ],
  'Kreative kontorplasser': [
    'Kontor', 'Galleri', 'Atelier', 'Designbyrå', 'Reklamebyrå',
    'Arkitektkontor', 'PR-byrå', 'Kreativt byrå'
  ],
  'Helse og velvære': [
    'Apotek', 'Frisør', 'Treningssenter', 'Yogastudio', 'Klinikk',
    'Massasje', 'Skjønnhetssalong'
  ],
  'Andre': [] // Will be filled with remaining types
};

const BASE_PATH = path.join(__dirname, '..');
const DATA_PATH = path.join(BASE_PATH, 'src/data/main-board');
const OUTPUT_PATH = path.join(BASE_PATH, 'public/data/main-board/nedre-lokka-omradeprofil');

// Ensure output directory exists
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Load JSON file safely
function loadJson(filePath: string): any {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Warning: Could not load ${filePath}`);
    return null;
  }
}

// Save JSON file with formatting
function saveJson(filePath: string, data: any) {
  const dir = path.dirname(filePath);
  ensureDir(dir);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Created: ${path.relative(BASE_PATH, filePath)}`);
}

// ============================================================================
// DEMOGRAFI AGGREGATION
// ============================================================================

interface AgeDistribution {
  aldersgruppe: string;
  mann: number;
  kvinne: number;
  total: number;
}

function aggregateDemografi() {
  console.log('\n📊 Aggregating Demographics...');

  const ageData: { [key: string]: { mann: number; kvinne: number } } = {};
  const householdData: { [key: string]: number } = {};

  MICRO_AREAS.forEach(area => {
    // Load age distribution
    const agePath = path.join(DATA_PATH, area, 'demografi/aldersfordeling.json');
    const ageJson = loadJson(agePath);

    if (ageJson?.aldersfordeling) {
      ageJson.aldersfordeling.forEach((item: any) => {
        const group = item.aldersgruppe;
        if (!ageData[group]) {
          ageData[group] = { mann: 0, kvinne: 0 };
        }
        ageData[group].mann += item.mann || 0;
        ageData[group].kvinne += item.kvinne || 0;
      });
    }

    // Load household types
    const householdPath = path.join(DATA_PATH, area, 'demografi/antall-husholdninger.json');
    const householdJson = loadJson(householdPath);

    if (householdJson?.husholdninger) {
      householdJson.husholdninger.forEach((item: any) => {
        const type = item.type;
        if (!householdData[type]) {
          householdData[type] = 0;
        }
        householdData[type] += item.antall || 0;
      });
    }
  });

  // Convert to output format
  const aldersfordeling: AgeDistribution[] = Object.entries(ageData)
    .map(([aldersgruppe, values]) => ({
      aldersgruppe,
      mann: Math.round(values.mann),
      kvinne: Math.round(values.kvinne),
      total: Math.round(values.mann + values.kvinne)
    }))
    .sort((a, b) => {
      // Sort by age group order
      const order = ['0-5', '6-12', '13-15', '16-19', '20-24', '25-39', '40-54', '55-66', '67-74', '75-84', '85+'];
      return order.indexOf(a.aldersgruppe) - order.indexOf(b.aldersgruppe);
    });

  const husholdninger = Object.entries(householdData).map(([type, antall]) => ({
    type,
    antall: Math.round(antall as number)
  }));

  // Calculate totals
  const totalPopulation = aldersfordeling.reduce((sum, item) => sum + item.total, 0);
  const totalHouseholds = husholdninger.reduce((sum, item) => sum + item.antall, 0);

  // Save files
  saveJson(path.join(OUTPUT_PATH, 'demografi/aldersfordeling.json'), {
    omrade: 'Nedre Løkka',
    totalBefolkning: totalPopulation,
    aldersfordeling
  });

  saveJson(path.join(OUTPUT_PATH, 'demografi/husholdninger.json'), {
    omrade: 'Nedre Løkka',
    totalHusholdninger: totalHouseholds,
    husholdninger
  });

  console.log(`   Total population: ${totalPopulation.toLocaleString('nb-NO')}`);
  console.log(`   Total households: ${totalHouseholds.toLocaleString('nb-NO')}`);
}

// ============================================================================
// BEVEGELSE AGGREGATION
// ============================================================================

interface HourlyMovement {
  time: string;
  besokende: number;
  paJobb: number;
  hjemme: number;
  total: number;
}

function aggregateBevegelse() {
  console.log('\n🚶 Aggregating Movement Patterns...');

  const hourlyData: { [key: string]: { besokende: number; paJobb: number; hjemme: number } } = {};
  const weeklyData: { [key: string]: { besokende: number; paJobb: number; hjemme: number } } = {};
  const areaBreakdown: { [key: string]: number } = {};

  MICRO_AREAS.forEach(area => {
    const areaName = AREA_NAMES[area];
    let areaTotal = 0;

    // Load hourly data
    const hourlyPath = path.join(DATA_PATH, area, 'bevegelse/besok-per-time.json');
    const hourlyJson = loadJson(hourlyPath);

    if (hourlyJson?.besokePerTime) {
      hourlyJson.besokePerTime.forEach((item: any) => {
        const time = item.time;
        if (!hourlyData[time]) {
          hourlyData[time] = { besokende: 0, paJobb: 0, hjemme: 0 };
        }
        hourlyData[time].besokende += item.besokende || 0;
        hourlyData[time].paJobb += item.paJobb || 0;
        hourlyData[time].hjemme += item.hjemme || 0;

        areaTotal += item.besokende || 0;
      });
    }

    // Load weekly data
    const weeklyPath = path.join(DATA_PATH, area, 'bevegelse/besok-per-ukedag.json');
    const weeklyJson = loadJson(weeklyPath);

    if (weeklyJson?.besokePerUkedag) {
      weeklyJson.besokePerUkedag.forEach((item: any) => {
        const day = item.ukedag;
        if (!weeklyData[day]) {
          weeklyData[day] = { besokende: 0, paJobb: 0, hjemme: 0 };
        }
        weeklyData[day].besokende += item.besokende || 0;
        weeklyData[day].paJobb += item.paJobb || 0;
        weeklyData[day].hjemme += item.hjemme || 0;
      });
    }

    areaBreakdown[areaName] = Math.round(areaTotal / 24); // Average per hour
  });

  // Convert to output format
  const besokPerTime: HourlyMovement[] = Object.entries(hourlyData).map(([time, values]) => ({
    time,
    besokende: Math.round(values.besokende),
    paJobb: Math.round(values.paJobb),
    hjemme: Math.round(values.hjemme),
    total: Math.round(values.besokende + values.paJobb + values.hjemme)
  }));

  const besokPerUkedag = Object.entries(weeklyData).map(([ukedag, values]) => ({
    ukedag,
    besokende: Math.round(values.besokende),
    paJobb: Math.round(values.paJobb),
    hjemme: Math.round(values.hjemme),
    total: Math.round(values.besokende + values.paJobb + values.hjemme)
  }));

  // Calculate daily total (average of hourly data)
  const dailyVisitors = Math.round(
    besokPerTime.reduce((sum, item) => sum + item.besokende, 0) / 24
  );

  const omradeBreakdown = Object.entries(areaBreakdown).map(([omrade, dagligBesok]) => ({
    omrade,
    dagligBesok
  }));

  // Save files
  saveJson(path.join(OUTPUT_PATH, 'bevegelse/besok-per-time.json'), {
    omrade: 'Nedre Løkka',
    besokPerTime
  });

  saveJson(path.join(OUTPUT_PATH, 'bevegelse/besok-per-ukedag.json'), {
    omrade: 'Nedre Løkka',
    besokPerUkedag
  });

  saveJson(path.join(OUTPUT_PATH, 'bevegelse/daglig-total.json'), {
    omrade: 'Nedre Løkka',
    dagligBesokeTotal: dailyVisitors,
    merknad: 'Faktisk tall fra data. Avvik fra estimert 93,000 kan skyldes ulike måleperioder eller definisjoner.',
    omradeBreakdown
  });

  console.log(`   Daily visitors (actual): ${dailyVisitors.toLocaleString('nb-NO')}`);
  console.log(`   Note: Discrepancy with 93,000 documented in data file`);
}

// ============================================================================
// VIRKSOMHETER AGGREGATION
// ============================================================================

interface Business {
  navn: string;
  type: string;
  kategori?: string;
  omsetning?: number;
  adresse?: string;
}

function categorizeBusinessType(type: string): string {
  for (const [category, types] of Object.entries(CATEGORY_MAPPING)) {
    if (types.includes(type)) {
      return category;
    }
  }
  return 'Andre';
}

function aggregateVirksomheter() {
  console.log('\n🏢 Aggregating Businesses...');

  const allBusinesses: Business[] = [];
  const categoryCount: { [key: string]: number } = {};
  const categoryRevenue: { [key: string]: number } = {};
  const areaCount: { [key: string]: number } = {};
  let totalRevenue = 0;

  MICRO_AREAS.forEach(area => {
    const areaName = AREA_NAMES[area];

    const aktorPath = path.join(DATA_PATH, 'aktorer', `${area}.json`);
    const aktorJson = loadJson(aktorPath);

    if (aktorJson?.businesses) {
      areaCount[areaName] = aktorJson.businesses.length;

      aktorJson.businesses.forEach((business: any) => {
        const type = business.type || 'Ukjent';
        const category = categorizeBusinessType(type);
        const revenue = business.omsetning || 0;

        allBusinesses.push({
          navn: business.navn,
          type,
          kategori: category,
          omsetning: revenue,
          adresse: business.adresse
        });

        // Count by category
        categoryCount[category] = (categoryCount[category] || 0) + 1;

        // Revenue by category
        categoryRevenue[category] = (categoryRevenue[category] || 0) + revenue;

        totalRevenue += revenue;
      });
    }
  });

  // Convert to output format
  const kategoriOversikt = Object.entries(categoryCount).map(([kategori, antall]) => ({
    kategori,
    antall,
    omsetning: categoryRevenue[kategori] || 0,
    andel: Math.round((antall / allBusinesses.length) * 100)
  })).sort((a, b) => b.antall - a.antall);

  const omradeOversikt = Object.entries(areaCount).map(([omrade, antall]) => ({
    omrade,
    antall,
    andel: Math.round((antall / allBusinesses.length) * 100)
  })).sort((a, b) => b.antall - a.antall);

  // Save files
  saveJson(path.join(OUTPUT_PATH, 'virksomheter/oversikt.json'), {
    omrade: 'Nedre Løkka',
    totalVirksomheter: allBusinesses.length,
    totalOmsetning: totalRevenue,
    kategoriOversikt,
    omradeOversikt
  });

  saveJson(path.join(OUTPUT_PATH, 'virksomheter/alle-virksomheter.json'), {
    omrade: 'Nedre Løkka',
    antall: allBusinesses.length,
    virksomheter: allBusinesses
  });

  console.log(`   Total businesses: ${allBusinesses.length}`);
  console.log(`   Total revenue: ${(totalRevenue / 1000000).toFixed(1)} million NOK`);
  console.log(`   Categories: ${Object.keys(categoryCount).length}`);
}

// ============================================================================
// OMSETNING AGGREGATION (from korthandel data)
// ============================================================================

function aggregateOmsetning() {
  console.log('\n💳 Aggregating Revenue Data...');

  const monthlyData: { [key: string]: number } = {};
  let totalTransactions = 0;
  let totalAmount = 0;

  MICRO_AREAS.forEach(area => {
    const korthandelPath = path.join(DATA_PATH, area, 'korthandel');

    if (fs.existsSync(korthandelPath)) {
      const files = fs.readdirSync(korthandelPath);

      files.forEach(file => {
        if (file.endsWith('.json')) {
          const data = loadJson(path.join(korthandelPath, file));

          if (data?.korthandel) {
            data.korthandel.forEach((item: any) => {
              const month = item.month || item.periode;
              if (month) {
                monthlyData[month] = (monthlyData[month] || 0) + (item.omsetning || 0);
              }
              totalTransactions += item.antallTransaksjoner || 0;
              totalAmount += item.omsetning || 0;
            });
          }
        }
      });
    }
  });

  const manedligOmsetning = Object.entries(monthlyData).map(([maned, omsetning]) => ({
    maned,
    omsetning: Math.round(omsetning)
  })).sort((a, b) => a.maned.localeCompare(b.maned));

  const avgTransaction = totalTransactions > 0 ? totalAmount / totalTransactions : 0;

  saveJson(path.join(OUTPUT_PATH, 'omsetning/korthandel.json'), {
    omrade: 'Nedre Løkka',
    totalOmsetning: Math.round(totalAmount),
    totalTransaksjoner: totalTransactions,
    gjennomsnittligTransaksjon: Math.round(avgTransaction),
    manedligOmsetning
  });

  console.log(`   Total card transactions: ${totalTransactions.toLocaleString('nb-NO')}`);
  console.log(`   Total amount: ${(totalAmount / 1000000).toFixed(1)} million NOK`);
  console.log(`   Avg transaction: ${Math.round(avgTransaction).toLocaleString('nb-NO')} NOK`);
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
  console.log('🚀 Starting Nedre Løkka Data Aggregation...');
  console.log(`📁 Output: ${OUTPUT_PATH}\n`);

  try {
    aggregateDemografi();
    aggregateBevegelse();
    aggregateVirksomheter();
    aggregateOmsetning();

    console.log('\n✅ Aggregation complete!\n');
    console.log('Generated files:');
    console.log('  - demografi/aldersfordeling.json');
    console.log('  - demografi/husholdninger.json');
    console.log('  - bevegelse/besok-per-time.json');
    console.log('  - bevegelse/besok-per-ukedag.json');
    console.log('  - bevegelse/daglig-total.json');
    console.log('  - virksomheter/oversikt.json');
    console.log('  - virksomheter/alle-virksomheter.json');
    console.log('  - omsetning/korthandel.json');
    console.log('\n🎯 Ready for component integration!');

  } catch (error) {
    console.error('\n❌ Error during aggregation:', error);
    process.exit(1);
  }
}

// Run if executed directly (ES module check)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  main();
}

export { main };
