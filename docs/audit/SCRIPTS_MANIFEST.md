# Scripts Manifest

Date: 2026-05-21

## Active npm scripts

These scripts are part of the supported project workflow because they are called
from `package.json`.

| Command | Script | Purpose |
|---|---|---|
| `npm run verify` | `scripts/verify-project.js` | Project integrity and silent-failure checks |
| `npm run research:kultur:enrich` | `scripts/enrich-kultur-research.js` | Kultur research enrichment |
| `npm run research:kultur:validate` | `scripts/validate-kultur-research.js` | Kultur research validation |
| `npm run research:biblioteket:validate` | `scripts/validate-biblioteket-research.js` | Biblioteket research validation |
| `npm run research:biblioteket:report` | `scripts/report-biblioteket-research.js` | Biblioteket research report |
| `npm run research:biblioteket:queue` | `scripts/build-biblioteket-research-queue.js` | Biblioteket research queue |
| `npm run build:nedre-lokka-svarut` | `scripts/build-nedre-lokka-svarut.js` | Nedre Lokka SvarUt data build |
| `npm run audit:data` | `scripts/data-audit/index.js --verbose` | Full semantic data audit |
| `npm run audit:data:critical` | `scripts/data-audit/index.js --critical` | Critical-only semantic data audit |
| `npm run prebuild` | `scripts/clean-build-cache.mjs` | Clean build cache before verify/type-check/build |

## Supported manual scripts

| Script | Purpose | Current status |
|---|---|---|
| `scripts/test-all-tenants.sh` | Tenant route smoke test against a running dev server | Updated 2026-05-21 to use port 3001 and `src/config/tenants.ts` |
| `scripts/list-tenant-slugs.js` | Helper used by `test-all-tenants.sh` | Active support helper |
| `scripts/verify-project-rules.js` | Shared rule module used by `verify-project.js` tests | Active support helper |

## Historical or one-off scripts

These are not currently wired into `package.json`. Do not delete them without a
separate manifest-backed decision, because several appear to document past data
conversion or recovery workflows.

| Script | Notes |
|---|---|
| `scripts/aggregate-nedre-lokka-simple.js` | Archived Nedre Lokka aggregation workflow |
| `scripts/aggregate-nedre-lokka.ts` | Archived/older Nedre Lokka aggregation workflow |
| `scripts/convert-all-1min-data.js` | One-off data conversion |
| `scripts/convert-korthandel.js` | One-off data conversion |
| `scripts/convert-markveien-5min.js` | One-off data conversion |
| `scripts/convert-nedre-lokka-utsnitt.js` | One-off data conversion |
| `scripts/convert-vulkan-5min.js` | One-off data conversion |
| `scripts/convert_csv_to_json.py` | General conversion helper, not npm-wired |
| `scripts/fix-1min-json.js` | Historical repair helper |
| `scripts/fix-analysis-json.js` | Historical repair helper |
| `scripts/geocode-actors.mjs` | One-off geocoding workflow |
| `scripts/parse-aktorer-2025.js` | One-off actor parsing |
| `scripts/parse-aktorer.js` | One-off actor parsing |
| `scripts/validate-analysis-json.js` | Legacy validation entrypoint |
| `scripts/EXAMPLE_USAGE.tsx` | Example artifact |
