#!/usr/bin/env node

/**
 * Silent Failure Detection & Project Verification
 * For lokka-gardeierforening-platform
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

const log = {
  info: (msg) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  success: (msg) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  warn: (msg) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  error: (msg) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  section: (msg) => console.log(`\n${COLORS.cyan}━━━ ${msg} ━━━${COLORS.reset}`)
};

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: []
};

const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'src/data');

// Required tenant directories
const TENANTS = [
  'main-board',
  'aspelin-ramm',
  'brodrene-evensen',
  'eiendomsspar',
  'maya-eiendom',
  'roger-vodal',
  'sio',
  'spabo'
];

// Verify JSON file
function verifyJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (!content || content.trim() === '') {
      return { valid: false, error: 'Empty file' };
    }
    const parsed = JSON.parse(content);
    if (!parsed || typeof parsed !== 'object') {
      return { valid: false, error: 'Invalid structure' };
    }
    return { valid: true, data: parsed };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Find all JSON files recursively
function findJsonFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findJsonFiles(fullPath, files);
    } else if (item.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Verify property data structure
function verifyPropertyData(data, filePath) {
  const issues = [];
  const fileName = path.basename(filePath, '.json');

  // Skip special files
  if (['template', 'registry', 'combined'].includes(fileName)) {
    return issues;
  }

  // Check for required fields in property files
  if (data.id !== undefined) {
    if (!data.name) issues.push('Missing: name');
    if (!data.address) issues.push('Missing: address');
    if (!data.tenant) issues.push('Missing: tenant');
  }

  // Check for null/undefined values that could cause silent failures
  function checkForNulls(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value === null) {
        issues.push(`Null value: ${path}`);
      } else if (value === undefined) {
        issues.push(`Undefined value: ${path}`);
      } else if (typeof value === 'number' && isNaN(value)) {
        issues.push(`NaN value: ${path}`);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        checkForNulls(value, path);
      }
    }
  }

  checkForNulls(data);
  return issues;
}

// Import analysis JSON validation
const { runValidation: runAnalysisValidation } = require('./validate-analysis-json');

// Main verification
function runVerification() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  LOKKA PLATFORM - SILENT FAILURE DETECTION             ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  // 1. Verify tenant directories
  log.section('TENANT DIRECTORIES');

  for (const tenant of TENANTS) {
    const tenantPath = path.join(DATA_DIR, tenant);
    if (fs.existsSync(tenantPath)) {
      results.passed++;
      log.success(`${tenant}/`);
    } else {
      results.failed++;
      results.errors.push({ type: 'missing_tenant', tenant });
      log.error(`${tenant}/ - MISSING`);
    }
  }

  // 2. Verify all JSON files
  log.section('JSON FILE VALIDATION');

  const jsonFiles = findJsonFiles(DATA_DIR);
  log.info(`Found ${jsonFiles.length} JSON files`);

  let validCount = 0;
  let invalidCount = 0;
  const invalidFiles = [];

  for (const file of jsonFiles) {
    const result = verifyJson(file);
    const relPath = path.relative(PROJECT_ROOT, file);

    if (result.valid) {
      validCount++;

      // Check data structure
      const issues = verifyPropertyData(result.data, file);
      if (issues.length > 0) {
        results.warnings++;
        log.warn(`${relPath}: ${issues.length} potential issues`);
        issues.forEach(issue => log.warn(`  └─ ${issue}`));
      }
    } else {
      invalidCount++;
      invalidFiles.push({ file: relPath, error: result.error });
      results.failed++;
      log.error(`${relPath}: ${result.error}`);
    }
  }

  if (invalidCount === 0) {
    results.passed++;
    log.success(`All ${validCount} JSON files are valid`);
  }

  // 3. Verify loaders exist
  log.section('DATA LOADERS');

  const loaderDir = path.join(PROJECT_ROOT, 'src/lib/loaders');
  const expectedLoaders = [
    'main-board.ts',
    'aspelin-ramm.ts',
    'spabo.ts',
    'sio.ts',
    'maya-eiendom.ts',
    'eiendomsspar.ts'
  ];

  for (const loader of expectedLoaders) {
    const loaderPath = path.join(loaderDir, loader);
    if (fs.existsSync(loaderPath)) {
      results.passed++;
      log.success(loader);
    } else {
      results.warnings++;
      log.warn(`${loader} - not found`);
    }
  }

  // 4. Check for common silent failure patterns
  log.section('SILENT FAILURE PATTERNS');

  // Check package.json scripts
  const pkgPath = path.join(PROJECT_ROOT, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

    if (pkg.scripts?.build) {
      results.passed++;
      log.success('Build script exists');
    }

    if (pkg.scripts?.lint) {
      results.passed++;
      log.success('Lint script exists');
    }

    if (!pkg.scripts?.['type-check']) {
      results.warnings++;
      log.warn('No type-check script (recommend adding)');
    }

    if (!pkg.scripts?.test) {
      results.warnings++;
      log.warn('No test script (recommend adding)');
    }
  }

  // 5. Check .env files
  log.section('ENVIRONMENT CONFIG');

  const envExample = path.join(PROJECT_ROOT, '.env.example');
  const envLocal = path.join(PROJECT_ROOT, '.env.local');

  if (fs.existsSync(envExample)) {
    results.passed++;
    log.success('.env.example exists');
  }

  if (fs.existsSync(envLocal)) {
    results.passed++;
    log.success('.env.local exists');
  } else {
    results.warnings++;
    log.warn('.env.local missing (may cause runtime issues)');
  }

  // 6. Check Next.js config
  log.section('NEXT.JS CONFIG');

  const nextConfig = path.join(PROJECT_ROOT, 'next.config.ts');
  if (fs.existsSync(nextConfig)) {
    results.passed++;
    log.success('next.config.ts exists');
  }

  // 7. Run 1-min/5-min analysis JSON validation
  log.section('ANALYSIS JSON VALIDATION');
  const analysisResult = runAnalysisValidation();
  if (analysisResult === 0) {
    results.passed++;
    log.success('All analysis JSON files valid');
  } else {
    results.failed++;
    results.errors.push({ type: 'analysis_json', message: 'Analysis JSON validation failed' });
    log.error('Analysis JSON validation failed - see above for details');
  }

  // Summary
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  VERIFICATION SUMMARY                                   ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  log.info(`Checks passed: ${results.passed}`);
  log.info(`Warnings: ${results.warnings}`);
  log.info(`Failures: ${results.failed}`);

  const status = results.failed === 0
    ? (results.warnings === 0 ? 'PASSED' : 'PASSED WITH WARNINGS')
    : 'FAILED';

  console.log(`\n${status === 'PASSED' ? COLORS.green : status === 'FAILED' ? COLORS.red : COLORS.yellow}▶ Status: ${status}${COLORS.reset}\n`);

  // Write report
  const report = {
    timestamp: new Date().toISOString(),
    status,
    summary: { passed: results.passed, warnings: results.warnings, failed: results.failed },
    errors: results.errors,
    jsonFiles: { total: jsonFiles.length, valid: validCount, invalid: invalidCount },
    invalidFiles
  };

  const reportPath = path.join(PROJECT_ROOT, 'verification-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log.info(`Report saved: verification-report.json`);

  process.exit(results.failed > 0 ? 1 : 0);
}

runVerification();
