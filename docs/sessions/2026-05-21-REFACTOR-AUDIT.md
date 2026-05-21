# Refaktor-audit - 2026-05-21

## Konklusjon

Prosjektet trenger ikke en bred, løs "rydde alt"-refaktor. Det trenger en
målrettet refaktor i noen få soner der teknisk gjeld allerede påvirker
oppgraderinger, verifikasjon og vedlikehold:

1. Chart-/Recharts-laget.
2. Store analyse- og landingssidekomponenter.
3. Biblioteket-loaderen.
4. Dataimport og datafetch-kontrakter.
5. Eldre scripts med overlappende konverteringslogikk.

Arbeidet bør tas i små, verifiserbare PR-er. Ikke start med filstruktur alene.
Start der risikoen allerede har vist seg i type-check/lint/build.

## Høy prioritet

### 1. Chart- og tooltip-laget

**Signal**

- Recharts 3.8 krevde endringer i mange tooltip-formattere.
- `npx eslint --rule 'react-hooks/static-components:error'` gir fortsatt 23
  feil i chart-komponenter.
- `ResponsiveContainer` brukes bredt, med varierende `initialDimension`-dekning.
- `toRechartsNumber` er nå nødvendig på tvers av mange filer.

**Berørte filer**

- `src/components/analyser/BevegelseCharts.tsx`
- `src/components/analyser/KorthandelCharts.tsx`
- `src/components/analyser/KonkurransebildeCharts.tsx`
- `src/components/analyser/*ComparisonCharts.tsx`
- `src/components/analyser/Quarterly*.tsx`
- `src/components/demografi/*.tsx`
- `src/components/one-min-analysis/*.tsx`
- `src/app/main-board/analyser/nedre-lokka-utsnitt/page.tsx`
- `src/lib/utils/recharts.ts`

**Problem**

Chart-komponentene blander:

- datafetch eller lokale JSON-importer
- datatransformasjon
- tooltip-komponenter
- formattering
- layout
- visualisering

Dette gjør dependency-oppgraderinger dyrere enn nødvendig. Recharts-oppgraderingen
viste dette konkret: typeendringen var liten, men traff bredt fordi formattere og
tooltips er duplisert.

**Anbefalt tiltak**

- Lag felles chart-primitiver:
  - `ChartTooltip`
  - `CurrencyTooltip`
  - `PercentTooltip`
  - `NumberTooltip`
  - `ChartFrame`/`ChartCard` for consistent responsive sizing
- Flytt tooltip-komponenter ut av render-funksjonene.
- Aktiver `react-hooks/static-components` først for chart-mappen når feilene er
  lukket.
- Legg til en liten test som sikrer at `toRechartsNumber` håndterer `number`,
  `string`, arrays og `undefined`.

**Verifikasjon**

- `npm run type-check`
- `npm run lint`
- `npx eslint --rule 'react-hooks/static-components:error' src/components/analyser`
- `npm run test -- --runInBand`
- Browser-sjekk av:
  - `/main-board/analyser/kvartalsrapport-banktransaksjoner`
  - `/main-board/analyser/sammenligning/2025`
  - `/main-board/analyser/nedre-lokka-utsnitt`

### 2. Store analysekomponenter og sidefiler

**Signal**

Største TS/TSX-filer:

- `src/app/front-real-estate/eiendommer/markveien-35/bare-bygget/page.tsx` - 1098 linjer
- `src/app/main-board/analyser/nedre-thorvald-meyers-gate/page.tsx` - 1040 linjer
- `src/app/main-board/analyser/ovre-thorvald-meyers-gate/page.tsx` - 1033 linjer
- `src/components/analyser/PropertyOwnerAnalysis.tsx` - 787 linjer
- `src/app/main-board/analyser/nedre-lokka-dashboard/page.tsx` - 761 linjer
- `src/app/front-real-estate/eiendommer/markveien-35/analyse/page.tsx` - 755 linjer
- `src/app/main-board/analyser/nedre-lokka-utsnitt/page.tsx` - 715 linjer

**Problem**

Disse filene er vanskelige å endre trygt fordi sidekomponentene ofte eier både
presentasjon, datatransformasjon og analysefortelling. Det øker risiko ved små
endringer og gjør browser-regresjoner mer sannsynlige.

**Anbefalt tiltak**

- Del sidefiler etter seksjon, ikke etter teknisk lag.
- Flytt rene datatransformasjoner til `src/lib/...` med enkle tester.
- La sidefilene bli komposisjon: import data, bygg seksjoner, render.
- Prioriter én sidefamilie først: `nedre-lokka-utsnitt` eller
  `front-real-estate/markveien-35`.

**Verifikasjon**

- Side-spesifikk browser-sjekk før og etter.
- `npm run type-check`
- `npm run build`
- Route-crawl for berørte ruter.

## Middels prioritet

### 3. Biblioteket-loaderen

**Signal**

- `src/lib/loaders/biblioteket-loader.ts` er 1629 linjer.
- Den importerer minst 26 JSON-kilder direkte.
- Den dekker mange domener samtidig: ildsjeler, litteratur, historie, kultur,
  idrett og mediebildet.

