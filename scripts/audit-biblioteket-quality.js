#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const datasets = [
  { key: "historie", file: "src/data/biblioteket/historie/verification.json" },
  { key: "ildsjeler", file: "src/data/biblioteket/ildsjeler/verification.json" },
  { key: "litteratur", file: "src/data/biblioteket/litteratur/verification.json" },
  { key: "kultur-master", file: "src/data/biblioteket/kultur/grunerlokka_master_alt.json" },
  { key: "kultur-jazz", file: "src/data/biblioteket/kultur/jazz.json" },
  { key: "kultur-hiphop", file: "src/data/biblioteket/kultur/hiphop.json" },
  { key: "kultur-film", file: "src/data/biblioteket/kultur/film.json" },
  { key: "kultur-teater", file: "src/data/biblioteket/kultur/teater.json" },
  { key: "kultur-billedkunst", file: "src/data/biblioteket/kultur/billedkunst.json" },
  { key: "kultur-arkitektur", file: "src/data/biblioteket/kultur/arkitektur.json" },
  { key: "kultur-design", file: "src/data/biblioteket/kultur/design-kreativ.json" },
  { key: "idrett", file: "src/data/biblioteket/idrett/idrett.json" },
  { key: "mediebildet", file: "src/data/biblioteket/mediebildet/mediebildet.json" },
];

const allowedStatuses = new Set([
  "verified",
  "partially_verified",
  "unverified",
  "disputed",
]);

const allowedSourceTypes = new Set([
  "archive",
  "official",
  "news",
  "academic",
  "book",
  "database",
  "interview",
  "other",
]);

function parseArgs(argv) {
  const args = {
    failOnHigh: false,
    files: [],
    jsonPath: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--fail-on-high") {
      args.failOnHigh = true;
    } else if (arg.startsWith("--files=")) {
      args.files.push(
        ...arg
          .slice("--files=".length)
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
      );
    } else if (arg === "--json") {
      args.jsonPath = argv[index + 1] ?? null;
      index += 1;
    } else if (arg.startsWith("--json=")) {
      args.jsonPath = arg.slice("--json=".length);
    } else if (!arg.startsWith("--")) {
      args.files.push(arg);
    }
  }

  return args;
}

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function addIssue(issues, severity, code, file, message, context = {}) {
  issues.push({ severity, code, file, message, ...context });
}

function getClaimId(claim, index) {
  return claim.claimId ?? claim.id ?? `claims[${index}]`;
}

function getClaimText(claim) {
  return claim.claim ?? claim.statement ?? "";
}

function getClaimSources(claim) {
  return Array.isArray(claim.sources) ? claim.sources : [];
}

function sourceHasCanonicalMetadata(source) {
  return Boolean(source?.sourceType && source?.evidenceLevel && source?.accessedAt);
}

function isPrimary(source) {
  return source?.evidenceLevel === "primary";
}

function auditSource(dataset, source, index, issues) {
  if (!source || typeof source !== "object") {
    addIssue(issues, "high", "SOURCE_INVALID", dataset.file, `sources[${index}] er ikke et objekt.`);
    return;
  }

  if (!source.title || !source.url) {
    addIssue(issues, "high", "SOURCE_MISSING_TITLE_OR_URL", dataset.file, `sources[${index}] mangler title/url.`);
  }

  if ("type" in source && !sourceHasCanonicalMetadata(source)) {
    addIssue(
      issues,
      "high",
      "SOURCE_LEGACY_TYPE",
      dataset.file,
      `sources[${index}] bruker legacy type uten komplett sourceType/evidenceLevel/accessedAt.`,
    );
  }

  if (!source.sourceType || !allowedSourceTypes.has(source.sourceType)) {
    addIssue(
      issues,
      "high",
      "SOURCE_INVALID_SOURCE_TYPE",
      dataset.file,
      `sources[${index}] mangler gyldig sourceType.`,
      { sourceTitle: source.title ?? null },
    );
  }

  if (!["primary", "secondary"].includes(source.evidenceLevel)) {
    addIssue(
      issues,
      "high",
      "SOURCE_INVALID_EVIDENCE_LEVEL",
      dataset.file,
      `sources[${index}] mangler gyldig evidenceLevel.`,
      { sourceTitle: source.title ?? null },
    );
  }

  if (!source.accessedAt) {
    addIssue(
      issues,
      "medium",
      "SOURCE_MISSING_ACCESSED_AT",
      dataset.file,
      `sources[${index}] mangler accessedAt.`,
      { sourceTitle: source.title ?? null },
    );
  }
}

