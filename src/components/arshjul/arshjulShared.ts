/**
 * Delte konstanter og hjelpere for årshjul-visningene (hjul + agenda).
 * Holdt samlet slik at hjul, agenda og detaljpanel bruker samme farger/labels.
 */

import type { HjulKategori, HjulStatus } from "@/types/arshjul";

/**
 * Kategori-farger. Et par er knyttet til Natural State / Løkka brand-tokens:
 *  - styremote → natural.forest (#2C5F2D)
 *  - visit-lokka → lokka.accent (#F4A259)
 * Resten holdes distinkte for å skille 8 kategorier tydelig.
 */
export const KATEGORI_FARGE: Record<HjulKategori, string> = {
  "aktor-aktivitet": "#10b981",
  styremote: "#2C5F2D",
  "visit-lokka": "#F4A259",
  kampanje: "#a855f7",
  fou: "#ef4444",
  rapport: "#6b7280",
  workshop: "#06b6d4",
  annet: "#94a3b8",
};

export const KATEGORI_LABEL: Record<HjulKategori, string> = {
  "aktor-aktivitet": "Aktør-aktivitet",
  styremote: "Styremøte",
  "visit-lokka": "Visit Løkka",
  kampanje: "Kampanje",
  fou: "FoU",
  rapport: "Rapport",
  workshop: "Workshop",
  annet: "Annet",
};

/** Rekkefølge for filter-chips og tegnforklaring. */
export const KATEGORI_REKKEFOLGE: HjulKategori[] = [
  "styremote",
  "aktor-aktivitet",
  "visit-lokka",
  "kampanje",
  "workshop",
  "fou",
  "rapport",
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
