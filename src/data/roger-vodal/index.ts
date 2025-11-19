import markveien_48 from './markveien-48.json';
import markveien_53 from './markveien-53.json';
import thorvald_meyersgate_44 from './thorvald-meyersgate-44.json';
import type { Eiendom } from '@/types/eiendom';

export const rogerVodalEiendommer: Eiendom[] = [
  markveien_48 as Eiendom,
  markveien_53 as Eiendom,
  thorvald_meyersgate_44 as Eiendom,
];

export function getRogerVodalEiendom(id: string): Eiendom | undefined {
  return rogerVodalEiendommer.find((e) => e.id === id);
}
