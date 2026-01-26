#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");
const COLORS = require("./colors");
const { validateSemanticPlausibility } = require("./validators/semantic");

const PROJECT_ROOT = path.join(__dirname, "../..");
const DATA_DIRS = [
  path.join(PROJECT_ROOT, "public/data"),
  path.join(PROJECT_ROOT, "src/data"),
];

const args = process.argv.slice(2);
const CRITICAL_ONLY = args.includes("--critical");
const VERBOSE = args.includes("--verbose");

const log = {
  info: (msg) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  success: (msg) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  warn: (msg) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  error: (msg) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  section: (msg) =>
    console.log(`\n${COLORS.cyan}━━━ ${msg} ━━━${COLORS.reset}`),
  critical: (msg) =>
    console.log(`${COLORS.red}${COLORS.bold}CRITICAL${COLORS.reset} ${msg}`),
};

function findJsonFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findJsonFiles(fullPath, files);
    } else if (item.endsWith(".json")) {
      files.push(fullPath);
    }
  }
  return files;
}

function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return { success: true, data: JSON.parse(content) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function runSemanticAudit() {
  console.log("\n╔════════════════════════════════════════════════════════╗");
  console.log("║  LOKKA DATA AUDIT - SEMANTIC VALIDATION                 ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  if (CRITICAL_ONLY) {
    log.info("Running in CRITICAL-only mode");
  }

  const allIssues = [];
  let filesScanned = 0;

  for (const dataDir of DATA_DIRS) {
    if (!fs.existsSync(dataDir)) continue;

    log.section(`Scanning ${path.relative(PROJECT_ROOT, dataDir)}`);

    const jsonFiles = findJsonFiles(dataDir);
    log.info(`Found ${jsonFiles.length} JSON files`);

    for (const filePath of jsonFiles) {
      const relPath = path.relative(PROJECT_ROOT, filePath);
      const result = loadJson(filePath);

      if (!result.success) {
        allIssues.push({
          severity: "CRITICAL",
          type: "parse_error",
          file: relPath,
          message: result.error,
        });
        continue;
      }

      filesScanned++;
      const semanticIssues = validateSemanticPlausibility(result.data, relPath);

      for (const issue of semanticIssues) {
        if (CRITICAL_ONLY && issue.severity !== "CRITICAL") continue;
        allIssues.push({ ...issue, file: relPath });
      }
    }
  }

  log.section("AUDIT RESULTS");

  const criticalIssues = allIssues.filter((i) => i.severity === "CRITICAL");
  const mediumIssues = allIssues.filter((i) => i.severity === "MEDIUM");
  const infoIssues = allIssues.filter((i) => i.severity === "INFO");

  log.info(`Files scanned: ${filesScanned}`);

  if (criticalIssues.length > 0) {
    log.error(`CRITICAL issues: ${criticalIssues.length}`);
    for (const issue of criticalIssues) {
      log.critical(`${issue.file}: ${issue.message}`);
    }
  } else {
    log.success("No CRITICAL issues found");
  }

  if (!CRITICAL_ONLY) {
    if (mediumIssues.length > 0) {
      log.warn(`MEDIUM issues: ${mediumIssues.length}`);
      if (VERBOSE) {
        for (const issue of mediumIssues) {
          log.warn(`  ${issue.file}: ${issue.message}`);
        }
      }
    }

    if (infoIssues.length > 0) {
      log.info(`INFO notices: ${infoIssues.length}`);
      if (VERBOSE) {
        for (const issue of infoIssues) {
          console.log(
            `  ${COLORS.dim}${issue.file}: ${issue.message}${COLORS.reset}`,
          );
        }
      }
    }
  }

  const report = {
    timestamp: new Date().toISOString(),
    mode: CRITICAL_ONLY ? "critical-only" : "full",
    summary: {
      filesScanned,
      critical: criticalIssues.length,
      medium: mediumIssues.length,
      info: infoIssues.length,
    },
    issues: CRITICAL_ONLY ? criticalIssues : allIssues,
  };

  const reportPath = path.join(PROJECT_ROOT, "data-audit-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log.info(`Report saved: data-audit-report.json`);

  const status = criticalIssues.length === 0 ? "PASSED" : "FAILED";
  const statusColor = status === "PASSED" ? COLORS.green : COLORS.red;
  console.log(`\n${statusColor}▶ Status: ${status}${COLORS.reset}\n`);

  return criticalIssues.length > 0 ? 1 : 0;
}

const exitCode = runSemanticAudit();
process.exit(exitCode);
