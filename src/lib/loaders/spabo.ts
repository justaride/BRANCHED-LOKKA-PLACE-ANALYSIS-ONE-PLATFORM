import type { Eiendom } from '@/types/eiendom';
import { ensureEiendomDefaults, ensureAllEiendomDefaults } from '@/lib/utils/property-defaults';
import { getTenantPropertyIds } from '@/config/tenant-data-manifest';

const TENANT = 'spabo';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/spabo/brenneriveien-5.json'),
      import('@/data/spabo/brenneriveien-9.json'),
      import('@/data/spabo/korsgata-24.json'),
      import('@/data/spabo/markveien-28.json'),
      import('@/data/spabo/markveien-51.json'),
      import('@/data/spabo/markveien-54.json'),
      import('@/data/spabo/markveien-55.json'),
      import('@/data/spabo/markveien-56.json'),
      import('@/data/spabo/markveien-57.json'),
      import('@/data/spabo/markveien-60.json'),
      import('@/data/spabo/olaf-ryes-plass-5.json'),
      import('@/data/spabo/seilduksgata-7.json'),
      import('@/data/spabo/sofienberggata-6.json'),
      import('@/data/spabo/stolmakergaten-19.json'),
      import('@/data/spabo/thorvald-meyers-gate-25.json'),
      import('@/data/spabo/thorvald-meyers-gate-26.json'),
      import('@/data/spabo/thorvald-meyers-gate-27.json'),
      import('@/data/spabo/thorvald-meyers-gate-42.json'),
      import('@/data/spabo/thorvald-meyers-gate-56.json'),
      import('@/data/spabo/thorvald-meyers-gate-72.json'),
      import('@/data/spabo/thorvald-meyers-gate-76.json'),
      import('@/data/spabo/thorvald-meyers-gate-79.json'),
    ]);
    return ensureAllEiendomDefaults(data.map((m) => m.default), TENANT);
  } catch (error) {
    console.error('Error loading SPABO properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/spabo/${id}.json`);
    return ensureEiendomDefaults(eiendom.default, TENANT);
  } catch (error) {
    console.error(`Failed to load SPABO Eiendom eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return getTenantPropertyIds('spabo');
}
