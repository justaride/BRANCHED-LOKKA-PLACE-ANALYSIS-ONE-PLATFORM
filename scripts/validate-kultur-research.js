#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const kulturDir = path.resolve(__dirname, '..', 'src', 'data', 'biblioteket', 'kultur');
const files = [
  'jazz.json',
  'hiphop.json',
  'film.json',
  'teater.json',
  'billedkunst.json',
  'grunerlokka_master_alt.json',
];

const allowedStatuses = new Set(['verified', 'partially_verified', 'unverified', 'disputed']);
const allowedEvidenceLevels = new Set(['primary', 'secondary']);
const allowedSourceTypes = new Set(['archive', 'official', 'news', 'academic', 'book', 'database', 'interview', 'other']);

const issues = [];

function fail(file, message) {
  issues.push({ file, message });
}

function validateFile(fileName, json) {
  if (!Array.isArray(json.sources) || json.sources.length === 0) {
    fail(fileName, 'sources mangler eller er tom.');
  }

  if (!Array.isArray(json.claims) || json.claims.length === 0) {
    fail(fileName, 'claims mangler eller er tom.');
  }

  if (!json.researchMetadata || typeof json.researchMetadata !== 'object') {
    fail(fileName, 'researchMetadata mangler.');
  } else {
    const md = json.researchMetadata;
    if (typeof md.coverageScore !== 'number' || md.coverageScore < 0 || md.coverageScore > 1) {
      fail(fileName, 'researchMetadata.coverageScore må være mellom 0 og 1.');
    }
    if (typeof md.staleAfterDays !== 'number' || md.staleAfterDays <= 0) {
      fail(fileName, 'researchMetadata.staleAfterDays må være > 0.');
    }
    if (!md.lastVerifiedAt || !md.verifiedBy) {
      fail(fileName, 'researchMetadata må ha lastVerifiedAt og verifiedBy.');
    }
  }

  if (!Array.isArray(json.crossReferences) || json.crossReferences.length === 0) {
    fail(fileName, 'crossReferences mangler eller er tom.');
  }

  if (Array.isArray(json.sources)) {
    json.sources.forEach((src, index) => {
      if (!src.title || !src.url || !src.accessedAt) {
        fail(fileName, `sources[${index}] mangler title/url/accessedAt.`);
      }
      if (!allowedEvidenceLevels.has(src.evidenceLevel)) {
        fail(fileName, `sources[${index}] har ugyldig evidenceLevel: ${src.evidenceLevel}`);
      }
      if (!allowedSourceTypes.has(src.sourceType)) {
        fail(fileName, `sources[${index}] har ugyldig sourceType: ${src.sourceType}`);
      }
    });
  }

  if (Array.isArray(json.claims)) {
    json.claims.forEach((c, index) => {
      if (!c.claimId || !c.claim || !c.lastVerifiedAt) {
        fail(fileName, `claims[${index}] mangler claimId/claim/lastVerifiedAt.`);
      }
      if (!allowedStatuses.has(c.status)) {
        fail(fileName, `claims[${index}] har ugyldig status: ${c.status}`);
      }
      if (typeof c.confidenceScore !== 'number' || c.confidenceScore < 0 || c.confidenceScore > 1) {
        fail(fileName, `claims[${index}] har ugyldig confidenceScore: ${c.confidenceScore}`);
      }
      if (!Array.isArray(c.sources) || c.sources.length === 0) {
        fail(fileName, `claims[${index}] mangler sources.`);
      } else {
        const primaryCount = c.sources.filter((s) => s.evidenceLevel === 'primary').length;
        if (c.status === 'verified' && primaryCount < 1 && c.sources.length < 2) {
          fail(fileName, `claims[${index}] er verified uten >=1 primary source eller >=2 kilder.`);
        }
      }
    });
  }

  if (Array.isArray(json.crossReferences)) {
    json.crossReferences.forEach((ref, index) => {
      if (!ref.type || !ref.idOrName || !Array.isArray(ref.linkedSections) || ref.linkedSections.length === 0) {
        fail(fileName, `crossReferences[${index}] mangler type/idOrName/linkedSections.`);
      }
    });
  }

  const minClaims = fileName === 'grunerlokka_master_alt.json' ? 10 : 8;
  if (Array.isArray(json.claims) && json.claims.length < minClaims) {
    fail(fileName, `for få claims: ${json.claims.length} (minimum ${minClaims}).`);
  }
}

for (const file of files) {
  const filePath = path.join(kulturDir, file);
  if (!fs.existsSync(filePath)) {
    fail(file, 'filen finnes ikke.');
    continue;
  }

  try {
    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    validateFile(file, json);
  } catch (err) {
    fail(file, `kunne ikke parse JSON: ${err.message}`);
  }
}

if (issues.length > 0) {
  console.error(`Kultur research validering feilet (${issues.length} issues):`);
  for (const issue of issues) {
    console.error(`- ${issue.file}: ${issue.message}`);
  }
  process.exit(1);
}

console.log('Kultur research validering OK.');
console.log(`Filer validert: ${files.length}`);
