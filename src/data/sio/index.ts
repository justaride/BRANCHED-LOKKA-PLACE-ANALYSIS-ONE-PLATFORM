import brenneriveien11 from './brenneriveien-11.json';
import marselis24 from './marselis-gate-24.json';
import trondheimsveien from './trondheimsveien-25-29.json';
import type { Eiendom } from '@/types/eiendom';

export const sioEiendommer: Eiendom[] = [
  brenneriveien11 as Eiendom,
  marselis24 as Eiendom,
  trondheimsveien as Eiendom,
];

export function getSioEiendom(id: string): Eiendom | undefined {
  return sioEiendommer.find((e) => e.id === id);
}
