# Årshjul — Implementeringsplan (full feature)

> Mål: Gjøre årshjulet til en levende, **redigerbar**, delt (foreningsdekkende) modul i plattformen — med bedre interaktivitet, design, kobling til plattformdata og **påminnelser**.
> Omfang valgt: **Full feature** · **delt Løkka-årshjul** (ett felles hjul, ikke per-tenant).
> Skrevet: 15. juni 2026 · Grunnlag: faktisk kode i `lokka-gardeierforening-platform`.

---

## 1. Sammendrag

Årshjulet finnes allerede som en moden **lesevisning**: en sirkulær SVG (`src/components/arshjul/Arshjul.tsx`, 351 linjer) med måned-segmenter, hendelser som punkter/buer, kategori-filtrering og en detalj-sidepanel. Data ligger som **statisk JSON** (`src/data/main-board/arshjul-2026.json`, 17 hendelser for 2026) og lastes ved build via `src/lib/arshjul.ts`. Ruten er `/main-board/arshjul`.

For å nå «full feature» mangler fire ting, i prioritert rekkefølge:

1. **Persistens** — i dag er hjulet read-only fra JSON. Redigering krever en lagringskilde som overlever deploys (containeren er `output: 'standalone'` på Coolify, så filsystemet er flyktig).
2. **Redigerings-UI + API** — opprette/endre/slette/flytte hendelser, med validering.
3. **Tilgangsstyring for redigering** — dagens auth gir alle medlemmer full lesetilgang; vi trenger et lett «redaktør»-skille.
4. **Påminnelser** — e-post via Resend (allerede integrert) utløst av en planlagt jobb.

I tillegg: interaktivitets- og designløft (animasjon med framer-motion, agenda/liste-visning, mobilvennlighet, tilgjengelighet, år-bytte) og tettere kobling til plattformdata (rapporter, eiendommer, analyser).

Anbefalt tilnærming: bygg i **fire faser** der hver fase gir noe brukbart. Fase 0 rydder og hever dagens lesevisning (rask gevinst på interaktivitet/design). Fase 1 innfører persistens + API + redigering. Fase 2 legger til påminnelser. Fase 3 kobler hjulet til resten av plattformen.

---

## 2. Nå-situasjon (verifisert mot koden)

| Område | Status i dag | Fil |
| --- | --- | --- |
| Datamodell | `HjulHendelse`, `HjulAr`, `HjulKategori` (8), `HjulStatus` (4) | `src/types/arshjul.ts` |
| Lasting/geometri | `loadArshjul(år)`, `getAvailableArshjulYears()`, dag→vinkel, kollisjons-offset | `src/lib/arshjul.ts` |
| Visning | Sirkulær SVG, måned-akser, punkt/bue-hendelser, status-opasitet, kategori-farger | `src/components/arshjul/Arshjul.tsx` |
| Interaktivitet | Kategori-filter (chips), klikk → detaljpanel, hover-tooltip (`<title>`) | samme |
| Rute | `/main-board/arshjul` (server-side `loadArshjul(2026)`) | `src/app/main-board/arshjul/page.tsx` |
| Data | Statisk JSON, 17 hendelser, 2026, delt under `main-board` | `src/data/main-board/arshjul-2026.json` |
| Auth | OTP-e-post → JWT (`jose`), 90 dager, delt tilgang | `src/lib/auth.ts` |
| E-post | Resend, `noreply@naturalstateproject.com` | `src/lib/email.ts` |
| Deploy | Next 16 `output: 'standalone'`, Docker på Coolify/Hetzner | `next.config.ts`, `CLAUDE.md` |
| Tema | Tailwind 4, `natural-forest #2C5F2D`, `sage`, `sand`, `lokka.accent #F4A259` | `tailwind.config.ts`, `src/lib/design-tokens.ts` |

### Kjente svakheter å rydde i Fase 0
- `className="... hover:r-8"` på `<circle>` er ikke gyldig (Tailwind genererer ikke SVG-`r`); hover-forstørring virker ikke. Bruk `framer-motion`/SVG-attributter.
- Kun klikk er tilgjengelig — ingen tastaturnavigasjon eller fokus-tilstander (a11y-gap).
- Kun 2026 finnes selv om loaderen støtter flere år; ingen år-velger i UI.
- Ingen tom-tilstand/lasting/feilhåndtering utover `notFound()`.
- Kategori-farger er frittstående hex, ikke koblet til brand-tokens.

