import { brodreneEvensenEiendommer, getBrodreneEvensenEiendom } from '@/data/brodrene-evensen';
import type { Eiendom } from '@/types/eiendom';
import { ensureEiendomDefaults, ensureAllEiendomDefaults } from '@/lib/utils/property-defaults';
import { getTenantPropertyIds } from '@/config/tenant-data-manifest';

const TENANT = 'brodrene-evensen';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  return ensureAllEiendomDefaults(brodreneEvensenEiendommer, TENANT);
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  const eiendom = getBrodreneEvensenEiendom(id);
  return eiendom ? ensureEiendomDefaults(eiendom, TENANT) : null;
}

export function getAllPropertyIds(): string[] {
  return getTenantPropertyIds('brodrene-evensen');
}
