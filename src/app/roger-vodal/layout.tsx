import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Roger Vodal',
    template: '%s | Roger Vodal',
  },
  description: 'Plaace-analyser og eiendomsinformasjon for Roger Vodals eiendommer på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for tre eiendommer på Brenneriveien.',
  keywords: ['Roger Vodal', 'eiendom', 'Plaace', 'eiendomsanalyse', 'Oslo', 'Grünerløkka', 'Brenneriveien'],
};

export default function RogerVodalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('roger-vodal');

  if (!tenant) {
    throw new Error('Roger Vodal tenant not found');
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
