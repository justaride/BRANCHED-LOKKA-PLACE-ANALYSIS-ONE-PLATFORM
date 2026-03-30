# Biblioteket Claim Registry

Oppdatert: 30. mars 2026

## Omfang
- Kilder: `src/data/biblioteket/**/*`
- Verifikasjonsfiler:
  - `src/data/biblioteket/historie/verification.json`
  - `src/data/biblioteket/ildsjeler/verification.json`
  - `src/data/biblioteket/litteratur/verification.json`
  - `src/data/biblioteket/idrett/idrett.json`
  - `src/data/biblioteket/mediebildet/mediebildet.json`
  - `src/data/biblioteket/kultur/*.json`
- Totalt claims i rapporten: `185`

## Fordeling per datasett
| Datasett | Claims | Verified | Partially verified | Unverified | Sources | Coverage | Sist verifisert |
|---|---:|---:|---:|---:|---:|---:|---|
| `historie` | 9 | 9 | 0 | 0 | 18 | 0.86 | 2026-03-30 |
| `ildsjeler` | 13 | 13 | 0 | 0 | 19 | 0.87 | 2026-03-30 |
| `litteratur` | 9 | 9 | 0 | 0 | 20 | 0.87 | 2026-03-30 |
| `kultur-master` | 10 | 10 | 0 | 0 | 12 | 0.94 | 2026-03-30 |
| `kultur-jazz` | 15 | 15 | 0 | 0 | 30 | 0.91 | 2026-03-30 |
| `kultur-hiphop` | 18 | 18 | 0 | 0 | 29 | 0.92 | 2026-03-30 |
| `kultur-film` | 14 | 14 | 0 | 0 | 31 | 0.93 | 2026-03-30 |
| `kultur-teater` | 16 | 16 | 0 | 0 | 34 | 0.93 | 2026-03-30 |
| `kultur-billedkunst` | 16 | 16 | 0 | 0 | 37 | 0.92 | 2026-03-30 |
| `kultur-arkitektur` | 19 | 19 | 0 | 0 | 30 | 0.89 | 2026-03-30 |
| `kultur-design` | 25 | 25 | 0 | 0 | 50 | 0.93 | 2026-03-30 |
| `idrett` | 9 | 9 | 0 | 0 | 19 | 0.86 | 2026-03-30 |
| `mediebildet` | 12 | 12 | 0 | 0 | 18 | 0.86 | 2026-03-30 |

## Claim-granularitet per kategori
- `historie`: årstall, institusjonsetableringer, byrom og større utviklingsskift.
- `ildsjeler`: identitet, rolle, tilknytning til Grünerløkka og dokumenterte bidrag.
- `litteratur`: bibliografiske fakta og dokumentert relasjon til Grünerløkka.
- `idrett`: klubber, anlegg, organisasjonshistorie og større idrettslige milepæler.
- `mediebildet`: dokumenterbare framstillingsmønstre og gjentatte medienarrativer.
- `kultur`: institusjoner, miljøer, pionerer og konkrete kulturhistoriske hendelser.

## Verifikasjonsregel brukt
Et claim kan være `verified` hvis det har:
1. minst én `primary` kilde, eller
2. minst to kilder totalt.

Claims som ikke oppfyller dette, men som likevel har dokumentasjon, markeres `partially_verified`.

