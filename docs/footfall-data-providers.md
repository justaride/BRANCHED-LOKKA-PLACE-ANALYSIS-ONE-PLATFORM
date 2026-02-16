# Footfall Data Providers - Integration Guide

> Research completed January 2026 for Markveien 35 1-minute analysis enhancement
> Updated January 29, 2026 with provider verification and concrete action plan

## Current Data Sources

| Provider      | Data Type                                | Status    | Coverage               |
| ------------- | ---------------------------------------- | --------- | ---------------------- |
| **Plaace.ai** | Card transactions, footfall, competition | ✅ Active | All properties         |
| **Telia**     | Mobile network footfall (via Plaace)     | ✅ Active | ~100m accuracy         |
| **BankAxept** | Transaction data (via Plaace)            | ✅ Active | 49% of Norwegian cards |
| **SSB**       | Demographics                             | ✅ Active | Census data            |

## Data Gaps (Markveien 35)

| Data Type              | Current Status      | Priority |
| ---------------------- | ------------------- | -------- |
| Visitor origins        | ⚠️ Estimated        | High     |
| International visitors | ⚠️ Estimated        | Medium   |
| Dwell time             | ❌ Missing          | Medium   |
| Journey flows          | ❌ Missing          | Low      |
| Real-time updates      | ❌ Quarterly manual | Medium   |

---

## Provider Evaluation Summary

| Leverandør                         | Norge-dekning              | Vår data allerede? | Status                                         |
| ---------------------------------- | -------------------------- | ------------------ | ---------------------------------------------- |
| **Plaace** (nåværende)             | ✅ Ja                      | ✅ Bruker i dag    | **Rute 1: Oppgrader abonnement**               |
| **Telia Crowd Insights** (direkte) | ✅ 40% mobilmarked i Norge | ✅ Via Plaace      | **Rute 2: Direkte avtale for mer data**        |
| **CountMatters/IMAS**              | ✅ HQ i Ski, Norge         | ❌ Nei             | **Rute 3: Sensorbasert (krever installasjon)** |
| **Telenor**                        | ✅ Størst i Norge          | ❌ Nei             | ❌ Ingen relevant footfall-produkt             |
| **PlaceSense**                     | ❌ Kun DACH+NL+IT          | ❌ Nei             | ❌ Ikke Norge-dekning                          |
| **Huq Industries**                 | ⚠️ Usikkert                | ❌ Nei             | ⚠️ Mulig backup                                |

---

## Providers NOT Recommended

### Telenor — Ingen footfall-produkt

Telenor har **IKKE** et footfall/mobilitetsdata-produkt for kommersielt salg:

- **IoT Analytics & Insights** er for IoT-enhetsflåter, ikke befolkningsmobilitet
- Har brukt mobilitetsdata til forskning ("Big Data for Social Good" — COVID, dengue)
- **Ingen kommersiell API** tilsvarende Telia Crowd Insights
- Telenor Bedrift tilbyr mobilinfrastruktur i bygg, ikke footfall-analyse

**Telia er den eneste nordiske teleoperatøren med et ferdig footfall-produkt for Norge.**

### PlaceSense — Ikke Norge-dekning

- Dekker kun DACH (Tyskland, Østerrike, Sveits), Nederland og Italia
- **Ikke tilgjengelig i Norge** — kan ikke brukes for Grünerløkka

### Unacast — Primært US-fokusert

- Grunnlagt i Norge, men nå primært US-markedet
- Mest detaljert data kun for USA

---

## Rute 1: Plaace (nåværende leverandør) — RASKEST

### Hva de har

- Telia-data (besøkstall, opprinnelse, bevegelsesmønster)
- BankAxept/Vipps-data (korttransaksjoner, daglig oppdatert)
- Konkurranse- og demografidata
- AI-drevet "Fit Score" og "Similar Areas" (kun Norge)
- "Visitors' Origin" — akkurat det vi mangler

### Hva vi bør be om

