import type { Eiendom } from "@/types/eiendom";
import { ensureEiendomDefaults } from "@/lib/utils/property-defaults";
import { getTenantPropertyIds } from '@/config/tenant-data-manifest';
import olafRyesPlass4 from "@/data/carucel/olaf-ryes-plass-4.json";

const properties: Record<string, Record<string, unknown>> = {
  "olaf-ryes-plass-4": olafRyesPlass4,
};

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  return Object.values(properties).map((p) =>
    ensureEiendomDefaults(p, "carucel"),
  );
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  const data = properties[id];
  if (!data) return null;
  return ensureEiendomDefaults(data, "carucel");
}

export function getAllPropertyIds(): string[] {
  return getTenantPropertyIds('carucel');
}
