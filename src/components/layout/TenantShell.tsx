import type { ReactNode } from 'react';
import type { TenantConfig } from '@/config/tenants';
import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface TenantShellProps {
  tenant: TenantConfig;
  children: ReactNode;
}

export default function TenantShell({ tenant, children }: TenantShellProps) {
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
