import type { Eiendom } from '@/types/eiendom';

export interface PropertyMetrics {
  totalRevenue: number;
  totalActors: number;
  topCategory: string;
}

export function getPropertyMetrics(eiendom: Eiendom): PropertyMetrics {
  const totalRevenue =
    eiendom.naringsaktorer?.actors?.reduce(
      (sum, actor) => sum + (actor.omsetning || 0),
      0,
    ) || 0;

  const totalActors = eiendom.naringsaktorer?.metadata?.totalActors || 0;

  const topCategory = eiendom.naringsaktorer?.categoryStats
    ?
      Object.entries(eiendom.naringsaktorer.categoryStats).sort(
        (a, b) => b[1].count - a[1].count,
      )[0]?.[0] || ''
    : '';

  return {
    totalRevenue,
    totalActors,
    topCategory,
  };
}
