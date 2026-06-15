/**
 * Ett-kalls maskering av en hel `Eiendom` for et gitt tilgangsnivå.
 *
 * Gjør det trivielt å maskere serverside før render:
 *
 *   const ctx = await tilgangsKontekstFraRequest('spabo');
 *   const synlig = maskerEiendom(eiendom, ctx);
 *
 * Pure (ingen next/headers) — trygg å importere fra `index.ts`-barrelet.
 */

import type {
  Eiendom,
  PlaaceData,
  Nokkeldata,
  NaringsAktorData,
  BusinessActor,
} from '@/types/eiendom';
import type { TilgangsKontekst } from '@/types/synlighet';
import { maskerEntitet, maskerListe, type Maskert } from './filter';
import { NOKKELDATA_NIVA, BUSINESS_ACTOR_NIVA } from './registry';

/** `Eiendom` der sensitive nøkkeldata-/aktørfelt kan være {@link Maskert}. */
export type EiendomMaskert = Omit<Eiendom, 'plaaceData' | 'naringsaktorer'> & {
  plaaceData: Omit<PlaaceData, 'nokkeldata'> & { nokkeldata: Maskert<Nokkeldata> };
  naringsaktorer?: Omit<NaringsAktorData, 'actors'> & { actors: Maskert<BusinessActor>[] };
};

/**
 * Returnerer en kopi av `eiendom` der `plaaceData.nokkeldata` og
 * `naringsaktorer.actors` er maskert i henhold til registeret og `ctx`.
 * Felles-felt forblir uendret; bare felt brukeren ikke har tilgang til blir
 * erstattet med en MaskertVerdi-sentinel.
 */
export function maskerEiendom(eiendom: Eiendom, ctx: TilgangsKontekst): EiendomMaskert {
  return {
    ...eiendom,
    plaaceData: {
      ...eiendom.plaaceData,
      nokkeldata: maskerEntitet(eiendom.plaaceData.nokkeldata, NOKKELDATA_NIVA, ctx),
    },
    naringsaktorer: eiendom.naringsaktorer
      ? {
          ...eiendom.naringsaktorer,
          actors: maskerListe(eiendom.naringsaktorer.actors, BUSINESS_ACTOR_NIVA, ctx),
        }
      : undefined,
  };
}
