# Løkka Gardeierforening Platform - Claude Context

> Multi-tenant property analysis platform for Grünerløkka, Oslo
> **Status:** 99% complete | **Live:** Coolify production (Cloudflare domain)

---

## Quick Reference

```yaml
Stack: Next.js 16.0.8 | React 19.2 | TypeScript (strict) | Tailwind CSS 4 | Recharts | Leaflet
Auth: Shared password → JWT session (jose) | All members get full access
Deploy: Coolify (Hetzner) behind Cloudflare (live)
Dev: npm run dev → localhost:3001
Build: npm run build (runs verify + type-check)
Test: npm run test (Jest, 70% coverage threshold)
```

---

## Relaterte Prosjekter

```yaml
Løkka Internal Dashboard:
  path: "/Users/gabrielboen/Documents/Løkka Internal Dashboard"
  purpose: "Prosjektstyring, intern oversikt, oppgavefordeling"
  relationship: "Dette prosjektet (platform) = kundevendt | Dashboard = intern styring"

# Når du trenger kontekst fra begge prosjekter:
# Si: "Les CLAUDE.md fra /Users/gabrielboen/Documents/Løkka Internal Dashboard"
```

**Kobling mellom prosjektene:**

- Platform viser data til gårdeiere (tenants)
- Dashboard koordinerer Natural State-teamet internt
- Samme tenant-struktur brukes i begge

---

## Project Architecture

### Tenant Structure (10 total)

```
/                    → Landing page (public)
/main-board          → Natural State analysis hub
/aspelin-ramm        → 6 properties (Mathallen + Vulkan Området 5-min analysis)
/brodrene-evensen    → 3 properties
/eiendomsspar        → 2 properties
/malling-co          → 1 property (Front Real Estate)
/maya-eiendom        → 4 properties
/roger-vodal         → 9 properties (7 with 5-min analysis)
/sio                 → 3 properties (student housing)
/spabo               → 22 properties (largest portfolio)
/carucel             → 1 property (Olaf Ryes plass 4)
```

### Critical File Paths

| Purpose             | Path                                   |
| ------------------- | -------------------------------------- |
| **Entry Point**     | `src/app/page.tsx`                     |
| **Middleware**      | `src/middleware.ts`                    |
| **Tenant Config**   | `src/config/tenants.ts`                |
| **Data Loaders**    | `src/lib/loaders/{tenant}.ts`          |
| **Property Data**   | `src/data/{tenant}/{property-id}.json` |
| **Main Board Data** | `src/data/main-board/`                 |
| **Types**           | `src/types/`                           |
| **Components**      | `src/components/`                      |
| **Utilities**       | `src/lib/utils/`                       |
| **Static Assets**   | `public/images/`                       |
| **Verification**    | `scripts/verify-project.js`            |

---

## Data Patterns

### Property JSON Structure

```typescript
// src/data/{tenant}/{property-id}.json
{
  "id": "property-slug",
  "name": "Property Name",
  "address": "Street Address",
  "tenant": "tenant-slug",
  "plaaceScreenshot": "/images/plaace/...",
  "nokkeldata": { /* key metrics */ },
  "naringsaktorer": { /* business actors */ },
  "demographics": { /* population data */ }
}
```

### Loader Pattern (ALL loaders must follow this)

```typescript
import { ensureEiendomDefaults } from "@/lib/utils/property-defaults";

export function loadEiendom(id: string): Eiendom | null {
  const data = properties[id];
  if (!data) return null;
  return ensureEiendomDefaults(data); // REQUIRED for null-safety
}
```

### Chart Data (Recharts)

```typescript
import { safeNumber, filterValidRecords } from "@/lib/utils/safe-data";

// Always sanitize data before passing to Recharts
const cleanData = filterValidRecords(rawData, ["value", "count"]);
```

---

## Tenant Slugs (use exactly as written)

```
aspelin-ramm | brodrene-evensen | carucel | eiendomsspar
main-board | malling-co | maya-eiendom | roger-vodal | sio | spabo
```

---

## Common Tasks

### Add New Property

1. Create JSON: `src/data/{tenant}/{property-id}.json`
2. Add images: `public/images/properties/{tenant}/{property-id}/`
3. Update loader: `src/lib/loaders/{tenant}.ts` (add to properties object)
4. Run: `npm run build` to verify

