# Kultur Deep Research Enrichment — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enrich all 5 existing kultur subsections with verified facts and new data points, plus create 2 new sections (Arkitektur & Byrom, Design & Kreativ Næring).

**Architecture:** 7 parallel research subagents (WebSearch + WebFetch) write enriched JSON data files. Consolidation phase merges cross-references into master. Implementation phase builds 4 new pages and updates existing pages.

**Tech Stack:** Next.js 16 | React 19 | TypeScript | Tailwind CSS 4 | Framer Motion | Static JSON data

**Design Doc:** `docs/plans/2026-03-02-kultur-deep-research-design.md`

---

## Phase 1: Parallel Deep Research (7 Subagents)

All 7 tasks in this phase are independent and MUST run in parallel using `dispatching-parallel-agents`.

---

### Task 1: Jazz Deep Research

**Files:**
- Modify: `src/data/biblioteket/kultur/jazz.json`

**Step 1: Read existing jazz.json**
Read `src/data/biblioteket/kultur/jazz.json` fully to understand current structure and all data points.

**Step 2: Research and verify all 8 existing claims**
Use WebSearch to verify each claim. Target sources:
- Store Norske Leksikon (snl.no) for artist biographies
- Oslo byarkiv / Tobias for venue histories
- ECM Records official site for discography
- Wikipedia (no.wikipedia.org) for cross-referencing

Key verifications:
- Jon Christensen: birthYear 1943, deathYear 2020, NM 1960, Buddy-prisen 1967
- Jan Garbarek: birthYear 1947, NM 1962, ECM debut 1970
- Oslo Jazzhus: moved to Toftes gate 69 in 1985, closure date (1991 vs 1996 discrepancy)
- Blå: establishment year, address Brenneriveien 9c

**Step 3: Research new artists with Løkka connection**
Search for at least 3 new jazz artists. Candidates:
- Sidsel Endresen (already in data — verify details)
- Mathias Eick (trumpet, ECM artist, Løkka connection?)
- Mats Eilertsen (bass, ECM, Oslo-based)
- Bugge Wesseltoft (New Conception of Jazz, Blå connection)
- Nils Petter Molvær (electronic jazz, Blå resident)

For each new artist, collect: name, birthYear, deathYear, instrument, description, awards, connectionToLokka.

**Step 4: Research additional venues and festivals**
- Cosmopolite (world music / jazz crossover)
- Nasjonal Jazzscene (Victoria) — verify if Løkka-relevant
- Belleville (jazz bar on Løkka?)
- New festivals or concert series since 2020

**Step 5: Research album references for existing artists**
For Jon Christensen, Jan Garbarek, Terje Rypdal, Arild Andersen:
- Key ECM albums with year
- Grammy nominations / wins
- Spellemannsprisen awards

**Step 6: Update jazz.json with all findings**
Write updated `src/data/biblioteket/kultur/jazz.json`:
- Update all claim confidence scores to 0.85+
- Add new artists to `artists` array
- Add new venues if found
- Add album references (new `keyAlbums` field on artists)
- Update `researchMetadata.lastVerified` to "2026-03-02"
- Update `researchMetadata.coverageScore` to reflect new coverage

**Step 7: Validate JSON structure**
Run: `node -e "const d = require('./src/data/biblioteket/kultur/jazz.json'); console.log('OK:', d.artists.length, 'artists,', d.venues.length, 'venues')"`
Expected: OK with increased artist count

---

### Task 2: Hiphop Deep Research

**Files:**
- Modify: `src/data/biblioteket/kultur/hiphop.json`

**Step 1: Read existing hiphop.json**
Read `src/data/biblioteket/kultur/hiphop.json` fully.

**Step 2: Research and verify claims**
Key verifications:
- X-Ray Ungdomskulturhus: founded 1994 by Farooq Farooqi, address Maridalsveien 3
- Farooq Farooqi: "Årets forbilde 2008" — verify source
- Soul Sessions: "Oslos ærespris 2024" — verify
- Brenneriveien Hall of Fame: started 1987, verify "Goal" as pioneer
- Quick Style: won "Norske Talenter" 2009, verify VM results
- Dancing Youth (Da-Yo): founded 1987, verify founders

