import type { Eiendom } from '@/types/eiendom';
import { ensureEiendomDefaults, ensureAllEiendomDefaults } from '@/lib/utils/property-defaults';

const TENANT = 'eiendomsspar';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/eiendomsspar/nedre-foss-gard.json'),
      import('@/data/eiendomsspar/thorvald-meyers-gate-2.json'),
    ]);
    return ensureAllEiendomDefaults(data.map((m) => m.default), TENANT);
  } catch (error) {
    console.error('Error loading Eiendomsspar properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/eiendomsspar/${id}.json`);
    return ensureEiendomDefaults(eiendom.default, TENANT);
  } catch (error) {
    console.error(`Failed to load Eiendomsspar eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return ['nedre-foss-gard', 'thorvald-meyers-gate-2'];
}