**Problem**

Loaderen er blitt en sentral samlingsfil. Endringer i én bibliotek-kategori kan
bli vanskelig å isolere fra resten, og type-/datakontrakter blir tunge å forstå.

**Anbefalt tiltak**

- Del i domeneloadere:
  - `ildsjeler-loader.ts`
  - `litteratur-loader.ts`
  - `historie-loader.ts`
  - `kultur-loader.ts`
  - `mediebildet-loader.ts`
- Behold en tynn `biblioteket-loader.ts` som public facade.
- Flytt validerings-/normaliseringslogikk nær domeneloadere.
- Ikke endre URL- eller route-kontrakter samtidig.

**Verifikasjon**

- Eksisterende biblioteket-tester.
- Route-crawl av `/main-board/biblioteket/**`.
- Browser-sjekk av minst én detaljside per kategori.

### 4. Dataimport/fetch-kontrakter i analysekomponenter

**Signal**

- Mange komponenter fetcher direkte fra `${basePath}/...json`.
- Flere sidefiler importerer mange JSON-filer direkte.
- Dataformer transformeres inline rett før chart-rendering.

**Problem**

Det finnes to parallelle dataflyter:

- compile-time JSON-importer
- runtime fetch fra `public/data`

Begge fungerer, men kontraktene er ikke tydelig samlet. Det gjør det enklere å
lage analysekomponenter som bare virker for én folderstruktur eller ett år.

**Anbefalt tiltak**

- Definer små typed data-adaptere per analysefamilie:
  - `loadKorthandelData(basePath)`
  - `loadBevegelseData(basePath)`
  - `loadKonkurransebildeData(basePath)`
- La komponentene få ferdig normaliserte arrays.
- Hold `basePath` som offentlig API for nå, men skjul filnavnene i adaptere.

**Verifikasjon**

- Tester for adaptere med representative JSON-fixtures.
- Data-audit må fortsatt være grønn.
- Browser-sjekk av 2024/2025 årsrapport og sammenligning.

## Lavere prioritet

### 5. Scripts for konvertering og aggregasjon

**Signal**

Store scripts:

- `scripts/build-nedre-lokka-svarut.js` - 1129 linjer
- `scripts/convert-all-1min-data.js` - 842 linjer
- `scripts/convert-markveien-5min.js` - 804 linjer
- `scripts/convert-vulkan-5min.js` - 640 linjer
- `scripts/convert-nedre-lokka-utsnitt.js` - 535 linjer
- `scripts/aggregate-nedre-lokka.ts` - 485 linjer

**Problem**

Scripts ser ut til å ha overlappende parsing, normalisering og output-format.
Siden de ikke er i hot path for app-runtime, er dette mindre akutt enn charts,
men det kan skape datadrift over tid.

**Anbefalt tiltak**

- Ikke refaktorer alle scripts samtidig.
- Først dokumenter hvilke scripts som fortsatt er aktive.
- Deretter trekk ut felles CSV/JSON-normalisering hvis samme mønster finnes i
  minst to aktive scripts.
- Legg til `--dry-run`/manifest-output der scripts skriver data.

**Verifikasjon**

- Kjør scripts mot en liten fixture, ikke full datasett først.
- Sammenlign output-hash/antall rader før og etter.
- Kjør `npm run audit:data:critical`.

## Anbefalt rekkefølge

1. **Chart primitives og tooltip-refaktor**
   - Lukker `react-hooks/static-components`-gjelden.
   - Reduserer risiko ved videre Recharts/React/Next-oppgraderinger.

2. **Nedre Løkka utsnitt-side**
   - Stor side, mange JSON-importer, mange charts.
   - God kandidat for å bevise mønsteret.

3. **Biblioteket-loader facade split**
   - Stor fil med høy domenekobling.
   - Bør gjøres etter chart-oppryddingen, siden route-crawl allerede dekker dette
     godt.

4. **Data-adaptere for analysefamilier**
   - Gir bedre kontrakter mellom `public/data`, `src/data` og UI.

5. **Script-opprydding**
   - Kun aktive scripts, kun etter at app-runtime og data-kontrakter er roligere.

## Stop-regler

- Ikke refaktorer uten at baseline er grønn før hver delendring.
- Ikke bland dependency-major-migreringer inn i samme endring som strukturell
  refaktor.
- Ikke flytt datafiler samtidig som komponenter deles opp.
- Ikke slett historiske scripts før vi har en manifestliste over hva som fortsatt
  brukes.
- Hvis en refaktor krever mer enn 3-5 filer for én seksjon, skriv en egen plan før
  endring.

## Baseline-kommandoer

Kjør før og etter hver refaktor-del:

```bash
npm run verify
npm run type-check
npm run lint
npm run test -- --runInBand
npm run audit:data:critical
npm run build
```

For chart-refaktor:

```bash
npx eslint --rule 'react-hooks/static-components:error' src/components/analyser
```

For runtime:

```bash
DISABLE_TENANT_AUTH=true npm run dev -- -p 3002
```

Deretter browser-sjekk aktuelle ruter.
