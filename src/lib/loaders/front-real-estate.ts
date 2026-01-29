import type { Eiendom } from "@/types/eiendom";
import { ensureEiendomDefaults } from "@/lib/utils/property-defaults";
import markveien35 from "@/data/front-real-estate/markveien-35.json";

const properties: Record<string, Record<string, unknown>> = {
  "markveien-35": markveien35,
};

export async function loadAllEiendommer(): Promise<Eiendom[]> {
  return Object.values(properties).map((p) =>
    ensureEiendomDefaults(p, "front-real-estate"),
  );
}

export async function loadEiendom(id: string): Promise<Eiendom | null> {
  const data = properties[id];
  if (!data) return null;
  return ensureEiendomDefaults(data, "front-real-estate");
}

export function getAllPropertyIds(): string[] {
  return Object.keys(properties);
}
