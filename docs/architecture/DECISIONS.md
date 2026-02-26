# Technical Decision Log

**Project:** Løkka Gårdeierforening Multi-Tenant Platform
**Last Updated:** 2026-02-26

This document records all major technical decisions made during the platform development, including rationale, alternatives considered, and implications.

---

## Decision 1: Multi-Tenant Monorepo vs. Multiple Repositories

**Date:** 2025-11-19
**Status:** ✅ Implemented
**Decision Maker:** Project Team

### Decision
Use a **single multi-tenant monorepo** instead of multiple separate repositories/deployments.

### Context
We have 9 similar websites:
- 1 Main Board site (comprehensive area analysis)
- 8 Company sites (property-specific portfolios)

Original state: 9 separate Next.js projects with ~95% identical code.

### Rationale

#### Benefits of Multi-Tenant Monorepo
1. **Code Reuse:** ~95% of code is identical across sites
2. **Maintenance:** One fix updates all sites
3. **Deployment:** Single deployment instead of 9
4. **Consistency:** Same UI/UX across all tenants
5. **Scalability:** Adding new company = config entry only
6. **Cost:** One hosting cost instead of 9

#### Drawbacks of Separate Repos
1. **Code Duplication:** 9× the code to maintain
2. **Bug Fixes:** Must fix same bug 9 times
3. **Updates:** Must update dependencies 9 times
4. **Deployment:** Manage 9 deployments
5. **Inconsistency:** Sites drift apart over time
6. **Cost:** 9× hosting costs

### Alternatives Considered

#### Option A: 9 Separate Repositories (Rejected)
**Pros:**
- True isolation between sites
- Independent deployment schedules
- Custom code per site easier

**Cons:**
- Massive code duplication
- Hard to maintain consistency
- 9× the work for updates
- Higher costs

#### Option B: Shared Component Library (Rejected)
**Pros:**
- Some code reuse
- Some isolation

**Cons:**
- Complex setup (monorepo + 9 apps)
- Still need 9 deployments
- Versioning complexity
- Overkill for our use case

#### Option C: Multi-Tenant Monorepo (✅ Chosen)
**Pros:**
- Maximum code reuse
- Single deployment
- Easy to maintain
- Consistent UX
- Lower cost

**Cons:**
- All sites share downtime if any issues
- Harder to customize individual sites
- More complex routing

### Implementation Details
```typescript
// Single tenant configuration file
export const TENANTS = {
  'main-board': { /* config */ },
  'aspelin-ramm': { /* config */ },
  // ... 7 more companies
};
```

Dynamic routing handles all tenants:
- `/main-board/*` - Main Board routes
- `/[company]/*` - Company routes (8 companies)

### Implications
- **Deployment:** Single Coolify app (proxied via Cloudflare)
- **Code Changes:** Affect all tenants (feature flag if needed)
- **Customization:** Done via configuration, not code
- **Scaling:** Very easy to add new tenants

### Success Metrics
- ✅ Code reduction: 95% (from 9 projects to 1)
- ✅ Deployment reduction: 89% (from 9 to 1)
- ✅ Maintenance time: Reduced by ~90%

---

## Decision 2: Dynamic Routing with [company] Parameter

**Date:** 2025-11-19
**Status:** ✅ Implemented

### Decision
Use Next.js **dynamic routing** with `[company]` parameter instead of hard-coded routes.

### Context
Need to serve 8 company sites with identical structure but different data.

### Rationale

#### Benefits of Dynamic Routing
1. **DRY Principle:** One route handles all companies
2. **Scalability:** New company = config + data only
3. **Maintainability:** Update layout once, affects all
4. **URL Structure:** Clean, predictable URLs

#### Example Structure
```
src/app/[company]/
  ├── layout.tsx         (one file for all 8 companies)
  ├── page.tsx          (one file for all 8 companies)
  ├── om-prosjektet/    (one folder for all 8)
  └── eiendommer/       (one folder for all 8)
```

### Alternatives Considered

#### Option A: Hard-Coded Routes (Rejected)
```
src/app/aspelin-ramm/
src/app/brodrene-evensen/
src/app/eiendomsspar/
// ... 6 more
```

**Cons:**
- 8× code duplication
- Hard to maintain
- Adding company requires new routes

#### Option B: Dynamic Routing (✅ Chosen)
```
src/app/[company]/
```

**Pros:**
- Single source of truth
- Easy to scale
- Clean code

