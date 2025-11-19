'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { TenantConfig } from '@/config/tenants';

const TenantContext = createContext<TenantConfig | null>(null);

export function TenantProvider({
  tenant,
  children,
}: {
  tenant: TenantConfig;
  children: ReactNode;
}) {
  return (
    <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}
