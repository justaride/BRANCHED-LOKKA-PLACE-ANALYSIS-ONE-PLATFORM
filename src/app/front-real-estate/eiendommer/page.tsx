import type { Metadata } from 'next';
import { getTenantPageContent } from '@/config/tenant-content';
import { getTenantLoader } from '@/lib/loaders/tenant-registry';
import TenantPropertiesPage from '@/components/tenant/TenantPropertiesPage';

const content = getTenantPageContent('front-real-estate').properties;
const { loadAllEiendommer } = getTenantLoader('front-real-estate');

export const metadata: Metadata = {
  title: content.metadataTitle,
  description: content.metadataDescription,
};

export default async function TenantPropertiesRoute() {
  const properties = await loadAllEiendommer();

  return (
    <TenantPropertiesPage
      properties={properties}
      basePath="/front-real-estate"
      headingDescription={content.headingDescription}
      useGradientHeader={false}
    />
  );
}
