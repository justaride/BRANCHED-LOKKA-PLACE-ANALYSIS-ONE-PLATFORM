# Løkka Gardeierforening Platform - Claude Context

> Multi-tenant property analysis platform for Grünerløkka, Oslo
> **Status:** 99% complete | **Live:** https://lokka-gardeierforening-platform.vercel.app

---

## Quick Reference

```yaml
Stack: Next.js 16.0.8 | React 19.2 | TypeScript (strict) | Tailwind CSS 4 | Recharts
Deploy: Vercel (auto-deploy from main)
Dev: npm run dev → localhost:3001
Build: npm run build (runs verify + type-check)
Test: npm run test (Jest, 70% coverage threshold)
```

---

## Project Architecture

### Tenant Structure (10 total)
```
/                    → Landing page (public)
/main-board          → Natural State analysis hub
/aspelin-ramm        → 5 properties (includes Mathallen 1-min analysis)
/brodrene-evensen    → 3 properties
/eiendomsspar        → 2 properties
/malling-co          → 1 property (Front Real Estate)
/maya-eiendom        → 4 properties
/roger-vodal         → 3 properties
/sio                 → 3 properties (student housing)
/spabo               → 22 properties (largest portfolio)
/carucel             → 1 property (Olaf Ryes plass 4)
```

### Critical File Paths

| Purpose | Path |
|---------|------|
| **Entry Point** | `src/app/page.tsx` |
| **Middleware** | `src/middleware.ts` |
| **Tenant Config** | `src/config/tenants.ts` |
| **Data Loaders** | `src/lib/loaders/{tenant}.ts` |
| **Property Data** | `src/data/{tenant}/{property-id}.json` |
| **Main Board Data** | `src/data/main-board/` |
| **Types** | `src/types/` |
| **Components** | `src/components/` |
| **Utilities** | `src/lib/utils/` |
| **Static Assets** | `public/images/` |
| **Verification** | `scripts/verify-project.js` |

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
import { ensureEiendomDefaults } from '@/lib/utils/property-defaults';

export function loadEiendom(id: string): Eiendom | null {
  const data = properties[id];
  if (!data) return null;
  return ensureEiendomDefaults(data); // REQUIRED for null-safety
}
```

### Chart Data (Recharts)
```typescript
import { safeNumber, filterValidRecords } from '@/lib/utils/safe-data';

// Always sanitize data before passing to Recharts
const cleanData = filterValidRecords(rawData, ['value', 'count']);
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
Vercel requires static imports for data. Use index patterns:
```typescript
// CORRECT
import bellonabygget from '@/data/aspelin-ramm/bellonabygget.json';
const properties = { bellonabygget, ... };

// WRONG - fails on Vercel
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
const publicRoutes = ['/', '/login', '/api/auth', '/data'];
```

### 4. Image Paths
- Company logos: `/images/companies/{tenant}.{jpg|png|webp}`
- Property images: `/images/properties/{tenant}/{property-id}/`
- Area images: `/images/areas/`

### 5. Authentication Cookies
Per-tenant cookies with 7-day expiry:
- Pattern: `auth-{tenant-slug}`
- Test password: `test123` (all tenants)

---

## Build & Deploy

### Pre-build Checks (automatic)
```bash
npm run build
# Runs: npm run verify && npm run type-check && next build
```

### Manual Verification
```bash
npm run verify      # Silent failure detection (257 JSON files)
npm run type-check  # TypeScript validation
npm run lint        # ESLint (64 issues acceptable)
npm run test        # Jest unit tests
```

### Deploy
```bash
git add . && git commit -m "message" && git push
# Vercel auto-deploys from main branch

# Or manual:
vercel --prod
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

| Metric | Value |
|--------|-------|
| Static Pages | 111 |
| JSON Data Files | 257 |
| Properties | 44 |
| Tenants | 10 |
| ESLint Issues | 64 (acceptable) |
| Test Coverage | 70% threshold |
| Build Time | ~30s |

---

## Quick Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3001)
npm run build            # Production build
npm run test             # Run Jest tests
npm run test:watch       # Tests in watch mode
npm run verify           # Silent failure detection

# Git workflow
git status && git diff   # Check changes
git add -p               # Stage interactively
git commit -m "msg"      # Commit
git push                 # Deploy (auto via Vercel)

# Debugging
npm run type-check       # TypeScript errors
npm run lint             # ESLint issues
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

- **Live Site:** https://lokka-gardeierforening-platform.vercel.app
- **Natural State:** https://naturalstate.no
- **Feedback Form:** https://forms.gle/btff6meFZSHaYHUE9

---

*Last Updated: December 9, 2025*
*Maintained by: Claude Code*
