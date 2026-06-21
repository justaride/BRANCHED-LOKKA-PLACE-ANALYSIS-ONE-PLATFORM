import {
  analyseEventImpact,
  classifyDelta,
  computeEventImpactMetric,
  type DailyDataPoint,
} from "../event-impact";

function makeDaily(start: string, count: number, amount: number): DailyDataPoint[] {
  const out: DailyDataPoint[] = [];
  const d = new Date(start + "T00:00:00Z");
  for (let i = 0; i < count; i++) {
    const iso = d.toISOString().slice(0, 10);
    out.push({ date: iso, amount });
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

describe("event-impact", () => {
  describe("computeEventImpactMetric", () => {
    it("returns positive delta when event values exceed baseline", () => {
      const baseline = makeDaily("2025-01-01", 14, 1000);
      const eventDays = makeDaily("2025-01-15", 3, 1500);
      const post = makeDaily("2025-01-18", 7, 1100);
      const daily = [...baseline, ...eventDays, ...post];

      const result = computeEventImpactMetric(daily, {
        pre_start: "2025-01-01",
        pre_end: "2025-01-14",
        event_start: "2025-01-15",
        event_end: "2025-01-17",
        post_start: "2025-01-18",
        post_end: "2025-01-24",
      });

      expect(result).not.toBeNull();
      expect(result!.delta_event_pct).toBeCloseTo(50, 0);
      expect(result!.sample_size_baseline).toBe(14);
    });

    it("flags lav konfidens when baseline has under 5 days", () => {
      const daily = [
        ...makeDaily("2025-01-12", 3, 1000),
        ...makeDaily("2025-01-15", 1, 1500),
      ];

      const result = computeEventImpactMetric(daily, {
        pre_start: "2025-01-01",
        pre_end: "2025-01-14",
        event_start: "2025-01-15",
        event_end: "2025-01-15",
        post_start: "2025-01-16",
        post_end: "2025-01-22",
      });

      expect(result!.konfidens).toBe("lav");
    });

    it("returns null when event window has no data", () => {
      const result = computeEventImpactMetric(makeDaily("2025-01-01", 14, 1000), {
        pre_start: "2025-01-01",
        pre_end: "2025-01-14",
        event_start: "2025-01-15",
        event_end: "2025-01-17",
        post_start: "2025-01-18",
        post_end: "2025-01-24",
      });

      expect(result).toBeNull();
    });

    it("adjusts baseline by weekday when ukedag_justert=true", () => {
      // Bygg baseline der lørdager er 2x hverdager
      const daily: DailyDataPoint[] = [];
      const d = new Date("2025-01-01T00:00:00Z");
      for (let i = 0; i < 21; i++) {
        const iso = d.toISOString().slice(0, 10);
        const dow = d.getUTCDay();
        const amount = dow === 6 ? 2000 : 1000;
        daily.push({ date: iso, amount });
        d.setUTCDate(d.getUTCDate() + 1);
      }

      // Event på en lørdag: 2025-01-18 (sat)
      const result = computeEventImpactMetric(
        daily,
        {
          pre_start: "2025-01-04",
          pre_end: "2025-01-17",
          event_start: "2025-01-18",
          event_end: "2025-01-18",
          post_start: "2025-01-19",
          post_end: "2025-01-21",
        },
        { ukedag_justert: true },
      );

      // Forventet baseline = avg av lørdager i pre = 2000, ikke 1000-ish
      expect(result!.baseline).toBe(2000);
      expect(result!.delta_event_pct).toBeCloseTo(0, 0);
    });

    it("uses simple mean when ukedag_justert=false", () => {
      const daily: DailyDataPoint[] = [];
      const d = new Date("2025-01-01T00:00:00Z");
      for (let i = 0; i < 21; i++) {
        const iso = d.toISOString().slice(0, 10);
        const dow = d.getUTCDay();
        daily.push({ date: iso, amount: dow === 6 ? 2000 : 1000 });
        d.setUTCDate(d.getUTCDate() + 1);
      }

      const result = computeEventImpactMetric(
        daily,
        {
          pre_start: "2025-01-04",
          pre_end: "2025-01-17",
          event_start: "2025-01-18",
          event_end: "2025-01-18",
          post_start: "2025-01-19",
          post_end: "2025-01-21",
        },
        { ukedag_justert: false },
      );

      // Simpel snitt blir nær 1143 (2 lørdager * 2000 + 12 dager * 1000 = 16000 / 14)
      expect(result!.baseline).toBeLessThan(1300);
      expect(result!.baseline).toBeGreaterThan(1100);
    });
  });

  describe("analyseEventImpact", () => {
    it("computes window from event dates and runs both series", () => {
      const besok = makeDaily("2025-01-01", 30, 1000);
      besok[15].amount = 2000; // event-dag boost
      const omsetning = makeDaily("2025-01-01", 30, 50000);

      const result = analyseEventImpact(
        {
          id: "test-1",
          title: "Testfestival",
          date: "2025-01-16",
          endDate: "2025-01-16",
        },
        { besok, omsetning },
      );

      expect(result.event_navn).toBe("Testfestival");
      expect(result.window.pre_start).toBe("2025-01-02");
      expect(result.window.pre_end).toBe("2025-01-15");
      expect(result.besok).toBeDefined();
      expect(result.omsetning).toBeDefined();
      expect(result.flyt).toBeUndefined();
    });

    it("uses event.date as endDate when endDate missing", () => {
      const besok = makeDaily("2025-01-01", 30, 1000);
      const result = analyseEventImpact(
        { id: "x", title: "x", date: "2025-01-16" },
        { besok },
      );
      expect(result.window.event_end).toBe("2025-01-16");
    });
  });

  describe("classifyDelta", () => {
    it("classifies positive thresholds", () => {
      expect(classifyDelta(20)).toBe("sterk_positiv");
      expect(classifyDelta(10)).toBe("positiv");
      expect(classifyDelta(2)).toBe("noytral");
    });

    it("classifies negative thresholds", () => {
      expect(classifyDelta(-2)).toBe("noytral");
      expect(classifyDelta(-10)).toBe("negativ");
      expect(classifyDelta(-20)).toBe("sterk_negativ");
    });
  });
});
