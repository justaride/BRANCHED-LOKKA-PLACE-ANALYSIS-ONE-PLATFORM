import olafRyesPlass4 from './olaf-ryes-plass-4.json';
import type { Eiendom } from '@/types/eiendom';

export const carucelEiendommer: Eiendom[] = [
  olafRyesPlass4 as Eiendom,
];

export function getCarucelEiendom(id: string): Eiendom | undefined {
  return carucelEiendommer.find((e) => e.id === id);
}
