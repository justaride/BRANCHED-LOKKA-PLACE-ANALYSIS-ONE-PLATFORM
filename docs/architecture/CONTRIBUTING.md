# Contributing Guide

**Project:** Løkka Gårdeierforening Multi-Tenant Platform
**Last Updated:** 2025-11-19

Guide for developers working on this project.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Testing Guidelines](#testing-guidelines)
5. [Git Workflow](#git-workflow)
6. [Adding Features](#adding-features)
7. [Making Changes](#making-changes)
8. [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites

**Required:**
- Node.js 18+ (LTS recommended)
- npm 9+
- Git
- Code editor (VS Code recommended)

**Recommended VS Code Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### Initial Setup

#### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/lokka-gardeierforening.git
cd lokka-gardeierforening
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Set Up Environment
```bash
# Copy example environment file
cp .env.example .env.local

# All passwords are "test123" in development
# No need to modify .env.local for local development
```

#### 4. Run Development Server
```bash
npm run dev
```

#### 5. Verify Setup
Open http://localhost:3000

**Expected:**
- Landing page loads
- Can login to /main-board (password: test123)
- Can login to any company (password: test123)
- No console errors

---

## Development Workflow

### Daily Workflow

#### 1. Start Your Day
```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Start dev server
npm run dev
```

#### 2. Make Changes
- Create feature branch
- Write code
- Test locally
- Commit regularly

#### 3. End Your Day
```bash
# Commit your work
git add .
git commit -m "WIP: Description of what you worked on"
git push origin your-branch-name
```

### Feature Development Workflow

```
1. Create branch
2. Implement feature
3. Test thoroughly
4. Update documentation
5. Commit changes
6. Push to GitHub
7. Create Pull Request
8. Code review
9. Merge to main
10. Deploy (automatic)
```

---

## Code Standards

### TypeScript

**Rules:**
- Use TypeScript for all new code
- Enable strict mode
- Define interfaces for data structures
- Avoid `any` type
- Use type inference when obvious

**Good:**
```typescript
interface Property {
  id: string;
  address: string;
  area: number;
}

function displayProperty(property: Property) {
  // Implementation
}
```

**Bad:**
```typescript
function displayProperty(property: any) {
  // Avoid any
}
```

### React Components

**File Organization:**
```typescript
// 1. Imports (grouped)
import { ReactNode } from 'react';
import { getTenant } from '@/config/tenants';
import { Container } from '@/components/ui/Container';

// 2. Types/Interfaces
interface Props {
  title: string;
  children: ReactNode;
}

// 3. Component
export default function MyComponent({ title, children }: Props) {
  return (
    <Container>
      <h1>{title}</h1>
      {children}
    </Container>
  );
}
```

**Naming Conventions:**
- Components: PascalCase (`PropertyCard.tsx`)
- Files: kebab-case or PascalCase for components
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase

**Component Rules:**
- One component per file
- Server components by default
- Add `'use client'` only when needed
- Use semantic HTML
- Keep components small and focused

### Styling

**Tailwind CSS:**
- Use Tailwind utility classes
- Group related utilities
- Use custom colors from theme
- Avoid inline styles
- Use responsive utilities

**Good:**
```tsx
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-gray-600">Content</p>
</div>
```

**Responsive:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

### File Structure

**Organize by feature:**
```
src/
├── app/                    # Routes
│   ├── [company]/         # Company routes
│   └── main-board/        # Main Board routes
├── components/            # React components
│   ├── analyser/         # Analysis components
│   ├── demografi/        # Demographic components
│   ├── layout/           # Layout components
│   ├── place/            # Place analysis components
│   └── ui/               # UI components
├── config/               # Configuration
├── data/                 # JSON data
│   ├── companies/       # Company data
│   └── main-board/      # Main Board data
├── lib/                  # Utilities
│   └── loaders/         # Data loaders
└── types/               # TypeScript types
```

### Data Files

**JSON Standards:**
- Valid JSON (use linter)
- Consistent formatting (2 spaces)
- Meaningful property names
- Document structure in types

**Validation:**
```bash
# Validate JSON file
cat file.json | jq '.'
```

---

## Testing Guidelines

### Manual Testing Checklist

**Before committing:**
- [ ] Feature works as expected
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive on mobile
- [ ] Works in Chrome, Safari, Firefox

### Testing Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit

# Lint code
npm run lint
```

### Testing New Features

**Comprehensive test:**
1. **Desktop testing**
   - Chrome
   - Safari
   - Firefox

2. **Mobile testing**
   - iPhone (Safari)
   - Android (Chrome)
   - Responsive design mode

3. **Authentication testing**
   - Login works
   - Logout works
   - Redirects work
   - Multiple tenants

4. **Cross-browser testing**
   - Same functionality everywhere
   - No browser-specific bugs

5. **Performance testing**
   - Page load time <3s
   - No janky animations
   - Smooth scrolling

---

## Git Workflow

### Branch Naming

**Convention:**
```
feature/description       # New feature
fix/description          # Bug fix
docs/description         # Documentation
refactor/description     # Code refactoring
```

**Examples:**
```
feature/add-quarterly-report
fix/authentication-redirect
docs/update-readme
refactor/simplify-loader
```

### Commit Messages

**Format:**
```
<type>: <description>

[optional body]
[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Testing
- `chore`: Maintenance

**Examples:**
```
feat: Add quarterly report page for Main Board

- Create new page at /main-board/analyser/quarterly
- Add data loader for quarterly data
- Implement chart components
- Test with sample data

fix: Correct authentication redirect loop

Users were getting stuck in redirect loop when
accessing /main-board without auth cookie.
Fixed by checking cookie before redirecting.

docs: Update deployment guide with custom domain setup
```

### Standard Workflow

```bash
# 1. Create branch from main
git checkout main
git pull
git checkout -b feature/my-new-feature

# 2. Make changes
# ... edit files ...

# 3. Stage changes
git add .

# 4. Commit
git commit -m "feat: Add my new feature"

# 5. Push to GitHub
git push origin feature/my-new-feature

# 6. Create Pull Request on GitHub

# 7. After review and approval, merge

# 8. Delete branch
git checkout main
git pull
git branch -d feature/my-new-feature
```

See `GIT_WORKFLOW.md` for detailed Git practices.

---

## Adding Features

### Process for New Features

#### 1. Planning
- [ ] Define feature requirements
- [ ] Sketch UI/UX
- [ ] Identify affected components
- [ ] Estimate time
- [ ] Get approval (if major)

#### 2. Implementation
- [ ] Create feature branch
- [ ] Write code
- [ ] Add types
- [ ] Update components
- [ ] Add data (if needed)

#### 3. Testing
- [ ] Test feature thoroughly
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Performance check

#### 4. Documentation
- [ ] Update relevant docs
- [ ] Add code comments
- [ ] Update README if needed

#### 5. Review & Merge
- [ ] Create Pull Request
- [ ] Address review feedback
- [ ] Merge to main
- [ ] Verify in production

### Example: Adding a New Analysis Page

**Goal:** Add a new analysis page to Main Board

**Steps:**

#### 1. Create Data File
```bash
# Add data
src/data/main-board/analyser/new-analysis.json
```

#### 2. Add Type Definition
```typescript
// src/types/new-analysis.ts
export interface NewAnalysisData {
  title: string;
  data: AnalysisPoint[];
}
```

#### 3. Create Loader
```typescript
// src/lib/loaders/main-board.ts
export async function loadNewAnalysis() {
  const data = await import('@/data/main-board/analyser/new-analysis.json');
  return data.default;
}
```

#### 4. Create Page
```typescript
// src/app/main-board/analyser/new-analysis/page.tsx
import { MainBoardLoaders } from '@/lib/loaders/main-board';
import { Container } from '@/components/ui/Container';

export default async function NewAnalysisPage() {
  const data = await MainBoardLoaders.loadNewAnalysis();

  return (
    <Container>
      <h1>{data.title}</h1>
      {/* Render data */}
    </Container>
  );
}
```

#### 5. Add Navigation Link
```typescript
// src/components/layout/Navigation.tsx
// Add link to navigation
```

#### 6. Test
```bash
npm run dev
# Navigate to /main-board/analyser/new-analysis
# Verify page loads and displays correctly
```

#### 7. Commit
```bash
git add .
git commit -m "feat: Add new analysis page to Main Board

- Add new-analysis.json data file
- Create type definitions
- Implement data loader
- Build page component
- Add to navigation
- Test thoroughly"
git push
```

---

## Making Changes

### Modifying Existing Components

**Before modifying:**
1. Check where component is used
2. Understand current behavior
3. Plan changes carefully
4. Consider backward compatibility

**Example: Updating PropertyCard**

```bash
# Find all usages
grep -r "PropertyCard" src/

# Before change:
<PropertyCard property={property} />

# After change (backward compatible):
<PropertyCard property={property} showDetails={true} />

# Or (with default):
<PropertyCard property={property} />  # Still works!
```

### Updating Data

**Safe data updates:**

```bash
# 1. Backup first
cp src/data/main-board/analyser/data.json \
   src/data/main-board/analyser/data.json.backup

# 2. Make changes
code src/data/main-board/analyser/data.json

# 3. Validate
cat src/data/main-board/analyser/data.json | jq '.'

# 4. Test
npm run dev

# 5. If good, commit
git add src/data/main-board/analyser/data.json
git commit -m "Update analysis data for Q4 2024"

# 6. Remove backup
rm src/data/main-board/analyser/data.json.backup
```

### Updating Types

**When data structure changes:**

```typescript
// Before
interface Property {
  id: string;
  address: string;
}

// After (adding field)
interface Property {
  id: string;
  address: string;
  area?: number;  // Optional to maintain compatibility
}

// Or (breaking change - be careful!)
interface Property {
  id: string;
  address: string;
  area: number;  // Required - update all data!
}
```

---

## Pull Request Process

### Creating a Pull Request

#### 1. Prepare Branch
```bash
# Ensure branch is up to date
git checkout main
git pull
git checkout your-branch
git rebase main

# Fix any conflicts
# Test after rebase
npm run dev
```

#### 2. Push to GitHub
```bash
git push origin your-branch
```

#### 3. Create PR on GitHub
- Go to repository
- Click "Pull Requests"
- Click "New Pull Request"
- Select your branch
- Fill out template

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Testing
- [ ] Tested locally
- [ ] Cross-browser tested
- [ ] Mobile tested
- [ ] No TypeScript errors
- [ ] Build succeeds

## Screenshots (if UI changes)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] Backward compatible (or noted)
```

### Review Process

**Reviewer checks:**
- [ ] Code quality
- [ ] Follows standards
- [ ] Tests passing
- [ ] Documentation updated
- [ ] No security issues

**Author responds:**
- Address feedback
- Make requested changes
- Reply to comments
- Re-request review

### Merging

**After approval:**
1. Ensure CI passes (if configured)
2. Rebase if needed
3. Merge to main
4. Delete branch
5. Verify deployment

---

## Best Practices

### General

1. **Keep it simple** - Avoid over-engineering
2. **Test thoroughly** - Manual testing is critical
3. **Document as you go** - Don't wait
4. **Commit often** - Small, focused commits
5. **Ask questions** - When in doubt, ask

### Performance

1. **Optimize images** - Compress before adding
2. **Lazy load** - Use Next.js Image component
3. **Split code** - Dynamic imports for large components
4. **Minimize JSON** - Keep data files under 1MB

### Security

1. **No secrets in code** - Use environment variables
2. **Validate inputs** - Always sanitize
3. **Use TypeScript** - Type safety prevents bugs
4. **Update dependencies** - Monthly reviews

### Accessibility

1. **Semantic HTML** - Use proper elements
2. **Alt text** - All images need descriptions
3. **Keyboard navigation** - Test without mouse
4. **Color contrast** - Meet WCAG standards

---

## Common Tasks

### Add a New Tenant

See `MIGRATION_TEMPLATE.md` for complete process.

**Quick summary:**
1. Add to `src/config/tenants.ts`
2. Add environment variable
3. Create data directories
4. Add data files
5. Create loader
6. Test thoroughly

### Update Quarterly Data

```bash
# 1. Add new data file
src/data/main-board/quarterly/Q1-2026.json

# 2. Add loader (if new)
# src/lib/loaders/main-board.ts

# 3. Update page to use new data

# 4. Test
npm run dev

# 5. Commit
git add src/data/main-board/quarterly/Q1-2026.json
git commit -m "Add Q1 2026 quarterly data"
```

### Fix a Bug

```bash
# 1. Create fix branch
git checkout -b fix/bug-description

# 2. Reproduce bug
npm run dev
# Identify issue

# 3. Fix issue
# Edit relevant files

# 4. Test fix
# Verify bug is gone

# 5. Commit
git add .
git commit -m "fix: Description of bug fix"
git push

# 6. Create PR
```

---

## Getting Help

### Resources

**Documentation:**
- `SESSION_CONTEXT.md` - Current state
- `DECISIONS.md` - Why things are done this way
- `MAINTENANCE.md` - Ongoing maintenance
- `docs/architecture/DEPLOYMENT.md` - Production deployment

**External:**
- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- TypeScript Docs: https://www.typescriptlang.org/docs
- Tailwind Docs: https://tailwindcss.com/docs

### Questions

**For project-specific questions:**
- Check documentation first
- Review existing code
- Ask team lead
- Create GitHub issue

---

## Code Review Guidelines

### As a Reviewer

**Check for:**
- [ ] Code quality and style
- [ ] TypeScript types correct
- [ ] No console.logs left in
- [ ] Documentation updated
- [ ] Tests described
- [ ] Backward compatibility

**Provide:**
- Constructive feedback
- Specific suggestions
- Praise for good work
- Clear action items

### As an Author

**Before requesting review:**
- [ ] Self-review your code
- [ ] Test thoroughly
- [ ] Update documentation
- [ ] Write clear PR description

**During review:**
- Accept feedback graciously
- Ask clarifying questions
- Make requested changes
- Thank reviewers

---

**Guide Version:** 1.0
**Last Updated:** 2025-11-19

For questions or suggestions, contact the development team.
