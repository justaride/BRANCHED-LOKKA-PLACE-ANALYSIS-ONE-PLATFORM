import type { Eiendom } from '@/types/eiendom';
import type { CompanyTenantSlug } from '@/config/tenants';
import { getTenantPropertyIds } from '@/config/tenant-data-manifest';

import * as aspelinRamm from '@/lib/loaders/aspelin-ramm';
import * as brodreneEvensen from '@/lib/loaders/brodrene-evensen';
import * as carucel from '@/lib/loaders/carucel';
import * as eiendomsspar from '@/lib/loaders/eiendomsspar';
import * as frontRealEstate from '@/lib/loaders/front-real-estate';
import * as mayaEiendom from '@/lib/loaders/maya-eiendom';
import * as rogerVodal from '@/lib/loaders/roger-vodal';
import * as sio from '@/lib/loaders/sio';
import * as spabo from '@/lib/loaders/spabo';

export interface TenantLoaderApi {
  loadAllEiendommer: () => Promise<Eiendom[]>;
  loadEiendom: (id: string) => Promise<Eiendom | null>;
  getAllPropertyIds: () => string[];
}

const TENANT_LOADER_REGISTRY: Record<CompanyTenantSlug, TenantLoaderApi> = {
  'aspelin-ramm': aspelinRamm,
  'brodrene-evensen': brodreneEvensen,
  carucel,
  'eiendomsspar': eiendomsspar,
  'front-real-estate': frontRealEstate,
  'maya-eiendom': mayaEiendom,
  'roger-vodal': rogerVodal,
  sio,
  spabo,
};

export function getTenantLoader(slug: CompanyTenantSlug): TenantLoaderApi {
  return TENANT_LOADER_REGISTRY[slug];
}

export function getTenantLoaderWithManifest(slug: CompanyTenantSlug) {
  const loader = getTenantLoader(slug);
  return {
    ...loader,
    propertyIds: getTenantPropertyIds(slug),
  };
}
