import banktransactions from "@/data/main-board/quarterly/banktransaksjoner-2019-2025.json";
import dailyTransactions from "@/data/main-board/quarterly/daily-transactions.json";
import analysis from "@/data/main-board/analyser/kvartalsrapport-banktransaksjoner.json";

type DailyTransaction = {
  date: string;
  handel: number;
  matOgOpplevelser: number;
  tjenester: number;
  total: number;
};

describe("quarterly bank transaction data", () => {
  it("includes the imported Q1 2026 quarter in the report period", () => {
    expect(banktransactions.metadata.period).toBe("2019-2026");
    expect(analysis.title).toContain("2019-2026");
    expect(analysis.period.endDate).toBe("2026-03-31");

    const importedQuarter = banktransactions.data.find(
      (row) => row.quarterLabel === "Q1 2026",
    );

    expect(importedQuarter).toMatchObject({
      year: 2026,
      quarter: 1,
      amount: 592008000,
      transactionCount: 90000,
      averageTransaction: 6578,
      note: "Parsed from CSV: 90 days",
    });
  });

  it("keeps Q1 2026 daily totals aligned with the quarterly amount", () => {
    const importedQuarter = banktransactions.data.find(
      (row) => row.quarterLabel === "Q1 2026",
    );
    const dailyRows = dailyTransactions.quarters.Q1_2026 as DailyTransaction[];

    expect(dailyRows).toHaveLength(90);
    expect(dailyRows[0].date).toBe("2026-01-01");
    expect(dailyRows.at(-1)?.date).toBe("2026-03-31");

    const dailyTotal = dailyRows.reduce((sum, row) => sum + row.total, 0);
    expect(dailyTotal).toBe(importedQuarter?.amount);

    for (const row of dailyRows) {
      expect(row.handel + row.matOgOpplevelser + row.tjenester).toBe(row.total);
    }
  });

  it("does not contain duplicate quarter labels", () => {
    const labels = banktransactions.data.map((row) => row.quarterLabel);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
