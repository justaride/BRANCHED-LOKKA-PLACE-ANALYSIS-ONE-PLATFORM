# Biblioteket Kvalitetssikring - Sesjonsprompt

> Kopier og lim inn denne prompten for å starte en ny sesjon med kvalitetssikring av Biblioteket-seksjonen.

---

## Prompt

```
Jeg jobber med kvalitetssikring av Biblioteket-seksjonen i lokka-gardeierforening-platform.

Prosjektsti: /Users/gabrielboen/Downloads/lokka-gardeierforening-platform

## Kontekst

Biblioteket er en digital samling som dokumenterer Grünerløkkas historie og identitet. Det består av 5 sider:

1. **Hovedside** (`/main-board/biblioteket`) - Oversikt med Master Timeline
2. **Ildsjeler** (`/main-board/biblioteket/ildsjeler`) - 14 lokale helter
3. **Historie** (`/main-board/biblioteket/historie`) - 170 år byhistorie
4. **Kultur** (`/main-board/biblioteket/kultur`) - Kunst, musikk, scener
5. **Litteratur** (`/main-board/biblioteket/litteratur`) - 35+ verk

## Oppgave

Gjennomfør kvalitetssikring av hver side med følgende prosess:

### For hver side:

1. **Research-ekstraksjon**
   - Les page.tsx og tilhørende JSON-datafiler
   - Verifiser at all informasjon er komplett
   - Identifiser eventuelle mangler

2. **Datavalidering**
   - Sjekk JSON-struktur og konsistens
   - Verifiser at datoer, navn og relasjoner stemmer

3. **Språkkvalitet**
   - Gjennomgå norsk tekst for grammatikk og stavefeil
   - Vurder narrativ kvalitet og flyt
   - Sjekk konsistens i terminologi

4. **Faktasjekk**
   - Utfør web-søk for å verifisere nøkkelinformasjon
   - Spesielt viktig: fødselsår, dødsår, historiske hendelser
   - Dokumenter kilder og flagg usikker informasjon

## Prioritert rekkefølge

1. Ildsjeler (14 navngitte personer - krever faktasjekk)
2. Historie (historiske datoer og hendelser)
3. Kultur (artister, scener, festivaler)
4. Litteratur (verk og forfattere)
5. Hovedside (overordnet narrativ)

## Datafiler

Hoveddata ligger i:
- `src/data/biblioteket/ildsjeler/ildsjeler.json`
- `src/data/biblioteket/historie/grunerlokka_timeline.json`
- `src/data/biblioteket/kultur/grunerlokka_master_alt.json`
- `src/data/biblioteket/litteratur/works.json`

## Rapporteringsformat

For hver side, rapporter funn som:
- ✅ Verifisert - informasjon bekreftet
- ⚠️ Trenger oppmerksomhet - usikker eller ufullstendig
- ❌ Feil funnet - må korrigeres

## Start

Les CLAUDE.md for full prosjektkontekst, deretter start med Ildsjeler-siden.
```

---

## Ildsjeler som skal faktasjekkes

| Person | Fødselsår | Dødsår | Påstand å verifisere |
|--------|-----------|--------|----------------------|
| Anna Rogstad | 1854 | 1938 | Første kvinne på Stortinget, pikeskole Grünerløkka |
| Rolf Hofmo | 1898 | 1966 | Arbeideridrett, Spartacus 1920, Dælenenga |
| Randi Spenningsby | - | - | Leder aksjonsutvalg Rodeløkka 1970-tallet |
| Magnhild Johansen | - | - | Leieboerleder Rodeløkka |
| Jan Vardøen | 1962 | - | Gründer Bar Boca, Parkteatret, Villa Paradiso |
| Tim Wendelboe | 1979 | - | Barista, åpnet i Grüners gate 2007 |
| Marianne Westbye | 1966 | - | Styreleder Grünerløkka historielag |
| Torgny Hasås | 1951 | - | Årets ildsjel 2020, Dælenenga flerbrukshall |
| Vegard Holm | - | - | Grüner Hockey, 70+ år på Løkka |
| Sollin Sæle | - | - | Ung gründer, Lokal stjerne-kampanjer |
| Jon Christensen | 1943 | 2020 | Jazztrommeslager, ECM Records |
| Claire de Wangen | - | - | Teaterregissør, stedsspesifikt teater |
| Guro Lidahl | - | - | Galleri 69 grader Nord, Markveien |
| Martin Horntveth | 1974 | - | Jaga Jazzist grunnlegger 1994 |

---

## Sjekkpunkter ved fullføring

- [ ] Alle 14 ildsjeler faktasjekket
- [ ] Historie-tidslinje verifisert
- [ ] Kulturdata gjennomgått
- [ ] Litteraturliste sjekket
- [ ] Språkfeil korrigert
- [ ] CLAUDE.md oppdatert med status
- [ ] Endringer committed

---

*Opprettet: 10. desember 2025*
