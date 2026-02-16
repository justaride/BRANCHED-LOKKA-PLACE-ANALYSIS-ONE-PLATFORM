import { notFound } from 'next/navigation';
import { getTenant } from '@/config/tenants';
import TenantShell from '@/components/layout/TenantShell';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}): Promise<Metadata> {
  const { company } = await params;
  const tenant = getTenant(company);

  if (!tenant) {
    return {};
  }

  return {
    title: {
      default: tenant.displayName,
      template: `%s | ${tenant.name}`,
    },
    description: tenant.description,
    keywords: tenant.keywords,
  };
}

export default async function CompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const tenant = getTenant(company);

  if (!tenant || tenant.type !== 'company') {
    notFound();
  }

  return <TenantShell tenant={tenant}>{children}</TenantShell>;
}
