# Plan: 1-Minute Analyse - Ny Datastruktur

## Oversikt

Reorganisere 1-minute analysedata til 6 hovedseksjoner som matcher kildefilene direkte.

## Ny Seksjonsinndeling

```
1. DEMOGRAFI         → demografi.json
2. KONKURRANSEBILDET → konkurransebilde.json
3. KORTHANDEL        → korthandel.json
4. BEVEGELSE         → bevegelse.json
5. BESØKENDE         → besokende.json (NY)
6. INTERNASJONALT    → internasjonalt.json (NY)
+ AKTØRER            → aktorer.json (ekspanderbar liste)
```

---

## 1. DEMOGRAFI (`demografi.json`)

**Kildefiler:**
- `Aldersfordeling DEMOGRAFI.csv`
- `Antall hus DEMOGRAFI.csv`
- `Antall husholdninger DEMOGRAFI.csv`
- `Demografi over tid DEMOGRAFI.csv`
- `Inntektsfordeling DEMOGRAFI.csv`
- `Medianinntekt per husholdningstype DEMOGRAFI.csv`

**Datastruktur:**
```typescript
{
  nøkkeltall: {
    befolkning: number,           // Fra NOKKELTALL.json
    befolkningstetthet: number,   // per km²
    områdestørrelse: number,      // km²
    vekst: number                 // % endring
  },
  aldersfordeling: {
    mann: [{ kategori: string, antall: number }],
    kvinne: [{ kategori: string, antall: number }]
  },
  inntektsfordeling: [{ kategori: string, antall: number }],
  husholdninger: [{ type: string, antall: number }],
  medianInntektPerHusholdningstype: [{ type: string, median: number }],
  demografiOverTid: [{ år: string, befolkning: number, trend: number }]
}
```

**Visualiseringer:**
- Befolkningspyramide (aldersfordeling mann/kvinne)
- Inntektsfordeling (bar chart)
- Husholdningstyper (pie/bar chart)
- Befolkningsutvikling over tid (line chart)

---

## 2. KONKURRANSEBILDET (`konkurransebilde.json`)

**Kildefiler:**
- `Konseptmiks KONKURRANSEBILDET.csv`
- `Kjeder vs. uavhengige konsepter KONKURRANSEBILDET.csv`
- `Over- og underandel vs. kommune KONKURRANSEBILDET.csv`
- `Utvikling per år KONKURRANSEBILDETE.csv`
- `Sheet1.csv` (Aktørliste - separat fil)

**Datastruktur:**
```typescript
{
  nøkkeltall: {
    konseptTetthet: number,      // per km²
    totalOmsetning: number,      // mill NOK
    omsetningTetthet: number,    // per km²
    trend: { konseptTetthet: number, omsetning: number }
  },
  konseptmiks: [{ kategori1: string, kategori2: string, antall: number }],
  kjederVsUavhengige: [{ år: string, uavhengig: number, kjeder: number }],
  overUnderandel: {
    matOpplevelser: number,
    handel: number,
    tjenester: number
  },
  utviklingPerÅr: [{ år: string, matOpplevelser: number, handel: number, tjenester: number }]
}
```

**Visualiseringer:**
- Konseptmiks (treemap eller stacked bar)
- Kjeder vs. uavhengige over tid (area chart)
- Over-/underandel vs. kommune (bar chart)
- Omsetningsutvikling per kategori (line chart)

---

## 3. KORTHANDEL (`korthandel.json`)

**Kildefiler:**
- `Korthandel i valgt tidsrom KORTHANDEL.csv`
- `Årlig vekst KORTHANDEL.csv`
- `Indeksert vekst (indeks = 100) KORTHANDEL.csv`
- `Korthandel per ukedag KORTHANDEL.csv`

**Datastruktur:**
```typescript
{
  nøkkeltall: {
    dagligKorthandel: number,      // mill NOK
    totalKorthandel: number,       // mrd NOK
    beløpPerTransaksjon: number,   // NOK
    endring30d: number             // %
  },
  tidsserie: [{ dato: string, matOpplevelser: number, handel: number, tjenester: number }],
  årligVekst: [{ år: string, område: number, oslo: number, norge: number }],
  indeksertVekst: [{ år: string, område: number, oslo: number, norge: number }],
  korthandelPerUkedag: [{ dag: string, år2023: number, år2024: number }]
}
```

**Visualiseringer:**
- Tidsserie daglig korthandel (area chart med kategorifordeling)
- Årlig vekst vs. Oslo/Norge (grouped bar chart)
- Indeksert vekst over tid (line chart)
- Korthandel per ukedag (bar chart, sammenligne 2023/2024)

---

## 4. BEVEGELSE (`bevegelse.json`)

**Kildefiler:**
- `Besøk per time i tidsperioden BEVEGELSE.csv`
- `Besøk per ukedag i tidsperioden BEVEGELSE.csv`
- `Bevegelsesmønster BEVEGELSE.csv`

**Datastruktur:**
```typescript
{
  nøkkeltall: {
    dagligBesøk: number,
    besøkPerKm2: number,
    travlesteDag: string,
    lørdagAndel: number,
    periode: string
  },
  perTime: [{ time: string, besøk: number }],
  perUkedag: [{ dag: string, besøkende: number, påJobb: number, hjemme: number }],
  bevegelsesmønster: [{ kvartal: string, besøkende: number, påJobb: number, hjemme: number }]
}
```

