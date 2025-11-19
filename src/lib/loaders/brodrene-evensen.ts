import type { Eiendom } from '@/types/eiendom';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/brodrene-evensen/thorvaldmeyers-gate-18.json'),
      import('@/data/brodrene-evensen/thorvaldmeyers-gate-53.json'),
      import('@/data/brodrene-evensen/thorvaldmeyers-gate-55.json'),
    ]);
    return data.map((m) => m.default as Eiendom);
  } catch (error) {
    console.error('Error loading Brødrene Evensen properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/brodrene-evensen/${id}.json`);
    return eiendom.default as Eiendom;
  } catch (error) {
    console.error(`Failed to load Brødrene Evensen eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return ['thorvaldmeyers-gate-18', 'thorvaldmeyers-gate-53', 'thorvaldmeyers-gate-55'];
}
