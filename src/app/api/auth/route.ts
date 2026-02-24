import { NextRequest, NextResponse } from 'next/server';
import { getTenant } from '@/config/tenants';
import { createSessionToken, generateOTP, createOTPToken, verifyOTPToken } from '@/lib/auth';
import { sendOTPEmail } from '@/lib/email';
import { isEmailAllowed } from '@/lib/tenant-emails';

const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const MAX_OTP_REQUESTS = 5;
const MAX_CODE_ATTEMPTS = 5;
const SESSION_MAX_AGE = 60 * 60 * 24 * 90;

type RateLimitEntry = { count: number; resetAt: number };
const otpRequestLimits = new Map<string, RateLimitEntry>();
const codeAttemptLimits = new Map<string, RateLimitEntry>();

function isRateLimited(map: Map<string, RateLimitEntry>, key: string, max: number): boolean {
  const now = Date.now();
  const entry = map.get(key);

  if (!entry || now > entry.resetAt) {
    map.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > max;
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

async function handleRequestOTP(
  body: { email?: string; tenant?: string },
  request: NextRequest
): Promise<NextResponse> {
  const { email, tenant } = body;

  if (!email || !tenant) {
    return NextResponse.json({ error: 'E-post og tenant er påkrevd' }, { status: 400 });
  }

  const tenantConfig = getTenant(tenant);
  if (!tenantConfig) {
    return NextResponse.json({ error: 'Ugyldig tenant' }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const ip = getClientIP(request);
  const rateLimitKey = `${ip}:${normalizedEmail}`;

  if (isRateLimited(otpRequestLimits, rateLimitKey, MAX_OTP_REQUESTS)) {
    return NextResponse.json(
      { error: 'For mange forsøk. Vennligst vent noen minutter.' },
      { status: 429 }
    );
  }

  if (!isEmailAllowed(tenant, normalizedEmail)) {
    return NextResponse.json({ success: true });
  }

  const code = generateOTP();
  const sent = await sendOTPEmail(normalizedEmail, code, tenantConfig.displayName);

  if (!sent) {
    return NextResponse.json(
      { error: 'Kunne ikke sende e-post. Prøv igjen senere.' },
      { status: 500 }
    );
  }

  const otpToken = await createOTPToken(code, normalizedEmail, tenant);

  const response = NextResponse.json({ success: true });
  response.cookies.set('otp-pending', otpToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 5 * 60,
    path: '/',
  });

  return response;
}

async function handleVerifyOTP(
  body: { email?: string; tenant?: string; code?: string },
  request: NextRequest
): Promise<NextResponse> {
  const { email, tenant, code } = body;

  if (!email || !tenant || !code) {
    return NextResponse.json(
      { error: 'E-post, tenant og kode er påkrevd' },
      { status: 400 }
    );
  }

  const tenantConfig = getTenant(tenant);
  if (!tenantConfig) {
    return NextResponse.json({ error: 'Ugyldig tenant' }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const ip = getClientIP(request);
  const rateLimitKey = `${ip}:${normalizedEmail}:verify`;

  if (isRateLimited(codeAttemptLimits, rateLimitKey, MAX_CODE_ATTEMPTS)) {
    return NextResponse.json(
      { error: 'For mange forsøk. Be om en ny kode.' },
      { status: 429 }
    );
  }

  const otpCookie = request.cookies.get('otp-pending');
  if (!otpCookie) {
    return NextResponse.json(
      { error: 'Koden har utløpt. Be om en ny kode.' },
      { status: 400 }
    );
  }

  const valid = await verifyOTPToken(otpCookie.value, code, normalizedEmail, tenant);
  if (!valid) {
    return NextResponse.json({ error: 'Ugyldig kode' }, { status: 401 });
  }

  const sessionToken = await createSessionToken(normalizedEmail, tenant);

  const response = NextResponse.json({ success: true });
  response.cookies.set(`auth-${tenant}`, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  response.cookies.delete('otp-pending');

  return response;
}

async function handlePassword(
  body: { tenant?: string; password?: string }
): Promise<NextResponse> {
  const { tenant, password } = body;

  if (!tenant || !password) {
    return NextResponse.json(
      { error: 'Tenant og passord er påkrevd' },
      { status: 400 }
    );
  }

  const tenantConfig = getTenant(tenant);
  if (!tenantConfig) {
    return NextResponse.json({ error: 'Ugyldig tenant' }, { status: 400 });
  }

  const correctPassword = process.env[tenantConfig.passwordEnvVar];
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword && !adminPassword) {
    console.error('Missing password env var for tenant:', tenant);
    return NextResponse.json({ error: 'Serverkonfigurasjonsfeil' }, { status: 500 });
  }

  const isAdmin = adminPassword && password === adminPassword;
  const isTenant = correctPassword && password === correctPassword;

  if (!isAdmin && !isTenant) {
    return NextResponse.json({ error: 'Ugyldig passord' }, { status: 401 });
  }

  const email = isAdmin ? 'admin' : 'tenant-user';
  const sessionToken = await createSessionToken(email, tenant);

  const response = NextResponse.json({ success: true });
  response.cookies.set(`auth-${tenant}`, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action || 'password';

    switch (action) {
      case 'request-otp':
        return handleRequestOTP(body, request);
      case 'verify-otp':
        return handleVerifyOTP(body, request);
      case 'password':
        return handlePassword(body);
      default:
        return NextResponse.json({ error: 'Ugyldig handling' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Intern serverfeil' }, { status: 500 });
  }
}
