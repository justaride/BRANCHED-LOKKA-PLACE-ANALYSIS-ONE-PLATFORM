# Vercel Deployment Guide

**Project:** Løkka Gårdeierforening Multi-Tenant Platform
**Last Updated:** 2025-11-19
**Version:** 1.0

Complete guide for deploying the multi-tenant platform to Vercel production.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deployment Strategy](#deployment-strategy)
3. [Initial Deployment](#initial-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Domain Configuration](#domain-configuration)
6. [Post-Deployment Testing](#post-deployment-testing)
7. [Continuous Deployment](#continuous-deployment)
8. [Rollback Procedures](#rollback-procedures)
9. [Monitoring](#monitoring)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- [x] GitHub account with repo access
- [x] Vercel account (free tier sufficient initially)
- [ ] Domain registrar account (optional, for custom domains)

### Required Access
- [x] Admin access to GitHub repository
- [x] Strong production passwords generated
- [x] List of authorized users per tenant

### Pre-Deployment Checklist
- [x] All code committed to Git
- [x] All tests passing locally
- [x] Build succeeds locally (`npm run build`)
- [x] No TypeScript errors
- [x] Documentation complete
- [x] Production passwords prepared
- [x] Stakeholders notified

---

## Deployment Strategy

### Single Deployment Approach

**Recommended:** Deploy as **ONE Vercel project** serving all 9 tenants.

**Architecture:**
```
Vercel Project: lokka-gardeierforening
    ↓
Single Next.js App
    ↓
Serves 9 tenants via dynamic routing
    ↓
Default domain: lokka-gardeierforening.vercel.app
```

**Why Single Project?**
- ✅ Simplest deployment
- ✅ One environment to manage
- ✅ Automatic preview deployments
- ✅ Free tier sufficient
- ✅ True multi-tenancy

**URLs:**
- Main Board: `https://lokka-gardeierforening.vercel.app/main-board`
- Companies: `https://lokka-gardeierforening.vercel.app/{company-slug}`

### Alternative: Custom Domains Per Tenant

**Optional:** Configure custom domains later

**Example:**
- `grunerlokka-analyse.no` → Main Board
- `aspelin-ramm.grunerlokka-analyse.no` → Aspelin Ramm
- `sio.grunerlokka-analyse.no` → SiO

See [Domain Configuration](#domain-configuration) for details.

---

## Initial Deployment

### Step 1: Prepare GitHub Repository

#### 1.1 Verify Repository
```bash
cd ~/Downloads/lokka-gardeierforening-platform

# Check status
git status

# Ensure everything committed
git add .
git commit -m "Prepare for production deployment"
```

#### 1.2 Push to GitHub
```bash
# If not already pushed
git remote add origin https://github.com/YOUR_USERNAME/lokka-gardeierforening.git
git branch -M main
git push -u origin main
```

#### 1.3 Verify on GitHub
- Visit repository URL
- Confirm all files present
- Check latest commit matches local

### Step 2: Create Vercel Project

#### 2.1 Sign Up / Log In to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" (or "Log In")
3. Choose "Continue with GitHub"
4. Authorize Vercel

#### 2.2 Import Project
1. Click "Add New..." → "Project"
2. Find `lokka-gardeierforening` repository
3. Click "Import"

#### 2.3 Configure Project
**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

**Install Command:** `npm install` (default)

**Leave these as default** - Next.js is auto-configured

#### 2.4 Environment Variables

**⚠️ CRITICAL:** Add production passwords before deploying

Click "Environment Variables" section:

| Name | Value | Environment |
|------|-------|-------------|
| `MAIN_BOARD_PASSWORD` | `[strong-password]` | Production |
| `ASPELIN_RAMM_PASSWORD` | `[strong-password]` | Production |
| `BRODRENE_EVENSEN_PASSWORD` | `[strong-password]` | Production |
| `EIENDOMSSPAR_PASSWORD` | `[strong-password]` | Production |
| `MALLING_CO_PASSWORD` | `[strong-password]` | Production |
| `MAYA_EIENDOM_PASSWORD` | `[strong-password]` | Production |
| `ROGER_VODAL_PASSWORD` | `[strong-password]` | Production |
| `SIO_PASSWORD` | `[strong-password]` | Production |
| `SPABO_EIENDOM_PASSWORD` | `[strong-password]` | Production |

**Password Requirements:**
- Minimum 16 characters
- Mix of uppercase, lowercase, numbers, symbols
- Unique per tenant
- Documented securely (password manager)

**Example Strong Password:**
```
Kj8#mP2@vL9$xQ4!wR6&tY3^
```

**Generate Strong Passwords:**
```bash
# macOS/Linux
openssl rand -base64 24

# Or use password manager (1Password, LastPass, etc.)
```

#### 2.5 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Watch build logs
4. Success! 🎉

---

## Environment Configuration

### Production Environment Variables

**After deployment**, verify environment variables:

1. **Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

2. **Verify all 9 passwords set**

3. **Add additional variables if needed:**

| Variable | Value | Purpose |
|----------|-------|---------|
| `NODE_ENV` | `production` | Automatic |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Optional |

### Development vs Production

**Development (`.env.local`):**
```bash
MAIN_BOARD_PASSWORD=test123
ASPELIN_RAMM_PASSWORD=test123
# ... simple passwords for testing
```

**Production (Vercel):**
```bash
MAIN_BOARD_PASSWORD=Kj8#mP2@vL9$xQ4!wR6&
ASPELIN_RAMM_PASSWORD=mN5$pQ2@wX9#vT4!bK8&
# ... strong unique passwords
```

### Updating Environment Variables

**When you need to change a password:**

1. Vercel Dashboard → Settings → Environment Variables
2. Find variable
3. Click "Edit"
4. Enter new value
5. Click "Save"
6. **Important:** Redeploy for changes to take effect
   - Go to Deployments
   - Latest deployment → "..." → "Redeploy"

---

## Domain Configuration

### Option 1: Use Vercel Domain (Free)

**Default URL:**
```
https://lokka-gardeierforening.vercel.app
```

**Tenants accessible at:**
- `https://lokka-gardeierforening.vercel.app/main-board`
- `https://lokka-gardeierforening.vercel.app/aspelin-ramm`
- etc.

**No configuration needed** - works immediately.

### Option 2: Custom Domain (Recommended)

**Example:** `grunerlokka-analyse.no`

#### Step 1: Purchase Domain
- Use Namecheap, GoDaddy, or any registrar
- Recommended: .no domain for Norwegian project

#### Step 2: Add Domain to Vercel
1. Vercel Dashboard → Settings → Domains
2. Enter domain: `grunerlokka-analyse.no`
3. Click "Add"

#### Step 3: Configure DNS
Vercel provides DNS records to add:

**Option A: Nameservers (Recommended)**
```
Point your domain's nameservers to:
- ns1.vercel-dns.com
- ns2.vercel-dns.com
```

**Option B: A Record**
```
Type: A
Name: @
Value: 76.76.21.21
```

#### Step 4: Wait for Propagation
- Usually 10-60 minutes
- Can take up to 24 hours
- Vercel shows "Valid Configuration" when ready

#### Step 5: Enable HTTPS
- Automatic via Vercel
- SSL certificate provisioned automatically
- Enforce HTTPS (redirect HTTP → HTTPS)

### Option 3: Subdomain Per Tenant (Advanced)

**Setup custom subdomain for each tenant:**

**Main Board:**
```
grunerlokka-analyse.no → Main Board
```

**Companies:**
```
aspelin-ramm.grunerlokka-analyse.no → Aspelin Ramm
sio.grunerlokka-analyse.no → SiO
```

**Implementation:**

1. **Add wildcard domain** to Vercel:
   ```
   *.grunerlokka-analyse.no
   ```

2. **Configure DNS:**
   ```
   Type: CNAME
   Name: *
   Value: cname.vercel-dns.com
   ```

3. **Update middleware** to handle subdomains:
   ```typescript
   // src/middleware.ts
   const hostname = request.headers.get('host') || '';
   const subdomain = hostname.split('.')[0];

   // Map subdomain to tenant
   if (subdomain === 'aspelin-ramm') {
     // Handle aspelin-ramm tenant
   }
   ```

**Note:** This is optional and can be added later.

---

## Post-Deployment Testing

### Immediate Testing (Critical)

After deployment succeeds, test immediately:

#### 1. Landing Page
- [ ] Visit: `https://your-deployment-url.vercel.app`
- [ ] Verify page loads
- [ ] Check all company links display
- [ ] Verify styling correct
- [ ] No console errors

#### 2. Authentication
- [ ] Click "Main Board" button
- [ ] Redirects to login
- [ ] Enter production password
- [ ] Successfully logs in
- [ ] Verify cookie persists
- [ ] Test logout

#### 3. Main Board
- [ ] Home page loads
- [ ] Navigation works
- [ ] "Om Prosjektet" page loads
- [ ] "Analyser" page loads (or placeholder)
- [ ] Images display
- [ ] No console errors

#### 4. Company Sites (Test 2-3)
- [ ] Visit `/aspelin-ramm`
- [ ] Login works
- [ ] Home page displays
- [ ] "Om Prosjektet" loads
- [ ] "Eiendommer" loads
- [ ] Cross-tenant "Områdeanalyse →" link works

#### 5. Cross-Browser Testing
Test in:
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

#### 6. Mobile Testing
Test on:
- [ ] iPhone
- [ ] Android
- [ ] iPad

#### 7. Performance
- [ ] Run Lighthouse audit
- [ ] Target scores: >90 all categories
- [ ] Page load time <3s

### Testing Checklist PDF

Create shareable testing checklist for stakeholders:

```markdown
# Production Testing Checklist

## Main Board (password: [provided separately])
- [ ] Login: https://your-url.vercel.app/main-board
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Images display properly

## Aspelin Ramm (password: [provided separately])
- [ ] Login: https://your-url.vercel.app/aspelin-ramm
- [ ] Property listings display
- [ ] All pages accessible

[Repeat for each company]

Report issues to: [your-email]
```

---

## Continuous Deployment

### Automatic Deployments

**Vercel auto-deploys on every push to `main`:**

```bash
# Make changes locally
git add .
git commit -m "Update quarterly report"
git push

# Vercel automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys if successful
# 4. Notifies you (email/Slack)
```

**Timeline:**
- Commit → Push: Instant
- Build starts: ~30 seconds
- Build completes: 1-3 minutes
- Live on production: 2-4 minutes total

### Preview Deployments

**Every branch gets a preview URL:**

```bash
# Create feature branch
git checkout -b feature/new-analysis-page

# Make changes and push
git push origin feature/new-analysis-page

# Vercel creates preview:
# https://lokka-gardeierforening-git-feature-new-analysis-page.vercel.app
```

**Benefits:**
- Test before merging to main
- Share with stakeholders
- No impact on production

### Deployment Notifications

**Configure in Vercel:**
1. Settings → Notifications
2. Enable:
   - Deployment Started
   - Deployment Ready
   - Deployment Failed

**Integrations:**
- Email (free)
- Slack (free)
- Discord (free)

---

## Rollback Procedures

### Quick Rollback (Instant)

**If production is broken:**

1. **Vercel Dashboard** → Deployments
2. Find **last working deployment**
3. Click **"..."** → **"Promote to Production"**
4. Confirm
5. **Live in ~30 seconds**

### Manual Rollback (Git)

**If you need to revert code:**

```bash
# Identify bad commit
git log

# Revert commit
git revert <commit-hash>

# Push (triggers auto-deploy)
git push

# Or reset to previous commit (careful!)
git reset --hard HEAD~1
git push --force  # Only if you're sure!
```

### Environment Variable Rollback

**If password change caused issue:**

1. Vercel → Settings → Environment Variables
2. Edit variable
3. Restore previous value
4. Redeploy

---

## Monitoring

### Vercel Analytics (Free)

**Enable:**
1. Vercel Dashboard → Analytics
2. Click "Enable Analytics"

**Provides:**
- Page views
- Unique visitors
- Performance metrics
- Geographic data

### Vercel Logs

**View logs:**
1. Vercel Dashboard → Deployments
2. Click deployment
3. View "Function Logs" tab

**Shows:**
- Server errors
- Build logs
- Runtime errors
- API calls

### Uptime Monitoring (Optional)

**External monitoring services:**

**Option 1: UptimeRobot (Free)**
- Monitor: `https://your-url.vercel.app`
- Check every 5 minutes
- Email alert if down

**Option 2: Pingdom (Paid)**
- More detailed monitoring
- Performance tracking

**Setup:**
1. Sign up at uptimerobot.com
2. Add monitor: `https://your-url.vercel.app`
3. Set alert email
4. Save

### Error Monitoring (Optional)

**Sentry Integration:**

```bash
npm install @sentry/nextjs
```

**Configuration:**
```bash
npx @sentry/wizard -i nextjs
```

**Provides:**
- Real-time error tracking
- Stack traces
- User impact analysis
- Performance monitoring

---

## Troubleshooting

### Build Failures

**Symptom:** Deployment fails during build

**Check:**
1. View build logs in Vercel
2. Look for error message
3. Common issues:
   - TypeScript errors
   - Missing dependencies
   - Invalid JSON

**Fix:**
1. Reproduce locally:
   ```bash
   npm run build
   ```
2. Fix errors
3. Test locally
4. Push fix

### Runtime Errors

**Symptom:** Build succeeds but pages error in production

**Debug:**
1. Vercel → Deployment → Function Logs
2. Look for errors
3. Check environment variables
4. Verify data files exist

**Common causes:**
- Missing environment variables
- Incorrect file paths
- Missing data files

### Slow Performance

**Check:**
1. Run Lighthouse audit
2. Review Vercel Analytics
3. Check bundle size:
   ```bash
   npm run build
   # Check output for large pages
   ```

**Optimize:**
- Compress images
- Split large JSON files
- Use dynamic imports
- Enable Vercel Image Optimization

### Authentication Issues

**Symptom:** Can't login in production

**Verify:**
1. Environment variable set correctly
2. Password matches exactly
3. Cookie settings correct (secure: true in production)

**Test:**
```typescript
// Add temporary logging (remove after debugging)
console.log('Checking auth for:', tenant);
console.log('Expected password:', process.env[passwordEnvVar]);
```

---

## Security Checklist

### Pre-Launch Security Review

- [x] All passwords strong (16+ chars)
- [x] Environment variables set correctly
- [x] No secrets in code
- [x] HTTPS enforced
- [x] Cookies secure in production
- [x] No console.logs with sensitive data
- [x] Dependencies updated
- [x] npm audit clean

### Post-Launch Security

- [ ] Monitor access logs
- [ ] Review failed login attempts
- [ ] Rotate passwords every 6 months
- [ ] Keep dependencies updated
- [ ] Review Vercel security advisories

---

## Launch Checklist

### Pre-Launch (Day Before)

- [ ] All content migrated
- [ ] All tests passing
- [ ] Build succeeds locally
- [ ] Documentation complete
- [ ] Production passwords prepared
- [ ] Stakeholders notified
- [ ] Support plan ready

### Launch Day

**Morning:**
- [ ] Final testing locally
- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] Create Vercel project
- [ ] Set environment variables
- [ ] Deploy
- [ ] Test production thoroughly

**Afternoon:**
- [ ] Share URLs with stakeholders
- [ ] Distribute passwords securely
- [ ] Monitor for issues
- [ ] Collect initial feedback

**Evening:**
- [ ] Review logs
- [ ] Check analytics
- [ ] Document any issues
- [ ] Plan fixes for tomorrow

### Post-Launch (Week 1)

- [ ] Daily monitoring
- [ ] Quick fixes for any issues
- [ ] Gather user feedback
- [ ] Performance tuning
- [ ] Documentation updates

---

## Deployment Timeline

### Realistic Timeline

**Preparation:** 1-2 hours
- Review code
- Generate passwords
- Prepare documentation

**Deployment:** 30-60 minutes
- Create Vercel project
- Configure environment
- Deploy and test

**Testing:** 2-3 hours
- Comprehensive testing
- Cross-browser testing
- Mobile testing
- Performance audit

**Handoff:** 1-2 hours
- Share credentials
- Train stakeholders
- Document issues
- Plan follow-up

**Total:** ~6-8 hours for first deployment

**Subsequent deployments:** ~5 minutes (automatic)

---

## Support Plan

### First 48 Hours

**Immediate support:**
- Monitor continuously
- Quick response to issues
- Available for questions

### First Month

**Active support:**
- Weekly check-ins
- Bug fixes
- Minor improvements
- Performance monitoring

### Ongoing

**Maintenance mode:**
- Monthly updates
- Quarterly reviews
- Security patches
- Dependency updates

---

## Success Criteria

Deployment is successful when:

- [x] All 9 tenants accessible
- [x] Authentication works for all
- [x] All data displays correctly
- [x] Images and assets load
- [x] Performance scores >90
- [x] No console errors
- [x] Mobile responsive
- [x] Cross-browser compatible
- [x] Stakeholders trained
- [x] Passwords distributed
- [x] Monitoring enabled
- [x] Documentation complete

---

## Contact & Resources

### Vercel Support
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support
- Discord: https://vercel.com/discord

### Emergency Contacts
- Primary Developer: [Your Name]
- Email: [your-email]
- Phone: [your-phone]

### Useful Links
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repository: [your-repo-url]
- Status Page: https://www.vercel-status.com/

---

**Guide Version:** 1.0
**Last Updated:** 2025-11-19
**Next Review:** After First Deployment

For additional help, see:
- `SESSION_CONTEXT.md` - Current platform state
- `MAINTENANCE.md` - Long-term maintenance
- `CONTRIBUTING.md` - Development workflow
- `GIT_WORKFLOW.md` - Git best practices
