export interface KonseptmiksItem {
  kategori: string;
  antall?: number;
}

export interface KonseptPieItem {
  kategori: string;
  antall: number;
}

export interface KorthandelMonthlyItem {
  maaned: string;
  [key: string]: unknown;
}

export function getTopItems<T>(items: readonly T[], count: number): T[] {
  return items.slice(0, count);
}

export function buildKonseptPie(items: readonly KonseptmiksItem[]): KonseptPieItem[] {
  return items.reduce<KonseptPieItem[]>((acc, item) => {
    const existing = acc.find((entry) => entry.kategori === item.kategori);
    if (existing) {
      existing.antall += item.antall || 0;
    } else {
      acc.push({ kategori: item.kategori, antall: item.antall || 0 });
    }
    return acc;
  }, []);
}

export function filterKorthandelMonthly<T extends KorthandelMonthlyItem>(
  items: readonly T[],
  startMonth: string,
  endMonth: string,
): T[] {
  return items.filter(
    (item) => item.maaned >= startMonth && item.maaned <= endMonth,
  );
}
