/**
 * Data loaders for Aspelin Ramm properties
 * Uses static imports for Vercel compatibility
 */

import type { Eiendom } from '@/types/eiendom';

/**
 * Load all Aspelin Ramm properties
 */
export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/aspelin-ramm/bellonabygget.json'),
      import('@/data/aspelin-ramm/nye-broverkstedet.json'),
      import('@/data/aspelin-ramm/scandic-hotel-vulkan.json'),
      import('@/data/aspelin-ramm/vulkan-arena.json'),
    ]);

    return data.map((m) => m.default as Eiendom);
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
    return data.default as Eiendom;
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
