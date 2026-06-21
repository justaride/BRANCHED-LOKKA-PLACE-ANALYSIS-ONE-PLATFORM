/**
 * Synlighet / delingsnivå-laget — samlet inngang.
 *
 * Typene/konstantene bor i `@/types/synlighet` og re-eksporteres her slik at
 * konsumenter kan importere alt fra ett sted:
 *
 *   import { maskerEntitet, NOKKELDATA_NIVA, harTilgang } from '@/lib/synlighet';
 *
 * UI-komponentene importeres direkte fra `@/components/ui/...`.
 */
export * from '@/types/synlighet';
export * from './registry';
export * from './filter';
export * from './session';
export * from './eiendom';

// Merk: `request-kontekst.ts` er server-only (bruker next/headers) og er
// bevisst IKKE re-eksportert her. Importér den direkte i server-kode:
//   import { tilgangsKontekstFraRequest } from '@/lib/synlighet/request-kontekst';
