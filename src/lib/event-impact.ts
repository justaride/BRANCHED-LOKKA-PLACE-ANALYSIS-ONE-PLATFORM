/**
 * Event Impact Analysis
 *
 * Beregner Δ besøk / Δ omsetning / Δ flyt for et arrangement
 * basert på pre/event/post-vinduer med valgfri ukedag-justering.
 */

import type { Event } from "@/types/events";

export type DailyDataPoint = { date: string; amount: number };

export type EventImpactWindow = {
  pre_start: string;
  pre_end: string;
  event_start: string;
  event_end: string;
  post_start: string;
  post_end: string;
};

export type EventImpactMetric = {
  baseline: number;
  event: number;
  post: number;
  delta_event_abs: number;
  delta_event_pct: number;
  delta_post_abs: number;
  delta_post_pct: number;
  sample_size_baseline: number;
  konfidens: "høy" | "middels" | "lav";
};

export type EventImpactAnalysis = {
  event_id: string;
  event_navn: string;
  event_dato: string;
  event_slutt: string;
  window: EventImpactWindow;
  besok?: EventImpactMetric;
  omsetning?: EventImpactMetric;
  flyt?: EventImpactMetric;
};

type ImpactOptions = {
  baseline_dager?: number;
  post_dager?: number;
  ukedag_justert?: boolean;
};

const DEFAULTS: Required<ImpactOptions> = {
  baseline_dager: 14,
  post_dager: 7,
  ukedag_justert: true,
};

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function parseISO(s: string): Date {
  // Tvinger UTC for å unngå tidssone-drift
  return new Date(s + "T00:00:00Z");
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setUTCDate(r.getUTCDate() + n);
  return r;
}

function datesInRange(start: Date, end: Date): string[] {
  const out: string[] = [];
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
    out.push(toISO(d));
  }
  return out;
}

