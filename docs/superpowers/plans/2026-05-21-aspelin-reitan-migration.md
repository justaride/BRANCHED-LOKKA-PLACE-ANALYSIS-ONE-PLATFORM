# Aspelin Reitan Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the public Aspelin tenant from Aspelin Ramm branding to Aspelin Reitan branding with `/aspelin-reitan` as the primary URL and redirects from `/aspelin-ramm`.

**Architecture:** Keep existing data and image folders in place for this pass, but expose a new `aspelin-reitan` tenant config that reuses the existing Aspelin loader. Add a generic company property detail route so the new slug can serve property pages without duplicating tenant-specific page code. Use Next redirects for legacy URLs before auth/proxy behavior can block old links.

**Tech Stack:** Next.js App Router, TypeScript, JSON data files, Jest, ESLint, Next redirects.

---

### Task 1: Tenant Config And Redirect Contract

**Files:**
- Modify: `src/config/tenants.ts`
- Modify: `src/config/tenant-content.ts`
- Modify: `src/config/tenant-data-manifest.ts`
- Modify: `src/lib/loaders/tenant-registry.ts`
- Modify: `next.config.ts`
- Test: `src/lib/utils/__tests__/aspelin-reitan-tenant.test.ts`

- [ ] **Step 1: Add failing tenant tests**

Create `src/lib/utils/__tests__/aspelin-reitan-tenant.test.ts`:

