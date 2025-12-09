# Nedre Løkka Områdeprofil - Page Structure & Data Mapping

**Created:** 2025-11-26
**Status:** 🔧 Planning Phase
**Purpose:** Define page structure and map available data for new comprehensive area profile

---

## Page Overview

**Route:** `/main-board/analyser/nedre-lokka-omradeprofil`

**Geographic Coverage:**
- **6 Micro-Areas Combined:**
  1. Øvre Thorvald Meyers gate
  2. Nedre Thorvald Meyers gate
  3. Olaf Ryes Plass v/ Boots
  4. Olaf Ryes Plass v/ 7-Eleven
  5. Midt i Markveien
  6. Nederst i Markveien

**Key Metrics (Target):**
- Population: Market area demographics
- Daily Visitors: 93,000 across 6 micro-areas
- Commercial Spaces: ~300 businesses
- Revenue: 2024 totals by category
- Oslo Comparison: Benchmark against city center

---

## Page Structure

### 1. Hero Section
**Component:** `HeroSection`

**Content:**
- Title: "Nedre Løkka Områdeprofil"
- Subtitle: "Omfattende analyse av 6 mikro-områder på Nedre Løkka"
- Background: Map or aerial view of Nedre Løkka
- Key stats cards:
  - Total daily visitors
  - Total businesses
  - Total revenue
  - Population reach

**Data Availability:**
- ✅ Background image: Can use existing area images
- 🔶 Daily visitors: NEEDS AGGREGATION (currently ~50k-57k sum, user mentioned 93k)
- ✅ Business count: Available per micro-area
- ✅ Revenue: Available in aktører data
- 🔶 Population: Available per micro-area, needs aggregation

---

### 2. Folk på Løkka (Population & Demographics)

**Component:** `DemografiSection`

**Requirements from User:**
> "Området har en diversifisert boligbestand og tiltrekker seg en mangfoldig befolkning. I tillegg til fastboende, er området kjent for å tiltrekke seg kreative fagfolk, studenter og unge familier, noe som bidrar til et livlig og dynamisk lokalmiljø."

**Subsections:**

#### 2.1 Befolkningssammendrag
**Data Required:**
- Total population in market area
- Age distribution
- Household types
- Income levels

**Data Availability:**
- ✅ Age distribution: `demografi/aldersfordeling.json` per micro-area
- ✅ Household types: `demografi/antall-husholdninger.json` per micro-area
- ✅ Income data: Available in sammenligning data
- ❌ Unified "Nedre Løkka" aggregate: MISSING - needs creation

**Visualization:**
- Age pyramid (combined from 6 areas)
- Household type pie chart
- Income distribution bar chart

**Component Type:** `DemografiCharts` (new, aggregate 6 areas)

---

#### 2.2 Målgruppe Karakteristikk
**Data Required:**
- "Kreative fagfolk, studenter, unge familier"
- Lifestyle indicators

**Data Availability:**
- 🔶 Partial: Age/household data suggests composition
- ❌ Explicit lifestyle categories: MISSING
- 🔶 Proxy: Can infer from age (20-40), household types, income

**Visualization:**
- Text summary with supporting demographics
- Infographic showing key segments

---

### 3. Bevegelsesmønster (Movement Patterns)

**Component:** `BevegelsesmonsterSection`

**Requirements from User:**
> "Med rundt 93,000 besøkende daglig fordelt på de seks mikro-områdene, viser Nedre Løkka tydelige bevegelsesmønstre gjennom uken og døgnet."

**Subsections:**

#### 3.1 Daglig Besøkstall
**Data Required:**
- 93,000 daily visitors across 6 micro-areas
- Breakdown by micro-area
- Movement categories (visitors, workers, residents)

**Data Availability:**
- ✅ Movement data per micro-area: `bevegelse/*.json`
- 🔶 Current sum: ~50,000-57,000 (discrepancy with 93k)
- ✅ Categories available: besøkende, på jobb, hjemme
- ❌ Unified 93k metric: NEEDS CLARIFICATION

