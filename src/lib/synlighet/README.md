# Synlighet / delingsnivå-laget

Klassifiserings- og UI-lag som håndhever delingsnivåene Løkka Gårdeierforening ble enige om i **Dataverksted 21. mai 2026**. Avledet direkte fra møtematerialet:

- **Delingsmodellen** (slide 6 «DELINGSMODELL» i `Lokka_Arshjul_2026-2027_16juni`): fire nivåer.
- **Trafikklyset** for medlemmenes forberedelser til 3. sep (slide 10): Grønt / Gult / Rødt.
- **Hovedfunn 4** (slide 4): «Del på riktig nivå — aggregert innsikt i plattformen; sensitive aktør- og kontraktsforhold holdes utenfor.»

> ⚠️ **Dette laget er ikke en sikkerhetsgaranti alene.** Det klassifiserer felter og maskerer verdier. Reell håndheving krever at maskeringen kjøres **server-side** før data sendes til klienten — dvs. at den aktuelle ruten gjøres dynamisk og bruker request-resolveren. Se «Integrasjonsstatus» og «Fem beslutninger (avklart)».

---

## De fire nivåene

| Nivå        | Møtekategori            | Hvem ser det             | Eksempler |
| ----------- | ----------------------- | ------------------------ | --------- |
| `felles`    | Felles / åpent          | Alle (inkl. gjest)       | Aggregert trafikk, områdeutvikling, aktørmiks, aktivitet, ledige lokaler, kartfeil |
| `internt`   | Internt for medlemmer   | Innloggede medlemmer +   | Prioriteringer, felles utfordringer, kvalitativ innsikt, leieform på prinsipp-nivå, prisnivå kr/m² |
| `fortrolig` | Fortrolig / muntlig     | Eier av dataene + admin  | Konkrete aktør-/kontraktsforhold, muntlige leietakersignaler, leietaker på vei ut |
| `privat`    | Deles ikke              | Eier av dataene + admin  | **Leienivå/leieinntekt**, aktørspesifikk leieform, betalingshistorikk, kontrakts- og persondata |

### Rolle → tilgang (`ROLLE_TILGANG`)

| Rolle      | felles | internt | fortrolig | privat |
| ---------- | :----: | :-----: | :-------: | :----: |
| `gjest`    |   ✅   |   —     |    —      |   —    |
| `medlem`   |   ✅   |   ✅    |    —      |   —    |
| `gardeier` |   ✅   |   ✅    |    —      |   —    |
| `eier`     |   ✅   |   ✅    |    ✅     |   ✅   |
| `admin`    |   ✅   |   ✅    |    ✅     |   ✅   |

`eier` er en **utledet** rolle: en innlogget bruker som eier raden løftes fra `medlem`/`gardeier` til `eier` for nettopp sine egne data (`effektivRolle`). `fortrolig`/`privat` er derfor aldri synlig for andre gårdeiere enn eieren selv.

> **Bevisst strengere enn planutkastet:** `leienivå`/`leieinntekt` er satt til `privat`, ikke `internt`. Møtet var tydelig på at leienivå hører til Rødt (slide 10), sammen med betalings- og kontraktsdata.

---

## Filer

| Fil | Ansvar |
| --- | ------ |
| `src/types/synlighet.ts` | Typer + konstanter: `Synlighetsniva`, `Rolle`, `ROLLE_TILGANG`, `NIVA_META`, `MaskertVerdi`, `effektivRolle`. |
| `src/lib/synlighet/registry.ts` | `SYNLIGHET_REGISTER` (klassifisering + møtebegrunnelse per konsept) og modellbindinger `NOKKELDATA_NIVA` / `BUSINESS_ACTOR_NIVA`. |
| `src/lib/synlighet/filter.ts` | `harTilgang`, `maskerVerdi`, `maskerEntitet`, `maskerListe`, aggregat-terskel. |
| `src/lib/synlighet/session.ts` | Ren resolver-seam: `tilgangsKontekst`, `utledRolle`, `eierAv`, `GJEST_KONTEKST`. |
| `src/lib/synlighet/request-kontekst.ts` | **Server-only.** `tilgangsKontekstFraRequest()` — leser CF Access-headeren og utleder rolle/eier via `tenant-emails.ts`. |
| `src/lib/synlighet/eiendom.ts` | `maskerEiendom(eiendom, ctx)` — ett-kalls maskering av en hel `Eiendom`. |
| `src/lib/synlighet/index.ts` | Samlet inngang (`@/lib/synlighet`). Server-only `request-kontekst` er bevisst utelatt. |
| `src/components/ui/SynlighetsBadge.tsx` | Farget nivå-merke (server-trygt). |
| `src/components/ui/RestriktertFelt.tsx` | Rendrer en `MaskertVerdi` som låst plassholder + badge. |
| `src/lib/synlighet/__tests__/*.test.ts` | Atferdstester for roller, maskering, request-resolver, maskerEiendom og rutehåndheving. |

