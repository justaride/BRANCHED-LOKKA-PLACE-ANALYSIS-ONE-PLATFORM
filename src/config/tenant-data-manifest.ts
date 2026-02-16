import type { CompanyTenantSlug } from '@/config/tenants';

export const TENANT_DATA_MANIFEST: Record<CompanyTenantSlug, readonly string[]> = {
  'aspelin-ramm': [
    'bellonabygget',
    'mathallen',
    'nye-broverkstedet',
    'scandic-hotel-vulkan',
    'vulkan-arena',
    'vulkan-omradet',
  ],
  'brodrene-evensen': [
    'thorvaldmeyers-gate-18',
    'thorvaldmeyers-gate-53',
    'thorvaldmeyers-gate-55',
  ],
  carucel: ['olaf-ryes-plass-4'],
  'eiendomsspar': ['nedre-foss-gard', 'thorvald-meyers-gate-2'],
  'front-real-estate': ['markveien-35'],
  'maya-eiendom': [
    'hausmannsgate-19',
    'thorvald-meyers-gate-46',
    'thorvald-meyersgate-38',
    'trondheimsveien-80',
  ],
  'roger-vodal': [
    'markveien-38',
    'markveien-42',
    'markveien-48',
    'markveien-53',
    'markveien-58',
    'olaf-ryes-plass-3',
    'thorvald-meyersgate-33',
    'thorvald-meyersgate-40',
    'thorvald-meyersgate-44',
  ],
  sio: ['brenneriveien-11', 'marselis-gate-24', 'trondheimsveien-25-29'],
  spabo: [
    'brenneriveien-5',
    'brenneriveien-9',
    'korsgata-24',
    'markveien-28',
    'markveien-51',
    'markveien-54',
    'markveien-55',
    'markveien-56',
    'markveien-57',
    'markveien-60',
    'olaf-ryes-plass-5',
    'seilduksgata-7',
    'sofienberggata-6',
    'stolmakergaten-19',
    'thorvald-meyers-gate-25',
    'thorvald-meyers-gate-26',
    'thorvald-meyers-gate-27',
    'thorvald-meyers-gate-42',
    'thorvald-meyers-gate-56',
    'thorvald-meyers-gate-72',
    'thorvald-meyers-gate-76',
    'thorvald-meyers-gate-79',
  ],
};

export function getTenantPropertyIds(slug: CompanyTenantSlug): string[] {
  return [...TENANT_DATA_MANIFEST[slug]];
}
