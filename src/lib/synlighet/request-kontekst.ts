/**
 * Request-bundet tilgangsresolver (B2).
 *
 * Identitet kommer fra Cloudflare Access, som setter headeren
 * `Cf-Access-Authenticated-User-Email` på hver autentisert request
 * (auth håndteres utenfor appen — se `.env.example`). Rolle og eierskap
 * utledes ved å gjenbruke `tenant-emails.ts`:
 *  - e-post i ADMIN_EMAILS            → `admin`
 *  - e-post i en tenants allowlist    → `gardeier` (+ `eier` for den tenantens eiendommer)
 *  - innlogget uten tenant-treff      → `medlem`
 *  - ingen e-post                     → `gjest`
 *
 * ⚠️ SERVER-ONLY: `tilgangsKontekstFraRequest` bruker `next/headers` og kan kun
 * kalles fra server-komponenter / server actions / route handlers. Den opt-er
 * ruten inn i dynamisk rendering. Importér derfor IKKE denne fra en
 * klientkomponent (og den er bevisst holdt utenfor `index.ts`-barrelet).
 */

import { headers } from 'next/headers';
import { getAdminEmails, getAllowedEmails } from '@/lib/tenant-emails';
import { getCompanyTenants } from '@/config/tenants';
import { type Rolle, type TilgangsKontekst } from '@/types/synlighet';

/** Headeren Cloudflare Access setter med innlogget brukers e-post. */
export const CF_ACCESS_EPOST_HEADER = 'cf-access-authenticated-user-email';

/** Finn tenant-slug hvis e-posten står i en (company-)tenants allowlist. */
export function finnEierTenant(epost: string): string | null {
  const e = epost.trim().toLowerCase();
  if (!e) return null;
  for (const tenant of getCompanyTenants()) {
    if (getAllowedEmails(tenant.slug).includes(e)) return tenant.slug;
  }
  return null;
}

/**
 * Ren utledning av {@link TilgangsKontekst} fra e-post + rute-tenant.
 * Skilt ut fra header-lesingen slik at den er enhetstestbar uten Next.
 *
 * @param epost        Verifisert e-post (fra CF Access), eller null/undefined.
 * @param routeTenant  Tenant-slug for ruten som vises (eiendommens eier).
 */
export function kontekstFraEpost(
  epost: string | null | undefined,
  routeTenant?: string,
): TilgangsKontekst {
  const e = epost?.trim().toLowerCase();
  if (!e) return { rolle: 'gjest' };

  if (getAdminEmails().includes(e)) {
    return { rolle: 'admin', erEier: true };
  }

  const eierTenant = finnEierTenant(e);
  const rolle: Rolle = eierTenant ? 'gardeier' : 'medlem';
  const erEier = !!routeTenant && eierTenant === routeTenant;
  return { rolle, erEier };
}

/**
 * Bygger {@link TilgangsKontekst} for inneværende request fra Cloudflare
 * Access-headeren. Send `routeTenant` (tenant-slug for siden) slik at en
 * gårdeier løftes til `eier` for sine egne eiendommer.
 *
 * Server-only — opt-er ruten inn i dynamisk rendering.
 */
export async function tilgangsKontekstFraRequest(
  routeTenant?: string,
): Promise<TilgangsKontekst> {
  const h = await headers();
  return kontekstFraEpost(h.get(CF_ACCESS_EPOST_HEADER), routeTenant);
}
