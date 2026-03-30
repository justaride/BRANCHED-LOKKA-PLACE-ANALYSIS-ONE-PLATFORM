#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const datasets = [
  {
    key: "historie",
    title: "Byhistorie",
    file: "src/data/biblioteket/historie/verification.json",
    sourceTargets: [
      "Oslo Byarkiv",
      "Nasjonalbiblioteket",
      "Lokalhistoriewiki",
      "Oslo Byleksikon",
    ],
  },
  {
    key: "ildsjeler",
    title: "Ildsjeler",
    file: "src/data/biblioteket/ildsjeler/verification.json",
    sourceTargets: [
      "Stortinget / offisielle biografier",
      "Oslo Byleksikon",
      "Arbeiderbevegelsens arkiv og bibliotek",
      "Institusjons- eller organisasjonsarkiv",
    ],
  },
  {
    key: "litteratur",
    title: "Litteratur",
    file: "src/data/biblioteket/litteratur/verification.json",
    sourceTargets: [
      "Nasjonalbiblioteket katalog",
      "Oria / LIBRIS / WorldCat",
      "MUNCH / lokalhistoriske bibliografier",
      "Forlags- og bibliotekkataloger",
    ],
  },
  {
    key: "idrett",
    title: "Idrett",
    file: "src/data/biblioteket/idrett/idrett.json",
    sourceTargets: [
      "Norges idrettsforbund",
      "Norges ishockeyforbund",
      "Oslo byleksikon",
      "Klubbhistorikker / jubileumsbøker",
    ],
  },
  {
    key: "mediebildet",
    title: "Mediebildet",
    file: "src/data/biblioteket/mediebildet/mediebildet.json",
    sourceTargets: [
      "Retriever / mediearkiv",
      "Nasjonalbiblioteket aviser",
      "Akademiske databaser",
      "NRK / TV-arkiv",
    ],
  },
  {
    key: "kultur-film",
    title: "Film og Grünerløkka",
    file: "src/data/biblioteket/kultur/film.json",
    sourceTargets: [
      "Nasjonalbiblioteket",
      "NRK / film- og TV-arkiv",
      "Samtiden / intervjuarkiv",
      "Institusjons- og programarkiv",
    ],
  },
  {
    key: "kultur-master",
    title: "Kultur master",
    file: "src/data/biblioteket/kultur/grunerlokka_master_alt.json",
    sourceTargets: [
      "Oslo Byarkiv",
      "Kommunale plan- og vedtaksdokumenter",
      "Kvantitative bolig- og leiedata",
      "Forskningsrapporter om gentrifisering",
    ],
  },
];

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function toPriorityBucket(status, coverageScore) {
  if (status === "unverified") return "high";
  if (coverageScore < 0.65) return "high";
  if (coverageScore < 0.8) return "medium";
  return "low";
}

function toPriorityScore(status, coverageScore) {
  const statusWeight =
    status === "unverified" ? 100 : status === "partially_verified" ? 60 : 0;
  const coverageWeight = Math.round((1 - coverageScore) * 40);
  return statusWeight + coverageWeight;
}

const queue = {
  generatedAt: new Date().toISOString(),
  workflow: {
    cadence: "weekly",
    batchSize: 5,
    definitionOfDone: [
      "Claim har minst én primaerkilde eller to uavhengige kilder.",
      "sources er oppdatert i datasettet.",
      "claim-status er oppdatert og lastVerifiedAt satt.",
      "npm run research:biblioteket:validate er groen.",
      "npm run research:biblioteket:report og npm run research:biblioteket:queue er kjoert pa nytt.",
    ],
  },
  items: [],
};

for (const dataset of datasets) {
  const json = readJson(dataset.file);
  const claims = Array.isArray(json.claims) ? json.claims : [];
  const coverageScore =
    typeof json.researchMetadata?.coverageScore === "number"
      ? json.researchMetadata.coverageScore
      : 0;
  const lastVerifiedAt =
    json.researchMetadata?.lastVerifiedAt ??
    json.researchMetadata?.lastVerified ??
    null;

  for (const claim of claims) {
    if (claim.status === "verified") continue;

    const priorityBucket = toPriorityBucket(claim.status, coverageScore);
    const priorityScore = toPriorityScore(claim.status, coverageScore);

    queue.items.push({
      queueId: `${dataset.key}:${claim.claimId}`,
      datasetKey: dataset.key,
      datasetTitle: dataset.title,
      claimId: claim.claimId,
      status: claim.status,
      priorityBucket,
      priorityScore,
      coverageScore,
      lastVerifiedAt,
      claim: claim.claim,
      notes: claim.notes ?? null,
      recommendedSourceTargets: dataset.sourceTargets,
      doneWhen: queue.workflow.definitionOfDone,
    });
  }
}

queue.items.sort((a, b) => b.priorityScore - a.priorityScore);

queue.summary = {
  itemCount: queue.items.length,
  highPriorityCount: queue.items.filter((item) => item.priorityBucket === "high").length,
  mediumPriorityCount: queue.items.filter((item) => item.priorityBucket === "medium").length,
  lowPriorityCount: queue.items.filter((item) => item.priorityBucket === "low").length,
};

const outPath = path.join(root, "biblioteket-research-queue.json");
fs.writeFileSync(outPath, `${JSON.stringify(queue, null, 2)}\n`, "utf8");

console.log("Biblioteket research-koe generert.");
console.log(`Utfil: ${path.relative(root, outPath)}`);
console.log(JSON.stringify(queue.summary, null, 2));
