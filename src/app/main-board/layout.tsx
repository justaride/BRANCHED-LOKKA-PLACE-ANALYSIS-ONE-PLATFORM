import { notFound } from 'next/navigation';
import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
