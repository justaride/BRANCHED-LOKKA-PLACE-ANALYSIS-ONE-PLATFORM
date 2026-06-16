# Coolify Deployment Guide

**Project:** Løkka Gårdeierforening Multi-Tenant Platform  
**Last Updated:** 2026-02-26

Denne guiden beskriver gjeldende produksjonsoppsett: **Coolify + Hetzner + Cloudflare**.

---

## Deploy-arkitektur

```text
GitHub (main)
  -> webhook / pull
Coolify app (Hetzner)
  -> build + runtime
Cloudflare
  -> DNS + TLS + cache/proxy
End users
```

---

## Prerequisites

- GitHub repository koblet til Coolify
- Coolify prosjekt/app opprettet
- Cloudflare-domain peker til riktig origin
- Production env vars satt i Coolify

---

## App-konfig i Coolify

Bruk eksisterende app, eller opprett en ny med:

- **Source:** GitHub repo
- **Branch:** `main`
- **Install command:** `npm install`
- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Port:** `3000` (eller port satt i app/runtime)
- **Auto deploy:** Enabled on push to `main`

Hvis prosjektet kjører via Dockerfile i Coolify, behold samme prinsipp: `npm run build` i build-stage og `npm start` i runtime-stage.

---

## Miljøvariabler (Coolify)

Minimum:

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://<production-domain>
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.gle/btff6meFZSHaYHUE9

# Cloudflare Access handles authentication before requests reach the app.
ADMIN_EMAILS=<comma-separated>

# Tenant email allowlists
MAIN_BOARD_EMAILS=
ASPELIN_REITAN_EMAILS=
# Legacy fallback during migration. Prefer ASPELIN_REITAN_EMAILS for new deploys.
ASPELIN_RAMM_EMAILS=
BRODRENE_EVENSEN_EMAILS=
CARUCEL_EMAILS=
EIENDOMSSPAR_EMAILS=
FRONT_REAL_ESTATE_EMAILS=
MAYA_EIENDOM_EMAILS=
ROGER_VODAL_EMAILS=
SIO_EMAILS=
SPABO_EMAILS=

# Access control is handled entirely by Cloudflare Access (see comment above).
# There is no in-app login. {TENANT}_EMAILS / ADMIN_EMAILS are only for internal utils/tests.
```

Ved endring av env vars: kjør ny deploy fra Coolify.

---

## Standard deploy-prosess

1. Kjør lokal verifisering:
   - `npm run verify`
   - `npm run type-check`
   - `npm run build`
2. Push til `main`.
3. Bekreft at Coolify-deploy starter automatisk.
4. Følg build/runtime-logger i Coolify til status er `healthy`.
5. Verifiser produksjon via Cloudflare-domain.

---

## Etter deploy (checklist)

- Landing page svarer 200
- Cloudflare Access protects the production domain
- `/main-board` loads after Cloudflare authentication
- Minst 2 tenant-sider fungerer
- Nøkkel-analyser laster uten runtime-feil
- Ingen kritiske errors i Coolify logs

---

## Cloudflare-anbefaling

- Cache static assets normalt (`/_next/static`, bilder, fonts)
- Bypass cache for HTML/auth-sensitive ruter
- Hold HTML/auth-sensitive ruter uten edge-cache

---

## Rollback

### Option A: Coolify redeploy av tidligere fungerende commit

1. Finn siste grønne deploy i Coolify.
2. Redeploy den versjonen.
3. Bekreft helse og Cloudflare Access.

### Option B: Git revert

```bash
git revert <bad-commit>
git push origin main
```

Dette trigger ny deploy i Coolify med revert.

---

## Feilsøking

### Build feiler

- Kjør `npm run build` lokalt først
- Sjekk `npm run verify` og `npm run type-check`
- Bekreft at nye filer faktisk er committed

### App starter ikke

- Sjekk start command og port i Coolify
- Sjekk runtime logs for manglende env vars

### Cloudflare Access feiler i produksjon

- Verifiser Cloudflare Access application policy
- Verifiser Cloudflare DNS/proxy peker til riktig Coolify origin
- Verifiser Cloudflare cache bypass for HTML

---

## Eierskap

- Drift: Coolify/Hetzner
- Edge/DNS: Cloudflare
- Kildekode + release trigger: GitHub `main`
