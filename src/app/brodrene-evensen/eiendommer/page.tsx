import type { Metadata } from 'next';
import { getTenantPageContent } from '@/config/tenant-content';
import { getTenantLoader } from '@/lib/loaders/tenant-registry';
import TenantPropertiesPage from '@/components/tenant/TenantPropertiesPage';

const content = getTenantPageContent('brodrene-evensen').properties;
const { loadAllEiendommer } = getTenantLoader('brodrene-evensen');

export const metadata: Metadata = {
  title: content.metadataTitle,
  description: content.metadataDescription,
};

export default async function TenantPropertiesRoute() {
  const properties = await loadAllEiendommer();

  return (
    <TenantPropertiesPage
      properties={properties}
      basePath="/brodrene-evensen"
      headingDescription={content.headingDescription}
      useGradientHeader={false}
    />
  );
}
