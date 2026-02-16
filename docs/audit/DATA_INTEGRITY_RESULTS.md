# Data Integrity Results

Date: 2026-02-12

## Executive Summary

Core JSON parse integrity is currently good, but one required analysis file is missing and the verification warning model is too broad for mixed dataset shapes.

## Source Checks

1. `npm run verify`
2. `npm run audit:data:critical`
3. `npm run audit:data -- --verbose`
4. Additional static checks:
   - Loader import path existence check.
   - Required field/null classification over `src/data`.

## Result Snapshot

| Metric | Value |
|---|---|
| `src/data` JSON files scanned | 363 |
| Parse-invalid files (`src/data`) | 0 |
| `public/data + src/data` files scanned | 414 |
| Critical semantic issues | 0 |
| INFO semantic notices | 20 |
| Analysis validation expected files | 76 |
| Analysis validation valid files | 75 |
| Analysis validation missing files | 1 |
| Verify warnings | 105 |
| Verify failures | 1 |

## Blocking Data Issue

1. Missing required analysis file:
   - `src/data/carucel/olaf-ryes-plass-4/1min/bevegelse.json`
2. Effects:
   - `analysis-validation-report.json` reports missing file.
   - `npm run verify` fails.
   - `npm run build` fails through prebuild verification.
   - `npm run type-check` fails because loader statically imports this missing file.

## Verification Warning Breakdown (Current Heuristic)

Additional classification over `src/data`:

1. Files flagged for missing required fields (`name/address/tenant`): 83
2. Tenant/group distribution:
   - `spabo`: 22
   - `biblioteket`: 20
   - `main-board`: 12
   - `roger-vodal`: 9
   - `aspelin-ramm`: 6
   - `maya-eiendom`: 4
   - `sio`: 3
   - `brodrene-evensen`: 3
   - `eiendomsspar`: 2
   - `front-real-estate`: 1
   - `carucel`: 1

Interpretation:

Many flagged files are thematic/analysis datasets, not property-profile objects. Current verify logic likely over-applies property required fields to non-property schemas.

## Nullability Classification

1. Files containing at least one null value: 85
2. Top null-dense file:
   - `src/data/main-board/nederst-i-markveien/korthandel/korthandel-i-valgt-tidsrom.json`
   - null occurrences detected: 1738

Interpretation:

Null presence is substantial in some datasets and should be governed by explicit nullable schema contracts to avoid ambiguous warnings and hidden runtime risk.

## Semantic INFO Notices

`npm run audit:data -- --verbose` produced 20 INFO notices in:

- `public/data/main-board/sammenligning-2024/besokende/antall-hus.json`

Pattern:

Values (for example "Eneboliger", "Hytter") appear semantically implausible as literal building counts in central urban areas and likely represent visitor housing-type composition instead.

## Data Integrity Conclusion

1. Parse integrity is good.
2. One missing required `carucel` file is a hard blocker.
3. Current warning model needs schema-aware refinement to separate true defects from expected structure differences.
