import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTenant } from '@/config/tenants';
import { getTenantPageContent } from '@/config/tenant-content';
import TenantAboutPage from '@/components/tenant/TenantAboutPage';

const content = getTenantPageContent('roger-vodal').about;

export const metadata: Metadata = {
  title: content.metadataTitle,
  description: content.metadataDescription,
};

export default function TenantAboutRoute() {
  const tenant = getTenant('roger-vodal');

  if (!tenant || tenant.type !== 'company') {
    notFound();
  }

  return <TenantAboutPage tenant={tenant} content={content} />;
}
