import markveien_38 from './markveien-38.json';
import markveien_42 from './markveien-42.json';
import markveien_48 from './markveien-48.json';
import markveien_53 from './markveien-53.json';
import markveien_58 from './markveien-58.json';
import olaf_ryes_plass_3 from './olaf-ryes-plass-3.json';
import thorvald_meyersgate_33 from './thorvald-meyersgate-33.json';
import thorvald_meyersgate_40 from './thorvald-meyersgate-40.json';
import thorvald_meyersgate_44 from './thorvald-meyersgate-44.json';
import type { Eiendom } from '@/types/eiendom';

export const rogerVodalEiendommer: Eiendom[] = [
  olaf_ryes_plass_3 as Eiendom,
  thorvald_meyersgate_33 as Eiendom,
  thorvald_meyersgate_40 as Eiendom,
  thorvald_meyersgate_44 as Eiendom,
  markveien_38 as Eiendom,
  markveien_42 as Eiendom,
  markveien_48 as Eiendom,
  markveien_53 as Eiendom,
  markveien_58 as Eiendom,
];

export function getRogerVodalEiendom(id: string): Eiendom | undefined {
  return rogerVodalEiendommer.find((e) => e.id === id);
}
