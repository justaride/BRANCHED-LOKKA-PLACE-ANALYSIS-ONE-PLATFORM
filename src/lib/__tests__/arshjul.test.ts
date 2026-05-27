import {
  dayOfYear,
  daysInYear,
  hendelseTilPunkt,
  loadArshjul,
  tildelRadiusOffset,
} from "../arshjul";
import type { HjulHendelse } from "@/types/arshjul";

describe("arshjul", () => {
  describe("dayOfYear", () => {
    it("returns 1 for January 1", () => {
      expect(dayOfYear("2026-01-01")).toBe(1);
    });
    it("returns 366 for December 31 in leap year", () => {
      expect(dayOfYear("2024-12-31")).toBe(366);
    });
    it("returns 365 for December 31 in non-leap year", () => {
      expect(dayOfYear("2026-12-31")).toBe(365);
    });
  });

  describe("daysInYear", () => {
    it("returns 365 for normal year", () => {
      expect(daysInYear(2026)).toBe(365);
    });
    it("returns 366 for leap year", () => {
      expect(daysInYear(2024)).toBe(366);
    });
    it("returns 365 for century-non-leap year", () => {
      expect(daysInYear(1900)).toBe(365);
    });
    it("returns 366 for century leap year", () => {
      expect(daysInYear(2000)).toBe(366);
    });
  });

  describe("hendelseTilPunkt", () => {
    it("places Jan 1 at top of circle", () => {
      const h: HjulHendelse = {
        id: "x",
        tittel: "x",
        start: "2026-01-01",
        kategori: "annet",
        status: "planlagt",
      };
      const p = hendelseTilPunkt(h, 100, 100, 50, 2026);
      // Jan 1 = day 1 of 365, near top so y < cy
      expect(p.y).toBeLessThan(100);
      expect(Math.abs(p.x - 100)).toBeLessThan(5);
    });

    it("places July 1 near bottom of circle", () => {
      const h: HjulHendelse = {
        id: "y",
        tittel: "y",
        start: "2026-07-02",
        kategori: "annet",
        status: "planlagt",
      };
      const p = hendelseTilPunkt(h, 100, 100, 50, 2026);
      expect(p.y).toBeGreaterThan(100);
    });
  });

  describe("tildelRadiusOffset", () => {
    it("assigns same radius when dates differ", () => {
      const hendelser: HjulHendelse[] = [
        { id: "a", tittel: "a", start: "2026-01-01", kategori: "annet", status: "planlagt" },
        { id: "b", tittel: "b", start: "2026-02-01", kategori: "annet", status: "planlagt" },
      ];
      const offsets = tildelRadiusOffset(hendelser, 200, 10);
      expect(offsets.get("a")).toBe(200);
      expect(offsets.get("b")).toBe(200);
    });

    it("steps radius for collisions on same date", () => {
      const hendelser: HjulHendelse[] = [
        { id: "a", tittel: "a", start: "2026-06-01", kategori: "annet", status: "planlagt" },
        { id: "b", tittel: "b", start: "2026-06-01", kategori: "annet", status: "planlagt" },
        { id: "c", tittel: "c", start: "2026-06-01", kategori: "annet", status: "planlagt" },
      ];
      const offsets = tildelRadiusOffset(hendelser, 200, 10);
      expect(offsets.get("a")).toBe(200);
      expect(offsets.get("b")).toBe(190);
      expect(offsets.get("c")).toBe(180);
    });
  });

  describe("loadArshjul", () => {
    it("loads 2026 data", () => {
      const data = loadArshjul(2026);
      expect(data).not.toBeNull();
      expect(data!.ar).toBe(2026);
      expect(data!.hendelser.length).toBeGreaterThan(10);
    });

    it("returns null for unknown year", () => {
      expect(loadArshjul(1999)).toBeNull();
    });
  });
});
