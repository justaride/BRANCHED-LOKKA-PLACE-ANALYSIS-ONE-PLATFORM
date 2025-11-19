/**
 * Data Loaders for {COMPANY_NAME}
 *
 * This file contains type-safe loader functions for {COMPANY_NAME} data files.
 * Each function corresponds to a JSON file in src/data/companies/{company-slug}/
 *
 * Usage:
 *   import { {CompanyName}Loaders } from '@/lib/loaders/{company-slug}';
 *   const data = await {CompanyName}Loaders.loadProperties();
 *
 * INSTRUCTIONS:
 * 1. Copy this file to: src/lib/loaders/{company-slug}.ts
 * 2. Replace all {COMPANY_NAME} with actual company name (e.g., "Aspelin Ramm")
 * 3. Replace all {CompanyName} with PascalCase version (e.g., "AspelinRamm")
 * 4. Replace all {company-slug} with kebab-case slug (e.g., "aspelin-ramm")
 * 5. Add/remove loader functions based on your data files
 * 6. Update type imports if you have custom types
 * 7. Delete this instruction block
 */

// ============================================================================
// TYPE IMPORTS (Optional - add if you have custom types)
// ============================================================================

// Uncomment and update if you have custom types for this company:
// import type { Property, PropertyData, AnalysisReport } from '@/types/{company-slug}';

// ============================================================================
// PROPERTIES LOADER
// ============================================================================

/**
 * Load properties data for {COMPANY_NAME}
 * Contains all properties in the company's portfolio
 */
export async function loadProperties() {
  try {
    const data = await import('@/data/companies/{company-slug}/properties.json');
    return data.default;
  } catch (error) {
    console.error('Error loading {COMPANY_NAME} properties:', error);
    throw new Error('Failed to load {COMPANY_NAME} properties');
  }
}

// ============================================================================
// ANALYSIS LOADER
// ============================================================================

/**
 * Load analysis report for {COMPANY_NAME}
 * Contains comprehensive analysis data
 */
export async function loadAnalysisReport() {
  try {
    const data = await import('@/data/companies/{company-slug}/analysis/analysis-report.json');
    return data.default;
  } catch (error) {
    console.error('Error loading {COMPANY_NAME} analysis report:', error);
    throw new Error('Failed to load {COMPANY_NAME} analysis report');
  }
}

// ============================================================================
// QUARTERLY DATA LOADER (Optional - add if company has quarterly data)
// ============================================================================

/**
 * Load quarterly data for {COMPANY_NAME}
 * Contains quarterly performance metrics
 */
export async function loadQuarterlyData() {
  try {
    const data = await import('@/data/companies/{company-slug}/quarterly/quarterly-data.json');
    return data.default;
  } catch (error) {
    console.error('Error loading {COMPANY_NAME} quarterly data:', error);
    throw new Error('Failed to load {COMPANY_NAME} quarterly data');
  }
}

// ============================================================================
// DEMOGRAPHIC DATA LOADER (Optional - add if company has demographic data)
// ============================================================================

/**
 * Load demographic data for {COMPANY_NAME}
 * Contains area demographic information
 */
export async function loadDemographicData() {
  try {
    const data = await import('@/data/companies/{company-slug}/demografi/demographic-data.json');
    return data.default;
  } catch (error) {
    console.error('Error loading {COMPANY_NAME} demographic data:', error);
    throw new Error('Failed to load {COMPANY_NAME} demographic data');
  }
}

// ============================================================================
// MEDIA DATA LOADER (Optional - add if company has media data)
// ============================================================================

/**
 * Load media data for {COMPANY_NAME}
 * Contains media references, images, and documents
 */
export async function loadMediaData() {
  try {
    const data = await import('@/data/companies/{company-slug}/media/media-data.json');
    return data.default;
  } catch (error) {
    console.error('Error loading {COMPANY_NAME} media data:', error);
    throw new Error('Failed to load {COMPANY_NAME} media data');
  }
}

// ============================================================================
// CUSTOM LOADERS (Add company-specific loaders as needed)
// ============================================================================

/**
 * Example: Load custom data specific to this company
 * Rename and modify based on actual data files
 */
export async function loadCustomData() {
  try {
    const data = await import('@/data/companies/{company-slug}/custom/custom-data.json');
    return data.default;
  } catch (error) {
    console.error('Error loading {COMPANY_NAME} custom data:', error);
    throw new Error('Failed to load {COMPANY_NAME} custom data');
  }
}

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * All {COMPANY_NAME} data loaders exported as a single object
 * for easy importing and namespace organization
 *
 * Usage:
 *   import { {CompanyName}Loaders } from '@/lib/loaders/{company-slug}';
 *   const properties = await {CompanyName}Loaders.loadProperties();
 */
