import type { Eiendom } from '@/types/eiendom';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/roger-vodal/markveien-48.json'),
      import('@/data/roger-vodal/markveien-53.json'),
      import('@/data/roger-vodal/thorvald-meyersgate-44.json'),
    ]);
    return data.map((m) => m.default as Eiendom);
  } catch (error) {
    console.error('Error loading Roger Vodal properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/roger-vodal/${id}.json`);
    return eiendom.default as Eiendom;
  } catch (error) {
    console.error(`Failed to load Roger Vodal eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return ['markveien-48', 'markveien-53', 'thorvald-meyersgate-44'];
}