**Step 3: Research missing biographical data**
- Ari Bajgora: birth year, full career arc
- Sollin Sæle: birth year, role in hip-hop community
- Tommy Tee: birth year (if not present), full discography highlights
- Karpe (Chirag Rashmikant Patel, Magdi Omar Ytreeide Abdelmaguid): Løkka connection

**Step 4: Research new artists and events**
- Karpe connection to Løkka/østkanten
- NRK Urørt artists from Grünerløkka
- OnklP & De Fjerne Slektningene
- Cezinando (Kristian Pihl Lorentzen) — Løkka connection?
- Newer events 2020-2025: concerts, battles, festivals

**Step 5: Research breakdance and graffiti updates**
- Quick Style post-2009: World of Dance, YouTube fame, internationalt
- New breakdance crews active on Løkka
- Graffiti artists active at Brenneriveien post-2020
- Street art festivals or projects

**Step 6: Update hiphop.json**
Write updated `src/data/biblioteket/kultur/hiphop.json`:
- Fix all missing birth years
- Add new artists
- Add new events (2020-2025)
- Update claim confidence to 0.85+
- Update researchMetadata

**Step 7: Validate JSON structure**
Run: `node -e "const d = require('./src/data/biblioteket/kultur/hiphop.json'); console.log('OK:', d.artists.length, 'artists,', d.crews.length, 'crews')"`

---

### Task 3: Film Deep Research

**Files:**
- Modify: `src/data/biblioteket/kultur/film.json`

**Step 1: Read existing film.json**
Read `src/data/biblioteket/kultur/film.json` fully.

**Step 2: Verify low-confidence claims (priority — lowest section at 0.70)**
Claims with confidence < 0.75:
- Film claim 3 (0.61): verify details
- Film claim 5 (0.64): verify details
- Film claim 6 (0.65): verify details
- Film claim 7 (0.68): verify details