### Add New Analysis (Main Board)

1. Create data: `src/data/main-board/analyser/{analysis-id}/`
2. Create page: `src/app/main-board/analyser/{analysis-id}/page.tsx`
3. Add to index: `src/data/main-board/analyser/index.json`

### Modify Tenant

1. Config: `src/config/tenants.ts`
2. Layout: `src/app/{tenant}/layout.tsx`
3. Loader: `src/lib/loaders/{tenant}.ts`

---

## Known Gotchas

### 1. Static Imports Required

Production builds require static imports for data. Use index patterns:

```typescript
// CORRECT
import bellonabygget from '@/data/aspelin-ramm/bellonabygget.json';
const properties = { bellonabygget, ... };

// WRONG - dynamic import paths break build-time bundling
const data = await import(`@/data/${tenant}/${id}.json`);
```

### 2. Recharts Null Safety

Recharts crashes on null/undefined values. Always use:

```typescript
import { safeNumber } from '@/lib/utils/safe-data';
value={safeNumber(item.value, 0)}
```

### 3. Middleware Public Routes

Update `src/middleware.ts` to allow new public paths:

```typescript
const publicRoutes = ["/", "/login", "/api/auth", "/data"];
```

### 4. Image Paths

- Company logos: `/images/companies/{tenant}.{jpg|png|webp}`
- Property images: `/images/properties/{tenant}/{property-id}/`
- Area images: `/images/areas/`

### 5. Authentication

Unified password login with single JWT cookie (90-day expiry, sliding refresh at 30 days):

- Cookie: `lokka-session` (unified JWT with all tenants)
- Auth: Single shared password (`PLATFORM_PASSWORD` env var) → JWT with access to all tenants
- No per-tenant gatekeeping — all authenticated users see everything
- Key files: `src/lib/auth.ts`, `src/middleware.ts`, `src/app/api/auth/route.ts`
- Cloudflare Zero Trust handles Google auth for Natural State team (not in app code)

### 6. JSON Field Names with Special Characters

TypeScript interfaces must match JSON field names EXACTLY, including punctuation:

```typescript
// JSON has: "No.": 136
// WRONG - silently fails (undefined)
interface Data {
  No: number;
}
item.No; // undefined!

// CORRECT
interface Data {
  "No.": number;
}
item["No."]; // 136 ✓
```

### 7. Copy-Paste Data Verification

When creating new pages by copying existing ones, ALWAYS verify hardcoded data:

- Check JSON source files for correct values
- Compare highlights (visits, businesses, revenue)
- Verify percentages match calculated totals
- Example: Nedre TMG had Øvre's data (13,614 → 21,143 visits)

### 8. Chart Components vs Static HTML

Two rendering approaches exist in analyser pages:

- **Chart components** (2024-arsrapport): Use `basePath` prop, fetch JSON dynamically
- **Static HTML** (mikro-områder): Hardcoded divs/tables, no interactivity
  If user expects charts but sees text, check which approach the page uses.

### 9. Static Loader Registration Required

When adding new properties with 1-min/5-min analysis data:

1. Add data files: `src/data/{tenant}/{property-id}/1min/*.json`
2. **MUST register in** `src/lib/loaders/one-min-loader.ts` → `STATIC_DATA` object
3. Without registration, `loadOneMinAnalysisData()` returns `null` and charts won't render

```typescript
// Example registration:
'carucel/olaf-ryes-plass-4': async () => {
  const [...] = await Promise.all([...]);
  return { demografi, konkurransebilde, korthandel, bevegelse, ... };
},
```

### 10. JSON Data Structure Completeness

1-min/5-min analysis JSON files must have **ALL required sections** matching TypeScript interfaces:

- `demografi.json`: Must have `nøkkeltall`, `aldersfordeling`, `inntektsfordeling`, `husholdninger`, `medianInntektPerHusholdningstype`, `demografiOverTid`
- `korthandel.json`: Must have `nøkkeltall` (dagligKorthandel, totalKorthandel, etc.), `tidsserie`, `årligVekst`, `korthandelPerUkedag`
- `konkurransebilde.json`: Must have `nøkkeltall`, `konseptmiks`, `kjederVsUavhengige`
- `bevegelse.json`: Must have `nøkkeltall`, `perTime`, `perUkedag`, `bevegelsesmønster`