function auditClaim(dataset, claim, index, issues) {
  if (!claim || typeof claim !== "object") {
    addIssue(issues, "high", "CLAIM_INVALID", dataset.file, `claims[${index}] er ikke et objekt.`);
    return;
  }

  const claimId = getClaimId(claim, index);
  const claimText = getClaimText(claim);
  const sources = getClaimSources(claim);

  if (!claim.claimId || !claim.claim) {
    addIssue(
      issues,
      "high",
      "CLAIM_LEGACY_OR_MISSING_TEXT",
      dataset.file,
      `${claimId} mangler canonical claimId/claim.`,
      { claimId, claimText },
    );
  }

  if ("source" in claim && !Array.isArray(claim.sources)) {
    addIssue(
      issues,
      "high",
      "CLAIM_LEGACY_SOURCE_STRING",
      dataset.file,
      `${claimId} bruker legacy source-streng uten strukturert sources[].`,
      { claimId, claimText },
    );
  }

  if (!allowedStatuses.has(claim.status)) {
    addIssue(
      issues,
      "high",
      "CLAIM_INVALID_STATUS",
      dataset.file,
      `${claimId} har ugyldig status.`,
      { claimId, claimText },
    );
  }

  if (typeof claim.confidenceScore !== "number") {
    addIssue(
      issues,
      "medium",
      "CLAIM_MISSING_CONFIDENCE_SCORE",
      dataset.file,
      `${claimId} mangler confidenceScore.`,
      { claimId, claimText },
    );
  }

  if (!claim.lastVerifiedAt) {
    addIssue(
      issues,
      "medium",
      "CLAIM_MISSING_LAST_VERIFIED_AT",
      dataset.file,
      `${claimId} mangler lastVerifiedAt.`,
      { claimId, claimText },
    );
  }

  sources.forEach((source, sourceIndex) => {
    if (!sourceHasCanonicalMetadata(source)) {
      addIssue(
        issues,
        "high",
        "CLAIM_SOURCE_MISSING_CANONICAL_METADATA",
        dataset.file,
        `${claimId} har claim-kilde uten canonical metadata i sources[${sourceIndex}].`,
        { claimId, claimText, sourceTitle: source?.title ?? null },
      );
    }
  });

  if (claim.status === "verified") {
    const primaryCount = sources.filter(isPrimary).length;
    if (sources.length === 0) {
      addIssue(
        issues,
        "high",
        "VERIFIED_CLAIM_WITHOUT_SOURCES",
        dataset.file,
        `${claimId} er verified uten sources[].`,
        { claimId, claimText },
      );
    } else if (primaryCount < 1 && sources.length < 2) {
      addIssue(
        issues,
        "high",
        "VERIFIED_CLAIM_WEAK_EVIDENCE",
        dataset.file,
        `${claimId} er verified uten primærkilde eller minst to konkrete kilder.`,
        { claimId, claimText, sourceCount: sources.length, primaryCount },
      );
    }
  }

  if (claim.status === "partially_verified" && sources.length === 0) {
    addIssue(
      issues,
      "medium",
      "PARTIAL_CLAIM_WITHOUT_SOURCES",
      dataset.file,
      `${claimId} er partially_verified uten sources[].`,
      { claimId, claimText },
    );
  }
}

