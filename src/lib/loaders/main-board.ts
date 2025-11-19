/**
 * Data Loaders for Main Board
 *
 * This file contains type-safe loader functions for all Main Board data files.
 * Each function corresponds to a JSON file in src/data/main-board/
 *
 * Usage:
 *   import { MainBoardLoaders } from '@/lib/loaders/main-board';
 *   const data = await MainBoardLoaders.loadArsrapport2024();
 */

// ============================================================================
// ANALYSER LOADERS
// ============================================================================

/**
 * Load kvartalsrapport banktransaksjoner data
 * Contains quarterly bank transaction analysis
 */
export async function loadKvartalsrapportBanktransaksjoner() {
  try {
    const data = await import('@/data/main-board/analyser/kvartalsrapport-banktransaksjoner.json');
    return data.default;
  } catch (error) {
    console.error('Error loading kvartalsrapport-banktransaksjoner:', error);
    throw new Error('Failed to load quarterly bank transaction report');
  }
}

/**
 * Load 2024 årsrapport data
 * Contains annual report for 2024
 */
export async function loadArsrapport2024() {
  try {
    const data = await import('@/data/main-board/analyser/2024-arsrapport.json');
    return data.default;
  } catch (error) {
    console.error('Error loading 2024-arsrapport:', error);
    throw new Error('Failed to load 2024 annual report');
  }
}

/**
 * Load demografi 2017-2023 (analyser version)
 * Contains demographic analysis data
 */
export async function loadAnalyserDemografi2017_2023() {
  try {
    const data = await import('@/data/main-board/analyser/demografi-2017-2023.json');
    return data.default;
  } catch (error) {
    console.error('Error loading analyser demografi-2017-2023:', error);
    throw new Error('Failed to load demographic analysis 2017-2023');
  }
}

/**
 * Load sammenligning 2024 data
 * Contains 2024 comparison analysis
 */
export async function loadSammenligning2024() {
  try {
    const data = await import('@/data/main-board/analyser/sammenligning-2024.json');
    return data.default;
  } catch (error) {
    console.error('Error loading sammenligning-2024:', error);
    throw new Error('Failed to load 2024 comparison data');
  }
}

// ============================================================================
// AKTØRER LOADERS
// ============================================================================

/**
 * Load aktører 2024 årsrapport
 * Contains stakeholder annual report for 2024
 */
export async function loadAktorerArsrapport2024() {
  try {
    const data = await import('@/data/main-board/aktorer/2024-arsrapport.json');
    return data.default;
  } catch (error) {
    console.error('Error loading aktorer 2024-arsrapport:', error);
    throw new Error('Failed to load stakeholders annual report 2024');
  }
}

/**
 * Load sammenligning combined data
 * Contains combined comparison data for all areas
 */
export async function loadSammenligningCombined() {
  try {
    const data = await import('@/data/main-board/aktorer/sammenligning-2024/combined.json');
    return data.default;
  } catch (error) {
    console.error('Error loading sammenligning combined:', error);
    throw new Error('Failed to load combined comparison data');
  }
}

/**
 * Load sammenligning Sentrum data
 * Contains comparison data for Oslo Sentrum
 */
export async function loadSammenliegningSentrum() {
  try {
    const data = await import('@/data/main-board/aktorer/sammenligning-2024/sentrum.json');
    return data.default;
  } catch (error) {
    console.error('Error loading sammenligning sentrum:', error);
    throw new Error('Failed to load Sentrum comparison data');
  }
}

/**
 * Load sammenligning Majorstuen data
 * Contains comparison data for Majorstuen
 */
export async function loadSammenligningMajorstuen() {
  try {
    const data = await import('@/data/main-board/aktorer/sammenligning-2024/majorstuen.json');
    return data.default;
  } catch (error) {
    console.error('Error loading sammenligning majorstuen:', error);
    throw new Error('Failed to load Majorstuen comparison data');
  }
}

/**
 * Load sammenligning Løkka data
 * Contains comparison data for Grünerløkka (Løkka)
 */
export async function loadSammenligningLokka() {
  try {
    const data = await import('@/data/main-board/aktorer/sammenligning-2024/lokka.json');
    return data.default;
  } catch (error) {
    console.error('Error loading sammenligning lokka:', error);
    throw new Error('Failed to load Løkka comparison data');
  }
}

/**
 * Load sammenligning Bjørvika data
 * Contains comparison data for Bjørvika
 */
export async function loadSammenligningBjorvika() {
  try {
    const data = await import('@/data/main-board/aktorer/sammenligning-2024/bjørvika.json');
    return data.default;
  } catch (error) {
    console.error('Error loading sammenligning bjørvika:', error);
    throw new Error('Failed to load Bjørvika comparison data');
  }
}

/**
 * Load all sammenligning area data
 * Convenience function to load all area comparisons at once
 */
export async function loadAllSammenligningAreas() {
  try {
    const [combined, sentrum, majorstuen, lokka, bjorvika] = await Promise.all([
      loadSammenligningCombined(),
      loadSammenliegningSentrum(),
      loadSammenligningMajorstuen(),
      loadSammenligningLokka(),
      loadSammenligningBjorvika(),
    ]);

    return {
      combined,
      sentrum,
      majorstuen,
      lokka,
      bjorvika,
    };
  } catch (error) {
    console.error('Error loading all sammenligning areas:', error);
    throw new Error('Failed to load all area comparison data');
  }
}

// ============================================================================
// DEMOGRAFI LOADERS
// ============================================================================

