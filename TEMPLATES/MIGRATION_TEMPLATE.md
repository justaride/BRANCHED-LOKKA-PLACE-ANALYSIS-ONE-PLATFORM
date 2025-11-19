# Company Site Migration Template

**Version:** 1.0
**Last Updated:** 2025-11-19

This template provides a step-by-step checklist for migrating a company site from the original standalone project to the multi-tenant platform.

---

## Pre-Migration Checklist

### 1. Identify Source Project
- [ ] Locate original project folder
- [ ] Confirm project is backed up
- [ ] Note project structure differences
- [ ] Document any custom features

**Example:**
```bash
Source: ~/Downloads/LØKKA PROJECTS UPDATED AND BACKUPS FOLDER/place-analysis-aspelin-ramm-BACKUP-20251119-143837/
```

### 2. Verify Tenant Configuration
- [ ] Tenant exists in `src/config/tenants.ts`
- [ ] Slug matches folder name convention
- [ ] Display name is correct
- [ ] Features are configured properly
- [ ] Password environment variable is set

**Example:**
```typescript
'aspelin-ramm': {
  slug: 'aspelin-ramm',
  name: 'Aspelin Ramm',
  displayName: 'Eiendomsanalyse - Aspelin Ramm',
  type: 'company',
  passwordEnvVar: 'ASPELIN_RAMM_PASSWORD',
  features: {
    showMainBoardLink: true,
    showEiendommer: true,
    showAnalyser: false,
  },
}
```

### 3. Create Migration Tracking
- [ ] Create branch: `feature/migrate-{company-slug}`
- [ ] Create migration notes file
- [ ] Document any special requirements

---

## Step 1: Data Migration

### 1.1 Create Data Directory Structure
```bash
cd ~/Downloads/lokka-gardeierforening-platform
mkdir -p src/data/companies/{company-slug}
mkdir -p src/data/companies/{company-slug}/properties
mkdir -p src/data/companies/{company-slug}/analysis
```

### 1.2 Copy JSON Data Files
- [ ] Identify all JSON files in original project
- [ ] Copy to new data directory
- [ ] Verify JSON is valid (no syntax errors)
- [ ] Update any hard-coded paths
- [ ] Test imports work

**Checklist of Common Files:**
- [ ] `properties.json` - Property listings
- [ ] `analysis-report.json` - Analysis data
- [ ] `quarterly-data.json` - Quarterly reports (if any)
- [ ] `demografi.json` - Demographic data (if any)
- [ ] `media.json` - Media references (if any)

**Example:**
```bash
# From original project
cp {source}/data/properties.json \
   src/data/companies/aspelin-ramm/properties.json

# Verify
cat src/data/companies/aspelin-ramm/properties.json | jq '.' > /dev/null
echo "✅ Valid JSON"
```

### 1.3 Validate Data Structure
- [ ] Check all required fields exist
- [ ] Verify data types match TypeScript types
- [ ] Test with sample loader function
- [ ] Document any data quirks

---

## Step 2: Type Definitions

### 2.1 Copy/Create Type Files
- [ ] Identify TypeScript types in original project
- [ ] Check if types already exist in platform
- [ ] Create new types if needed: `src/types/{company-slug}.ts`
- [ ] Export types from type file

**Example:**
```typescript
// src/types/aspelin-ramm.ts
export interface Property {
  id: string;
  address: string;
  area: number;
  type: 'residential' | 'commercial';
  // ...
}

export interface PropertyData {
  properties: Property[];
  lastUpdated: string;
}
```

### 2.2 Type Validation
- [ ] Import types in loader
- [ ] TypeScript compile check passes
- [ ] No `any` types used
- [ ] All data fields typed

---

## Step 3: Data Loaders

### 3.1 Create Loader File
```bash
touch src/lib/loaders/{company-slug}.ts
```

### 3.2 Implement Loader Functions
- [ ] One function per JSON file
- [ ] Type-safe imports
- [ ] Error handling
- [ ] Export all functions

