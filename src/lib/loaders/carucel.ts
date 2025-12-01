import type { Eiendom } from '@/types/eiendom';

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  try {
    const data = await Promise.all([
      import('@/data/carucel/olaf-ryes-plass-4.json'),
    ]);
    return data.map((m) => m.default as Eiendom);
  } catch (error) {
    console.error('Error loading Carucel properties:', error);
    return [];
  }
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  try {
    const eiendom = await import(`@/data/carucel/${id}.json`);
    return eiendom.default as Eiendom;
  } catch (error) {
    console.error(`Failed to load Carucel eiendom ${id}:`, error);
    return null;
  }
}

export function getAllPropertyIds(): string[] {
  return [
    'olaf-ryes-plass-4',
  ];
}