function dayOfWeek(iso: string): number {
  return parseISO(iso).getUTCDay(); // 0=Sun..6=Sat
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function pct(after: number, before: number): number {
  if (before === 0) return 0;
  return ((after - before) / before) * 100;
}

function computeKonfidens(
  baseline_n: number,
  event_n: number,
  baseline_values: number[],
): "høy" | "middels" | "lav" {
  if (baseline_n < 5 || event_n === 0) return "lav";
  if (baseline_values.length < 2) return "middels";
  const m = mean(baseline_values);
  if (m === 0) return "lav";
  const variance =
    baseline_values.reduce((s, v) => s + (v - m) ** 2, 0) /
    baseline_values.length;
  const cv = Math.sqrt(variance) / m;
  if (baseline_n >= 10 && cv < 0.4) return "høy";
  if (baseline_n >= 7 && cv < 0.6) return "middels";
  return "lav";
}

function buildWindow(
  event_start: string,
  event_end: string,
  baseline_dager: number,
  post_dager: number,
): EventImpactWindow {
  const eStart = parseISO(event_start);
  const eEnd = parseISO(event_end);
  const preEnd = addDays(eStart, -1);
  const preStart = addDays(preEnd, -(baseline_dager - 1));
  const postStart = addDays(eEnd, 1);
  const postEnd = addDays(postStart, post_dager - 1);
  return {
    pre_start: toISO(preStart),
    pre_end: toISO(preEnd),
    event_start: toISO(eStart),
    event_end: toISO(eEnd),
    post_start: toISO(postStart),
    post_end: toISO(postEnd),
  };
}

/**
 * Beregn metrikk for én dataserie (besøk eller omsetning) for ett arrangement.
 * Returnerer null hvis ingen overlappende data finnes.
 */
export function computeEventImpactMetric(
  daily: DailyDataPoint[],
  window: EventImpactWindow,
  opts: ImpactOptions = {},
): EventImpactMetric | null {
  const ukedag_justert = opts.ukedag_justert ?? DEFAULTS.ukedag_justert;

  const map = new Map(daily.map((d) => [d.date, d.amount]));
  const preDates = datesInRange(parseISO(window.pre_start), parseISO(window.pre_end));
  const eventDates = datesInRange(
    parseISO(window.event_start),
    parseISO(window.event_end),
  );
  const postDates = datesInRange(
    parseISO(window.post_start),
    parseISO(window.post_end),
  );

  const preWithData = preDates
    .map((d) => ({ date: d, dow: dayOfWeek(d), v: map.get(d) }))
    .filter((x): x is { date: string; dow: number; v: number } => x.v !== undefined);

  const eventWithData = eventDates
    .map((d) => ({ date: d, dow: dayOfWeek(d), v: map.get(d) }))
    .filter((x): x is { date: string; dow: number; v: number } => x.v !== undefined);

  const postWithData = postDates
    .map((d) => ({ date: d, dow: dayOfWeek(d), v: map.get(d) }))
    .filter((x): x is { date: string; dow: number; v: number } => x.v !== undefined);

  if (preWithData.length === 0 || eventWithData.length === 0) return null;

  let baseline: number;
  let eventVal: number;
  let postVal: number;
  let baselineComparisonValues: number[];

  if (ukedag_justert) {
    // Bygg avg per ukedag fra baseline
    const byDow = new Map<number, number[]>();
    for (const p of preWithData) {
      const arr = byDow.get(p.dow) ?? [];
      arr.push(p.v);
      byDow.set(p.dow, arr);
    }
    const avgByDow = new Map<number, number>();
    for (const [dow, vals] of byDow) avgByDow.set(dow, mean(vals));

    // Fallback for ukedag uten data: overall mean
    const overallMean = mean(preWithData.map((p) => p.v));
    const expectedFor = (dow: number) => avgByDow.get(dow) ?? overallMean;

    // Baseline-tallet vi viser = vektet snitt av forventede verdier for event-dagene
    baseline = mean(eventWithData.map((e) => expectedFor(e.dow)));
    eventVal = mean(eventWithData.map((e) => e.v));
    postVal =
      postWithData.length > 0
        ? mean(postWithData.map((p) => p.v))
        : 0;
    baselineComparisonValues = preWithData.map((p) => p.v);
  } else {
    baseline = mean(preWithData.map((p) => p.v));
    eventVal = mean(eventWithData.map((e) => e.v));
    postVal = postWithData.length > 0 ? mean(postWithData.map((p) => p.v)) : 0;
    baselineComparisonValues = preWithData.map((p) => p.v);
  }

  const post_baseline =
    postWithData.length > 0 && ukedag_justert
      ? mean(
          postWithData.map((p) => {
            const byDow = new Map<number, number[]>();
            for (const pp of preWithData) {
              const arr = byDow.get(pp.dow) ?? [];
              arr.push(pp.v);
              byDow.set(pp.dow, arr);
            }
            const avg = mean((byDow.get(p.dow) ?? []).length > 0 ? byDow.get(p.dow)! : preWithData.map((x) => x.v));
            return avg;
          }),
        )
      : baseline;

  return {
    baseline: Math.round(baseline),
    event: Math.round(eventVal),
    post: Math.round(postVal),
    delta_event_abs: Math.round(eventVal - baseline),
    delta_event_pct: Number(pct(eventVal, baseline).toFixed(1)),
    delta_post_abs: Math.round(postVal - post_baseline),
    delta_post_pct:
      postWithData.length > 0 ? Number(pct(postVal, post_baseline).toFixed(1)) : 0,
    sample_size_baseline: preWithData.length,
    konfidens: computeKonfidens(
      preWithData.length,
      eventWithData.length,
      baselineComparisonValues,
    ),
  };
}

/**
 * Full impact-analyse for ett arrangement med flere dataserier.
 */
export function analyseEventImpact(
  event: Pick<Event, "id" | "title" | "date" | "endDate">,
  data: {
    besok?: DailyDataPoint[];
    omsetning?: DailyDataPoint[];
    flyt?: DailyDataPoint[];
  },
  opts: ImpactOptions = {},
): EventImpactAnalysis {
  const baseline_dager = opts.baseline_dager ?? DEFAULTS.baseline_dager;
  const post_dager = opts.post_dager ?? DEFAULTS.post_dager;
  const event_end = event.endDate ?? event.date;
  const window = buildWindow(event.date, event_end, baseline_dager, post_dager);

  return {
    event_id: event.id,
    event_navn: event.title,
    event_dato: event.date,
    event_slutt: event_end,
    window,
    besok: data.besok
      ? computeEventImpactMetric(data.besok, window, opts) ?? undefined
      : undefined,
    omsetning: data.omsetning
      ? computeEventImpactMetric(data.omsetning, window, opts) ?? undefined
      : undefined,
    flyt: data.flyt
      ? computeEventImpactMetric(data.flyt, window, opts) ?? undefined
      : undefined,
  };
}

/**
 * Analyser flere arrangementer i batch.
 */
export function analyseEventImpacts(
  events: Pick<Event, "id" | "title" | "date" | "endDate">[],
  data: {
    besok?: DailyDataPoint[];
    omsetning?: DailyDataPoint[];
    flyt?: DailyDataPoint[];
  },
  opts: ImpactOptions = {},
): EventImpactAnalysis[] {
  return events.map((e) => analyseEventImpact(e, data, opts));
}

/**
 * Klassifisér delta_pct for fargekoding i UI.
 */
export function classifyDelta(
  pct: number,
): "sterk_positiv" | "positiv" | "noytral" | "negativ" | "sterk_negativ" {
  if (pct >= 15) return "sterk_positiv";
  if (pct >= 5) return "positiv";
  if (pct > -5) return "noytral";
  if (pct > -15) return "negativ";
  return "sterk_negativ";
}