---

## 3. Mål og ikke-mål

**Mål**
- Ett delt, foreningsdekkende årshjul som medlemmer kan **lese**, og redaktører kan **redigere** i appen.
- Tydeligere interaktivitet og design (animasjon, agenda-visning, mobil, a11y).
- **Påminnelser** på e-post før hendelser.
- Kobling fra hendelser til plattformens data (rapporter, eiendommer, analyser) og omvendt («kommende hendelser» på relevante sider).

**Ikke-mål (nå)**
- Per-tenant årshjul (arkitekturen forberedes, men vi bygger delt først).
- Ekstern kalender-synk (ICS/Google) — kandidat for senere (se §10).
- Full rolle-/rettighetsmodell — vi bruker en enkel redaktør-allowlist.

---

## 4. Arkitekturbeslutninger

### 4.1 Persistens (den viktigste beslutningen)
Containeren er `standalone` (flyktig filsystem), så vi kan **ikke** skrive JSON i repoet i prod. Tre realistiske alternativer:

| Alt. | Hva | Fordeler | Ulemper | Anbefaling |
| --- | --- | --- | --- | --- |
| **A. Postgres (Coolify-managed)** | Egen DB-tjeneste i Coolify; tilgang via `pg`/Drizzle/Prisma | Robust, samtidige skrivere, enkelt for påminnelse-spørringer, vokser med behov | Ny avhengighet + migrasjoner | **Anbefalt** |
| B. SQLite på Coolify-volum | `better-sqlite3` mot montert volum | Minimal drift, fil-basert (matcher dagens stil) | Én skriver, volum-håndtering, backup manuelt | Greit MVP-alternativ |
| C. JSON på volum via API | Les/skriv `arshjul-<år>.json` på persistent volum | Minst ny kode, beholder JSON-formen | Samtidighet/locking skjørt, ingen spørringer | Kun for rask intern PoC |

**Anbefaling:** Postgres (A) med et tynt data-tilgangslag (`src/lib/arshjul/store.ts`). Behold dagens JSON som **seed** (idempotent import ved oppstart/migrasjon), slik at 2026-dataene følger med. Loaderen `loadArshjul` endres fra statisk import til DB-spørring (server-side), med JSON som fallback i dev.

> Beslutning som trengs fra deg: A, B eller C. Resten av planen antar **A (Postgres)**, men bytte til B/C påvirker kun `store.ts` og deploy-config, ikke UI.

### 4.2 Tilgangsstyring (hvem kan redigere)
Dagens `UnifiedSessionPayload` har `sub` (e-post) men ingen rolle. Enkleste robuste løsning: en **redaktør-allowlist** i env (`ARSHJUL_EDITORS="gabriel@naturalstate.no,kim@naturalstate.no,..."`), sjekket server-side i API-rutene og brukt til å vise/skjule redigeringsknapper. Senere kan dette flyttes til en `roles`-kolonne uten UI-endring.

### 4.3 API
Next App Router route handlers under `src/app/api/arshjul/`:
- `GET /api/arshjul?year=2026` → hendelser (offentlig for innloggede)
- `POST /api/arshjul` → opprett (redaktør)
- `PATCH /api/arshjul/:id` → oppdater (redaktør)
- `DELETE /api/arshjul/:id` → slett (redaktør)
- `POST /api/arshjul/reminders/run` → kjør påminnelser (secret-beskyttet, for cron)

Validering med en liten schema-funksjon (eller `zod` hvis vi vil legge til avhengighet). All skriving auditeres med `opprettet/sistOppdatert/sistEndretAv`.

### 4.4 Lese-/skrivemodell i UI
Lesevisning forblir server-rendret (rask, delbar). Redigering skjer i en **klient-«redaktørmodus»** som kaller API-ene og oppdaterer optimistisk. Etter skriving revalideres ruten (`revalidatePath('/main-board/arshjul')`).

---

## 5. Datamodell — utvidelser

Behold dagens felter, legg til (bakoverkompatibelt, alle nye er valgfrie):