**Field name conventions (Norwegian):**

- Use `kategori` NOT `category`
- Use `antall` NOT `value`
- Use `år` NOT `year`
- Use `dag` with Norwegian abbreviations: `man.`, `tir.`, `ons.`, `tor.`, `fre.`, `lør.`, `søn.`

**✅ AUDIT COMPLETE (December 10, 2025):**
All 11 properties with 1-min/5-min data have been audited and fixed:

- 354 field naming issues resolved across 27 JSON files
- Validation script: `scripts/validate-analysis-json.js`
- Fix script: `scripts/fix-analysis-json.js`
- Validation integrated into `npm run verify`

### 11. Semantic Data Interpretation

Data may represent something different than field names suggest. Example:

- `antall-hus.json` in sammenligning-2024: Values like "Eneboliger: 5939.13" for Grünerløkka
- **NOT** building counts in the area (impossible - Grünerløkka has no eneboliger)
- **ACTUALLY** distribution of visitors by their housing type at home

**Run `npm run audit:data` to identify semantic anomalies.**

### 12. Aktør Omsetning Enheter (mill vs k)

Plaace raw data bruker to enheter for omsetning:

- `"NOK X mill."` → millioner (topp ~300 aktører)
- `"NOK Xk"` → tusen NOK (bunn ~50 aktører, under 1M omsetning)

**Fikset 2026-03-29:** 49 aktører hadde `omsetning`-feltet feilparsed — `970k` ble lagret som `970` (mill) i stedet for `0.97`. Total omsetning gikk fra 27,748M til 4,072M (kryssvalidert mot Plaace handelsomsetning 4,265M).

**Ved import av nye Plaace-data:** Sjekk alltid `omsetning_raw`-feltet for enhet (`mill.` vs `k`).

### 13. Aktører Utenfor Kartutsnitt

21 av 350 aktører i 2025-arsrapport har adresse utenfor Grünerløkka:

- **Kjeder registrert på hovedkontor** (Lilleakerveien, Bogstadveien, Sørkedalsveien)
- **Holdingselskap med "OSLO"** som adresse (4 stk)
- **Feil Plaace-registrering** (f.eks. "Sabrura Markveien AS" på Olav Tryggvasons Gate)

Disse vises i aktørtabellen men ikke på kartet. Ved opprydding kan de flyttes til riktig adresse eller merkes som "utenfor område".

---

## Build & Deploy

### Pre-build Checks (automatic)

```bash
npm run build
# Runs: npm run verify && npm run type-check && next build
```

### Manual Verification

```bash
npm run verify      # Silent failure detection (329 JSON files)
npm run audit:data  # Semantic data validation
npm run type-check  # TypeScript validation
npm run lint        # ESLint (0 issues)
npm run test        # Jest unit tests
```

### Deploy

```bash
git add . && git commit -m "message" && git push
# Coolify auto-deploys from main branch webhook
```

---

## File Organization

### Keep in Root (essential)

```
README.md           # Project overview
CLAUDE.md           # This file (Claude context)
PROJECT_STATUS.md   # Current state & progress
package.json        # Dependencies
```

### Documentation Location

```
docs/
├── architecture/   # Technical decisions
├── sessions/       # Session logs (historical)
└── guides/         # How-to guides
```

---

## Current Health

| Metric                  | Value                                                            |
| ----------------------- | ---------------------------------------------------------------- |
| Static Pages            | 120                                                              |
| JSON Data Files         | 327 (+koordinat-JSON)                                            |
| Properties              | 51                                                               |
| Tenants                 | 10                                                               |
| Aktører (2025)          | 350 totalt, 329 med kartkoordinater                              |
| Aktør Omsetning (2025)  | 4,072M NOK (korrigert fra 27,748M — enhetsfiks mars 2026)       |
| Biblioteket Categories  | 6 (ildsjeler, litteratur, historie, kultur, idrett, mediebildet) |
| Kultur Subsections      | 5 (jazz, hiphop, film, teater, billedkunst)                      |
| Mediebildet Subsections | 5 (avis, tv-film, podcast, digital, akademisk)                   |
| ESLint Issues           | 0 ✅                                                             |
| Data Audit              | 0 CRITICAL ✅ (semantic validation)                              |
| Test Coverage           | 70% threshold                                                    |
| Build Time              | ~30s                                                             |

