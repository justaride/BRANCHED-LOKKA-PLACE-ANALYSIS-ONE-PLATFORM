import { SignJWT, jwtVerify } from 'jose';
import type { TenantSlug } from '@/config/tenants';
import { TENANTS } from '@/config/tenants';

const ALGORITHM = 'HS256';
const SESSION_EXPIRY = '90d';
const OTP_EXPIRY = '10m';

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

type OTPPayload = {
  sub: string;
  code: string;
  purpose: 'otp';
  iat: number;
  exp: number;
};

export function generateOTP(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(array[0] % 1000000).padStart(6, '0');
}

export async function createOTPToken(email: string, code: string): Promise<string> {
  return new SignJWT({ sub: email, code, purpose: 'otp' })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(OTP_EXPIRY)
    .sign(getSecret());
}

export async function verifyOTPToken(token: string, code: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const p = payload as unknown as OTPPayload;
    if (p.purpose !== 'otp' || p.code !== code) return null;
    return p.sub;
  } catch {
    return null;
  }
}

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

export function isAllowedEmail(email: string): boolean {
  const raw = process.env.ALLOWED_EMAILS || '';
  const allowed = raw.split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}

export function getAllTenantSlugs(): TenantSlug[] {
  return Object.keys(TENANTS) as TenantSlug[];
}
