/**
 * Property Default Values
 * Ensures all property data has required fields to prevent silent failures
 */

import type { Eiendom, Nokkeldata, NaringsAktorData, BusinessActor, CategoryStats } from '@/types/eiendom';

/**
 * Default values for Nokkeldata
 */
export const DEFAULT_NOKKELDATA: Nokkeldata = {
  prisniva: null,
  leieinntekter: null,
  befolkning: null,
  gjennomsnittsinntekt: null,
  arbeidsledighet: null,
  areal: null,
  arealKontor: null,
  arealServering: null,
  byggeaar: null,
  energimerke: null,
};

/**
 * Default metadata for næringsaktører
 */
export const DEFAULT_NARINGSAKTORER: NaringsAktorData = {
  actors: [],
  categoryStats: {},
  metadata: {
    totalActors: 0,
    totalCategories: 0,
  },
};

/**
 * Sanitize Nokkeldata, replacing null/undefined with defaults
 */
export function sanitizeNokkeldata(data: Partial<Nokkeldata> | undefined): Nokkeldata {
  if (!data) return { ...DEFAULT_NOKKELDATA };

  return {
    prisniva: data.prisniva ?? null,
    leieinntekter: data.leieinntekter ?? null,
    befolkning: data.befolkning ?? null,
    gjennomsnittsinntekt: data.gjennomsnittsinntekt ?? null,
    arbeidsledighet: data.arbeidsledighet ?? null,
    areal: data.areal ?? null,
    arealKontor: data.arealKontor ?? null,
    arealServering: data.arealServering ?? null,
    byggeaar: data.byggeaar ?? null,
    energimerke: data.energimerke ?? null,
  };
}

/**
 * Sanitize business actor data
 */
export function sanitizeBusinessActor(actor: Partial<BusinessActor>): BusinessActor {
  return {
    rank: actor.rank ?? '0',
    navn: actor.navn ?? 'Ukjent',
    type: actor.type ?? 'Ukjent',
    adresse: actor.adresse ?? '',
    kommune: actor.kommune ?? '',
    omsetning: actor.omsetning ?? null,
    kjedeProsent: actor.kjedeProsent ?? null,
    yoyVekst: actor.yoyVekst ?? null,
    ansatteLokalt: actor.ansatteLokalt ?? null,
    ansatteKjede: actor.ansatteKjede ?? null,
    kjedeLokasjoner: actor.kjedeLokasjoner ?? null,
    markedsandel: actor.markedsandel ?? null,
  };
}

/**
 * Sanitize category stats
 */
export function sanitizeCategoryStats(stats: Partial<CategoryStats>): CategoryStats {
  return {
    count: stats.count ?? 0,
    totalRevenue: stats.totalRevenue ?? 0,
    avgRevenue: stats.avgRevenue ?? 0,
  };
}

/**
 * Sanitize næringsaktører data
 */
export function sanitizeNaringsaktorer(data: Partial<NaringsAktorData> | undefined): NaringsAktorData {
  if (!data) return { ...DEFAULT_NARINGSAKTORER };

  const sanitizedStats: Record<string, CategoryStats> = {};
  if (data.categoryStats) {
    for (const [key, value] of Object.entries(data.categoryStats)) {
      sanitizedStats[key] = sanitizeCategoryStats(value);
    }
  }

  return {
    actors: (data.actors ?? []).map(sanitizeBusinessActor),
    categoryStats: sanitizedStats,
    metadata: {
      totalActors: data.metadata?.totalActors ?? data.actors?.length ?? 0,
      totalCategories: data.metadata?.totalCategories ?? Object.keys(sanitizedStats).length,
      generatedAt: data.metadata?.generatedAt,
      migratedAt: data.metadata?.migratedAt,
    },
  };
}

/**
 * Derive property name from ID if not provided
 */
export function derivePropertyName(id: string): string {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Derive address from ID if not provided
 */
export function derivePropertyAddress(id: string): string {
  const parts = id.split('-');
  const streetParts: string[] = [];
  let number = '';

  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      number = part;
    } else {
      streetParts.push(part.charAt(0).toUpperCase() + part.slice(1));
    }
  }

  const street = streetParts.join(' ');
  return number ? `${street} ${number}` : street;
}

/**
 * Ensure all required Eiendom fields have values
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ensureEiendomDefaults(data: Record<string, unknown> | Eiendom, _tenant: string): Eiendom {
  const partial = data as Partial<Eiendom>;
  const id = String(partial.id ?? 'unknown');

  return {
    id,
    navn: partial.navn ?? derivePropertyName(id),
    adresse: partial.adresse ?? derivePropertyAddress(id),
    gnr: partial.gnr ?? null,
    bnr: partial.bnr ?? null,
    beskrivelse: partial.beskrivelse ?? '',
    heroImage: partial.heroImage,
    mapImage: partial.mapImage,
    coordinates: partial.coordinates,
    plaaceData: {
      rapportDato: partial.plaaceData?.rapportDato ?? new Date().toISOString(),
      screenshots: partial.plaaceData?.screenshots ?? [],
      nokkeldata: sanitizeNokkeldata(partial.plaaceData?.nokkeldata),
      demografi: partial.plaaceData?.demografi,
      marked: partial.plaaceData?.marked,
    },
    plaaceAnalyses: partial.plaaceAnalyses,
    tilleggsinfo: partial.tilleggsinfo ?? {
      historikk: '',
      notater: [],
      lenker: [],
    },
    metadata: partial.metadata ?? {
      opprettet: new Date().toISOString(),
      sistOppdatert: new Date().toISOString(),
      status: 'publisert',
      versjon: 1,
    },
    naringsaktorer: sanitizeNaringsaktorer(partial.naringsaktorer),
  };
}

/**
 * Batch ensure defaults for multiple properties
 */
export function ensureAllEiendomDefaults(properties: (Record<string, unknown> | Eiendom)[], tenant: string): Eiendom[] {
  return properties.map(prop => ensureEiendomDefaults(prop, tenant));
}
