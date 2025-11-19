import type { Eiendom } from '@/types/eiendom';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/sio/brenneriveien-11.json'),
      import('@/data/sio/marselis-gate-24.json'),
      import('@/data/sio/trondheimsveien-25-29.json'),
    ]);
    return data.map((m) => m.default as Eiendom);
  } catch (error) {
    console.error('Error loading SiO properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/sio/${id}.json`);
    return eiendom.default as Eiendom;
  } catch (error) {
    console.error(`Failed to load SiO eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return ['brenneriveien-11', 'marselis-gate-24', 'trondheimsveien-25-29'];
}