---

## Quick Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3001)
npm run build            # Production build
npm run test             # Run Jest tests
npm run test:watch       # Tests in watch mode
npm run verify           # Silent failure detection
npm run audit:data       # Semantic data validation (verbose)
npm run audit:data:critical  # Critical issues only

# Git workflow
git status && git diff   # Check changes
git add -p               # Stage interactively
git commit -m "msg"      # Commit
git push                 # Deploy (auto via Coolify)

# Debugging
npm run type-check       # TypeScript errors
npm run lint             # ESLint (clean)
```

---

## Session Continuity

When resuming work:

1. Read `PROJECT_STATUS.md` for current state
2. Check `docs/sessions/` for recent session logs
3. Run `npm run verify` to check project health
4. Run `npm run dev` to start development

When ending session:

1. Update `PROJECT_STATUS.md` with changes
2. Create session log in `docs/sessions/YYYY-MM-DD-SESSION.md`
3. Commit all changes
4. Note any blockers or next steps

---

## Contact & Resources

- **Live Site:** Cloudflare domain -> Coolify app
- **Natural State:** https://naturalstate.no
- **Feedback Form:** https://forms.gle/btff6meFZSHaYHUE9

---

_Last Updated: March 29, 2026_
_Maintained by: Claude Code_

---

## Biblioteket - Kvalitetssikring (Aktiv Sesjon)

### Oversikt

Biblioteket er en digital samling som dokumenterer Grünerløkkas historie og identitet.

**URL:** `/main-board/biblioteket`

### Sider og Datafiler

| Side              | Route                                           | Hoveddata                                   |
| ----------------- | ----------------------------------------------- | ------------------------------------------- |
| **Hovedside**     | `/main-board/biblioteket`                       | Master Timeline, kategorier                 |
| **Ildsjeler**     | `/main-board/biblioteket/ildsjeler`             | 31 lokale helter (14 eksisterende + 17 nye) |
| **Historie**      | `/main-board/biblioteket/historie`              | 170 år byhistorie (40 events)               |
| **Kultur**        | `/main-board/biblioteket/kultur`                | Kunst, musikk, scener (5 subseksjoner)      |
| **→ Jazz**        | `/main-board/biblioteket/kultur/jazz`           | ECM, Oslo Jazzhus, Blå                      |
| **→ Hiphop**      | `/main-board/biblioteket/kultur/hiphop`         | X-Ray, breakdance, graffiti                 |
| **→ Film**        | `/main-board/biblioteket/kultur/film`           | 10 filmer, 6 regissører, 3 kinoer           |
| **→ Teater**      | `/main-board/biblioteket/kultur/teater`         | 9 scener, 3 grupper, stedsspesifikk         |
| **→ Billedkunst** | `/main-board/biblioteket/kultur/billedkunst`    | Munch→gatekunst, fotografer                 |
| **Litteratur**    | `/main-board/biblioteket/litteratur`            | 49 verk (utvidet fra 37)                    |
| **Idrett**        | `/main-board/biblioteket/idrett`                | Grüner IL, Dælenenga, arbeideridretten      |
| **Mediebildet**   | `/main-board/biblioteket/mediebildet`           | 49 mediekilder (2000-2025)                  |
| **→ Avis**        | `/main-board/biblioteket/mediebildet/avis`      | 15 avisartikler                             |
| **→ TV & Film**   | `/main-board/biblioteket/mediebildet/tv-film`   | 10 TV/film-innhold                          |
| **→ Podcast**     | `/main-board/biblioteket/mediebildet/podcast`   | 3 podcaster                                 |
| **→ Digital**     | `/main-board/biblioteket/mediebildet/digital`   | 8 digitalt innhold                          |
| **→ Akademisk**   | `/main-board/biblioteket/mediebildet/akademisk` | 13 akademiske kilder                        |

### Datafiler

```
src/data/biblioteket/
├── ildsjeler/
│   ├── ildsjeler.json        # 31 personer (14 eksisterende + 17 nye)
│   ├── kategorier.json       # 12 kategorier (8 + 4 nye)
│   ├── tidslinje.json        # Hendelser
│   └── places.json           # Steder
├── historie/
│   ├── grunerlokka_timeline.json  # 40 events (1850-2024)
│   ├── grunerlokka_entities.json
│   └── themes.json
├── kultur/
│   ├── grunerlokka_master_alt.json
│   ├── jazz.json             # ECM, Oslo Jazzhus, Blå
│   ├── hiphop.json           # X-Ray, breakdance, graffiti
│   ├── film.json             # NEW: 10 filmer, 6 regissører, 3 kinoer
│   ├── teater.json           # NEW: 9 scener, stedsspesifikk scenekunst
│   └── billedkunst.json      # NEW: Munch→gatekunst, 7 fotografer
├── idrett/
│   └── idrett.json           # Grüner IL, arbeideridretten
├── litteratur/
│   ├── works.json            # 49 verk
│   └── grunerlokka_sources.json
└── mediebildet/
    ├── mediebildet.json      # Hoveddata med metadata
    ├── avis.json             # 15 avisartikler
    ├── tv-film.json          # 10 TV/film-innhold
    ├── podcast.json          # 3 podcaster
    ├── digital.json          # 8 digitalt innhold
    └── akademisk.json        # 13 akademiske kilder
