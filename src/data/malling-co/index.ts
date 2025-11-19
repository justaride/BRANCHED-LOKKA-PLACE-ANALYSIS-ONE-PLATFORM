import markveien_35 from './markveien-35.json';
import type { Eiendom } from '@/types/eiendom';

export const mallingCoEiendommer: Eiendom[] = [
  markveien_35 as Eiendom,
];

export function getMallingCoEiendom(id: string): Eiendom | undefined {
  return mallingCoEiendommer.find((e) => e.id === id);
}
