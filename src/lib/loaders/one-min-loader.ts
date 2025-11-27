/**
 * Data loader for 1-minute analysis data
 * Loads JSON files with interactive visualization data for hyperlocal analysis
 */

import type { OneMinAnalysisData } from '@/types/one-min-analysis';

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
  try {
    // Try to load all 5 data files in parallel
    const [demografi, korthandel, bevegelse, konkurransebilde, aktorer] = await Promise.all([
      import(`@/data/${tenant}/${propertyId}/1min/demografi.json`).then(m => m.default),
      import(`@/data/${tenant}/${propertyId}/1min/korthandel.json`).then(m => m.default),
      import(`@/data/${tenant}/${propertyId}/1min/bevegelse.json`).then(m => m.default),
      import(`@/data/${tenant}/${propertyId}/1min/konkurransebilde.json`).then(m => m.default),
      import(`@/data/${tenant}/${propertyId}/1min/aktorer.json`).then(m => m.default),
    ]);

    return {
      demografi,
      korthandel,
      bevegelse,
      konkurransebilde,
      aktorer,
    };
  } catch (error: any) {
    // If any file is missing, return null.
    // We suppress MODULE_NOT_FOUND logs as this is expected for many properties.
    if (error.code !== 'MODULE_NOT_FOUND') {
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
