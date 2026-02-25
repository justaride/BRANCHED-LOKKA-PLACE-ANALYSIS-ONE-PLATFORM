# Session: E-post OTP-autentisering + Cache-kontroll

**Dato:** 25. februar 2026
**Commit:** `5425ce2` feat(auth): add email OTP authentication with JWT sessions
**Branch:** main (pushet)

---

## Hva ble gjort

### 1. Ny autentisering: E-post OTP

Byttet fra delt passord per tenant til e-post OTP med signerte JWT-cookies.

**Nye filer:**
- `src/lib/auth.ts` — JWT-signing (jose), OTP-generering (6-sifret), SHA-256-hashet kode i signert token
- `src/lib/email.ts` — Resend-integrasjon, norsk e-post med kode i subject-line
- `src/lib/tenant-emails.ts` — Allowlist fra env vars (`{TENANT}_EMAILS`, `ADMIN_EMAILS`)

**Endrede filer:**
- `src/config/tenants.ts` — Nytt `emailsEnvVar`-felt i TenantConfig + alle 10 tenants
- `src/app/api/auth/route.ts` — Tre actions: `request-otp`, `verify-otp`, `password` (fallback)
- `src/app/login/page.tsx` — To-trinns skjema: e-post → 6-sifret kode (auto-advance, paste, resend cooldown)
- `src/middleware.ts` — JWT-validering, `authenticated`-cookie fallback, sliding refresh (30d), cache headers
- `next.config.ts` — Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- `package.json` — Lagt til `resend` + `jose`

### 2. Cache-kontroll

- Alle autentiserte responses får `Cache-Control: private, no-cache, no-store, must-revalidate` + `Vary: Cookie`
- Forhindrer Cloudflare fra å cache HTML-sider med brukerdata

### 3. Rate limiting

In-memory Map i auth route:
- Maks 5 OTP-forespørsler per 5 minutter (per IP + e-post)
- Maks 5 kode-forsøk per OTP (per IP + e-post)

### 4. Loader-fikser (pre-eksisterende build-feil)

Fjernet imports av slettede JSON-filer:

**`one-min-loader.ts`:**
- `olaf-ryes-plass-3`: fjernet `besokende` import
- `thorvald-meyersgate-33`: fjernet `demografi` + `konkurransebilde`
- `thorvald-meyersgate-40`: fjernet `aktorer`
- `thorvald-meyersgate-44`: fjernet `demografi` + `besokende`

**`main-board.ts`:**
- `loadSammenligning2024()` → returnerer null (data slettet)
- `loadDemografi2017_2023()` → returnerer null (dedikert datafil slettet)

**`place-loader.ts`:**
- Fjernet `sammenligning-2024.json` og `olaf-ryes-plass-7eleven.json` fra imports + ID-liste

**`one-min-analysis.ts` (type):**
- `konkurransebilde` og `aktorer` gjort nullable

**`OneMinAnalysisViewer.tsx` + `demografi-2017-2023/page.tsx`:**
- Lagt til null-guards

---

## Teknisk arkitektur

```
Bruker → E-post-input → /api/auth {action: 'request-otp'}
  → Sjekk allowlist (env var)
  → Generer 6-sifret OTP
  → Send via Resend
  → Lagre hashet kode i signert JWT-cookie (otp-pending, 5 min)

Bruker → Kode-input → /api/auth {action: 'verify-otp'}
  → Les otp-pending cookie
  → Verifiser kode mot hashet verdi i token
  → Opprett session JWT (90 dager)
  → Sett auth-{tenant} cookie

Middleware:
  → Les auth-{tenant} cookie
  → Prøv JWT-validering (ny)
  → Fall tilbake til "authenticated" string (gammel)
  → Sliding refresh: ny JWT hvis >30 dager gammel
  → Sett cache-control headers
```

---

## Env vars som trengs i Coolify

```bash
# Påkrevd:
AUTH_SECRET=<openssl rand -hex 32>
RESEND_API_KEY=re_xxxxxxxxxxxxx
AUTH_FROM_EMAIL=noreply@naturalstate.no

# Admin (fungerer for alle tenants):
ADMIN_EMAILS=gabriel@naturalstate.no

# Per tenant (kommaseparert):
MAIN_BOARD_EMAILS=gabriel@naturalstate.no
ASPELIN_RAMM_EMAILS=
BRODRENE_EVENSEN_EMAILS=
CARUCEL_EMAILS=
EIENDOMSSPAR_EMAILS=
FRONT_REAL_ESTATE_EMAILS=
MAYA_EIENDOM_EMAILS=
ROGER_VODAL_EMAILS=
SIO_EMAILS=
SPABO_EMAILS=
```

Eksisterende `*_PASSWORD` env vars beholdes for bakoverkompatibilitet.

---

## Resend-oppsett (manuelt)

1. Opprett konto på resend.com
2. Legg til domene `naturalstate.no`
3. Legg inn DNS-records i Cloudflare: SPF, DKIM, DMARC
4. Verifiser domenet
5. Opprett API-nøkkel → `RESEND_API_KEY`

---

## Cloudflare cache-konfigurasjon (anbefalt)

Cache Rules → Create rule:
- Navn: `Bypass cache for HTML`
- When: URI Path IKKE starter med `/_next/static`, `/images`, `/fonts`
- Then: Bypass cache

---

## Migreringsstrategi

1. **Deploy (gjort)** — Begge systemer aktive, passord som fallback
2. **Sett opp Resend** — DNS + API-nøkkel
3. **Legg inn env vars** — AUTH_SECRET, RESEND_API_KEY, ADMIN_EMAILS
4. **Test selv** — Logg inn med egen e-post
5. **Samle e-postadresser** — Spør hver gårdeier
6. **Legg til tenant-e-poster** — I Coolify env vars
7. **Fjern passord-UI** — Etter at alle bruker e-post (behold API for admin)

---

## Neste steg

- [ ] Sett opp Resend-konto og DNS
- [ ] Legg inn env vars i Coolify
- [ ] Test OTP-flyt med egen e-post
- [ ] Samle e-postadresser fra gårdeiere
- [ ] Konfigurer Cloudflare cache rules
- [ ] Vurder å fjerne passord-UI etter full migrering
