/**
 * Integrasjonsseam: oversetter en (fremtidig) auth-session til en
 * `TilgangsKontekst` som maskeringslaget kan bruke.
 *
 * Dette er den manglende «limen» mellom auth og synlighetslaget (beslutning B2).
 * Funksjonene er rene og testbare; de leser ikke selv cookies/JWT. Kallstedet
 * (en server-komponent / loader, eller en server action) bygger en
 * `SynlighetSession` fra det faktiske auth-laget og sender den inn.
 *
 * ⚠️ Status i dag: plattformen har ingen per-request session å lese
 * (auth.ts er fraværende, og eiendomssidene er statisk genererte). Reell
 * håndheving krever derfor B2 (verifisert session) + at de aktuelle rutene
 * gjøres dynamiske eller at maskeringen skjer klient-side etter innlogging.
 * Se README, «Integrasjonsstatus».
 */

import { type Rolle, type TilgangsKontekst } from '@/types/synlighet';

/** Minimal session-form synlighetslaget trenger. Produseres av auth-laget (B2). */
export interface SynlighetSession {
  /** Om brukeren er innlogget. */
  innlogget: boolean;
  /** E-post hvis kjent — brukes til å utlede admin. */
  epost?: string;
  /** Tenant-slug brukeren er knyttet til (gårdeier), hvis kjent. */
  tenant?: string;
}

/** Et objekt som kan «eies» av en tenant/gårdeier (for erEier-vurdering). */
export interface EierbartObjekt {
  /** Tenant-slug som eier datapunktet/entiteten. */
  tenant?: string;
  /** Alternativ eier-slug (om modellen bruker et eget felt). */
  eier?: string;
}

/** Trygg standardkontekst for ikke-innlogget/offentlig visning. */
export const GJEST_KONTEKST: TilgangsKontekst = { rolle: 'gjest' };

/**
 * Utleder basisrolle fra session.
 * - Ikke innlogget → `gjest`.
 * - E-post i `adminEpost` → `admin`.
 * - Innlogget med tenant → `gardeier`; ellers `medlem`.
 *
 * `adminEpost` injiseres (testbart). På server: send inn `getAdminEmails()`
 * fra `@/lib/tenant-emails`.
 */
export function utledRolle(
  session: SynlighetSession | null | undefined,
  adminEpost: readonly string[] = [],
): Rolle {
  if (!session?.innlogget) return 'gjest';
  const epost = session.epost?.trim().toLowerCase();
  if (epost && adminEpost.some((e) => e.trim().toLowerCase() === epost)) {
    return 'admin';
  }
  return session.tenant ? 'gardeier' : 'medlem';
}

/** Er den innloggede brukeren eier av `record`? (tenant-slug-match.) */
export function eierAv(
  session: SynlighetSession | null | undefined,
  record?: EierbartObjekt,
): boolean {
  if (!session?.tenant || !record) return false;
  return session.tenant === record.tenant || session.tenant === record.eier;
}

/**
 * Bygger en full `TilgangsKontekst` fra session + (valgfritt) objektet som
 * vurderes. Send med `record` når du masker en konkret entitet, slik at eieren
 * løftes til `eier` for nettopp sine egne data.
 */
export function tilgangsKontekst(
  session: SynlighetSession | null | undefined,
  record?: EierbartObjekt,
  adminEpost: readonly string[] = [],
): TilgangsKontekst {
  return {
    rolle: utledRolle(session, adminEpost),
    erEier: eierAv(session, record),
  };
}