## Sprintnotat
- `film-009` er ikke lenger et bopelsclaim; det er omskrevet til et verifisert claim om `Budbringeren` som Oslo-/østkantfilm.
- `ildsjeler-005` er løftet til `verified` og beskriver nå eksplisitt blandingen av historiske pionerer og nålevende gründere i arkivet.
- `litteratur-001` til `litteratur-004` er løftet til `verified` med konkrete utgivelses- og katalogpåstander i stedet for brede kanon- eller periodebeskrivelser.
- `idrett-003`, `idrett-005`, `idrett-006` og `historie-002` er løftet til `verified` ved å erstatte brede fortolkningsclaims med snevrere, bedre dokumenterbare formuleringer.
- `film-010`, `film-011`, `film-013`, `master-009` og `master-010` er løftet til `verified` ved å erstatte løse synteser og uforankrede stedspåstander med dokumenterte produsent-, filmografi-, kino- og byutviklingsclaims.
- `mediebildet` og `ildsjeler` er deretter utvidet med nye claim-poster i stedet for bare remediation, slik at de svakeste datasettene fikk høyere dekning uten at noen claim-status ble nedgradert.
- `mediebildet` og `ildsjeler` er videre utvidet med flere person- og medieclaims, slik at begge datasett nå er over `0.80` i coverage uten å gjenåpne køen.
- `litteratur` er utvidet med tre nye bibliografiske claims om `Oslo byleksikon`, `Grünerløkka skole : 1895-1970` og `Grünerløkka : en vandring gjennom 1000 år`, slik at seksjonen nå står med `9` verifiserte claims og `0.87` i coverage.
- `historie` er utvidet med tre nye claims om `Ny York`, `Grünerløkka Leieboerforening` og `Birkelunden kulturmiljø`, slik at datasettet nå står med `9` verifiserte claims og `0.86` i coverage.
- `idrett` er utvidet med tre nye claims om Dælenenga som fleridrettsanlegg, Sportsklubben Strongs merittlinje og Spartacus-miljøets rolle i AIF, slik at datasettet nå står med `9` verifiserte claims og `0.86` i coverage.
- `mediebildet` er utvidet med tre nye claims om NRKs faktaprogrammer, NRKs musikkjournalistikk og avisjournalistikkens bruk av Fru Hagen og Thorvald Meyers gate som symboler, slik at datasettet nå står med `12` verifiserte claims og `0.86` i coverage.
- `ildsjeler` er utvidet med tre nye claims om Nina Røneid, James Finucane og Vegard Holm, slik at datasettet nå står med `13` verifiserte claims og `0.87` i coverage.
- `kultur-design` er utvidet med fire nye claims om `Kollekted by`, `Skaperverket`, `Schous kulturbryggeri` og den permanente stengningen av `Popsenteret`, slik at datasettet nå står med `17` verifiserte claims og `0.85` i coverage.
- `kultur-arkitektur` er utvidet med fire nye claims om `Nedre Foss park`, `Parkteatret`, `Schous kulturbryggeri` og `Hauges Minde`, og samtidig oppdatert for dagens status etter at `Popsenteret` ble avviklet. Datasettet står nå med `19` verifiserte claims og `0.89` i coverage.
- `kultur-design` er videre utvidet med fire nye claims om `Dapper`, `Hunting Lodge`, `KHiO` og `Tom Wood`, slik at datasettet nå står med `21` verifiserte claims og `0.89` i coverage.
- `kultur-jazz` er utvidet med fire nye claims om `BLÅ`, `Afric Pepperbird`, `Belonging` og `Trygve Seims Different Rivers`, slik at datasettet nå står med `15` verifiserte claims og `0.91` i coverage.
- `kultur-hiphop` er utvidet med fem nye claims om `Soul Sessions Oslo`, `Floorknights`, `Quick Style`, `National Rap Show` og `Pay2`, samtidig som et eldre X-Ray-claim er strammet inn til dokumenterte crew og artister. Datasettet står nå med `18` verifiserte claims og `0.92` i coverage.
- `kultur-teater` er utvidet med seks nye claims om `Tigerstadsteatret`, `Tigerbussen`, `Romeo+Julie`, `Crap Comedy Festival`, `Vega Scenes` ungdomssatsing og flyttingen av `Oslo Nye Dukketeater` fra Trikkestallen til Centralteatret. Datasettet står nå med `16` verifiserte claims og `0.93` i coverage.
- `kultur-billedkunst` er utvidet med seks nye claims om Atelier Nords 1998/2011-milepæler, `Purenkel`, `Galleri Seilet`, `Street Art Oslo`, `Oslo Street Art Festival` og `Eventyrbrua`, slik at datasettet nå står med `16` verifiserte claims og `0.92` i coverage.
- `kultur-design` er videre utvidet med fire nye claims om `Good Vibes Vintage`, `Bleed`, `Bielke&Yang` og vintageprofilene til `Robot` og `Good Vibes`, samtidig som Robot- og Good Vibes-data ble korrigert mot offisielle butikkilder. Datasettet står nå med `25` verifiserte claims og `0.93` i coverage.