```ts
export interface HjulHendelse {
  id: string;
  tittel: string;
  start: string;            // ISO YYYY-MM-DD
  slutt?: string;
  kategori: HjulKategori;
  beskrivelse?: string;
  lenke?: string;           // intern (/main-board/...) eller ekstern
  ansvarlig?: string;
  status: HjulStatus;
  tenant?: string;          // forberedt for per-tenant senere

  // NYTT
  sted?: string;            // fysisk sted / Teams-lenke
  deltakere?: string[];     // e-poster (for påminnelser/inviterte)
  relatert?: {              // kobling til plattformdata
    type: "rapport" | "eiendom" | "analyse" | "aktor";
    id: string;
  }[];
  paaminnelse?: {           // påminnelser
    dagerFor: number[];     // f.eks. [7, 1]
    mottakere?: string[];   // overstyrer deltakere hvis satt
    sendt?: string[];       // ISO-tidsstempler for sendte (idempotens)
  };
  opprettet?: string;
  sistOppdatert?: string;
  sistEndretAv?: string;    // e-post (audit)
}
```

DB-skjema (Postgres) speiler dette: en `arshjul_hendelse`-tabell med JSON-kolonner for `relatert`/`paaminnelse`, eller normaliserte hjelpetabeller hvis vi vil. For MVP holder én tabell + JSONB.

---

## 6. Interaktivitet og design

> Dette er delen du vil «jobbe på» — her er konkret omfang, byggbart inkrementelt.

### 6.1 Lesevisning — løft (Fase 0)
- **Animasjon (framer-motion):** hendelser «poppes» inn (stagger), hover skalerer punktet jevnt, valgt hendelse pulserer lett. Erstatter den ødelagte `hover:r-8`.
- **Hover vs. klikk:** hover → lett uthevet + tooltip-kort nær punktet; klikk → fastlåst i detaljpanel (dagens oppførsel).
- **Tom-/lastetilstand:** skjelett for hjulet; tom-tilstand når et år ikke har hendelser.
- **År-velger:** segmentkontroll øverst (`getAvailableArshjulYears()`), default inneværende år.
- **«I dag»-markør:** tynn radiell linje på dagens dato; valgfri «neste hendelse»-uthevning.
- **Tilgjengelighet:** gjør hvert punkt fokuserbart (`tabIndex`, `role="button"`, `aria-label`), pil-taster for å gå mellom hendelser kronologisk, `Esc` lukker panelet. Respekter `prefers-reduced-motion`.

### 6.2 Visningsbytte
- **Hjul ⇄ Agenda/liste ⇄ Tidslinje.** Listen er bedre på mobil og for redigering; gjenbruk `src/lib/timeline-utils.ts` hvis mulig. Knappgruppe for å bytte.
- **Mobil:** hjulet skaleres ned; under en breakpoint vises agenda som standard (hjulet er tett på små skjermer).

### 6.3 Design/tema
- Knytt kategori-farger til brand der det er naturlig (f.eks. `visit-lokka` → `lokka.accent #F4A259`, `fou`/`rapport` til dempede toner), behold tydelig kontrast mellom 8 kategorier.
- Bruk `natural-forest` for nav/aksenter (som i dag), `sand`/`sage` for flater. Skygger fra `boxShadow.soft/medium`.
- Konsistent med Scandinavian-minimal stil i `design-tokens.ts`.

### 6.4 Redigerings-UI (Fase 1)
- **Redaktørmodus-bryter** (kun synlig for redaktører).
- **Hendelseskjema** (slide-over panel): tittel, dato(er), kategori, status, beskrivelse, ansvarlig, sted, lenke, relatert-data, påminnelser. Validering + feilmeldinger.
- **Opprett:** «+ Ny hendelse»-knapp; forhåndsutfyll dato hvis bruker klikker på en tom del av hjulet/måneden.
- **Hurtigredigering:** fra detaljpanelet (rediger/slett).
- **Valgfritt senere:** dra et punkt for å flytte dato (geometri finnes allerede for posisjon → dato).

---

