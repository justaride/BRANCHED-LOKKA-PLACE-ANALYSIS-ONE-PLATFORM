import hausmannsgate_19 from './hausmannsgate-19.json';
import thorvald_meyers_gate_46 from './thorvald-meyers-gate-46.json';
import thorvald_meyersgate_38 from './thorvald-meyersgate-38.json';
import trondheimsveien_80 from './trondheimsveien-80.json';
import type { Eiendom } from '@/types/eiendom';

export const mayaEiendomEiendommer: Eiendom[] = [
  hausmannsgate_19 as Eiendom,
  thorvald_meyers_gate_46 as Eiendom,
  thorvald_meyersgate_38 as Eiendom,
  trondheimsveien_80 as Eiendom,
];

export function getMayaEiendomEiendom(id: string): Eiendom | undefined {
  return mayaEiendomEiendommer.find((e) => e.id === id);
}
