/**
 * Synlighetsregister — klassifisering av hvert datafelt/-konsept til et
 * delingsnivå, med begrunnelse forankret i Dataverksted 21. mai 2026.
 *
 * Registeret er kilden til sannhet for «hva har hvilket nivå». `filter.ts`
 * bruker nivå-kartene nederst (NOKKELDATA_NIVA, BUSINESS_ACTOR_NIVA) til å
 * maskere reelle entiteter; tekst-/dokumentasjonsdelen (SYNLIGHET_REGISTER)
 * gir menneskelesbar begrunnelse og kilde per konsept.
 *
 * Kilder:
 *  - SLIDE6  = «DELINGSMODELL» (slide 6) — de fire nivåene.
 *  - SLIDE10 = «3. SEPTEMBER» trafikklys (slide 10) — Grønt/Gult/Rødt.
 *  - FUNN4   = Hovedfunn 4 (slide 4) — «Del på riktig nivå».
 *  - RAPPORT = «Dataverksted 21. mai 2026 — detaljert møterapport».
 */

import type { Synlighetsniva } from '@/types/synlighet';
import type { Nokkeldata, BusinessActor } from '@/types/eiendom';

/** Kilde-referanse i møtematerialet. */
export type SynlighetKilde =
  | 'SLIDE6'
  | 'SLIDE10-grønt'
  | 'SLIDE10-gult'
  | 'SLIDE10-rødt'
  | 'FUNN4'
  | 'RAPPORT';

/** Grov kategori for gruppering i dokumentasjon/UI. */
export type FeltKategori =
  | 'trafikk'
  | 'omrade'
  | 'aktor'
  | 'leie'
  | 'kontrakt'
  | 'person'
  | 'aktivitet'
  | 'kvalitativ'
  | 'kart';

/** Én klassifisert post i synlighetsregisteret. */
export interface SynlighetFelt {
  /** Stabil id for konseptet/datatypen. */
  id: string;
  /** Menneskelesbar etikett (norsk). */
  label: string;
  /** Tildelt delingsnivå. */
  niva: Synlighetsniva;
  kategori: FeltKategori;
  /** Begrunnelse forankret i møtet. */
  begrunnelse: string;
  /** Hvor i møtematerialet dette stammer fra. */
  kilde: SynlighetKilde;
  /** Valgfri binding til faktiske modellfelt (dot-path i Eiendom/BusinessActor). */
  modellfelt?: string[];
}

/**
 * Synlighetsregisteret. Rekkefølge: åpent → lukket.
 *
 * Merk særlig `leieniva`: satt til `privat` — bevisst STRENGERE enn det
 * opprinnelige planutkastet (som vurderte internt). Møtet var tydelig på at
 * leienivå hører til Rødt (slide 10) sammen med betalings- og kontraktsdata.
 */
