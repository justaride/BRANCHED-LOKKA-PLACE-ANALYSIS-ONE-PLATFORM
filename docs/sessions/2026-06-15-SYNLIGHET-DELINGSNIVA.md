# Synlighet / delingsnivå-lag (#9) — 2026-06-15

## Mål

Implementere delingsnivå-/synlighetslaget gårdeierforeningen ble enig om i
Dataverksted 21. mai 2026, som drop-in-kode i plattform-repoet. Avledet direkte
fra møtematerialet (decket `Lokka_Arshjul_2026-2027_16juni`):

- Delingsmodellen, slide 6: fire nivåer.
- Trafikklyset for forberedelser til 3. sep, slide 10: Grønt / Gult / Rødt.
- Hovedfunn 4, slide 4: «Del på riktig nivå».

## Kontekst

Forrige økt (annet verktøy) bygde dette som løse drop-in-filer fordi repoet ikke
var montert. Denne økten hadde repoet montert, så laget ble bygget nativt og
integrert med eksisterende konvensjoner (typer i `src/types`, lib i
`src/lib`, UI i `src/components/ui`, ts-jest i `__tests__`).

## Leveranse

**Klassifiserings- og UI-lag (ferdig, testet):**

- `src/types/synlighet.ts` — `Synlighetsniva`, `Rolle`, `ROLLE_TILGANG`,
  `NIVA_META`, `MaskertVerdi` (JSON-serialiserbar sentinel), `effektivRolle`.
- `src/lib/synlighet/registry.ts` — `SYNLIGHET_REGISTER` (24 felter med
  møtebegrunnelse + kilde) og modellbindinger `NOKKELDATA_NIVA` /
  `BUSINESS_ACTOR_NIVA`.
- `src/lib/synlighet/filter.ts` — `harTilgang`, `maskerVerdi`, `maskerEntitet`,
  `maskerListe`, `MIN_AGGREGAT`/`oppfyllerAggregatterskel`.
- `src/lib/synlighet/session.ts` — resolver-seam (`tilgangsKontekst`,
  `utledRolle`, `eierAv`, `GJEST_KONTEKST`) mellom auth og maskering (B2).
- `src/lib/synlighet/index.ts` — samlet inngang (`@/lib/synlighet`).
- `src/components/ui/SynlighetsBadge.tsx`, `src/components/ui/RestriktertFelt.tsx`
  — on-brand, server-trygge.
- `src/lib/synlighet/README.md` — datamodell, integrasjonssteg, integrasjonsstatus,
  fem åpne beslutninger.
- `src/lib/synlighet/__tests__/synlighet.test.ts` — 18 atferdstester.

## Modell og bevisst valg

- Fire nivåer: `felles` → `internt` → `fortrolig` → `privat`.
- Roller: `gjest` / `medlem` / `gardeier` / `eier` / `admin`. `eier` er utledet:
  en innlogget bruker som eier raden løftes til `eier` for sine egne data.
- **Leienivå/leieinntekt = `privat`** — bevisst strengere enn planutkastet
  (vurderte internt). Møtet var tydelig på at leienivå hører til Rødt sammen med
  betalings- og kontraktsdata.

## Verifikasjon

- `npx jest src/lib/synlighet` → 18/18 grønne.
- `npx tsc --noEmit` (strict) → 0 feil i hele prosjektet.
- `npx eslint` på alle nye filer → rent.

## Funn under arbeid

- `src/lib/auth.ts` er **fraværende** i dag, selv om PROJECT_STATUS nevner en
  OTP/JWT-migrering. `proxy.ts` håndhever ikke innlogging. Det finnes altså ingen
  per-request server-session å utlede rolle fra → B2 er en reell forutsetning.
- `leieinntekter` og `prisniva` er populert i mange eiendoms-JSON-er, men
  **rendres ikke** på noen side (kun `areal`/`energimerke` vises via `KeyMetrics`).
  Ingen aktiv lekkasje. Eiendomssidene er statisk genererte.

## Åpne punkter / neste steg

1. **B2 — auth/rolleoppløsning.** Bygg `SynlighetSession` fra et verifisert
   auth-lag og send inn i `tilgangsKontekst(session, eiendom, getAdminEmails())`.
2. **Render-strategi.** For reell håndheving: enten gjør de aktuelle rutene
   dynamiske og maskér server-side, eller behold statisk og gate klient-side
   etter innlogging.
3. **Fem beslutninger** (auth-leverandør, eier-mapping, default-nivå, N≥5,
   audit-logg) — defaults valgt og dokumentert i `src/lib/synlighet/README.md`.

## Addendum — beslutninger avklart + B2-byggeklosser (samme dag)

Gabriel avklarte de fem beslutningene, og B2-byggeklossene ble implementert.

**Beslutninger:**

- Håndheving: dynamiske ruter + server-side maskering.
- Privat-data: eier+admin ser egne privat-data (dagens modell beholdes).
- Default-nivå: `internt`.
- Audit-logg: ingen app-logg nå (Cloudflare Access logger på kanten).
- (Adoptert) eier-mapping = gjenbruk `tenant-emails.ts`; aggregat-terskel N = 5.

