import {
  createNamedNumberTooltipFormatter,
  createNumberTooltipFormatter,
  toRechartsNumber,
} from "@/lib/utils/recharts";

describe("recharts utilities", () => {
  describe("toRechartsNumber", () => {
    it("normalizes numeric tooltip values", () => {
      expect(toRechartsNumber(42)).toBe(42);
      expect(toRechartsNumber("42.5")).toBe(42.5);
      expect(toRechartsNumber([12, 13])).toBe(12);
    });

    it("falls back to the first numeric value in a tooltip value range", () => {
      expect(toRechartsNumber(["not-a-number", 11])).toBe(11);
    });

    it("returns 0 for missing or invalid values", () => {
      expect(toRechartsNumber(undefined)).toBe(0);
      expect(toRechartsNumber("not-a-number")).toBe(0);
    });
  });

  it("creates tooltip formatters that receive normalized numbers", () => {
    const formatter = createNumberTooltipFormatter((value) => `${value} kr`);

    expect(formatter("12")).toBe("12 kr");
  });

  it("creates named tooltip formatters that receive normalized numbers and names", () => {
    const formatter = createNamedNumberTooltipFormatter((value, name) => [
      value,
      name,
    ]);

    expect(formatter("7", "Omsetning")).toEqual([7, "Omsetning"]);
  });
});
