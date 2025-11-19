import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Malling & Co',
    template: '%s | Malling & Co',
  },
  description: 'Plaace-analyser og eiendomsinformasjon for Malling & Cos eiendommer på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for to eiendommer i området.',
  keywords: ['Malling & Co', 'eiendom', 'Plaace', 'eiendomsanalyse', 'Oslo', 'Grünerløkka'],
};

export default function MailingCoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('malling-co');

  if (!tenant) {
    throw new Error('Malling & Co tenant not found');
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
