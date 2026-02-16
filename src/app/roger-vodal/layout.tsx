import { notFound } from 'next/navigation';
import { getTenant } from '@/config/tenants';
import TenantShell from '@/components/layout/TenantShell';
import type { Metadata } from 'next';

const tenant = getTenant('roger-vodal');

export const metadata: Metadata = {
  title: {
    default: tenant?.displayName || 'roger-vodal',
    template: `%s | ${tenant?.name || 'roger-vodal'}`,
  },
  description: tenant?.description || '',
  keywords: tenant?.keywords || [],
};

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!tenant || tenant.type !== 'company') {
    notFound();
  }

  return <TenantShell tenant={tenant}>{children}</TenantShell>;
}