/**
 * Load demografi 2017-2023 (main demografi version)
 * Contains comprehensive demographic data
 */
export async function loadDemografi2017_2023() {
  try {
    const data = await import('@/data/main-board/demografi/demografi-2017-2023.json');
    return data.default;
  } catch (error) {
    console.error('Error loading demografi-2017-2023:', error);
    throw new Error('Failed to load demographic data 2017-2023');
  }
}

// ============================================================================
// QUARTERLY LOADERS
// ============================================================================

/**
 * Load daily transactions data
 * Contains daily transaction data for quarterly analysis
 */
export async function loadDailyTransactions() {
  try {
    const data = await import('@/data/main-board/quarterly/daily-transactions.json');
    return data.default;
  } catch (error) {
    console.error('Error loading daily-transactions:', error);
    throw new Error('Failed to load daily transactions data');
  }
}

/**
 * Load banktransaksjoner 2019-2025
 * Contains bank transaction data from 2019 to 2025
 */
export async function loadBanktransaksjoner2019_2025() {
  try {
    const data = await import('@/data/main-board/quarterly/banktransaksjoner-2019-2025.json');
    return data.default;
  } catch (error) {
    console.error('Error loading banktransaksjoner-2019-2025:', error);
    throw new Error('Failed to load bank transactions 2019-2025');
  }
}

// ============================================================================
// GRAPHS LOADERS
// ============================================================================

/**
 * Load graphs registry
 * Contains registry/metadata for all graphs
 */
export async function loadGraphsRegistry() {
  try {
    const data = await import('@/data/main-board/graphs/registry.json');
    return data.default;
  } catch (error) {
    console.error('Error loading graphs registry:', error);
    throw new Error('Failed to load graphs registry');
  }
}

// ============================================================================
// BATCH LOADERS
// ============================================================================

/**
 * Load all analyser data at once
 * Useful for pages that need multiple analysis datasets
 */
export async function loadAllAnalyserData() {
  try {
    const [kvartalsrapport, arsrapport, demografi, sammenligning] = await Promise.all([
      loadKvartalsrapportBanktransaksjoner(),
      loadArsrapport2024(),
      loadAnalyserDemografi2017_2023(),
      loadSammenligning2024(),
    ]);

    return {
      kvartalsrapport,
      arsrapport,
      demografi,
      sammenligning,
    };
  } catch (error) {
    console.error('Error loading all analyser data:', error);
    throw new Error('Failed to load all analysis data');
  }
}

/**
 * Load all aktører data at once
 * Useful for comprehensive stakeholder analysis pages
 */
export async function loadAllAktorerData() {
  try {
    const [arsrapport, areas] = await Promise.all([
      loadAktorerArsrapport2024(),
      loadAllSammenligningAreas(),
    ]);

    return {
      arsrapport,
      areas,
    };
  } catch (error) {
    console.error('Error loading all aktorer data:', error);
    throw new Error('Failed to load all stakeholder data');
  }
}

/**
 * Load all quarterly data at once
 * Useful for quarterly analysis pages
 */
export async function loadAllQuarterlyData() {
  try {
    const [dailyTransactions, bankTransactions] = await Promise.all([
      loadDailyTransactions(),
      loadBanktransaksjoner2019_2025(),
    ]);

    return {
      dailyTransactions,
      bankTransactions,
    };
  } catch (error) {
    console.error('Error loading all quarterly data:', error);
    throw new Error('Failed to load all quarterly data');
  }
}

/**
 * Load ALL Main Board data
 * WARNING: This loads everything. Use sparingly and only when truly needed.
 * Consider using specific loaders or batch loaders for better performance.
 */
export async function loadAllMainBoardData() {
  try {
    const [analyser, aktorer, demografi, quarterly, graphs] = await Promise.all([
      loadAllAnalyserData(),
      loadAllAktorerData(),
      loadDemografi2017_2023(),
      loadAllQuarterlyData(),
      loadGraphsRegistry(),
    ]);

    return {
      analyser,
      aktorer,
      demografi,
      quarterly,
      graphs,
    };
  } catch (error) {
    console.error('Error loading all Main Board data:', error);
    throw new Error('Failed to load all Main Board data');
  }
}

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * All Main Board data loaders exported as a single object
 * for easy importing and namespace organization
 */
export const MainBoardLoaders = {
  // Analyser
  loadKvartalsrapportBanktransaksjoner,
  loadArsrapport2024,
  loadAnalyserDemografi2017_2023,
  loadSammenligning2024,

  // Aktører
  loadAktorerArsrapport2024,
  loadSammenligningCombined,
  loadSammenliegningSentrum,
  loadSammenligningMajorstuen,
  loadSammenligningLokka,
  loadSammenligningBjorvika,
  loadAllSammenligningAreas,

  // Demografi
  loadDemografi2017_2023,

  // Quarterly
  loadDailyTransactions,
  loadBanktransaksjoner2019_2025,

  // Graphs
  loadGraphsRegistry,

  // Batch loaders
  loadAllAnalyserData,
  loadAllAktorerData,
  loadAllQuarterlyData,
  loadAllMainBoardData,
};

/**
 * Type helper to get the return type of any loader
 * Usage: type ArsrapportData = LoaderReturnType<typeof loadArsrapport2024>;
 */
export type LoaderReturnType<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>;

// ============================================================================
// EXPORTS
// ============================================================================

// Export all individual loaders
export {
  // (Already exported above)
};

// Default export
export default MainBoardLoaders;
