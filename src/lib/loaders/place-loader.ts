/**
 * Place Analysis Loader for Multi-Tenant Platform
 *
 * Loads place analysis data for Main Board analyser pages.
 * Adapted from original Main Board place-loader.ts
 */

import type { PlaceAnalysis } from '@/types/place-analysis';

const DATA_DIR_MAIN_BOARD = '/data/main-board/analyser';

/**
 * Load all analyses for Main Board
 */
export async function loadAllAnalyses(): Promise<PlaceAnalysis[]> {
  try {
    // Import all main board analysis files
    const analyses = await Promise.all([
      import('@/data/main-board/analyser/kvartalsrapport-banktransaksjoner.json').then(m => m.default as PlaceAnalysis),
      import('@/data/main-board/analyser/2024-arsrapport.json').then(m => m.default as PlaceAnalysis),
      import('@/data/main-board/analyser/demografi-2017-2023.json').then(m => m.default as PlaceAnalysis),
      import('@/data/main-board/analyser/sammenligning-2024.json').then(m => m.default as PlaceAnalysis),
    ]);

    // Sort by date (newest first)
    return analyses.sort((a, b) => {
      const dateA = new Date(a.period.startDate);
      const dateB = new Date(b.period.startDate);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error loading analyses:', error);
    return [];
  }
}

/**
 * Load a specific analysis by ID
 */
export async function loadAnalysis(id: string): Promise<PlaceAnalysis | null> {
  try {
    const data = await import(`@/data/main-board/analyser/${id}.json`);
    return data.default as PlaceAnalysis;
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
    'kvartalsrapport-banktransaksjoner',
    '2024-arsrapport',
    'demografi-2017-2023',
    'sammenligning-2024'
  ];
}

/**
 * Load analyses by type
 */
export async function loadAnalysesByType(
  type: PlaceAnalysis['analysisType']
): Promise<PlaceAnalysis[]> {
  const allAnalyses = await loadAllAnalyses();
  return allAnalyses.filter((analysis) => analysis.analysisType === type);
}

/**
 * Load analyses by year
 */
export async function loadAnalysesByYear(year: number): Promise<PlaceAnalysis[]> {
  const allAnalyses = await loadAllAnalyses();
  return allAnalyses.filter((analysis) => analysis.period.year === year);
}

/**
 * Get monthly analyses for a specific year
 */
export async function getMonthlyAnalyses(year: number): Promise<PlaceAnalysis[]> {
  const allAnalyses = await loadAnalysesByYear(year);
  return allAnalyses
    .filter((analysis) => analysis.analysisType === 'monthly')
    .sort((a, b) => (a.period.month || 0) - (b.period.month || 0));
}
