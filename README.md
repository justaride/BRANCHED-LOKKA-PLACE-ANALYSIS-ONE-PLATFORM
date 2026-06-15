# Løkka Gardeierforening Platform

**Multi-tenant property analysis platform for Grünerløkka, Oslo**

> A comprehensive place analysis platform serving property developers and the Natural State research team with detailed demographic, market, and development data for 51 properties across Grünerløkka.

[![Deployment](https://img.shields.io/badge/Deployed-Coolify-0f766e)](#-deployment)
[![Framework](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-Private-red)]()

---

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the platform.

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

**Live Site:** Configured via Cloudflare DNS -> Coolify app

---

## 📖 Overview

### What is This?

This platform serves **10 separate tenants** under one codebase:
- **1× Main Board** - Natural State place analysis hub
- **9× Property Developers** - Individual company sites with portfolio data

### Key Features

✅ **Multi-Tenant Architecture** - One app, ten tenant surfaces
✅ **Cloudflare Access** - Authentication is handled at the edge before traffic reaches the app
✅ **Dynamic Routing** - Easy to add new companies
✅ **51 Properties** - Complete place analysis data
✅ **Professional Design** - Portfolio hero images & responsive UI
✅ **Type-Safe** - Full TypeScript coverage
✅ **Production Ready** - Live on Coolify (Hetzner) behind Cloudflare

---

## 🏢 Tenants & Properties

### Main Board (`/main-board`)
**Natural State Place Analysis**
- 📊 Monthly Analyses
- 📈 Quarterly Reports
- 📅 Event Analysis
- 🌐 Natural State branding

### Property Developers

| Company | Route | Properties | Focus |
|---------|-------|-----------|-------|
| **SPABO Eiendom** | `/spabo` | 22 | Largest portfolio |
| **Aspelin Reitan** | `/aspelin-reitan` | 6 | FutureBuilt Vulkan + Mathallen |
| **Maya Eiendom** | `/maya-eiendom` | 4 | Markveien |
| **Brødrene Evensen** | `/brodrene-evensen` | 3 | Mixed portfolio |
| **Roger Vodal** | `/roger-vodal` | 3 | Brenneriveien |
| **SiO** | `/sio` | 3 | Student housing |
| **Eiendomsspar** | `/eiendomsspar` | 2 | Thorvald Meyers gate |
| **Front Real Estate** | `/front-real-estate` | 1 | Single property |
| **Carucel** | `/carucel` | 1 | Olaf Ryes plass 4 (1-min analysis) |

**Total: 51 properties with place analysis data**

---

## 🛠 Tech Stack

### Core
- **[Next.js 16.2.6](https://nextjs.org)** - React framework with App Router
- **[React 19.2](https://react.dev)** - Latest React with Server Components
- **[TypeScript](https://www.typescriptlang.org)** - Strict mode enabled
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first styling
- **[Turbopack](https://turbo.build/pack)** - Fast bundler
- **[Recharts](https://recharts.org)** - Interactive data visualizations

### Features
- ✅ Server Components for optimal performance
- ✅ Static generation where possible
- ✅ Image optimization with next/image
- ✅ Cloudflare Access at the edge
- ✅ Type-safe data loading
- ✅ Maintenance mode and tenant route guard
- ✅ Silent failure detection with prebuild verification
- ✅ Jest unit tests with 70% coverage threshold

### Deployment
- **Platform:** [Coolify](https://coolify.io)
- **Infrastructure:** Hetzner + Cloudflare proxy/cache
- **CI/CD:** Git push to `main` triggers Coolify redeploy
- **Environment:** Production-ready

---

## 📁 Project Structure

```
lokka-gardeierforening-platform/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── page.tsx              # Landing page
│   │   ├── login/                # Authentication
│   │   ├── main-board/           # Natural State hub
│   │   ├── [company]/            # Dynamic company sites
│   │   ├── brodrene-evensen/     # Company sites
│   │   ├── carucel/
│   │   ├── eiendomsspar/
│   │   ├── front-real-estate/
│   │   ├── maya-eiendom/
│   │   ├── roger-vodal/
│   │   ├── sio/
│   │   └── spabo/
│   ├── components/               # React components
│   │   ├── layout/              # Header, Footer, Nav
│   │   ├── property/            # Property components
│   │   └── ui/                  # UI components
│   ├── data/                    # Property JSON data
│   │   ├── aspelin-ramm/         # Legacy data path for Aspelin Reitan
│   │   ├── brodrene-evensen/
│   │   ├── carucel/
│   │   ├── eiendomsspar/
│   │   ├── front-real-estate/
│   │   ├── maya-eiendom/
│   │   ├── roger-vodal/
│   │   ├── sio/
│   │   └── spabo/
│   ├── lib/                     # Utilities & loaders
│   │   ├── loaders/            # Data loading functions
│   │   └── utils/              # Utility modules
│   │       ├── safe-data.ts    # Null-safe data utilities
│   │       ├── property-defaults.ts # Property field defaults
│   │       └── __tests__/      # Unit tests
│   └── types/                   # TypeScript definitions
├── scripts/                     # Build & verification scripts
│   └── verify-project.js       # Silent failure detection
├── public/                      # Static assets
│   └── images/                 # Images & screenshots
│       ├── companies/          # Portfolio hero images
│       └── areas/              # Area images
├── proxy.ts                    # Maintenance mode and tenant route guard
├── jest.config.js              # Jest test configuration
└── tailwind.config.ts         # Tailwind configuration
```

---

## 🔐 Authentication

### How It Works

Authentication is handled by **Cloudflare Access** in front of the Coolify app. The Next.js app does not expose a `/login` route or an OTP auth API.

`src/proxy.ts` only handles maintenance mode and redirects unknown tenant slugs back to the landing page.

---

## 🎨 Design System

### Visual Components

**Company Pages:**
1. Hero Section with CTA buttons
2. **Portfolio Hero Image** (large, branded visual)
3. Development Notice (feedback collection)
4. Properties CTA (prominent link)
5. Features Grid (3 information cards)
6. Natural State Card (branding footer)

**Main Board:**
1. Hero Banner (full-width with Natural State branding)
2. Feature Cards (3 clear analysis options)
3. Social Media Section (LinkedIn, Instagram, Facebook)
4. Natural State Preview (embedded website)

### UI Features
- ✅ Responsive design (mobile → tablet → desktop)
- ✅ Next.js Image optimization
- ✅ Gradient overlays for readability
- ✅ Hover effects and transitions
- ✅ Context-aware navigation
- ✅ Professional typography

---

## 🚀 Deployment

### Coolify Setup

The platform is configured for deployment through Coolify:

1. **Environment Variables Required:**
   ```
   NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.gle/btff6meFZSHaYHUE9
   ```

2. **Build Settings (Coolify):**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Automatic Deployments:**
   - Push to `main` -> Production deploy in Coolify
   - Trigger manual redeploy from Coolify when env vars change

### Manual Deployment

```bash
# Build locally
npm run build

# Test production build
npm start

# Push to trigger Coolify deploy
git push origin main
```

---

## 📊 Data Structure

### Property Data Format

Each property has:
- **Basic Info:** Address, name, tenant
- **Place Analysis:** Plaace screenshot paths
- **Demographics:** Population, age distribution
- **Market Data:** Prices, transactions
- **Images:** Hero images, photos

### Example Property JSON

```json
{
  "id": "property-slug",
  "name": "Property Name",
  "address": "Street Address",
  "tenant": "company-name",
  "plaaceScreenshot": "/images/plaace/property.png",
  "demographics": { ... },
  "market": { ... }
}
```

---

## 🧪 Testing

### Automated Testing

```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Coverage:**
- `src/lib/utils/__tests__/safe-data.test.ts` - Null-safe utility tests
- `src/lib/utils/__tests__/property-defaults.test.ts` - Property default tests

### Manual Testing

```bash
# Start dev server
npm run dev

# Test routes
- Visit http://localhost:3001
- Test all 9 tenant pages
- Verify authentication
- Check property listings
- Test property detail pages
```

### Build Testing

```bash
# Production build (runs verify + type-check automatically)
npm run build

# Check for errors
- TypeScript compilation
- Image optimization
- Route generation
- Silent failure detection
```

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3001)
npm run build        # Build for production (includes verify + type-check)
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
npm run verify       # Silent failure detection scan

# Testing
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

---

## 🎯 Recent Updates

### December 9, 2025

**Silent Failure Detection System (Latest):**
- ✅ Created `scripts/verify-project.js` - Automated silent failure detection
- ✅ Created `src/lib/utils/safe-data.ts` - Null-safe data utilities for charts
- ✅ Created `src/lib/utils/property-defaults.ts` - Property field defaults
- ✅ Added Jest testing framework with 70% coverage threshold
- ✅ Implemented prebuild hook for automatic verification
- ✅ Updated all 7 property loaders with sanitization
- ✅ Fixed null handling in chart components (Recharts)

**Verification System Features:**
- JSON file validation (257 files scanned)
- Loader integrity checks
- Null value detection in critical paths
- Build-time safety with prebuild hook

**Project Health & Code Quality Improvements:**
- ✅ Security: Upgraded Next.js 16.0.3 → 16.0.8 (fixed critical RCE vulnerability)
- ✅ ESLint errors reduced from 118 → 64 (46% reduction)
- ✅ Fixed component render bugs (CustomTooltip moved outside render)
- ✅ Cleaned up unused imports/variables across 15+ files
- ✅ Removed malformed directories and broken templates
- ✅ Build verified with 111 static pages generated

**Code Quality Phases Completed:**
- Phase 1: Quick fixes (malformed dirs, Link components, setState fixes)
- Phase 2: Unused imports, any types in loaders, empty directories
- Phase 3: Component render bugs, biblioteket cleanup, type improvements
- Phase 4: Silent failure detection, null handling, test coverage

### November 27, 2025

**Mathallen Oslo - Interactive 1-Minute Analysis:**
- ✅ Added Mathallen Oslo to the Aspelin portfolio, now branded Aspelin Reitan
- ✅ Implemented interactive 1-minute analysis with 4 data categories
- ✅ Created OneMinAnalysisViewer component for interactive data display
- ✅ Converted CSV data to JSON for bevegelse, korthandel, konkurransebilde, aktorer
- ✅ 12 business actors with full financial data (97.6M NOK total revenue)
- ✅ Updated PropertyCard to show property names (not just addresses)
- ✅ Front Real Estate rebranding (formerly Malling & Co)

**1-Minute Analysis Features:**
- Bevegelse (Movement): Daily visits, hourly patterns, quarterly trends
- Korthandel (Card transactions): Revenue by day/week, category breakdown
- Konkurransebilde (Competition): Market analysis, chain vs independent
- Aktorer (Actors): 12 businesses with revenue, growth, market share

**Technical Implementation:**
- Static imports for stable Next.js production builds in data loaders
- Recharts integration for interactive visualizations
- Conditional rendering (interactive charts OR legacy screenshots)
- TypeScript strict mode compliance

### November 26, 2025

**2024 Årsrapport Interactive Charts:**
- ✅ Replaced static screenshots with 12 interactive visualizations
- ✅ Created 3 new React chart components (43 KB code)
- ✅ Converted 12 CSV files to JSON (238.5 KB data, 1,580 rows)
- ✅ Updated metadata with accurate 2024 statistics
- ✅ Fixed middleware to allow `/data` path access
- ✅ Implemented Recharts with Norwegian formatting
- ✅ Tab-based navigation for better UX

**Data Updates:**
- Daily traffic: 43,500 → 54,286 (+24.8%)
- Annual visitors: 165,000 → 19,814,390
- Revenue: 3.97B → 4.01B NOK (+1%)
- Business count: 359 → 374 (+4.2%)

**Components Created:**
- `KonkurransebildeCharts.tsx` - Competition analysis (4 charts)
- `KorthandelCharts.tsx` - Card transaction data (4 charts)
- `BevegelseCharts.tsx` - Movement patterns (4 charts)

**Områdesammenligning 2024 Interactive Charts:**
- ✅ Replaced static screenshots with 9 interactive 4-area comparison charts
- ✅ Created 4 new React comparison components (43 KB code, 1,247 lines)
- ✅ Converted 9 CSV files to JSON (23.64 KB data, 108 objects)
- ✅ Implemented 4-area comparison (Grünerløkka, Bjørvika, Sentrum, Majorstuen)
- ✅ Color-coded districts for easy identification
- ✅ 76 comparison data series across all charts
- ✅ Norwegian locale formatting throughout

**Data Categories:**
- Bevegelse (3 charts): Hourly patterns, weekly patterns, yearly trends
- Demografi (4 charts): Age distribution, household types, income, median income
- Besøkende (1 chart): Housing types
- Internasjonal (1 chart): Top 20 countries

**Components Created:**
- `BevegelseComparisonCharts.tsx` - Movement comparison (3 tabs, 19 KB)
- `DemografiComparisonCharts.tsx` - Demographics comparison (4 tabs, 14 KB)
- `InternasjonalComparisonCharts.tsx` - International visitors (1 chart, 5.3 KB)
- `BesokendeComparisonCharts.tsx` - Housing comparison (1 chart, 4.7 KB)

### November 22, 2025

**Visual Enhancements:**
- ✅ Added portfolio hero images to all 8 company pages
- ✅ Implemented responsive image loading
- ✅ Added gradient overlays for text readability

**UI Cleanup:**
- ✅ Removed unbuilt comparison feature from main-board
- ✅ Streamlined features from 4 to 3 cards
- ✅ Improved user flow

**Integration:**
- ✅ Fixed Google Form feedback URL
- ✅ Updated production environment variables
- ✅ Verified all deployments

---

## 📚 Documentation

Detailed documentation available:
- [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) - Complete project overview
- [`docs/architecture/DEPLOYMENT.md`](./docs/architecture/DEPLOYMENT.md) - Coolify deployment guide
- [`docs/architecture/MAINTENANCE.md`](./docs/architecture/MAINTENANCE.md) - Operations & maintenance guide

---

## 🤝 Contributing

This is a private project for Løkka Gardeierforening and Natural State.

**For team members:**
1. Create feature branch from `main`
2. Make changes
3. Submit pull request
4. Wait for review and approval

---

## 📞 Support

**Project Lead:** Løkka Gardeierforening
**Technical Partner:** Natural State
**Deployment:** Coolify (Hetzner) behind Cloudflare

**Contact:**
- Natural State: kontakt@naturalstate.no
- Website: [naturalstate.no](https://naturalstate.no)

---

## 📄 License

Private & Confidential - © 2025 Løkka Gardeierforening & Natural State

---

## 🌟 Status

**Current:** 99% Complete
**Deployment:** ✅ Live on Coolify
**Quality:** 🚀 Production Ready
**Build:** ✅ 111 static pages, 64 ESLint issues (down from 118)
**Tests:** ✅ Jest configured with 70% coverage threshold
**Last Major Updates:**
- Silent Failure Detection System (Dec 9, 2025)
- Code Quality & Security Improvements (Dec 9, 2025)
- Mathallen Oslo Interactive 1-Min Analysis (Nov 27, 2025)
- 2024 Årsrapport Interactive Charts (Nov 26, 2025)

Built with ❤️ using Next.js 16.0.8, TypeScript, Tailwind CSS 4, Recharts, and Jest