### Implementation Details
```typescript
// Middleware validates company slug
export function middleware(request: NextRequest) {
  const tenantSlug = segments[0];
  if (!isValidTenant(tenantSlug)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Layout receives company as param
export default function CompanyLayout({
  params
}: {
  params: { company: string }
}) {
  const tenant = getTenant(params.company);
  // ...
}
```

### Implications
- **Adding Company:** Just add config entry + data folder
- **Customization:** Via tenant config, not separate routes
- **Type Safety:** TypeScript validates company slugs

---

## Decision 3: Cookie-Based Authentication

**Date:** 2025-11-19
**Status:** ✅ Implemented

### Decision
Use **simple cookie-based authentication** with per-tenant passwords.

### Context
Need to protect content but:
- No user accounts needed
- No social login needed
- Simple password protection sufficient

### Rationale

#### Why Cookies?
1. **Simplicity:** Easy to implement and understand
2. **No Database:** No user management needed
3. **Per-Tenant:** Separate cookie per tenant
4. **Persistence:** 7-day expiry, stays logged in
5. **Cost:** Zero external dependencies

#### Why Per-Tenant Passwords?
1. **Security:** Breach of one doesn't affect others
2. **Control:** Different access levels per tenant
3. **Sharing:** Can share one password without exposing all

### Alternatives Considered

#### Option A: No Authentication (Rejected)
**Pros:** Simplest possible

**Cons:**
- Content publicly accessible
- Not suitable for client data

#### Option B: NextAuth.js (Rejected)
**Pros:**
- Full-featured
- Social login support

**Cons:**
- Overkill for use case
- Requires database
- More complex
- Higher maintenance

#### Option C: Cookie-Based (✅ Chosen)
**Pros:**
- Simple
- No database
- Fast
- Sufficient for use case

**Cons:**
- Less secure than OAuth
- No user management
- Shared passwords

### Implementation Details
```typescript
// Login sets cookie per tenant
response.cookies.set(`auth-${tenant}`, 'authenticated', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
});

// Middleware checks cookie
const authCookie = request.cookies.get(`auth-${tenantSlug}`);
if (!authCookie || authCookie.value !== 'authenticated') {
  // Redirect to login
}
```

### Environment Variables
```bash
MAIN_BOARD_PASSWORD=secret123
ASPELIN_RAMM_PASSWORD=secret456
# ... etc
```

### Security Considerations
1. **HTTPS Only in Production:** `secure: true`
2. **HttpOnly Cookies:** Prevents XSS access
3. **SameSite Protection:** CSRF mitigation
4. **Environment Variables:** Passwords not in code

### Future Migration Path
If user management needed later:
1. Keep cookie system
2. Add database for users
3. Store user ID in cookie instead of "authenticated"
4. Maintain backward compatibility

---

## Decision 4: JSON Files for Data Storage

**Date:** 2025-11-19
**Status:** ✅ Implemented

### Decision
Store data in **static JSON files** instead of database (for now).

### Context
Data includes:
- Quarterly reports
- Demographic data
- Property information
- Analysis results

Characteristics:
- Mostly static (updated quarterly/annually)
- No user-generated content
- Version control desired
- Fast read access critical

### Rationale

#### Benefits of JSON Files
1. **Simplicity:** No database setup/maintenance
2. **Version Control:** Git tracks all changes
3. **Performance:** Next.js optimizes static imports
4. **Cost:** Zero database costs
5. **Deployment:** Bundled with app
6. **Development:** Easy to edit and test

#### When JSON Works Well
- ✅ Static or rarely-changing data
- ✅ Read-heavy workloads
- ✅ Version control desired
- ✅ Simple data structure
- ✅ No complex queries needed

### Alternatives Considered

#### Option A: PostgreSQL/MySQL (Rejected for Now)
**Pros:**
- Relational queries
- ACID guarantees
- Large datasets

**Cons:**
- Setup complexity
- Hosting costs
- Overkill for static data
- Slower development

#### Option B: MongoDB (Rejected for Now)
**Pros:**
- JSON-like structure
- Flexible schema

**Cons:**
- Another service to manage
- Not needed for static data
- Adds complexity

#### Option C: JSON Files (✅ Chosen)
**Pros:**
- Zero setup
- Version controlled
- Fast reads
- Free

**Cons:**
- Not suitable for large/dynamic data
- No complex queries
- File size limits

