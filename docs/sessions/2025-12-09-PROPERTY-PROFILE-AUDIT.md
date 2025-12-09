# Session Log: Property Profile Quality Audit

**Date:** December 9, 2025
**Focus:** Utvidet Eiendomsprofil Quality Assessment & Standardization Plan

---

## Objective

Analyze the quality and consistency of "Utvidet Eiendomsprofil" content across all 44 properties in 9 tenant portfolios to establish standards and identify gaps.

---

## Key Findings

### Backend Data Structure

All property profile text content is stored in JSON files:
- **Location:** `src/data/{tenant}/{property-id}.json`
- **Content Field:** `tilleggsinfo.historikk` (Markdown-formatted string)
- **Rendering:** `EiendomsprofilExpander.tsx` component via ReactMarkdown
- **Types:** Defined in `src/types/eiendom.ts`

### Quality Assessment Results

**Total Properties Audited:** 44

| Category | Count | Percentage |
|----------|-------|------------|
| COMPLETE | 13 | 29% |
| GOOD | 13 | 29% |
| BASIC | 5 | 11% |
| STUB | 8 | 18% |
| LEGACY | 5 | 11% |

### Tenant Breakdown

| Tenant | Count | Status | Action Required |
|--------|-------|--------|-----------------|
| aspelin-ramm | 5 | All GOOD/COMPLETE | None |
| spabo | 22 | 17 good, 5 need work | Medium priority |
| maya-eiendom | 4 | All GOOD/COMPLETE | None |
| front-real-estate | 1 | GOOD | None |
| brodrene-evensen | 3 | All BASIC | Add building details |
| carucel | 1 | BASIC | Expand content |
| roger-vodal | 3 | All STUBS | Full profile creation |
| sio | 3 | All STUBS | Full profile creation |
| eiendomsspar | 2 | LEGACY structure | Data migration + content |

---

## Critical Issues Identified

### 1. Legacy Data Structure (CRITICAL)

**Affected:** eiendomsspar (2 properties)
- `nedre-foss-gard.json`
- `thorvald-meyers-gate-2.json`

**Problem:** Uses deprecated `aktorer[]` array instead of modern `naringsaktorer.actors` structure.

**Solution:** Migrate to current TypeScript interface defined in `src/types/eiendom.ts`

### 2. Placeholder Content (HIGH)

**Affected:** 9 properties with <100 chars historikk

Roger-Vodal (3):
- markveien-48.json: "Historikk og informasjon om eiendommen kommer her."
- markveien-53.json: "Historikk og informasjon om eiendommen kommer her."
- thorvald-meyersgate-44.json: "Historikk og informasjon om eiendommen kommer her."

SiO (3):
- brenneriveien-11.json: "Historikk og informasjon om eiendommen kommer her."
- marselis-gate-24.json: "Historikk og informasjon om eiendommen kommer her."
- trondheimsveien-25-29.json: "Historikk og informasjon om eiendommen kommer her."

**Solution:** Research and create comprehensive property profiles

### 3. Missing Key Data Fields

| Field | Coverage | Gap |
|-------|----------|-----|
| Byggeår (build year) | 50% | 22 properties |
| Arkitekt (architect) | 55% | 20 properties |
| Eierskap (ownership) | 45% | 24 properties |
| Vernestatus (heritage) | 32% | 30 properties |

### 4. Template File in Production

**File:** `src/data/spabo/template.json`
**Issue:** Placeholder template file should not be in production data
**Solution:** Remove or exclude from build

---

## Best Practice Examples

### Excellent Quality (Reference)

1. **spabo/thorvald-meyers-gate-25.json** (Hexeberggården)
   - 9,203 characters historikk
   - 15 notater
   - Full fredning documentation
   - Complete ownership chain
   - Historical timeline 1890-present

2. **spabo/sofienberggata-6.json**
   - 8,672 characters historikk
   - 14 notater
   - Full eierstruktur (borettslag details)
   - Technical specifications

3. **aspelin-ramm/bellonabygget.json**
   - 3,591 characters historikk
   - 6 notater
   - Award documentation (Byggeskikkprisen)
   - Sustainability details (FutureBuilt)

### Content Sections in Best Examples