**Template:**
```typescript
// src/lib/loaders/aspelin-ramm.ts
import type { PropertyData } from '@/types/aspelin-ramm';

export async function loadProperties(): Promise<PropertyData> {
  const data = await import('@/data/companies/aspelin-ramm/properties.json');
  return data.default as PropertyData;
}

export async function loadAnalysisReport() {
  const data = await import('@/data/companies/aspelin-ramm/analysis-report.json');
  return data.default;
}

// Export all loaders
export const AspelinRammLoaders = {
  loadProperties,
  loadAnalysisReport,
};
```

### 3.3 Test Loaders
- [ ] Create test page that imports loaders
- [ ] Verify data loads correctly
- [ ] Check console for errors
- [ ] Validate data structure

**Quick Test:**
```typescript
// In a test page
import { AspelinRammLoaders } from '@/lib/loaders/aspelin-ramm';

export default async function TestPage() {
  const properties = await AspelinRammLoaders.loadProperties();

  return <pre>{JSON.stringify(properties, null, 2)}</pre>;
}
```

---

## Step 4: Page Migration

### 4.1 Identify Pages to Migrate
- [ ] Home page (`page.tsx`)
- [ ] About page (`om-prosjektet/page.tsx`)
- [ ] Properties listing (`eiendommer/page.tsx`)
- [ ] Individual property pages (if any)
- [ ] Other custom pages

### 4.2 Migrate Home Page
File: `src/app/[company]/page.tsx` (shared by all companies)

- [ ] Verify layout works for this company
- [ ] Update to load company-specific data
- [ ] Test rendering
- [ ] Check responsiveness

**Note:** Home page is shared, so changes affect all companies. Test thoroughly!

### 4.3 Migrate Properties Page
File: `src/app/[company]/eiendommer/page.tsx`

- [ ] Import company-specific loaders
- [ ] Load property data
- [ ] Render property cards
- [ ] Add filters/search if needed
- [ ] Test with real data

**Example:**
```typescript
// src/app/[company]/eiendommer/page.tsx
import { notFound } from 'next/navigation';
import { getTenant } from '@/config/tenants';

// Dynamic import based on company
async function loadCompanyProperties(companySlug: string) {
  const loaders = await import(`@/lib/loaders/${companySlug}`);
  return loaders.loadProperties();
}

export default async function EiendommerPage({
  params
}: {
  params: { company: string }
}) {
  const tenant = getTenant(params.company);
  if (!tenant) notFound();

  const data = await loadCompanyProperties(params.company);

  return (
    <Container>
      <h1>{tenant.displayName} - Eiendommer</h1>
      {/* Render properties */}
    </Container>
  );
}
```

### 4.4 Migrate About Page
File: `src/app/[company]/om-prosjektet/page.tsx`

- [ ] Copy content from original about page
- [ ] Update company-specific text
- [ ] Add images if needed
- [ ] Test rendering

---

## Step 5: Component Migration

### 5.1 Identify Custom Components
- [ ] List all components in original project
- [ ] Check if similar component exists in platform
- [ ] Decide: reuse existing or create new?

### 5.2 Reuse Existing Components
If component exists:
- [ ] Import from platform components
- [ ] Pass company-specific data
- [ ] Test rendering
- [ ] Verify styling matches

**Example:**
```typescript
import { PropertyCard } from '@/components/ui/PropertyCard';

// Use existing component
<PropertyCard property={property} />
```

### 5.3 Create New Components
If unique component needed:
- [ ] Create in appropriate folder
  - `src/components/companies/{company-slug}/` for company-specific
  - `src/components/ui/` for reusable
- [ ] Implement component
- [ ] Add TypeScript types
- [ ] Test in isolation
- [ ] Document props

**Example:**
```typescript
// src/components/companies/aspelin-ramm/VulkanMap.tsx
'use client';

export function VulkanMap({ properties }: { properties: Property[] }) {
  // Custom map component
}
```

---

## Step 6: Asset Migration

### 6.1 Identify Assets
- [ ] List all images in original project
- [ ] List all PDFs/documents
- [ ] List all other media files
- [ ] Note file sizes