**Data Files Available:**
```
bevegelse/
├── besok-per-time.json (24-hour profile)
├── besok-per-ukedag.json (weekly patterns)
├── bevegelsesmonster.json (yearly trends)
└── omrader_besokende_kommer_fra.json (origin areas)
```

**Visualization:**
- Daily visitor counter (93,000 or clarified number)
- Stacked area chart: 6 micro-areas contribution
- 24-hour profile (aggregate)
- Weekly pattern (aggregate)

**Component Type:** `BevegelseAggregateCharts` (new)

---

#### 3.2 Ukes- og Døgnmønster
**Data Required:**
- Weekday vs weekend patterns
- Hourly profiles
- Peak times identification

**Data Availability:**
- ✅ Hourly data: Available for all 6 areas
- ✅ Weekly data: Available for all 6 areas
- ✅ Yearly comparison: 2023 vs 2024

**Visualization:**
- Heat map: Hour × Day of week
- Line chart: Hourly profile with peak highlights
- Bar chart: Weekday comparison

**Component Type:** Reuse existing patterns from `BevegelseComparisonCharts`

---

### 4. Reisevaner (Travel Habits)

**Component:** `ReisevanerSection`

**Requirements from User:**
> "En betydelig andel av de besøkende kommer til fots eller med sykkel, noe som understreker områdets rolle som en sone for gående og syklende."

**Subsections:**

#### 4.1 Transportmiddel-fordeling
**Data Required:**
- Percentage walking
- Percentage cycling
- Percentage public transport
- Percentage car

**Data Availability:**
- ❌ Transportation mode data: COMPLETELY MISSING
- 🔶 Proxy: Can reference Oslo average or similar urban areas
- 🔶 Origin area data: `omrader_besokende_kommer_fra.json` shows geographic distribution (could proxy distance → mode)

**Visualization:**
- Pie chart or icon chart: Transport mode split
- Text summary emphasizing pedestrian/cycling

**Component Type:** `ReisevanerVisual` (new, may need proxy data)

**CRITICAL GAP:** No source data for transportation modes

---

### 5. Antall Virksomheter (Business Count)

**Component:** `VirksomheterSection`

**Requirements from User:**
> "Området huser rundt 300 kommersielle lokaler, inkludert butikker, kaféer, restauranter og kreative kontorplasser."

**Subsections:**

#### 5.1 Total Virksomheter
**Data Required:**
- ~300 commercial spaces
- Breakdown by category
- Growth over time

**Data Availability:**
- ✅ Business data: `aktorer/*.json` available
- 🔶 Current count: 359 total for ALL Løkka, ~40-50 per micro-area
- ✅ Categories: Type classifications available
- ❌ "300 spaces" number: NEEDS CLARIFICATION (current sum ~240-300 for 6 areas)

**Data Files Available:**
```
aktorer/
├── midt-i-markveien.json (48 businesses)
├── nederst-i-markveien.json (49 businesses)
├── nedre-thorvald-meyers-gate.json (43 businesses)
├── olaf-ryes-plass-7eleven.json (40 businesses)
├── olaf-ryes-plass-boots.json (42 businesses)
└── ovre-thorvald-meyers-gate.json (52 businesses)
```

**Calculation:** 48 + 49 + 43 + 40 + 42 + 52 = **274 businesses**

**Visualization:**
- Total count card: "274 virksomheter" (or 300 if clarified)
- Category breakdown pie chart
- Micro-area comparison bar chart

**Component Type:** `VirksomheterOverview` (new)

---

#### 5.2 Kategori-fordeling
**Data Required:**
- Butikker (stores)
- Kaféer og restauranter (cafes & restaurants)
- Kreative kontorplasser (creative offices)
- Andre (other)

