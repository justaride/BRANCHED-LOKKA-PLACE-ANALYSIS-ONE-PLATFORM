#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const mediebildetFiles = [
  "src/data/biblioteket/mediebildet/avis.json",
  "src/data/biblioteket/mediebildet/akademisk.json",
  "src/data/biblioteket/mediebildet/tv-film.json",
  "src/data/biblioteket/mediebildet/podcast.json",
  "src/data/biblioteket/mediebildet/digital.json",
];

const ildsjelerFile = "src/data/biblioteket/ildsjeler/ildsjeler.json";

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasUsableUrl(item) {
  return hasText(item.url);
}

function hasArchiveStatus(item) {
  return hasText(item.urlStatus) && hasText(item.archiveReference);
}

function hasBiographicalGap(profile) {
  return (
    profile.birthYear === null ||
    profile.birthYear === undefined ||
    profile.deathYear === null ||
    profile.deathYear === undefined ||
    profile.isLiving === null ||
    profile.isLiving === undefined ||
    !Array.isArray(profile.links) ||
    profile.links.length === 0
  );
}

function hasBiographicalStatus(profile) {
  const status = profile.dataQuality?.biographicalStatus;
  return Boolean(
    status &&
      hasText(status.birthYear) &&
      hasText(status.deathYear) &&
      hasText(status.isLiving) &&
      hasText(status.links),
  );
}

function auditMediebildet() {
  const datasets = [];
  const issues = [];

  for (const file of mediebildetFiles) {
    const data = readJson(file);
    const items = Array.isArray(data.items) ? data.items : [];
    const missingReference = items.filter((item) => !hasUsableUrl(item) && !hasArchiveStatus(item));

    datasets.push({
      file,
      itemCount: items.length,
      directUrlCount: items.filter(hasUsableUrl).length,
      archiveReferenceCount: items.filter((item) => !hasUsableUrl(item) && hasArchiveStatus(item)).length,
      missingReferenceCount: missingReference.length,
    });

    for (const item of missingReference) {
      issues.push({
        severity: "medium",
        code: "MEDIA_ITEM_MISSING_URL_OR_ARCHIVE_REFERENCE",
        file,
        itemId: item.id ?? null,
        message: `${item.id ?? item.title ?? "Ukjent mediepost"} mangler url eller urlStatus + archiveReference.`,
      });
    }
  }

  return { datasets, issues };
}

function auditIldsjeler() {
  const profiles = readJson(ildsjelerFile);
  const issues = [];
  const profilesWithGaps = profiles.filter(hasBiographicalGap);

  for (const profile of profilesWithGaps) {
    if (!hasBiographicalStatus(profile)) {
      issues.push({
        severity: "medium",
        code: "ILDSJEL_BIOGRAPHICAL_GAP_WITHOUT_STATUS",
        file: ildsjelerFile,
        itemId: profile.id ?? null,
        message: `${profile.id ?? profile.name ?? "Ukjent ildsjel"} har null/tomme biografifelt uten dataQuality.biographicalStatus.`,
      });
    }
  }

  return {
    dataset: {
      file: ildsjelerFile,
      profileCount: profiles.length,
      profilesWithGapsCount: profilesWithGaps.length,
      profilesWithStatusCount: profiles.filter(hasBiographicalStatus).length,
    },
    issues,
  };
}

const mediebildet = auditMediebildet();
const ildsjeler = auditIldsjeler();
const issues = [...mediebildet.issues, ...ildsjeler.issues];

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    mediebildetDatasetCount: mediebildet.datasets.length,
    mediebildetItemCount: mediebildet.datasets.reduce((sum, dataset) => sum + dataset.itemCount, 0),
    directUrlCount: mediebildet.datasets.reduce((sum, dataset) => sum + dataset.directUrlCount, 0),
    archiveReferenceCount: mediebildet.datasets.reduce((sum, dataset) => sum + dataset.archiveReferenceCount, 0),
    missingReferenceCount: mediebildet.datasets.reduce((sum, dataset) => sum + dataset.missingReferenceCount, 0),
    ildsjelerProfileCount: ildsjeler.dataset.profileCount,
    ildsjelerProfilesWithGapsCount: ildsjeler.dataset.profilesWithGapsCount,
    ildsjelerProfilesWithStatusCount: ildsjeler.dataset.profilesWithStatusCount,
    issueCount: issues.length,
  },
  mediebildet: mediebildet.datasets,
  ildsjeler: ildsjeler.dataset,
  issues,
};

console.log("Biblioteket innholdsaudit:");
console.log(JSON.stringify(report.summary, null, 2));

if (issues.length > 0) {
  console.log("\nFunn:");
  for (const issue of issues.slice(0, 30)) {
    console.log(`- [${issue.severity}] ${issue.file}: ${issue.message}`);
  }

  if (issues.length > 30) {
    console.log(`- ... ${issues.length - 30} flere funn`);
  }

  process.exit(1);
}
