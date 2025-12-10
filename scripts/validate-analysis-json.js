#!/usr/bin/env node

/**
 * Validation script for 1-min and 5-min analysis JSON files
 * Ensures all data matches TypeScript interfaces in src/types/one-min-analysis.ts
 *
 * Usage: node scripts/validate-analysis-json.js [--fix]
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
};

const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'src/data');

// Properties with analysis data (from one-min-loader.ts)
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

// Required files for each analysis type
const REQUIRED_FILES = {
  '1min': ['konkurransebilde.json', 'korthandel.json', 'bevegelse.json', 'aktorer.json'],
  '5min': ['demografi.json', 'konkurransebilde.json', 'korthandel.json', 'bevegelse.json', 'aktorer.json'],
};

// Optional files (for 5min analysis)
const OPTIONAL_FILES = ['demografi.json', 'besokende.json', 'internasjonalt.json'];

// Field name validators - mapping wrong names to correct Norwegian names
const FIELD_NAME_FIXES = {
  'category': 'kategori',
  'value': 'antall',
  'year': 'år',
  'count': 'antall',
};

// Day name fixes (English to Norwegian abbreviations)
const DAY_NAME_FIXES = {
  'Monday': 'man.',
  'Tuesday': 'tir.',
  'Wednesday': 'ons.',
  'Thursday': 'tor.',
  'Friday': 'fre.',
  'Saturday': 'lør.',
  'Sunday': 'søn.',
};

// Typo fixes
const TYPO_FIXES = {
  'medianInntektPerHusholdstype': 'medianInntektPerHusholdningstype',
};

// Schema definitions for each file type
const SCHEMAS = {
  'demografi.json': {
    required: ['nøkkeltall', 'aldersfordeling', 'inntektsfordeling', 'husholdninger', 'medianInntektPerHusholdningstype'],
    optional: ['demografiOverTid'],
    nøkkeltall: ['befolkning', 'befolkningstetthet', 'områdestørrelse', 'vekst'],
    arrayFields: {
      'aldersfordeling.mann': { fields: ['kategori', 'antall'] },
      'aldersfordeling.kvinne': { fields: ['kategori', 'antall'] },
      'inntektsfordeling': { fields: ['kategori', 'antall'] },
      'husholdninger': { fields: ['type', 'antall'] },
      'medianInntektPerHusholdningstype': { fields: ['type', 'median'] },
      'demografiOverTid': { fields: ['år', 'befolkning', 'trend'] },
    }
  },
  'konkurransebilde.json': {
    required: ['nøkkeltall', 'konseptmiks', 'kjederVsUavhengige'],
    optional: ['overUnderandel', 'utviklingPerÅr'],
    nøkkeltall: ['konseptTetthet', 'totalOmsetning', 'omsetningTetthet', 'trend'],
    arrayFields: {
      'konseptmiks': { fields: ['kategori1', 'kategori2', 'antall'] },
      'kjederVsUavhengige': { fields: ['år', 'uavhengig', 'kjeder'] },
      'utviklingPerÅr': { fields: ['år', 'matOpplevelser', 'handel', 'tjenester'] },
    }
  },
  'korthandel.json': {
    required: ['nøkkeltall', 'tidsserie'],
    optional: ['årligVekst', 'indeksertVekst', 'korthandelPerUkedag'],
    nøkkeltall: ['dagligKorthandel', 'totalKorthandel', 'beløpPerTransaksjon', 'endring30d'],
    arrayFields: {
      'tidsserie': { fields: ['date', 'mat_opplevelser', 'handel', 'tjenester'] },
      'årligVekst': { fields: ['år', 'område', 'oslo', 'norge'] },
      'indeksertVekst': { fields: ['år', 'område', 'oslo', 'norge'] },
      'korthandelPerUkedag': { fields: ['dag', 'år2023', 'år2024'] },
    }
  },
  'bevegelse.json': {
    required: ['nøkkeltall', 'perTime', 'perUkedag', 'bevegelsesmønster'],
    optional: [],
    nøkkeltall: ['dagligBesøk', 'besøkPerKm2', 'travlesteDag', 'lørdagAndel', 'periode'],
    arrayFields: {
      'perTime': { fields: ['time', 'besøk'] },
      'perUkedag': { fields: ['dag', 'besøkende', 'påJobb', 'hjemme'] },
      'bevegelsesmønster': { fields: ['kategori', 'besøkende', 'påJobb', 'hjemme'] },
    }
  },
  'besokende.json': {
    required: ['periode', 'aldersfordeling', 'husholdningstyper', 'inntektsfordeling', 'medianInntektPerHusholdningstype', 'områderBesøkendeKommerFra'],
    optional: [],
    arrayFields: {
      'aldersfordeling.mann': { fields: ['kategori', 'antall'] },
      'aldersfordeling.kvinne': { fields: ['kategori', 'antall'] },
      'husholdningstyper': { fields: ['type', 'antall'] },
      'inntektsfordeling': { fields: ['kategori', 'antall'] },
      'medianInntektPerHusholdningstype': { fields: ['type', 'median'] },
      'områderBesøkendeKommerFra': { fields: ['område', 'prosent'] },
    }
  },
  'internasjonalt.json': {
    required: ['periode', 'toppLand'],
    optional: [],
    arrayFields: {
      'toppLand': { fields: ['land', 'prosent'] },
    }
  },
  'aktorer.json': {
    required: ['actors', 'categoryStats', 'metadata'],
    optional: [],
    arrayFields: {
      'actors': { fields: ['rank', 'navn', 'type', 'adresse', 'kommune', 'omsetning'] },
    }
  }
};

// Results tracking
const results = {
  total: 0,
  valid: 0,
  invalid: 0,
  missing: 0,
  issues: [],
};

function log(type, msg) {
  const prefix = {
    info: `${COLORS.blue}ℹ${COLORS.reset}`,
    success: `${COLORS.green}✓${COLORS.reset}`,
    warn: `${COLORS.yellow}⚠${COLORS.reset}`,
    error: `${COLORS.red}✗${COLORS.reset}`,
  };
  console.log(`${prefix[type] || ''} ${msg}`);
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function checkFieldNames(obj, path, issues, filePath) {
  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      checkFieldNames(item, `${path}[${index}]`, issues, filePath);
    });
    return;
  }

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    // Check for wrong field names
    if (FIELD_NAME_FIXES[key]) {
      issues.push({
        type: 'field_name',
        path: currentPath,
        found: key,
        expected: FIELD_NAME_FIXES[key],
        message: `"${key}" should be "${FIELD_NAME_FIXES[key]}"`
      });
    }

    // Check for typos
    if (TYPO_FIXES[key]) {
      issues.push({
        type: 'typo',
        path: currentPath,
        found: key,
        expected: TYPO_FIXES[key],
        message: `Typo: "${key}" should be "${TYPO_FIXES[key]}"`
      });
    }

    // Check for English day names
    if (key === 'dag' && typeof value === 'string' && DAY_NAME_FIXES[value]) {
      issues.push({
        type: 'day_name',
        path: currentPath,
        found: value,
        expected: DAY_NAME_FIXES[value],
        message: `Day "${value}" should be "${DAY_NAME_FIXES[value]}"`
      });
    }

    // Recurse into nested objects
    if (value && typeof value === 'object') {
      checkFieldNames(value, currentPath, issues, filePath);
    }
  }
}

function validateSchema(data, schema, filePath) {
  const issues = [];

  // Check required sections
  for (const section of schema.required) {
    if (data[section] === undefined) {
      issues.push({
        type: 'missing_section',
        path: section,
        message: `Missing required section: ${section}`
      });
    }
  }

  // Check nøkkeltall fields if defined
  if (schema.nøkkeltall && data.nøkkeltall) {
    for (const field of schema.nøkkeltall) {
      if (data.nøkkeltall[field] === undefined) {
        issues.push({
          type: 'missing_field',
          path: `nøkkeltall.${field}`,
          message: `Missing nøkkeltall field: ${field}`
        });
      }
    }
  }

  // Check array fields
  if (schema.arrayFields) {
    for (const [arrayPath, config] of Object.entries(schema.arrayFields)) {
      const arrayData = getNestedValue(data, arrayPath);

      if (arrayData && Array.isArray(arrayData) && arrayData.length > 0) {
        const firstItem = arrayData[0];

        for (const field of config.fields) {
          if (firstItem[field] === undefined) {
            // Check if wrong name is used
            const wrongNames = Object.entries(FIELD_NAME_FIXES)
              .filter(([wrong, correct]) => correct === field && firstItem[wrong] !== undefined);

            if (wrongNames.length > 0) {
              issues.push({
                type: 'wrong_field_name',
                path: `${arrayPath}[0].${field}`,
                found: wrongNames[0][0],
                expected: field,
                message: `Array "${arrayPath}" uses "${wrongNames[0][0]}" instead of "${field}"`
              });
            }
          }
        }
      }
    }
  }

  // Check field names recursively
  checkFieldNames(data, '', issues, filePath);

  return issues;
}

function validateFile(filePath, fileName) {
  results.total++;

  if (!fs.existsSync(filePath)) {
    results.missing++;
    return [{
      type: 'missing_file',
      path: fileName,
      message: `File not found: ${fileName}`
    }];
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    const schema = SCHEMAS[fileName];
    if (!schema) {
      results.valid++;
      return [];
    }

    const issues = validateSchema(data, schema, filePath);

    if (issues.length === 0) {
      results.valid++;
    } else {
      results.invalid++;
    }

    return issues;
  } catch (error) {
    results.invalid++;
    return [{
      type: 'parse_error',
      path: fileName,
      message: `JSON parse error: ${error.message}`
    }];
  }
}

function validateProperty(prop) {
  const dirPath = path.join(DATA_DIR, prop.tenant, prop.property, prop.type);
  const relPath = `${prop.tenant}/${prop.property}/${prop.type}`;
  const propertyIssues = [];

  // Check directory exists
  if (!fs.existsSync(dirPath)) {
    return [{
      property: relPath,
      issues: [{
        type: 'missing_directory',
        message: `Analysis directory not found: ${relPath}`
      }]
    }];
  }

  // Check required files
  const requiredFiles = REQUIRED_FILES[prop.type];
  for (const fileName of requiredFiles) {
    const filePath = path.join(dirPath, fileName);
    const issues = validateFile(filePath, fileName);
    if (issues.length > 0) {
      propertyIssues.push({
        file: fileName,
        issues
      });
    }
  }

  // Check optional files that exist
  for (const fileName of OPTIONAL_FILES) {
    const filePath = path.join(dirPath, fileName);
    if (fs.existsSync(filePath)) {
      const issues = validateFile(filePath, fileName);
      if (issues.length > 0) {
        propertyIssues.push({
          file: fileName,
          issues
        });
      }
    }
  }

  return propertyIssues.length > 0 ? [{ property: relPath, files: propertyIssues }] : [];
}

function runValidation() {
  console.log(`\n${COLORS.cyan}━━━ 1-MIN/5-MIN ANALYSIS JSON VALIDATION ━━━${COLORS.reset}\n`);
  log('info', `Validating ${ANALYSIS_PROPERTIES.length} properties...\n`);

  const allIssues = [];

  for (const prop of ANALYSIS_PROPERTIES) {
    const propertyPath = `${prop.tenant}/${prop.property}/${prop.type}`;
    const issues = validateProperty(prop);

    if (issues.length === 0) {
      log('success', propertyPath);
    } else {
      log('error', propertyPath);
      allIssues.push(...issues);

      // Print detailed issues
      for (const propIssue of issues) {
        if (propIssue.files) {
          for (const fileIssue of propIssue.files) {
            console.log(`   ${COLORS.dim}└─ ${fileIssue.file}:${COLORS.reset}`);
            for (const issue of fileIssue.issues) {
              const issueColor = issue.type === 'missing_section' ? COLORS.red : COLORS.yellow;
              console.log(`      ${issueColor}• ${issue.message}${COLORS.reset}`);
            }
          }
        }
      }
    }
  }

  // Summary
  console.log(`\n${COLORS.cyan}━━━ VALIDATION SUMMARY ━━━${COLORS.reset}\n`);
  log('info', `Total files checked: ${results.total}`);
  log('success', `Valid: ${results.valid}`);
  if (results.invalid > 0) log('error', `Invalid: ${results.invalid}`);
  if (results.missing > 0) log('warn', `Missing: ${results.missing}`);

  // Count total issues
  let totalIssues = 0;
  for (const propIssue of allIssues) {
    if (propIssue.files) {
      for (const fileIssue of propIssue.files) {
        totalIssues += fileIssue.issues.length;
      }
    } else if (propIssue.issues) {
      totalIssues += propIssue.issues.length;
    }
  }

  if (totalIssues > 0) {
    console.log(`\n${COLORS.red}▶ Found ${totalIssues} issue(s) across ${allIssues.length} properties${COLORS.reset}\n`);

    // Write detailed report
    const reportPath = path.join(PROJECT_ROOT, 'analysis-validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: { total: results.total, valid: results.valid, invalid: results.invalid, missing: results.missing },
      issues: allIssues
    }, null, 2));
    log('info', `Detailed report: analysis-validation-report.json`);

    return 1;
  } else {
    console.log(`\n${COLORS.green}▶ All analysis JSON files are valid!${COLORS.reset}\n`);
    return 0;
  }
}

// Run if called directly
if (require.main === module) {
  const exitCode = runValidation();
  process.exit(exitCode);
}

module.exports = { runValidation, validateProperty, ANALYSIS_PROPERTIES };
