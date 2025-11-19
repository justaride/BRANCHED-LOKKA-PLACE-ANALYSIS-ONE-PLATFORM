import type { Eiendom } from '@/types/eiendom';

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
    return data.map((m) => m.default as Eiendom);
  } catch (error) {
    console.error('Error loading SPABO properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/spabo/${id}.json`);
    return eiendom.default as Eiendom;
  } catch (error) {
    console.error(`Failed to load SPABO Eiendom eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return [
    'brenneriveien-5',
    'brenneriveien-9',
    'korsgata-24',
    'markveien-28',
    'markveien-51',
    'markveien-54',
    'markveien-55',
    'markveien-56',
    'markveien-57',
    'markveien-60',
    'olaf-ryes-plass-5',
    'seilduksgata-7',
    'sofienberggata-6',
    'stolmakergaten-19',
    'thorvald-meyers-gate-25',
    'thorvald-meyers-gate-26',
    'thorvald-meyers-gate-27',
    'thorvald-meyers-gate-42',
    'thorvald-meyers-gate-56',
    'thorvald-meyers-gate-72',
    'thorvald-meyers-gate-76',
    'thorvald-meyers-gate-79',
  ];
}
