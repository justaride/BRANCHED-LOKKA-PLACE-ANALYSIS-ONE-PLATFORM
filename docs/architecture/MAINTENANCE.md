# Platform Maintenance Guide

**Project:** Løkka Gårdeierforening Multi-Tenant Platform
**Last Updated:** 2025-11-19
**Version:** 1.0

This guide covers long-term maintenance tasks, update procedures, and troubleshooting for the multi-tenant platform.

---

## Table of Contents

1. [Maintenance Schedule](#maintenance-schedule)
2. [Adding New Data](#adding-new-data)
3. [Updating Existing Data](#updating-existing-data)
4. [Adding New Tenants](#adding-new-tenants)
5. [Dependency Updates](#dependency-updates)
6. [Security Updates](#security-updates)
7. [Password Management](#password-management)
8. [Backup Procedures](#backup-procedures)
9. [Monitoring](#monitoring)
10. [Troubleshooting](#troubleshooting)

---

## Maintenance Schedule

### Weekly Tasks

#### Check for Issues
- [ ] Review Vercel deployment logs
- [ ] Check for failed builds
- [ ] Monitor error rates
- [ ] Review user feedback (if applicable)

**Time Required:** 15-30 minutes

### Monthly Tasks

#### Dependency Updates
- [ ] Run `npm outdated` to check for updates
- [ ] Review security advisories
- [ ] Update non-breaking dependencies
- [ ] Test after updates

**Time Required:** 1-2 hours

#### Data Review
- [ ] Verify all data files are valid JSON
- [ ] Check for outdated information
- [ ] Update quarterly reports (if new data available)
- [ ] Review and update property information

**Time Required:** 1-2 hours

#### Security Review
- [ ] Review access logs (if available)
- [ ] Consider password rotation
- [ ] Check for security updates
- [ ] Review environment variables

**Time Required:** 30-60 minutes

### Quarterly Tasks

#### Comprehensive Update
- [ ] Update all dependencies (including breaking changes)
- [ ] Full regression testing
- [ ] Update documentation
- [ ] Review and update types
- [ ] Performance audit

**Time Required:** 4-8 hours

#### Data Refresh
- [ ] Request new quarterly data
- [ ] Update demographic data (if new census available)
- [ ] Update property portfolios
- [ ] Refresh analysis reports

**Time Required:** 2-4 hours

#### Strategic Review
- [ ] Review platform usage
- [ ] Evaluate new feature requests
- [ ] Plan upcoming improvements
- [ ] Review technical debt

**Time Required:** 2-3 hours

### Yearly Tasks

#### Major Version Updates
- [ ] Update Next.js to latest major version
- [ ] Update React to latest major version
- [ ] Update TypeScript
- [ ] Update Tailwind CSS
- [ ] Full testing across all browsers

**Time Required:** 8-16 hours

#### Architecture Review
- [ ] Evaluate if multi-tenant still optimal
- [ ] Consider database migration if needed
- [ ] Review authentication strategy
- [ ] Evaluate hosting options

**Time Required:** 4-8 hours

---

## Adding New Data

### Main Board Data

#### Quarterly Reports

1. **Receive new data file**
   ```bash
   # Save to appropriate location
   src/data/main-board/quarterly/kvartalsrapport-Q1-2026.json
   ```

2. **Validate JSON**
   ```bash
   cat src/data/main-board/quarterly/kvartalsrapport-Q1-2026.json | jq '.' > /dev/null
   ```

3. **Add loader function**
   ```typescript
   // src/lib/loaders/main-board.ts
   export async function loadKvartalsrapportQ1_2026() {
     const data = await import('@/data/main-board/quarterly/kvartalsrapport-Q1-2026.json');
     return data.default;
   }
   ```

4. **Update page to use new data**
   ```typescript
   // Update the relevant analysis page
   const newData = await MainBoardLoaders.loadKvartalsrapportQ1_2026();
   ```

5. **Test**
   ```bash
   npm run dev
   # Navigate to page and verify data displays correctly
   ```

6. **Commit**
   ```bash
   git add src/data/main-board/quarterly/kvartalsrapport-Q1-2026.json
   git add src/lib/loaders/main-board.ts
   git commit -m "Add Q1 2026 quarterly report"
   git push
   ```

#### Annual Reports

Same process as quarterly, but in the `analyser` folder:
```bash
src/data/main-board/analyser/2026-arsrapport.json
```

#### Demographic Data

1. **Get updated data** from SSB or other source
2. **Convert to JSON** (if not already)
3. **Save to:** `src/data/main-board/demografi/demografi-[years].json`
4. **Update loader** if new file (or replace existing)
5. **Test and commit**

### Company Data

#### New Properties

1. **Update properties.json**
   ```bash
   src/data/companies/aspelin-ramm/properties.json
   ```

2. **Add property details**
   ```json
   {
     "properties": [
       {
         "id": "new-property-id",
         "address": "Nye Gata 123",
         "area": 1500,
         "type": "commercial",
         ...
       }
     ]
   }
   ```

3. **Add property images**
   ```bash
   public/images/companies/aspelin-ramm/properties/new-property-id.jpg
   ```

4. **Test display**
   ```bash
   npm run dev
   # Navigate to /{company}/eiendommer
   ```

5. **Commit**

#### Updated Analysis

1. **Replace analysis file**
   ```bash
   src/data/companies/aspelin-ramm/analysis/analysis-report.json
   ```

2. **Verify JSON valid**
3. **Test page renders**
4. **Commit**

---

## Updating Existing Data

### Fixing Data Errors

1. **Locate the data file**
   ```bash
   # Example: Fix typo in property name
   src/data/companies/aspelin-ramm/properties.json
   ```

2. **Edit the file**
   ```bash
   # Use your editor of choice
   code src/data/companies/aspelin-ramm/properties.json
   ```

3. **Validate JSON**
   ```bash
   cat src/data/companies/aspelin-ramm/properties.json | jq '.'
   ```

4. **Test locally**
   ```bash
   npm run dev
   ```

5. **Commit**
   ```bash
   git add src/data/companies/aspelin-ramm/properties.json
   git commit -m "Fix property name typo in Aspelin Ramm portfolio"
   git push
   ```

6. **Verify in production**
   - Vercel auto-deploys on push
   - Check production site after ~2 minutes

### Updating Multiple Files

For bulk updates (e.g., updating all 2024 data to 2025):

1. **Create script** (optional)
   ```bash
   scripts/update-year.sh
   ```

2. **Or manually update** each file

3. **Test thoroughly** before committing

4. **Commit all at once**
   ```bash
   git add src/data/
   git commit -m "Update all 2024 data to 2025"
   ```

---

## Adding New Tenants

### Complete Checklist

#### 1. Add to Tenant Configuration
```typescript
// src/config/tenants.ts
export const TENANTS: Record<string, TenantConfig> = {
  // ... existing tenants
  'new-company': {
    slug: 'new-company',
    name: 'New Company',
    displayName: 'Eiendomsanalyse - New Company',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/new-company.png',
    websiteUrl: 'https://newcompany.no',
    description: 'Property analysis for New Company',
    keywords: ['Oslo', 'property', 'analysis'],
    passwordEnvVar: 'NEW_COMPANY_PASSWORD',
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
};
```

#### 2. Add Environment Variable
```bash
# .env.local (development)
NEW_COMPANY_PASSWORD=test123

# Vercel (production)
# Add via Vercel dashboard: Settings > Environment Variables
NEW_COMPANY_PASSWORD=<strong-password>
```

#### 3. Create Data Directories
```bash
mkdir -p src/data/companies/new-company
mkdir -p src/data/companies/new-company/properties
mkdir -p src/data/companies/new-company/analysis
```

#### 4. Add Data Files
```bash
# Minimum required:
src/data/companies/new-company/properties.json
```

#### 5. Create Data Loader
```bash
# Copy template
cp TEMPLATES/company-loader-template.ts src/lib/loaders/new-company.ts

# Edit and customize
code src/lib/loaders/new-company.ts
```

#### 6. Add Company Logo
```bash
public/images/logos/new-company.png
```

#### 7. Add Property Images
```bash
mkdir -p public/images/companies/new-company/properties
# Copy property images
```

#### 8. Test
```bash
npm run dev
# Navigate to http://localhost:3000/new-company
# Login with test123
# Verify all pages work
```

#### 9. Update Landing Page (if needed)
The landing page auto-generates from tenant config, but verify it displays correctly.

#### 10. Deploy
```bash
git add .
git commit -m "Add new tenant: New Company"
git push
```

#### 11. Verify Production
- Add environment variable on Vercel
- Wait for deployment
- Test production URL
- Share credentials with client

---

## Dependency Updates

### Safe Update Process

#### 1. Check Current Status
```bash
npm outdated
```

#### 2. Read Changelogs
Before updating, read:
- Next.js changelog
- React changelog
- Major dependency changelogs

#### 3. Update Non-Breaking First
```bash
# Update patch and minor versions
npm update
```

#### 4. Test
```bash
npm run dev
# Test all pages
npm run build
# Verify build succeeds
```

#### 5. Update Breaking Changes One at a Time
```bash
# Example: Update Next.js
npm install next@latest

# Test
npm run dev
npm run build

# If issues, fix before continuing
```

#### 6. Update TypeScript Types
```bash
npm install -D @types/react@latest @types/node@latest
```

#### 7. Full Testing
- [ ] Dev server works
- [ ] Build succeeds
- [ ] All pages load
- [ ] No TypeScript errors
- [ ] No console errors

#### 8. Commit
```bash
git add package.json package-lock.json
git commit -m "Update dependencies: Next.js 16 → 17, React 19 → 20"
git push
```

### Handling Breaking Changes

If update breaks the app:

1. **Read migration guide**
   - Check official docs
   - Search for "migrating from X to Y"

2. **Fix one issue at a time**
   - Start with TypeScript errors
   - Then runtime errors
   - Then warnings

3. **Test incrementally**
   - Test after each fix
   - Don't batch multiple fixes

4. **Consider reverting**
   ```bash
   git revert HEAD
   # If too complex, wait for better timing
   ```

---

## Security Updates

### Critical Security Update Process

If npm audit shows critical vulnerabilities:

#### 1. Audit
```bash
npm audit
```

#### 2. Review
- Read vulnerability details
- Check if it affects your code
- Determine urgency

#### 3. Fix
```bash
npm audit fix

# Or for breaking changes:
npm audit fix --force
```

#### 4. Test Thoroughly
Critical updates require extensive testing.

#### 5. Deploy ASAP
Security fixes should be deployed immediately.

### Regular Security Practices

1. **Keep dependencies updated**
   - Monthly review of `npm outdated`
   - Apply security patches quickly

2. **Review environment variables**
   - Rotate passwords periodically
   - Use strong passwords in production

3. **Monitor Vercel logs**
   - Watch for unusual access patterns
   - Review failed login attempts

4. **Use HTTPS only**
   - Vercel provides this automatically
   - Ensure custom domains use HTTPS

---

## Password Management

### Updating Tenant Passwords

#### Development
```bash
# .env.local
ASPELIN_RAMM_PASSWORD=new-dev-password
```

#### Production (Vercel)

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Settings > Environment Variables

2. **Update variable**
   - Find `ASPELIN_RAMM_PASSWORD`
   - Click Edit
   - Enter new password
   - Save

3. **Redeploy**
   - Vercel > Deployments
   - Find latest deployment
   - Click "..." > Redeploy

4. **Inform users**
   - Send new password to authorized users
   - Update any saved passwords

### Password Best Practices

**Development:**
- Simple passwords OK (test123)
- Shared across team
- Documented in README

**Production:**
- Strong, unique passwords
- Minimum 16 characters
- Mix of letters, numbers, symbols
- Different per tenant
- Shared only with authorized users

**Example Strong Password:**
```
Aspelin-Ramm: Kj8#mP2@vL9$xQ4!wR6&
```

### Password Rotation Schedule

**Recommended:**
- Every 6 months for production
- When team member leaves
- If compromise suspected
- When requested by client

---

## Backup Procedures

### Data Backups

#### Manual Backup
```bash
# Backup entire data directory
cd ~/Downloads/lokka-gardeierforening-platform
tar -czf backup-data-$(date +%Y%m%d).tar.gz src/data/

# Store securely
mv backup-data-*.tar.gz ~/Backups/
```

#### Automated Backup (Git)
Data is automatically backed up via Git:
- Every commit saves data state
- GitHub stores all history
- Can restore any previous version

```bash
# Restore data from previous commit
git checkout HEAD~1 -- src/data/
```

### Code Backups

Code is backed up via:
1. **Git** (version control)
2. **GitHub** (remote repository)
3. **Vercel** (deployment history)

### Environment Variables Backup

**⚠️ IMPORTANT:** Environment variables are NOT in Git

**Backup process:**
1. Document all env vars in secure location
2. Use password manager for production passwords
3. Keep `.env.example` updated with structure

### Image/Asset Backups

Images and PDFs are in Git, so backed up automatically.

**Large files consideration:**
If repo becomes too large (>100MB), consider:
- Git LFS for large files
- Separate CDN for images
- Periodic archive of old data

---

## Monitoring

### Production Health Checks

#### Daily (Automated)
- Vercel monitors uptime automatically
- Email alerts for failed deployments

#### Weekly (Manual)
- [ ] Visit landing page
- [ ] Test login to main-board
- [ ] Test login to 2-3 companies
- [ ] Check console for errors
- [ ] Verify images load

### Performance Monitoring

#### Vercel Analytics
Enable in Vercel dashboard for:
- Page load times
- Visitor statistics
- Error rates

#### Lighthouse Scores
Run monthly:
```bash
npm run build
npm start
# Open Chrome DevTools > Lighthouse > Run

Target scores:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90
```

### Error Monitoring

**Option 1: Vercel Logs**
- Vercel > Project > Logs
- Review errors and warnings

**Option 2: Sentry (Optional)**
For more advanced monitoring:
```bash
npm install @sentry/nextjs
```

---

## Troubleshooting

### Common Issues

#### Issue: Build Fails

**Symptoms:**
- `npm run build` fails
- Vercel deployment fails
- TypeScript errors

**Solutions:**
1. Check TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```

2. Check for syntax errors:
   ```bash
   npm run lint
   ```

3. Clear cache and rebuild:
   ```bash
   rm -rf .next
   npm run build
   ```

4. Check recent changes:
   ```bash
   git diff HEAD~1
   ```

#### Issue: Page Not Found (404)

**Symptoms:**
- Tenant page shows 404
- Redirects to home

**Solutions:**
1. Verify tenant slug in `src/config/tenants.ts`
2. Check middleware is running
3. Clear browser cache
4. Check Vercel deployment logs

#### Issue: Authentication Not Working

**Symptoms:**
- Can't login
- Immediately logged out
- Redirect loop

**Solutions:**
1. Check password in environment variables
2. Clear browser cookies
3. Verify environment variable name matches config
4. Check middleware.ts is running

#### Issue: Data Not Loading

**Symptoms:**
- Page shows "No data"
- Console errors about imports

**Solutions:**
1. Verify JSON file exists at correct path
2. Check JSON is valid:
   ```bash
   cat path/to/file.json | jq '.'
   ```
3. Check loader function path is correct
4. Verify import statement

#### Issue: Images Not Displaying

**Symptoms:**
- Broken image icons
- Alt text showing

**Solutions:**
1. Verify image exists in `public/` folder
2. Check path is correct (relative to public)
3. Check file extension matches
4. Verify Next.js Image component used

#### Issue: Slow Performance

**Symptoms:**
- Pages load slowly
- Large bundle size

**Solutions:**
1. Run Lighthouse audit
2. Check for large JSON files (>1MB)
3. Optimize images
4. Use dynamic imports for large components
5. Check Vercel analytics for bottlenecks

---

## Emergency Procedures

### Production Site Down

1. **Check Vercel status**
   - https://www.vercel-status.com/

2. **Check deployment logs**
   - Vercel > Deployments > View Logs

3. **Rollback if needed**
   ```bash
   # Vercel > Deployments > Find last working deployment
   # Click "..." > Promote to Production
   ```

4. **Investigate and fix**
   - Identify issue in logs
   - Fix locally
   - Test thoroughly
   - Deploy

### Data Corruption

1. **Identify corrupted file**
   ```bash
   find src/data -name "*.json" -exec sh -c 'cat {} | jq . > /dev/null 2>&1 || echo {}' \;
   ```

2. **Restore from Git**
   ```bash
   git checkout HEAD~1 -- src/data/path/to/file.json
   ```

3. **Or restore from backup**
   ```bash
   tar -xzf backup-data-20250101.tar.gz
   ```

4. **Test and deploy**

### Lost Environment Variables

1. **Check `.env.example`** for structure
2. **Contact team** for production passwords
3. **Reset passwords** if needed
4. **Update Vercel** environment variables
5. **Redeploy**

---

## Contact Information

### Key People

**Development Team:**
- Primary Developer: [Your Name]
- Email: [your-email]

**Hosting:**
- Platform: Vercel
- Account: [account-email]

**Repository:**
- GitHub: [repo-url]

### External Services

**Hosting:**
- Vercel Dashboard: https://vercel.com/dashboard
- Documentation: https://vercel.com/docs

**Next.js:**
- Documentation: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js

**Support:**
- Next.js Discord: https://nextjs.org/discord
- Vercel Support: https://vercel.com/support

---

## Maintenance Log Template

Keep a maintenance log:

```markdown
# Maintenance Log

## 2025-01-15
- Updated quarterly report Q4 2024
- Rotated passwords for all tenants
- Updated dependencies (Next.js 16.0.1 → 16.0.2)
- Time: 2 hours
- Issues: None

## 2025-01-01
- Added new tenant: New Company AS
- Migrated property data
- Tested all pages
- Time: 4 hours
- Issues: Fixed TypeScript errors in loader
```

---

**Guide Version:** 1.0
**Last Updated:** 2025-11-19
**Next Review:** March 2025

For additional help, see:
- `SESSION_CONTEXT.md` - Current platform state
- `DECISIONS.md` - Technical decisions
- `DEPLOYMENT.md` - Deployment procedures
- `CONTRIBUTING.md` - Development workflow
