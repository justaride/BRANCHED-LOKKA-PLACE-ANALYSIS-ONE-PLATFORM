/**
 * Type definitions for 1-minute analysis data
 * Interactive data visualization for hyperlocal area analysis
 */

// ============================================================================
// DEMOGRAFI (Demographics)
// ============================================================================

export interface AgeCategory {
  category: string; // e.g., "0-5", "23-34", "85+"
  value: number; // Count of people
}

export interface IncomeCategory {
  category: string; // e.g., "NOK 400k - NOK 500k"
  value: number; // Percentage or count
}

export interface HouseholdType {
  type: string; // e.g., "Par uten hjemmeboende barn", "Aleneboende"
  value: number; // Count
}

export interface MedianIncomeByHousehold {
  type: string; // Household type
  median: number; // Median income in NOK
}

export interface DemografiData {
  aldersfordeling: {
    mann: AgeCategory[];
    kvinne: AgeCategory[];
  };
  inntektsfordeling: IncomeCategory[];
  husholdninger: HouseholdType[];
  nøkkeltall: {
    befolkning: number;
    befolkningstetthet: number; // Per km²
    områdestørrelse: number; // In km²
    vekst: number; // Percentage
    totalMann: number;
    totalKvinne: number;
  };
  medianInntektPerHusholdstype: MedianIncomeByHousehold[];
}

// ============================================================================
// KORTHANDEL (Card Transaction Timeseries)
// ============================================================================

export interface KorthandelDataPoint {
  date: string; // ISO date "YYYY-MM-DD"
  mat_opplevelser: number; // Food & experiences transactions
  handel: number; // Retail transactions
  tjenester: number; // Services transactions
}

export interface KorthandelData {
  tidsserie: KorthandelDataPoint[];
}

// ============================================================================
// BEVEGELSE (Movement/Traffic Patterns)
// ============================================================================

export interface BevegelsePerUkedag {
  dag: string; // "man.", "tir.", etc.
  besøkende: number;
  påJobb: number;
  hjemme: number;
}

export interface BevegelsePerTime {
  time: string; // "00:00", "13:00", etc.
  besøk: number;
}

export interface BevegelsesmønsterQuarterly {
  category: string; // "Q1'2023", "Q2'2024", etc.
  besøkende: number;
  påJobb: number;
  hjemme: number;
}

export interface OpprinnelseOmråde {
  område: string; // Neighborhood/district name
  prosent: number; // Percentage
}

export interface OpprinnelseLand {
  land: string; // Country name
  prosent: number; // Percentage
}

export interface BevegelseData {
  perUkedag: BevegelsePerUkedag[];
  perTime: BevegelsePerTime[];
  bevegelsesmønster: BevegelsesmønsterQuarterly[];
  nøkkeltall: {
    dagligBesøk: number;
    besøkPerKm2: number;
    travlesteDag: string;
    lørdagAndel: number; // Percentage
    periode: string; // e.g., "01.01.2023 - 30.09.2025"
  };
  opprinnelseOmråder: OpprinnelseOmråde[];
  opprinnelseLand: OpprinnelseLand[];
}

// ============================================================================
// KONKURRANSEBILDE (Competition Analysis)
// ============================================================================

export interface KonseptMiks {
  kategori1: string; // Main category
  kategori2: string; // Sub-category
  antall: number; // Count
}

export interface KjederVsUavhengige {
  year: string; // "2015", "2024", etc.
  uavhengig: number; // Percentage
  kjeder: number; // Percentage (chains)
}

export interface KonkurransebildeData {
  konseptmiks: KonseptMiks[];
  kjederVsUavhengige: KjederVsUavhengige[];
  nøkkeltall: {
    konseptTetthet: number; // Concepts per km²
    totalOmsetning: number; // In millions NOK
    omsetningTetthet: number; // Per km²
    trend: {
      konseptTetthet: number; // Percentage change
      omsetning: number; // Percentage change
    };
  };
}

// ============================================================================
// AKTØRER (Business Actors)
// ============================================================================

export interface Actor {
  rank: string; // "#1", "#2", etc.
  navn: string; // Business name
  type: string; // Category, e.g., "Handel / Mat og drikke"
  adresse: string; // Street address
  kommune: string; // Municipality
  omsetning: number; // Revenue in millions NOK
  kjedeProsent: string | null; // Percentage of chain revenue
  yoyVekst: number | null; // Year-over-year growth percentage (null if unknown)
  ansatteLokalt: number; // Local employees
  ansatteKjede: number; // Chain employees
  kjedeLokasjoner: number; // Number of chain locations
  markedsandel: number; // Market share percentage
}

export interface CategoryStats {
  count: number;
  totalRevenue: number;
  avgRevenue: number;
}

export interface AktorerData {
  actors: Actor[];
  categoryStats: Record<string, CategoryStats>;
  metadata: {
    totalActors: number;
    totalCategories: number;
    totalRevenue: number;
    generatedAt: string; // ISO date
    analysisType: string; // "1min-gange"
    areaSize: string; // e.g., "0.025 km²"
  };
}

// ============================================================================
// MAIN 1-MINUTE ANALYSIS TYPE
// ============================================================================

export interface OneMinAnalysisData {
  demografi: DemografiData | null; // Null for commercial properties without residents
  korthandel: KorthandelData;
  bevegelse: BevegelseData;
  konkurransebilde: KonkurransebildeData;
  aktorer: AktorerData;
}

// ============================================================================
// CHART CONFIGURATION TYPES
// ============================================================================

export interface ChartColors {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  // Gender-specific colors
  mann: string;
  kvinne: string;
  // Category colors
  matOpplevelser: string;
  handel: string;
  tjenester: string;
}

export interface ChartDimensions {
  width?: number | string;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