**Data Availability:**
- ✅ Type field: Available in aktører data
- 🔶 Category naming: Needs mapping to user's categories

**Current Categories in Data:**
- Restaurant, Kafé, Bar, Matbutikk, Klesbutikk, Bokhandel, etc.

**Mapping Needed:**
```
User Category → Data Types
"Butikker" → Matbutikk, Klesbutikk, Bokhandel, Blomsterbutikk, etc.
"Kaféer og restauranter" → Restaurant, Kafé, Bar, Nattklubb
"Kreative kontorplasser" → Kontor, Galleri, Atelier, Designbyrå
"Andre" → Remaining types
```

**Visualization:**
- Stacked bar chart: Categories across 6 areas
- Icon grid: Visual representation of mix

---

### 6. Handelsvaner og Omsetning (Revenue & Transactions)

**Component:** `OmsetningSection`

**Requirements from User:**
> "2024-tall for omsetning fordelt på kategorier"

**Subsections:**

#### 6.1 Total Omsetning 2024
**Data Required:**
- Total revenue for Nedre Løkka (6 areas)
- Breakdown by category
- Year-over-year comparison

**Data Availability:**
- ✅ Revenue data: Available in aktører data (omsetning field)
- ✅ Historical: 2024 Årsrapport has aggregate data
- ✅ Categories: Can group by business type
- ❌ Unified aggregate: Needs calculation

**Data Sources:**
```
aktorer/[area].json → businesses[].omsetning
korthandel/*.json → transaction data
```

**Visualization:**
- Revenue counter: "X milliarder NOK"
- Category breakdown: Horizontal bar chart
- YoY comparison: Line chart 2023 vs 2024

**Component Type:** `OmsetningCharts` (new)

---

#### 6.2 Korthandel (Card Transactions)
**Data Required:**
- Transaction volume
- Average transaction value
- Spending patterns

**Data Availability:**
- ✅ Card transaction data: `korthandel/*.json` per micro-area
- ✅ Metrics: Antall transaksjoner, gjennomsnittlig beløp
- ✅ Time patterns: Monthly, daily data available

**Visualization:**
- Transaction volume area chart
- Average spend bar chart
- Seasonal patterns line chart

---

### 7. Oslo Sammenligning (Oslo Comparison)

**Component:** `OsloSammenligningSection`

**Requirements from User:**
> "Sammenligning med Oslo sentrum"

**Subsections:**

#### 7.1 Benchmarking Metrics
**Data Required:**
- Nedre Løkka vs Oslo Sentrum
- Key metrics: visitors, businesses, revenue, demographics

**Data Availability:**
- ✅ Oslo Sentrum data: Available in `sammenligning-2024` datasets
- ✅ Comparison areas: Grünerløkka, Sentrum, Bjørvika, Majorstuen
- ✅ Metrics: Demographics, movement, business data all comparable

**Visualization:**
- Radar chart: Multi-metric comparison
- Bar chart: Side-by-side key metrics
- Table: Detailed comparison

**Component Type:** Reuse `ComparisonCharts` patterns

---

#### 7.2 Posisjonering
**Data Required:**
- Unique selling points
- Market position

**Data Availability:**
- 🔶 Qualitative: Can derive from data (e.g., younger demographics, higher foot traffic)
- ✅ Supporting data: All metrics available for comparison

**Visualization:**
- Infographic highlighting strengths
- Quote boxes with key insights

---

## Component Architecture

### New Components to Create

1. **`NedreLokkaDemografiCharts.tsx`**
   - Aggregate 6 micro-areas
   - Age, household, income visualizations
   - Similar to `DemografiComparisonCharts` but single area

2. **`NedreLokkaBevegelsesmonsterCharts.tsx`**
   - Aggregate 6 micro-areas
   - Daily 93k visitors display
   - 24-hour, weekly, yearly patterns
   - Micro-area breakdown