1. **Besøkendes opphav** ("Visitors' Origin") for Markveien 35 1-min radius
2. **Internasjonale besøkende** (via Telia-data)
3. **API/eksport** av data i JSON-format for plattformintegrasjon
4. **Automatiske oppdateringer** (kvartalsvis → månedlig/ukentlig)

### Kontaktinfo

```
Kontakt: contact@plaace.co
Telefon: +47 938 97 737 / +47 976 12 713
Adresse: Tordenskiolds gate 2, 0160 Oslo
Org.nr: 924 898 127
```

### Typisk avtaleform

- Årsabonnement (SaaS)
- Priset per bruker eller per analyse-modul
- Ingen offentlig prisliste — tilpasset etter behov

---

## Rute 2: Telia Crowd Insights (direkte) — MER DATA

### Hva de har utover Plaace

| Data                               | Via Plaace   | Direkte fra Telia        |
| ---------------------------------- | ------------ | ------------------------ |
| Besøkstall                         | ✅           | ✅ + finere granularitet |
| Besøksendes opphav                 | ⚠️ Begrenset | ✅ Full dekning          |
| Oppholdstid                        | ❌           | ✅                       |
| Reiseruter (origin→destination)    | ❌           | ✅                       |
| Før/etter-event analyse            | ❌           | ✅                       |
| Dag-/overnattingsbesøkende         | ❌           | ✅                       |
| "White spots" (steder folk unngår) | ❌           | ✅                       |

### Dataomfang

- **16 millioner** kunder i Norden
- **40%** av mobilmarkedet i Norge
- **600 millioner** pings per dag i Norge
- **400+** signalhendelser per kunde daglig
- GDPR + ePrivacy-kompatibel
- Minimum 5 personer per datapunkt (anonymisering)

### Leveringsformater

1. **CSV/Shapefile** — datasett for egen bearbeiding
2. **Engangs Tableau-dashboard** — interaktivt
3. **Kontinuerlig Tableau Online** — løpende abonnement

### Kontaktinfo

```
E-post: di-support@teliacompany.com
Telefon: +46 771-22 77 55 (svensk nummer, betjener Norden)
Nettside: telia.no/bedrift/crowd-insights/
```

### Typisk avtaleform

- **Abonnement** (subscription-based) — løpende tilgang
- **Engangsanalyse** — enkeltbestillinger mulig
- Konfigurerbar: lokasjon, tidsperiode, datapunkter, leveringsformat

---

## Rute 3: CountMatters/IMAS (sensorbasert) — EKSAKT TELLING

### Hva de tilbyr

- Fysiske persontellesensorer (3D-stereo, WiFi, radar)
- Xperio-plattform med **dokumentert API**
- Sanntids besøkstelling med timesoppløsning
- Demografi (kjønn via sensor)
- Konverteringsrate (besøk → kjøp)

### Norske referansekunder

- **Ragde Eiendom** — 12 kjøpesentre
- **Bjørklund** — 90 butikker
- **Søstrene Grene** — besøksanalyse

### Kontaktinfo

```
E-post: info@countmatters.com
Telefon: +47 64 86 20 40
Skandinavia-salg: +45 31 54 21 14
Adresse: Åsveien 3, N-1424 Ski, Norge
Portal: portal.imas.net
```

### Typisk avtaleform

- **Fast månedlig avgift** — alt inkludert (hardware, software, support)
- **Ingen bindingstid** og ingen oppstartsavgift
- API-tilgang inkludert i Xperio-plattformen

### Begrensning

Krever at Front Real Estate godkjenner sensorinstallasjon. Måler kun inngangstrafikk, ikke gatetrafikk.

---

## Backup: Huq Industries

- **Website:** https://huq.io/
- **Dekning:** 239 land, sterk UK/Europa-fokus — **usikkert for Norge**
- **Pris:** £1,000/mnd eller £375/lokasjon for rapporter
- Kun aktuell hvis Plaace og Telia ikke dekker behovet

---

## Comparison Matrix