export const {CompanyName}Loaders = {
  loadProperties,
  loadAnalysisReport,
  loadQuarterlyData,
  loadDemographicData,
  loadMediaData,
  loadCustomData,
};

/**
 * Type helper to get the return type of any loader
 * Usage: type PropertyData = LoaderReturnType<typeof loadProperties>;
 */
export type LoaderReturnType<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>;

// ============================================================================
// BATCH LOADERS
// ============================================================================

/**
 * Load all essential data at once
 * Includes properties and analysis report
 */
export async function loadEssentialData() {
  try {
    const [properties, analysisReport] = await Promise.all([
      loadProperties(),
      loadAnalysisReport(),
    ]);

    return {
      properties,
      analysisReport,
    };
  } catch (error) {
    console.error('Error loading {COMPANY_NAME} essential data:', error);
    throw new Error('Failed to load {COMPANY_NAME} essential data');
  }
}

/**
 * Load ALL company data
 * WARNING: This loads everything. Use sparingly and only when truly needed.
 * Consider using specific loaders or batch loaders for better performance.
 */
export async function loadAllCompanyData() {
  try {
    const [
      properties,
      analysisReport,
      quarterlyData,
      demographicData,
      mediaData,
    ] = await Promise.all([
      loadProperties(),
      loadAnalysisReport(),
      loadQuarterlyData(),
      loadDemographicData(),
      loadMediaData(),
    ]);

    return {
      properties,
      analysisReport,
      quarterlyData,
      demographicData,
      mediaData,
    };
  } catch (error) {
    console.error('Error loading all {COMPANY_NAME} data:', error);
    throw new Error('Failed to load all {COMPANY_NAME} data');
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Default export
export default {CompanyName}Loaders;

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * EXAMPLE 1: Loading in a page component
 *
 * // src/app/[company]/eiendommer/page.tsx
 * import { {CompanyName}Loaders } from '@/lib/loaders/{company-slug}';
 *
 * export default async function EiendommerPage() {
 *   const properties = await {CompanyName}Loaders.loadProperties();
 *
 *   return (
 *     <div>
 *       {properties.map(property => (
 *         <PropertyCard key={property.id} property={property} />
 *       ))}
 *     </div>
 *   );
 * }
 */

/**
 * EXAMPLE 2: Dynamic loading based on company slug
 *
 * // src/app/[company]/eiendommer/page.tsx
 * async function loadCompanyProperties(companySlug: string) {
 *   const loaders = await import(`@/lib/loaders/${companySlug}`);
 *   return loaders.loadProperties();
 * }
 *
 * export default async function EiendommerPage({
 *   params
 * }: {
 *   params: { company: string }
 * }) {
 *   const properties = await loadCompanyProperties(params.company);
 *   // ...
 * }
 */

/**
 * EXAMPLE 3: Loading multiple datasets
 *
 * import { {CompanyName}Loaders } from '@/lib/loaders/{company-slug}';
 *
 * export default async function AnalysisPage() {
 *   const data = await {CompanyName}Loaders.loadAllCompanyData();
 *
 *   return (
 *     <div>
 *       <PropertySection properties={data.properties} />
 *       <AnalysisSection report={data.analysisReport} />
 *       <QuarterlySection data={data.quarterlyData} />
 *     </div>
 *   );
 * }
 */

/**
 * EXAMPLE 4: Error handling
 *
 * import { {CompanyName}Loaders } from '@/lib/loaders/{company-slug}';
 *
 * export default async function PropertiesPage() {
 *   try {
 *     const properties = await {CompanyName}Loaders.loadProperties();
 *     return <PropertyList properties={properties} />;
 *   } catch (error) {
 *     return (
 *       <div className="error">
 *         <h2>Failed to load properties</h2>
 *         <p>{error.message}</p>
 *       </div>
 *     );
 *   }
 * }
 */

// ============================================================================
// CHECKLIST FOR IMPLEMENTATION
// ============================================================================

/**
 * Before using this loader file, complete these steps:
 *
 * [ ] 1. Copy to correct location: src/lib/loaders/{company-slug}.ts
 * [ ] 2. Replace all {COMPANY_NAME} placeholders
 * [ ] 3. Replace all {CompanyName} placeholders
 * [ ] 4. Replace all {company-slug} placeholders
 * [ ] 5. Add/remove loaders based on actual data files
 * [ ] 6. Update type imports if custom types exist
 * [ ] 7. Test each loader function works
 * [ ] 8. Update batch loaders to match available data
 * [ ] 9. Delete this checklist block
 * [ ] 10. Delete instruction comments
 * [ ] 11. Run TypeScript check: npx tsc --noEmit
 * [ ] 12. Test in actual page component
 *
 * After implementation:
 * [ ] Add to git: git add src/lib/loaders/{company-slug}.ts
 * [ ] Commit: git commit -m "Add data loaders for {COMPANY_NAME}"
 */
