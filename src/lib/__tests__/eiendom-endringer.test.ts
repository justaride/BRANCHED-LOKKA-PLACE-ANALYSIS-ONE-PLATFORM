import {
  filterEndringerByDateRange,
  filterEndringerByType,
  groupEndringerByYear,
  loadEndringerForEiendom,
  loadEndringerForTenant,
} from "../eiendom-endringer";
import type { EiendomEndring } from "@/types/eiendom-endring";

const sample: EiendomEndring[] = [
  {
    id: "a",
    eiendom_id: "e1",
    dato: "2024-06-01",
    type: "innflytting",
    aktor_navn: "Aktør A",
  },
  {
    id: "b",
    eiendom_id: "e1",
    dato: "2023-01-15",
    type: "utflytting",
    aktor_navn: "Aktør B",
  },
  {
    id: "c",
    eiendom_id: "e1",
    dato: "2025-03-10",
    type: "kategoriendring",
    fra: "Handel",
    til: "Mat",
  },
];

describe("eiendom-endringer", () => {
  describe("loadEndringerForEiendom", () => {
    it("returns sorted by date desc for known tenant + eiendom", () => {
      const result = loadEndringerForEiendom("aspelin-reitan", "mathallen");
      expect(result.length).toBeGreaterThan(0);
      for (let i = 1; i < result.length; i++) {
        expect(result[i - 1].dato >= result[i].dato).toBe(true);
      }
    });

    it("returns empty array for unknown tenant", () => {
      expect(loadEndringerForEiendom("unknown-tenant", "e1")).toEqual([]);
    });

    it("returns empty array for unknown eiendom", () => {
      expect(loadEndringerForEiendom("aspelin-reitan", "no-such-eiendom")).toEqual([]);
    });
  });

  describe("loadEndringerForTenant", () => {
    it("flattens all eiendommer for tenant", () => {
      const all = loadEndringerForTenant("aspelin-reitan");
      expect(all.length).toBeGreaterThan(0);
      const eiendomIds = new Set(all.map((e) => e.eiendom_id));
      expect(eiendomIds.size).toBeGreaterThan(1);
    });
  });

  describe("filterEndringerByType", () => {
    it("returns all when types is empty", () => {
      expect(filterEndringerByType(sample, [])).toHaveLength(3);
    });

    it("filters to single type", () => {
      const result = filterEndringerByType(sample, ["innflytting"]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("a");
    });

    it("filters to multiple types", () => {
      const result = filterEndringerByType(sample, ["innflytting", "utflytting"]);
      expect(result).toHaveLength(2);
    });
  });

  describe("filterEndringerByDateRange", () => {
    it("filters by from date", () => {
      const result = filterEndringerByDateRange(sample, "2024-01-01");
      expect(result).toHaveLength(2);
    });

    it("filters by to date", () => {
      const result = filterEndringerByDateRange(sample, undefined, "2023-12-31");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("b");
    });

    it("filters by both bounds", () => {
      const result = filterEndringerByDateRange(sample, "2024-01-01", "2024-12-31");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("a");
    });
  });

  describe("groupEndringerByYear", () => {
    it("groups records by year, newest year first", () => {
      const result = groupEndringerByYear(sample);
      expect(result).toHaveLength(3);
      expect(result[0].year).toBe("2025");
      expect(result[1].year).toBe("2024");
      expect(result[2].year).toBe("2023");
    });
  });
});
