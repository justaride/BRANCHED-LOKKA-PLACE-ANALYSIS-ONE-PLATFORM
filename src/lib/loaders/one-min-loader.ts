/**
 * Data loader for 1-minute analysis data
 * Loads JSON files with interactive visualization data for hyperlocal analysis
 *
 * Structure: 6 main sections + Actors list
 * 1. DEMOGRAFI - demografi.json
 * 2. KONKURRANSEBILDET - konkurransebilde.json
 * 3. KORTHANDEL - korthandel.json
 * 4. BEVEGELSE - bevegelse.json
 * 5. BESØKENDE - besokende.json
 * 6. INTERNASJONALT - internasjonalt.json
 * + AKTØRER - aktorer.json
 */

import type {
  OneMinAnalysisData,
  DemografiData,
  KonkurransebildeData,
  KorthandelData,
  BevegelseData,
  BesøkendeData,
  InternasjonaltData,
  AktorerData,
} from "@/types/one-min-analysis";

// Helper to safely import optional JSON files (currently unused but kept for future dynamic imports)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function _safeImport<T>(
  importFn: () => Promise<{ default: T }>,
): Promise<T | null> {
  try {
    const mod = await importFn();
    return mod.default;
  } catch {
    return null;
  }
}

// Static imports for known 1-min analysis data (required for Next.js/Vercel compatibility)
// Note: Older files (spabo, mathallen) use legacy format and require type coercion
const STATIC_DATA: Record<string, () => Promise<OneMinAnalysisData>> = {
  // Carucel - Olaf Ryes Plass 4 (1-min analysis)
  "carucel/olaf-ryes-plass-4": async () => {
    const [demografi, konkurransebilde, korthandel, bevegelse, aktorer] =
      await Promise.all([
        import("@/data/carucel/olaf-ryes-plass-4/1min/demografi.json").then(
          (m) => m.default as unknown as DemografiData,
        ),
        import("@/data/carucel/olaf-ryes-plass-4/1min/konkurransebilde.json").then(
          (m) => m.default as unknown as KonkurransebildeData,
        ),
        import("@/data/carucel/olaf-ryes-plass-4/1min/korthandel.json").then(
          (m) => m.default as unknown as KorthandelData,
        ),
        import("@/data/carucel/olaf-ryes-plass-4/1min/bevegelse.json").then(
          (m) => m.default as unknown as BevegelseData,
        ),
        import("@/data/carucel/olaf-ryes-plass-4/1min/aktorer.json").then(
          (m) => m.default as unknown as AktorerData,
        ),
      ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende: null,
      internasjonalt: null,
      aktorer,
    };
  },

  // Spabo - Sofienberggata 6 (legacy format)
  "spabo/sofienberggata-6": async () => {
    const [demografi, konkurransebilde, korthandel, bevegelse, aktorer] =
      await Promise.all([
        import("@/data/spabo/sofienberggata-6/1min/demografi.json").then(
          (m) => m.default as unknown as DemografiData,
        ),
        import("@/data/spabo/sofienberggata-6/1min/konkurransebilde.json").then(
          (m) => m.default as unknown as KonkurransebildeData,
        ),
        import("@/data/spabo/sofienberggata-6/1min/korthandel.json").then(
          (m) => m.default as unknown as KorthandelData,
        ),
        import("@/data/spabo/sofienberggata-6/1min/bevegelse.json").then(
          (m) => m.default as unknown as BevegelseData,
        ),
        import("@/data/spabo/sofienberggata-6/1min/aktorer.json").then(
          (m) => m.default as unknown as AktorerData,
        ),
      ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende: null,
      internasjonalt: null,
      aktorer,
    };
  },

  // Aspelin Ramm - Mathallen (legacy format)
  "aspelin-ramm/mathallen": async () => {
    const [konkurransebilde, korthandel, bevegelse, aktorer] =
      await Promise.all([
        import("@/data/aspelin-ramm/mathallen/1min/konkurransebilde.json").then(
          (m) => m.default as unknown as KonkurransebildeData,
        ),
        import("@/data/aspelin-ramm/mathallen/1min/korthandel.json").then(
          (m) => m.default as unknown as KorthandelData,
        ),
        import("@/data/aspelin-ramm/mathallen/1min/bevegelse.json").then(
          (m) => m.default as unknown as BevegelseData,
        ),
        import("@/data/aspelin-ramm/mathallen/1min/aktorer.json").then(
          (m) => m.default as unknown as AktorerData,
        ),
      ]);
    return {
      demografi: null,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende: null,
      internasjonalt: null,
      aktorer,
    };
  },

  // Aspelin Ramm - Vulkan Området (5-min analysis)
  "aspelin-ramm/vulkan-omradet": async () => {
    const [
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    ] = await Promise.all([
      import("@/data/aspelin-ramm/vulkan-omradet/5min/demografi.json").then(
        (m) => m.default as DemografiData,
      ),
      import("@/data/aspelin-ramm/vulkan-omradet/5min/konkurransebilde.json").then(
        (m) => m.default as KonkurransebildeData,
      ),
      import("@/data/aspelin-ramm/vulkan-omradet/5min/korthandel.json").then(
        (m) => m.default as KorthandelData,
      ),
      import("@/data/aspelin-ramm/vulkan-omradet/5min/bevegelse.json").then(
        (m) => m.default as BevegelseData,
      ),
      import("@/data/aspelin-ramm/vulkan-omradet/5min/besokende.json").then(
        (m) => m.default as BesøkendeData,
      ),
      import("@/data/aspelin-ramm/vulkan-omradet/5min/internasjonalt.json").then(
        (m) => m.default as InternasjonaltData,
      ),
      import("@/data/aspelin-ramm/vulkan-omradet/5min/aktorer.json").then(
        (m) => m.default as AktorerData,
      ),
    ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    };
  },

  // Roger Vodal - Olaf Ryes Plass 3 (5-min analysis)
  "roger-vodal/olaf-ryes-plass-3": async () => {
    const [
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    ] = await Promise.all([
      import("@/data/roger-vodal/olaf-ryes-plass-3/5min/demografi.json").then(
        (m) => m.default as DemografiData,
      ),
      import("@/data/roger-vodal/olaf-ryes-plass-3/5min/konkurransebilde.json").then(
        (m) => m.default as KonkurransebildeData,
      ),
      import("@/data/roger-vodal/olaf-ryes-plass-3/5min/korthandel.json").then(
        (m) => m.default as KorthandelData,
      ),
      import("@/data/roger-vodal/olaf-ryes-plass-3/5min/bevegelse.json").then(
        (m) => m.default as BevegelseData,
      ),
      import("@/data/roger-vodal/olaf-ryes-plass-3/5min/besokende.json").then(
        (m) => m.default as BesøkendeData,
      ),
      import("@/data/roger-vodal/olaf-ryes-plass-3/5min/internasjonalt.json").then(
        (m) => m.default as InternasjonaltData,
      ),
      import("@/data/roger-vodal/olaf-ryes-plass-3/5min/aktorer.json").then(
        (m) => m.default as AktorerData,
      ),
    ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    };
  },

  // Roger Vodal - Thorvald Meyersgate 33 (5-min analysis, no besokende/internasjonalt)
  "roger-vodal/thorvald-meyersgate-33": async () => {
    const [demografi, konkurransebilde, korthandel, bevegelse, aktorer] =
      await Promise.all([
        import("@/data/roger-vodal/thorvald-meyersgate-33/5min/demografi.json").then(
          (m) => m.default as DemografiData,
        ),
        import("@/data/roger-vodal/thorvald-meyersgate-33/5min/konkurransebilde.json").then(
          (m) => m.default as KonkurransebildeData,
        ),
        import("@/data/roger-vodal/thorvald-meyersgate-33/5min/korthandel.json").then(
          (m) => m.default as KorthandelData,
        ),
        import("@/data/roger-vodal/thorvald-meyersgate-33/5min/bevegelse.json").then(
          (m) => m.default as BevegelseData,
        ),
        import("@/data/roger-vodal/thorvald-meyersgate-33/5min/aktorer.json").then(
          (m) => m.default as AktorerData,
        ),
      ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende: null,
      internasjonalt: null,
      aktorer,
    };
  },

  // Roger Vodal - Thorvald Meyersgate 40 (5-min analysis)
  "roger-vodal/thorvald-meyersgate-40": async () => {
    const [
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    ] = await Promise.all([
      import("@/data/roger-vodal/thorvald-meyersgate-40/5min/demografi.json").then(
        (m) => m.default as DemografiData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-40/5min/konkurransebilde.json").then(
        (m) => m.default as KonkurransebildeData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-40/5min/korthandel.json").then(
        (m) => m.default as KorthandelData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-40/5min/bevegelse.json").then(
        (m) => m.default as BevegelseData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-40/5min/besokende.json").then(
        (m) => m.default as BesøkendeData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-40/5min/internasjonalt.json").then(
        (m) => m.default as InternasjonaltData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-40/5min/aktorer.json").then(
        (m) => m.default as AktorerData,
      ),
    ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    };
  },

  // Roger Vodal - Thorvald Meyersgate 44 (5-min analysis)
  "roger-vodal/thorvald-meyersgate-44": async () => {
    const [
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    ] = await Promise.all([
      import("@/data/roger-vodal/thorvald-meyersgate-44/5min/demografi.json").then(
        (m) => m.default as DemografiData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-44/5min/konkurransebilde.json").then(
        (m) => m.default as KonkurransebildeData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-44/5min/korthandel.json").then(
        (m) => m.default as KorthandelData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-44/5min/bevegelse.json").then(
        (m) => m.default as BevegelseData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-44/5min/besokende.json").then(
        (m) => m.default as BesøkendeData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-44/5min/internasjonalt.json").then(
        (m) => m.default as InternasjonaltData,
      ),
      import("@/data/roger-vodal/thorvald-meyersgate-44/5min/aktorer.json").then(
        (m) => m.default as AktorerData,
      ),
    ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    };
  },

  // Roger Vodal - Markveien 38 (5-min analysis)
  "roger-vodal/markveien-38": async () => {
    const [
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    ] = await Promise.all([
      import("@/data/roger-vodal/markveien-38/5min/demografi.json").then(
        (m) => m.default as DemografiData,
      ),
      import("@/data/roger-vodal/markveien-38/5min/konkurransebilde.json").then(
        (m) => m.default as KonkurransebildeData,
      ),
      import("@/data/roger-vodal/markveien-38/5min/korthandel.json").then(
        (m) => m.default as KorthandelData,
      ),
      import("@/data/roger-vodal/markveien-38/5min/bevegelse.json").then(
        (m) => m.default as BevegelseData,
      ),
      import("@/data/roger-vodal/markveien-38/5min/besokende.json").then(
        (m) => m.default as BesøkendeData,
      ),
      import("@/data/roger-vodal/markveien-38/5min/internasjonalt.json").then(
        (m) => m.default as InternasjonaltData,
      ),
      import("@/data/roger-vodal/markveien-38/5min/aktorer.json").then(
        (m) => m.default as AktorerData,
      ),
    ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    };
  },

  // Roger Vodal - Markveien 42 (5-min analysis)
  "roger-vodal/markveien-42": async () => {
    const [
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    ] = await Promise.all([
      import("@/data/roger-vodal/markveien-42/5min/demografi.json").then(
        (m) => m.default as DemografiData,
      ),
      import("@/data/roger-vodal/markveien-42/5min/konkurransebilde.json").then(
        (m) => m.default as KonkurransebildeData,
      ),
      import("@/data/roger-vodal/markveien-42/5min/korthandel.json").then(
        (m) => m.default as KorthandelData,
      ),
      import("@/data/roger-vodal/markveien-42/5min/bevegelse.json").then(
        (m) => m.default as BevegelseData,
      ),
      import("@/data/roger-vodal/markveien-42/5min/besokende.json").then(
        (m) => m.default as BesøkendeData,
      ),
      import("@/data/roger-vodal/markveien-42/5min/internasjonalt.json").then(
        (m) => m.default as InternasjonaltData,
      ),
      import("@/data/roger-vodal/markveien-42/5min/aktorer.json").then(
        (m) => m.default as AktorerData,
      ),
    ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    };
  },

  // Roger Vodal - Markveien 58 (5-min analysis)
  "roger-vodal/markveien-58": async () => {
    const [
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    ] = await Promise.all([
      import("@/data/roger-vodal/markveien-58/5min/demografi.json").then(
        (m) => m.default as DemografiData,
      ),
      import("@/data/roger-vodal/markveien-58/5min/konkurransebilde.json").then(
        (m) => m.default as KonkurransebildeData,
      ),
      import("@/data/roger-vodal/markveien-58/5min/korthandel.json").then(
        (m) => m.default as KorthandelData,
      ),
      import("@/data/roger-vodal/markveien-58/5min/bevegelse.json").then(
        (m) => m.default as BevegelseData,
      ),
      import("@/data/roger-vodal/markveien-58/5min/besokende.json").then(
        (m) => m.default as BesøkendeData,
      ),
      import("@/data/roger-vodal/markveien-58/5min/internasjonalt.json").then(
        (m) => m.default as InternasjonaltData,
      ),
      import("@/data/roger-vodal/markveien-58/5min/aktorer.json").then(
        (m) => m.default as AktorerData,
      ),
    ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    };
  },

  // Front Real Estate (Malling & Co) - Markveien 35 (1-min analysis)
  "front-real-estate/markveien-35": async () => {
    const [
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    ] = await Promise.all([
      import("@/data/front-real-estate/markveien-35/1min/demografi.json").then(
        (m) => m.default as unknown as DemografiData,
      ),
      import("@/data/front-real-estate/markveien-35/1min/konkurransebilde.json").then(
        (m) => m.default as unknown as KonkurransebildeData,
      ),
      import("@/data/front-real-estate/markveien-35/1min/korthandel.json").then(
        (m) => m.default as unknown as KorthandelData,
      ),
      import("@/data/front-real-estate/markveien-35/1min/bevegelse.json").then(
        (m) => m.default as unknown as BevegelseData,
      ),
      import("@/data/front-real-estate/markveien-35/1min/besokende.json").then(
        (m) => m.default as unknown as BesøkendeData,
      ),
      import("@/data/front-real-estate/markveien-35/1min/internasjonalt.json").then(
        (m) => m.default as unknown as InternasjonaltData,
      ),
      import("@/data/front-real-estate/markveien-35/1min/aktorer.json").then(
        (m) => m.default as unknown as AktorerData,
      ),
    ]);
    return {
      demografi,
      konkurransebilde,
      korthandel,
      bevegelse,
      besokende,
      internasjonalt,
      aktorer,
    };
  },
};

/**
 * Load 1-minute analysis data for a specific property
 *
 * @param tenant - The tenant slug (e.g., 'spabo')
 * @param propertyId - The property ID (e.g., 'sofienberggata-6')
 * @returns OneMinAnalysisData or null if not available
 */
export async function loadOneMinAnalysisData(
  tenant: string,
  propertyId: string,
): Promise<OneMinAnalysisData | null> {
  const key = `${tenant}/${propertyId}`;

  if (STATIC_DATA[key]) {
    try {
      return await STATIC_DATA[key]();
    } catch (error: unknown) {
      console.error(`[one-min-loader] Error loading ${key}:`, error);
      return null;
    }
  }

  // No dynamic fallback - all properties must be registered in STATIC_DATA
  return null;
}

/**
 * Check if 1-minute analysis data exists for a property
 *
 * @param tenant - The tenant slug
 * @param propertyId - The property ID
 * @returns true if data exists, false otherwise
 */
export function hasOneMinAnalysisData(
  tenant: string,
  propertyId: string,
): boolean {
  const key = `${tenant}/${propertyId}`;
  return key in STATIC_DATA;
}

/**
 * Get list of all properties with 1-minute analysis data
 */
export function getPropertiesWithOneMinData(): string[] {
  return Object.keys(STATIC_DATA);
}
