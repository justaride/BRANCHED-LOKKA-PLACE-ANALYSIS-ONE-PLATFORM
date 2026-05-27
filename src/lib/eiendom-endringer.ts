/**
 * Loader og hjelpefunksjoner for eiendom-endringslogg.
 *
 * Statisk import per tenant (samme mønster som andre loadere).
 * Returnerer null hvis tenant ikke har endringer-data ennå.
 */

import type {
  EiendomEndring,
  EndringerByEiendom,
  EndringType,
} from "@/types/eiendom-endring";

import aspelinRamm from "@/data/aspelin-ramm/endringer.json";

const TENANT_DATA: Record<string, EndringerByEiendom> = {
  "aspelin-reitan": aspelinRamm as EndringerByEiendom,
};

/**
 * Hent alle endringer for én eiendom, sortert nyeste først.
 */
export function loadEndringerForEiendom(
  tenant: string,
  eiendom_id: string,
): EiendomEndring[] {
  const tenantData = TENANT_DATA[tenant];
  if (!tenantData) return [];
  const records = tenantData[eiendom_id] ?? [];
  return [...records].sort((a, b) => b.dato.localeCompare(a.dato));
}

/**
 * Hent alle endringer for en tenant, flatpakket.
 */
export function loadEndringerForTenant(tenant: string): EiendomEndring[] {
  const tenantData = TENANT_DATA[tenant];
  if (!tenantData) return [];
  return Object.values(tenantData)
    .flat()
    .sort((a, b) => b.dato.localeCompare(a.dato));
}

/**
 * Filtrér endringer på type.
 */
export function filterEndringerByType(
  endringer: EiendomEndring[],
  types: EndringType[],
): EiendomEndring[] {
  if (types.length === 0) return endringer;
  const set = new Set(types);
  return endringer.filter((e) => set.has(e.type));
}

/**
 * Filtrér endringer på tidsrom.
 */
export function filterEndringerByDateRange(
  endringer: EiendomEndring[],
  from?: string,
  to?: string,
): EiendomEndring[] {
  return endringer.filter((e) => {
    if (from && e.dato < from) return false;
    if (to && e.dato > to) return false;
    return true;
  });
}

/**
 * Grupper endringer per år for tidslinje-visning.
 */
export function groupEndringerByYear(
  endringer: EiendomEndring[],
): Array<{ year: string; items: EiendomEndring[] }> {
  const byYear = new Map<string, EiendomEndring[]>();
  for (const e of endringer) {
    const year = e.dato.slice(0, 4);
    const arr = byYear.get(year) ?? [];
    arr.push(e);
    byYear.set(year, arr);
  }
  return Array.from(byYear.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, items]) => ({ year, items }));
}
