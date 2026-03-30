#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const datasets = [
  { file: "src/data/biblioteket/historie/verification.json", minClaims: 5, strictEvidenceRule: true },
  { file: "src/data/biblioteket/ildsjeler/verification.json", minClaims: 4, strictEvidenceRule: true },
  { file: "src/data/biblioteket/litteratur/verification.json", minClaims: 5, strictEvidenceRule: true },
  { file: "src/data/biblioteket/kultur/grunerlokka_master_alt.json", minClaims: 10, strictEvidenceRule: false },
  { file: "src/data/biblioteket/kultur/jazz.json", minClaims: 8, strictEvidenceRule: false },
  { file: "src/data/biblioteket/kultur/hiphop.json", minClaims: 8, strictEvidenceRule: false },
  { file: "src/data/biblioteket/kultur/film.json", minClaims: 8, strictEvidenceRule: false },
  { file: "src/data/biblioteket/kultur/teater.json", minClaims: 8, strictEvidenceRule: false },
  { file: "src/data/biblioteket/kultur/billedkunst.json", minClaims: 8, strictEvidenceRule: false },
  { file: "src/data/biblioteket/kultur/arkitektur.json", minClaims: 8, strictEvidenceRule: false },
  { file: "src/data/biblioteket/kultur/design-kreativ.json", minClaims: 8, strictEvidenceRule: false },
  { file: "src/data/biblioteket/idrett/idrett.json", minClaims: 5, strictEvidenceRule: true },
  { file: "src/data/biblioteket/mediebildet/mediebildet.json", minClaims: 5, strictEvidenceRule: true },
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

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function getLastVerified(metadata) {
  return metadata?.lastVerifiedAt ?? metadata?.lastVerified ?? null;
}

function validateSource(file, source, index, issues) {
  if (!source || !source.title || !source.url) {
    issues.push(`${file}: sources[${index}] mangler title/url.`);
  }

  const normalizedSourceType =
    source.sourceType === "guide" ||
    source.sourceType === "event" ||
    source.sourceType === "journalism" ||
    source.sourceType === "article"
      ? "news"
      : source.sourceType === "primary"
        ? "other"
        : source.sourceType;

  if (normalizedSourceType && !allowedSourceTypes.has(normalizedSourceType)) {
    issues.push(`${file}: sources[${index}] har ugyldig sourceType ${source.sourceType}.`);
  }

  if (source.evidenceLevel && !["primary", "secondary"].includes(source.evidenceLevel)) {
    issues.push(`${file}: sources[${index}] har ugyldig evidenceLevel ${source.evidenceLevel}.`);
  }
}

function validateClaim(file, claim, index, issues, strictEvidenceRule) {
  const claimId = claim.claimId ?? claim.id;
  const claimText = claim.claim ?? claim.statement;
  const lastVerifiedAt = claim.lastVerifiedAt;

  if (!claimId || !claimText) {
    issues.push(`${file}: claims[${index}] mangler id eller tekst.`);
  }

  if (!allowedStatuses.has(claim.status)) {
    issues.push(`${file}: claims[${index}] har ugyldig status ${claim.status}.`);
  }

  if (typeof claim.confidenceScore === "number") {
    if (claim.confidenceScore < 0 || claim.confidenceScore > 1) {
      issues.push(`${file}: claims[${index}] har ugyldig confidenceScore.`);
    }
  } else if (typeof claim.confidence === "number") {
    if (claim.confidence < 0 || claim.confidence > 1) {
      issues.push(`${file}: claims[${index}] har ugyldig confidence.`);
    }
  }

  const claimSources = Array.isArray(claim.sources) ? claim.sources : [];
  if (strictEvidenceRule && claimSources.length === 0 && typeof claim.source !== "string") {
    issues.push(`${file}: claims[${index}] mangler kildereferanse.`);
  }

  if (strictEvidenceRule && claim.status === "verified" && claimSources.length > 0) {
    const primaryCount = claimSources.filter((source) => source.evidenceLevel === "primary").length;
    if (primaryCount < 1 && claimSources.length < 2) {
      issues.push(`${file}: claims[${index}] er verified uten primærkilde eller to kilder.`);
    }
  }

  if (!lastVerifiedAt && typeof claim.source !== "string") {
    issues.push(`${file}: claims[${index}] mangler lastVerifiedAt.`);
  }
}

const issues = [];

for (const dataset of datasets) {
  const filePath = path.join(root, dataset.file);
  if (!fs.existsSync(filePath)) {
    issues.push(`${dataset.file}: fil mangler.`);
    continue;
  }

  const json = readJson(dataset.file);

  if (!Array.isArray(json.sources) || json.sources.length === 0) {
    issues.push(`${dataset.file}: sources mangler eller er tom.`);
  } else {
    json.sources.forEach((source, index) =>
      validateSource(dataset.file, source, index, issues),
    );
  }

  if (!json.researchMetadata || typeof json.researchMetadata !== "object") {
    issues.push(`${dataset.file}: researchMetadata mangler.`);
  } else {
    const metadata = json.researchMetadata;
    if (getLastVerified(metadata) == null) {
      issues.push(`${dataset.file}: researchMetadata mangler lastVerifiedAt/lastVerified.`);
    }
    if (typeof metadata.coverageScore !== "number" || metadata.coverageScore < 0 || metadata.coverageScore > 1) {
      issues.push(`${dataset.file}: researchMetadata.coverageScore må være mellom 0 og 1.`);
    }
    if (typeof metadata.staleAfterDays !== "number" || metadata.staleAfterDays <= 0) {
      issues.push(`${dataset.file}: researchMetadata.staleAfterDays må være > 0.`);
    }
  }

  if (!Array.isArray(json.claims) || json.claims.length < dataset.minClaims) {
    issues.push(`${dataset.file}: claims mangler eller er under minimum (${dataset.minClaims}).`);
  } else {
    json.claims.forEach((claim, index) =>
      validateClaim(
        dataset.file,
        claim,
        index,
        issues,
        dataset.strictEvidenceRule !== false,
      ),
    );
  }

  if (!Array.isArray(json.crossReferences) || json.crossReferences.length === 0) {
    issues.push(`${dataset.file}: crossReferences mangler eller er tom.`);
  } else {
    json.crossReferences.forEach((ref, index) => {
      if (!ref.type || !(ref.idOrName || ref.target)) {
        issues.push(`${dataset.file}: crossReferences[${index}] mangler type eller mål.`);
      }
    });
  }
}

if (issues.length > 0) {
  console.error(`Biblioteket research-validering feilet (${issues.length} issues):`);
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("Biblioteket research-validering OK.");
console.log(`Datasett validert: ${datasets.length}`);