---

## Integrasjonssteg

1. **Gjør ruten dynamisk og løs opp kontekst fra Cloudflare Access** (server-side):

   ```tsx
   // I server-komponenten (page.tsx):
   export const dynamic = 'force-dynamic'; // les CF Access-headeren per request

   import { tilgangsKontekstFraRequest } from '@/lib/synlighet/request-kontekst';
   import { maskerEiendom } from '@/lib/synlighet';

   // tenantSlug = eiendommens eier (rutas tenant, f.eks. 'spabo')
   const ctx = await tilgangsKontekstFraRequest(tenantSlug);
   const synlig = maskerEiendom(eiendom, ctx);
   ```

2. **Render med `RestriktertFelt`** (tåler både verdi og sentinel):

   ```tsx
   import RestriktertFelt from '@/components/ui/RestriktertFelt';

   <RestriktertFelt verdi={synlig.plaaceData.nokkeldata.leieinntekter}>
     {String(synlig.plaaceData.nokkeldata.leieinntekter)}
   </RestriktertFelt>
   ```

   Trenger du finkornet kontroll uten `maskerEiendom`, bruk `maskerEntitet(obj, NOKKELDATA_NIVA, ctx)` / `maskerListe(...)` direkte. Bruk `SynlighetsBadge` for å merke et helt felt/seksjon med nivå uavhengig av maskering.

---

## Integrasjonsstatus (per 15. juni 2026)

- **Ferdig og testet:** klassifisering, maskering (`maskerEntitet` / `maskerListe` / `maskerEiendom`), resolver-seam (`session.ts`), request-resolver (`request-kontekst.ts` — CF Access → rolle/eier via `tenant-emails.ts`) og UI-komponenter.
- **Rullet ut på eiendomssider:** de 10 eiendoms-detaljrutene er `force-dynamic`, løser tilgang via Cloudflare Access per request, kaller `maskerEiendom(...)` server-side før render og sender maskerte næringsaktører videre til UI.
- **UI-håndheving:** `Leienivå` rendres via `RestriktertFelt`. Aktørtabellen tåler maskerte felter og skjuler omsetningsaggregater når omsetning er maskert, slik at kategori-snitt ikke lekker enkeltradverdier.
- **Bevisst utenfor scope:** main-board-analyser og årsrapport-/områdevisninger. De er aggregert NS-/områdedata, ikke gårdeier-spesifikke privatfelt.

---

## Fem beslutninger (avklart 15. juni 2026)

1. **Auth-leverandør / rolleoppløsning (B2).** ✅ Identitet kommer fra **Cloudflare Access**-headeren `Cf-Access-Authenticated-User-Email` (auth håndteres utenfor appen). Rolle utledes i `request-kontekst.ts`: ADMIN_EMAILS → `admin`; tenant-allowlist → `gardeier`; ellers innlogget → `medlem`; ingen e-post → `gjest`.
2. **Eier-mapping.** ✅ Gjenbruker `tenant-emails.ts`: e-post i en tenants allowlist ⇒ `eier` av den tenantens eiendommer (`erEier` settes når rute-tenant == brukerens tenant). Eiendommens eier følger av ruten (det finnes ikke noe `tenant`-felt i JSON-en).
3. **Default-nivå for uklassifiserte felter.** ✅ `internt` (`finnNiva()`-fallback). Felter må aktivt merkes `felles` for å vises bredt.
4. **N ≥ 5 (aggregat-terskel).** ✅ `MIN_AGGREGAT = 5`. Håndheves ikke automatisk i maskeringen; kallstedet bruker `oppfyllerAggregatterskel(n)` før `felles`-aggregater eksponeres.
5. **Audit-logg.** ✅ Ingen app-logg nå — Cloudflare Access logger tilgang på kanten. Kan legges til senere ved behov.

---

## Test og verifikasjon

```bash
npx jest src/lib/synlighet          # synlighetstester
npx tsc --noEmit                    # strict typecheck
npm run lint
npm run build
```

## Kilde

All klassifisering er sporbar til `SYNLIGHET_REGISTER[].kilde` (SLIDE6 / SLIDE10 / FUNN4 / RAPPORT) i `registry.ts`, forankret i Dataverksted 21. mai 2026 og decket `Lokka_Arshjul_2026-2027_16juni`.