```ts
import nextConfig from "../../../../next.config";
import { getTenant, isCompanyTenantSlug } from "@/config/tenants";
import { getTenantPageContent } from "@/config/tenant-content";
import { getTenantPropertyIds } from "@/config/tenant-data-manifest";

describe("Aspelin Reitan tenant migration", () => {
  it("exposes Aspelin Reitan as the public tenant slug", () => {
    const tenant = getTenant("aspelin-reitan");

    expect(tenant).toMatchObject({
      slug: "aspelin-reitan",
      name: "Aspelin Reitan",
      displayName: "Eiendomsanalyse - Aspelin Reitan",
      websiteUrl: "https://www.aspelinreitan.no",
      emailsEnvVar: "ASPELIN_REITAN_EMAILS",
    });
    expect(isCompanyTenantSlug("aspelin-reitan")).toBe(true);
    expect(isCompanyTenantSlug("aspelin-ramm")).toBe(false);
  });

  it("keeps the Aspelin Reitan page content and property manifest wired", () => {
    const content = getTenantPageContent("aspelin-reitan");

    expect(content.home.heroTitle).toBe("Aspelin Reitan Vulkan");
    expect(content.home.heroDescription).toContain("Aspelin Reitans portefolje");
    expect(getTenantPropertyIds("aspelin-reitan")).toEqual([
      "bellonabygget",
      "mathallen",
      "nye-broverkstedet",
      "scandic-hotel-vulkan",
      "vulkan-arena",
      "vulkan-omradet",
    ]);
  });

  it("redirects old Aspelin Ramm URLs to Aspelin Reitan", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: "/aspelin-ramm",
          destination: "/aspelin-reitan",
          permanent: true,
        },
        {
          source: "/aspelin-ramm/:path*",
          destination: "/aspelin-reitan/:path*",
          permanent: true,
        },
      ]),
    );
  });
});
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `npm test -- src/lib/utils/__tests__/aspelin-reitan-tenant.test.ts`

Expected: FAIL because `aspelin-reitan` is not registered yet.

- [ ] **Step 3: Register the new tenant**

In `src/config/tenants.ts`, replace the `aspelin-ramm` union member and `TENANTS` key with `aspelin-reitan`. Set the public copy:

```ts
  'aspelin-reitan': {
    slug: 'aspelin-reitan',
    name: 'Aspelin Reitan',
    displayName: 'Eiendomsanalyse - Aspelin Reitan',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/aspelin-reitan.svg',
    websiteUrl: 'https://www.aspelinreitan.no',
    description: 'Placeanalyser og eiendomsinformasjon for Aspelin Reitan sin portefolje på Vulkan, Oslo',
    keywords: ['Oslo', 'Vulkan', 'eiendom', 'placeanalyse', 'Aspelin Reitan'],
    emailsEnvVar: 'ASPELIN_REITAN_EMAILS',
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
```

Use ASCII `portefolje` in source strings unless the file already uses Norwegian special characters around the edited line.

- [ ] **Step 4: Move tenant page content to new key**

In `src/config/tenant-content.ts`, replace the `aspelin-ramm` key with `aspelin-reitan` and update visible copy to Aspelin Reitan:

```ts
    home: {
      heroTitle: 'Aspelin Reitan Vulkan',
      heroDescription:
        'Omfattende placeanalyser og eiendomsinformasjon for Aspelin Reitans portefolje på Vulkan. Utforsk demografi, markedsdata og utviklingstrender for seks eiendommer i FutureBuilt-området.',
      primaryCtaLabel: 'Se Eiendommer',
      secondaryCtaLabel: 'Om Prosjektet',
      heroImage: '/images/companies/aspelin-reitan.webp',
      heroImageAlt: 'Vulkan - Aspelin Reitan portefolje',
      heroOverlayTitle: 'Aspelin Reitan Vulkan',
      heroOverlaySubtitle: '6 eiendommer på Vulkan',
```

Update the Aspelin about/properties titles and descriptions to use `Aspelin Reitan`.

- [ ] **Step 5: Move manifest and loader registry key**

In `src/config/tenant-data-manifest.ts`, change the manifest key to `aspelin-reitan`. In `src/lib/loaders/tenant-registry.ts`, register:

```ts
  'aspelin-reitan': aspelinRamm,
```

Keep the loader import name for this pass.

- [ ] **Step 6: Add legacy redirects**

In `next.config.ts`, add the two Aspelin redirects before existing redirects:

```ts
    {
      source: '/aspelin-ramm',
      destination: '/aspelin-reitan',
      permanent: true,
    },
    {
      source: '/aspelin-ramm/:path*',
      destination: '/aspelin-reitan/:path*',
      permanent: true,
    },
```

- [ ] **Step 7: Run the tenant test**

Run: `npm test -- src/lib/utils/__tests__/aspelin-reitan-tenant.test.ts`

Expected: PASS.

### Task 2: Public Route And Detail Page

**Files:**
- Create: `src/app/[company]/eiendommer/[id]/page.tsx`
- Delete or convert to redirects later: `src/app/aspelin-ramm/*`
- Modify: `src/lib/loaders/aspelin-ramm.ts`
- Modify: `src/lib/loaders/one-min-loader.ts`
- Test: `src/lib/utils/__tests__/aspelin-reitan-route-data.test.ts`

- [ ] **Step 1: Add failing route-data test**

Create `src/lib/utils/__tests__/aspelin-reitan-route-data.test.ts`:

```ts
import { getTenantLoader } from "@/lib/loaders/tenant-registry";
import { getTenantPropertyIds } from "@/config/tenant-data-manifest";
import { hasOneMinAnalysisData } from "@/lib/loaders/one-min-loader";

describe("Aspelin Reitan route data", () => {
  it("loads the legacy Aspelin data through the new public slug", async () => {
    const loader = getTenantLoader("aspelin-reitan");
    const properties = await loader.loadAllEiendommer();

    expect(properties.map((property) => property.id)).toEqual(
      getTenantPropertyIds("aspelin-reitan"),
    );
    expect(properties).toHaveLength(6);
  });

  it("keeps Mathallen and Vulkan one-minute data available under the new slug", () => {
    expect(hasOneMinAnalysisData("aspelin-reitan", "mathallen")).toBe(true);
    expect(hasOneMinAnalysisData("aspelin-reitan", "vulkan-omradet")).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `npm test -- src/lib/utils/__tests__/aspelin-reitan-route-data.test.ts`

Expected: FAIL until the loader registry and one-min aliases are wired.

- [ ] **Step 3: Make Aspelin loader emit the new tenant slug**

In `src/lib/loaders/aspelin-ramm.ts`, keep file name/import paths but change comments, `TENANT`, manifest lookup and log text:

```ts
const TENANT = 'aspelin-reitan';
```

Use `getTenantPropertyIds('aspelin-reitan')`.

- [ ] **Step 4: Add one-min aliases**

In `src/lib/loaders/one-min-loader.ts`, add alias normalization:

```ts
function normalizeTenantForOneMinData(tenant: string): string {
  return tenant === "aspelin-reitan" ? "aspelin-ramm" : tenant;
}
```

Use this in both `loadOneMinAnalysisData` and `hasOneMinAnalysisData`:

```ts
const key = `${normalizeTenantForOneMinData(tenant)}/${propertyId}`;
```

- [ ] **Step 5: Create generic property detail route**

Create `src/app/[company]/eiendommer/[id]/page.tsx` by generalizing the existing Aspelin detail route. It must:
- validate `company` with `isCompanyTenantSlug(company)`,
- load the tenant with `getTenant(company)`,
- load the property through `getTenantLoader(company)`,
- call `loadOneMinAnalysisData(company, id)`,
- link back to `/${tenant.slug}/eiendommer`,
- use metadata title `${displayName} - ${tenant.name}`.

- [ ] **Step 6: Run the route-data test**

Run: `npm test -- src/lib/utils/__tests__/aspelin-reitan-route-data.test.ts`

Expected: PASS.

### Task 3: Assets And Visible Copy

**Files:**
- Create: `public/images/logos/aspelin-reitan.svg`
- Create/copy: `public/images/companies/aspelin-reitan.webp`
- Modify: `src/app/page.tsx`
- Modify: `src/app/main-board/page.tsx`
- Modify: `src/data/aspelin-ramm/*.json`
- Test: `src/lib/utils/__tests__/aspelin-reitan-copy.test.ts`

- [ ] **Step 1: Add failing copy test**

Create `src/lib/utils/__tests__/aspelin-reitan-copy.test.ts`:

```ts
import fs from "fs";
import path from "path";

const repoRoot = process.cwd();

describe("Aspelin Reitan visible copy and assets", () => {
  it("has clean Aspelin Reitan logo and company hero assets", () => {
    expect(fs.existsSync(path.join(repoRoot, "public/images/logos/aspelin-reitan.svg"))).toBe(true);
    expect(fs.existsSync(path.join(repoRoot, "public/images/companies/aspelin-reitan.webp"))).toBe(true);

    const logo = fs.readFileSync(
      path.join(repoRoot, "public/images/logos/aspelin-reitan.svg"),
      "utf8",
    );
    expect(logo).toContain("<svg");
    expect(logo).not.toContain("<html");
    expect(logo).not.toContain("<script");
  });

  it("does not expose old Aspelin Ramm branding in active tenant files", () => {
    const activeFiles = [
      "src/config/tenants.ts",
      "src/config/tenant-content.ts",
      "src/app/page.tsx",
      "src/app/main-board/page.tsx",
    ];

    for (const file of activeFiles) {
      const content = fs.readFileSync(path.join(repoRoot, file), "utf8");
      expect(content).not.toContain("Aspelin Ramm");
    }
  });
});
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `npm test -- src/lib/utils/__tests__/aspelin-reitan-copy.test.ts`

Expected: FAIL because assets and copy are not updated yet.

- [ ] **Step 3: Add clean logo SVG**

Extract the official inline logo path from `https://www.aspelinreitan.no/` into `public/images/logos/aspelin-reitan.svg`. Keep it as a pure SVG:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 236" role="img" aria-labelledby="title">
  <title id="title">Aspelin Reitan</title>
  <path d="..." fill="currentColor"/>
</svg>
```

- [ ] **Step 4: Add company hero alias**

Copy the current Vulkan company image:

```bash
cp public/images/companies/aspelin-ramm.webp public/images/companies/aspelin-reitan.webp
```

- [ ] **Step 5: Update active page image maps**

In `src/app/page.tsx` and `src/app/main-board/page.tsx`, replace the image map key with:

```ts
'aspelin-reitan': '/images/companies/aspelin-reitan.webp',
```

- [ ] **Step 6: Update current owner/contact copy in Aspelin data**

In `src/data/aspelin-ramm/*.json`, update current owner/contact references to `Aspelin Reitan Eiendom AS` where the field describes current owner, manager, contact, or current strategic role. Preserve historical sentences that describe old development events, for example `utviklet av Aspelin Ramm` for 2004-2014 Vulkan history.

- [ ] **Step 7: Run copy test**

Run: `npm test -- src/lib/utils/__tests__/aspelin-reitan-copy.test.ts`

Expected: PASS.

### Task 4: Verification And Browser QA

**Files:**
- No new source files unless verification exposes a bug.

- [ ] **Step 1: Run full automated checks**

Run:

```bash
npm run verify
npm run type-check
npm run lint
npm test
npm run build
```

Expected: all pass.

- [ ] **Step 2: Run local app**

Run:

```bash
npm run dev
```

Expected: dev server serves `http://localhost:3001`.

- [ ] **Step 3: Browser-check new and legacy URLs**

Check:
- `http://localhost:3001/aspelin-reitan`
- `http://localhost:3001/aspelin-reitan/eiendommer`
- `http://localhost:3001/aspelin-reitan/eiendommer/mathallen`
- `http://localhost:3001/aspelin-ramm`
- `http://localhost:3001/aspelin-ramm/eiendommer/mathallen`

Expected:
- new URLs return 200 and show Aspelin Reitan branding,
- legacy URLs redirect to matching `/aspelin-reitan` URLs,
- Mathallen one-minute charts still render.

- [ ] **Step 4: Clean generated tsconfig drift**

If Next dev adds `.next/dev/types/**/*.ts` to `tsconfig.json`, remove that generated line before commit.

- [ ] **Step 5: Commit**

Run:

```bash
git add next.config.ts src public/images/logos/aspelin-reitan.svg public/images/companies/aspelin-reitan.webp docs/superpowers/plans/2026-05-21-aspelin-reitan-migration.md
git commit -m "Migrate Aspelin tenant to Aspelin Reitan"
```

Do not add `output/`.

---

## Self-Review

- Spec coverage: URL migration, redirects, branding, route detail support, logo, data copy and verification are covered.
- Placeholder scan: no TBD/TODO/later placeholders.
- Type consistency: `aspelin-reitan` is consistently used as the public tenant slug; legacy data folder remains `src/data/aspelin-ramm` by design.
