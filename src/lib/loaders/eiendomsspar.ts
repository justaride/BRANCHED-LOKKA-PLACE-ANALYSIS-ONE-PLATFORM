import type { Eiendom } from '@/types/eiendom';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/eiendomsspar/nedre-foss-gard.json'),
      import('@/data/eiendomsspar/thorvald-meyers-gate-2.json'),
    ]);
    return data.map((m) => m.default as Eiendom);
  } catch (error) {
    console.error('Error loading Eiendomsspar properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/eiendomsspar/${id}.json`);
    return eiendom.default as Eiendom;
  } catch (error) {
    console.error(`Failed to load Eiendomsspar eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return ['nedre-foss-gard', 'thorvald-meyers-gate-2'];
}
