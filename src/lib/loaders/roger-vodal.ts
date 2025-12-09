import { rogerVodalEiendommer, getRogerVodalEiendom } from '@/data/roger-vodal';
import type { Eiendom } from '@/types/eiendom';
import { ensureEiendomDefaults, ensureAllEiendomDefaults } from '@/lib/utils/property-defaults';

const TENANT = 'roger-vodal';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  return ensureAllEiendomDefaults(rogerVodalEiendommer, TENANT);
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  const eiendom = getRogerVodalEiendom(id);
  return eiendom ? ensureEiendomDefaults(eiendom, TENANT) : null;
}

export function getAllPropertyIds(): string[] {
  return rogerVodalEiendommer.map(e => e.id);
}
