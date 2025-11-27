import { brodreneEvensenEiendommer, getBrodreneEvensenEiendom } from '@/data/brodrene-evensen';
import type { Eiendom } from '@/types/eiendom';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  return brodreneEvensenEiendommer;
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  const eiendom = getBrodreneEvensenEiendom(id);
  return eiendom || null;
}

export function getAllPropertyIds(): string[] {
  return brodreneEvensenEiendommer.map(e => e.id);
}
