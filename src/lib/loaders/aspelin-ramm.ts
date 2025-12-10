/**
 * Data loaders for Aspelin Ramm properties
 * Uses static imports for Vercel compatibility
 */

import type { Eiendom } from '@/types/eiendom';
import { ensureEiendomDefaults, ensureAllEiendomDefaults } from '@/lib/utils/property-defaults';

const TENANT = 'aspelin-ramm';

/**
 * Load all Aspelin Ramm properties
 */
export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/aspelin-ramm/bellonabygget.json'),
      import('@/data/aspelin-ramm/mathallen.json'),
      import('@/data/aspelin-ramm/nye-broverkstedet.json'),
      import('@/data/aspelin-ramm/scandic-hotel-vulkan.json'),
      import('@/data/aspelin-ramm/vulkan-arena.json'),
      import('@/data/aspelin-ramm/vulkan-omradet.json'),
    ]);

    return ensureAllEiendomDefaults(data.map((m) => m.default), TENANT);
  } catch (error) {
    console.error('Error loading Aspelin Ramm properties:', error);
    return [];
  }
}

/**
 * Load a specific property by ID
 */
export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const data = await import(`@/data/aspelin-ramm/${id}.json`);
    return ensureEiendomDefaults(data.default, TENANT);
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
    'mathallen',
    'nye-broverkstedet',
    'scandic-hotel-vulkan',
    'vulkan-arena',
    'vulkan-omradet',
  ];
}
