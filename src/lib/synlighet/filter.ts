/**
 * Synlighetsfilter — håndhever delingsnivåene på data.
 *
 * `harTilgang`  : ren matriseoppslag (rolle → nivå).
 * `maskerVerdi` : maskerer én verdi.
 * `maskerEntitet`/`maskerListe` : maskerer felter på objekter/lister.
 *
 * ⚠️ Dette er klassifiserings-/maskeringslogikk. For reell sikkerhet MÅ
 * maskeringen kjøres server-side før data sendes til klienten, og `rolle`/
 * `erEier` må komme fra et verifisert auth-lag. Å kun maskere i klient er
 * ingen garanti. Se README.
 */

import {
  type Rolle,
  type Synlighetsniva,
  type MaskertVerdi,
  type TilgangsKontekst,
  ROLLE_TILGANG,
  effektivRolle,
  lagMaskertVerdi,
} from '@/types/synlighet';

/** Ren matrise: har `rolle` lov til å se `niva`? */
export function harTilgang(rolle: Rolle, niva: Synlighetsniva): boolean {
  return ROLLE_TILGANG[rolle].includes(niva);
}

/** Som {@link harTilgang}, men løser effektiv rolle (eierskap/admin) fra kontekst. */
export function harTilgangKtx(ctx: TilgangsKontekst, niva: Synlighetsniva): boolean {
  return harTilgang(effektivRolle(ctx), niva);
}

/**
 * Returnerer verdien hvis konteksten har tilgang til nivået, ellers en
 * {@link MaskertVerdi}-sentinel.
 */
export function maskerVerdi<T>(
  verdi: T,
  niva: Synlighetsniva,
  ctx: TilgangsKontekst,
  feltId?: string,
): T | MaskertVerdi {
  return harTilgangKtx(ctx, niva) ? verdi : lagMaskertVerdi(niva, feltId);
}

/** Resultattype for en maskert entitet: hvert kjent felt kan bli en MaskertVerdi. */
export type Maskert<T> = { [K in keyof T]: T[K] | MaskertVerdi };

/**
 * Maskerer de feltene i `entitet` som er nevnt i `feltNiva` og som konteksten
 * ikke har tilgang til. Felter uten oppføring i `feltNiva` slippes uendret
 * igjennom (whitelist-vennlig: oppgi bare felter som faktisk er klassifisert).
 *
 * @example
 *   maskerEntitet(nokkeldata, NOKKELDATA_NIVA, { rolle: 'medlem' })
 *   // → { ..., leieinntekter: { __maskert: true, niva: 'privat' } }
 */
export function maskerEntitet<T extends object>(
  entitet: T,
  feltNiva: Partial<Record<keyof T, Synlighetsniva>>,
  ctx: TilgangsKontekst,
): Maskert<T> {
  const ut = { ...entitet } as Maskert<T>;
  for (const key of Object.keys(feltNiva) as (keyof T)[]) {
    const niva = feltNiva[key];
    if (niva && !harTilgangKtx(ctx, niva)) {
      ut[key] = lagMaskertVerdi(niva, String(key));
    }
  }
  return ut;
}

/** Maskerer hver entitet i en liste, jf. {@link maskerEntitet}. */
export function maskerListe<T extends object>(
  liste: readonly T[],
  feltNiva: Partial<Record<keyof T, Synlighetsniva>>,
  ctx: TilgangsKontekst,
): Maskert<T>[] {
  return liste.map((e) => maskerEntitet(e, feltNiva, ctx));
}

/**
 * Minste gruppestørrelse for at et aggregat skal kunne vises uten å avsløre
 * enkeltaktører (k-anonymitet). Default-terskel er en ÅPEN BESLUTNING (se
 * README, beslutning #4 «N≥5»). Sett her, og bruk {@link oppfyllerAggregatterskel}
 * på aggregerte tall før de eksponeres på `felles`-nivå.
 */
export const MIN_AGGREGAT = 5;

/** Sjekker om en gruppe er stor nok til å vises som aggregat (n ≥ terskel). */
export function oppfyllerAggregatterskel(n: number, terskel: number = MIN_AGGREGAT): boolean {
  return Number.isFinite(n) && n >= terskel;
}