### 6.2 Copy Images
```bash
# Create directories
mkdir -p public/images/companies/{company-slug}
mkdir -p public/images/companies/{company-slug}/properties
mkdir -p public/images/companies/{company-slug}/logos

# Copy images
cp {source}/public/images/* \
   public/images/companies/{company-slug}/

# Verify
ls -lh public/images/companies/{company-slug}/
```

**Checklist:**
- [ ] Company logo copied
- [ ] Property images copied
- [ ] Charts/graphs copied
- [ ] Background images copied
- [ ] Icons copied (if custom)

### 6.3 Copy Documents
```bash
mkdir -p public/pdf/companies/{company-slug}

cp {source}/public/pdf/* \
   public/pdf/companies/{company-slug}/
```

**Checklist:**
- [ ] Analysis reports
- [ ] Quarterly reports
- [ ] Property brochures
- [ ] Other documents

### 6.4 Optimize Assets
- [ ] Compress images if >500KB
- [ ] Convert to WebP if appropriate
- [ ] Verify Next.js Image component used
- [ ] Test lazy loading works

**Optimization:**
```bash
# Example: Optimize with ImageOptim or similar
# Before: 2.5MB
# After: 850KB
```

### 6.5 Update Asset References
- [ ] Search for hard-coded image paths
- [ ] Update to new structure
- [ ] Use Next.js Image component
- [ ] Test all images load

**Find hard-coded paths:**
```bash
grep -r "images/" src/app/[company]/
grep -r "public/" src/components/
```

---

## Step 7: Styling & Branding

### 7.1 Verify Branding
- [ ] Company logo appears correctly
- [ ] Natural State logo appears (primary)
- [ ] Colors match company brand (if custom)
- [ ] Fonts are correct

### 7.2 Custom Styling (if needed)
- [ ] Add company-specific colors to Tailwind config
- [ ] Create custom CSS if absolutely needed
- [ ] Test dark mode (if supported)
- [ ] Test responsiveness

**Example:**
```typescript
// tailwind.config.ts
{
  colors: {
    'aspelin-ramm': {
      primary: '#1a472a',
      secondary: '#2d5a3d',
    }
  }
}
```

### 7.3 Layout Customization
- [ ] Header displays correct logos
- [ ] Navigation shows correct items
- [ ] Footer has correct links
- [ ] "Områdeanalyse →" button works

---

## Step 8: Testing

### 8.1 Functional Testing
- [ ] All pages load without errors
- [ ] Authentication works (login/logout)
- [ ] Navigation works
- [ ] All links work
- [ ] Images load
- [ ] PDFs download
- [ ] Cross-tenant navigation works

### 8.2 Data Testing
- [ ] All data displays correctly
- [ ] No missing data
- [ ] Charts render correctly
- [ ] Tables format properly
- [ ] Search/filters work (if applicable)

### 8.3 Responsive Testing
Test on:
- [ ] Desktop (1920×1080)
- [ ] Laptop (1366×768)
- [ ] Tablet (768×1024)
- [ ] Mobile (375×667)

### 8.4 Browser Testing
Test in:
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

### 8.5 Performance Testing
- [ ] Page load time <3s
- [ ] No console errors
- [ ] No console warnings
- [ ] Lighthouse score >90

**Run Lighthouse:**
```bash
npm run build
npm start
# Open Chrome DevTools > Lighthouse > Run
```

---

## Step 9: Documentation

### 9.1 Update Tenant Config Docs
- [ ] Document any special features
- [ ] Note any customizations
- [ ] Add to main documentation

### 9.2 Create Company README (Optional)
```bash
touch src/data/companies/{company-slug}/README.md
```

**Contents:**
- Data file descriptions
- Update schedule
- Data sources
- Contact information

### 9.3 Migration Notes
Document in `SESSIONS/` folder:
- Date migrated
- Issues encountered
- Solutions applied
- Time taken
- Lessons learned

---

## Step 10: Git Workflow

### 10.1 Review Changes
```bash
git status
git diff
```

### 10.2 Stage Changes
```bash
# Stage data files
git add src/data/companies/{company-slug}/

# Stage loaders
git add src/lib/loaders/{company-slug}.ts

# Stage types (if new)
git add src/types/{company-slug}.ts

# Stage assets
git add public/images/companies/{company-slug}/
git add public/pdf/companies/{company-slug}/

# Stage documentation
git add SESSIONS/
```

