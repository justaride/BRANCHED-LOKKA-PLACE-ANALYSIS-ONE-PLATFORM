import {
  harTilgang,
  harTilgangKtx,
  maskerVerdi,
  maskerEntitet,
  maskerListe,
} from '@/lib/synlighet/filter';
import {
  NOKKELDATA_NIVA,
  BUSINESS_ACTOR_NIVA,
  finnNiva,
} from '@/lib/synlighet/registry';
import {
  effektivRolle,
  erMaskert,
  lagMaskertVerdi,
  type TilgangsKontekst,
} from '@/types/synlighet';
import { tilgangsKontekst, utledRolle, GJEST_KONTEKST } from '@/lib/synlighet/session';
import type { Nokkeldata, BusinessActor } from '@/types/eiendom';

describe('harTilgang — rolle/nivå-matrise', () => {
  test('gjest ser kun felles', () => {
    expect(harTilgang('gjest', 'felles')).toBe(true);
    expect(harTilgang('gjest', 'internt')).toBe(false);
    expect(harTilgang('gjest', 'fortrolig')).toBe(false);
    expect(harTilgang('gjest', 'privat')).toBe(false);
  });

  test('medlem ser felles + internt, men ikke fortrolig/privat', () => {
    expect(harTilgang('medlem', 'felles')).toBe(true);
    expect(harTilgang('medlem', 'internt')).toBe(true);
    expect(harTilgang('medlem', 'fortrolig')).toBe(false);
    expect(harTilgang('medlem', 'privat')).toBe(false);
  });

  test('gardeier har samme tilgang som medlem (for data hen ikke eier)', () => {
    expect(harTilgang('gardeier', 'felles')).toBe(true);
    expect(harTilgang('gardeier', 'internt')).toBe(true);
    expect(harTilgang('gardeier', 'fortrolig')).toBe(false);
    expect(harTilgang('gardeier', 'privat')).toBe(false);
  });

  test('eier ser alle fire nivåene', () => {
    expect(harTilgang('eier', 'felles')).toBe(true);
    expect(harTilgang('eier', 'internt')).toBe(true);
    expect(harTilgang('eier', 'fortrolig')).toBe(true);
    expect(harTilgang('eier', 'privat')).toBe(true);
  });

  test('admin ser alle fire nivåene', () => {
    expect(harTilgang('admin', 'felles')).toBe(true);
    expect(harTilgang('admin', 'internt')).toBe(true);
    expect(harTilgang('admin', 'fortrolig')).toBe(true);
    expect(harTilgang('admin', 'privat')).toBe(true);
  });
});

describe('effektivRolle — eierskap og admin', () => {
  test('erEier løfter en gårdeier til eier (ser privat på egne data)', () => {
    const ctx: TilgangsKontekst = { rolle: 'gardeier', erEier: true };
    expect(effektivRolle(ctx)).toBe('eier');
    expect(harTilgangKtx(ctx, 'privat')).toBe(true);
  });

  test('erEier løfter IKKE en gjest (ikke innlogget ⇒ ingen privat tilgang)', () => {
    const ctx: TilgangsKontekst = { rolle: 'gjest', erEier: true };
    expect(effektivRolle(ctx)).toBe('gjest');
    expect(harTilgangKtx(ctx, 'privat')).toBe(false);
  });

  test('admin forblir admin uavhengig av erEier', () => {
    expect(effektivRolle({ rolle: 'admin', erEier: false })).toBe('admin');
    expect(harTilgangKtx({ rolle: 'admin' }, 'privat')).toBe(true);
  });
});

