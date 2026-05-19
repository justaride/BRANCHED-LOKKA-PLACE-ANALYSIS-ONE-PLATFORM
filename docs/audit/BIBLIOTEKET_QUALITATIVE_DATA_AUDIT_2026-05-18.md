# Biblioteket kvalitativ dataaudit

Dato: 2026-05-18

## Status

Lokal bibliotek-database er restaurert fra origin/main før denne auditen. Standard research-validering er grønn:

```text
Biblioteket research-validering OK.
Datasett validert: 13
```

Dette betyr at filene finnes og passerer dagens kontrakt. Det betyr ikke at alt er kvalitativt ferdig verifisert.

Etter oppryddingsbatchene er `kultur/arkitektur.json` og `kultur/design-kreativ.json` normalisert fra legacy `type`/`source`-felter til strukturert `sourceType`, `evidenceLevel`, `accessedAt` og `claim.sources[]`. I tillegg er resterende ugyldige `sourceType`-verdier i kulturfilene normalisert.

Etter den siste innholdsbatchen er URL-hull i mediebildet gjort eksplisitte: 17 poster fikk direkte offentlig URL, og 10 poster uten funnet offentlig URL fikk `urlStatus` + `archiveReference`. I ildsjeler er biografiske nullverdier nå merket med `dataQuality.biographicalStatus`, slik at ukjent, ikke relevant og manglende lenkegrunnlag ikke blandes sammen.

Etter siste kildebatch er alle 12 tidligere `partially_verified` claims enten styrket med primærkilde/flere konkrete kilder eller presisert til en smalere claim-tekst. Research-køen er dermed tom. Noen claims har fortsatt kvalitative notater om kildebegrensning der dokumentasjonen er sekundær eller indirekte, men de er ikke lenger skjulte svake punkter.

Etter browser-/runtime-QA er Biblioteket-sidene også kontrollert i lokal Next-dev med webpack. Runtime-heng ble sporet til Tailwind v4 sin automatiske kilde-skanning av lokale iCloud-/duplikatmapper og løst ved å avgrense Tailwind source til `src/`. Synlige 404-feil fra `mediebildet-hero.jpg` og `/images/noise.png` er fjernet. En tekstkorrupsjon i mastertidslinjen, der norsk tekst som `bygninger`, `innbyggere` og `standard` ble ødelagt av naive engelske delstreng-erstatninger, er rettet og dekket med regresjonstest. Den siste Playwright-runden kontrollerte toppside, byhistorie og designside uten relevante console warnings/errors, ødelagte lastede bilder eller tekstkorrupsjon.

Merk at prosjektets globale `npm run verify` fortsatt feiler utenfor Biblioteket-scope på 11 analyse-JSON-er for eiendommer. Biblioteket-portene er grønne, men full `npm run build` er derfor fortsatt blokkert av prosjektglobal prebuild-verifisering.

## Nøkkeltall

- JSON-filer i `src/data/biblioteket`: 41
- Claims i verifikasjonslaget: 185
- Kilder i verifikasjonslaget: 381
- Claims markert `verified`: 185
- Claims markert `partially_verified`: 0
- Claims markert `unverified` eller `disputed`: 0
- High-funn etter ny streng audit-gate: 0
- Legacy claim-kilder uten strukturert `sources[]`: 0
- Legacy-kilder uten strukturert `sourceType`/`evidenceLevel`: 0
- Mediebildet-poster uten URL eller arkivreferanse: 0
- Ildsjeler-profiler med biografiske hull uten statusmerking: 0

## Funn

1. **CRITICAL - Lokal arbeidskopi manglet hele bibliotek-databasen**
   - Evidence: Før restore hadde src/data/biblioteket 0 filer. Etter restore har den 41 JSON-filer og eksisterende validator passerer.
   - Tiltak: Ikke bruk iCloud-dataless arbeidskopi som kilde for QA. Hold en komplett lokal clone eller legg inn en preflight som feiler hvis bibliotek-data mangler.
