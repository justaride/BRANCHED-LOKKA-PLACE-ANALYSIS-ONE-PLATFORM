import { normalizeKorthandelWeekdayData } from "@/lib/utils/korthandel-weekday";

describe("normalizeKorthandelWeekdayData", () => {
  it("keeps modern 2023/2024 weekday rows renderable", () => {
    const normalized = normalizeKorthandelWeekdayData({
      korthandelPerUkedag: [
        { dag: "man.", år2023: 0.9, år2024: 0.85 },
        { dag: "lør.", år2023: 1.8, år2024: 1.7 },
      ],
    });

    expect(normalized.series.map((series) => series.key)).toEqual([
      "år2023",
      "år2024",
    ]);
    expect(normalized.rows[0]).toMatchObject({
      dagNorsk: "Man",
      år2023: 0.9,
      år2024: 0.85,
    });
    expect(normalized.busiestDay).toBe("Lørdag");
  });

  it("converts Mathallen legacy sum rows from thousand NOK to million NOK", () => {
    const normalized = normalizeKorthandelWeekdayData({
      korthandelPerUkedag: [
        { dag: "man.", sum: 180 },
        { dag: "lør.", sum: 280 },
        { dag: "søn.", sum: 140 },
      ],
    });

    expect(normalized.series).toEqual([
      { key: "sum", name: "Snitt", color: "#3b82f6" },
    ]);
    expect(normalized.rows).toEqual([
      expect.objectContaining({ dagNorsk: "Man", sum: 0.18 }),
      expect.objectContaining({ dagNorsk: "Lør", sum: 0.28 }),
      expect.objectContaining({ dagNorsk: "Søn", sum: 0.14 }),
    ]);
    expect(normalized.busiestDay).toBe("Lørdag");
    expect(normalized.quietestDay).toBe("Søndag");
  });

  it("normalizes legacy perUkedag objects to the visible 2023/2024 series", () => {
    const normalized = normalizeKorthandelWeekdayData({
      perUkedag: {
        Monday: { "2023": 1.312, "2024": 1.177, "2025": 1.135 },
        Saturday: { "2023": 2.609, "2024": 2.191, "2025": 1.925 },
      },
    });

    expect(normalized.series.map((series) => series.key)).toEqual([
      "år2023",
      "år2024",
    ]);
    expect(normalized.rows[0]).toMatchObject({
      dagNorsk: "Man",
      år2023: 1.312,
      år2024: 1.177,
    });
  });
});