**Visualiseringer:**
- Besøk per time (line/area chart)
- Besøk per ukedag (grouped bar: besøkende/påJobb/hjemme)
- Bevegelsesmønster over tid (stacked area chart)

---

## 5. BESØKENDE (`besokende.json`) - NY

**Kildefiler:**
- `Alders- og kjønnsfordeling (besøkende) BESØKENDE.csv`
- `Husholdningstypefordeling (besøkende) BESØKENDE.csv`
- `Inntektsfordeling (besøkende) BESØKENDE.csv`
- `Medianinntekt per husholdningstype (besøkende) BESØKENDE.csv`
- `Omrader_besokende_kommer_fra BESØKENDE.csv`

**Datastruktur:**
```typescript
{
  aldersfordeling: {
    mann: [{ kategori: string, antall: number }],
    kvinne: [{ kategori: string, antall: number }]
  },
  husholdningstyper: [{ type: string, antall: number }],
  inntektsfordeling: [{ kategori: string, antall: number }],
  medianInntektPerHusholdningstype: [{ type: string, median: number }],
  områderBesøkendeKommerFra: [{ område: string, prosent: number }]
}
```

**Visualiseringer:**
- Alderspyramide besøkende (population pyramid)
- Husholdningstyper besøkende (pie chart)
- Inntektsfordeling besøkende (bar chart)
- Kart/treemap over områder besøkende kommer fra

---

## 6. INTERNASJONALT BESØKENDE (`internasjonalt.json`) - NY

**Kildefiler:**
- `Topp 20 land besøkende til området (i %) INTERNASJONALT BESØKENDE.csv`

**Datastruktur:**
```typescript
{
  periode: string,
  toppLand: [{ land: string, prosent: number }]
}
```

**Visualiseringer:**
- Horisontal bar chart med flagg
- Eller verdenskart med fargekoding

---

## AKTØRER (`aktorer.json`)

**Kildefiler:**
- `Sheet1.csv` (full aktørliste)

**Datastruktur:**
```typescript
{
  actors: [{
    rank: string,
    navn: string,
    type: string,
    adresse: string,
    kommune: string,
    omsetning: number,
    kjedeProsent: string | null,
    yoyVekst: number | null,
    ansatteLokalt: number,
    ansatteKjede: number,
    kjedeLokasjoner: number,
    markedsandel: number
  }],
  categoryStats: Record<string, { count: number, totalRevenue: number, avgRevenue: number }>,
  metadata: { totalActors: number, totalCategories: number, totalRevenue: number }
}
```

**UI-krav:**
- Ekspanderbar/minimerbar liste
- Vis topp 10 som default
- "Vis alle X aktører" knapp for å ekspandere
- Sortering og filtrering etter kategori

---

## Datatilgjengelighet per eiendom

| Data | ORP3 | TMg33 | TMg40 | TMg44 |
|------|------|-------|-------|-------|
| **DEMOGRAFI** | ✅ Full | ⚠️ Delvis* | ✅ Full | ✅ Full |
| **KONKURRANSEBILDET** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **KORTHANDEL** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **BEVEGELSE** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **BESØKENDE** | ✅ Full | ❌ Mangler | ✅ Full | ⚠️ Delvis** |
| **INTERNASJONALT** | ✅ Full | ❌ Mangler | ✅ Full | ✅ Full |
| **AKTØRER** | ✅ 207 | ✅ 151 | ✅ 173 | ✅ 167 |

*TMg33: Mangler aldersfordeling
**TMg44: Mangler "områder besøkende kommer fra"

---

## Implementeringssteg

### Fase 1: Datakonvertering
1. Oppdater TypeScript-typer (`src/types/one-min-analysis.ts`)
2. Lag konverteringsskript for alle CSV → JSON
3. Generer JSON-filer for alle 4 eiendommer

### Fase 2: Komponentstruktur
1. Lag `AnalysisSection` wrapper-komponent
2. Oppdater/lag visualiseringskomponenter per seksjon
3. Implementer ekspanderbar aktørliste

### Fase 3: Sideintegrasjon
1. Oppdater loader (`one-min-loader.ts`)
2. Oppdater eiendomsside med 6 seksjoner
3. Håndter manglende data gracefully

---

## UI Layout

```
┌─────────────────────────────────────────────┐
│ [Header med eiendomsinfo]                   │
├─────────────────────────────────────────────┤
│ 1. DEMOGRAFI                            [▼] │
│    ┌─────────┬─────────┐                    │
│    │Pyramide │Inntekt  │                    │
│    └─────────┴─────────┘                    │
├─────────────────────────────────────────────┤
│ 2. KONKURRANSEBILDET                    [▼] │
│    ┌─────────┬─────────┐                    │
│    │Konsept  │Kjeder   │                    │
│    └─────────┴─────────┘                    │
│    ┌─ Aktører (topp 10) ─────────────────┐  │
│    │ #1 Extra Birkelunden    87M  -0.3%  │  │
│    │ #2 Vinmonopolet        73M  -5.0%   │  │
│    │ ...                                  │  │
│    │ [▼ Vis alle 207 aktører]            │  │
│    └─────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│ 3. KORTHANDEL                           [▼] │
├─────────────────────────────────────────────┤
│ 4. BEVEGELSE                            [▼] │
├─────────────────────────────────────────────┤
│ 5. BESØKENDE                            [▼] │
├─────────────────────────────────────────────┤
│ 6. INTERNASJONALT BESØKENDE             [▼] │
└─────────────────────────────────────────────┘
```

---

## Godkjenning

Vent på bruker-godkjenning før implementering starter.