2. **RESOLVED - Standardvalideringen skjulte svake claims, men streng audit-gate er nå grønn**
   - Evidence: `npm run research:biblioteket:audit:strict` passerer med 13 datasett, 381 kilder, 185 claims, 185 verified, 0 partially_verified og 0 issues.
   - Tiltak: Gjør `npm run research:biblioteket:audit:strict` til fast preflight før publisering.
3. **RESOLVED - Arkitektur og design brukte legacy claim-schema**
   - Evidence: Før batchen hadde arkitektur/design 44 legacy claims og 80 kilder uten `evidenceLevel`. Etter batchen har de to filene 95 kilder, 44 claims, 0 legacy-funn og 0 high-funn i smal streng gate.
   - Tiltak: Behold canonical schema i nye datasett og unngå reintroduksjon av `source`-strenger.
4. **RESOLVED - Resterende kulturfiler hadde ugyldig sourceType og svake verified claims**
   - Evidence: Jazz, hiphop, film, teater og billedkunst passerer streng gate med 0 issues. De tidligere delvis verifiserte claimene er nå enten styrket med kilder eller presisert.
   - Tiltak: Behold notatfeltet på claims der kilden er indirekte, slik at verifikasjonsstatus ikke leses som en sterkere historisk konklusjon enn kildene bærer.
5. **RESOLVED - Mediebildet hadde URL-hull i underdata**
   - Evidence: Ny innholdsaudit viser 49 medieposter, 39 med URL, 10 med arkivreferanse/status og 0 uten referanse. Av de 27 tidligere hullene er 17 tettet med direkte URL og 10 merket som arkiv-/katalogreferanse.
   - Tiltak: Kjør `npm run research:biblioteket:content-audit` som preflight når nye medieposter legges inn.
6. **RESOLVED - Ildsjeler hadde biografiske hull uten eksplisitt status**
   - Evidence: Ny innholdsaudit viser 31 profiler, 26 profiler med minst ett biografisk gap, 31 profiler med `dataQuality.biographicalStatus` og 0 issues.
   - Tiltak: Nye profiler skal angi status for birthYear, deathYear, isLiving og links, også når verdien er ukjent eller ikke relevant.
7. **RESOLVED - Research-køen hadde 12 delvis verifiserte kulturclaims**
   - Evidence: `npm run research:biblioteket:queue` genererer nå `itemCount: 0`. Smal kontroll på kulturfilene viser 0 `partially_verified`.
   - Tiltak: Bruk tom kø som publiseringssignal, men ikke som garanti for at hvert claim har primærkilde på originalnivå.
8. **RESOLVED - Runtime-heng i lokal Biblioteket-visning**
   - Evidence: Før fix hang både dev-server og `next build` i Tailwind/Next-pipeline. Prosess-sample viste `tailwindcss-oxide` i bred filskanning. Etter `@import 'tailwindcss' source('../');` svarte 19 Biblioteket-ruter `200 OK`.
   - Tiltak: Hold lokale duplikat-/backupmapper utenfor source-skanning, eller behold eksplisitt Tailwind source.
9. **RESOLVED - Synlige 404-assets i Biblioteket**
   - Evidence: Playwright-konsollen viste 400/404 for `mediebildet-hero.jpg` og `/images/noise.png`. `mediebildet` peker nå til eksisterende `lokka-bibliotek-hero.jpg`, og noise-overlayen er fjernet fra kulturundersidene.
   - Tiltak: Legg til en smal asset-preflight for offentlig brukte Biblioteket-bilder før publisering.
10. **RESOLVED - Norsk byhistorietekst ble korrumpert i mastertidslinjen**
   - Evidence: Playwright snapshot viste `avgging`, `innavggere` og `stogard`. Regresjonstesten `src/lib/__tests__/translate-historie.test.ts` feilet først på samme symptom og passerer etter at erstatningslogikken bare matcher hele engelske ord/fraser.
   - Tiltak: Unngå naive global-replace-regler på blandet norsk/engelsk innhold.

