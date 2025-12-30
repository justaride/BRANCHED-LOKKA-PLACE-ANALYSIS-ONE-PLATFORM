#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */

/**
 * Fix script for 1-min and 5-min analysis JSON files
 * Applies automated fixes for field naming and structure issues
 *
 * Usage: node scripts/fix-analysis-json.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'src/data');

const DRY_RUN = process.argv.includes('--dry-run');

// Properties with analysis data
const ANALYSIS_PROPERTIES = [
  { tenant: 'aspelin-ramm', property: 'mathallen', type: '1min' },
  { tenant: 'aspelin-ramm', property: 'vulkan-omradet', type: '5min' },
  { tenant: 'carucel', property: 'olaf-ryes-plass-4', type: '1min' },
  { tenant: 'spabo', property: 'sofienberggata-6', type: '1min' },
  { tenant: 'roger-vodal', property: 'olaf-ryes-plass-3', type: '5min' },
  { tenant: 'roger-vodal', property: 'thorvald-meyersgate-33', type: '5min' },
  { tenant: 'roger-vodal', property: 'thorvald-meyersgate-40', type: '5min' },
  { tenant: 'roger-vodal', property: 'thorvald-meyersgate-44', type: '5min' },
  { tenant: 'roger-vodal', property: 'markveien-38', type: '5min' },
  { tenant: 'roger-vodal', property: 'markveien-42', type: '5min' },
  { tenant: 'roger-vodal', property: 'markveien-58', type: '5min' },
];

// Day name mappings
const DAY_FIXES = {
  'Monday': 'man.',
  'Tuesday': 'tir.',
  'Wednesday': 'ons.',
  'Thursday': 'tor.',
  'Friday': 'fre.',
  'Saturday': 'lør.',
  'Sunday': 'søn.',
};

let stats = { files: 0, fixes: 0 };

function log(type, msg) {
  const prefix = {
    info: `${COLORS.blue}ℹ${COLORS.reset}`,
    success: `${COLORS.green}✓${COLORS.reset}`,
    warn: `${COLORS.yellow}⚠${COLORS.reset}`,
    error: `${COLORS.red}✗${COLORS.reset}`,
    fix: `${COLORS.cyan}→${COLORS.reset}`,
  };
  console.log(`${prefix[type] || ''} ${msg}`);
}

// Fix categoryStats: count → antall
function fixCategoryStats(data) {
  let fixed = 0;
  if (data.categoryStats && typeof data.categoryStats === 'object') {
    for (const [category, stats] of Object.entries(data.categoryStats)) {
      if (stats.count !== undefined && stats.antall === undefined) {
        stats.antall = stats.count;
        delete stats.count;
        fixed++;
      }
    }
  }
  return fixed;
}

// Fix day names in korthandelPerUkedag
function fixDayNames(data) {
  let fixed = 0;
  if (data.korthandelPerUkedag && Array.isArray(data.korthandelPerUkedag)) {
    for (const item of data.korthandelPerUkedag) {
      if (item.dag && DAY_FIXES[item.dag]) {
        item.dag = DAY_FIXES[item.dag];
        fixed++;
      }
    }
  }
  return fixed;
}

// Fix year → år in arrays
function fixYearField(array) {
  let fixed = 0;
  if (Array.isArray(array)) {
    for (const item of array) {
      if (item.year !== undefined && item['år'] === undefined) {
        item['år'] = item.year;
        delete item.year;
        fixed++;
      }
    }
  }
  return fixed;
}

// Fix category → kategori in bevegelsesmønster
function fixBevegelsesmønster(data) {
  let fixed = 0;
  if (data.bevegelsesmønster && Array.isArray(data.bevegelsesmønster)) {
    for (const item of data.bevegelsesmønster) {
      if (item.category !== undefined && item.kategori === undefined) {
        item.kategori = item.category;
        delete item.category;
        fixed++;
      }
    }
  }
  return fixed;
}

// Fix nøkkeltall field names in korthandel.json
function fixKorthandelNokkeltall(data) {
  let fixed = 0;
  if (data['nøkkeltall']) {
    const n = data['nøkkeltall'];

    // Fix field names
    if (n.dagligOmsetning !== undefined && n.dagligKorthandel === undefined) {
      n.dagligKorthandel = n.dagligOmsetning;
      delete n.dagligOmsetning;
      fixed++;
    }
    if (n.totalOmsetning !== undefined && n.totalKorthandel === undefined) {
      n.totalKorthandel = n.totalOmsetning;
      delete n.totalOmsetning;
      fixed++;
    }
    if (n.gjennomsnittTransaksjon !== undefined && n['beløpPerTransaksjon'] === undefined) {
      n['beløpPerTransaksjon'] = n.gjennomsnittTransaksjon;
      delete n.gjennomsnittTransaksjon;
      fixed++;
    }
    if (n.trend !== undefined && n.endring30d === undefined) {
      n.endring30d = n.trend;
      delete n.trend;
      fixed++;
    }
    // Remove extra fields not in TypeScript interface
    if (n.periode !== undefined) {
      delete n.periode;
      fixed++;
    }
    if (n.datapoints !== undefined) {
      delete n.datapoints;
      fixed++;
    }
  }
  return fixed;
}

// Fix korthandel.json
function fixKorthandel(data, filePath) {
  let totalFixes = 0;

  // Fix day names
  totalFixes += fixDayNames(data);

  // Fix nøkkeltall field names
  totalFixes += fixKorthandelNokkeltall(data);

  return totalFixes;
}

// Fix konkurransebilde.json
function fixKonkurransebilde(data, filePath) {
  let totalFixes = 0;

  // Fix year → år in kjederVsUavhengige
  if (data.kjederVsUavhengige) {
    totalFixes += fixYearField(data.kjederVsUavhengige);
  }

  // Fix year → år in utviklingPerÅr (can be array or object with .data)
  if (data['utviklingPerÅr']) {
    if (Array.isArray(data['utviklingPerÅr'])) {
      totalFixes += fixYearField(data['utviklingPerÅr']);
    } else if (data['utviklingPerÅr'].data) {
      totalFixes += fixYearField(data['utviklingPerÅr'].data);
    }
  }

  // Fix year → år in årligVekst (can be array or object with .data and .indeksertVekst)
  if (data['årligVekst']) {
    if (Array.isArray(data['årligVekst'])) {
      totalFixes += fixYearField(data['årligVekst']);
    } else {
      if (data['årligVekst'].data) {
        totalFixes += fixYearField(data['årligVekst'].data);
      }
      if (data['årligVekst'].indeksertVekst) {
        totalFixes += fixYearField(data['årligVekst'].indeksertVekst);
      }
    }
  }

  // Fix year → år in indeksertVekst (top-level)
  if (data.indeksertVekst) {
    totalFixes += fixYearField(data.indeksertVekst);
  }

  // Fix year → år in omsetningPerKategori if present
  if (data.omsetningPerKategori) {
    totalFixes += fixYearField(data.omsetningPerKategori);
  }

  // Fix day names in korthandelPerUkedag (can be object with .data)
  if (data.korthandelPerUkedag) {
    const dayArray = Array.isArray(data.korthandelPerUkedag)
      ? data.korthandelPerUkedag
      : data.korthandelPerUkedag.data;
    if (dayArray && Array.isArray(dayArray)) {
      for (const item of dayArray) {
        if (item.dag && DAY_FIXES[item.dag]) {
          item.dag = DAY_FIXES[item.dag];
          totalFixes++;
        }
      }
    }
  }

  // Fix day names in omsetningPerUkedag if present
  if (data.omsetningPerUkedag && Array.isArray(data.omsetningPerUkedag)) {
    for (const item of data.omsetningPerUkedag) {
      if (item.dag && DAY_FIXES[item.dag]) {
        item.dag = DAY_FIXES[item.dag];
        totalFixes++;
      }
    }
  }

  return totalFixes;
}

// Fix category/value in demografi arrays
function fixDemografiArrays(data) {
  let fixed = 0;

  // Fix aldersfordeling.mann and aldersfordeling.kvinne
  if (data.aldersfordeling) {
    for (const key of ['mann', 'kvinne']) {
      if (data.aldersfordeling[key] && Array.isArray(data.aldersfordeling[key])) {
        for (const item of data.aldersfordeling[key]) {
          if (item.category !== undefined && item.kategori === undefined) {
            item.kategori = item.category;
            delete item.category;
            fixed++;
          }
          if (item.value !== undefined && item.antall === undefined) {
            item.antall = item.value;
            delete item.value;
            fixed++;
          }
        }
      }
    }
  }

  // Fix inntektsfordeling
  if (data.inntektsfordeling && Array.isArray(data.inntektsfordeling)) {
    for (const item of data.inntektsfordeling) {
      if (item.category !== undefined && item.kategori === undefined) {
        item.kategori = item.category;
        delete item.category;
        fixed++;
      }
      if (item.value !== undefined && item.antall === undefined) {
        item.antall = item.value;
        delete item.value;
        fixed++;
      }
    }
  }

  // Fix husholdninger
  if (data.husholdninger && Array.isArray(data.husholdninger)) {
    for (const item of data.husholdninger) {
      if (item.value !== undefined && item.antall === undefined) {
        item.antall = item.value;
        delete item.value;
        fixed++;
      }
    }
  }

  // Fix typo: medianInntektPerHusholdstype → medianInntektPerHusholdningstype
  if (data.medianInntektPerHusholdstype && !data.medianInntektPerHusholdningstype) {
    data.medianInntektPerHusholdningstype = data.medianInntektPerHusholdstype;
    delete data.medianInntektPerHusholdstype;
    fixed++;
  }

  return fixed;
}

// Fix demografi.json
function fixDemografi(data, filePath) {
  let totalFixes = 0;

  // Fix category/value in arrays
  totalFixes += fixDemografiArrays(data);

  return totalFixes;
}

// Fix bevegelse.json
function fixBevegelse(data, filePath) {
  let totalFixes = 0;

  // Fix category → kategori in bevegelsesmønster
  totalFixes += fixBevegelsesmønster(data);

  return totalFixes;
}

// Fix aktorer.json
function fixAktorer(data, filePath) {
  let totalFixes = 0;

  // Fix count → antall in categoryStats
  totalFixes += fixCategoryStats(data);

  return totalFixes;
}

// Process a single file
function processFile(filePath, fileName) {
  if (!fs.existsSync(filePath)) return 0;

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    let fixes = 0;

    switch (fileName) {
      case 'demografi.json':
        fixes = fixDemografi(data, filePath);
        break;
      case 'korthandel.json':
        fixes = fixKorthandel(data, filePath);
        break;
      case 'konkurransebilde.json':
        fixes = fixKonkurransebilde(data, filePath);
        break;
      case 'bevegelse.json':
        fixes = fixBevegelse(data, filePath);
        break;
      case 'aktorer.json':
        fixes = fixAktorer(data, filePath);
        break;
    }

    if (fixes > 0) {
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
      }
      stats.fixes += fixes;
      return fixes;
    }

    return 0;
  } catch (error) {
    log('error', `Error processing ${filePath}: ${error.message}`);
    return 0;
  }
}

// Process all properties
function runFixes() {
  console.log(`\n${COLORS.cyan}━━━ ANALYSIS JSON AUTO-FIX ${DRY_RUN ? '(DRY RUN)' : ''} ━━━${COLORS.reset}\n`);

  for (const prop of ANALYSIS_PROPERTIES) {
    const dirPath = path.join(DATA_DIR, prop.tenant, prop.property, prop.type);
    const relPath = `${prop.tenant}/${prop.property}/${prop.type}`;

    if (!fs.existsSync(dirPath)) {
      log('warn', `${relPath} - directory not found`);
      continue;
    }

    const files = ['demografi.json', 'korthandel.json', 'konkurransebilde.json', 'bevegelse.json', 'aktorer.json'];
    let propertyFixes = 0;

    for (const fileName of files) {
      const filePath = path.join(dirPath, fileName);
      const fixes = processFile(filePath, fileName);
      if (fixes > 0) {
        log('fix', `${relPath}/${fileName}: ${fixes} fix(es)`);
        propertyFixes += fixes;
      }
      stats.files++;
    }

    if (propertyFixes === 0) {
      log('success', `${relPath} - no fixes needed`);
    }
  }

  // Summary
  console.log(`\n${COLORS.cyan}━━━ FIX SUMMARY ━━━${COLORS.reset}\n`);
  log('info', `Files processed: ${stats.files}`);
  log('info', `Total fixes applied: ${stats.fixes}`);

  if (DRY_RUN) {
    console.log(`\n${COLORS.yellow}▶ Dry run complete. Run without --dry-run to apply fixes.${COLORS.reset}\n`);
  } else if (stats.fixes > 0) {
    console.log(`\n${COLORS.green}▶ ${stats.fixes} fixes applied successfully!${COLORS.reset}\n`);
  } else {
    console.log(`\n${COLORS.green}▶ No fixes needed.${COLORS.reset}\n`);
  }
}

runFixes();