3. **`NedreLokkaVirksomheterOverview.tsx`**
   - Total count: 274 businesses
   - Category breakdown
   - Revenue by category
   - Micro-area comparison

4. **`NedreLokkaOmsetningCharts.tsx`**
   - Total revenue aggregate
   - Category breakdown
   - Transaction data from korthandel
   - YoY comparison

5. **`NedreLokkaSammenligningCharts.tsx`**
   - Nedre Løkka vs Oslo Sentrum
   - Radar chart, bar charts
   - Reuse sammenligning data

6. **`ReisevanerVisual.tsx`** (conditional)
   - Transportation mode display
   - **IF** we can source/proxy data

### Reusable Components

- `HeroSection` (modify existing)
- `TabbedImageViewer` (for any remaining screenshots)
- Existing chart components from Recharts library

---

## Data Preparation Required

### 1. Create Aggregate JSON Files

**New Directory Structure:**
```
public/data/main-board/nedre-lokka-omradeprofil/
├── demografi/
│   ├── aldersfordeling-aggregate.json
│   ├── husholdninger-aggregate.json
│   └── inntekt-aggregate.json
├── bevegelse/
│   ├── daglig-besok-total.json (93k metric)
│   ├── besok-per-time-aggregate.json
│   ├── besok-per-ukedag-aggregate.json
│   ├── mikro-omrade-fordeling.json
│   └── bevegelsesmonster-aggregate.json
├── virksomheter/
│   ├── total-count.json
│   ├── kategori-fordeling.json
│   ├── mikro-omrade-fordeling.json
│   └── omsetning-per-kategori.json
├── korthandel/
│   ├── transaksjoner-aggregate.json
│   └── gjennomsnitt-belop-aggregate.json
└── sammenligning/
    └── nedre-lokka-vs-oslo.json
```

### 2. Data Aggregation Logic

**Bevegelse Aggregation:**
```typescript
// Sum besøkende across 6 micro-areas per time slot
const aggregateBevegelse = (areas: string[]) => {
  const hourlyData = Array(24).fill(0).map((_, hour) => ({
    time: `${hour}:00`,
    besokende: 0,
    paJobb: 0,
    hjemme: 0
  }));

  areas.forEach(area => {
    const areaData = loadBevegelse(area);
    areaData.forEach((hour, i) => {
      hourlyData[i].besokende += hour.besokende;
      hourlyData[i].paJobb += hour.paJobb;
      hourlyData[i].hjemme += hour.hjemme;
    });
  });

  return hourlyData;
};
```

**Virksomheter Aggregation:**
```typescript
// Combine all businesses from 6 areas
const aggregateVirksomheter = (areas: string[]) => {
  let allBusinesses = [];
  let totalRevenue = 0;

  areas.forEach(area => {
    const areaBusinesses = loadAktorer(area);
    allBusinesses.push(...areaBusinesses);
    totalRevenue += areaBusinesses.reduce((sum, b) => sum + b.omsetning, 0);
  });

  return {
    total: allBusinesses.length,
    businesses: allBusinesses,
    revenue: totalRevenue,
    byCategory: categorizeBusinesses(allBusinesses)
  };
};
```

### 3. Category Mapping

**Create mapping file: `/src/lib/mappings/business-categories.ts`**
```typescript
export const BUSINESS_CATEGORY_MAPPING = {
  'Butikker': [
    'Matbutikk', 'Klesbutikk', 'Bokhandel', 'Blomsterbutikk',
    'Interiørbutikk', 'Kunstgalleri', 'Vinmonopol'
  ],
  'Kaféer og restauranter': [
    'Restaurant', 'Kafé', 'Bar', 'Nattklubb', 'Bakeri'
  ],
  'Kreative kontorplasser': [
    'Kontor', 'Galleri', 'Atelier', 'Designbyrå', 'Reklamebyrå'
  ],
  'Andre': [
    'Apotek', 'Frisør', 'Treningssenter', 'Kiosk', 'Annet'
  ]
};
```

