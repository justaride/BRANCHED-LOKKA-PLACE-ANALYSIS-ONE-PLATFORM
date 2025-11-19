import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Maya Eiendom',
    template: '%s | Maya Eiendom',
  },
  description: 'Plaace-analyser og eiendomsinformasjon for Maya Eiendoms eiendommer på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for fire eiendommer på Markveien.',
  keywords: ['Maya Eiendom', 'eiendom', 'Plaace', 'eiendomsanalyse', 'Oslo', 'Grünerløkka', 'Markveien'],
};

export default function MayaEiendomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('maya-eiendom');

  if (!tenant) {
    throw new Error('Maya Eiendom tenant not found');
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
