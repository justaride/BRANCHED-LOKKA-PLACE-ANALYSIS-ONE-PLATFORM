import type { Metadata } from 'next';
import { getTenantPageContent } from '@/config/tenant-content';
import { getTenantLoader } from '@/lib/loaders/tenant-registry';
import TenantPropertiesPage from '@/components/tenant/TenantPropertiesPage';

const content = getTenantPageContent('sio').properties;
const { loadAllEiendommer } = getTenantLoader('sio');

export const metadata: Metadata = {
  title: content.metadataTitle,
  description: content.metadataDescription,
};

export default async function TenantPropertiesRoute() {
  const properties = await loadAllEiendommer();

  return (
    <TenantPropertiesPage
      properties={properties}
      basePath="/sio"
      headingDescription={content.headingDescription}
      useGradientHeader={false}
    />
  );
}
