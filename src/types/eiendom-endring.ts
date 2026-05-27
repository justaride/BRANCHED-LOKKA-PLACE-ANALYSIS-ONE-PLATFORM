/**
 * Endringslogg per eiendom — strukturerte hendelser som kan filtreres og visualiseres.
 */

export type EndringType =
  | "innflytting"
  | "utflytting"
  | "navnebytte"
  | "kategoriendring"
  | "bruksendring"
  | "oppussing"
  | "notat";

export type EndringKilde = "brreg" | "manuell" | "gardeier" | "plaace";

export interface EiendomEndring {
  id: string;
  eiendom_id: string;
  dato: string; // ISO YYYY-MM-DD
  dato_til?: string; // for perioder
  type: EndringType;
  aktor_id?: string;
  aktor_navn?: string;
  fra?: string;
  til?: string;
  notat?: string;
  registrert_av?: string;
  registrert_dato?: string;
  kilde?: EndringKilde;
}

export type EndringerByEiendom = Record<string, EiendomEndring[]>;