describe('maskering av verdier, entiteter og lister', () => {
  test('maskerVerdi skjuler leienivå (privat) for medlem, men gir verdien til eier', () => {
    const medlem: TilgangsKontekst = { rolle: 'medlem' };
    const eierKtx: TilgangsKontekst = { rolle: 'gardeier', erEier: true };

    expect(erMaskert(maskerVerdi(50000, 'privat', medlem, 'leieniva'))).toBe(true);
    expect(maskerVerdi(50000, 'privat', eierKtx, 'leieniva')).toBe(50000);
  });

  test('maskerEntitet skjuler privat/internt-felt i Nokkeldata for gjest', () => {
    const nokkeldata: Nokkeldata = {
      leieinntekter: 'NOK 1 200 000',
      prisniva: 'NOK 53000/m2',
      befolkning: 12000,
    };
    const gjest = maskerEntitet(nokkeldata, NOKKELDATA_NIVA, { rolle: 'gjest' });

    expect(erMaskert(gjest.leieinntekter)).toBe(true); // privat
    expect(erMaskert(gjest.prisniva)).toBe(true); // internt
    expect(gjest.befolkning).toBe(12000); // felles — uendret
  });

  test('maskerEntitet: medlem ser internt men ikke privat i Nokkeldata', () => {
    const nokkeldata: Nokkeldata = {
      leieinntekter: 'NOK 1 200 000',
      prisniva: 'NOK 53000/m2',
      befolkning: 12000,
    };
    const medlem = maskerEntitet(nokkeldata, NOKKELDATA_NIVA, { rolle: 'medlem' });

    expect(erMaskert(medlem.leieinntekter)).toBe(true); // privat — fortsatt skjult
    expect(medlem.prisniva).toBe('NOK 53000/m2'); // internt — synlig
    expect(medlem.befolkning).toBe(12000); // felles — synlig
  });

  test('maskerListe skjuler aktør-omsetning (internt) for gjest, men ikke for medlem', () => {
    const aktorer: BusinessActor[] = [
      {
        rank: '1',
        navn: 'Tim Wendelboe',
        type: 'Kafé',
        adresse: 'Grüners gate 1',
        kommune: 'Oslo',
        omsetning: 12_000_000,
        kjedeProsent: null,
        yoyVekst: null,
        ansatteLokalt: null,
        ansatteKjede: null,
        kjedeLokasjoner: null,
        markedsandel: null,
      },
    ];

    const somGjest = maskerListe(aktorer, BUSINESS_ACTOR_NIVA, { rolle: 'gjest' });
    expect(somGjest[0].navn).toBe('Tim Wendelboe'); // felles — synlig
    expect(erMaskert(somGjest[0].omsetning)).toBe(true); // internt — skjult

    const somMedlem = maskerListe(aktorer, BUSINESS_ACTOR_NIVA, { rolle: 'medlem' });
    expect(somMedlem[0].omsetning).toBe(12_000_000); // internt — synlig
  });

  test('MaskertVerdi-sentinel er JSON-serialiserbar og koblet til registeret', () => {
    const m = lagMaskertVerdi('privat', 'leieniva');
    const roundtrip = JSON.parse(JSON.stringify(m));

    expect(erMaskert(roundtrip)).toBe(true);
    expect(roundtrip.niva).toBe('privat');
    expect(roundtrip.feltId).toBe('leieniva');
    // Registeret er enig: leienivå er klassifisert som privat (bevisst strengt).
    expect(finnNiva('leieniva')).toBe('privat');
  });
});

describe('session-resolver (B2-seam)', () => {
  test('utledRolle: ikke innlogget → gjest', () => {
    expect(utledRolle(null)).toBe('gjest');
    expect(utledRolle({ innlogget: false })).toBe('gjest');
  });

  test('utledRolle: innlogget uten tenant → medlem; med tenant → gardeier', () => {
    expect(utledRolle({ innlogget: true })).toBe('medlem');
    expect(utledRolle({ innlogget: true, tenant: 'spabo' })).toBe('gardeier');
  });

  test('utledRolle: e-post i admin-listen → admin', () => {
    expect(
      utledRolle(
        { innlogget: true, epost: 'gabriel@naturalstate.no', tenant: 'spabo' },
        ['gabriel@naturalstate.no'],
      ),
    ).toBe('admin');
  });

  test('tilgangsKontekst: gårdeier ser privat på EGEN eiendom, men ikke på andres', () => {
    const session = { innlogget: true, tenant: 'spabo' };
    const egen = tilgangsKontekst(session, { tenant: 'spabo' });
    const andres = tilgangsKontekst(session, { tenant: 'maya-eiendom' });

    expect(harTilgangKtx(egen, 'privat')).toBe(true);
    expect(harTilgangKtx(andres, 'privat')).toBe(false);
    expect(harTilgangKtx(andres, 'internt')).toBe(true); // fortsatt gårdeier-tilgang
  });

  test('GJEST_KONTEKST gir kun felles', () => {
    expect(harTilgangKtx(GJEST_KONTEKST, 'felles')).toBe(true);
    expect(harTilgangKtx(GJEST_KONTEKST, 'internt')).toBe(false);
  });
});
