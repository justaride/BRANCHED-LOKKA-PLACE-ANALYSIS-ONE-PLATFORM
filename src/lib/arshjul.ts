/**
 * Loader og geometri for årshjul-visning.
 */

import type { HjulAr, HjulHendelse } from "@/types/arshjul";

import data2026 from "@/data/main-board/arshjul-2026.json";

const HJUL_BY_AR: Record<number, HjulAr> = {
  2026: data2026 as HjulAr,
};

export function loadArshjul(ar: number): HjulAr | null {
  return HJUL_BY_AR[ar] ?? null;
}

export function getAvailableArshjulYears(): number[] {
  return Object.keys(HJUL_BY_AR).map(Number).sort((a, b) => b - a);
}

/**
 * Beregn dag-nummer i året (1–366) for en ISO-dato.
 */
export function dayOfYear(iso: string): number {
  const d = new Date(iso + "T00:00:00Z");
  const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.floor((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Antall dager i året (365 / 366).
 */
export function daysInYear(year: number): number {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
}

/**
 * Konverter en hendelses startdato til (vinkel, x, y) på en sirkel.
 * Januar 1. = topp (12 o'clock).
 */
export function hendelseTilPunkt(
  hendelse: HjulHendelse,
  cx: number,
  cy: number,
  radius: number,
  year: number,
): { x: number; y: number; vinkel: number } {
  const dag = dayOfYear(hendelse.start);
  const total = daysInYear(year);
  const vinkel = (dag / total) * 2 * Math.PI - Math.PI / 2;
  return {
    vinkel,
    x: cx + radius * Math.cos(vinkel),
    y: cy + radius * Math.sin(vinkel),
  };
}

/**
 * Beregn radius-offset for kollisjonshåndtering.
 * Hendelser på samme dag plottes på konsentriske ringer.
 */
export function tildelRadiusOffset(
  hendelser: HjulHendelse[],
  baseRadius: number,
  step: number,
): Map<string, number> {
  const byDate = new Map<string, HjulHendelse[]>();
  for (const h of hendelser) {
    const list = byDate.get(h.start) ?? [];
    list.push(h);
    byDate.set(h.start, list);
  }
  const out = new Map<string, number>();
  for (const [, list] of byDate) {
    list.forEach((h, idx) => {
      out.set(h.id, baseRadius - idx * step);
    });
  }
  return out;
}