export const SYNLIGHET_REGISTER: readonly SynlighetFelt[] = [
  // ── FELLES (grønt) ────────────────────────────────────────────────────────
  {
    id: 'aggregert-trafikk',
    label: 'Aggregert trafikk / footfall',
    niva: 'felles',
    kategori: 'trafikk',
    begrunnelse:
      'Aggregert trafikk er eksplisitt felles/åpent og kan brukes i felles møter og rapportering.',
    kilde: 'SLIDE6',
    modellfelt: ['plaaceData.marked.transaksjoner', 'plaaceAnalyser[].marked.transaksjoner'],
  },
  {
    id: 'omradeutvikling',
    label: 'Områdeutvikling over tid',
    niva: 'felles',
    kategori: 'omrade',
    begrunnelse: 'Områdeutvikling er aggregert innsikt og deles bredt i plattformen.',
    kilde: 'SLIDE6',
  },
  {
    id: 'aktormiks-aggregert',
    label: 'Aktørmiks (aggregert)',
    niva: 'felles',
    kategori: 'aktor',
    begrunnelse:
      'Aggregert aktørmiks er felles. Aktørspesifikke, sensitive forhold skilles ut på høyere nivå.',
    kilde: 'FUNN4',
    modellfelt: ['naringsaktorer.categoryStats', 'naringsaktorer.metadata'],
  },
  {
    id: 'aktivitet-arrangement',
    label: 'Aktivitet og arrangement (årshjul)',
    niva: 'felles',
    kategori: 'aktivitet',
    begrunnelse:
      'Aktivitet kobles til årshjulet, Visit Løkka og felles tiltak — ment å deles bredt.',
    kilde: 'SLIDE6',
  },
  {
    id: 'demografi',
    label: 'Demografi (befolkning, alder, inntektssnitt for området)',
    niva: 'felles',
    kategori: 'omrade',
    begrunnelse: 'Områdedemografi er aggregert offentlig-nær innsikt; felles nivå.',
    kilde: 'SLIDE6',
    modellfelt: ['plaaceData.demografi', 'plaaceData.nokkeldata.befolkning'],
  },
  {
    id: 'ledige-lokaler',
    label: 'Ledige / snart ledige lokaler',
    niva: 'felles',
    kategori: 'omrade',
    begrunnelse: 'Eksplisitt i trafikklysets grønne kategori — trygt å dele.',
    kilde: 'SLIDE10-grønt',
  },
  {
    id: 'onskede-konsepter',
    label: 'Ønskede konsepter / leietakerprofil man søker',
    niva: 'felles',
    kategori: 'omrade',
    begrunnelse: 'Grønt i trafikklyset — konsepter man søker er trygt å dele.',
    kilde: 'SLIDE10-grønt',
  },
  {
    id: 'kartfeil',
    label: 'Feil i kart- eller aktørdata (innmelding)',
    niva: 'felles',
    kategori: 'kart',
    begrunnelse:
      'Grønt i trafikklyset. Datakvalitet skaper tillit (hovedfunn 2) — innmelding av feil skal være lavterskel.',
    kilde: 'SLIDE10-grønt',
  },
  {
    id: 'generell-kompetanse',
    label: 'Generell kompetanse / ressurser',
    niva: 'felles',
    kategori: 'omrade',
    begrunnelse: 'Grønt i trafikklyset — generell kompetanse er trygt å dele.',
    kilde: 'SLIDE10-grønt',
  },

  // ── INTERNT (blå / medlemmer) ─────────────────────────────────────────────
  {
    id: 'prioriteringer',
    label: 'Prioriteringer i foreningen',
    niva: 'internt',
    kategori: 'omrade',
    begrunnelse: 'Prioriteringer er arbeidsgrunnlag i foreningen — internt for medlemmer.',
    kilde: 'SLIDE6',
  },
  {
    id: 'felles-utfordringer',
    label: 'Felles utfordringer',
    niva: 'internt',
    kategori: 'omrade',
    begrunnelse: 'Felles utfordringer er internt arbeidsgrunnlag.',
    kilde: 'SLIDE6',
  },
  {
    id: 'kvalitativ-innsikt',
    label: 'Kvalitativ innsikt (avidentifisert/aggregert)',
    niva: 'internt',
    kategori: 'kvalitativ',
    begrunnelse:
      'Aggregert kvalitativ innsikt er internt. Aktørspesifikke, muntlige signaler løftes til fortrolig.',
    kilde: 'SLIDE6',
  },
  {
    id: 'leieform-prinsipp',
    label: 'Leieform på prinsipp-nivå (ikke aktørspesifikk)',
    niva: 'internt',
    kategori: 'leie',
    begrunnelse:
      'Gult i trafikklyset, men på prinsipp-nivå (ikke aktørspesifikt) → håndteres som internt arbeidsgrunnlag.',
    kilde: 'SLIDE10-gult',
  },
  {
    id: 'prisniva-m2',
    label: 'Prisnivå eiendom (kr/m²)',
    niva: 'internt',
    kategori: 'leie',
    begrunnelse:
      'Eiendomsverdi pr. m² er markedsnær økonomi og arbeidsgrunnlag — internt. (Skilles fra leienivå/leieinntekt, som er privat.)',
    kilde: 'RAPPORT',
    modellfelt: ['plaaceData.nokkeldata.prisniva'],
  },
  {
    id: 'aktor-omsetning',
    label: 'Omsetning pr. aktør (Plaace-avledet)',
    niva: 'internt',
    kategori: 'aktor',
    begrunnelse:
      'Per-aktør omsetning er Plaace-avledet markedstall brukt som arbeidsgrunnlag — internt, ikke kontraktsdata. Aggregeres til felles på kategorinivå.',
    kilde: 'FUNN4',
    modellfelt: ['naringsaktorer.actors[].omsetning'],
  },

  // ── FORTROLIG (gul / muntlig) ─────────────────────────────────────────────
  {
    id: 'kvalitative-leietakersignaler',
    label: 'Kvalitative leietakersignaler (muntlig)',
    niva: 'fortrolig',
    kategori: 'kvalitativ',
    begrunnelse:
      'Gult i trafikklyset og uttrykkelig «muntlig». Konkrete, aktørnære signaler håndteres fortrolig — ikke som åpne verdier i plattformen.',
    kilde: 'SLIDE10-gult',
  },
  {
    id: 'aktor-kontraktsforhold',
    label: 'Konkrete aktør- eller kontraktsforhold (generelt)',
    niva: 'fortrolig',
    kategori: 'kontrakt',
    begrunnelse: 'Delingsmodellen plasserer konkrete aktør-/kontraktsforhold i fortrolig/muntlig.',
    kilde: 'SLIDE6',
  },
  {
    id: 'leietaker-rullering',
    label: 'Leietaker på vei ut / rullering (aktørspesifikk)',
    niva: 'fortrolig',
    kategori: 'aktor',
    begrunnelse:
      'Møterapporten flagger informasjon om leietakere som er på vei ut som sensitiv — håndteres fortrolig.',
    kilde: 'RAPPORT',
  },

  // ── PRIVAT (rød / deles ikke) ─────────────────────────────────────────────
  {
    id: 'leieniva',
    label: 'Leienivå / leieinntekt',
    niva: 'privat',
    kategori: 'leie',
    begrunnelse:
      'Rødt i trafikklyset. BEVISST strengere enn planutkastet (vurderte internt): møtet var tydelig på at leienivå holdes utenfor det felles verktøyet.',
    kilde: 'SLIDE10-rødt',
    modellfelt: ['plaaceData.nokkeldata.leieinntekter'],
  },
  {
    id: 'leieform-aktorspesifikk',
    label: 'Aktørspesifikk leieform',
    niva: 'privat',
    kategori: 'leie',
    begrunnelse: 'Rødt i trafikklyset — aktørspesifikk leieform deles ikke.',
    kilde: 'SLIDE10-rødt',
  },
  {
    id: 'betalingshistorikk',
    label: 'Betalingshistorikk / mislighold',
    niva: 'privat',
    kategori: 'kontrakt',
    begrunnelse: 'Rødt i trafikklyset. Betalingsopplysninger holdes utenfor felles verktøy.',
    kilde: 'SLIDE10-rødt',
  },
  {
    id: 'kontraktsdata',
    label: 'Kontraktsdata',
    niva: 'privat',
    kategori: 'kontrakt',
    begrunnelse: 'Rødt i trafikklyset + delingsmodellens «deles ikke».',
    kilde: 'SLIDE10-rødt',
  },
  {
    id: 'persondata',
    label: 'Persondata',
    niva: 'privat',
    kategori: 'person',
    begrunnelse:
      'Rødt i trafikklyset + delingsmodellens «sensitive person-, kontrakts- eller betalingsopplysninger».',
    kilde: 'SLIDE10-rødt',
  },
] as const;

