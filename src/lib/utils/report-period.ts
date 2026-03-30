type QuarterlyRecord = {
  quarter: string
  [key: string]: string | number
}

type HalfYearRecord = {
  period: string
  [key: string]: string | number
}

const Q1_Q2 = ['Q1', 'Q2', '1. kvartal', '2. kvartal'];
const Q3_Q4 = ['Q3', 'Q4', '3. kvartal', '4. kvartal'];

function isFirstHalf(label: string): boolean {
  return Q1_Q2.some(q => label.includes(q));
}

function isSecondHalf(label: string): boolean {
  return Q3_Q4.some(q => label.includes(q));
}

function extractYear(label: string): string {
  const match = label.match(/(\d{4})/);
  return match ? match[1] : '';
}

export function aggregateToHalfYear(data: QuarterlyRecord[], quarterKey: string, numericKeys: string[]): HalfYearRecord[] {
  const buckets = new Map<string, QuarterlyRecord[]>();

  for (const record of data) {
    const label = String(record[quarterKey]);
    const year = extractYear(label);
    if (!year) continue;

    let half: string | null = null;
    if (isFirstHalf(label)) half = `H1 ${year}`;
    else if (isSecondHalf(label)) half = `H2 ${year}`;
    else continue;

    const existing = buckets.get(half) || [];
    existing.push(record);
    buckets.set(half, existing);
  }

  const result: HalfYearRecord[] = [];

  for (const [period, records] of buckets) {
    const aggregated: HalfYearRecord = { period };
    for (const key of numericKeys) {
      const sum = records.reduce((acc, r) => acc + (typeof r[key] === 'number' ? r[key] as number : 0), 0);
      aggregated[key] = Math.round(sum / records.length);
    }
    result.push(aggregated);
  }

  return result.sort((a, b) => a.period.localeCompare(b.period));
}
