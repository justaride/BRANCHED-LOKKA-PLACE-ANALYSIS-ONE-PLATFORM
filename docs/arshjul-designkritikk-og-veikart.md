# Årshjul — designkritikk og veikart

> Analyse av `/main-board/arshjul` med sikte på høyere design og funksjonalitet, samt en studie av open source-løsninger som kan berike løsningen.
> Utført: 15. juni 2026 · Grunnlag: full gjennomlesing av kode, datamodell og datasett + 18 eksterne kilder.

---

## Sammendrag

Årshjulet er **velbygget og on-brand**: et håndlaget SVG-hjul med månedssegmenter, kategori-farger, status-via-opasitet, agenda-alternativ, detaljpanel, redigerings-modal og DB-backing med trygt JSON-fallback. Tilgjengelighet er gjennomtenkt på flere punkter (tastaturnavigasjon, fokusring, `aria`-roller, `prefers-reduced-motion`).

Den viktigste innsikten er at **designet er bygget for tetthet, men dataene er glisne**. Det finnes bare **15 hendelser i 2026** spredt over 360°, mens kollisjonshåndteringen (konsentriske ringer) aldri utløses (0 sammenfall). Samtidig ligger det en **kandidatliste på 20 forslag** rett under hjulet — listen er nesten større enn selve kalenderen. Sirkelformen kommuniserer «mye gjennom året», men leverer foreløpig et tynt bilde.

De tre høyest prioriterte grepene: (1) **fyll og rydd dataene** og fjern den døde «Se mer»-lenken (0 av 15 hendelser har lenke), (2) **gjør hjulet lesbart uten klikk** (etiketter, statusforklaring, større klikkmål), og (3) **beveg deg mot fler- rings-paradigmet** (én bane per kategori eller leietaker) som er bransjestandard for digitale årshjul (jf. Plandisc). På funksjonssiden er de største mulighetene **iCal-abonnement**, **gjentakende hendelser (RRULE)** og en **kandidat→hendelse-arbeidsflyt**.

Anbefalt strategi er **hybrid, ikke utskifting**: behold det egenutviklede hjulet som signatur, men lån modne primitiver (visx / d3-shape for buer og skalaer) og legg et standard kalenderlag (Schedule-X eller FullCalendar) ved siden av for agenda, gjentakelser og iCal.

---

## 1. Kartlegging — hva årshjulet er i dag

### 1.1 Arkitektur

| Lag | Fil(er) | Rolle |
|---|---|---|
| Side | `src/app/main-board/arshjul/page.tsx` | Server-komponent, `force-dynamic`, henter år fra store |
| Orkestrering | `components/arshjul/Arshjul.tsx` | View-bytte (hjul/agenda), år-velger, kategorifilter, valgt hendelse, redaktørmodus |
| Visualisering | `ArshjulWheel.tsx` | Håndlaget SVG, 560×560, prikker + buer plassert på dag-i-året |
| Liste | `ArshjulAgenda.tsx` | Hendelser gruppert per måned, «Neste»-merke |
| Detaljer | `ArshjulDetailPanel.tsx` | Sidepanel, `aria-live`, lenke/ansvarlig, rediger/slett |
| Redigering | `ArshjulEditor.tsx` | Modal CRUD-skjema (tittel, dato, kategori, status, …) |
| Kandidater | `ArshjulKandidatOversikt.tsx` | 20 forslag «til vurdering», separat fra kalenderen |
| Geometri | `lib/arshjul.ts` | `dayOfYear`, `daysInYear`, `hendelseTilPunkt`, `tildelRadiusOffset` |
| Datakilde | `lib/arshjul-store.ts` | Postgres når `DATABASE_URL` finnes, ellers statisk JSON |
| Skjema | `lib/arshjul-schema.ts` (zod) · API: `api/arshjul/[id]` | Validering + REST |
| Delt | `arshjulShared.ts` | Farger, labels, statusopasitet, datoformat |

