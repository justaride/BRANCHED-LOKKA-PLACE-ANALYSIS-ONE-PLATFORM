# Platform Maintenance Guide (Coolify)

**Project:** Løkka Gårdeierforening Multi-Tenant Platform  
**Last Updated:** 2026-02-26

Denne guiden beskriver aktiv drift: **Coolify + Hetzner + Cloudflare**.

---

## Fast vedlikehold

## Ukentlig

- Sjekk siste deploy i Coolify (`healthy`)
- Sjekk runtime-logger for errors/warnings
- Verifiser login på `/main-board` + minst én tenant
- Verifiser at statiske assets lastes normalt via Cloudflare

## Månedlig

- Kjør dependency-gjennomgang (`npm outdated`)
- Kjør kvalitetssjekk lokalt: `npm run verify`, `npm run type-check`, `npm run test`
- Gå gjennom env vars i Coolify (mangler/duplikater)
- Bekreft Cloudflare cache-regler for auth-sensitive sider

## Kvartalsvis

- Oppdater dokumentasjon ved endringer i deployment/oppsett
- Verifiser backup/rollback-prosedyre
- Revider sikkerhet: secrets, allowlists, tilgangsstyring

---

## Standard change-prosess

1. Implementer endring i feature branch.
2. Valider lokalt:
   - `npm run lint`
   - `npm run verify`
   - `npm run type-check`
   - `npm run build`
3. Merge/push til `main`.
4. Bekreft auto-deploy i Coolify.
5. Kjør produksjonssmoke:
   - landing page
   - auth flow (OTP + fallback)
   - sentrale analyser

---

## Nye tenants / env vars

Ved nye tenants må du oppdatere begge:

- kode/config (`src/config/tenants.ts`, loader/data)
- Coolify env vars (`*_EMAILS`, eventuelt `*_PASSWORD` fallback)

Når env vars endres: kjør redeploy i Coolify.

---

## Backup og rollback

## Kode

- GitHub er primær historikk og backup.
- Tagg viktige releaser før større endringer.

## Data

- Datafiler ligger i repo og følger git-historikk.
- Ved større dataimport: ta snapshot-commit før merge.

## Rollback ved produksjonsfeil

### Option A: Redeploy siste grønne commit i Coolify

- Velg siste fungerende deploy
- Redeploy
- Bekreft health + login

### Option B: Git revert

```bash
git revert <bad-commit>
git push origin main
```

---

## Feilsøking (Coolify)

## Build feiler i Coolify

- Kjør `npm run build` lokalt
- Sjekk at `build` script og `prebuild` ikke feiler
- Verifiser at nødvendige filer er committed

## Runtime feiler etter deploy

- Sjekk start command/port i app settings
- Sjekk manglende env vars
- Sjekk logs for auth/runtime exceptions

## Auth-problemer

- Verifiser `AUTH_SECRET`, `RESEND_API_KEY`, `AUTH_FROM_EMAIL`
- Verifiser `ADMIN_EMAILS` og tenant `*_EMAILS`
- Verifiser Cloudflare cache bypass for HTML/auth-ruter

---

## Cloudflare driftspunkter

- Bypass cache for HTML-ruter med auth
- Cache static assets (`/_next/static`, images/fonts)
- Behold TLS full/strict og korrekt DNS mot origin

---

## Kontaktpunkter

- Deployment/hosting: Coolify + Hetzner
- DNS/edge/cache: Cloudflare
- Kildekode/release trigger: GitHub (`main`)
