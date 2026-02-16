# Project Health Audit

Date: 2026-02-12  
Project: `lokka-gardeierforening-platform`  
Audit mode: analysis only (no application code/data fixes applied)

## Summary

The project has strong data volume coverage and useful verification scripts, but the core delivery gates are currently blocked by build/runtime tooling issues and one missing required analysis data file.

Primary blockers:

1. Runtime startup instability in `next dev` caused by missing/corrupt `next` runtime artifacts in `node_modules`.
2. Build pipeline failure due missing `carucel` 1-min analysis file (`bevegelse.json`).
3. Type-check, lint, and test gates currently not trustworthy as pass/fail quality signals.

## Scope and Method

Executed checks and inspections:

1. Environment and dependency snapshot (`node`, `npm`, package versions).
2. Existing project gates:
   - `npm run verify`
   - `npm run audit:data:critical`
   - `npm run audit:data -- --verbose`
   - `npm run type-check`
   - `npm run lint`
   - `npm run test -- --runInBand` and targeted Jest run
   - `npm run build`
3. Loader consistency audit:
   - Static JSON import existence check for `src/lib/loaders/*.ts`.
4. Runtime smoke attempts:
   - Multiple `npm run dev` boot probes + HTTP route probes.
5. Data integrity classification:
   - Parse and shape analysis for all `src/data/*.json` and `public/data/*.json`.

## Environment Snapshot

- Node: `v22.22.0`
- npm: `10.9.4`
- UTC execution reference: `2026-02-12T20:35:21Z`
- Declared Next in `package.json`: `^16.0.8`
- Installed Next in `node_modules`: `16.1.1`

## Quality Gate Results

| Gate | Result | Notes |
|---|---|---|
| `npm run verify` | FAIL | 1 failure, 105 warnings; fails analysis validation due missing `carucel` file |
| `npm run audit:data:critical` | PASS | 0 critical semantic/parse issues |
| `npm run audit:data -- --verbose` | PASS (INFO) | 20 info notices in `antall-hus.json` semantics |
| `npm run type-check` | FAIL | 3 TS2307 missing-module errors |
| `npm run lint` | FAIL | ESLint runtime crash: `ConfigCommentParser is not a constructor` |
| `npm run test -- --runInBand` | FAIL/UNSTABLE | Hangs in default run; targeted run exits with `ERR_INVALID_PACKAGE_CONFIG` |
| `npm run build` | FAIL | Stops in prebuild verification (same missing analysis file) |
| Runtime route smoke | BLOCKED | `next dev` startup unstable; process fails or never binds `localhost:3001` reliably |

## Public Interfaces Added for Audit Output

This audit introduces a machine-readable findings contract in `docs/audit/findings.json`:

- `id`
- `severity`
- `category`
- `tenant`
- `route_or_file`
- `symptom`
- `reproduction`
- `expected`
- `actual`
- `impact`
- `root_cause_hypothesis`
- `recommended_fix`
- `confidence`
- `evidence_refs`

## Highest Priority Findings

1. `A-001` Critical: Next runtime artifact integrity issue in `node_modules/next` blocks route smoke and local runtime confidence.
2. `A-002` Critical: Missing required file `src/data/carucel/olaf-ryes-plass-4/1min/bevegelse.json` blocks verify/build.
3. `A-003` High: Type-check breaks on missing data import plus stale `.next` route validator references.
4. `A-004` High: Lint gate unavailable due ESLint runtime error.
5. `A-005` High: Jest gate unstable/hanging and not reliable.

## What Is Functioning Correctly

1. JSON parsing integrity is strong:
   - `src/data`: 363/363 parse-valid.
   - `public/data + src/data`: 414 files scanned, 0 critical parse errors in semantic audit.
2. Critical semantic data audit currently passes.
3. Loader static import coverage is high:
   - 102 static JSON imports found.
   - 101 resolved, 1 missing (the known `carucel` file).
4. Tenant config registry is coherent and complete for current app routing model.

See `docs/audit/VERIFIED_WORKING_AREAS.md` for evidence-backed details.

## Key Risks

1. Current dev/runtime gates are not dependable until dependency/runtime integrity is restored.
2. Verification warning volume (105) is high and includes likely false positives, reducing signal.
3. Missing route smoke capability means regressions in user flows can ship undetected.

## Recommended Implementation Order

1. Restore dependency/runtime integrity (`node_modules`, lock consistency, Node compatibility baseline).
2. Fix blocking missing analysis file for `carucel`.
3. Stabilize `type-check` by removing stale generated type coupling and fixing import target.
4. Restore lint/test reliability.
5. Update and automate route smoke with current tenant registry.
