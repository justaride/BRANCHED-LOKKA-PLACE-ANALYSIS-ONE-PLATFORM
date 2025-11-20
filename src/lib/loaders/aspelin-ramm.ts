/**
 * Data loaders for Aspelin Ramm properties
 * Uses static imports for Vercel compatibility
 */

export interface PropertyData {
  id: string;
  adresse: string;
  gnr: number;
  bnr: number;
  beskrivelse?: string;
  heroImage?: string;
  mapImage?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  plaaceData: {
    rapportDato: string;
    screenshots: Array<{
      filnavn: string;
      path: string;
      beskrivelse: string;
      kategori: string;
    }>;
    nokkeldata: {
      prisniva?: string;
      leieinntekter?: string;
      befolkning?: number;
      gjennomsnittsinntekt?: string;
      arbeidsledighet?: number;
      areal?: string;
      arealKontor?: string;
      arealServering?: string;
      byggeaar?: string;
      energimerke?: string;
    };
  };
  tilleggsinfo: {
    historikk?: string;
    kontaktperson?: string;
    notater?: string[];
  };
  metadata: {
    opprettet: string;
    sistOppdatert: string;
    status: string;
    versjon: number;
  };
}

/**
 * Load all Aspelin Ramm properties
 */
export async function loadAllEiendommer(): Promise<PropertyData[]> {
  try {
    const data = await Promise.all([
      import('@/data/aspelin-ramm/bellonabygget.json'),
      import('@/data/aspelin-ramm/nye-broverkstedet.json'),
      import('@/data/aspelin-ramm/scandic-hotel-vulkan.json'),
      import('@/data/aspelin-ramm/vulkan-arena.json'),
    ]);

    return data.map((m) => m.default as PropertyData);
  } catch (error) {
    console.error('Error loading Aspelin Ramm properties:', error);
    return [];
  }
}

/**
 * Load a specific property by ID
 */
export async function loadEiendom(id: string): Promise<PropertyData | null> {
  try {
    const data = await import(`@/data/aspelin-ramm/${id}.json`);
    return data.default as PropertyData;
  } catch (error) {
    console.error(`Error loading property ${id}:`, error);
    return null;
  }
}

/**
 * Get list of all property IDs
 */
export function getAllPropertyIds(): string[] {
  return [
    'bellonabygget',
    'nye-broverkstedet',
    'scandic-hotel-vulkan',
    'vulkan-arena',
  ];
}