---

## Critical Data Gaps & Solutions

### Gap 1: 93,000 Daily Visitors Metric
**Status:** ❌ Discrepancy

**Current Data:** Sum of 6 micro-areas ≈ 50,000-57,000 daily visitors

**User Requirement:** 93,000 daily visitors

**Possible Solutions:**
1. **Verify source** - Check if 93k is peak day, average, or includes different metric
2. **Use actual sum** - Display ~57k with clarification
3. **Check for missing data** - Perhaps some micro-areas not counted
4. **Expand definition** - Include nearby areas or different time period

**Recommended Action:** ASK USER to clarify source of 93k metric

---

### Gap 2: Transportation Mode Data
**Status:** ❌ Completely Missing

**User Requirement:** "En betydelig andel av de besøkende kommer til fots eller med sykkel"

**Available Data:** Origin area geographic distribution (could proxy)

**Possible Solutions:**
1. **Use Oslo average** - Reference city statistics for urban areas
2. **Proxy from distance** - Infer mode based on origin distance
3. **Qualitative statement** - Text-based description without data viz
4. **Future enhancement** - Mark as "Data collection in progress"

**Recommended Action:** Use qualitative statement + visual icon display without percentages

---

### Gap 3: Unified Aggregate Files
**Status:** ❌ Missing (but source data exists)

**User Requirement:** Single "Nedre Løkka" profile combining 6 micro-areas

**Available Data:** All source data exists per micro-area

**Solution:** CREATE AGGREGATION SCRIPT
- Script: `/scripts/aggregate-nedre-lokka.ts`
- Input: 6 micro-area JSON files
- Output: Aggregated JSON files in new directory
- Run: Once during development, re-run when source data updates

**Recommended Action:** Build aggregation script FIRST, then page

---

### Gap 4: Business Category Naming
**Status:** 🔶 Partial (needs mapping)

**User Requirement:** "butikker, kaféer, restauranter, kreative kontorplasser"

**Available Data:** Detailed types (Restaurant, Kafé, Matbutikk, etc.)

**Solution:** CREATE MAPPING LAYER
- Mapping file: `/src/lib/mappings/business-categories.ts`
- Transform function: `mapToUserCategories(businesses)`
- Apply during data aggregation

**Recommended Action:** Create mapping file, apply in aggregation script

---

## Implementation Plan

### Phase 1: Data Preparation ⏱️ 2-3 hours
1. ✅ Analyze existing data (COMPLETED)
2. Create page structure document (CURRENT)
3. Create aggregation script (`/scripts/aggregate-nedre-lokka.ts`)
4. Create category mapping (`/src/lib/mappings/business-categories.ts`)
5. Run aggregation to generate all JSON files
6. Verify aggregated data accuracy

### Phase 2: Metadata & Route ⏱️ 30 min
1. Create `/src/data/main-board/analyser/nedre-lokka-omradeprofil.json`
2. Add to analyser index
3. Create route: `/src/app/main-board/analyser/nedre-lokka-omradeprofil/page.tsx`

### Phase 3: Component Development ⏱️ 4-5 hours
1. `NedreLokkaDemografiCharts.tsx` (1 hour)
2. `NedreLokkaBevegelsesmonsterCharts.tsx` (1.5 hours)
3. `NedreLokkaVirksomheterOverview.tsx` (1 hour)
4. `NedreLokkaOmsetningCharts.tsx` (1 hour)
5. `NedreLokkaSammenligningCharts.tsx` (30 min - reuse existing)

### Phase 4: Page Integration ⏱️ 2 hours
1. Build page layout with all sections
2. Integrate all components
3. Add hero section
4. Add text content
5. Style and responsive design

### Phase 5: Testing & Documentation ⏱️ 1 hour
1. Verify all data loads correctly
2. Test responsive design
3. TypeScript type checking
4. Update project documentation
5. Create session notes