### Implementation Details
```typescript
// Data stored in src/data/
src/data/
  ├── main-board/
  │   ├── analyser/
  │   │   ├── 2024-arsrapport.json
  │   │   └── kvartalsrapport-banktransaksjoner.json
  │   ├── demografi/
  │   └── quarterly/
  └── companies/
      └── aspelin-ramm/
          └── properties.json

// Loaded via imports
import data from '@/data/main-board/analyser/2024-arsrapport.json';
```

### Migration Path to Database
If data grows or becomes dynamic:

1. **Phase 1:** Keep JSON for historical data
2. **Phase 2:** Add database for new data
3. **Phase 3:** Create migration scripts
4. **Phase 4:** Move to database incrementally

**Triggers for Migration:**
- Data exceeds 10MB per file
- Need real-time updates
- Need user-generated content
- Need complex queries
- Multiple concurrent editors

### Current Data Size
- **Total:** ~5MB across all JSON files
- **Largest File:** ~500KB (bank transactions)
- **Well within limits** for JSON approach

---

## Decision 5: Tailwind CSS for Styling

**Date:** 2025-11-19
**Status:** ✅ Implemented

### Decision
Use **Tailwind CSS** for all styling.

### Context
Need consistent, professional styling across all tenants.

### Rationale
1. **Utility-First:** Rapid development
2. **Consistency:** Design system built-in
3. **Performance:** Purges unused CSS
4. **Customization:** Easy to theme per tenant
5. **Modern:** Industry standard

### Custom Configuration
```typescript
// tailwind.config.ts
{
  colors: {
    lokka: {
      primary: '#1a472a',    // Dark green
      secondary: '#2d5a3d',  // Medium green
      accent: '#48753e',     // Accent green
    },
    natural: {
      forest: '#1a472a',
      sage: '#48753e',
      // ...
    }
  }
}
```

### Alternatives Considered
- CSS Modules (too verbose)
- Styled Components (runtime overhead)
- Sass (less modern)

---

## Decision 6: TypeScript Strict Mode

**Date:** 2025-11-19
**Status:** ⚠️ Partial (some components temporarily excluded)

### Decision
Use **TypeScript in strict mode** with temporary exceptions.

### Context
Large codebase with complex data structures. Some components need refactoring for full strict compliance.

### Current State
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    // ...
  }
}
```

**Temporary Exclusions:**
- `PropertyOwnerAnalysis.tsx` (complex data transformations)

### Rationale
1. **Type Safety:** Catch errors at compile time
2. **Documentation:** Types document code
3. **Refactoring:** Safer to refactor
4. **Team:** Better for collaboration

### Migration Strategy
1. ✅ Enable strict mode globally
2. ⚠️ Mark problem components with `// @ts-nocheck` temporarily
3. 🔄 Gradually fix type issues
4. 🎯 Goal: Full strict compliance

---

## Decision 7: Coolify for Deployment

**Date:** 2026-02-26
**Status:** ✅ Implemented

### Decision
Deploy to **Coolify on Hetzner**, fronted by **Cloudflare**.

### Rationale

#### Why Coolify?
1. **Ownership:** Full control over infrastructure and deployment lifecycle
2. **Predictable cost:** Fixed hosting on Hetzner without vendor lock-in
3. **Operational flexibility:** Environment variables, redeploys, and logs in one place
4. **Compatibility:** Works well with Next.js container/runtime workflows
5. **Cloudflare integration:** Caching, TLS, and DNS handled at the edge

### Deployment Strategy
**Option 1: Single Coolify App (Recommended)**
- One deployment serves all 9 tenants
- Different domains point to same deployment
- Environment variables shared

**Option 2: Separate Projects per Tenant (Not Recommended)**
- Would require 9 deployments
- Defeats purpose of multi-tenancy
- Higher cost

**✅ Going with Option 1**

### Cost Estimate
- **Hosting:** Hetzner server(s) sized by traffic
- **Platform:** Coolify (self-hosted)
- **Edge/DNS:** Cloudflare plan as needed

---

## Decision 8: No CDN for Images (Initially)

**Date:** 2025-11-19
**Status:** ✅ Implemented

### Decision
Serve images from **Next.js public folder** initially (no separate CDN).

### Rationale
1. **Simplicity:** One less service to manage
2. **Next.js Optimization:** Built-in Image component
3. **Cost:** Zero additional cost
4. **Performance:** Cloudflare + Next.js caching is sufficient