**Funn som forenkler B2:** auth håndteres utenfor appen av **Cloudflare Access**
(`.env.example`). Identitet ligger i headeren `Cf-Access-Authenticated-User-Email`,
og `tenant-emails.ts` mapper allerede e-post → tenant. B2 er derfor ikke et stort
infra-løft.

**Nye filer:**

- `src/lib/synlighet/request-kontekst.ts` — server-only. `tilgangsKontekstFraRequest()`
  leser CF Access-headeren og utleder rolle/eier. Ren kjerne `kontekstFraEpost()` +
  `finnEierTenant()` for testbarhet. Bevisst utenfor barrelet (`index.ts`).
- `src/lib/synlighet/eiendom.ts` — `maskerEiendom(eiendom, ctx)` masker
  `plaaceData.nokkeldata` + `naringsaktorer.actors` i ett kall (`EiendomMaskert`).
- `src/lib/synlighet/__tests__/b2-integrasjon.test.ts` — 7 nye tester.

**Verifikasjon:** 25/25 tester grønne, `tsc --noEmit` strict = 0 feil, ESLint rent.

**Gjenstår (eget, bygg-verifisert steg):** flippe eiendoms-rutene til dynamiske og
kalle `maskerEiendom` før render. De fleste tenants har egen
`eiendommer/[id]/page.tsx`, så det gjøres per rute. Oppskrift i
`src/lib/synlighet/README.md`.

## Addendum 2 — utrulling til alle eiendomssider (samme dag)

Mønsteret fra Carucel-piloten ble rullet ut til alle eiendoms-detaljruter. Hver
side fikk: `export const dynamic = 'force-dynamic'`, fjernet `generateStaticParams`
(+ ryddet ubrukt loader-import), `tilgangsKontekstFraRequest('<tenant>')` +
`maskerEiendom`, og en `Leienivå`-chip via `RestriktertFelt` (eier/admin ser
verdien, andre ser «Skjult» + Privat-merke).

**10 ruter endret:**

- `src/app/carucel/eiendommer/[id]/page.tsx` (pilot)
- `src/app/[company]/eiendommer/[id]/page.tsx` (dekker aspelin-reitan)
- `src/app/roger-vodal/eiendommer/[id]/page.tsx`
- `src/app/maya-eiendom/eiendommer/[id]/page.tsx`
- `src/app/sio/eiendommer/[id]/page.tsx`
- `src/app/eiendomsspar/eiendommer/[id]/page.tsx`
- `src/app/front-real-estate/eiendommer/[id]/page.tsx`
- `src/app/front-real-estate/eiendommer/markveien-35/page.tsx`
- `src/app/spabo/eiendommer/[id]/page.tsx`
- `src/app/brodrene-evensen/eiendommer/[id]/page.tsx`

De 8 uniforme tenant-sidene ble gjort av parallelle agenter med Carucel som mal;
`[company]` (ekstra import-opprydding) ble gjort manuelt. Alle differ gjennomgått.

**Bevisst utenfor scope:** main-board-analysene (`lokka-i-tall`, årsrapport-sider)
— de viser aggregert områdedata for NS, ikke gårdeier-spesifikke privat-felt.

**Verifikasjon:** `tsc --noEmit` strict = 0 feil, ESLint rent på alle 10 sidene,
25/25 tester, `git diff --check` rent. Full Next-build kunne ikke kjøres i
sandkassen (mount disallow unlink på `.next`; Turbopack avviser symlenket
`node_modules`; mountens `node_modules` har macOS-native binærfiler som ikke
laster på Linux). **Lokal `npm run build` er endelig gate.**

**Aktivering i prod:** sett `ADMIN_EMAILS` + per-tenant `*_EMAILS` slik at
eier/admin faktisk ser egne privat-data; ellers ser alle «Skjult».

## Addendum 3 — review-funn lukket før PR

Review avdekket at rutene riktig kalte `maskerEiendom(eiendom, tilgang)`, men
fortsatt sendte original `eiendom.naringsaktorer.actors` videre til
`BusinessActors`. Det ville maskert `Leienivå`, men ikke aktørfeltene
klassifisert i `BUSINESS_ACTOR_NIVA`.

**Fikset:**

- Alle 10 eiendomsruter sender nå `synlig.naringsaktorer` til `BusinessActors`.
- `getPropertyMetrics()` bruker maskert eiendomsobjekt, ikke originalen.
- `BusinessActors` aksepterer maskerte aktørfelt og rendrer skjulte verdier via
  `RestriktertFelt`.
- Omsetningsaggregater i aktørvisningen skjules når radomsetning er maskert, så
  kategori-snitt ikke lekker enkeltradverdier.
- Ny rutetest passer på at original `eiendom.naringsaktorer.actors` ikke sendes
  videre etter `maskerEiendom`.

**Lokal verifikasjon:** rutetest grønn, `npx tsc --noEmit` grønn.

## Addendum 4 — lokal commit-gate

Full gate er kjørt lokalt etter review-fiksen:

- `npm test -- --runInBand` → 138 tester grønne.
- `npm run lint` → 0 errors, samme eksisterende warning i `.remember/tmp/last-ndc.ts`.
- `npm run build` → pass. Build viser de 10 eiendomsrutene som `ƒ Dynamic`.

## Status

Ikke committet/pushet. Ligger i arbeidstreet for review (push = auto-deploy til
prod via Coolify).
