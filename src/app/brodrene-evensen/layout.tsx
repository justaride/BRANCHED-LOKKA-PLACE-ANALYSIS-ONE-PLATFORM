import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Brødrene Evensen',
    template: '%s | Brødrene Evensen',
  },
  description: 'Plaace-analyser og eiendomsinformasjon for Brødrene Evensens eiendommer på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for tre eiendommer i området.',
  keywords: ['Brødrene Evensen', 'eiendom', 'Plaace', 'eiendomsanalyse', 'Oslo', 'Grünerløkka'],
};

export default function BrodreneEvensenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('brodrene-evensen');

  if (!tenant) {
    throw new Error('Brødrene Evensen tenant not found');
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
