import type { Eiendom } from '@/types/eiendom';
import { ensureEiendomDefaults, ensureAllEiendomDefaults } from '@/lib/utils/property-defaults';
import { getTenantPropertyIds } from '@/config/tenant-data-manifest';

const TENANT = 'maya-eiendom';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/maya-eiendom/hausmannsgate-19.json'),
      import('@/data/maya-eiendom/thorvald-meyers-gate-46.json'),
      import('@/data/maya-eiendom/thorvald-meyersgate-38.json'),
      import('@/data/maya-eiendom/trondheimsveien-80.json'),
    ]);
    return ensureAllEiendomDefaults(data.map((m) => m.default), TENANT);
  } catch (error) {
    console.error('Error loading Maya Eiendom properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/maya-eiendom/${id}.json`);
    return ensureEiendomDefaults(eiendom.default, TENANT);
  } catch (error) {
    console.error(`Failed to load Maya Eiendom eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return getTenantPropertyIds('maya-eiendom');
}
