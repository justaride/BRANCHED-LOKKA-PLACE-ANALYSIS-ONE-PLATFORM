# Findings Backlog

Date: 2026-02-12  
Source of truth: `docs/audit/findings.json`

## Prioritized List

| ID | Severity | Category | Summary | Primary Scope |
|---|---|---|---|---|
| A-001 | critical | runtime/dependency | `next dev` startup/runtime integrity failure | `node_modules/next/dist/*` |
| A-002 | critical | data/build | Missing required `carucel` 1-min file blocks verify/build | `src/data/carucel/.../bevegelse.json` |
| A-003 | high | type/data | Type-check fails on missing import + stale generated route types | `src/lib/loaders/one-min-loader.ts`, `tsconfig.json`, `.next/types` |
| A-004 | high | lint/tooling | ESLint runtime crash prevents linting | `eslint` runtime dependency set |
| A-005 | high | test/tooling | Jest is unstable (hang + invalid package config errors) | test harness/runtime deps |
| A-006 | medium | qa/runtime | Tenant smoke script drifted from current tenant registry and dev port | `scripts/test-all-tenants.sh`, `src/config/tenants.ts` |
| A-007 | medium | verify/data | Verification warnings include schema false positives for non-property datasets | `scripts/verify-project.js` |
| A-008 | medium | data/contracts | High null density without explicit nullable contract documentation | multiple `src/data/*.json` |
| A-009 | low | data/semantics | Semantic INFO anomalies likely metric-label mismatch | `public/data/.../antall-hus.json` |

## Detailed Tasks

## A-001 Critical: Next Runtime Integrity

- Symptom: route smoke blocked; startup can fail with missing module/runtime errors.
- Evidence:
  - `node_modules/next/dist/server/config-shared.js:28` requires `../shared/lib/image-config`.
  - `node_modules/next/dist/shared/lib/image-config.js` is missing.
  - Additional missing artifact: `node_modules/next/dist/shared/lib/hash.js`.
- Reproduction:
  1. `DISABLE_TENANT_AUTH=true npm run dev`
  2. Probe `http://localhost:3001/`
- Fix plan:
  1. Reinstall dependencies from clean state (`npm ci` from clean workspace).
  2. Verify Next artifact integrity (`image-config.js`, `hash.js` present).
  3. Pin known-good Node version for team/CI.
- Acceptance:
  1. `npm run dev` binds `localhost:3001` consistently.
  2. Root route returns HTTP response.
  3. No runtime module-load errors.

## A-002 Critical: Missing Carucel 1-min File

- Symptom: `verify` and `build` fail.
- Evidence:
  - `analysis-validation-report.json` reports missing `bevegelse.json` for `carucel/olaf-ryes-plass-4/1min`.
  - `src/lib/loaders/one-min-loader.ts:55` imports `@/data/carucel/olaf-ryes-plass-4/1min/bevegelse.json`.
- Fix plan:
  1. Add missing file OR remove/feature-flag this section in loader and validator.
  2. Align validator manifest and loader static imports.
- Acceptance:
  1. `npm run verify` passes analysis validation.
  2. `npm run build` clears prebuild gate.

## A-003 High: Type-Check Instability

- Symptom: `npm run type-check` fails with TS2307.
- Evidence:
  - Missing import at `src/lib/loaders/one-min-loader.ts:55`.
  - Generated type refs to deleted route in `.next/dev/types/validator.ts:458` and `.next/types/validator.ts:458`.
  - `tsconfig.json:29` and `tsconfig.json:30` include `.next` generated type trees.
- Fix plan:
  1. Resolve missing `bevegelse.json` import target.
  2. Stop coupling type-check to stale generated `.next` route artifacts (clean strategy or include refinement).
- Acceptance:
  1. `npm run type-check` exits 0 on clean checkout.

## A-004 High: Lint Gate Broken

- Symptom: ESLint crashes before evaluating code issues.
- Evidence:
  - `npm run lint` -> `TypeError: ConfigCommentParser is not a constructor`.
- Fix plan:
  1. Reconcile eslint package graph with Node version in use.
  2. Reinstall deps and lock versions.
- Acceptance:
  1. `npm run lint` executes and produces normal lint findings or success.

## A-005 High: Test Gate Unreliable

- Symptom:
  - Full Jest run hangs.
  - Targeted run can fail with `ERR_INVALID_PACKAGE_CONFIG`.
- Evidence:
  - Targeted command fails in `node_modules/.../p-limit/package.json` and `node_modules/p-try/package.json`.
- Fix plan:
  1. Restore deterministic dependency state.
  2. Run Jest in CI mode with timeout policy.
  3. Add smoke test command for 1-file execution.
- Acceptance:
  1. `npm run test -- --runInBand` completes.
  2. Targeted single test runs complete.

## A-006 Medium: Outdated Smoke Script

- Symptom: script does not reflect current tenant slugs/port.
- Evidence:
  - `scripts/test-all-tenants.sh:16` default URL is `localhost:3000` (dev runs on `3001`).
  - `scripts/test-all-tenants.sh:25` and `scripts/test-all-tenants.sh:29` use stale slugs (`malling-co`, `spabo-eiendom`).
  - Current slugs in `src/config/tenants.ts` include `front-real-estate`, `spabo`, `carucel`.
- Fix plan:
  1. Generate tenant route list from `TENANTS` source.
  2. Align default port with `npm run dev`.
- Acceptance:
  1. Smoke script covers all current tenants and returns deterministic matrix output.

## A-007 Medium: Verification Warning Noise

- Symptom: 105 warnings in `verify`, many due generic required-field checks.
- Evidence:
  - 83 files flagged for missing `name/address/tenant` where datasets are not property records.
- Fix plan:
  1. Introduce file-category schema checks.
  2. Restrict required field checks to true property profile shapes.
- Acceptance:
  1. Warning count drops to meaningful defects only.

## A-008 Medium: Nullability Contract Drift

- Symptom: 85 files contain nulls; top files have very high null counts.
- Evidence:
  - `src/data/main-board/nederst-i-markveien/korthandel/korthandel-i-valgt-tidsrom.json` has 1738 null entries.
- Fix plan:
  1. Document allowed-null fields by dataset schema.
  2. Add transformation/normalization layer where needed.
- Acceptance:
  1. Nulls are classified as allowed or defect by schema rule.

## A-009 Low: Semantic Label Clarity

- Symptom: 20 INFO notices from semantic audit in `antall-hus.json`.
- Evidence:
  - Decimal values and implausible "hytter/eneboliger" counts likely represent visitor housing type, not building counts.
- Fix plan:
  1. Clarify field naming and chart labels.
  2. Update docs/tooltips for meaning.
- Acceptance:
  1. Semantic audit info notices either resolved or explicitly acknowledged as expected.
