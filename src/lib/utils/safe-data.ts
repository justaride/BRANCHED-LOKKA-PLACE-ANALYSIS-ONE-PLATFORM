/**
 * Safe Data Utilities
 * Prevents silent failures from null/undefined values in data
 */

/**
 * Safely get a numeric value, returning default if null/undefined/NaN
 */
export function safeNumber(value: unknown, defaultValue: number = 0): number {
  if (value === null || value === undefined) return defaultValue;
  const num = typeof value === "number" ? value : parseFloat(String(value));
  return isNaN(num) ? defaultValue : num;
}

/**
 * Safely get a string value, returning default if null/undefined
 */
export function safeString(value: unknown, defaultValue: string = ""): string {
  if (value === null || value === undefined) return defaultValue;
  return String(value);
}

/**
 * Filter out records with critical null values for chart rendering
 */
export function filterValidRecords<T extends Record<string, unknown>>(
  data: T[],
  requiredFields: (keyof T)[],
): T[] {
  return data.filter((record) => {
    return requiredFields.every((field) => {
      const value = record[field];
      return value !== null && value !== undefined;
    });
  });
}

/**
 * Sanitize numeric fields in data array, replacing null/undefined with defaults
 */
export function sanitizeNumericFields<T extends Record<string, unknown>>(
  data: T[],
  numericFields: (keyof T)[],
  defaultValue: number = 0,
): T[] {
  return data.map((record) => {
    const sanitized = { ...record };
    numericFields.forEach((field) => {
      const value = sanitized[field];
      if (
        value === null ||
        value === undefined ||
        (typeof value === "number" && isNaN(value))
      ) {
        (sanitized as Record<string, unknown>)[field as string] = defaultValue;
      }
    });
    return sanitized;
  });
}

/**
 * Deep sanitize object, replacing all null values with defaults
 */
export function deepSanitize<T>(
  obj: T,
  defaults: { number: number; string: string; boolean: boolean } = {
    number: 0,
    string: "",
    boolean: false,
  },
): T {
  if (obj === null || obj === undefined) {
    return defaults.number as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepSanitize(item, defaults)) as T;
  }

  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (value === null || value === undefined) {
        result[key] = defaults.number;
      } else if (typeof value === "object") {
        result[key] = deepSanitize(value, defaults);
      } else {
        result[key] = value;
      }
    }
    return result as T;
  }

  return obj;
}

/**
 * Create a safe tooltip formatter that handles null values
 */
export function createSafeFormatter(
  format: (value: number) => string = (v) => v.toFixed(2),
  nullText: string = "N/A",
): (value: unknown) => string {
  return (value: unknown) => {
    if (value === null || value === undefined) return nullText;
    const num = typeof value === "number" ? value : parseFloat(String(value));
    if (isNaN(num)) return nullText;
    return format(num);
  };
}

/**
 * Validate property data structure
 */
export interface PropertyDataDefaults {
  name: string;
  address: string;
  tenant: string;
}

export function ensurePropertyDefaults<T extends Partial<PropertyDataDefaults>>(
  data: T,
  defaults: PropertyDataDefaults,
): T & PropertyDataDefaults {
  return {
    ...data,
    name: data.name || defaults.name,
    address: data.address || defaults.address,
    tenant: data.tenant || defaults.tenant,
  };
}

/**
 * Safe JSON fetch with error handling
 */
export async function safeFetch<T>(
  url: string,
  defaultValue: T,
): Promise<{ data: T; error: string | null }> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { data: defaultValue, error: `HTTP ${response.status}` };
    }
    const data = await response.json();
    return { data: data as T, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Failed to fetch ${url}:`, message);
    return { data: defaultValue, error: message };
  }
}

/**
 * Aggregate data with null-safe operations
 */
export function safeAggregate<T extends Record<string, unknown>>(
  data: T[],
  groupKey: keyof T,
  sumFields: (keyof T)[],
): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {};

  data.forEach((record) => {
    const group = String(record[groupKey] ?? "unknown");
    if (!result[group]) {
      result[group] = {};
      sumFields.forEach((field) => {
        result[group][field as string] = 0;
      });
    }

    sumFields.forEach((field) => {
      const value = record[field];
      result[group][field as string] += safeNumber(value, 0);
    });
  });

  return result;
}