Stack: Next 16.2 / React 19 / Tailwind 4 / framer-motion 12 / zod 4 / `pg`. Hjulet er **ren egenutviklet SVG/trigonometri** — ingen viz-bibliotek.

### 1.2 Datamodellen

`HjulHendelse`: `id, tittel, start, slutt?, kategori, beskrivelse?, lenke?, ansvarlig?, status, tenant?`. 8 kategorier (`arrangement, marked, kampanje, visit-lokka, kultur, sesong, apning, annet`), 4 statuser (`planlagt, bekreftet, gjennomfort, avlyst`). `tenant`-feltet finnes, men brukes **ikke** i noe filter.

### 1.3 Datasettets realitet (2026) — den viktigste konteksten

| Mål | Verdi | Konsekvens for design |
|---|---|---|
| Hendelser totalt | **15** | Hjulet ser glissent ut; tettheten sirkelen er bygget for, finnes ikke |
| Kategorifordeling | kampanje 4, marked 4, sesong 2, kultur 2, visit-lokka 1, arrangement 1, apning 1, annet 0 | Halvparten av kategoriene har 0–1 hendelse → 8-farges legende er overdimensjonert |
| Status | planlagt 8, bekreftet 3, gjennomført 4 | 4 hendelser er allerede fortid (per 15. juni) — bør kunne skjules |
| Med lenke | **0 av 15** | «Se mer →»-CTA i detaljpanelet rendres aldri — død funksjon |
| Med beskrivelse | 9 av 15 | Detaljpanelet er ofte tomt for innhold |
| Flerdagshendelser | 9 av 15 | Buer er hyppige — bra at de finnes |
| Sammenfall samme dag | **0** | `tildelRadiusOffset` (konsentriske ringer, steg 18px) er aldri testet i prod |
| Kandidater under hjulet | **20** (12 klar, 7 sjekk, 1 oppdater) | Mest kultur/marked — nettopp det hjulet underrepresenterer |

---

## 2. Designkritikk

Vurdert etter rammeverket: førsteinntrykk, brukervennlighet, visuelt hierarki, konsistens, tilgjengelighet. Stadium: **modent/produksjon** (plattformen er ~99 % ferdig og live), så kritikken sikter på polering og neste nivå — ikke utforskning.

### 2.1 Førsteinntrykk (2 sekunder)

Blikket trekkes til **årstallet i sentrum** (riktig) og deretter til de fargede prikkene. Men med 15 prikker spredt rundt en stor sirkel er det dominerende inntrykket **tomrom**. Den emosjonelle responsen er «rolig og fin», ikke «full oversikt over alt som skjer» — som er løftet i ingressen («Alt som skjer på Grünerløkka samlet i ett bilde»). Det er et gap mellom løfte og inntrykk som *data*, ikke *design*, lukker.

### 2.2 Brukervennlighet

| Funn | Alvorlighet | Anbefaling |
|---|---|---|
| Hver prikk må klikkes/hoveres for å identifiseres — ingen synlige etiketter | 🔴 Kritisk | Vis tittel-etiketter for nær-fremtidige hendelser, eller en tastaturtilgjengelig tooltip (ikke bare `<title>`) |
| «Se mer →»-lenke finnes i koden, men 0 hendelser har `lenke` | 🔴 Kritisk | Fyll inn lenker (Visit Løkka, analyser, arrangør) — ellers er CTA-en død |
| Ingen statusfilter; 4 av 15 hendelser er allerede gjennomført | 🟡 Moderat | Legg til status-toggles + «skjul gjennomført/avlyst» |
| Klikkmål på prikker er ~12 px (valgt 18 px) | 🟡 Moderat | Legg en usynlig trefflate (≥24 px) bak hver prikk; behold liten visuell prikk |
| Redaktørmodus kan slås på av alle innloggede; «Slett» bruker `window.confirm` | 🟡 Moderat | Skill redaktør-rolle fra leser; stylet bekreftelsesdialog |
| Kandidat→hendelse er helmanuell (les kort → åpne editor → skriv inn på nytt) | 🟡 Moderat | «Legg til i årshjul»-knapp på kandidatkortet som forhåndsutfyller editoren |
| Ingen søk/«hopp til i dag» i hjulet (agenda har «Neste»-merke) | 🟢 Mindre | Auto-velg neste hendelse ved innlasting også i hjulet |

