/**
 * Delte konstanter og hjelpere for årshjul-visningene (hjul + agenda).
 * Holdt samlet slik at hjul, agenda og detaljpanel bruker samme farger/labels.
 */

import type { HjulKategori, HjulStatus } from "@/types/arshjul";

/**
 * Kategori-farger for stedsaktivitet. Et par er knyttet til brand-tokens:
 *  - arrangement → natural.forest (#2C5F2D)
 *  - visit-lokka → lokka.accent (#F4A259)
 *  - kultur → natural.earth (#8B7355, samme som Biblioteket)
 * Resten holdes distinkte for å skille 8 kategorier tydelig.
 */
export const KATEGORI_FARGE: Record<HjulKategori, string> = {
  arrangement: "#2C5F2D",
  marked: "#CA8A04",
  kampanje: "#a855f7",
  "visit-lokka": "#F4A259",
  kultur: "#8B7355",
  sesong: "#DB2777",
  apning: "#10b981",
  annet: "#94a3b8",
};

export const KATEGORI_LABEL: Record<HjulKategori, string> = {
  arrangement: "Arrangement",
  marked: "Marked",
  kampanje: "Kampanje",
  "visit-lokka": "Visit Løkka",
  kultur: "Kultur",
  sesong: "Sesong & høytid",
  apning: "Åpning",
  annet: "Annet",
};

/** Rekkefølge for filter-chips og tegnforklaring. */
export const KATEGORI_REKKEFOLGE: HjulKategori[] = [
  "arrangement",
  "marked",
  "kampanje",
  "visit-lokka",
  "kultur",
  "sesong",
  "apning",
  "annet",
];

export const STATUS_LABEL: Record<HjulStatus, string> = {
  planlagt: "Planlagt",
  bekreftet: "Bekreftet",
  gjennomfort: "Gjennomført",
  avlyst: "Avlyst",
};

/** Opasitet per status — gir visuelt hierarki (bekreftet sterkest, avlyst svakest). */
export const STATUS_OPACITY: Record<HjulStatus, number> = {
  planlagt: 0.55,
  bekreftet: 1,
  gjennomfort: 0.75,
  avlyst: 0.3,
};

/** Rekkefølge for status-filter og tegnforklaring. */
export const STATUS_REKKEFOLGE: HjulStatus[] = [
  "planlagt",
  "bekreftet",
  "gjennomfort",
  "avlyst",
];

export const MAANEDER = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAI",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OKT",
  "NOV",
  "DES",
] as const;

/** Formaterer en dato eller et datospenn på norsk (UTC for stabil SSR/CSR). */
export function formatDateRange(start: string, slutt?: string): string {
  const s = new Date(start + "T00:00:00Z").toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  if (!slutt || slutt === start) return s;
  const e = new Date(slutt + "T00:00:00Z").toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  return `${s} – ${e}`;
}

/** Stabil kronologisk sortering på startdato (deretter tittel). */
export function sorterHendelser<T extends { start: string; tittel: string }>(
  hendelser: T[],
): T[] {
  return [...hendelser].sort(
    (a, b) => a.start.localeCompare(b.start) || a.tittel.localeCompare(b.tittel),
  );
}

/** Gjentakelse (RFC 5545 RRULE) — forhåndsvalg som dekker de vanlige tilfellene. */
export type GjentakelsePreset = "ukentlig" | "annenhver" | "manedlig" | "arlig";

export const GJENTAKELSE_OPSJONER: { value: GjentakelsePreset; label: string }[] = [
  { value: "ukentlig", label: "Ukentlig" },
  { value: "annenhver", label: "Annenhver uke" },
  { value: "manedlig", label: "Månedlig" },
  { value: "arlig", label: "Årlig" },
];

const GJENTAKELSE_FREQ: Record<GjentakelsePreset, string> = {
  ukentlig: "FREQ=WEEKLY",
  annenhver: "FREQ=WEEKLY;INTERVAL=2",
  manedlig: "FREQ=MONTHLY",
  arlig: "FREQ=YEARLY",
};

const GJENTAKELSE_LABEL: Record<GjentakelsePreset, string> = {
  ukentlig: "Ukentlig",
  annenhver: "Annenhver uke",
  manedlig: "Månedlig",
  arlig: "Årlig",
};

/** Bygg en RRULE-streng fra et forhåndsvalg (+ valgfri sluttdato YYYY-MM-DD). */
export function byggGjentakelse(
  preset: GjentakelsePreset,
  until?: string | null,
): string {
  const base = GJENTAKELSE_FREQ[preset];
  return until ? `${base};UNTIL=${until.replace(/-/g, "")}` : base;
}

/** Tolk en RRULE tilbake til forhåndsvalg + sluttdato (for redigering). */
export function lesGjentakelse(
  rrule?: string | null,
): { preset: GjentakelsePreset; until?: string } | null {
  if (!rrule) return null;
  let preset: GjentakelsePreset | null = null;
  if (/FREQ=WEEKLY/.test(rrule)) {
    preset = /INTERVAL=2/.test(rrule) ? "annenhver" : "ukentlig";
  } else if (/FREQ=MONTHLY/.test(rrule)) {
    preset = "manedlig";
  } else if (/FREQ=YEARLY/.test(rrule)) {
    preset = "arlig";
  }
  if (!preset) return null;
  const m = rrule.match(/UNTIL=(\d{4})(\d{2})(\d{2})/);
  return m ? { preset, until: `${m[1]}-${m[2]}-${m[3]}` } : { preset };
}

/** Kort etikett for gjentakelse (til badge), eller null. */
export function gjentakelseLabel(rrule?: string | null): string | null {
  const g = lesGjentakelse(rrule);
  return g ? GJENTAKELSE_LABEL[g.preset] : null;
}