**Step 3: Verify Edith Carlmar Løkka connection**
- Research Edith Carlmar's biography thoroughly
- If no genuine Løkka connection found, note this in data (don't fabricate)
- Consider replacement filmmaker with stronger connection

**Step 4: Research cinema history in detail**
- Parkteatret kino: exact years as cinema (opened/closed as cinema), seat count, notable films shown
- Regina Teater (1916-1928): architect, capacity, what played there
- Ringen Kino (2008-present): operator (SF Kino), screens, notable premieres
- Any other historical cinemas on Løkka (Grünerløkka Kino? Others?)

**Step 5: Research newer films (2020-2025)**
- Films shot on or set in Grünerløkka 2020-2025
- TV series with Løkka setting (SKAM locations? Others?)
- Documentaries about gentrification, culture, community
- Short films from film schools (Westerdals, etc.)

**Step 6: Research filming locations**
- Specific streets and addresses used in major films
- Recurring locations (Akerselva, Birkelunden, Olaf Ryes plass)
- Film permits and production activity trends

**Step 7: Update film.json**
Write updated `src/data/biblioteket/kultur/film.json`:
- All claims updated to 0.85+ confidence
- New films added to `films` array
- Cinema details enriched
- Filmmaker entries corrected/enriched
- New `tvSeries` array if relevant TV content found
- Update researchMetadata

**Step 8: Validate JSON structure**
Run: `node -e "const d = require('./src/data/biblioteket/kultur/film.json'); console.log('OK:', d.films.length, 'films,', d.cinemas.length, 'cinemas')"`

---

### Task 4: Teater Deep Research

**Files:**
- Modify: `src/data/biblioteket/kultur/teater.json`

**Step 1: Read existing teater.json**
Read `src/data/biblioteket/kultur/teater.json` fully.

**Step 2: Verify Hausmania claim (0.67 confidence)**
- Hausmania establishment: exact year, founders, legal status
- Current status: active/threatened/secured
- Key productions and events hosted there

**Step 3: Research recent performances (2023-2025)**
For each of the 9 venues, search for notable recent productions:
- Parkteatret: concerts/theater 2023-2025
- Dansens Hus: dance premieres, international guest companies
- Riksscenen: folk music/dance highlights
- Black Box teater: experimental works, notable artists
- Hausmania: squatter culture, alternative art
- Teater Manu: sign language performances
- Folk i Storgata: new comedy acts
- Grünerløkka Lufthavn/Mir: current status and programming
- Sofienberg kirke: events, concerts

**Step 4: Research additional theater groups**
- Vega Scene (if Løkka-relevant)
- Det Andre Teatret
- Teater Ibsen connections
- Independent theater makers based on Løkka

**Step 5: Research additional site-specific performances**
- 2020-2025 site-specific works in the neighborhood
- Architecture-related performances
- Community theater projects

**Step 6: Research education connections**
- KHiO (Kunsthøgskolen): performing arts department, student shows
- Teaterhøgskolen (now part of KHiO): graduates working on Løkka
- Workshop programs at venues

**Step 7: Update teater.json**
Write updated `src/data/biblioteket/kultur/teater.json`:
- Hausmania claim confidence raised
- New recent performances added
- Additional theater groups if found
- New site-specific performances
- Education connections documented
- Update researchMetadata

**Step 8: Validate JSON structure**
Run: `node -e "const d = require('./src/data/biblioteket/kultur/teater.json'); console.log('OK:', d.venues.length, 'venues,', d.theaterGroups.length, 'groups')"`

---

### Task 5: Billedkunst Deep Research

**Files:**
- Modify: `src/data/biblioteket/kultur/billedkunst.json`

**Step 1: Read existing billedkunst.json**
Read `src/data/biblioteket/kultur/billedkunst.json` fully.

**Step 2: Fill empty keyWorks arrays**
Research and add keyWorks for:
- Theodor Kittelsen: find works connected to Oslo/Grünerløkka specifically
- Frits Thaulow: find paintings of Akerselva or Oslo scenes
- Gustav Wentzel: "Frokost I" (1882), "Frokost II" (1885), other Kristiania works

**Step 3: Verify Munch addresses and periods**
- Search Oslo Museum / Munchmuseet for verified addresses
- Verify: Fossveien 7 (1885), Schous plass area, other Løkka addresses
- Paintings specifically depicting Grünerløkka/Akerselva locations

**Step 4: Research newer street art (2023-2025)**
- New murals on Grünerløkka
- Street art festivals or organized projects
- Arthaus / commercial street art commissions
- Instagram-famous walls or installations

**Step 5: Research galleries and exhibition spaces**
- Atelier Nord: current exhibitions, artist programs
- Purenkel galleri: history, notable shows
- Oslo Open participants from Løkka
- New galleries opened 2020-2025
- Pop-up exhibitions, studio visits

**Step 6: Research public art and murals**
- Commissioned public art pieces on Løkka
- Art integrated into buildings (Vulkan, Mathallen, etc.)
- Sculpture and installation art

**Step 7: Update billedkunst.json**
Write updated `src/data/biblioteket/kultur/billedkunst.json`:
- All keyWorks arrays populated
- Munch addresses verified
- New street art entries
- New galleries added to artVenues
- Public art documented
- Claims updated to 0.85+
- Update researchMetadata

**Step 8: Validate JSON structure**
Run: `node -e "const d = require('./src/data/biblioteket/kultur/billedkunst.json'); console.log('OK:', d.artists.early.length, 'early,', d.artVenues.length, 'venues')"`

---

### Task 6: Arkitektur & Byrom (NEW Section)

**Files:**
- Create: `src/data/biblioteket/kultur/arkitektur.json`

**Step 1: Research building styles on Grünerløkka**
Search for each period:
- **Murgårder (1860-1900):** Worker tenements, courtyard buildings, typical layouts, number of original buildings remaining
- **Jugendstil (1900-1920):** Art Nouveau facades, decorative elements, notable examples with addresses
- **Funkis (1930-40):** Functionalist additions, modernist buildings
- **1960-tall blokker:** Social housing blocks, sanering-era construction
- **Nybygg (2000+):** Vulkan development, Mathallen, contemporary architecture

**Step 2: Research the Byfornyelsen (urban renewal)**
- Saneringsdebatten 1960s-70s: original plans to demolish the neighborhood
- Beboerprotester: key dates, organizations, leaders
- Stortingsvedtaket 1976: decision to renovate instead of demolish
- Byfornyelsen 1980s-2000s: rehabilitation of tenement buildings
- Bakgårdssanering: courtyard improvement program

Sources: Oslo byarkiv, Plan- og bygningsetaten, Riksantikvaren, SNL

**Step 3: Research iconic buildings**
For each building, collect: name, architect (if known), year built, address, architectural style, current use, heritage status, significance.
- Paulus kirke (1892)
- Schous bryggeri (1870s → Schous kulturkvartal)
- Grünerløkka skole
- Vulkan-området (Aspelin Ramm development)
- Mathallen (2012)
- Akerselva industribygg (Hjula Væveri, etc.)
- Dælenenga idrettspark
- Torshovdalen / Torshovbekken
- Notable murgårder with specific addresses

**Step 4: Research parks and public spaces**
- Birkelunden: history (workers' movement, May Day), loppemarked, cultural events, heritage status
- Olaf Ryes plass: history, "urban living room", 17. mai celebrations, current character
- Sofienbergparken: original cemetery, conversion to park, current use
- Schous plass: history, transformation
- Akerselva miljøpark: industrial heritage, art installations along the river

**Step 5: Research architects with Løkka connection**
- Who designed the original murgårder?
- Vulkan architects (LPO arkitekter?)
- Mathallen architect
- Recent notable architectural projects

**Step 6: Research heritage and preservation status**
- Riksantikvaren listings for Grünerløkka
- Byantikvaren in Oslo: protected buildings
- SEFRAK-registered buildings
- Birkelunden as cultural heritage area

**Step 7: Write arkitektur.json**
Create `src/data/biblioteket/kultur/arkitektur.json` following this structure:

```json
{
  "id": "arkitektur",
  "title": "Arkitektur og Byrom på Grünerløkka",
  "subtitle": "Fra murgårder til Vulkan – 160 år med byutvikling",
  "intro": "...",
  "sections": [
    { "id": "murgaarder", "title": "Murgårdene", "description": "..." },
    { "id": "byfornyelsen", "title": "Byfornyelsen", "description": "..." },
    { "id": "ikoniske-bygg", "title": "Ikoniske Bygg", "description": "..." },
    { "id": "parker", "title": "Parker og Byrom", "description": "..." },
    { "id": "moderne", "title": "Moderne Arkitektur", "description": "..." }
  ],
  "buildingStyles": [...],
  "urbanRenewal": { "timeline": [...], "keyEvents": [...] },
  "iconicBuildings": [...],
  "parks": [...],
  "architects": [...],
  "heritageStatus": [...],
  "sources": [...],
  "claims": [...],
  "researchMetadata": { "lastVerified": "2026-03-02", "coverageScore": 0.80, "staleAfterDays": 180 },
  "crossReferences": [...],
  "metadata": { ... }
}
```

**Step 8: Validate JSON**
Run: `node -e "const d = require('./src/data/biblioteket/kultur/arkitektur.json'); console.log('OK:', d.iconicBuildings.length, 'buildings,', d.parks.length, 'parks')"`

---

### Task 7: Design & Kreativ Næring (NEW Section)

**Files:**
- Create: `src/data/biblioteket/kultur/design-kreativ.json`

**Step 1: Research design agencies on Løkka**
Search for graphic design, branding, and creative agencies based on Grünerløkka:
- Snøhetta (Brenneriveien address)
- Other notable agencies
- Freelance community

**Step 2: Research fashion and streetwear**
- Norwegian fashion brands with Løkka base
- Vintage / secondhand culture (Fretex, Robot, etc.)
- Designer boutiques
- Concept stores

**Step 3: Research creative workspaces**
- Mesh coworking (if on Løkka)
- Other coworking spaces
- Creative office communities (Schous kulturkvartal, Vulkan)
- Artist studios and ateliers

**Step 4: Research Vulkan as creative hub**
- Aspelin Ramm's development vision
- Mathallen as food design concept
- Dansens Hus integration
- Westerdals history at Vulkan (before merger/move)

**Step 5: Research education and creative industry**
- KHiO (Kunsthøgskolen i Oslo): departments, notable alumni, Løkka campus
- Westerdals: history, programs, impact on neighborhood
- Creative industry statistics for the area (if available)

**Step 6: Research notable designers and creatives**
- Industrial designers, graphic designers, illustrators based on Løkka
- Design awards and recognition
- International projects originating from the neighborhood

**Step 7: Write design-kreativ.json**
Create `src/data/biblioteket/kultur/design-kreativ.json`:

```json
{
  "id": "design-kreativ",
  "title": "Design og Kreativ Næring på Grünerløkka",
  "subtitle": "Fra Snøhetta til streetwear – et kreativt kraftsenter",
  "intro": "...",
  "sections": [
    { "id": "design", "title": "Grafisk Design", "description": "..." },
    { "id": "mote", "title": "Mote og Streetwear", "description": "..." },
    { "id": "arbeidsplasser", "title": "Kreative Arbeidsplasser", "description": "..." },
    { "id": "vulkan", "title": "Vulkan som Kreativt Hub", "description": "..." },
    { "id": "utdanning", "title": "Utdanning", "description": "..." }
  ],
  "agencies": [...],
  "fashionBrands": [...],
  "workspaces": [...],
  "creativeHubs": [...],
  "educationInstitutions": [...],
  "notableDesigners": [...],
  "sources": [...],
  "claims": [...],
  "researchMetadata": { "lastVerified": "2026-03-02", "coverageScore": 0.75, "staleAfterDays": 180 },
  "crossReferences": [...],
  "metadata": { ... }
}
```

**Step 8: Validate JSON**
Run: `node -e "const d = require('./src/data/biblioteket/kultur/design-kreativ.json'); console.log('OK:', d.agencies.length, 'agencies')"`

---

## Phase 2: Consolidation

This phase runs after ALL 7 research tasks complete.

---

### Task 8: Consolidate Cross-References and Master Data

**Files:**
- Modify: `src/data/biblioteket/kultur/grunerlokka_master_alt.json`
- Modify: All 7 kultur JSON files (cross-references)

**Step 1: Read all updated JSON files**
Read all 7 kultur data files to understand new data points.

**Step 2: Update master_alt.json indexes**
Add new people, venues, places, works discovered in research to:
- `indexes.people[]`
- `indexes.venues_and_institutions[]`
- `indexes.geographical_places[]`
- `indexes.works_and_publications[]`
- `indexes.groups_and_bands[]`

**Step 3: Add arkitektur and design to master timeline**
Add new timeline entries for:
- Architecture milestones (Schous bryggeri, Paulus kirke, Vulkan)
- Design milestones (Snøhetta, Westerdals, Mesh)

**Step 4: Update source_files list**
Add `arkitektur.json` and `design-kreativ.json` to `source_files` array.

**Step 5: Update cross-references in all files**
Each file's `crossReferences` array should link to relevant entries in other sections:
- Arkitektur → Historie (byfornyelsen), Billedkunst (Munch addresses)
- Design → Arkitektur (Vulkan), Kultur master (creative industry)
- Jazz → Billedkunst (album art), Teater (Parkteatret)
- etc.

**Step 6: Validate all JSON files**
Run: `npm run verify`
Expected: All checks pass

**Step 7: Commit research data**
```bash
git add src/data/biblioteket/kultur/
git commit -m "feat(biblioteket): deep research enrichment for all kultur sections

- Enriched jazz, hiphop, film, teater, billedkunst with verified data
- Added arkitektur & byrom section (new)
- Added design & kreativ næring section (new)
- All claims verified to 0.85+ confidence
- Updated master cross-references"
```

---

## Phase 3: Implementation

---

### Task 9: Add Loader Functions for New Sections

**Files:**
- Modify: `src/lib/loaders/biblioteket-loader.ts`

**Step 1: Add static imports for new JSON files**
At top of file, add:
```typescript
import arkitekturData from '@/data/biblioteket/kultur/arkitektur.json';
import designKreativData from '@/data/biblioteket/kultur/design-kreativ.json';
```

**Step 2: Add TypeScript interfaces for Arkitektur**
After BilledkunstData section (~line 598), add interfaces:
```typescript
export interface ArkitekturData {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { id: string; title: string; description: string }[];
  buildingStyles: BuildingStyle[];
  urbanRenewal: UrbanRenewal;
  iconicBuildings: IconicBuilding[];
  parks: Park[];
  architects: Architect[];
  heritageStatus: HeritageItem[];
  sources?: SourceItem[];
  claims?: ClaimEvidence[];
  researchMetadata?: ResearchMetadata;
  crossReferences?: CrossReference[];
  metadata: Record<string, number | string>;
}
// ... sub-interfaces based on actual JSON structure
```

**Step 3: Add TypeScript interfaces for Design**
```typescript
export interface DesignKreativData {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: { id: string; title: string; description: string }[];
  agencies: DesignAgency[];
  fashionBrands: FashionBrand[];
  workspaces: Workspace[];
  creativeHubs: CreativeHub[];
  educationInstitutions: EducationInstitution[];
  notableDesigners: NotableDesigner[];
  sources?: SourceItem[];
  claims?: ClaimEvidence[];
  researchMetadata?: ResearchMetadata;
  crossReferences?: CrossReference[];
  metadata: Record<string, number | string>;
}
// ... sub-interfaces based on actual JSON structure
```

**Step 4: Add loader functions**
```typescript
export function getArkitekturData(): ArkitekturData {
  return arkitekturData as ArkitekturData;
}

export function getDesignKreativData(): DesignKreativData {
  return designKreativData as DesignKreativData;
}
```

**Step 5: Run type-check**
Run: `npm run type-check`
Expected: PASS

**Step 6: Commit**
```bash
git add src/lib/loaders/biblioteket-loader.ts
git commit -m "feat(biblioteket): add loader functions for arkitektur and design-kreativ"
```

---

### Task 10: Build Jazz Page

**Files:**
- Create: `src/app/main-board/biblioteket/kultur/jazz/page.tsx`

**Step 1: Build the jazz page**
Follow the pattern from `teater/page.tsx` and `billedkunst/page.tsx`:
- Hero section with blue/indigo gradient
- Stats: timeline periods, venues, artists, festivals
- Timeline section (5 periods with expandable events)
- Venues section (4 venues with status badges)
- Artists section (7+ artists with bio, awards, instruments)
- Festivals section (2+ festivals)
- Back link to kultur main page

Use same animation variants (heroVariants, containerVariants, cardVariants) as other pages.
Import data: `import { getJazzData } from '@/lib/loaders/biblioteket-loader';`

**Step 2: Verify page renders**
Run: `npm run dev` and visit `/main-board/biblioteket/kultur/jazz`
Expected: Page renders with all data

**Step 3: Run type-check**
Run: `npm run type-check`
Expected: PASS

**Step 4: Commit**
```bash
git add src/app/main-board/biblioteket/kultur/jazz/
git commit -m "feat(biblioteket): add jazz subsection page"
```

---

### Task 11: Build Hiphop Page

**Files:**
- Create: `src/app/main-board/biblioteket/kultur/hiphop/page.tsx`

**Step 1: Build the hiphop page**
Follow same pattern:
- Hero section with red/orange gradient (urban feel)
- Stats: sections, artists, crews, events
- X-Ray section (founded details, highlights)
- Breakdance timeline (interactive timeline)
- Graffiti section (Hall of Fame history, pioneers)
- Beat-producers section
- Artists grid (6+ artists)
- Crews section (3+ crews)
- Events section (2+ events)

Import data: `import { getHiphopData } from '@/lib/loaders/biblioteket-loader';`

**Step 2: Verify page renders**
Run dev server, visit `/main-board/biblioteket/kultur/hiphop`

**Step 3: Run type-check**
Run: `npm run type-check`

**Step 4: Commit**
```bash
git add src/app/main-board/biblioteket/kultur/hiphop/
git commit -m "feat(biblioteket): add hiphop subsection page"
```

---

### Task 12: Build Arkitektur Page

**Files:**
- Create: `src/app/main-board/biblioteket/kultur/arkitektur/page.tsx`

**Step 1: Build the arkitektur page**
- Hero section with stone/gray/warm gradient
- Stats: building styles, iconic buildings, parks, heritage sites
- Building styles timeline (visual progression through eras)
- Byfornyelsen section (urban renewal story with key dates)
- Iconic buildings grid (cards with images, year, architect)
- Parks section (4+ parks with history)
- Heritage status section
- Back link to kultur main page

Import: `import { getArkitekturData } from '@/lib/loaders/biblioteket-loader';`

**Step 2: Verify and type-check**

**Step 3: Commit**
```bash
git add src/app/main-board/biblioteket/kultur/arkitektur/
git commit -m "feat(biblioteket): add arkitektur og byrom subsection page"
```

---

### Task 13: Build Design & Kreativ Page

**Files:**
- Create: `src/app/main-board/biblioteket/kultur/design/page.tsx`

**Step 1: Build the design page**
- Hero section with teal/cyan gradient (modern/creative feel)
- Stats: agencies, brands, workspaces, education
- Design agencies section
- Fashion & streetwear section
- Creative workspaces section
- Vulkan hub section
- Education section
- Back link to kultur main page

Import: `import { getDesignKreativData } from '@/lib/loaders/biblioteket-loader';`

**Step 2: Verify and type-check**

**Step 3: Commit**
```bash
git add src/app/main-board/biblioteket/kultur/design/
git commit -m "feat(biblioteket): add design og kreativ næring subsection page"
```

---

### Task 14: Update Main Kultur Page Navigation

**Files:**
- Modify: `src/app/main-board/biblioteket/kultur/page.tsx`

**Step 1: Add navigation cards for new sections**
Find the subsection navigation grid and add 2 new cards:
- Arkitektur & Byrom (building icon/emoji, link to `/main-board/biblioteket/kultur/arkitektur`)
- Design & Kreativ Næring (palette icon/emoji, link to `/main-board/biblioteket/kultur/design`)

Update the grid from 5 to 7 sections.

**Step 2: Update stats section**
If the stats section counts subsections, update to reflect 7 total.

**Step 3: Verify navigation**
Run dev server, verify all 7 subsection links work from main kultur page.

**Step 4: Commit**
```bash
git add src/app/main-board/biblioteket/kultur/page.tsx
git commit -m "feat(biblioteket): add arkitektur and design navigation to kultur main page"
```

---

### Task 15: Update Existing Pages with Enriched Data

**Files:**
- Modify: `src/app/main-board/biblioteket/kultur/film/page.tsx` (if new data fields added)
- Modify: `src/app/main-board/biblioteket/kultur/teater/page.tsx` (if new data fields added)
- Modify: `src/app/main-board/biblioteket/kultur/billedkunst/page.tsx` (if new data fields added)

**Step 1: Review what new data was added in Phase 1**
Check if any new fields or arrays were added that existing pages should display.

**Step 2: Update pages if needed**
- If film.json now has `tvSeries`, consider adding a section
- If teater.json has new venue history entries, they render automatically
- If billedkunst.json has new galleries, they render automatically (artVenues array)

**Step 3: Verify all pages render correctly**
Visit each page in dev mode.

**Step 4: Commit if changes were made**
```bash
git add src/app/main-board/biblioteket/kultur/
git commit -m "feat(biblioteket): update existing kultur pages with enriched data"
```

---

### Task 16: Final Build and Verification

**Files:** None (verification only)

**Step 1: Run full verification suite**
```bash
npm run verify
npm run type-check
npm run lint
npm run test
```
Expected: All pass

**Step 2: Run production build**
```bash
npm run build
```
Expected: Build succeeds, all static pages generated

**Step 3: Verify page count**
Check that static pages increased (should add ~4 new pages: jazz, hiphop, arkitektur, design).

**Step 4: Final commit and push**
```bash
git add -A
git commit -m "feat(biblioteket): complete kultur deep research enrichment

- 5 existing sections enriched with verified data (0.85+ confidence)
- 2 new sections: Arkitektur & Byrom, Design & Kreativ Næring
- 4 new pages built (jazz, hiphop, arkitektur, design)
- Master cross-references updated
- All verification checks pass"
git push
```

---

## Summary

| Phase | Tasks | Parallel? | Estimated Steps |
|-------|-------|-----------|-----------------|
| Phase 1: Research | Tasks 1-7 | All 7 parallel | ~56 steps |
| Phase 2: Consolidate | Task 8 | Sequential | ~7 steps |
| Phase 3: Implement | Tasks 9-16 | Tasks 10-13 parallel, rest sequential | ~32 steps |
| **Total** | **16 tasks** | | **~95 steps** |

**Parallelism map:**
```
Phase 1: [T1] [T2] [T3] [T4] [T5] [T6] [T7]  (all parallel)
Phase 2:              [T8]                       (sequential)
Phase 3: [T9] → [T10] [T11] [T12] [T13]        (T10-13 parallel after T9)
          → [T14] → [T15] → [T16]               (sequential)
```
