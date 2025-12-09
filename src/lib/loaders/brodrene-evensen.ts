import { brodreneEvensenEiendommer, getBrodreneEvensenEiendom } from '@/data/brodrene-evensen';
import type { Eiendom } from '@/types/eiendom';
import { ensureEiendomDefaults, ensureAllEiendomDefaults } from '@/lib/utils/property-defaults';

const TENANT = 'brodrene-evensen';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  return ensureAllEiendomDefaults(brodreneEvensenEiendommer, TENANT);
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  const eiendom = getBrodreneEvensenEiendom(id);
  return eiendom ? ensureEiendomDefaults(eiendom, TENANT) : null;
}

export function getAllPropertyIds(): string[] {
  return brodreneEvensenEiendommer.map(e => e.id);
}
