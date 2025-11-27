/**
 * Hovedinterface for eiendomsdata
 */
export interface Eiendom {
  id: string;
  navn?: string; // Display name (e.g., "Mathallen", "Bellonabygget")
  adresse: string;
  gnr?: number | null;
  bnr?: number | null;
  beskrivelse?: string;
  heroImage?: string;
  mapImage?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  plaaceData: PlaaceData;
  plaaceAnalyses?: PlaaceAnalyse[]; // Multiple analyses support
  tilleggsinfo: Tilleggsinfo;
  metadata: Metadata;
  naringsaktorer?: NaringsAktorData; // Business actors in the area
}

/**
 * Individual Plaace analysis with specific parameters
 */
export interface PlaaceAnalyse {
  id: string; // e.g., "5min-walk", "1min-walk", "custom-1"
  tittel: string; // e.g., "5 minutters gange", "1 minutts gange"
  beskrivelse?: string; // Optional description of this analysis
  parametere: AnalyseParametere;
  rapportDato: string; // ISO date string
  screenshots: Screenshot[];
  nokkeldata: Nokkeldata;
  demografi?: DemografiData;
  marked?: MarkedData;
}

/**
 * Parameters used for this specific analysis
 */
export interface AnalyseParametere {
  gangeavstand?: string; // e.g., "5 minutter", "1 minutt"
  radius?: number; // meters
  transporttype?: 'gange' | 'sykkel' | 'bil' | 'kollektiv';
  notater?: string;
}

export interface PlaaceData {
  rapportDato: string; // ISO date string
  screenshots: Screenshot[];
  nokkeldata: Nokkeldata;
  demografi?: DemografiData;
  marked?: MarkedData;
}

export interface Screenshot {
  filnavn: string;
  path: string;
  beskrivelse: string;
  kategori: string;
}

export interface Nokkeldata {
  prisniva?: string | null; // f.eks. "NOK 53000/m2"
  leieinntekter?: string | null;
  befolkning?: number | null;
  gjennomsnittsinntekt?: string | null;
  arbeidsledighet?: number | null;
  areal?: string | null;
  arealKontor?: string | null;
  arealServering?: string | null;
  byggeaar?: string | null;
  energimerke?: string | null;
}

export interface DemografiData {
  totalBefolkning?: number;
  befolkningsutvikling?: number; // prosent
  aldersfordeling?: {
    '0-17': number;
    '18-29': number;
    '30-49': number;
    '50-66': number;
    '67+': number;
  };
  husstandsstorrelse?: number;
}

export interface MarkedData {
  omsetning?: number;
  transaksjoner?: number;
  prisutviklingProsent?: number;
  kvadratmeterpris?: number;
}

export interface Tilleggsinfo {
  historikk?: string; // Markdown-formatert
  kontaktperson?: string;
  notater?: string[];
  lenker?: Array<{
    tekst: string;
    url: string;
  }>;
}

export interface Metadata {
  opprettet: string; // ISO date
  sistOppdatert: string; // ISO date
  status: 'utkast' | 'publisert' | 'arkivert';
  versjon: number;
}

/**
 * Business actor (næringsaktør) data for a property area
 */
export interface NaringsAktorData {
  actors: BusinessActor[];
  categoryStats: Record<string, CategoryStats>;
  metadata: {
    totalActors: number;
    totalCategories: number;
    generatedAt?: string;
    migratedAt?: string;
  };
}

/**
 * Individual business actor with financial and operational data
 */
export interface BusinessActor {
  rank: string;
  navn: string;
  type: string;
  adresse: string;
  kommune: string;
  omsetning: number | null;
  kjedeProsent: string | null;
  yoyVekst: number | null;
  ansatteLokalt: number | null;
  ansatteKjede: number | null;
  kjedeLokasjoner: number | null;
  markedsandel: number | null;
}

/**
 * Aggregated statistics for a business category
 */
export interface CategoryStats {
  count: number;
  totalRevenue: number;
  avgRevenue: number;
}
