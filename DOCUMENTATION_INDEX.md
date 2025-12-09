# Documentation Index

**Project:** Løkka Gårdeierforening Multi-Tenant Platform
**Last Updated:** December 9, 2025
**Status:** Reorganized for Claude optimization

---

## Quick Start

**New to the project?** Start here:

1. **Read `CLAUDE.md`** - Project context, patterns, and quick reference
2. **Read `README.md`** - Project overview and setup
3. **Check `PROJECT_STATUS.md`** - Current state and progress
4. **Run `npm run dev`** - Start developing!

---

## Root Files (Essential)

| File | Purpose | When to Use |
|------|---------|-------------|
| `CLAUDE.md` | Claude context & patterns | Every session |
| `README.md` | Project overview | First time / sharing |
| `PROJECT_STATUS.md` | Current state & progress | Check status |
| `DOCUMENTATION_INDEX.md` | This file | Find documentation |

---

## Documentation Structure

```
docs/
├── architecture/       # Technical decisions & setup
│   ├── DECISIONS.md           # Why we built it this way
│   ├── DEPLOYMENT.md          # Vercel deployment guide
│   ├── CONTRIBUTING.md        # Development workflow
│   ├── GIT_WORKFLOW.md        # Git best practices
│   ├── MAINTENANCE.md         # Long-term maintenance
│   ├── GITHUB_SETUP.md        # GitHub configuration
│   └── PASSWORDS.md           # Authentication details
│
├── guides/             # Implementation guides
│   ├── ANALYSIS_PLAN.md                    # Analysis implementation
│   ├── BILDE_IMPLEMENTERING_PLAN.md        # Image implementation
│   ├── DESIGN_SAMMENLIGNING.md             # Design comparison
│   └── EIENDOMSUTVIKLER_IMPLEMENTERINGSPLAN.md  # Developer plan
│
├── sessions/           # Session logs (historical)
│   ├── 2025-11-19-SESSION1.md
│   ├── 2025-11-25-SESSION_ANALYSER.md
│   ├── 2025-11-26-ARSRAPPORT-CHARTS.md
│   ├── 2025-11-26-SAMMENLIGNING-CHARTS.md
│   ├── 2025-11-27-BIBLIOTEKET.md
│   ├── 2025-11-27-MATHALLEN-1MIN-ANALYSIS.md
│   └── ... (21 total session logs)
│
└── archive/            # Completed work (reference only)
    ├── *_IMPLEMENTATION_SUMMARY.md
    ├── *_FULLFORT.md
    └── ... (14 archived files)
```

---

## Documentation by Task

### "I want to..."

| Task | Documentation |
|------|---------------|
| Start working | `CLAUDE.md` → `README.md` |
| Understand architecture | `docs/architecture/DECISIONS.md` |
| Deploy to production | `docs/architecture/DEPLOYMENT.md` |
| Add new feature | `docs/architecture/CONTRIBUTING.md` |
| Git workflow | `docs/architecture/GIT_WORKFLOW.md` |
| Maintain the platform | `docs/architecture/MAINTENANCE.md` |
| Review past sessions | `docs/sessions/` |
| See completed implementations | `docs/archive/` |

---

## Key Technical Files

### Data & Loaders
```
src/lib/loaders/          # Data loaders (7 tenants + main-board)
src/lib/utils/            # Utilities (safe-data, property-defaults)
src/data/                 # JSON data (257 files)
src/types/                # TypeScript definitions
```

### Components
```
src/components/layout/    # Header, Footer, Navigation
src/components/property/  # Property components
src/components/ui/        # UI components
src/components/analyser/  # Chart components (Recharts)
```

### Configuration
```
src/config/tenants.ts     # Tenant configuration
src/middleware.ts         # Route protection
next.config.ts            # Next.js config
tailwind.config.ts        # Styling config
```

---

## Session Log Format

When creating new session logs, use this format:
```
docs/sessions/YYYY-MM-DD-DESCRIPTION.md
```

**Template:**
```markdown
# Session: [Description]

**Date:** YYYY-MM-DD
**Focus:** [Main accomplishments]

## Completed
- [x] Task 1
- [x] Task 2

## Technical Changes
- File: Change description

## Next Steps
- [ ] Remaining task
```

---

## Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run test             # Run tests
npm run verify           # Silent failure detection

# Code quality
npm run lint             # ESLint
npm run type-check       # TypeScript

# Git
git status               # Check changes
git add -p               # Stage interactively
git commit -m "msg"      # Commit
git push                 # Deploy via Vercel
```

---

## Maintenance

### Adding Documentation
1. Choose appropriate folder (architecture/guides/sessions)
2. Use consistent naming (UPPERCASE for guides, date prefix for sessions)
3. Update this index if adding new categories

### Archiving
Move completed implementation summaries to `docs/archive/` when:
- Feature is fully complete and deployed
- No longer actively referenced
- Historical value only

---

## Statistics

| Category | Count |
|----------|-------|
| Root files | 4 |
| Architecture docs | 7 |
| Guide docs | 4 |
| Session logs | 21 |
| Archived docs | 14 |
| **Total** | **50** |

---

**Version:** 2.0 (Reorganized)
**Last Updated:** December 9, 2025
