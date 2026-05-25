import { getTenant } from '@/config/tenants';

export function getAllowedEmails(tenant: string): string[] {
  const tenantConfig = getTenant(tenant);
  if (!tenantConfig) return [];

  const envVar = tenantConfig.emailsEnvVar;
  const raw = process.env[envVar] || getLegacyTenantEmailsEnv(tenant);

  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function getLegacyTenantEmailsEnv(tenant: string): string {
  if (tenant === 'aspelin-reitan') {
    return process.env.ASPELIN_RAMM_EMAILS || '';
  }

  return '';
}

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS || '';
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAllowed(tenant: string, email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const tenantEmails = getAllowedEmails(tenant);
  const adminEmails = getAdminEmails();

  return tenantEmails.includes(normalized) || adminEmails.includes(normalized);
}
