/**
 * Synlighet / delingsnivå-laget for Løkka Gårdeierforening-plattformen.
 *
 * Avledet direkte fra Dataverksted 21. mai 2026:
 *  - Delingsmodellen (slide 6 «DELINGSMODELL» i decket «Lokka_Arshjul_2026-2027_16juni»):
 *    fire nivåer — Felles/åpent · Internt for medlemmer · Fortrolig/muntlig · Deles ikke.
 *  - Trafikklyset for medlemmenes forberedelser til 3. sep (slide 10):
 *    Grønt · Gult · Rødt.
 *  - Hovedfunn 4 (slide 4): «Del på riktig nivå — aggregert innsikt i plattformen;
 *    sensitive aktør- og kontraktsforhold holdes utenfor.»
 *
 * VIKTIG: Dette er KLASSIFISERINGS- og UI-laget. Reell håndheving krever i tillegg
 * (a) auth-laget som løser opp brukerens rolle og eierskap, og (b) server-side
 * filtrering før data sendes til klienten. Disse typene alene er ingen garanti.
 * Se src/lib/synlighet/README.md.
 */

/**
 * De fire delingsnivåene fra møtets delingsmodell, fra mest åpent til mest lukket.
 *
 * - `felles`    Aggregert innsikt som kan vises bredt og brukes eksternt i
 *               felles møter og rapportering.
 * - `internt`   Arbeidsgrunnlag i foreningen. Kun innloggede medlemmer.
 * - `fortrolig` Konkrete aktør-/kontraktsforhold. Håndteres muntlig / i lukkede
 *               rom — vises ikke som åpne verdier i plattformen.
 * - `privat`    Sensitive leie-, kontrakts-, betalings- og persondata.
 *               «Deles ikke» — kun eier av dataene og admin.
 */
export type Synlighetsniva = 'felles' | 'internt' | 'fortrolig' | 'privat';

/**
 * Roller plattformen skiller på.
 *
 * Foreløpig forankring: i dag finnes ingen ekte rollemodell i auth-laget
 * (kun ADMIN_EMAILS + per-tenant e-postlister, se src/lib/tenant-emails.ts).
 * Disse rollene beskriver MÅL-modellen og brukes av klassifiserings-/UI-laget.
 * Oppløsning fra session → Rolle er en åpen beslutning (B2), se README.
 *
 * - `gjest`    Ikke innlogget / offentlig.
 * - `medlem`   Innlogget medlem av foreningen (basisnivå).
 * - `gardeier` Medlem som også er gårdeier. Samme tilgang som `medlem` for data
 *              de ikke eier; egen rolle reservert for fremtidig differensiering.
 * - `eier`     Eier av det konkrete datapunktet/entiteten som vurderes
 *              (utledet rolle — se {@link effektivRolle}).
 * - `admin`    Natural State / forvalter. Ser alt.
 */
export type Rolle = 'gjest' | 'medlem' | 'gardeier' | 'eier' | 'admin';

/** Alle nivåer i kanonisk rekkefølge (mest åpent → mest lukket). */
export const SYNLIGHETSNIVAER: readonly Synlighetsniva[] = [
  'felles',
  'internt',
  'fortrolig',
  'privat',
] as const;

/** Alle roller. */
export const ROLLER: readonly Rolle[] = [
  'gjest',
  'medlem',
  'gardeier',
  'eier',
  'admin',
] as const;

/** Numerisk rang per nivå (lav = mest åpen). Brukes til sammenligning/sortering. */
export const NIVA_RANG: Record<Synlighetsniva, number> = {
  felles: 0,
  internt: 1,
  fortrolig: 2,
  privat: 3,
};

/**
 * Rolle → tilgangssett. Hvilke synlighetsnivåer en rolle har lov å se.
 *
 * Avledet fra delingsmodellen:
 *  - `felles` er åpent i plattformen (også for gjest).
 *  - `internt` er «for medlemmer».
 *  - `fortrolig` og `privat` er kun for eier av dataene + admin.
 */
export const ROLLE_TILGANG: Record<Rolle, readonly Synlighetsniva[]> = {
  gjest: ['felles'],
  medlem: ['felles', 'internt'],
  gardeier: ['felles', 'internt'],
  eier: ['felles', 'internt', 'fortrolig', 'privat'],
  admin: ['felles', 'internt', 'fortrolig', 'privat'],
};

