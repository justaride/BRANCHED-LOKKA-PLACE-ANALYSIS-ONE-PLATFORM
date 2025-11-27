import { rogerVodalEiendommer, getRogerVodalEiendom } from '@/data/roger-vodal';
import type { Eiendom } from '@/types/eiendom';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  return rogerVodalEiendommer;
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  const eiendom = getRogerVodalEiendom(id);
  return eiendom || null;
}

export function getAllPropertyIds(): string[] {
  return rogerVodalEiendommer.map(e => e.id);
}
