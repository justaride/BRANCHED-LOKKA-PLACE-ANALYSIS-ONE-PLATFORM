# Route Smoke Results

Date: 2026-02-12  
Mode requested: automated + route smoke  
Outcome: blocked by runtime startup instability

## Intended Route Matrix

Planned smoke coverage included:

1. `/`
2. `/login`
3. `/main-board`
4. `/main-board/analyser`
5. `/main-board/biblioteket`
6. `/main-board/biblioteket/ildsjeler`
7. `/main-board/biblioteket/historie`
8. `/aspelin-ramm`
9. `/aspelin-ramm/eiendommer`
10. `/aspelin-ramm/eiendommer/vulkan-arena`
11. `/brodrene-evensen`
12. `/brodrene-evensen/eiendommer`
13. `/brodrene-evensen/eiendommer/thorvaldmeyers-gate-18`
14. `/eiendomsspar`
15. `/front-real-estate`
16. `/maya-eiendom`
17. `/roger-vodal`
18. `/sio`
19. `/spabo`
20. `/carucel`
21. `/carucel/eiendommer`
22. `/carucel/eiendommer/olaf-ryes-plass-4`

## Actual Runtime Behavior

The smoke matrix could not be executed to completion because local app startup was not reliable.

Observed failures across repeated startup probes:

1. Startup crash with missing Next runtime module:
   - `Cannot find module '../shared/lib/image-config'`
   - from `node_modules/next/dist/server/config-shared.js`

2. Startup crash with helper interop runtime error:
   - `TypeError: _interop_require_default._ is not a function`
   - from `node_modules/next/dist/shared/lib/constants.js`

3. Startup non-readiness:
   - `npm run dev` process starts, but `localhost:3001` remains unreachable during probe window.

## Evidence Pointers

1. Missing module callsite:
   - `node_modules/next/dist/server/config-shared.js:28`
2. Missing runtime file:
   - `node_modules/next/dist/shared/lib/image-config.js` (missing)
3. Additional missing artifact:
   - `node_modules/next/dist/shared/lib/hash.js` (missing)

## Route Smoke Status

| Check | Status |
|---|---|
| Dev server boot reliability | FAIL |
| Route matrix execution | BLOCKED |
| Tenant flow verification | BLOCKED |
| Auth redirect behavior verification | BLOCKED |

## Required Precondition Before Retrying

Dependency/runtime integrity must be restored first (clean install and validated Next runtime artifacts), then rerun this exact route matrix.
