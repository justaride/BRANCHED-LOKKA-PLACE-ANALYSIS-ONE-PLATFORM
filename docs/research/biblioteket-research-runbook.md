# Biblioteket Research Runbook

Oppdatert: 30. mars 2026

## Formaal
Bygge et vedvarende research-loep som oeker antall kilder, flytter claims fra `partially_verified` eller `unverified` til `verified`, og holder biblioteket oppdatert over tid.

## Dagens utgangspunkt
- 13 datasett
- 242 kilder
- 124 claims
- 119 `verified`
- 5 `partially_verified`
- 0 `unverified`
- Lavest coverage score: `ildsjeler` og `mediebildet` (`0.63`)

## Prioriteringsrekkefolge
1. `kultur-film`
   De siste delvis verifiserte claimene er stedlige og biografiske og maa enten styrkes med arkivspor eller omskrives.
2. `kultur-master`
   De to gjenvaerende claimene er brede synteser som krever kvantitative og kommunale kilder.
3. `mediebildet` og `ildsjeler`
   Coverage score er fortsatt moderat selv om de mest kritiske claimene er lukket.
4. `litteratur`, `historie` og `idrett`
   Vedlikeholdsmodus. Dagens claim-sett er fullt verifisert, men nye verk og delclaims kan legges til senere.

## Ukentlig arbeidsflyt
1. Kjor `npm run research:biblioteket:queue`.
2. Velg de 5 overste claimene i `biblioteket-research-queue.json`.
3. Hent minst to nye kilder per claim, eller minst en primaerkilde.
4. Oppdater claim, sources, notes og `lastVerifiedAt` i riktig datafil.
5. Kjor:
   - `npm run research:biblioteket:validate`
   - `npm run research:biblioteket:report`
   - `npm run research:biblioteket:queue`
6. Logg endringen i `docs/research/biblioteket-verification-log.md` hvis claim-status flyttes.

## Kildeprioritet per kategori
- `historie`
  Oslo Byarkiv, Nasjonalbiblioteket, Lokalhistoriewiki, Oslo Byleksikon.
- `ildsjeler`
  Offisielle biografier, organisasjonsarkiv, Arbeiderbevegelsens arkiv, institusjonssider.
- `litteratur`
  Nasjonalbiblioteket katalog, Oria, LIBRIS, WorldCat, forlagskataloger.
- `idrett`
  Norges idrettsforbund, saerforbund, klubbhistorikker, jubileumsboker, Oslo Byleksikon.
- `mediebildet`
  Mediearkiv, avisdatabaser, akademiske databaser, NRK/TV-arkiv.
- `kultur`
  Nasjonalbiblioteket, NRK-arkiv, Oslo Byarkiv, institusjons- og programarkiv.

## Done-definition per claim
Et claim er ferdig behandlet i research-loepet naar:
1. claimet har minst en primaerkilde eller to uavhengige kilder,
2. claimets `status` er oppdatert,
3. `notes` forklarer eventuelle restforbehold,
4. `lastVerifiedAt` er satt,
5. validering og rapportering fortsatt er groene.

## Neste sprint
1. Avklar om `film-010` og `film-011` skal styrkes med institusjonskilder eller omskrives til mer presise claims.
2. Lukk `film-013` med bedre kinohistorisk kildegrunnlag eller snevrere formulering.
3. Ta minst ett av `master-009` eller `master-010` med kommunale eller kvantitative kilder.
4. Oek coverage score i `ildsjeler` og `mediebildet` videre uten a introdusere nye svake claimformuleringer.