/** Kontekst for en tilgangsvurdering: brukerens rolle + om hen eier raden. */
export interface TilgangsKontekst {
  /** Brukerens basisrolle (fra session/auth). */
  rolle: Rolle;
  /**
   * Om den innloggede brukeren eier entiteten/datapunktet som vurderes.
   * Hvordan dette utledes (tenant-slug → eier) er en åpen beslutning, se README.
   */
  erEier?: boolean;
}

/**
 * Utleder effektiv rolle for en konkret vurdering.
 * - Admin forblir admin.
 * - En innlogget bruker som eier raden løftes til `eier` (ser fortrolig/privat
 *   for nettopp sine egne data).
 */
export function effektivRolle(ctx: TilgangsKontekst): Rolle {
  if (ctx.rolle === 'admin') return 'admin';
  if (ctx.erEier && ctx.rolle !== 'gjest') return 'eier';
  return ctx.rolle;
}

/** Trafikklysfarge brukt i badge/merker (4-trinns skala). */
export type NivaFarge = 'grønn' | 'blå' | 'gul' | 'rød';

/** Presentasjonsmetadata per nivå. */
export interface NivaMeta {
  niva: Synlighetsniva;
  /** Full etikett (norsk). */
  label: string;
  /** Kort etikett for trange flater. */
  kortLabel: string;
  /** Farge for badge. */
  farge: NivaFarge;
  /** Forklaring som vises i tooltip / under feltet. */
  beskrivelse: string;
}

/**
 * Tekst og farge per nivå. Fargene er en 4-trinns utvidelse av møtets
 * trafikklys (grønn → gul → rød), med blå for det interne medlemsnivået.
 */
export const NIVA_META: Record<Synlighetsniva, NivaMeta> = {
  felles: {
    niva: 'felles',
    label: 'Felles / åpent',
    kortLabel: 'Felles',
    farge: 'grønn',
    beskrivelse:
      'Aggregert innsikt som kan vises bredt i plattformen og brukes i felles møter og rapportering.',
  },
  internt: {
    niva: 'internt',
    label: 'Internt for medlemmer',
    kortLabel: 'Internt',
    farge: 'blå',
    beskrivelse:
      'Arbeidsgrunnlag i foreningen — prioriteringer, felles utfordringer og kvalitativ innsikt. Kun innloggede medlemmer.',
  },
  fortrolig: {
    niva: 'fortrolig',
    label: 'Fortrolig / muntlig',
    kortLabel: 'Fortrolig',
    farge: 'gul',
    beskrivelse:
      'Konkrete aktør- eller kontraktsforhold. Håndteres muntlig / i lukkede rom — vises ikke som åpne verdier i plattformen.',
  },
  privat: {
    niva: 'privat',
    label: 'Deles ikke',
    kortLabel: 'Privat',
    farge: 'rød',
    beskrivelse:
      'Sensitive leie-, kontrakts-, betalings- og persondata. Holdes utenfor det felles verktøyet; kun eier av dataene og admin.',
  },
};

/**
 * Sentinel-verdi som erstatter et felt brukeren ikke har tilgang til.
 *
 * Bevisst et vanlig objekt (ikke Symbol) slik at det er JSON-serialiserbart og
 * overlever server → klient i Next.js (RSC-props). UI-komponenten
 * `RestriktertFelt` rendrer denne.
 */
export interface MaskertVerdi {
  readonly __maskert: true;
  /** Nivået som førte til maskering (styrer badge/forklaring). */
  readonly niva: Synlighetsniva;
  /** Felt-id/nøkkel som ble maskert, for sporbarhet. */
  readonly feltId?: string;
}

/** Type guard for {@link MaskertVerdi}. */
export function erMaskert(verdi: unknown): verdi is MaskertVerdi {
  return (
    typeof verdi === 'object' &&
    verdi !== null &&
    (verdi as { __maskert?: unknown }).__maskert === true
  );
}

/** Lager en {@link MaskertVerdi}. */
export function lagMaskertVerdi(niva: Synlighetsniva, feltId?: string): MaskertVerdi {
  return { __maskert: true, niva, feltId };
}