| Feature          | Plaace (Current)   | Telia (Direkte)    | CountMatters     | Huq                |
| ---------------- | ------------------ | ------------------ | ---------------- | ------------------ |
| Daily visits     | ✅                 | ✅                 | ✅ (sensor)      | ✅                 |
| Visitor origins  | ⚠️ Begrenset       | ✅ Full dekning    | ❌               | ✅                 |
| Dwell time       | ❌                 | ✅                 | ❌               | ✅                 |
| Journey flows    | ❌                 | ✅                 | ❌               | ✅                 |
| International    | ⚠️ Limited         | ✅                 | ❌               | ✅                 |
| Update frequency | Quarterly          | Daily/subscription | Real-time        | Daily API          |
| Accuracy         | ~100m (cell tower) | ~100m (cell tower) | 99.9% (sensor)   | H3 hexbin          |
| Norway coverage  | ✅ Strong          | ✅ 40% mobil       | ✅ Ski, Norge    | ⚠️ Usikkert        |
| Installation     | None               | None               | Physical sensors | None               |
| Pricing          | Included           | Enterprise         | Monthly fee      | £1k/mo or £375/rpt |

---

## Recommended Action Plan

### Steg 1: Kontakt Plaace (denne uken)

- Vi er allerede kunde — raskest vei til data vi mangler
- Spør om: Visitors' Origin, internasjonale besøkende, API/JSON-eksport
- Forventet svar: 1-3 virkedager

### Steg 2: Kontakt Telia direkte (parallelt)

- Mer granulære data enn via Plaace (oppholdstid, reiseruter)
- Spør om: Hva kan vi få utover det Plaace tilbyr?
- Forventet svar: Møtebooking → 1-2 uker til tilbud

### Steg 3: Evaluer CountMatters (om behov)

- Eksakt telling (99.9% nøyaktighet) vs estimater
- Kun relevant hvis Front Real Estate vil ha sensordata

### IKKE gjøre

- ❌ Kontakt PlaceSense (ikke Norge-dekning)
- ❌ Kontakt Telenor (ingen relevant footfall-produkt)
- ❌ Kjøp Huq-rapport uten å verifisere norsk dekning først

---

## MCP Integration Notes

### No Existing Footfall MCP

There is no existing MCP server for physical footfall data. Options:

**Option A: Build Custom MCP**

```
~/.claude/mcp-servers/footfall-hub/
├── index.ts              # MCP server
├── providers/
│   ├── telia.ts          # Telia Crowd Insights API
│   ├── plaace-export.ts  # Plaace exports
│   └── countmatters.ts   # CountMatters Xperio API
└── tools/
    ├── get-footfall.ts   # Unified query
    └── compare.ts        # Cross-validate sources
```

**Option B: Use Google Drive MCP**

- Load Plaace exports from Google Drive
- Process locally, no external API needed

**Option C: Local JSON (Current)**

- Manual quarterly updates
- No real-time capability
- Lowest cost

---

## References

- [Telia Crowd Insights Norge](https://www.telia.no/bedrift/crowd-insights/)
- [Telia Arrangementer & Turisme](https://www.telia.no/bedrift/crowd-insights/arrangementer-og-turisme/)
- [Plaace - Telia-integrasjon](https://plaace.co/en/crowd-insights-from-telia-take-plaaces-expansion-analysis-to-a-whole-new-level/)
- [Plaace Features](https://plaace.co/en/product/features/)
- [Plaace Hjemmeside](https://plaace.co/en/)
- [CountMatters/IMAS](https://www.countmatters.com/about)
- [CountMatters - Ragde Eiendom case](https://www.countmatters.com/en/news/case-retail-footfall-analytics-property-owner-traffic-data-into-action)
- [Telenor IoT Analytics](https://iot.telenor.com/offering/analytics-insights/)
- [Datarade Footfall Providers](https://datarade.ai/data-categories/footfall-traffic-data/providers)

---

_Last updated: January 29, 2026_
