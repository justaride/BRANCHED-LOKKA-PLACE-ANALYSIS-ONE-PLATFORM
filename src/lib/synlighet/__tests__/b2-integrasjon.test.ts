// Mock next/headers så modulen kan importeres i node-miljø (vi tester kun de
// rene funksjonene, ikke header-lesingen).
jest.mock('next/headers', () => ({
  headers: async () => ({ get: () => null }),
}));

import { kontekstFraEpost, finnEierTenant } from '@/lib/synlighet/request-kontekst';
import { maskerEiendom } from '@/lib/synlighet/eiendom';
import { harTilgangKtx, erMaskert } from '@/lib/synlighet';
import type { Eiendom } from '@/types/eiendom';

describe('request-resolver: kontekstFraEpost (CF Access → rolle/eier)', () => {
  const ORIG_ENV = process.env;
  beforeEach(() => {
    process.env = { ...ORIG_ENV };
  });
  afterEach(() => {
    process.env = ORIG_ENV;
  });

  test('ingen e-post → gjest', () => {
    expect(kontekstFraEpost(null)).toEqual({ rolle: 'gjest' });
    expect(kontekstFraEpost('')).toEqual({ rolle: 'gjest' });
  });

  test('e-post i ADMIN_EMAILS → admin (ser privat)', () => {
    process.env.ADMIN_EMAILS = 'gabriel@naturalstate.no';
    const ctx = kontekstFraEpost('Gabriel@naturalstate.no', 'spabo');
    expect(ctx.rolle).toBe('admin');
    expect(harTilgangKtx(ctx, 'privat')).toBe(true);
  });

  test('tenant-allowlist → gardeier; eier på egen rute, ikke på andres', () => {
    process.env.SPABO_EMAILS = 'eier@spabo.no';
    const paaEgen = kontekstFraEpost('eier@spabo.no', 'spabo');
    const paaAndres = kontekstFraEpost('eier@spabo.no', 'maya-eiendom');

    expect(paaEgen.rolle).toBe('gardeier');
    expect(harTilgangKtx(paaEgen, 'privat')).toBe(true); // egen eiendom
    expect(harTilgangKtx(paaAndres, 'privat')).toBe(false); // andres eiendom
    expect(harTilgangKtx(paaAndres, 'internt')).toBe(true); // men fortsatt internt
  });

  test('innlogget uten tenant-treff → medlem', () => {
    const ctx = kontekstFraEpost('ukjent@example.com', 'spabo');
    expect(ctx.rolle).toBe('medlem');
    expect(harTilgangKtx(ctx, 'internt')).toBe(true);
    expect(harTilgangKtx(ctx, 'privat')).toBe(false);
  });

  test('finnEierTenant matcher riktig tenant fra allowlist', () => {
    process.env.SPABO_EMAILS = 'eier@spabo.no';
    expect(finnEierTenant('eier@spabo.no')).toBe('spabo');
    expect(finnEierTenant('ingen@example.com')).toBeNull();
  });
});

describe('maskerEiendom (ett-kalls maskering)', () => {
  const baseEiendom: Eiendom = {
    id: 'test',
    adresse: 'Testgata 1',
    plaaceData: {
      rapportDato: '2026-01-01',
      screenshots: [],
      nokkeldata: {
        leieinntekter: '18 000 NOK/m²/år',
        prisniva: '105 000 kr/m²',
        areal: '1 000 m²',
      },
    },
    tilleggsinfo: {},
    metadata: {
      opprettet: '2026-01-01',
      sistOppdatert: '2026-01-01',
      status: 'publisert',
      versjon: 1,
    },
    naringsaktorer: {
      actors: [
        {
          rank: '1',
          navn: 'Aktør',
          type: 'Kafé',
          adresse: 'X',
          kommune: 'Oslo',
          omsetning: 5_000_000,
          kjedeProsent: null,
          yoyVekst: null,
          ansatteLokalt: null,
          ansatteKjede: null,
          kjedeLokasjoner: null,
          markedsandel: null,
        },
      ],
      categoryStats: {},
      metadata: { totalActors: 1, totalCategories: 1 },
    },
  };

  test('gjest: privat/internt-felt maskeres, felles (areal/navn) intakt', () => {
    const m = maskerEiendom(baseEiendom, { rolle: 'gjest' });
    expect(erMaskert(m.plaaceData.nokkeldata.leieinntekter)).toBe(true); // privat
    expect(erMaskert(m.plaaceData.nokkeldata.prisniva)).toBe(true); // internt
    expect(m.plaaceData.nokkeldata.areal).toBe('1 000 m²'); // felles
    expect(erMaskert(m.naringsaktorer!.actors[0].omsetning)).toBe(true); // internt
    expect(m.naringsaktorer!.actors[0].navn).toBe('Aktør'); // felles
  });

  test('eier: leieinntekter + omsetning synlig på egen eiendom', () => {
    const m = maskerEiendom(baseEiendom, { rolle: 'gardeier', erEier: true });
    expect(m.plaaceData.nokkeldata.leieinntekter).toBe('18 000 NOK/m²/år');
    expect(m.naringsaktorer!.actors[0].omsetning).toBe(5_000_000);
  });
});