### 2.3 Visuelt hierarki

- **Senterfokus** (årstall + «X av Y») er sterkt og riktig.
- **Status via opasitet** (bekreftet 1.0, gjennomført 0.75, planlagt 0.55, avlyst 0.3) er elegant *i teori*, men (a) det finnes **ingen forklaring** noe sted i hjulvisningen, og (b) en planlagt prikk på 0.55 opasitet leser som «halvt utvisket / mindre viktig» — mens planlagte hendelser ofte er de mest relevante framover. Opasitet bør forklares, og helst suppleres med form (f.eks. åpen ring for avlyst) så signalet ikke er fargestyrke alene.
- **Kategori via 8 farger**: amber (`marked #CA8A04`) og oransje (`visit-lokka #F4A259`) ligger nær hverandre og er lette å forveksle, særlig i små prikker.

### 2.4 Konsistens

Sterk: bruker brand-tokens (`natural-forest`, `natural-cream`, `lokka-accent`), `rounded-full`-piller og `rounded-2xl`-kort som resten av plattformen; deler farger/labels via `arshjulShared.ts` mellom hjul, agenda og panel. Mindre avvik: filter-chipsene i `Arshjul` og i `KandidatOversikt` har litt ulik stil (ring vs. border), og kandidatlistens egne statusfarger (amber/blå) introduserer en ny fargekode ved siden av kategorifargene.

### 2.5 Tilgjengelighet (WCAG 2.1 AA)

