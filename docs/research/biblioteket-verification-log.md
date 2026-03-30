# Biblioteket Verification Log

Dato: 30. mars 2026
Ansvarlig: `codex-gpt-5`

## Utførte kontroller
1. Innført felles verifikasjonstyper for hele biblioteket i `src/types/biblioteket.ts`.
2. Etablert normalisering og aggregasjon av research-data i `src/lib/verifisering/biblioteket.ts`.
3. Beriket `historie`, `idrett`, `ildsjeler`, `litteratur` og `mediebildet` med `sources`, `claims`, `researchMetadata`, `crossReferences` og `limitations`.
4. Koblet verifikasjonsstatus inn i `biblioteket-loader` og på kategori- og oversiktssidene.
5. Opprettet scripts for validering og rapportering:
   - `npm run research:biblioteket:validate`
   - `npm run research:biblioteket:report`
   - `npm run research:biblioteket:queue`
6. Kjørt full teknisk verifisering:
   - `npm run type-check`
   - `npm run research:biblioteket:validate`
   - `npm run research:biblioteket:report`
   - `npm run build`

## Resultat
- Datasett validert: `13`
- Totale kilder: `347`
- Totale claims: `185`
- `verified`: `185`
- `partially_verified`: `0`
- `unverified`: `0`
- `disputed`: `0`
- Gjennomsnittlig coverage score: `0.90`

## Metode
- `verified` krever minst én `primary` kilde eller minst to uavhengige kilder.
- `partially_verified` brukes når claimet har noe dokumentasjon, men ikke nok til full verifisering.
- `coverageScore` brukes som et samlet mål for hvor godt et datasett er dokumentert og oppdatert.
- `limitations` brukes eksplisitt der materialet fortsatt har svakheter eller mangler primærkilder.

## Merknader
- Kulturmaterialet hadde allerede et forskningslag og er nå aggregert inn i samme biblioteksoverblikk.
- Første research-sprint lukket `film-009` ved å erstatte en ubekreftet bopelspåstand med et verifisert claim om `Budbringeren` som Oslo-/østkantfilm.
- Første research-sprint løftet `ildsjeler-005` til `verified` ved å omformulere claimet til en dokumenterbar komposisjonspåstand om historiske pionerer og nålevende gründere.
- Andre research-sprint løftet `litteratur-001` til `litteratur-004` til `verified` ved å erstatte brede tolkningsclaims med konkrete bibliografiske påstander og sterkere katalogkilder.
- Tredje research-sprint lukket `idrett-003`, `idrett-005`, `idrett-006` og `historie-002` ved å bytte ut brede eller omstridte formuleringer med smalere claims som er bedre forankret i forbunds-, leksikon- og fabrikkhistoriske kilder.
- Fjerde research-sprint lukket `film-010`, `film-011`, `film-013`, `master-009` og `master-010`, slik at biblioteket nå står med `124/124` verifiserte claims og `0` åpne items i research-køen.
- Femte research-sprint gikk over i coverage-utvidelse og la til fire nye claims i `mediebildet` og `ildsjeler`, slik at begge laveste datasett løftet coverage fra `0.63` til `0.74` uten å gjenåpne research-køen.
- Sjette research-sprint la til ytterligere fem claims i `mediebildet` og `ildsjeler`, slik at begge datasett nå er over `0.80` i coverage og biblioteket står med `133/133` verifiserte claims.
- Sjuende research-sprint utvidet `litteratur` med tre nye, rent bibliografiske claims om oppslagsverk, skolehistorie og lokalhistorisk vandringsbok, og løftet datasettet til `9/9` verifiserte claims med `0.87` i coverage.
- Aattende research-sprint utvidet `historie` med tre nye, smale claims om Ny York, Grünerløkka Leieboerforening og Birkelunden kulturmiljø, og løftet datasettet til `9/9` verifiserte claims med `0.86` i coverage.
- Niende research-sprint utvidet `idrett` med tre nye claims om Dælenenga som fleridrettsanlegg, Sportsklubben Strongs meritter og Spartacus-miljøets organisatoriske betydning for AIF, og løftet datasettet til `9/9` verifiserte claims med `0.86` i coverage.
- Tiende research-sprint utvidet `mediebildet` med tre nye claims om NRKs faktaprogrammer, NRKs musikkjournalistikk og avisjournalistikkens symbolbruk rundt Fru Hagen og Thorvald Meyers gate, og løftet datasettet til `12/12` verifiserte claims med `0.86` i coverage.
- Ellevte research-sprint utvidet `ildsjeler` med tre nye claims om skoleledelse, gatekunstorganisering og lokal idrettsfrivillighet, og løftet datasettet til `13/13` verifiserte claims med `0.87` i coverage.
- Tolvte research-sprint utvidet `kultur-design` med fire nye claims om `Kollekted by`, `Skaperverket`, `Schous kulturbryggeri` og `Popsenterets` permanente stengning, og løftet datasettet til `17/17` verifiserte claims med `0.85` i coverage.
- Trettende research-sprint utvidet `kultur-arkitektur` med fire nye claims om `Nedre Foss park`, `Parkteatret`, `Schous kulturbryggeri` og `Hauges Minde`, og løftet datasettet til `19/19` verifiserte claims med `0.89` i coverage samtidig som Schous-beskrivelsen ble oppdatert for `Popsenterets` avvikling.
- Fjortende research-sprint utvidet `kultur-design` med fire nye claims om `Dapper`, `Hunting Lodge`, `KHiO` og `Tom Wood`, og løftet datasettet til `21/21` verifiserte claims med `0.89` i coverage.
- Femtende research-sprint utvidet `kultur-jazz` med fire nye claims om `BLÅ`, `Afric Pepperbird`, `Belonging` og `Trygve Seims Different Rivers`, og løftet datasettet til `15/15` verifiserte claims med `0.91` i coverage.
- Sekstende research-sprint utvidet `kultur-hiphop` med fem nye claims om `Soul Sessions Oslo`, `Floorknights`, `Quick Style`, `National Rap Show` og `Pay2`, og strammet samtidig inn X-Ray-claimet til dokumenterte crew og artister. Datasettet står nå med `18/18` verifiserte claims og `0.92` i coverage.
- Syttende research-sprint utvidet `kultur-teater` med seks nye claims om `Tigerstadsteatret`, `Tigerbussen`, `Romeo+Julie`, `Crap Comedy Festival`, `Vega Scenes` ungdomssatsing og flyttingen av `Oslo Nye Dukketeater` fra Trikkestallen til Centralteatret. Datasettet står nå med `16/16` verifiserte claims og `0.93` i coverage.
- Attende research-sprint utvidet `kultur-billedkunst` med seks nye claims om Atelier Nords 1998/2011-milepæler, `Purenkel`, `Galleri Seilet`, `Street Art Oslo`, `Oslo Street Art Festival` og `Eventyrbrua`. Datasettet står nå med `16/16` verifiserte claims og `0.92` i coverage.
- Nittende research-sprint utvidet `kultur-design` med fire nye claims om `Good Vibes Vintage`, `Bleed`, `Bielke&Yang` og den dokumenterte vintagebredden mellom `Robot` og `Good Vibes`, samtidig som stale adresser og etableringsår ble korrigert mot offisielle butikkilder. Datasettet står nå med `25/25` verifiserte claims og `0.93` i coverage.
- Prosjektets generelle `verify-project.js` gir fortsatt mange repo-brede JSON-advarsler som ikke er spesifikke for biblioteket.
- Verifikasjonsstatusen vises nå i UI uten å markere delvis dokumenterte claims som fullt verifiserte.
