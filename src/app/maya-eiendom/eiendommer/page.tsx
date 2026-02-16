import type { Metadata } from 'next';
import { getTenantPageContent } from '@/config/tenant-content';
import { getTenantLoader } from '@/lib/loaders/tenant-registry';
import TenantPropertiesPage from '@/components/tenant/TenantPropertiesPage';

const content = getTenantPageContent('maya-eiendom').properties;
const { loadAllEiendommer } = getTenantLoader('maya-eiendom');

export const metadata: Metadata = {
  title: content.metadataTitle,
  description: content.metadataDescription,
};

export default async function TenantPropertiesRoute() {
  const properties = await loadAllEiendommer();

  return (
    <TenantPropertiesPage
      properties={properties}
      basePath="/maya-eiendom"
      headingDescription={content.headingDescription}
      useGradientHeader={false}
    />
  );
}
