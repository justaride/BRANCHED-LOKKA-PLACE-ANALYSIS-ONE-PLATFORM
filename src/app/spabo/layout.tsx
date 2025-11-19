import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'SPABO Eiendom',
    template: '%s | SPABO',
  },
  description: 'Plaace-analyser og eiendomsinformasjon for SPABO Eiendoms portefølje på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for fem eiendommer i området.',
  keywords: ['SPABO', 'SPABO Eiendom', 'eiendom', 'Plaace', 'eiendomsanalyse', 'Oslo', 'Grünerløkka'],
};

export default function SpaboLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('spabo');

  if (!tenant) {
    throw new Error('SPABO tenant not found');
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