## Datasettoversikt

| Datasett | Claims | Sources | Verified | Partial | Legacy claims | Legacy sources | High issues |
|---|---:|---:|---:|---:|---:|---:|---:|
| `historie/verification.json` | 9 | 18 | 9 | 0 | 0 | 0 | 0 |
| `ildsjeler/verification.json` | 13 | 19 | 13 | 0 | 0 | 0 | 0 |
| `litteratur/verification.json` | 9 | 20 | 9 | 0 | 0 | 0 | 0 |
| `kultur/grunerlokka_master_alt.json` | 10 | 12 | 10 | 0 | 0 | 0 | 0 |
| `kultur/jazz.json` | 15 | 32 | 15 | 0 | 0 | 0 | 0 |
| `kultur/hiphop.json` | 18 | 35 | 18 | 0 | 0 | 0 | 0 |
| `kultur/film.json` | 14 | 34 | 14 | 0 | 0 | 0 | 0 |
| `kultur/teater.json` | 16 | 34 | 16 | 0 | 0 | 0 | 0 |
| `kultur/billedkunst.json` | 16 | 41 | 16 | 0 | 0 | 0 | 0 |
| `kultur/arkitektur.json` | 19 | 41 | 19 | 0 | 0 | 0 | 0 |
| `kultur/design-kreativ.json` | 25 | 58 | 25 | 0 | 0 | 0 | 0 |
| `idrett/idrett.json` | 9 | 19 | 9 | 0 | 0 | 0 | 0 |
| `mediebildet/mediebildet.json` | 12 | 18 | 12 | 0 | 0 | 0 | 0 |

## Målrettede datakontroller

- Ildsjeler: 31 profiler, 26 med minst ett biografisk gap, 31 med `dataQuality.biographicalStatus`, 0 uten statusmerking.
- Litteratur: 49 verk, 0 manglende authors/topics og 0 ugyldige årstall.
- Historie: 35 timeline-events, 2 uten entities, 0 ugyldige årsspenn.
- Mediebildet: 49 poster, 39 med URL, 10 med eksplisitt arkiv-/katalogreferanse, 0 uten URL eller referanse.

## Streng audit-status

| Gate | Status | Tall |
|---|---|---|
| `npm run research:biblioteket:audit:strict` | PASS | 13 datasett, 381 kilder, 185 claims, 0 issues |
| `npm run research:biblioteket:content-audit` | PASS | 49 medieposter, 0 uten referanse, 31 ildsjeler statusmerket |
| Browser/runtime smoke | PASS | 19 Biblioteket-ruter svarte 200 etter Tailwind source-fix |
| Playwright snapshot | PASS | Hjem, byhistorie og designside rendret uten relevante console warnings/errors, ødelagte lastede bilder eller tekstkorrupsjon |
| Prosjektglobal `npm run verify` | BLOCKED | 11 analyse-JSON-feil utenfor Biblioteket blokkerer full `npm run build` |
| Legacy schema | PASS | 0 legacy claim-kilder og 0 legacy source-kilder |
| Verified evidence rule | PASS | Ingen `verified` claim uten primærkilde eller minst to konkrete kilder |
| `npm run research:biblioteket:queue` | PASS | 0 claims i research-kø |

## Anbefalt neste batch

1. Gjør `npm run research:biblioteket:audit:strict`, `npm run research:biblioteket:content-audit`, route-smoke og Playwright snapshot til fast preflight før publisering.
2. Kjør et bredere asset-pass for øvrige ikke-Biblioteket sider før full lansering; en bred `/images`-sjekk viser eldre baseline-referanser utenfor denne Biblioteket-fiksen.
3. Gjør et frivillig dybdepass på claims der notatet sier at kilden er sekundær eller indirekte: `hiphop-011`, `film-008`, `film-012` og `billedkunst-009`.
