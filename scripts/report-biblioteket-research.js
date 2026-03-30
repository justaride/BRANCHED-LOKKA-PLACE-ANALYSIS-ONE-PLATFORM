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

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

const report = {
  generatedAt: new Date().toISOString(),
  datasets: [],
};

for (const dataset of datasets) {
  const json = readJson(dataset.file);
  const claims = Array.isArray(json.claims) ? json.claims : [];
  const sources = Array.isArray(json.sources) ? json.sources : [];
  const coverageScore =
    typeof json.researchMetadata?.coverageScore === "number"
      ? json.researchMetadata.coverageScore
      : 0;

  report.datasets.push({
    key: dataset.key,
    file: dataset.file,
    title: json.title ?? dataset.key,
    sourceCount: sources.length,
    claimCount: claims.length,
    verifiedCount: claims.filter((claim) => claim.status === "verified").length,
    partiallyVerifiedCount: claims.filter(
      (claim) => claim.status === "partially_verified",
    ).length,
    unverifiedCount: claims.filter((claim) => claim.status === "unverified").length,
    disputedCount: claims.filter((claim) => claim.status === "disputed").length,
    coverageScore,
    lastVerifiedAt:
      json.researchMetadata?.lastVerifiedAt ??
      json.researchMetadata?.lastVerified ??
      null,
  });
}

report.summary = {
  datasetCount: report.datasets.length,
  sourceCount: report.datasets.reduce((sum, row) => sum + row.sourceCount, 0),
  claimCount: report.datasets.reduce((sum, row) => sum + row.claimCount, 0),
  verifiedCount: report.datasets.reduce((sum, row) => sum + row.verifiedCount, 0),
  partiallyVerifiedCount: report.datasets.reduce(
    (sum, row) => sum + row.partiallyVerifiedCount,
    0,
  ),
  unverifiedCount: report.datasets.reduce(
    (sum, row) => sum + row.unverifiedCount,
    0,
  ),
  disputedCount: report.datasets.reduce((sum, row) => sum + row.disputedCount, 0),
  averageCoverageScore:
    report.datasets.length > 0
      ? Number(
          (
            report.datasets.reduce((sum, row) => sum + row.coverageScore, 0) /
            report.datasets.length
          ).toFixed(2),
        )
      : 0,
};

const outPath = path.join(root, "biblioteket-verification-report.json");
fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("Biblioteket research-rapport generert.");
console.log(`Utfil: ${path.relative(root, outPath)}`);
console.log(JSON.stringify(report.summary, null, 2));