**Total Estimated Time:** 9.5-11.5 hours

---

## Design Mockup Structure

```
┌─────────────────────────────────────────────────────────┐
│  HERO: Nedre Løkka Områdeprofil                        │
│  [Map Background]                                       │
│  [93k visitors] [274 businesses] [X.XX Mrd NOK]        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 1. FOLK PÅ LØKKA                                        │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│ │ Age Chart   │ │ Households  │ │ Income      │       │
│ └─────────────┘ └─────────────┘ └─────────────┘       │
│ [Text: Diversifisert befolkning...]                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2. BEVEGELSESMØNSTER                                    │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 93,000 besøkende daglig - fordelt på 6 områder     │ │
│ │ [Stacked area: 6 micro-areas over time]            │ │
│ └─────────────────────────────────────────────────────┘ │
│ [Tab: Per time] [Tab: Per weekday] [Tab: By area]      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 3. REISEVANER                                           │
│ 🚶‍♂️ 🚴‍♀️ 🚌 🚗                                            │
│ [Text: Betydelig andel til fots eller sykkel...]       │
│ [Visual icon chart - qualitative]                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 4. VIRKSOMHETER (274 kommersielle lokaler)             │
│ ┌──────────────┐ ┌──────────────┐                      │
│ │ By Category  │ │ By Area      │                      │
│ │ [Pie chart]  │ │ [Bar chart]  │                      │
│ └──────────────┘ └──────────────┘                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 5. OMSETNING 2024                                       │
│ Total: X.XX Milliarder NOK                              │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Horizontal bar: Revenue by category]               │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Line chart: 2023 vs 2024 comparison]               │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 6. OSLO SAMMENLIGNING                                   │
│ Nedre Løkka vs Oslo Sentrum                            │
│ ┌──────────────┐ ┌──────────────┐                      │
│ │ Radar Chart  │ │ Bar Chart    │                      │
│ │ Multi-metric │ │ Key Metrics  │                      │
│ └──────────────┘ └──────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

---

## Questions for User Approval

### Critical Decisions Needed:

1. **93,000 Daily Visitors**
   - Current data sum: ~50,000-57,000
   - Your requirement: 93,000
   - **Question:** What is the source of the 93k metric? Should we use actual data sum or is there additional context?

2. **Transportation Mode Data**
   - No data available for walking/cycling percentages
   - **Question:** Should we:
     - A) Use qualitative text only (no chart)
     - B) Reference Oslo city averages
     - C) Mark as "Coming soon" and skip for now

3. **Business Count: 274 vs 300**
   - Actual count from data: 274 businesses
   - Your mention: "rundt 300 kommersielle lokaler"
   - **Question:** Use 274 (actual) or 300 (estimated)? Or clarify difference?

4. **Micro-Area Selection**
   - Current 6 areas identified
   - **Question:** Confirm these are correct "Nedre Løkka" areas:
     - ✅ Øvre TMG
     - ✅ Nedre TMG
     - ✅ Olaf Ryes Plass (both locations)
     - ✅ Midt i Markveien
     - ✅ Nederst i Markveien

---

## Next Steps - Awaiting Approval

**Ready to proceed with:**
- ✅ Page structure defined
- ✅ Data availability mapped
- ✅ Component architecture planned
- ✅ Implementation timeline estimated

**Awaiting decisions on:**
- 🔶 93k visitor metric clarification
- 🔶 Transportation mode handling
- 🔶 Business count number to use
- 🔶 Micro-area confirmation

**Once approved, we will:**
1. Create aggregation script
2. Generate all aggregate JSON files
3. Build 5 new React components
4. Integrate into new page route
5. Update documentation

---

**Document Status:** ✅ Complete - Ready for User Review
**Created:** 2025-11-26
**Next Action:** User approval and clarification on critical decisions
