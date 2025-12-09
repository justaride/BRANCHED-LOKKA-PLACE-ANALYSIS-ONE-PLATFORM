import { notFound } from 'next/navigation';
import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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

  return (
    <TenantProvider tenant={tenant}>
      <div className="flex min-h-screen flex-col bg-lokka-light text-lokka-neutral">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </div>
    </TenantProvider>
  );
}
