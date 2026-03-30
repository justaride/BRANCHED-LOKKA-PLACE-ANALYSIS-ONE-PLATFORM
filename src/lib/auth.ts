import { SignJWT, jwtVerify, createRemoteJWKSet } from 'jose';
import type { TenantSlug } from '@/config/tenants';
import { TENANTS } from '@/config/tenants';
import { getAllowedEmails, getAdminEmails } from '@/lib/tenant-emails';

const ALGORITHM = 'HS256';
const SESSION_EXPIRY = '90d';

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET environment variable is required');
  }
  return new TextEncoder().encode(secret);
}

export type UnifiedSessionPayload = {
  sub: string;
  tenants: TenantSlug[];
  loginTenant: TenantSlug;
  iat: number;
  exp: number;
};

export async function verifySessionToken(
  token: string
): Promise<UnifiedSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as UnifiedSessionPayload;
  } catch {
    return null;
  }
}

export async function createUnifiedSessionToken(
  email: string,
  tenants: TenantSlug[],
  loginTenant: TenantSlug
): Promise<string> {
  return new SignJWT({ sub: email, tenants, loginTenant })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRY)
    .sign(getSecret());
}

export function resolveUserTenants(
  email: string
): { tenants: TenantSlug[]; isAdmin: boolean } {
  const normalized = email.trim().toLowerCase();
  const adminEmails = getAdminEmails();
  const isAdmin = adminEmails.includes(normalized);

  if (isAdmin) {
    const allTenants = Object.keys(TENANTS) as TenantSlug[];
    return { tenants: allTenants, isAdmin: true };
  }

  const tenants: TenantSlug[] = [];
  for (const slug of Object.keys(TENANTS) as TenantSlug[]) {
    if (slug === 'main-board') continue;
    const allowed = getAllowedEmails(slug);
    if (allowed.includes(normalized)) {
      tenants.push(slug);
    }
  }

  if (tenants.length > 0) {
    tenants.push('main-board');
  }

  return { tenants, isAdmin: false };
}

const GOOGLE_JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/oauth2/v3/certs')
);

export async function verifyGoogleToken(
  idToken: string
): Promise<{ email: string; name?: string } | null> {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) throw new Error('GOOGLE_CLIENT_ID not configured');

    const { payload } = await jwtVerify(idToken, GOOGLE_JWKS, {
      issuer: ['https://accounts.google.com', 'accounts.google.com'],
      audience: clientId,
    });

    const email = payload.email as string | undefined;
    if (!payload.email_verified || !email) return null;

    return { email, name: payload.name as string | undefined };
  } catch {
    return null;
  }
}
