import {
  buildKonseptPie,
  filterKorthandelMonthly,
  getTopItems,
} from "@/lib/analyser/nedre-lokka-utsnitt";

describe("nedre lokka utsnitt transforms", () => {
  it("returns the requested number of leading items without mutating the source", () => {
    const source = [{ id: 1 }, { id: 2 }, { id: 3 }];

    expect(getTopItems(source, 2)).toEqual([{ id: 1 }, { id: 2 }]);
    expect(source).toHaveLength(3);
  });

  it("groups konseptmiks by category and sums missing counts as zero", () => {
    const result = buildKonseptPie([
      { kategori: "Handel", antall: 2 },
      { kategori: "Servering", antall: 4 },
      { kategori: "Handel", antall: 3 },
      { kategori: "Tjenester" },
    ]);

    expect(result).toEqual([
      { kategori: "Handel", antall: 5 },
      { kategori: "Servering", antall: 4 },
      { kategori: "Tjenester", antall: 0 },
    ]);
  });

  it("filters monthly korthandel inclusively by month string", () => {
    const result = filterKorthandelMonthly(
      [
        { maaned: "2022-12", belop: 1 },
        { maaned: "2023-01", belop: 2 },
        { maaned: "2024-06", belop: 3 },
        { maaned: "2025-12", belop: 4 },
        { maaned: "2026-01", belop: 5 },
      ],
      "2023-01",
      "2025-12",
    );

    expect(result).toEqual([
      { maaned: "2023-01", belop: 2 },
      { maaned: "2024-06", belop: 3 },
      { maaned: "2025-12", belop: 4 },
    ]);
  });
});