### 10.3 Commit
```bash
git commit -m "Migrate {Company Name} to multi-tenant platform

- Add property data and analysis reports
- Create data loaders for {company}
- Copy images and PDFs
- Test all pages and components
- Verify authentication works

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 10.4 Test After Commit
- [ ] Pull latest changes
- [ ] Run dev server
- [ ] Test migrated company site
- [ ] Verify other sites still work

### 10.5 Push (if applicable)
```bash
git push origin feature/migrate-{company-slug}
```

---

## Step 11: Deployment Test (Optional)

### 11.1 Preview Deployment
If using Vercel:
- [ ] Create preview deployment
- [ ] Test migrated company on preview
- [ ] Share preview URL with stakeholder
- [ ] Collect feedback

### 11.2 Merge to Main
After approval:
- [ ] Merge feature branch
- [ ] Deploy to production
- [ ] Test on production
- [ ] Monitor for issues

---

## Post-Migration Checklist

### Verification
- [ ] Company site accessible at `/{company-slug}`
- [ ] Login works with company password
- [ ] All pages render correctly
- [ ] All data displays correctly
- [ ] Images and PDFs load
- [ ] Navigation works
- [ ] Cross-tenant links work
- [ ] No console errors

### Cleanup
- [ ] Remove temporary test files
- [ ] Delete unused assets
- [ ] Clean up commented code
- [ ] Update documentation

### Handoff
- [ ] Share credentials with stakeholder
- [ ] Provide URL
- [ ] Document any quirks
- [ ] Schedule follow-up

---

## Common Issues & Solutions

### Issue 1: Data Not Loading
**Symptoms:** Page shows "No data" or errors

**Solutions:**
- ✅ Verify JSON files are valid
- ✅ Check import paths are correct
- ✅ Ensure TypeScript types match data
- ✅ Check loader function is exported

### Issue 2: Images Not Displaying
**Symptoms:** Broken image icons

**Solutions:**
- ✅ Verify images copied to correct folder
- ✅ Check image paths are correct
- ✅ Use Next.js Image component
- ✅ Check file extensions match

### Issue 3: Styling Looks Wrong
**Symptoms:** Layout broken, colors wrong

**Solutions:**
- ✅ Check Tailwind classes applied
- ✅ Verify custom colors in config
- ✅ Clear Next.js cache: `rm -rf .next`
- ✅ Restart dev server

### Issue 4: Authentication Not Working
**Symptoms:** Can't login or redirects to login

**Solutions:**
- ✅ Verify environment variable is set
- ✅ Check password is correct
- ✅ Clear browser cookies
- ✅ Check tenant slug matches config

### Issue 5: TypeScript Errors
**Symptoms:** Compile errors, type mismatches

**Solutions:**
- ✅ Run `npx tsc --noEmit` to see all errors
- ✅ Check types match data structure
- ✅ Add missing type definitions
- ✅ Use `as` type assertion if safe

---

## Time Estimates

**Per Company Migration:**
- **Simple Company:** 2-3 hours
- **Average Company:** 4-5 hours
- **Complex Company:** 6-8 hours

**Breakdown:**
- Data migration: 30-60 min
- Page migration: 60-90 min
- Asset migration: 30-45 min
- Testing: 60-90 min
- Documentation: 30 min

---

## Success Criteria

A migration is complete when:
- ✅ All pages load without errors
- ✅ All data displays correctly
- ✅ Authentication works
- ✅ Images and PDFs load
- ✅ Navigation works
- ✅ Responsive on mobile
- ✅ No console errors
- ✅ Documented
- ✅ Committed to Git

---

## Next Company Template

After completing first company (pilot):
1. Review this template
2. Note what worked/didn't work
3. Update template
4. Share learnings
5. Replicate for next company

---

**Template Version:** 1.0
**Last Used:** TBD
**Success Rate:** TBD

For questions, refer to:
- `SESSION_CONTEXT.md` - Current platform state
- `DECISIONS.md` - Why things are done this way
- `MAINTENANCE.md` - Long-term maintenance guide
