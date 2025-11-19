import { getTenant } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'SiO Studentsamskipnaden',
    template: '%s | SiO',
  },
  description: 'Plaace-analyser og eiendomsinformasjon for SiOs studentboliger på Grünerløkka.',
  keywords: ['SiO', 'studentbolig', 'Plaace', 'eiendomsanalyse', 'Oslo', 'Grünerløkka'],
};

export default function SioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = getTenant('sio');

  if (!tenant) {
    throw new Error('SiO tenant not found');
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
