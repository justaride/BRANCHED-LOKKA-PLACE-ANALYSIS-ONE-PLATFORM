/**
 * Place Analysis Loader for Multi-Tenant Platform
 *
 * Loads place analysis data for Main Board analyser pages.
 * Adapted from original Main Board place-loader.ts
 */

import type { PlaceAnalysis } from "@/types/place-analysis";

/**
 * Load all analyses for Main Board
 */
export async function loadAllAnalyses(): Promise<PlaceAnalysis[]> {
  try {
    const analysisImports: Array<{
      id: string;
      load: () => Promise<PlaceAnalysis>;
    }> = [
      {
        id: "kvartalsrapport-banktransaksjoner",
        load: () =>
          import("@/data/main-board/analyser/kvartalsrapport-banktransaksjoner.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "2025-arsrapport",
        load: () =>
          import("@/data/main-board/analyser/2025-arsrapport.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "2024-arsrapport",
        load: () =>
          import("@/data/main-board/analyser/2024-arsrapport.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "demografi-2017-2023",
        load: () =>
          import("@/data/main-board/analyser/demografi-2017-2023.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "nedre-lokka-omradeprofil",
        load: () =>
          import("@/data/main-board/analyser/nedre-lokka-omradeprofil.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "nedre-lokka-svarut",
        load: () =>
          import("@/data/main-board/analyser/nedre-lokka-svarut.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "ovre-thorvald-meyers-gate",
        load: () =>
          import("@/data/main-board/analyser/ovre-thorvald-meyers-gate.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "nedre-thorvald-meyers-gate",
        load: () =>
          import("@/data/main-board/analyser/nedre-thorvald-meyers-gate.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "midt-i-markveien",
        load: () =>
          import("@/data/main-board/analyser/midt-i-markveien.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "olaf-ryes-plass-boots",
        load: () =>
          import("@/data/main-board/analyser/olaf-ryes-plass-boots.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
      {
        id: "nederst-i-markveien",
        load: () =>
          import("@/data/main-board/analyser/nederst-i-markveien.json").then(
            (m) => m.default as unknown as PlaceAnalysis,
          ),
      },
    ];

    const results = await Promise.allSettled(
      analysisImports.map((item) => item.load()),
    );

    const analyses = results.flatMap((result, index) => {
      if (result.status === "fulfilled") {
        return [result.value];
      }

      console.warn(
        `Skipping analysis ${analysisImports[index]?.id} due to load error:`,
        result.reason,
      );
      return [];
    });

    // Sort by date (newest first)
    return analyses.sort((a, b) => {
      const dateA = new Date(a.period.startDate);
      const dateB = new Date(b.period.startDate);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error loading analyses:", error);
    return [];
  }
}

/**
 * Load a specific analysis by ID
 */
export async function loadAnalysis(id: string): Promise<PlaceAnalysis | null> {
  try {
    const data = await import(`@/data/main-board/analyser/${id}.json`);
    return data.default as unknown as PlaceAnalysis;
  } catch (error) {
    console.error(`Error loading analysis ${id}:`, error);
    return null;
  }
}

/**
 * Get all analysis IDs for static generation
 */
export async function getAllAnalysisIds(): Promise<string[]> {
  return [
    "kvartalsrapport-banktransaksjoner",
    "2025-arsrapport",
    "2024-arsrapport",
    "demografi-2017-2023",
    "nedre-lokka-omradeprofil",
    "nedre-lokka-svarut",
    "ovre-thorvald-meyers-gate",
    "nedre-thorvald-meyers-gate",
    "midt-i-markveien",
    "olaf-ryes-plass-boots",
    "nederst-i-markveien",
  ];
}

/**
 * Load analyses by type
 */
export async function loadAnalysesByType(
  type: PlaceAnalysis["analysisType"],
): Promise<PlaceAnalysis[]> {
  const allAnalyses = await loadAllAnalyses();
  return allAnalyses.filter((analysis) => analysis.analysisType === type);
}

/**
 * Load analyses by year
 */
export async function loadAnalysesByYear(
  year: number,
): Promise<PlaceAnalysis[]> {
  const allAnalyses = await loadAllAnalyses();
  return allAnalyses.filter((analysis) => analysis.period.year === year);
}

/**
 * Get monthly analyses for a specific year
 */
export async function getMonthlyAnalyses(
  year: number,
): Promise<PlaceAnalysis[]> {
  const allAnalyses = await loadAnalysesByYear(year);
  return allAnalyses
    .filter((analysis) => analysis.analysisType === "monthly")
    .sort((a, b) => (a.period.month || 0) - (b.period.month || 0));
}