```

### Kvalitetssikring - Prosess

For hver side:

1. **Research-ekstraksjon** - Verifiser at all info fra notater er implementert
2. **Datavalidering** - Sjekk JSON-struktur og konsistens
3. **Språkkvalitet** - Norsk grammatikk, narrativ flyt
4. **Faktasjekk** - Verifiser med eksterne kilder

### Ildsjeler - Faktasjekk Status

| Person            | Fødselsår | Dødsår | Verifisert |
| ----------------- | --------- | ------ | ---------- |
| Anna Rogstad      | 1854      | 1938   | ⏳         |
| Rolf Hofmo        | 1898      | 1966   | ⏳         |
| Randi Spenningsby | -         | -      | ⏳         |
| Magnhild Johansen | -         | -      | ⏳         |
| Jan Vardøen       | 1962      | -      | ⏳         |
| Tim Wendelboe     | 1979      | -      | ⏳         |
| Marianne Westbye  | 1966      | -      | ⏳         |
| Torgny Hasås      | 1951      | -      | ⏳         |
| Vegard Holm       | -         | -      | ⏳         |
| Sollin Sæle       | -         | -      | ⏳         |
| Jon Christensen   | 1943      | 2020   | ⏳         |
| Claire de Wangen  | -         | -      | ⏳         |
| Guro Lidahl       | -         | -      | ⏳         |
| Martin Horntveth  | 1974      | -      | ⏳         |

**Legende:** ⏳ Pending | ✅ Verifisert | ⚠️ Trenger oppdatering | ❌ Feil

### Prioritert Rekkefølge

1. ✅ **Ildsjeler** - 31 personer (14 + 17 nye), 12 kategorier
2. ✅ **Historie** - Timeline utvidet 1850-2024 (40 events, +11 nye 2010-2024)
3. ✅ **Kultur** - Jazz + Hip-hop subsections integrert
4. ✅ **Litteratur** - 49 verk (+12 nye: Braaten, Nilsen, krim, samtid)
5. ✅ **Idrett** - NY seksjon med Grüner IL, arbeideridretten
6. ✅ **Mediebildet** - NY seksjon med 49 mediekilder (5 subseksjoner)
7. 📋 **Hovedside** - Overordnet narrativ (minor updates needed)

### Viktige Komponenter

| Komponent         | Plassering                                      |
| ----------------- | ----------------------------------------------- |
| `MasterTimeline`  | `src/components/biblioteket/MasterTimeline.tsx` |
| `ImageCarousel`   | `src/components/biblioteket/ImageCarousel.tsx`  |
| Loader-funksjoner | `src/lib/loaders/biblioteket-loader.ts`         |
| Carousel-bilder   | `src/lib/constants/carousel-images.ts`          |

### Bilder

```
public/images/biblioteket/
├── lokka-bibliotek-hero.jpg
├── byhistorie-banner-hero.jpg
├── ildsjeler-banner-hero.jpg
├── kultur-banner-hero.jpg
├── litteratur-banner-hero.jpeg
└── idrett-hero.png            # NEW: Grüner IL/Dælenenga hero

public/images/ildsjeler/
└── {person-id}.jpg
```
