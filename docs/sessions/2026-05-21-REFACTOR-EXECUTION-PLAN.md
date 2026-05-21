# Refaktor-gjennomforing - 2026-05-21

## Mal

Hver slice skal starte og slutte med gronn baseline for berort omrade. Ikke bland
dependency-major-migreringer, dataflytting og strukturell refaktor i samme slice.

## Slice 1: Chart-primitiver og tooltip-opprydding

**Mal:** Redusere Recharts/tooltip-duplisering og lukke
`react-hooks/static-components`-feil i `src/components/analyser`.

**Status 2026-05-21:** Ferdig. `react-hooks/static-components` er aktiv igjen via
normal ESLint-konfig.

**Filer:**

- Utvid: `src/lib/utils/recharts.ts`
- Test: `src/lib/utils/__tests__/recharts.test.ts`
- Opprett/bruk: `src/lib/utils/recharts.ts`
- Oppdater: chart-komponenter som i dag definerer `CustomTooltip` inne i render.

**Steg:**

- [x] Skriv test for `toRechartsNumber` og tooltip-formattering.
- [x] Kjor testen og se den feile for manglende edge case eller helper.
- [x] Implementer minimal helper/primitiv.
- [x] Flytt tooltip-komponenter ut av render i analysecharts.
- [x] Kjor `npx eslint --rule 'react-hooks/static-components:error' src/components/analyser`.
- [x] Kjor full baseline.

## Slice 2: Nedre Lokka utsnitt

**Mal:** Dele `src/app/main-board/analyser/nedre-lokka-utsnitt/page.tsx` i
seksjoner uten a flytte datafilene.

**Status 2026-05-21:** Ferdig for planlagt lavrisiko-scope. Route-filen er
redusert fra 715 til ca. 508 linjer ved a flytte hero, nokkeltall, relatert
analyse, datakilder, kart og delte presentasjonskomponenter til lokal
`_components`-modul. Datatransformasjoner er flyttet til
`src/lib/analyser/nedre-lokka-utsnitt.ts` med testdekning.

**Steg:**

- [x] Flytt rene seksjoner til lokale komponenter.
- [x] Flytt datatransformasjoner til testbare helpers.
- [x] Browser-sjekk siden for visuell regresjon.

## Slice 3: Biblioteket-loader facade split

**Mal:** Dele `src/lib/loaders/biblioteket-loader.ts` i domeneloadere, men
beholde public API og ruter.

**Status 2026-05-21:** Startet og verifisert. `idrett` og `mediebildet` er
flyttet til domeneloadere under `src/lib/loaders/biblioteket/`, mens
`biblioteket-loader.ts` fortsatt er fasade for eksisterende imports.

**Steg:**

- [x] Lag domeneloadere for `idrett` og `mediebildet`.
- [x] Behold facade.
- [x] Kjor biblioteket-tester og full build.
- [ ] Flytt neste domeneblokk etter behov.

## Slice 4: Analyse-dataadaptere

**Mal:** Skjule JSON-filnavn bak typed adaptere per analysefamilie.

**Status 2026-05-21:** Startet og verifisert for `nedre-lokka-utsnitt`.
`bevegelse`, `korthandel` og `konkurransebilde` lastes via
`src/lib/analyser/nedre-lokka-utsnitt-data.ts`, og route-filen bruker adapteren.

**Steg:**

- [x] Start med `bevegelse`.
- [x] Deretter `korthandel`.
- [x] Deretter `konkurransebilde`.

## Slice 5: Script-opprydding

**Mal:** Kun aktive scripts. Ingen sletting uten manifest.

**Status 2026-05-21:** Startet. `scripts/test-all-tenants.sh` er oppdatert mot
dagens dev-port og tenant-register via `scripts/list-tenant-slugs.js`.

**Steg:**

- [x] Lag scripts-manifest.
- [x] Identifiser og fiks kjent drift i aktivt smoke-script.
- [ ] Trekk ut felles helper kun for aktive scripts.
