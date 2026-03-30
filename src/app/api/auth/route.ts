import { NextRequest, NextResponse } from 'next/server';
import {
  createUnifiedSessionToken,
  verifyGoogleToken,
  resolveUserTenants,
} from '@/lib/auth';
import type { TenantSlug } from '@/config/tenants';
import { TENANTS } from '@/config/tenants';

const SESSION_MAX_AGE = 60 * 60 * 24 * 90;

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: SESSION_MAX_AGE,
  path: '/',
};

async function handleGoogle(body: { credential?: string }): Promise<NextResponse> {
  const { credential } = body;
  if (!credential) {
    return NextResponse.json({ error: 'Token mangler' }, { status: 400 });
  }

  const googleUser = await verifyGoogleToken(credential);
  if (!googleUser) {
    return NextResponse.json({ error: 'Ugyldig Google-token' }, { status: 401 });
  }

  const email = googleUser.email.trim().toLowerCase();
  const { tenants } = resolveUserTenants(email);

  const allTenants = tenants.length > 0
    ? tenants
    : (Object.keys(TENANTS) as TenantSlug[]);

  const token = await createUnifiedSessionToken(email, allTenants, 'main-board');

  const response = NextResponse.json({ success: true, tenants: allTenants });
  response.cookies.set('lokka-session', token, COOKIE_OPTS);
  return response;
}

async function handlePassword(body: { password?: string }): Promise<NextResponse> {
  const { password } = body;
  if (!password) {
    return NextResponse.json({ error: 'Passord er påkrevd' }, { status: 400 });
  }

  const platformPassword = process.env.PLATFORM_PASSWORD;
  if (!platformPassword) {
    return NextResponse.json({ error: 'Serverkonfigurasjonsfeil' }, { status: 500 });
  }

  if (password !== platformPassword) {
    return NextResponse.json({ error: 'Ugyldig passord' }, { status: 401 });
  }

  const allTenants = Object.keys(TENANTS) as TenantSlug[];
  const token = await createUnifiedSessionToken('platform-user', allTenants, 'main-board');

  const response = NextResponse.json({ success: true, tenants: allTenants });
  response.cookies.set('lokka-session', token, COOKIE_OPTS);
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action || 'password';

    switch (action) {
      case 'google':
        return handleGoogle(body);
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
