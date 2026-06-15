/**
 * Årshjul — sirkulær oversikt over hendelser gjennom året.
 */

export type HjulKategori =
  | "arrangement"
  | "marked"
  | "kampanje"
  | "visit-lokka"
  | "kultur"
  | "sesong"
  | "apning"
  | "annet";

export type HjulStatus = "planlagt" | "bekreftet" | "gjennomfort" | "avlyst";

export interface HjulHendelse {
  id: string;
  tittel: string;
  start: string; // ISO YYYY-MM-DD
  slutt?: string;
  kategori: HjulKategori;
  beskrivelse?: string;
  lenke?: string;
  ansvarlig?: string;
  status: HjulStatus;
  tenant?: string;
  /** RFC 5545 RRULE for gjentakelse, f.eks. "FREQ=WEEKLY". Udefinert = engangshendelse. */
  gjentakelse?: string;
}

export interface HjulAr {
  ar: number;
  hendelser: HjulHendelse[];
}