function auditDataset(dataset) {
  const issues = [];
  const json = readJson(dataset.file);
  const claims = Array.isArray(json.claims) ? json.claims : [];
  const sources = Array.isArray(json.sources) ? json.sources : [];

  if (!Array.isArray(json.sources) || sources.length === 0) {
    addIssue(issues, "high", "DATASET_MISSING_SOURCES", dataset.file, "Datasettet mangler sources[].");
  }

  if (!Array.isArray(json.claims) || claims.length === 0) {
    addIssue(issues, "high", "DATASET_MISSING_CLAIMS", dataset.file, "Datasettet mangler claims[].");
  }

  if (!json.researchMetadata?.lastVerifiedAt && !json.researchMetadata?.lastVerified) {
    addIssue(
      issues,
      "medium",
      "DATASET_MISSING_LAST_VERIFIED",
      dataset.file,
      "researchMetadata mangler lastVerifiedAt/lastVerified.",
    );
  }

  sources.forEach((source, index) => auditSource(dataset, source, index, issues));
  claims.forEach((claim, index) => auditClaim(dataset, claim, index, issues));

  return {
    key: dataset.key,
    file: dataset.file,
    title: json.title ?? dataset.key,
    sourceCount: sources.length,
    claimCount: claims.length,
    verifiedCount: claims.filter((claim) => claim.status === "verified").length,
    partiallyVerifiedCount: claims.filter((claim) => claim.status === "partially_verified").length,
    unverifiedCount: claims.filter((claim) => claim.status === "unverified").length,
    disputedCount: claims.filter((claim) => claim.status === "disputed").length,
    legacySourceCount: sources.filter((source) => "type" in source && !sourceHasCanonicalMetadata(source)).length,
    legacyClaimCount: claims.filter((claim) => "source" in claim && !Array.isArray(claim.sources)).length,
    issues,
  };
}

function countBySeverity(issues) {
  return issues.reduce(
    (acc, issue) => {
      acc[issue.severity] = (acc[issue.severity] ?? 0) + 1;
      return acc;
    },
    { high: 0, medium: 0, low: 0 },
  );
}

const args = parseArgs(process.argv.slice(2));
const selectedDatasets =
  args.files.length > 0
    ? datasets.filter((dataset) => args.files.includes(dataset.file) || args.files.includes(dataset.key))
    : datasets;

if (selectedDatasets.length === 0) {
  console.error("Ingen datasett matcher --files/argumentene.");
  process.exit(1);
}

const report = {
  generatedAt: new Date().toISOString(),
  datasets: selectedDatasets.map(auditDataset),
};

const allIssues = report.datasets.flatMap((dataset) => dataset.issues);
report.summary = {
  datasetCount: report.datasets.length,
  sourceCount: report.datasets.reduce((sum, dataset) => sum + dataset.sourceCount, 0),
  claimCount: report.datasets.reduce((sum, dataset) => sum + dataset.claimCount, 0),
  verifiedCount: report.datasets.reduce((sum, dataset) => sum + dataset.verifiedCount, 0),
  partiallyVerifiedCount: report.datasets.reduce((sum, dataset) => sum + dataset.partiallyVerifiedCount, 0),
  unverifiedCount: report.datasets.reduce((sum, dataset) => sum + dataset.unverifiedCount, 0),
  disputedCount: report.datasets.reduce((sum, dataset) => sum + dataset.disputedCount, 0),
  legacySourceCount: report.datasets.reduce((sum, dataset) => sum + dataset.legacySourceCount, 0),
  legacyClaimCount: report.datasets.reduce((sum, dataset) => sum + dataset.legacyClaimCount, 0),
  issueCount: allIssues.length,
  issuesBySeverity: countBySeverity(allIssues),
};

if (args.jsonPath) {
  const outPath = path.resolve(root, args.jsonPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

console.log("Biblioteket kvalitetsaudit:");
console.log(JSON.stringify(report.summary, null, 2));

if (allIssues.length > 0) {
  console.log("\nViktigste funn:");
  for (const issue of allIssues.slice(0, 20)) {
    console.log(`- [${issue.severity}] ${issue.file}: ${issue.message}`);
  }
}

if (args.failOnHigh && report.summary.issuesBySeverity.high > 0) {
  console.error(`\nStreng Biblioteket-gate feilet: ${report.summary.issuesBySeverity.high} high issues.`);
  process.exit(1);
}
