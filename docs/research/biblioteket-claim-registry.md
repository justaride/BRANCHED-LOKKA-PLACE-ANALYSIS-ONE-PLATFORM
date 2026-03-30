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
- Totalt claims i rapporten: `124`

## Fordeling per datasett
| Datasett | Claims | Verified | Partially verified | Unverified | Sources | Coverage | Sist verifisert |
|---|---:|---:|---:|---:|---:|---:|---|
| `historie` | 6 | 6 | 0 | 0 | 11 | 0.81 | 2026-03-30 |
| `ildsjeler` | 5 | 5 | 0 | 0 | 8 | 0.63 | 2026-03-30 |
| `litteratur` | 6 | 6 | 0 | 0 | 15 | 0.82 | 2026-03-30 |
| `kultur-master` | 10 | 8 | 2 | 0 | 8 | 0.88 | 2026-03-02 |
| `kultur-jazz` | 11 | 11 | 0 | 0 | 25 | 0.88 | 2026-03-02 |
| `kultur-hiphop` | 13 | 13 | 0 | 0 | 23 | 0.88 | 2026-03-02 |
| `kultur-film` | 14 | 11 | 3 | 0 | 25 | 0.88 | 2026-03-30 |
| `kultur-teater` | 10 | 10 | 0 | 0 | 27 | 0.88 | 2026-03-02 |
| `kultur-billedkunst` | 10 | 10 | 0 | 0 | 31 | 0.88 | 2026-03-02 |
| `kultur-arkitektur` | 15 | 15 | 0 | 0 | 20 | 0.85 | 2026-03-02 |
| `kultur-design` | 13 | 13 | 0 | 0 | 30 | 0.80 | 2026-03-02 |
| `idrett` | 6 | 6 | 0 | 0 | 12 | 0.82 | 2026-03-30 |
| `mediebildet` | 5 | 5 | 0 | 0 | 7 | 0.63 | 2026-03-30 |

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
