/**
 * Data loader for 1-minute analysis data
 * Loads JSON files with interactive visualization data for hyperlocal analysis
 */

import type { OneMinAnalysisData } from '@/types/one-min-analysis';

// Static imports for known 1-min analysis data (required for Next.js/Vercel compatibility)
const STATIC_DATA: Record<string, () => Promise<OneMinAnalysisData>> = {
  'spabo/sofienberggata-6': async () => {
    const [demografi, korthandel, bevegelse, konkurransebilde, aktorer] = await Promise.all([
      import('@/data/spabo/sofienberggata-6/1min/demografi.json').then(m => m.default),
      import('@/data/spabo/sofienberggata-6/1min/korthandel.json').then(m => m.default),
      import('@/data/spabo/sofienberggata-6/1min/bevegelse.json').then(m => m.default),
      import('@/data/spabo/sofienberggata-6/1min/konkurransebilde.json').then(m => m.default),
      import('@/data/spabo/sofienberggata-6/1min/aktorer.json').then(m => m.default),
    ]);
    return { demografi, korthandel, bevegelse, konkurransebilde, aktorer };
  },
  'aspelin-ramm/mathallen': async () => {
    const [korthandel, bevegelse, konkurransebilde, aktorer] = await Promise.all([
      import('@/data/aspelin-ramm/mathallen/1min/korthandel.json').then(m => m.default),
      import('@/data/aspelin-ramm/mathallen/1min/bevegelse.json').then(m => m.default),
      import('@/data/aspelin-ramm/mathallen/1min/konkurransebilde.json').then(m => m.default),
      import('@/data/aspelin-ramm/mathallen/1min/aktorer.json').then(m => m.default),
    ]);
    // Mathallen has no demografi (commercial property, no residents)
    return { demografi: null, korthandel, bevegelse, konkurransebilde, aktorer };
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
  propertyId: string
): Promise<OneMinAnalysisData | null> {
  const key = `${tenant}/${propertyId}`;
  console.log(`[one-min-loader] Loading data for: ${key}`);

  // Use static imports for known properties (Vercel compatibility)
  if (STATIC_DATA[key]) {
    console.log(`[one-min-loader] Found static loader for: ${key}`);
    try {
      const data = await STATIC_DATA[key]();
      console.log(`[one-min-loader] Successfully loaded data for: ${key}`, !!data);
      return data;
    } catch (error: unknown) {
      console.error(`[one-min-loader] Error loading ${key}:`, error);
      const errorWithCode = error as { code?: string };
      if (errorWithCode.code !== 'MODULE_NOT_FOUND') {
        console.warn(`Error loading 1-minute analysis data for ${key}:`, error);
      }
      return null;
    }
  } else {
    console.log(`[one-min-loader] No static loader found for: ${key}`);
  }

  // Fallback to dynamic imports for other properties
  try {
    const [korthandel, bevegelse, konkurransebilde, aktorer] = await Promise.all([
      import(`@/data/${tenant}/${propertyId}/1min/korthandel.json`).then(m => m.default),
      import(`@/data/${tenant}/${propertyId}/1min/bevegelse.json`).then(m => m.default),
      import(`@/data/${tenant}/${propertyId}/1min/konkurransebilde.json`).then(m => m.default),
      import(`@/data/${tenant}/${propertyId}/1min/aktorer.json`).then(m => m.default),
    ]);

    // Try to load demografi (optional)
    let demografi = null;
    try {
      demografi = await import(`@/data/${tenant}/${propertyId}/1min/demografi.json`).then(m => m.default);
    } catch {
      // Demografi is optional
    }

    return { demografi, korthandel, bevegelse, konkurransebilde, aktorer };
  } catch (error: unknown) {
    const errorWithCode = error as { code?: string };
    if (errorWithCode.code !== 'MODULE_NOT_FOUND') {
      console.warn(`Error loading 1-minute analysis data for ${tenant}/${propertyId}:`, error);
    }
    return null;
  }
}

/**
 * Check if 1-minute analysis data exists for a property
 *
 * @param tenant - The tenant slug
 * @param propertyId - The property ID
 * @returns true if data exists, false otherwise
 */
export async function hasOneMinAnalysisData(
  tenant: string,
  propertyId: string
): Promise<boolean> {
  const data = await loadOneMinAnalysisData(tenant, propertyId);
  return data !== null;
}
