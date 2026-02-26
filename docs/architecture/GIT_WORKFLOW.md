# Git Workflow & Best Practices

**Project:** Løkka Gårdeierforening Multi-Tenant Platform
**Last Updated:** 2025-11-19

Comprehensive Git workflow guide for this project.

---

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Branch Strategy](#branch-strategy)
3. [Commit Guidelines](#commit-guidelines)
4. [Daily Workflow](#daily-workflow)
5. [Feature Development](#feature-development)
6. [Hotfixes](#hotfixes)
7. [Code Review](#code-review)
8. [Common Scenarios](#common-scenarios)
9. [Git Commands Cheatsheet](#git-commands-cheatsheet)
10. [Troubleshooting](#troubleshooting)

---

## Quick Reference

### Most Common Commands

```bash
# Start work
git pull origin main
git checkout -b feature/my-feature

# During work
git add .
git commit -m "feat: description"
git push origin feature/my-feature

# Finish work
# Create Pull Request on GitHub
# After approval: merge on GitHub
git checkout main
git pull
git branch -d feature/my-feature
```

### Commit Message Format

```
<type>: <description>

[optional body]
```

**Types:** feat, fix, docs, style, refactor, test, chore

---

## Branch Strategy

### Main Branch

**Branch:** `main`
**Purpose:** Production-ready code
**Protection:** Should be protected in production
**Deployment:** Auto-deploys to Coolify

**Rules:**
- Never commit directly to main
- All changes via Pull Request
- Must pass review before merge
- Must build successfully
- Should always be deployable

### Feature Branches

**Naming Convention:**
```
feature/short-description
fix/bug-description
docs/what-youre-documenting
refactor/what-youre-refactoring
```

**Examples:**
```
feature/add-quarterly-report
feature/aspelin-ramm-migration
fix/authentication-redirect
fix/broken-image-loading
docs/update-deployment-guide
refactor/simplify-data-loaders
```

**Rules:**
- Branch from main
- Keep focused (one feature/fix)
- Delete after merge
- Regular commits
- Push frequently

### Branch Lifecycle

```
main
  ↓
feature/my-feature (created)
  ↓
commits... (development)
  ↓
push to GitHub
  ↓
Pull Request
  ↓
Code Review
  ↓
Merge to main
  ↓
Delete feature branch
```

---

## Commit Guidelines

### Commit Message Format

**Structure:**
```
<type>: <subject>

<body>

<footer>
```

**Example:**
```
feat: Add quarterly report page for Main Board

Created new analysis page that displays quarterly
financial data with charts and insights. Includes
data loader and responsive design.

- Add quarterly-report.json data file
- Create QuarterlyReportPage component
- Implement data loader
- Add to navigation

Closes #123
```

### Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: Add property search` |
| `fix` | Bug fix | `fix: Correct login redirect` |
| `docs` | Documentation | `docs: Update README` |
| `style` | Formatting | `style: Format code with Prettier` |
| `refactor` | Code restructure | `refactor: Simplify auth logic` |
| `test` | Add/update tests | `test: Add login tests` |
| `chore` | Maintenance | `chore: Update dependencies` |

### Writing Good Commit Messages

**Good:**
```
feat: Add demographic analysis page

Display population trends, income distribution,
and household composition for Grünerløkka.
Uses existing demografi components.
```

**Bad:**
```
Update stuff
```

**Best Practices:**
- Use present tense ("Add" not "Added")
- Be specific
- Explain why, not just what
- Reference issues if applicable
- Keep subject under 50 chars
- Wrap body at 72 chars

---

## Daily Workflow

### Starting Your Day

```bash
# 1. Switch to main branch
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Check status
git status

# 4. Install any new dependencies
npm install

# 5. Start dev server
npm run dev
```

### During Development

```bash
# Check what you've changed
git status
git diff

# Stage changes
git add .
# Or specific files
git add src/app/main-board/analyser/page.tsx

# Commit
git commit -m "feat: Add analysis page"

# Push (creates backup, enables collaboration)
git push origin your-branch-name
```

### Ending Your Day

```bash
# Ensure all work is committed
git status

# Commit any remaining work
git add .
git commit -m "WIP: Continue tomorrow"

# Push to GitHub (backup!)
git push origin your-branch-name

# Check logs
git log --oneline -5
```

---

## Feature Development

### Complete Feature Workflow

#### 1. Plan Feature
- Define requirements
- Sketch approach
- Estimate time
- Get approval if major

#### 2. Create Branch
```bash
git checkout main
git pull
git checkout -b feature/quarterly-report-page
```

#### 3. Implement Feature
```bash
# Make changes
code src/app/main-board/analyser/quarterly/page.tsx

# Test locally
npm run dev

# Commit incrementally
git add src/app/main-board/analyser/quarterly/
git commit -m "feat: Create quarterly report page structure"

# Continue development
# ... more changes ...

git add src/lib/loaders/
git commit -m "feat: Add quarterly data loader"

# More commits as you go...
```

#### 4. Prepare for Review
```bash
# Ensure up to date with main
git checkout main
git pull
git checkout feature/quarterly-report-page
git rebase main

# Resolve any conflicts
# Test after rebase
npm run dev
npm run build

# Push to GitHub
git push origin feature/quarterly-report-page
```

#### 5. Create Pull Request
1. Go to GitHub repository
2. Click "Pull Requests"
3. Click "New Pull Request"
4. Select your branch
5. Fill out PR template
6. Request review
7. Submit

#### 6. Address Feedback
```bash
# Make requested changes
# ... edit files ...

# Commit changes
git add .
git commit -m "Address review feedback: improve error handling"

# Push
git push origin feature/quarterly-report-page

# PR automatically updates
```

#### 7. Merge & Cleanup
```bash
# After approval, merge on GitHub
# Then locally:

git checkout main
git pull  # Gets merged changes

git branch -d feature/quarterly-report-page  # Delete local
git push origin --delete feature/quarterly-report-page  # Delete remote
```

---

## Hotfixes

### Critical Production Fixes

**When:** Production is broken and needs immediate fix

#### 1. Create Hotfix Branch
```bash
git checkout main
git pull
git checkout -b fix/critical-login-bug
```

#### 2. Fix Issue
```bash
# Make minimal changes to fix bug
code src/middleware.ts

# Test fix
npm run dev

# Commit
git add src/middleware.ts
git commit -m "fix: Correct authentication redirect loop

Users were stuck in redirect loop when accessing
protected pages. Fixed by checking cookie exists
before redirecting to login."

# Push
git push origin fix/critical-login-bug
```

#### 3. Fast-Track Review
- Create PR immediately
- Mark as "urgent"
- Request immediate review
- Merge ASAP after approval

#### 4. Deploy
- Merge to main
- Coolify auto-deploys
- Monitor production

---

## Code Review

### As a Reviewer

#### Review Checklist
```bash
# 1. Pull branch locally
git fetch
git checkout feature/branch-name

# 2. Review code
git diff main

# 3. Test locally
npm install
npm run dev

# 4. Check for issues
npm run build
npx tsc --noEmit

# 5. Provide feedback on GitHub
```

**What to Check:**
- [ ] Code quality
- [ ] Follows conventions
- [ ] TypeScript types correct
- [ ] No console.logs left
- [ ] Documentation updated
- [ ] Tests described
- [ ] No secrets in code
- [ ] Builds successfully

### As an Author

**Before Requesting Review:**
```bash
# Self-review
git diff main

# Check build
npm run build

# Check types
npx tsc --noEmit

# Check for console.logs
grep -r "console.log" src/

# Update documentation
# Write clear PR description
```

---

## Common Scenarios

### Scenario 1: Made Changes to Wrong Branch

**Problem:** Committed to main instead of feature branch

**Solution:**
```bash
# Don't panic! Create new branch with changes
git checkout -b feature/my-feature

# Reset main
git checkout main
git reset --hard origin/main

# Continue work on feature branch
git checkout feature/my-feature
```

### Scenario 2: Need to Switch Branches Mid-Work

**Problem:** Working on feature A, need to fix bug urgently

**Solution:**
```bash
# Stash current work
git stash save "WIP: feature A"

# Create fix branch
git checkout main
git pull
git checkout -b fix/urgent-bug

# ... fix bug and commit ...

# Return to feature work
git checkout feature/feature-a
git stash pop
```

### Scenario 3: Merge Conflict

**Problem:** PR has conflicts with main

**Solution:**
```bash
# Update your branch
git checkout your-branch
git fetch origin
git rebase origin/main

# Git will pause at conflicts
# Edit conflicted files (look for <<<<<<)
# Remove conflict markers
# Save files

# Continue rebase
git add .
git rebase --continue

# If stuck, abort and ask for help
git rebase --abort

# After resolving, push
git push --force-with-lease origin your-branch
```

### Scenario 4: Accidentally Committed Sensitive Data

**Problem:** Committed password or API key

**Solution:**
```bash
# IMMEDIATE: Remove from last commit
git reset --soft HEAD~1
# Edit file to remove secret
git add .
git commit -m "Your message"

# If already pushed
git push --force-with-lease

# Then:
# 1. Rotate the compromised secret
# 2. Update environment variables
# 3. Notify team
```

### Scenario 5: Want to Undo Last Commit

**Problem:** Last commit was wrong

**Solution:**
```bash
# Keep changes, undo commit
git reset --soft HEAD~1

# Or: discard changes (careful!)
git reset --hard HEAD~1

# Or: make new commit that undoes
git revert HEAD
```

---

## Git Commands Cheatsheet

### Branching

```bash
# List branches
git branch

# Create branch
git branch feature/new-feature

# Switch to branch
git checkout feature/new-feature

# Create and switch (shortcut)
git checkout -b feature/new-feature

# Delete branch (local)
git branch -d feature/old-feature

# Delete branch (force)
git branch -D feature/old-feature

# Delete branch (remote)
git push origin --delete feature/old-feature
```

### Committing

```bash
# Stage all changes
git add .

# Stage specific file
git add src/app/page.tsx

# Commit
git commit -m "message"

# Amend last commit
git commit --amend

# Stage and commit
git commit -am "message"
```

### Syncing

```bash
# Fetch changes
git fetch

# Pull changes
git pull

# Pull with rebase
git pull --rebase

# Push changes
git push

# Push new branch
git push -u origin branch-name

# Force push (careful!)
git push --force-with-lease
```

### Viewing History

```bash
# Recent commits
git log

# One line per commit
git log --oneline

# Last 5 commits
git log --oneline -5

# With graph
git log --graph --oneline

# File history
git log -- path/to/file
```

### Undoing Changes

```bash
# Discard changes in working directory
git restore file.txt

# Unstage file
git restore --staged file.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create new commit that undoes
git revert HEAD
```

### Stashing

```bash
# Stash changes
git stash

# Stash with message
git stash save "message"

# List stashes
git stash list

# Apply latest stash
git stash pop

# Apply specific stash
git stash apply stash@{0}

# Delete stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

### Comparing

```bash
# See unstaged changes
git diff

# See staged changes
git diff --staged

# Compare branches
git diff main..feature-branch

# Compare specific file
git diff main..feature-branch -- file.txt
```

---

## Troubleshooting

### Issue: Can't Pull - Uncommitted Changes

```bash
# Option 1: Stash and pull
git stash
git pull
git stash pop

# Option 2: Commit first
git add .
git commit -m "WIP: Save work"
git pull
```

### Issue: Merge Conflict

```bash
# During pull or merge
# 1. Git will show conflicted files

# 2. Open files and look for:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# 3. Edit to keep desired code
# 4. Remove conflict markers

# 5. Stage and commit
git add .
git commit -m "Resolve merge conflict"
```

### Issue: Pushed Wrong Code

```bash
# If just pushed and haven't done anything else
git reset --hard HEAD~1
git push --force-with-lease

# If others have pulled
# Create new commit to fix:
git revert HEAD
git push
```

### Issue: Lost Commits

```bash
# Git keeps history for ~30 days
# Use reflog to find lost commits
git reflog

# Find your commit hash
# Restore it
git checkout <commit-hash>

# Create branch from it
git checkout -b recovered-work
```

---

## Best Practices

### DO ✅

- Commit frequently (small, focused commits)
- Write clear commit messages
- Pull before starting work
- Push regularly (backup!)
- Use feature branches
- Delete merged branches
- Review your own diff before committing
- Test before committing

### DON'T ❌

- Commit directly to main
- Commit secrets or passwords
- Commit node_modules
- Commit .env.local
- Use `git push --force` (use --force-with-lease)
- Leave branches undeleted
- Commit broken code
- Skip code review

---

## Git Configuration

### Recommended Git Config

```bash
# Your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Default branch name
git config --global init.defaultBranch main

# Better diff output
git config --global diff.algorithm histogram

# Colorful output
git config --global color.ui auto

# Reuse recorded conflict resolutions
git config --global rerere.enabled true

# Better log output
git config --global alias.lg "log --graph --oneline --decorate --all"
```

### .gitignore

**Current .gitignore** (verify these are ignored):
```
node_modules/
.next/
.env.local
.DS_Store
*.log
```

---

## Emergency Commands

### Oh No! I Broke Everything!

```bash
# Discard ALL local changes (nuclear option)
git reset --hard HEAD
git clean -fd

# Go back to remote state
git reset --hard origin/main

# Restore specific file from main
git checkout origin/main -- path/to/file

# Undo last N commits
git reset --hard HEAD~N
```

### Get Help

```bash
# Git help
git help <command>
git help commit

# Show Git version
git --version

# Show current config
git config --list
```

---

## GitHub Integration

### Pull Requests

**Creating:**
1. Push branch to GitHub
2. Visit repository
3. Click "Compare & pull request"
4. Fill template
5. Assign reviewers
6. Submit

**Reviewing:**
1. Click on PR
2. Review "Files changed"
3. Add comments
4. Approve or request changes

**Merging:**
1. Ensure CI passes
2. Ensure approved
3. Click "Merge pull request"
4. Delete branch (GitHub offers this)

### Issues

**Link commits to issues:**
```bash
git commit -m "fix: Correct login bug

Fixes #123"
```

This automatically closes issue #123 when merged.

---

## Resources

### Learning

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
- Atlassian Git Tutorials: https://www.atlassian.com/git/tutorials

### Tools

- GitKraken (GUI): https://www.gitkraken.com
- GitHub Desktop: https://desktop.github.com
- VS Code Git Integration (built-in)

---

**Guide Version:** 1.0
**Last Updated:** 2025-11-19

For project-specific guidelines, see:
- `CONTRIBUTING.md` - Development workflow
- `docs/architecture/DEPLOYMENT.md` - Deployment procedures
- `MAINTENANCE.md` - Maintenance guide
