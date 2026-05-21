export interface KorthandelWeekdaySeries {
  key: string;
  name: string;
  color: string;
}

export interface KorthandelWeekdayRow {
  dag: string;
  dagNorsk: string;
  [key: string]: string | number;
}

export interface NormalizedKorthandelWeekdayData {
  rows: KorthandelWeekdayRow[];
  series: KorthandelWeekdaySeries[];
  busiestDay: string;
  quietestDay: string;
}

const DAY_LABELS: Record<string, { short: string; full: string }> = {
  Monday: { short: "Man", full: "Mandag" },
  Tuesday: { short: "Tir", full: "Tirsdag" },
  Wednesday: { short: "Ons", full: "Onsdag" },
  Thursday: { short: "Tor", full: "Torsdag" },
  Friday: { short: "Fre", full: "Fredag" },
  Saturday: { short: "Lør", full: "Lørdag" },
  Sunday: { short: "Søn", full: "Søndag" },
  "man.": { short: "Man", full: "Mandag" },
  "tir.": { short: "Tir", full: "Tirsdag" },
  "ons.": { short: "Ons", full: "Onsdag" },
  "tor.": { short: "Tor", full: "Torsdag" },
  "fre.": { short: "Fre", full: "Fredag" },
  "lør.": { short: "Lør", full: "Lørdag" },
  "søn.": { short: "Søn", full: "Søndag" },
};

const SERIES_COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function normalizeMoneyToMillion(value: number): number {
  return Math.abs(value) > 20 ? Number((value / 1000).toFixed(3)) : value;
}

function getDayLabels(day: string) {
  return DAY_LABELS[day] ?? { short: day, full: day };
}

function createSeries(keys: string[]): KorthandelWeekdaySeries[] {
  return keys.map((key, index) => ({
    key,
    name: key === "sum" ? "Snitt" : key.replace("år", ""),
    color: SERIES_COLORS[index % SERIES_COLORS.length],
  }));
}

function getDayValue(row: KorthandelWeekdayRow, series: KorthandelWeekdaySeries[]) {
  const preferredSeries =
    series.find((item) => item.key === "år2024") ??
    series.find((item) => item.key === "år2023") ??
    series[series.length - 1];

  if (!preferredSeries) {
    return null;
  }

  const value = row[preferredSeries.key];
  return typeof value === "number" ? value : null;
}

function getExtremeDay(
  rows: KorthandelWeekdayRow[],
  series: KorthandelWeekdaySeries[],
  direction: "max" | "min",
) {
  const rankedRows = rows
    .map((row) => ({ row, value: getDayValue(row, series) }))
    .filter((item): item is { row: KorthandelWeekdayRow; value: number } => item.value !== null);

  if (rankedRows.length === 0) {
    return "";
  }

  const winner = rankedRows.reduce((selected, current) => {
    return direction === "max"
      ? current.value > selected.value ? current : selected
      : current.value < selected.value ? current : selected;
  });

  return getDayLabels(winner.row.dag).full;
}

function normalizeArrayRows(rows: unknown[]): Pick<NormalizedKorthandelWeekdayData, "rows" | "series"> {
  const normalizedRows: KorthandelWeekdayRow[] = [];
  const seriesKeys = new Set<string>();

  for (const item of rows) {
    if (!isRecord(item)) {
      continue;
    }

    const day = String(item.dag ?? item.ukedag ?? item.DateTime ?? "");
    if (!day) {
      continue;
    }

    const labels = getDayLabels(day);
    const row: KorthandelWeekdayRow = {
      dag: day,
      dagNorsk: labels.short,
    };
    let hasYearValue = false;

    for (const [key, value] of Object.entries(item)) {
      if (/^år\d{4}$/.test(key)) {
        const numberValue = toNumber(value);
        if (numberValue !== null) {
          row[key] = numberValue;
          seriesKeys.add(key);
          hasYearValue = true;
        }
      }
    }

    const sumValue = toNumber(item.sum);
    if (!hasYearValue && sumValue !== null) {
      row.sum = normalizeMoneyToMillion(sumValue);
      seriesKeys.add("sum");
    }

    normalizedRows.push(row);
  }

  return {
    rows: normalizedRows,
    series: createSeries([...seriesKeys]),
  };
}

function normalizeObjectRows(perUkedag: UnknownRecord): Pick<NormalizedKorthandelWeekdayData, "rows" | "series"> {
  const preferredYears = ["2023", "2024"];
  const rows: KorthandelWeekdayRow[] = [];
  const seriesKeys = new Set<string>();

  for (const [day, values] of Object.entries(perUkedag)) {
    if (!isRecord(values)) {
      continue;
    }

    const labels = getDayLabels(day);
    const row: KorthandelWeekdayRow = {
      dag: day,
      dagNorsk: labels.short,
    };

    for (const year of preferredYears) {
      const value = toNumber(values[year]);
      if (value !== null) {
        const key = `år${year}`;
        row[key] = value;
        seriesKeys.add(key);
      }
    }

    rows.push(row);
  }

  return {
    rows,
    series: createSeries([...seriesKeys]),
  };
}

export function normalizeKorthandelWeekdayData(data: unknown): NormalizedKorthandelWeekdayData {
  if (!isRecord(data)) {
    return {
      rows: [],
      series: [],
      busiestDay: "",
      quietestDay: "",
    };
  }

  const normalized = Array.isArray(data.korthandelPerUkedag)
    ? normalizeArrayRows(data.korthandelPerUkedag)
    : isRecord(data.perUkedag)
      ? normalizeObjectRows(data.perUkedag)
      : { rows: [], series: [] };

  return {
    ...normalized,
    busiestDay: getExtremeDay(normalized.rows, normalized.series, "max"),
    quietestDay: getExtremeDay(normalized.rows, normalized.series, "min"),
  };
}
