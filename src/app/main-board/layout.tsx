import { notFound } from 'next/navigation';
import { getTenant } from '@/config/tenants';
import TenantShell from '@/components/layout/TenantShell';
import type { Metadata } from 'next';

const tenant = getTenant('main-board');

export const metadata: Metadata = {
  title: {
    default: tenant?.displayName || 'Main Board',
    template: `%s | ${tenant?.name || 'Main Board'}`,
  },
  description: tenant?.description || '',
  keywords: tenant?.keywords || [],
};

export default function MainBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!tenant || tenant.type !== 'main-board') {
    notFound();
  }

  return <TenantShell tenant={tenant}>{children}</TenantShell>;
}
