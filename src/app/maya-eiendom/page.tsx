import { notFound } from 'next/navigation';
import { getTenant } from '@/config/tenants';
import { getTenantPageContent } from '@/config/tenant-content';
import TenantHomePage from '@/components/tenant/TenantHomePage';

export default function TenantHomeRoute() {
  const tenant = getTenant('maya-eiendom');

  if (!tenant || tenant.type !== 'company') {
    notFound();
  }

  return <TenantHomePage tenant={tenant} content={getTenantPageContent('maya-eiendom').home} />;
}
