/**
 * Tests for safe-data utilities
 */

import {
  safeNumber,
  safeString,
  filterValidRecords,
  sanitizeNumericFields,
  deepSanitize,
  createSafeFormatter,
  safeAggregate,
} from '../safe-data';

describe('safeNumber', () => {
  it('returns number for valid number', () => {
    expect(safeNumber(42)).toBe(42);
    expect(safeNumber(0)).toBe(0);
    expect(safeNumber(-10)).toBe(-10);
    expect(safeNumber(3.14)).toBe(3.14);
  });

  it('returns default for null/undefined', () => {
    expect(safeNumber(null)).toBe(0);
    expect(safeNumber(undefined)).toBe(0);
    expect(safeNumber(null, 100)).toBe(100);
  });

  it('returns default for NaN', () => {
    expect(safeNumber(NaN)).toBe(0);
    expect(safeNumber(NaN, -1)).toBe(-1);
  });

  it('parses string numbers', () => {
    expect(safeNumber('42')).toBe(42);
    expect(safeNumber('3.14')).toBe(3.14);
    expect(safeNumber('invalid')).toBe(0);
  });
});

describe('safeString', () => {
  it('returns string for valid string', () => {
    expect(safeString('hello')).toBe('hello');
    expect(safeString('')).toBe('');
  });

  it('returns default for null/undefined', () => {
    expect(safeString(null)).toBe('');
    expect(safeString(undefined)).toBe('');
    expect(safeString(null, 'N/A')).toBe('N/A');
  });

  it('converts other types to string', () => {
    expect(safeString(42)).toBe('42');
    expect(safeString(true)).toBe('true');
  });
});

describe('filterValidRecords', () => {
  it('filters out records with null required fields', () => {
    const data = [
      { id: 1, name: 'A', value: 10 },
      { id: 2, name: null, value: 20 },
      { id: 3, name: 'C', value: null },
    ];

    const result = filterValidRecords(data, ['name']);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(3);
  });

  it('returns all records when all have required fields', () => {
    const data = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];

    const result = filterValidRecords(data, ['name']);
    expect(result).toHaveLength(2);
  });
});

describe('sanitizeNumericFields', () => {
  it('replaces null numeric fields with default', () => {
    const data = [
      { name: 'A', value: null, count: 5 },
      { name: 'B', value: 10, count: null },
    ];

    const result = sanitizeNumericFields(data, ['value', 'count']);
    expect(result[0].value).toBe(0);
    expect(result[0].count).toBe(5);
    expect(result[1].value).toBe(10);
    expect(result[1].count).toBe(0);
  });

  it('uses custom default value', () => {
    const data = [{ value: null }];
    const result = sanitizeNumericFields(data, ['value'], -1);
    expect(result[0].value).toBe(-1);
  });
});

describe('deepSanitize', () => {
  it('replaces null values in nested objects', () => {
    const data = {
      name: 'Test',
      nested: {
        value: null,
        deep: {
          count: null,
        },
      },
    };

    const result = deepSanitize(data);
    expect(result.nested.value).toBe(0);
    expect(result.nested.deep.count).toBe(0);
  });

  it('handles arrays', () => {
    const data = [
      { value: null },
      { value: 10 },
    ];

    const result = deepSanitize(data);
    expect(result[0].value).toBe(0);
    expect(result[1].value).toBe(10);
  });
});

describe('createSafeFormatter', () => {
  it('formats valid numbers', () => {
    const formatter = createSafeFormatter((v) => v.toFixed(2));
    expect(formatter(3.14159)).toBe('3.14');
    expect(formatter(100)).toBe('100.00');
  });

  it('returns N/A for null/undefined', () => {
    const formatter = createSafeFormatter();
    expect(formatter(null)).toBe('N/A');
    expect(formatter(undefined)).toBe('N/A');
  });

  it('uses custom null text', () => {
    const formatter = createSafeFormatter((v) => v.toString(), 'Ukjent');
    expect(formatter(null)).toBe('Ukjent');
  });
});

describe('safeAggregate', () => {
  it('aggregates data with null-safe sum', () => {
    const data = [
      { category: 'A', value: 10, count: 1 },
      { category: 'A', value: null, count: 2 },
      { category: 'B', value: 5, count: null },
    ];

    const result = safeAggregate(data, 'category', ['value', 'count']);

    expect(result['A'].value).toBe(10);
    expect(result['A'].count).toBe(3);
    expect(result['B'].value).toBe(5);
    expect(result['B'].count).toBe(0);
  });
});