/** Oppslag: felt-id → post. */
const REGISTER_INDEX: ReadonlyMap<string, SynlighetFelt> = new Map(
  SYNLIGHET_REGISTER.map((f) => [f.id, f]),
);

/** Finn en registerpost på id. */
export function finnFelt(id: string): SynlighetFelt | undefined {
  return REGISTER_INDEX.get(id);
}

/** Slå opp nivået til et felt på id. Faller tilbake til `defaultNiva` om ukjent. */
export function finnNiva(id: string, defaultNiva: Synlighetsniva = 'internt'): Synlighetsniva {
  return REGISTER_INDEX.get(id)?.niva ?? defaultNiva;
}

/** Alle poster med et gitt nivå. */
export function felterForNiva(niva: Synlighetsniva): SynlighetFelt[] {
  return SYNLIGHET_REGISTER.filter((f) => f.niva === niva);
}

// ── Modellbindinger ─────────────────────────────────────────────────────────
// Konkrete nivå-kart for de faktiske datamodellene (src/types/eiendom.ts).
// `filter.ts`/kallstedet bruker disse til å maskere reelle entiteter typesikkert.

/** Nivå pr. felt i {@link Nokkeldata}. */
export const NOKKELDATA_NIVA: Partial<Record<keyof Nokkeldata, Synlighetsniva>> = {
  leieinntekter: 'privat', // jf. `leieniva` — bevisst privat
  prisniva: 'internt',
  befolkning: 'felles',
  gjennomsnittsinntekt: 'felles',
  arbeidsledighet: 'felles',
  areal: 'felles',
  arealKontor: 'internt',
  arealServering: 'internt',
  byggeaar: 'felles',
  energimerke: 'felles',
};

/** Nivå pr. felt i {@link BusinessActor}. */
export const BUSINESS_ACTOR_NIVA: Partial<Record<keyof BusinessActor, Synlighetsniva>> = {
  navn: 'felles',
  type: 'felles',
  adresse: 'felles',
  kommune: 'felles',
  markedsandel: 'felles',
  kjedeProsent: 'felles',
  kjedeLokasjoner: 'felles',
  omsetning: 'internt', // Plaace-avledet arbeidsgrunnlag
  yoyVekst: 'internt',
  ansatteLokalt: 'internt',
  ansatteKjede: 'internt',
};