### Future Optimization
If images become bottleneck:
1. Move to Cloudinary/imgix
2. Tune Next.js image optimization and caching strategy
3. Implement lazy loading (already done)

### Current Image Strategy
```typescript
import Image from 'next/image';

<Image
  src="/images/properties/building.jpg"
  width={800}
  height={600}
  alt="Property"
/>
```

Next.js automatically:
- Optimizes format (WebP)
- Resizes for device
- Lazy loads
- Serves through Cloudflare CDN

---

## Decision 9: Server Components by Default

**Date:** 2025-11-19
**Status:** ✅ Implemented

### Decision
Use **React Server Components** by default, client components only when needed.

### Rationale
1. **Performance:** Smaller bundle size
2. **SEO:** Server-side rendering
3. **Security:** API keys stay server-side
4. **Cost:** Less client JavaScript

### Client Component Triggers
Mark as `'use client'` only when:
- Using React hooks (useState, useEffect)
- Using browser APIs
- Event handlers needed
- Third-party client libraries

### Current Split
**Server Components (Most):**
- Layouts
- Data pages
- Static content

**Client Components (Few):**
- Interactive charts
- Forms
- Navigation with state

---

## Decision 10: Environment-Based Configuration

**Date:** 2025-11-19
**Status:** ✅ Implemented

### Decision
Use **environment variables** for all sensitive configuration.

### Implementation
```bash
# .env.local (development)
MAIN_BOARD_PASSWORD=test123
ASPELIN_RAMM_PASSWORD=test123
# ...

# .env (production - in Coolify)
MAIN_BOARD_PASSWORD=<strong-password>
ASPELIN_RAMM_PASSWORD=<strong-password>
# ...
```

### Security Rules
1. ✅ Never commit `.env.local`
2. ✅ Provide `.env.example` template
3. ✅ Use strong passwords in production
4. ✅ Rotate passwords periodically

### Accessed Via
```typescript
const password = process.env.ASPELIN_RAMM_PASSWORD;
```

---

## Decision 11: Git Workflow

**Date:** 2025-11-19
**Status:** ✅ Implemented

### Decision
Use **simple Git workflow** with main branch and feature branches as needed.

### Structure
```
main (default branch)
  ↓
feature/company-migration
feature/new-analysis-page
```

### Commit Strategy
- Meaningful commit messages
- Regular commits during development
- Squash when appropriate

### Branch Protection (Production)
When deployed:
- Protect main branch
- Require PR reviews
- Run CI checks

---

## Future Decisions Needed

### 1. Custom Domains
**Question:** Should each tenant have custom domain?
- Option A: Single domain with paths (current)
- Option B: Custom domain per tenant
- **Status:** TBD

### 2. Analytics
**Question:** What analytics to use?
- Option A: Google Analytics
- Option B: Cloudflare Web Analytics
- Option C: Plausible (privacy-focused)
- **Status:** TBD

### 3. User Management
**Question:** If users needed, what system?
- Option A: Keep cookie auth
- Option B: Add database + user accounts
- Option C: Use Auth0/Supabase
- **Status:** TBD (likely not needed)

---

## Decision Review Schedule

**Quarterly Review:** Re-evaluate major decisions
- Is multi-tenant still working?
- Is JSON still sufficient?
- Any performance issues?
- Any security concerns?

**Next Review:** March 2025

---

## Lessons Learned

### What Worked Well
1. ✅ Multi-tenant architecture perfect for this use case
2. ✅ Dynamic routing saved massive code duplication
3. ✅ Cookie auth simple and effective
4. ✅ JSON files sufficient for static data

### What We'd Change
1. ⚠️ Start with stricter TypeScript from day 1
2. ⚠️ Document decisions as we go (not after)

### Advice for Similar Projects
1. **Choose multi-tenant** if sites are >90% similar
2. **Start simple** (JSON, cookies) and scale later
3. **Use TypeScript strict** from the beginning
4. **Document decisions** immediately

---

**Decision Log Version:** 1.0
**Last Updated:** 2025-11-19
**Maintained By:** Development Team

For questions about any decision, refer to:
- `SESSION_CONTEXT.md` - Current state
- `IMPLEMENTATION_PLAN_FINAL.md` - Overall plan
- `MULTI_TENANT_ARCHITECTURE_PROPOSAL.md` - Architecture details
