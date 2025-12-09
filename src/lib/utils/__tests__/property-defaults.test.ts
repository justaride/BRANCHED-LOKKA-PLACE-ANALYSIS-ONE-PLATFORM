/**
 * Tests for property-defaults utilities
 */

import {
  sanitizeNokkeldata,
  sanitizeBusinessActor,
  sanitizeCategoryStats,
  sanitizeNaringsaktorer,
  derivePropertyName,
  derivePropertyAddress,
  ensureEiendomDefaults,
  DEFAULT_NOKKELDATA,
} from '../property-defaults';

describe('sanitizeNokkeldata', () => {
  it('returns defaults for undefined input', () => {
    const result = sanitizeNokkeldata(undefined);
    expect(result).toEqual(DEFAULT_NOKKELDATA);
  });

  it('preserves existing values', () => {
    const input = {
      prisniva: 'NOK 50000/m2',
      befolkning: 1000,
    };

    const result = sanitizeNokkeldata(input);
    expect(result.prisniva).toBe('NOK 50000/m2');
    expect(result.befolkning).toBe(1000);
    expect(result.arbeidsledighet).toBeNull();
  });
});

describe('sanitizeBusinessActor', () => {
  it('provides defaults for missing fields', () => {
    const input = {
      navn: 'Test Butikk',
      omsetning: 1000000,
    };

    const result = sanitizeBusinessActor(input);
    expect(result.navn).toBe('Test Butikk');
    expect(result.omsetning).toBe(1000000);
    expect(result.rank).toBe('0');
    expect(result.type).toBe('Ukjent');
    expect(result.adresse).toBe('');
  });

  it('preserves null for optional numeric fields', () => {
    const input = { navn: 'Test' };
    const result = sanitizeBusinessActor(input);
    expect(result.yoyVekst).toBeNull();
    expect(result.markedsandel).toBeNull();
  });
});

describe('sanitizeCategoryStats', () => {
  it('provides zero defaults', () => {
    const result = sanitizeCategoryStats({});
    expect(result.count).toBe(0);
    expect(result.totalRevenue).toBe(0);
    expect(result.avgRevenue).toBe(0);
  });

  it('preserves existing values', () => {
    const input = { count: 5, totalRevenue: 10000 };
    const result = sanitizeCategoryStats(input);
    expect(result.count).toBe(5);
    expect(result.totalRevenue).toBe(10000);
    expect(result.avgRevenue).toBe(0);
  });
});

describe('sanitizeNaringsaktorer', () => {
  it('handles undefined input', () => {
    const result = sanitizeNaringsaktorer(undefined);
    expect(result.actors).toEqual([]);
    expect(result.categoryStats).toEqual({});
    expect(result.metadata.totalActors).toBe(0);
  });

  it('sanitizes actors array', () => {
    const input = {
      actors: [
        { navn: 'Test', omsetning: 100 },
      ],
    };

    const result = sanitizeNaringsaktorer(input);
    expect(result.actors).toHaveLength(1);
    expect(result.actors[0].navn).toBe('Test');
    expect(result.actors[0].type).toBe('Ukjent');
  });
});

describe('derivePropertyName', () => {
  it('capitalizes words from ID', () => {
    expect(derivePropertyName('thorvald-meyers-gate-25')).toBe('Thorvald Meyers Gate 25');
    expect(derivePropertyName('markveien-55')).toBe('Markveien 55');
    expect(derivePropertyName('nedre-foss-gard')).toBe('Nedre Foss Gard');
  });
});

describe('derivePropertyAddress', () => {
  it('formats address from ID', () => {
    expect(derivePropertyAddress('thorvald-meyers-gate-25')).toBe('Thorvald Meyers Gate 25');
    expect(derivePropertyAddress('markveien-55')).toBe('Markveien 55');
  });
});

describe('ensureEiendomDefaults', () => {
  it('derives name and address from ID', () => {
    const result = ensureEiendomDefaults({ id: 'markveien-55' }, 'test-tenant');

    expect(result.id).toBe('markveien-55');
    expect(result.navn).toBe('Markveien 55');
    expect(result.adresse).toBe('Markveien 55');
  });

  it('preserves existing values', () => {
    const input = {
      id: 'test-property',
      navn: 'Custom Name',
      adresse: 'Custom Address 1',
    };

    const result = ensureEiendomDefaults(input, 'test');
    expect(result.navn).toBe('Custom Name');
    expect(result.adresse).toBe('Custom Address 1');
  });

  it('provides default plaaceData', () => {
    const result = ensureEiendomDefaults({ id: 'test' }, 'test');

    expect(result.plaaceData).toBeDefined();
    expect(result.plaaceData.nokkeldata).toBeDefined();
    expect(result.plaaceData.screenshots).toEqual([]);
  });

  it('provides default metadata', () => {
    const result = ensureEiendomDefaults({ id: 'test' }, 'test');

    expect(result.metadata.status).toBe('publisert');
    expect(result.metadata.versjon).toBe(1);
    expect(result.metadata.opprettet).toBeDefined();
  });

  it('provides default tilleggsinfo', () => {
    const result = ensureEiendomDefaults({ id: 'test' }, 'test');

    expect(result.tilleggsinfo.historikk).toBe('');
    expect(result.tilleggsinfo.notater).toEqual([]);
  });
});
