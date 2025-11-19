import nedre_foss_gard from './nedre-foss-gard.json';
import thorvald_meyers_gate_2 from './thorvald-meyers-gate-2.json';
import type { Eiendom } from '@/types/eiendom';

export const eiendomssparEiendommer: Eiendom[] = [
  nedre_foss_gard as Eiendom,
  thorvald_meyers_gate_2 as Eiendom,
];

export function getEiendomssparEiendom(id: string): Eiendom | undefined {
  return eiendomssparEiendommer.find((e) => e.id === id);
}