```
1. Om Eiendommen (introduction)
2. Nøkkelinformasjon (key data)
   - Matrikkel og adresser
   - Bygningstekniske spesifikasjoner
3. Eierskap (ownership chain)
4. Historikk og Utvikling (timeline)
5. Vernestatus og Regulering (heritage/planning)
6. Beliggenhet og Kontekst (location)
7. Nåværende Bruk og Leietakere (current use)
8. Handelsområde (business environment)
9. Utviklingspotensial (future potential)
10. I dag (current summary)
```

---

## Proposed Standards

### Minimum Requirements for "Complete" Status

| Field | Requirement |
|-------|-------------|
| `historikk` | ≥2,000 characters with structured sections |
| `notater` | ≥6 bullet points of key facts |
| Byggeår | Required |
| Arkitekt | Required (or documented as unknown) |
| Eierskap | Required |
| Coordinates | Required |
| `naringsaktorer` | Modern structure with actors array |

### Recommended Markdown Structure

```markdown
## Om Eiendommen
[Brief intro paragraph - building type, significance, location context]

### Nøkkelinformasjon

**Matrikkel og adresser:**
- Adresse: [Full address]
- Gårdsnummer (gnr): [number]
- Bruksnummer (bnr): [number]
- Koordinater: [lat, lng]

**Bygningstekniske spesifikasjoner:**
- Totalareal: [m² BTA]
- Antall etasjer: [number]
- Konstruksjon: [type]
- Byggeår: [year]
- Arkitekt: [name]
- Stil: [architectural style]
- Energimerking: [rating]

### Eierskap
- Juridisk enhet: [company name + org.nr]
- Forvalter: [management company]
- Eierstruktur: [ownership chain]

### Historikk og Utvikling
[Timeline format - year by year key events]

### Vernestatus og Regulering
- Fredningsstatus: [status]
- Kulturminne-ID: [if applicable]
- Gjeldende planer: [zoning]

### Beliggenhet og Kontekst
- Strategisk posisjon: [description]
- Nærområde: [landmarks]
- Kollektiv: [transit options]
- Walk Score: [score]

### Nåværende Bruk og Leietakere
[Current tenants and their businesses]

### I dag
[Concluding summary paragraph]
```

---

## Action Plan

### Phase 1: Critical Fixes (Immediate)
1. Migrate eiendomsspar properties to modern data structure
2. Remove/exclude template.json from spabo

### Phase 2: Content Development (High Priority)
3. Create full profiles for roger-vodal (3 properties)
4. Create full profiles for sio (3 properties)
5. Complete eiendomsspar profiles after migration

### Phase 3: Enhancement (Medium Priority)
6. Add byggeår/arkitekt to brodrene-evensen (3 properties)
7. Expand carucel profile
8. Add missing næringsaktører to markveien-57

### Phase 4: Quality Assurance
9. Audit all notater arrays (minimum 6 facts)
10. Verify leietaker information is current
11. Add vernestatus research for historic buildings

---

## Technical Details

### File Locations

**Type Definitions:**
- `src/types/eiendom.ts`

**Data Files:**
- `src/data/{tenant}/*.json`

**Rendering Components:**
- `src/components/property/EiendomsprofilExpander.tsx`
- `src/app/{tenant}/eiendommer/[id]/page.tsx`

**Loaders:**
- `src/lib/loaders/{tenant}.ts`

**Utilities:**
- `src/lib/utils/property-defaults.ts` (sanitization)

### Data Loading Pattern

All loaders use `ensureEiendomDefaults()` for null-safety:

```typescript
export async function loadEiendom(id: string): Promise<Eiendom | null> {
  const eiendom = await import(`@/data/{tenant}/${id}.json`);
  return ensureEiendomDefaults(eiendom.default, TENANT);
}
```

---

## Documentation Updates

- [x] PROJECT_STATUS.md - Added Property Profile Quality Initiative section
- [x] PROJECT_STATUS.md - Updated In Progress section
- [x] Created session log: docs/sessions/2025-12-09-PROPERTY-PROFILE-AUDIT.md

---

## Next Steps

1. Prioritize eiendomsspar migration (breaks current TypeScript expectations)
2. Begin research for roger-vodal and sio properties
3. Consider creating a property profile template generator tool
4. Establish content review process for new properties

---

*Session completed: December 9, 2025*
*Audited by: Claude Code*
