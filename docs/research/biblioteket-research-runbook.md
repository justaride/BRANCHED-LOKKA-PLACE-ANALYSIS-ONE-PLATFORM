# Biblioteket Research Runbook

Oppdatert: 30. mars 2026

## Formaal
Bygge et vedvarende research-loep som oeker antall kilder, flytter claims fra `partially_verified` eller `unverified` til `verified`, og holder biblioteket oppdatert over tid.

## Dagens utgangspunkt
- 13 datasett
- 347 kilder
- 185 claims
- 185 `verified`
- 0 `partially_verified`
- 0 `unverified`
- Lavest coverage score: `historie`, `idrett` og `mediebildet` (`0.86`)

## Prioriteringsrekkefolge
1. `kultur`
   Neste breddeutvidelse boer fortsatt tas her. `kultur-design`, `kultur-billedkunst`, `kultur-jazz`, `kultur-hiphop` og `kultur-teater` er styrket, sa neste steg boer sannsynligvis flyttes til `kultur-arkitektur`.
2. `historie`, `ildsjeler`, `litteratur`, `idrett` og `mediebildet`
   Nylig styrket til `0.86`-`0.87` i coverage. Kan utvides videre senere, men er ikke foerste kandidater akkurat naa.
3. Vedlikehold
   Hold de mindre datasettene stabile og bruk bare nye claims der kildetilfanget er tydelig og claimet faktisk oeker bredden.

## Ukentlig arbeidsflyt
1. Kjor `npm run research:biblioteket:queue`.
2. Hvis koen ikke er tom: velg de 5 overste claimene i `biblioteket-research-queue.json`.
3. Hvis koen er tom: velg ett lav-coverage-datasett og legg til 1-3 nye claims med tilhorende kilder.
4. Hent minst to nye kilder per claim, eller minst en primaerkilde.
5. Oppdater claim, sources, notes og `lastVerifiedAt` i riktig datafil.
6. Kjor:
   - `npm run research:biblioteket:validate`
   - `npm run research:biblioteket:report`
   - `npm run research:biblioteket:queue`
7. Logg endringen i `docs/research/biblioteket-verification-log.md` hvis claim-status flyttes eller claim-settet utvides.

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
1. Utvid ett av `kultur`-datasettene med minst to nye eksplisitte claims eller del opp en bred samlepastand i mer presise underclaims, helst i `kultur-arkitektur`.
2. Hold remediation-koen paa `0` ved a bruke samme validerings- og rapportflyt etter hver utvidelse.
3. Bruk `historie`, `ildsjeler`, `litteratur`, `idrett` og `mediebildet` videre for representativitetsutvidelse, ikke som akutt coverage-redning.
4. Oek total claim-masse uten a introdusere nye svake claimformuleringer.
