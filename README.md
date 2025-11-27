# Løkka Gardeierforening Platform

**Multi-tenant property analysis platform for Grünerløkka, Oslo**

> A comprehensive place analysis platform serving property developers and the natural state research team with detailed demographic, market, and development data for 42 properties across Grünerløkka.

[![Deployment](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://lokka-gardeierforening-platform.vercel.app)
[![Framework](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)](https://nextjs.org)
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

**Live Site:** [https://lokka-gardeierforening-platform.vercel.app](https://lokka-gardeierforening-platform.vercel.app)

---

## 📖 Overview

### What is This?

This platform serves **9 separate tenants** under one codebase:
- **1× Main Board** - Natural State place analysis hub
- **8× Property Developers** - Individual company sites with portfolio data

### Key Features

✅ **Multi-Tenant Architecture** - One app, nine sites
✅ **Separate Authentication** - Each tenant has own password
✅ **Dynamic Routing** - Easy to add new companies
✅ **42 Properties** - Complete place analysis data
✅ **Professional Design** - Portfolio hero images & responsive UI
✅ **Type-Safe** - Full TypeScript coverage
✅ **Production Ready** - Live on Vercel

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
| **Aspelin Ramm** | `/aspelin-ramm` | 5 | FutureBuilt Vulkan + Mathallen |
| **Maya Eiendom** | `/maya-eiendom` | 4 | Markveien |
| **Brødrene Evensen** | `/brodrene-evensen` | 3 | Mixed portfolio |
| **Roger Vodal** | `/roger-vodal` | 3 | Brenneriveien |
| **SiO** | `/sio` | 3 | Student housing |
| **Eiendomsspar** | `/eiendomsspar` | 2 | Thorvald Meyers gate |
| **Front Real Estate** | `/malling-co` | 1 | Single property |

**Total: 43 properties with complete place analysis data**

---

## 🛠 Tech Stack

### Core
- **[Next.js 16.0.3](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - Latest React with Server Components
- **[TypeScript](https://www.typescriptlang.org)** - Strict mode enabled
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first styling
- **[Turbopack](https://turbo.build/pack)** - Fast bundler

### Features
- ✅ Server Components for optimal performance
- ✅ Static generation where possible
- ✅ Image optimization with next/image
- ✅ Route protection middleware
- ✅ Type-safe data loading
- ✅ Cookie-based authentication

### Deployment
- **Platform:** [Vercel](https://vercel.com)
- **Domain:** Custom domain ready
- **CI/CD:** Automatic deployments from main branch
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
│   │   ├── aspelin-ramm/         # Company sites
│   │   ├── brodrene-evensen/     # (8 total companies)
│   │   ├── eiendomsspar/
│   │   ├── malling-co/
│   │   ├── maya-eiendom/
│   │   ├── roger-vodal/
│   │   ├── sio/
│   │   └── spabo/
│   ├── components/               # React components
│   │   ├── layout/              # Header, Footer, Nav
│   │   ├── property/            # Property components
│   │   └── ui/                  # UI components
│   ├── data/                    # Property JSON data
│   │   ├── aspelin-ramm/
│   │   ├── brodrene-evensen/
│   │   ├── eiendomsspar/
│   │   ├── malling-co/
│   │   ├── maya-eiendom/
│   │   ├── roger-vodal/
│   │   ├── sio/
│   │   └── spabo/
│   ├── lib/                     # Utilities & loaders
│   │   ├── loaders/            # Data loading functions
│   │   └── utils.ts            # Helper functions
│   └── types/                   # TypeScript definitions
├── public/                      # Static assets
│   └── images/                 # Images & screenshots
│       ├── companies/          # Portfolio hero images
│       └── areas/              # Area images
├── middleware.ts               # Route protection
└── tailwind.config.ts         # Tailwind configuration
```

---

## 🔐 Authentication

### How It Works

Each tenant has **separate authentication**:
- Per-tenant cookie-based sessions
- 7-day expiry
- Password-protected routes
- Cross-tenant navigation supported

### Test Credentials

```
Password (all tenants): test123
```

### Cookie Names
- `auth-main-board`
- `auth-aspelin-ramm`
- `auth-brodrene-evensen`
- `auth-eiendomsspar`
- `auth-malling-co`
- `auth-maya-eiendom`
- `auth-roger-vodal`
- `auth-sio`
- `auth-spabo`

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

### Vercel Setup

The platform is configured for automatic deployment on Vercel:

1. **Environment Variables Required:**
   ```
   NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.gle/btff6meFZSHaYHUE9
   ```

2. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Automatic Deployments:**
   - Push to `main` → Production deploy
   - Pull requests → Preview deploys

### Manual Deployment

```bash
# Build locally
npm run build

# Test production build
npm start

# Deploy to Vercel
vercel --prod
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
# Production build
npm run build

# Check for errors
- TypeScript compilation
- Image optimization
- Route generation
```

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3001)
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

---

## 🎯 Recent Updates

### November 27, 2025

**Mathallen Oslo - Interactive 1-Minute Analysis:**
- ✅ Added Mathallen Oslo to Aspelin Ramm portfolio (5th property)
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
- Static imports for Vercel compatibility in data loaders
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
- [`PROGRESS_UPDATE.md`](./PROGRESS_UPDATE.md) - Latest progress & changes
- [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) - Complete project overview
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) - Deployment guide

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
**Deployment:** Vercel

**Contact:**
- Natural State: kontakt@naturalstate.no
- Website: [naturalstate.no](https://naturalstate.no)

---

## 📄 License

Private & Confidential - © 2025 Løkka Gardeierforening & Natural State

---

## 🌟 Status

**Current:** 99% Complete
**Deployment:** ✅ Live on Vercel
**Quality:** 🚀 Production Ready
**Last Major Updates:**
- Mathallen Oslo Interactive 1-Min Analysis (Nov 27, 2025)
- 2024 Årsrapport Interactive Charts (Nov 26, 2025)
- Områdesammenligning 2024 Interactive Charts (Nov 26, 2025)

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Recharts