| Område | Status | Detalj |
|---|---|---|
| Tastatur | ✅ Bra | Piltaster blar kronologisk, `Escape` lukker, `focus-visible`-ring på SVG |
| Skjermleser | ✅ Bra | `role="group"/"button"`, beskrivende `aria-label`, `aria-live` på panel, `<title>` per hendelse |
| Bevegelse | ✅ Bra | `useReducedMotion` respekteres overalt |
| Klikkmål (2.5.8) | ❌ Feiler | Prikker ~12 px diameter < kravet 24×24 px |
| Tekstkontrast (1.4.3) | ⚠️ Delvis | `text-gray-400` (#9ca3af) på hvit ≈ 2.5:1 — under 4.5:1; brukt i agenda-meta, panel-tips, «X av Y» |
| Ikke-tekst-kontrast (1.4.11) | ⚠️ Delvis | `avlyst` på 0.3 opasitet gir svært lav kontrast |
| Bruk av farge (1.4.1) | ⚠️ Delvis | Kategori = kun farge i hjulet; status = kun opasitet. Avhjelpes av `<title>` + panel, men ikke i selve grafikken |

### 2.6 Det som funker bra (ikke rør)

Det egenutviklede hjulet er en **visuell signatur** og en reell differensiator — ikke bytt det ut. Geometrien er ryddig (`Jan = topp, med klokka`), buer for flerdagshendelser er et fint grep, «I dag»-markøren er presis, agenda-fallback på mobil er riktig vurdering, og hele komponenten er null-trygg med JSON-fallback når DB mangler. Animasjonene er diskré og respekterer reduced-motion. Dette er solid håndverk.

---

## 3. Funksjonalitetsgap (oppsummert)

Død «Se mer»-CTA · ingen iCal/kalender-abonnement · ingen ekte gjentakelse (markeder/sesong er fritekst-«rytme» kun på kandidater) · kun ett år (2026; år-velger skjult) · `tenant` lagres men kan ikke filtreres · ingen eksport (PDF/PNG til styremøter) · ingen bilder per hendelse · åpen redigeringstilgang · utestet tetthetshåndtering · ingen kandidat→hendelse-flyt · ingen `schema.org/Event`-strukturert data.

---

## 4. Studie av open source-løsninger

Mål: ikke å erstatte hjulet, men å *berike* det. Inndelt i (A) domenereferanse, (B) sirkulære primitiver, (C) kalender-/scheduler-lag, (D) standarder & interop, (E) tilgjengelighet.

### 4.A Domenereferanse — hva et modent digitalt årshjul er

**Plandisc** (nå Visma) er de facto-standarden for digitale årshjul i Norden og brukes av norske fylkeskommuner (Viken, Nordland). Det definerer paradigmet løsningen vår bør måles mot:

- **Flere konsentriske ringer/baner** (én ring per avdeling/kategori/spor) — «unlimited calendar rings».
- Aktiviteter som **fargede buer** som spenner over sin periode (ikke bare punkter).
- **Sub-hjul** («Activity Disc») for detaljnivå.
- **Offentlige, innebygbare visninger** + **eksport** (PDF/PowerPoint/PNG).
- **Microsoft 365 / Teams / Outlook-synk** og **gjentakende aktiviteter**.

Vårt hjul er i praksis en **én-rings, kun-punkter, ett-års**-variant av dette. Gapet — flere ringer, buer, gjentakelse, eksport, abonnement — er nøyaktig veikartet under. (Plandisc er betalt SaaS, €12–39/bruker/mnd; egenutvikling er rett valg, men paradigmet er verdt å kopiere.) Relaterte domeneverktøy: PlanIt (årshjul-app i Teams) og HMS-/Excel-/PowerPoint-årshjulmaler — alle understreker at brukere forventer *ringer og spor*, ikke en punktsky.

### 4.B Sirkulære primitiver og viz-byggeklosser

| Bibliotek | Lisens | Relevans | Vurdering |
|---|---|---|---|
| **visx** (Airbnb) | MIT | `@visx/shape` (Arc), `@visx/scale` (scaleTime/scaleBand for vinkler), `@visx/group`, `@visx/text`, `@visx/tooltip` | **Sterkest match.** Erstatter håndlaget trig med robuste buer, akse-etiketter og tastatur-/touch-tooltip. Lavnivå — beholder full kontroll over uttrykket |
| **d3-shape / d3-scale / d3-time** | ISC/BSD | `arc()`, `pie()`, `scaleTime` | `d3` er allerede en avhengighet (via Recharts-økosystemet). `d3-shape.arc` kan tegne ring-segmenter/buer direkte |
| **yearround** (stiletto) | open source | Canvas-basert sirkulær kalender | Kun referanse/inspirasjon — gammel, canvas (ikke SVG), ikke React |
| **js-year-calendar** | MIT | Fullt år som rutenett | Referanse for en alternativ «heatmap/rutenett»-visning, ikke sirkulær |
| **d3-timeline / d3-milestones / calendar-heatmap** | MIT | Lineær tidslinje / årstetthet-heatmap | Gode mønstre for en *supplerende* visning (tidslinje eller heatmap) ved siden av hjulet |

### 4.C Kalender-/scheduler-lag (agenda, måned, gjentakelse, drag-drop)

| Bibliotek | Lisens | Styrker | Vurdering for oss |
|---|---|---|---|
| **Schedule-X** | MIT | Moderne, lett, **tilgjengelighetsfokus**, gjentakende hendelser, dark mode, måned/uke/liste | **Beste open source-match** for et oppgradert agenda-/månedslag uten tung styling |
| **FullCalendar** (core) | MIT | Måned/uke/liste, **innebygd iCal- og Google Calendar-integrasjon**, RRULE-plugin | Kraftigst på interop; mer opinionert CSS å temaes inn mot brand |
| **react-big-calendar** | MIT | Google-Calendar-aktig, drag-drop, resize | Godt alternativ hvis dere vil ha klassisk måneds-/ukerutenett |
| KendoReact / Syncfusion / DHTMLX / Bryntum | Kommersiell | Outlook-nivå, recurrence-editor, eksport | Ikke anbefalt — betalt, og dere har allerede egen UI-identitet |

### 4.D Standarder & interop

| Verktøy | Lisens | Bruk |
|---|---|---|
| **ical-generator** / **ics** (+ **ics-service**) | MIT | Generér `.ics`-feed server-side → «Abonner i kalender» (webcal) og «Legg til i Google/Outlook» per hendelse. Stor UX-gevinst for gårdeiere |
| **rrule.js** | BSD | RFC 5545-gjentakelse. Gir ekte modell for ukentlige markeder / sesong i stedet for fritekst-«rytme». Spiller sammen med FullCalendar/Schedule-X |
| **schema.org/Event (JSON-LD)** | Standard | Strukturert data per hendelse (name/startDate/location/url) → rike resultater i søk, «Things to do», kart. God praksis selv bak innlogging |
| **add-to-calendar-button** | Apache-2.0 | Drop-in «Legg til i kalender»-knapp per hendelse |

### 4.E Tilgjengelighet & farger

- **Fargeblind-trygg, kategorisk palett**: dagens 8 farger har et forvekslingspar (amber/oransje) og hviler på farge alene. Referansepaletter (Okabe–Ito, IBM Design) og verktøy (Color Blind Safe Palette Generator, InclusiveColors, Colorsafe) gir en 8-trinns palett som tåler protanopi/deuteranopi/tritanopi.
- **WCAG 2.5.8** (klikkmål 24 px) og **1.4.11** (ikke-tekst-kontrast) er de konkrete målene for hjulets prikker og svake statuser.

---

## 5. Veikart — «naviger en kurs»

### Steg 1 — Quick wins (timer–dager, ingen nye avhengigheter)

1. **Fyll inn `lenke` på hendelser** og dermed aktivér «Se mer» (i dag 0/15).
2. **Statusfilter + «skjul gjennomført/avlyst»** (4 av 15 er allerede fortid).
3. **Statusforklaring i hjulet** (opasitet → tekst), og marker `avlyst` med form (åpen ring), ikke bare 0.3 opasitet.
4. **Større klikkmål**: usynlig `<circle r=12>` trefflate bak hver prikk (≥24 px), behold liten visuell prikk.
5. **Kontrastfiks**: `text-gray-400` → `gray-500/600` for meta-tekst.
6. **Etiketter for nær-fremtidige hendelser** i hjulet + auto-velg «neste» ved innlasting.

### Steg 2 — Mellomstore grep (uker)

7. **Fler-rings-/banevisning** — én ring per kategori (eller per `tenant`, som allerede finnes i modellen). Dette er det enkeltgrepet som løfter oss mot Plandisc-paradigmet. Bygg med **visx Arc** eller **d3-shape.arc**.
8. **iCal-eksport + «Abonner»** (webcal) via `ical-generator`/`ics-service` → hendelser i gårdeiernes egne kalendere.
9. **Gjentakende hendelser (RRULE)** via `rrule.js` — gjør markeder/sesong til ekte gjentakelser.
10. **Kandidat→hendelse-flyt**: «Legg til i årshjul»-knapp som forhåndsutfyller editoren fra kandidatkortet.
11. **`schema.org/Event` JSON-LD** på siden.
12. **Oppgradert agenda/måned** via **Schedule-X** (eller behold egen agenda og legg til et månedsrutenett).

### Steg 3 — Strategiske grep (måneder)

13. **Flerårig** (aktiver år-velgeren; kun 2026 finnes nå).
14. **Leietaker-/«min portefølje»-filter** per gårdeier (utnytt `tenant`).
15. **Rolleskille**: redaktør vs. leser (i dag kan alle slå på «Rediger» og slette).
16. **Eksport til PDF/PNG/PPT** for styremøter (Plandisc-paritet).
17. **Bilder/thumbnails per hendelse** + kobling til Visit Løkka / analyser.
18. **Test tetthetshåndteringen** når de 20 kandidatene legges inn (klynger oppstår i september) — `tildelRadiusOffset` er aldri kjørt i prod.

### Prioriteringsmatrise

| | Lav innsats | Høy innsats |
|---|---|---|
| **Høy effekt** | Lenker, statusfilter, klikkmål, statusforklaring (steg 1) | Fler-rings-visning, iCal-abonnement, RRULE (steg 2) |
| **Lavere effekt** | Kontrastfiks, auto-velg neste | Eksport PDF/PPT, flerårig, rolleskille (steg 3) |

### Strategisk anbefaling

**Hybrid, ikke utskifting.** Behold det egenutviklede hjulet som signatur, men: lån **visx/d3-shape** for buer, skalaer og tilgjengelige tooltips; legg et **Schedule-X/FullCalendar**-lag ved siden av for agenda, gjentakelse og iCal; og adopter **fler-rings-paradigmet** fra Plandisc. Da beholder dere identiteten og lukker funksjonsgapet samtidig.

---

## 6. Topp 5 anbefalinger

1. **Fyll dataene og fjern død funksjonalitet** (lenker, beskrivelser; statusfilter). Størst effekt per krone — designet venter bare på innhold.
2. **Gjør hjulet lesbart uten klikk** (etiketter + statusforklaring + 24 px klikkmål). Løser de fleste brukervennlighets- og WCAG-funnene samtidig.
3. **Fler-rings-/banevisning** (visx/d3-shape). Løfter uttrykket fra «punktsky» til «årshjul» og rommer veksten fra 15 → 35+ hendelser.
4. **iCal-abonnement + RRULE.** Den største funksjonelle gevinsten for gårdeiere; gjør kalenderen til noe de faktisk bruker, ikke bare ser på.
5. **Kandidat→hendelse-flyt + rolleskille.** Gjør de 20 kandidatene til reell pipeline og rydder opp i redigeringstilgangen.

---

## Vedlegg — kilder

**Domene / årshjul**
- Plandisc — digitalt årshjul for kommuner: https://plandisc.com/en/municipal-circular-planner
- Enable365 — digitalt årshjul (PlanIt for Teams): https://enable365.ai/no/blog/arsplanlegging-med-arshjul/
- Grønn Jobb — HMS-årshjul + mal: https://blogg.gronnjobb.no/slik-lager-du-et-hms-aarshjul

**Sirkulære / viz-primitiver**
- visx (Airbnb): https://github.com/airbnb/visx · intro: https://blog.logrocket.com/introduction-to-visx/
- yearround (canvas circular calendar): https://github.com/stiletto/yearround
- js-year-calendar: https://github.com/year-calendar/js-year-calendar
- d3-time: https://d3js.org/d3-time · d3-timeline: https://github.com/denisemauldin/d3-timeline · d3-milestones: https://github.com/superpikar/d3-milestones
- Oversikt åpne JS-kalendere: https://medevel.com/os-js-calendar/

**Kalender / scheduler**
- Best React scheduler libraries (LogRocket): https://blog.logrocket.com/best-react-scheduler-component-libraries/
- Schedule-X: https://github.com/schedule-x/schedule-x
- FullCalendar: https://fullcalendar.io/docs
- react-big-calendar: https://github.com/jquense/react-big-calendar
- npm-sammenligning: https://npm-compare.com/@fullcalendar/react,react-big-calendar,react-calendar,react-datepicker

**Standarder / interop**
- ical-generator: https://github.com/sebbo2002/ical-generator · ics: https://www.npmjs.com/package/ics · ics-service: https://github.com/derhuerst/ics-service
- rrule.js: https://github.com/jkbrzt/rrule
- Event schema markup (JSON-LD): https://add-to-calendar-pro.com/articles/event-schema-markup · https://schemavalidator.org/guides/event-schema-markup-guide

**Tilgjengelighet / farge**
- Color Blind Safe Palette Generator: https://toolsana.com/tools/colorblind-safe-palette-generator/
- InclusiveColors (WCAG-paletter): https://www.inclusivecolors.com/
- Colorsafe: http://colorsafe.co/
- WCAG-kontrast (2025-guide): https://www.allaccessible.org/blog/color-contrast-accessibility-wcag-guide-2025
