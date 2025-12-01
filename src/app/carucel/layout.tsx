import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Carucel',
    template: '%s | Carucel',
  },
  description: 'Plaace-analyser og eiendomsinformasjon for Carucel på Olaf Ryes plass, Grünerløkka. 1-minutts gangavstand analyse med demografi, bevegelsesmønster og markedsdata.',
  keywords: ['Carucel', 'eiendom', 'Plaace', 'eiendomsanalyse', 'Oslo', 'Grünerløkka', 'Olaf Ryes plass'],
};

export default function CarucelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('carucel');

  if (!tenant) {
    throw new Error('Carucel tenant not found');
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
