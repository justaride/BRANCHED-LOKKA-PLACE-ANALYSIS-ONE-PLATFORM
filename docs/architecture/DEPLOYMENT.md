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

# Auth
AUTH_SECRET=<openssl rand -hex 32>
RESEND_API_KEY=<resend-api-key>
AUTH_FROM_EMAIL=<sender@domain>
ADMIN_EMAILS=<comma-separated>

# Tenant email allowlists
MAIN_BOARD_EMAILS=
ASPELIN_RAMM_EMAILS=
BRODRENE_EVENSEN_EMAILS=
CARUCEL_EMAILS=
EIENDOMSSPAR_EMAILS=
FRONT_REAL_ESTATE_EMAILS=
MAYA_EIENDOM_EMAILS=
ROGER_VODAL_EMAILS=
SIO_EMAILS=
SPABO_EMAILS=

# Password fallback (legacy)
MAIN_BOARD_PASSWORD=
ASPELIN_RAMM_PASSWORD=
BRODRENE_EVENSEN_PASSWORD=
CARUCEL_PASSWORD=
EIENDOMSSPAR_PASSWORD=
FRONT_REAL_ESTATE_PASSWORD=
MAYA_EIENDOM_PASSWORD=
ROGER_VODAL_PASSWORD=
SIO_PASSWORD=
SPABO_EIENDOM_PASSWORD=
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
- `/main-board` login fungerer
- OTP-flow fungerer (request + verify)
- Minst 2 tenant-sider fungerer
- Nøkkel-analyser laster uten runtime-feil
- Ingen kritiske errors i Coolify logs

---

## Cloudflare-anbefaling

- Cache static assets normalt (`/_next/static`, bilder, fonts)
- Bypass cache for HTML/auth-sensitive ruter
- Bruk `Vary: Cookie` + private/no-store på auth-beskyttet innhold

---

## Rollback

### Option A: Coolify redeploy av tidligere fungerende commit

1. Finn siste grønne deploy i Coolify.
2. Redeploy den versjonen.
3. Bekreft helse og login.

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

### Login/OTP feiler i produksjon

- Verifiser `AUTH_SECRET`, `RESEND_API_KEY`, `AUTH_FROM_EMAIL`
- Verifiser tenant e-postallowlist env vars
- Verifiser Cloudflare cache bypass for HTML/auth

---

## Eierskap

- Drift: Coolify/Hetzner
- Edge/DNS: Cloudflare
- Kildekode + release trigger: GitHub `main`
