import { notFound } from 'next/navigation';
import { getTenant, isCompanyTenantSlug } from '@/config/tenants';
import { getTenantPageContent } from '@/config/tenant-content';
import TenantHomePage from '@/components/tenant/TenantHomePage';

export default async function CompanyHomePage({
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

  return <TenantHomePage tenant={tenant} content={getTenantPageContent(company).home} />;
}
