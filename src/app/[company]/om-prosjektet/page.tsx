import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTenant, isCompanyTenantSlug } from '@/config/tenants';
import { getTenantPageContent } from '@/config/tenant-content';
import TenantAboutPage from '@/components/tenant/TenantAboutPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}): Promise<Metadata> {
  const { company } = await params;

  if (!isCompanyTenantSlug(company)) {
    return { title: 'Om Prosjektet' };
  }

  const content = getTenantPageContent(company).about;
  return {
    title: content.metadataTitle,
    description: content.metadataDescription,
  };
}

export default async function CompanyOmProsjektetPage({
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

  return <TenantAboutPage tenant={tenant} content={getTenantPageContent(company).about} />;
}
