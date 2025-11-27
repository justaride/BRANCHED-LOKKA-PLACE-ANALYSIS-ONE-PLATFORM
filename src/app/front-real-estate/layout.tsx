import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Front Real Estate',
    template: '%s | Front Real Estate',
  },
  description: 'Plaace-analyser og eiendomsinformasjon for Front Real Estate sine eiendommer på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for to eiendommer i området.',
  keywords: ['Front Real Estate', 'eiendom', 'Plaace', 'eiendomsanalyse', 'Oslo', 'Grünerløkka'],
};

export default function FrontRealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('front-real-estate');

  if (!tenant) {
    throw new Error('Front Real Estate tenant not found');
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
