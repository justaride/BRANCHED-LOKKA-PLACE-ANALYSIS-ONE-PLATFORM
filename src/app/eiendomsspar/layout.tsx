import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Eiendomsspar',
    template: '%s | Eiendomsspar',
  },
  description: 'Plaace-analyser og eiendomsinformasjon for Eiendomsspars portefølje på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for tre eiendommer på Thorvald Meyers gate.',
  keywords: ['Eiendomsspar', 'eiendom', 'Plaace', 'eiendomsanalyse', 'Oslo', 'Grünerløkka', 'Thorvald Meyers gate'],
};

export default function EiendomssparLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('eiendomsspar');

  if (!tenant) {
    throw new Error('Eiendomsspar tenant not found');
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
