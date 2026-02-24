/**
 * Type definitions for 1-minute analysis data
 * Interactive data visualization for hyperlocal area analysis
 *
 * Structure: 6 main sections + Actors list
 * 1. DEMOGRAFI - Demographics of the area
 * 2. KONKURRANSEBILDET - Competition analysis
 * 3. KORTHANDEL - Card transactions
 * 4. BEVEGELSE - Movement/traffic patterns
 * 5. BESØKENDE - Visitor demographics
 * 6. INTERNASJONALT - International visitors
 * + AKTØRER - Business actors list (expandable)
 */

// ============================================================================
// SHARED TYPES
// ============================================================================

export interface AgeCategory {
  kategori: string; // e.g., "0-5", "23-34", "85+"
  antall: number; // Count of people
}

export interface IncomeCategory {
  kategori: string; // e.g., "NOK 400k - NOK 500k"
  antall: number; // Count
}

export interface HouseholdType {
  type: string; // e.g., "Par uten hjemmeboende barn", "Aleneboende"
  antall: number; // Count
}

export interface MedianIncomeByHousehold {
  type: string; // Household type
  median: number; // Median income in NOK
}

// ============================================================================
// 1. DEMOGRAFI (Demographics of the area)
// ============================================================================

export interface DemografiOverTid {
  år: string;
  befolkning: number;
  trend: number;
}

export interface DemografiData {
  nøkkeltall: {
    befolkning: number;
    befolkningstetthet: number; // Per km²
    områdestørrelse: number; // In km²
    vekst: number; // Percentage
  };
  aldersfordeling: {
    mann: AgeCategory[];
    kvinne: AgeCategory[];
  };
  inntektsfordeling: IncomeCategory[];
  husholdninger: HouseholdType[];
  medianInntektPerHusholdningstype: MedianIncomeByHousehold[];
  demografiOverTid: DemografiOverTid[];
}

// ============================================================================
// 2. KONKURRANSEBILDET (Competition Analysis)
// ============================================================================

export interface KonseptMiks {
  kategori1: string; // Main category: "Mat og opplevelser", "Handel", "Tjenester"
  kategori2: string; // Sub-category
  antall: number; // Count
}

export interface KjederVsUavhengige {
  år: string; // "2015", "2024", etc.
  uavhengig: number; // Percentage
  kjeder: number; // Percentage (chains)
}

export interface OverUnderandel {
  matOpplevelser: number; // Percentage vs kommune
  handel: number;
  tjenester: number;
}

export interface UtviklingPerÅr {
  år: string;
  matOpplevelser: number; // Revenue in millions
  handel: number;
  tjenester: number;
}

export interface KonkurransebildeData {
  nøkkeltall: {
    konseptTetthet: number; // Concepts per km²
    totalOmsetning: number; // In millions NOK
    omsetningTetthet: number; // Per km²
    trend: {
      konseptTetthet: number; // Percentage change
      omsetning: number; // Percentage change
    };
  };
  konseptmiks: KonseptMiks[];
  kjederVsUavhengige: KjederVsUavhengige[];
  overUnderandel: OverUnderandel;
  utviklingPerÅr: UtviklingPerÅr[];
}

// ============================================================================
// 3. KORTHANDEL (Card Transaction Timeseries)
// ============================================================================

export interface KorthandelDataPoint {
  date: string; // ISO date "YYYY-MM-DD"
  mat_opplevelser: number; // Food & experiences transactions
  handel: number; // Retail transactions
  tjenester: number; // Services transactions
}

export interface ÅrligVekst {
  år: string;
  område: number; // Percentage
  oslo: number;
  norge: number;
}

export interface KorthandelPerUkedag {
  dag: string; // "Monday", "Tuesday", etc.
  år2023: number;
  år2024: number;
}

export interface KorthandelData {
  nøkkeltall: {
    dagligKorthandel: number; // Mill NOK
    totalKorthandel: number; // Mrd NOK
    beløpPerTransaksjon: number; // NOK
    endring30d: number; // Percentage
  };
  tidsserie: KorthandelDataPoint[];
  årligVekst: ÅrligVekst[];
  indeksertVekst: ÅrligVekst[]; // Same structure, but index=100 base
  korthandelPerUkedag: KorthandelPerUkedag[];
}

// ============================================================================
// 4. BEVEGELSE (Movement/Traffic Patterns)
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

export interface Bevegelsesmønster {
  kategori: string; // "2023", "2024", or quarterly "Q1'2023"
  besøkende: number;
  påJobb: number;
  hjemme: number;
}

export interface BevegelseData {
  nøkkeltall: {
    dagligBesøk: number;
    besøkPerKm2: number;
    travlesteDag: string;
    lørdagAndel: number; // Percentage
    periode: string; // e.g., "01.01.2023 - 30.09.2025"
  };
  perTime: BevegelsePerTime[];
  perUkedag: BevegelsePerUkedag[];
  bevegelsesmønster: Bevegelsesmønster[];
}

// ============================================================================
// 5. BESØKENDE (Visitor Demographics) - NEW
// ============================================================================

export interface OmrådeBesøkendeKommerFra {
  område: string; // Neighborhood/district name
  prosent: number; // Percentage
}

export interface BesøkendeData {
  periode: string; // e.g., "31.12.2023 - 30.12.2024"
  aldersfordeling: {
    mann: AgeCategory[];
    kvinne: AgeCategory[];
  };
  husholdningstyper: HouseholdType[];
  inntektsfordeling: IncomeCategory[];
  medianInntektPerHusholdningstype: MedianIncomeByHousehold[];
  områderBesøkendeKommerFra: OmrådeBesøkendeKommerFra[];
}

// ============================================================================
// 6. INTERNASJONALT BESØKENDE (International Visitors) - NEW
// ============================================================================

export interface LandBesøkende {
  land: string; // Country name
  prosent: number; // Percentage
}

export interface InternasjonaltData {
  periode: string; // e.g., "2024, Q4"
  toppLand: LandBesøkende[];
}

// ============================================================================
// AKTØRER (Business Actors) - Expandable list
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
  antall: number; // Norwegian: count
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
    areaSize: string; // e.g., "0.46 km²"
  };
}

// ============================================================================
// MAIN 1-MINUTE ANALYSIS TYPE
// ============================================================================

export interface OneMinAnalysisData {
  demografi: DemografiData | null;
  konkurransebilde: KonkurransebildeData | null;
  korthandel: KorthandelData;
  bevegelse: BevegelseData;
  besokende: BesøkendeData | null;
  internasjonalt: InternasjonaltData | null;
  aktorer: AktorerData | null;
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

// ============================================================================
// SECTION AVAILABILITY FLAGS
// ============================================================================

export interface DataAvailability {
  demografi: boolean;
  konkurransebilde: boolean;
  korthandel: boolean;
  bevegelse: boolean;
  besokende: boolean;
  internasjonalt: boolean;
  aktorer: boolean;
}
