import thorvaldmeyers_gate_18 from './thorvaldmeyers-gate-18.json';
import thorvaldmeyers_gate_53 from './thorvaldmeyers-gate-53.json';
import thorvaldmeyers_gate_55 from './thorvaldmeyers-gate-55.json';
import type { Eiendom } from '@/types/eiendom';

export const brodreneEvensenEiendommer: Eiendom[] = [
  thorvaldmeyers_gate_18 as Eiendom,
  thorvaldmeyers_gate_53 as Eiendom,
  thorvaldmeyers_gate_55 as Eiendom,
];

export function getBrodreneEvensenEiendom(id: string): Eiendom | undefined {
  return brodreneEvensenEiendommer.find((e) => e.id === id);
}
