# Biblioteket Gap Report

Oppdatert: 30. mars 2026

## Hovedfunn
- Biblioteket har nå et felles verifikasjonslag på tvers av kategorier, loadere og UI.
- Fire research-sprinter har lukket hele remediation-køen, og `biblioteket-research-queue.json` står nå på `0` åpne items.
- Femten coverage-sprinter har utvidet claim-settet til `185` claims, og alle er fortsatt markert `verified`.
- De tidligere svakeste datasettene `mediebildet` og `ildsjeler` er nå løftet over `0.80` i coverage.
- De gjenværende hullene er ikke lenger i førstelinje-datasettene, men i hvor bredt hvert domene er dekket over tid.
- Det er ingen claims markert `disputed`, `partially_verified` eller `unverified`.

## Prioriterte gap
1. De mindre datasettene `historie`, `ildsjeler`, `litteratur`, `idrett` og `mediebildet` er nå alle løftet til `0.86` eller høyere og har ingen åpne remediation-hull.
2. Det svakeste kulturdatasettet er nå `kultur-arkitektur`, som står på `0.89`.
3. `kultur`-delene har høy kvalitet, men flere delområder kan fortsatt få bedre kildebredde og mer eksplisitt oppdeling av samlepåstander.
4. Fase to handler nå primært om bredde, representativitet og finere claim-granularitet.

## Anbefalt neste research-bølge
1. Vurder en ny runde i `kultur-arkitektur` for a dele opp brede samlepastander i mer eksplisitte underclaims.
2. Bruk `historie`, `ildsjeler`, `litteratur`, `idrett` og `mediebildet` videre i vedlikeholdsmodus og legg bare til nye claims naar kildetilfanget er tydelig.
3. Prioriter videre utvidelser som oeker representasjonen av ulike epoker, miljoer og institusjoner, ikke bare flere varianter av de samme fortellingene.
4. Fortsett a holde remediation-koen pa `0` mens claim-massen oeker.

## Akseptkriterier for neste steg
1. Research-køen skal holde seg på `0` åpne remediation-items samtidig som antall claims i biblioteket øker.
2. Nye claims skal fortsatt oppfylle regelen om minst én primærkilde eller to uavhengige kilder.
3. Coverage score i de svakeste datasettene skal holdes over `0.85`.
4. Nye utvidelser skal dokumentere bredere representasjon, ikke bare mer av det samme materialet.
