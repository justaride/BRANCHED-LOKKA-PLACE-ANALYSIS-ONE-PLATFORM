import fs from "fs";
import path from "path";

const DATA_DIR = path.join(
  process.cwd(),
  "public",
  "data",
  "main-board",
  "nedre-lokka-svarut",
);

function readJson<T>(fileName: string): T {
  const filePath = path.join(DATA_DIR, fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

describe("nedre-lokka-svarut dataset", () => {
  it("contains all expected generated files", () => {
    const requiredFiles = [
      "kpi-summary.json",
      "kravmatrise.json",
      "kryssverifisering.json",
      "konfidens.json",
      "metodikk.json",
      "verification-records.json",
      "mcp-chillout-snapshot.json",
    ];

    for (const file of requiredFiles) {
      expect(fs.existsSync(path.join(DATA_DIR, file))).toBe(true);
    }
  });

  it("keeps movement totals internally consistent", () => {
    const kpi = readJson<{
      quickStats: { dailyVisitors: number };
      dailyVisitorsByMicroArea: Array<{ dagligBesok: number; pctOfTotal: number }>;
      weekdayDistribution: { rows: Array<{ besokendePct: number }> };
    }>("kpi-summary.json");

    const microAreaTotal = kpi.dailyVisitorsByMicroArea.reduce(
      (sum, row) => sum + row.dagligBesok,
      0,
    );
    const microAreaPctTotal = kpi.dailyVisitorsByMicroArea.reduce(
      (sum, row) => sum + row.pctOfTotal,
      0,
    );
    const weekdayPctTotal = kpi.weekdayDistribution.rows.reduce(
      (sum, row) => sum + row.besokendePct,
      0,
    );

    expect(microAreaTotal).toBe(kpi.quickStats.dailyVisitors);
    expect(microAreaPctTotal).toBeCloseTo(100, 1);
    expect(Math.abs(weekdayPctTotal - 100)).toBeLessThanOrEqual(0.2);
  });

  it("keeps business totals and matrix statuses consistent", () => {
    const kpi = readJson<{
      businessSummary: {
        totalBusinesses: number;
        totalRevenueMNOK: number;
        categories: Array<{ count: number; revenueMNOK: number }>;
      };
    }>("kpi-summary.json");
    const matrix = readJson<
      Array<{ status: "dekket" | "delvis" | "mangler" }>
    >("kravmatrise.json");

    const businessCountSum = kpi.businessSummary.categories.reduce(
      (sum, row) => sum + row.count,
      0,
    );
    const businessRevenueSum = kpi.businessSummary.categories.reduce(
      (sum, row) => sum + row.revenueMNOK,
      0,
    );

    expect(businessCountSum).toBe(kpi.businessSummary.totalBusinesses);
    expect(
      Math.abs(businessRevenueSum - kpi.businessSummary.totalRevenueMNOK),
    ).toBeLessThanOrEqual(0.5);
    expect(matrix.length).toBeGreaterThan(0);
    expect(matrix.every((row) => ["dekket", "delvis", "mangler"].includes(row.status))).toBe(true);
  });

  it("keeps verification records aligned with matrix and kpi summary", () => {
    const matrix = readJson<Array<{ id: string }>>("kravmatrise.json");
    const verification = readJson<{
      coveragePct: number;
      statusCounts: { pass: number; warn: number; fail: number; unknown: number };
      records: Array<{
        requirementId: string;
        status: "pass" | "warn" | "fail" | "unknown";
        score: number;
      }>;
      orgResolution: Array<{ status: "resolved" | "ambiguous" | "unresolved" }>;
      limitations: string[];
    }>("verification-records.json");
    const kpi = readJson<{
      verification: {
        coveragePct: number;
        statusCounts: { pass: number; warn: number; fail: number; unknown: number };
        totalChecks: number;
      };
    }>("kpi-summary.json");

    const matrixIds = new Set(matrix.map((row) => row.id));
    const computedCounts = verification.records.reduce(
      (acc, row) => {
        acc[row.status] += 1;
        return acc;
      },
      { pass: 0, warn: 0, fail: 0, unknown: 0 },
    );
    const computedCoverage =
      verification.records.length > 0
        ? Number(
            (
              ((verification.records.length - computedCounts.unknown) /
                verification.records.length) *
              100
            ).toFixed(1),
          )
        : 0;

    expect(verification.records.length).toBe(matrix.length);
    expect(verification.records.every((row) => matrixIds.has(row.requirementId))).toBe(true);
    expect(verification.records.every((row) => row.score >= 0 && row.score <= 100)).toBe(true);
    expect(verification.statusCounts).toEqual(computedCounts);
    expect(verification.coveragePct).toBeCloseTo(computedCoverage, 1);
    expect(kpi.verification.totalChecks).toBe(verification.records.length);
    expect(kpi.verification.coveragePct).toBeCloseTo(verification.coveragePct, 1);
    expect(kpi.verification.statusCounts).toEqual(verification.statusCounts);
    expect(verification.orgResolution.length).toBeGreaterThan(0);
    expect(verification.limitations.length).toBeGreaterThan(0);
  });
});
