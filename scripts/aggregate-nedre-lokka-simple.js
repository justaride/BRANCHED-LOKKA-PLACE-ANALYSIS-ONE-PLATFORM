#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */

/**
 * Simplified Nedre Løkka Data Aggregation
 * Works with actual data structure (dynamic column names)
 */

const fs = require('fs');
const path = require('path');

const MICRO_AREAS = [
  'ovre-thorvald-meyers-gate',
  'nedre-thorvald-meyers-gate',
  'olaf-ryes-plass-boots',
  'olaf-ryes-plass-7eleven',
  'midt-i-markveien',
  'nederst-i-markveien'
];

const AREA_NAMES = {
  'ovre-thorvald-meyers-gate': 'Øvre Thorvald Meyers gate',
  'nedre-thorvald-meyers-gate': 'Nedre Thorvald Meyers gate',
  'olaf-ryes-plass-boots': 'Olaf Ryes Plass v/ Boots',
  'olaf-ryes-plass-7eleven': 'Olaf Ryes Plass v/ 7-Eleven',
  'midt-i-markveien': 'Midt i Markveien',
  'nederst-i-markveien': 'Nederst i Markveien'
};

const BASE_PATH = path.join(__dirname, '..');
const DATA_PATH = path.join(BASE_PATH, 'src/data/main-board');
const OUTPUT_PATH = path.join(BASE_PATH, 'public/data/main-board/nedre-lokka-omradeprofil');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.warn(`Warning: Could not load ${filePath}`);
    return null;
  }
}

function saveJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Created: ${path.relative(BASE_PATH, filePath)}`);
}

// Extract Mann/Kvinne values from dynamic column names
function extractDemografiValues(row) {
  const values = { mann: 0, kvinne: 0 };
  for (const [key, value] of Object.entries(row)) {
    if (key.toLowerCase().includes('mann') && !key.toLowerCase().includes('kvinne')) {
      values.mann = value || 0;
    } else if (key.toLowerCase().includes('kvinne')) {
      values.kvinne = value || 0;
    }
  }
  return values;
}

// Extract movement values from dynamic column names
function extractBevegelseValues(row) {
  const values = { besokende: 0, paJobb: 0, hjemme: 0 };
  for (const [key, value] of Object.entries(row)) {
    const keyLower = key.toLowerCase();
    if (keyLower.includes('besøkende')) {
      values.besokende = value || 0;
    } else if (keyLower.includes('på jobb')) {
      values.paJobb = value || 0;
    } else if (keyLower.includes('hjemme')) {
      values.hjemme = value || 0;
    }
  }
  return values;
}

// =============================================================================
// DEMOGRAFI
// =============================================================================
function aggregateDemografi() {
  console.log('\n📊 Aggregating Demographics...');

  const ageData = {};

  MICRO_AREAS.forEach(area => {
    const agePath = path.join(DATA_PATH, area, 'demografi/aldersfordeling.json');
    const ageJson = loadJson(agePath);

    if (Array.isArray(ageJson)) {
      ageJson.forEach(row => {
        const category = row.Category;
        if (!category) return;

        if (!ageData[category]) {
          ageData[category] = { mann: 0, kvinne: 0 };
        }

        const values = extractDemografiValues(row);
        ageData[category].mann += values.mann;
        ageData[category].kvinne += values.kvinne;
      });
    }
  });

  const aldersfordeling = Object.entries(ageData).map(([aldersgruppe, values]) => ({
    aldersgruppe,
    mann: Math.round(values.mann),
    kvinne: Math.round(values.kvinne),
    total: Math.round(values.mann + values.kvinne)
  }));

  const totalPopulation = aldersfordeling.reduce((sum, item) => sum + item.total, 0);

  saveJson(path.join(OUTPUT_PATH, 'demografi/aldersfordeling.json'), {
    omrade: 'Nedre Løkka',
    totalBefolkning: totalPopulation,
    aldersfordeling
  });

  console.log(`   Total population: ${totalPopulation.toLocaleString('nb-NO')}`);
  return totalPopulation;
}

// =============================================================================
// BEVEGELSE
// =============================================================================
function aggregateBevegelse() {
  console.log('\n🚶 Aggregating Movement Patterns...');

  const hourlyData = {};
  const weeklyData = {};
  const areaBreakdown = {};

  MICRO_AREAS.forEach(area => {
    const areaName = AREA_NAMES[area];
    let areaTotal = 0;

    // Hourly
    const hourlyPath = path.join(DATA_PATH, area, 'bevegelse/besok-per-time.json');
    const hourlyJson = loadJson(hourlyPath);

    if (Array.isArray(hourlyJson)) {
      hourlyJson.forEach(row => {
        const time = row.Category;
        if (!time) return;

        if (!hourlyData[time]) {
          hourlyData[time] = { besokende: 0, paJobb: 0, hjemme: 0 };
        }

        const values = extractBevegelseValues(row);
        hourlyData[time].besokende += values.besokende;
        hourlyData[time].paJobb += values.paJobb;
        hourlyData[time].hjemme += values.hjemme;

        areaTotal += values.besokende;
      });
    }

    // Weekly
    const weeklyPath = path.join(DATA_PATH, area, 'bevegelse/besok-per-ukedag.json');
    const weeklyJson = loadJson(weeklyPath);

    if (Array.isArray(weeklyJson)) {
      weeklyJson.forEach(row => {
        const day = row.Category;
        if (!day) return;

        if (!weeklyData[day]) {
          weeklyData[day] = { besokende: 0, paJobb: 0, hjemme: 0 };
        }

        const values = extractBevegelseValues(row);
        weeklyData[day].besokende += values.besokende;
        weeklyData[day].paJobb += values.paJobb;
        weeklyData[day].hjemme += values.hjemme;
      });
    }

    areaBreakdown[areaName] = Math.round(areaTotal / 24);
  });

  const besokPerTime = Object.entries(hourlyData).map(([time, values]) => ({
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

  const dailyVisitors = Math.round(
    besokPerTime.reduce((sum, item) => sum + item.besokende, 0) / 24
  );

  const omradeBreakdown = Object.entries(areaBreakdown).map(([omrade, dagligBesok]) => ({
    omrade,
    dagligBesok
  }));

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
  return dailyVisitors;
}

// =============================================================================
// VIRKSOMHETER
// =============================================================================
function aggregateVirksomheter() {
  console.log('\n🏢 Aggregating Businesses...');

  const allBusinesses = [];
  const categoryCount = {};
  const categoryRevenue = {};
  const areaCount = {};
  let totalRevenue = 0;

  MICRO_AREAS.forEach(area => {
    const areaName = AREA_NAMES[area];
    const aktorPath = path.join(DATA_PATH, 'aktorer', `${area}.json`);
    const aktorJson = loadJson(aktorPath);

    if (aktorJson?.actors) {
      areaCount[areaName] = aktorJson.actors.length;

      aktorJson.actors.forEach(business => {
        const type = business.type || 'Ukjent';
        const revenue = business.omsetning || 0;

        allBusinesses.push({
          navn: business.navn,
          type,
          omsetning: revenue,
          adresse: business.adresse,
          ansatte: business.ansatte
        });

        categoryCount[type] = (categoryCount[type] || 0) + 1;
        categoryRevenue[type] = (categoryRevenue[type] || 0) + revenue;
        totalRevenue += revenue;
      });
    }
  });

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

  saveJson(path.join(OUTPUT_PATH, 'virksomheter/oversikt.json'), {
    omrade: 'Nedre Løkka',
    totalVirksomheter: allBusinesses.length,
    totalOmsetning: Math.round(totalRevenue),
    kategoriOversikt,
    omradeOversikt
  });

  saveJson(path.join(OUTPUT_PATH, 'virksomheter/alle-virksomheter.json'), {
    omrade: 'Nedre Løkka',
    antall: allBusinesses.length,
    virksomheter: allBusinesses
  });

  console.log(`   Total businesses: ${allBusinesses.length}`);
  console.log(`   Total revenue: ${(totalRevenue).toFixed(1)} million NOK`);
  return { count: allBusinesses.length, revenue: totalRevenue };
}

// =============================================================================
// MAIN
// =============================================================================
function main() {
  console.log('🚀 Starting Nedre Løkka Data Aggregation...');
  console.log(`📁 Output: ${OUTPUT_PATH}\n`);

  try {
    const population = aggregateDemografi();
    const dailyVisitors = aggregateBevegelse();
    const businesses = aggregateVirksomheter();

    console.log('\n✅ Aggregation complete!\n');
    console.log('📊 Summary:');
    console.log(`   Population: ${population.toLocaleString('nb-NO')}`);
    console.log(`   Daily visitors: ${dailyVisitors.toLocaleString('nb-NO')}`);
    console.log(`   Businesses: ${businesses.count}`);
    console.log(`   Revenue: ${(businesses.revenue).toFixed(1)} million NOK`);
    console.log('\n🎯 Ready for component integration!');

  } catch (error) {
    console.error('\n❌ Error during aggregation:', error);
    process.exit(1);
  }
}

main();
