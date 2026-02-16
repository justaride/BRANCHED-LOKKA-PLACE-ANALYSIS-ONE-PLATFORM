import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTenant, isCompanyTenantSlug } from '@/config/tenants';
import { getTenantPageContent } from '@/config/tenant-content';
import { getTenantLoader } from '@/lib/loaders/tenant-registry';
import TenantPropertiesPage from '@/components/tenant/TenantPropertiesPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}): Promise<Metadata> {
  const { company } = await params;

  if (!isCompanyTenantSlug(company)) {
    return { title: 'Eiendommer' };
  }

  const content = getTenantPageContent(company).properties;
  return {
    title: content.metadataTitle,
    description: content.metadataDescription,
  };
}

export default async function CompanyEiendommerPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;

  if (!isCompanyTenantSlug(company)) {
    notFound();
  }

  const tenant = getTenant(company);
  if (!tenant || tenant.type !== 'company') {
    notFound();
  }

  const content = getTenantPageContent(company).properties;
  const { loadAllEiendommer } = getTenantLoader(company);
  const properties = await loadAllEiendommer();

  return (
    <TenantPropertiesPage
      properties={properties}
      basePath={`/${tenant.slug}`}
      headingDescription={content.headingDescription}
      useGradientHeader={tenant.slug === 'carucel'}
    />
  );
}
