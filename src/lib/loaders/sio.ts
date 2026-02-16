import type { Eiendom } from '@/types/eiendom';
import { ensureEiendomDefaults, ensureAllEiendomDefaults } from '@/lib/utils/property-defaults';
import { getTenantPropertyIds } from '@/config/tenant-data-manifest';

const TENANT = 'sio';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/sio/brenneriveien-11.json'),
      import('@/data/sio/marselis-gate-24.json'),
      import('@/data/sio/trondheimsveien-25-29.json'),
    ]);
    return ensureAllEiendomDefaults(data.map((m) => m.default), TENANT);
  } catch (error) {
    console.error('Error loading SiO properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/sio/${id}.json`);
    return ensureEiendomDefaults(eiendom.default, TENANT);
  } catch (error) {
    console.error(`Failed to load SiO eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return getTenantPropertyIds('sio');
}
