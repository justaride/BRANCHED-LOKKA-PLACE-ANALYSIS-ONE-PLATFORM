import { SignJWT, jwtVerify } from 'jose';

const ALGORITHM = 'HS256';
const SESSION_EXPIRY = '90d';
const OTP_EXPIRY = '5m';
const OTP_LENGTH = 6;

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET environment variable is required');
  }
  return new TextEncoder().encode(secret);
}

async function hashCode(code: string): Promise<string> {
  const secret = process.env.AUTH_SECRET || '';
  const data = new TextEncoder().encode(code + secret);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createSessionToken(email: string, tenant: string): Promise<string> {
  return new SignJWT({ sub: email, tenant })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRY)
    .sign(getSecret());
}

export type SessionPayload = {
  sub: string;
  tenant: string;
  iat: number;
  exp: number;
};

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export function generateOTP(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(array[0] % 10 ** OTP_LENGTH).padStart(OTP_LENGTH, '0');
}

export async function createOTPToken(
  code: string,
  email: string,
  tenant: string
): Promise<string> {
  const hashedCode = await hashCode(code);
  return new SignJWT({ email, tenant, code: hashedCode, purpose: 'otp' })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(OTP_EXPIRY)
    .sign(getSecret());
}

export async function verifyOTPToken(
  token: string,
  code: string,
  email: string,
  tenant: string
): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.purpose !== 'otp') return false;
    if (payload.email !== email) return false;
    if (payload.tenant !== tenant) return false;
    const hashedCode = await hashCode(code);
    return payload.code === hashedCode;
  } catch {
    return false;
  }
}
