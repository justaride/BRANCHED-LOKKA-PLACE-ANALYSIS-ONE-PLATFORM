import brenneriveien_5 from './brenneriveien-5.json';
import brenneriveien_9 from './brenneriveien-9.json';
import korsgata_24 from './korsgata-24.json';
import markveien_28 from './markveien-28.json';
import markveien_51 from './markveien-51.json';
import markveien_54 from './markveien-54.json';
import markveien_55 from './markveien-55.json';
import markveien_56 from './markveien-56.json';
import markveien_57 from './markveien-57.json';
import markveien_60 from './markveien-60.json';
import olaf_ryes_plass_5 from './olaf-ryes-plass-5.json';
import seilduksgata_7 from './seilduksgata-7.json';
import sofienberggata_6 from './sofienberggata-6.json';
import stolmakergaten_19 from './stolmakergaten-19.json';
import thorvald_meyers_gate_25 from './thorvald-meyers-gate-25.json';
import thorvald_meyers_gate_26 from './thorvald-meyers-gate-26.json';
import thorvald_meyers_gate_27 from './thorvald-meyers-gate-27.json';
import thorvald_meyers_gate_42 from './thorvald-meyers-gate-42.json';
import thorvald_meyers_gate_56 from './thorvald-meyers-gate-56.json';
import thorvald_meyers_gate_72 from './thorvald-meyers-gate-72.json';
import thorvald_meyers_gate_76 from './thorvald-meyers-gate-76.json';
import thorvald_meyers_gate_79 from './thorvald-meyers-gate-79.json';
import type { Eiendom } from '@/types/eiendom';

export const spaboEiendommer: Eiendom[] = [
  brenneriveien_5 as Eiendom,
  brenneriveien_9 as Eiendom,
  korsgata_24 as Eiendom,
  markveien_28 as Eiendom,
  markveien_51 as Eiendom,
  markveien_54 as Eiendom,
  markveien_55 as Eiendom,
  markveien_56 as Eiendom,
  markveien_57 as Eiendom,
  markveien_60 as Eiendom,
  olaf_ryes_plass_5 as Eiendom,
  seilduksgata_7 as Eiendom,
  sofienberggata_6 as Eiendom,
  stolmakergaten_19 as Eiendom,
  thorvald_meyers_gate_25 as Eiendom,
  thorvald_meyers_gate_26 as Eiendom,
  thorvald_meyers_gate_27 as Eiendom,
  thorvald_meyers_gate_42 as Eiendom,
  thorvald_meyers_gate_56 as Eiendom,
  thorvald_meyers_gate_72 as Eiendom,
  thorvald_meyers_gate_76 as Eiendom,
  thorvald_meyers_gate_79 as Eiendom,
];

export function getSpaboEiendom(id: string): Eiendom | undefined {
  return spaboEiendommer.find((e) => e.id === id);
}
