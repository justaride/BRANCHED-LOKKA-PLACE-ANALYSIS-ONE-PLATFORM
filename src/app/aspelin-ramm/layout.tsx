import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Aspelin Ramm Vulkan',
    template: '%s | Aspelin Ramm',
  },
  description: 'Omfattende placeanalyser og eiendomsinformasjon for Aspelin Ramms portefølje på Vulkan.',
  keywords: ['Aspelin Ramm', 'Vulkan', 'Plaace', 'eiendomsanalyse', 'Oslo', 'FutureBuilt'],
};

export default function AspelinRammLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('aspelin-ramm');

  if (!tenant) {
    throw new Error('Aspelin Ramm tenant not found');
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
