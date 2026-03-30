import { NextRequest, NextResponse } from 'next/server';
import { createUnifiedSessionToken } from '@/lib/auth';
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
  const token = await createUnifiedSessionToken('member', allTenants, 'main-board');

  const response = NextResponse.json({ success: true });
  response.cookies.set('lokka-session', token, COOKIE_OPTS);
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return handlePassword(body);
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Intern serverfeil' }, { status: 500 });
  }
}