## 7. Påminnelser (Fase 2)
- **Trigger:** Coolify «scheduled task» (daglig, f.eks. 07:00) som kaller `POST /api/arshjul/reminders/run` med en hemmelig header (`x-cron-secret`). Alternativt ekstern cron (GitHub Actions/cron-job.org).
- **Logikk:** finn hendelser der `start - dagerFor === i dag` og ikke allerede sendt (`paaminnelse.sendt`), send via `src/lib/email.ts` (Resend), marker som sendt (idempotent).
- **Mottakere:** `paaminnelse.mottakere` ?? `deltakere` ?? en foreningsbred liste (env/`tenant-emails.ts`).
- **Innhold:** norsk e-postmal med tittel, dato, sted/lenke, beskrivelse og «Se i årshjulet»-lenke.
- **Robusthet:** logg sendinger; tål delvis feil (send resten), rapporter antall sendt i responsen.

---

## 8. Kobling til plattformdata (Fase 3)
- **Fra hendelse → data:** `relatert[]` rendres som lenker i detaljpanelet (rapport `/main-board/lokka-i-tall`, eiendom, analyse). `lenke` finnes allerede (brukes av `rapport-l04`).
- **Fra data → hendelse:** liten «Kommende i årshjulet»-modul på `main-board` (og evt. tenant-forsider) som viser de neste 3–5 hendelsene.
- **Gjenbruk:** vurder å samordne med `src/types/events.ts` (impact-tidslinje) der det gir mening, uten å slå sammen modellene unødig.

---

## 9. Faseplan og estimat

| Fase | Innhold | Leveranse | Grovt estimat |
| --- | --- | --- | --- |
| **0 — Polish (read-only)** | Fiks hover-bug, framer-motion, år-velger, «i dag», a11y, agenda/liste-visning, tema | Bedre lese-/designopplevelse, ingen backend | 2–3 dager |
| **1 — Redigerbar** | Postgres + `store.ts` + seed, CRUD-API, redaktør-allowlist, redigerings-UI, revalidering | Medlemmer/redaktører vedlikeholder hjulet i appen | 4–6 dager |
| **2 — Påminnelser** | Reminder-API + Coolify cron + e-postmal + idempotens | Automatiske e-postpåminnelser | 1.5–2.5 dager |
| **3 — Kobling** | `relatert[]`-lenker, «Kommende»-modul, evt. ICS-eksport | Hjulet bundet til resten av plattformen | 2–3 dager |

Fasene er uavhengig deploybare. Fase 0 kan starte umiddelbart; Fase 1 forutsetter persistens-beslutning (§4.1).

---

## 10. Test, kvalitet og rollout
- **Enhetstester (Jest, 70% terskel):** geometri (`lib/arshjul.ts`), validering, reminder-utvelgelse (dato-grenser, idempotens), allowlist-sjekk.
- **API-tester:** auth-gating (uautorisert → 401/403), CRUD happy/feil-vei.
- **Manuell QA:** desktop/mobil, tastaturnavigasjon, `prefers-reduced-motion`.
- **`npm run verify` + `type-check`** kjører i `prebuild` — alt nytt må passere.
- **Migrasjon/seed:** idempotent import av `arshjul-2026.json` første gang.
- **Rollout:** Fase 0 rett til prod; Fase 1+ bak redaktørmodus til verifisert.

## 11. Risiko
- **Persistens på standalone/Coolify:** må løses før redigering (§4.1) — ellers «forsvinner» endringer ved deploy.
- **Cron-pålitelighet:** Coolify-scheduling må overvåkes; idempotens hindrer dobbel-utsending.
- **Tett hjul:** mange hendelser på samme dato → bruk eksisterende `tildelRadiusOffset` + agenda-fallback.
- **Avhengigheter:** Postgres-klient / evt. `zod` er nye; hold dem minimale.

## 12. Beslutninger jeg trenger fra deg
1. **Persistens:** Postgres (A, anbefalt), SQLite-volum (B), eller JSON-volum (C)?
2. **Redaktører:** hvem skal kunne redigere? (e-postliste til `ARSHJUL_EDITORS`)
3. **Påminnelse-mottakere:** per-hendelse deltakere, eller én foreningsbred liste?
4. **Startpunkt:** begynne på **Fase 0** (interaktivitet/design) nå, parallelt med at persistens avklares?

---

_Grunnlag: lest direkte fra repoet 15. juni 2026. Filreferanser er eksakte._
