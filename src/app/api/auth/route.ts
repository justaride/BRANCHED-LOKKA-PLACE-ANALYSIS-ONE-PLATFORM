import { NextRequest, NextResponse } from 'next/server';
import { createUnifiedSessionToken, resolveUserTenants } from '@/lib/auth';
import type { TenantSlug } from '@/config/tenants';

const SESSION_MAX_AGE = 60 * 60 * 24 * 90;

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: SESSION_MAX_AGE,
  path: '/',
};

async function handlePassword(body: {
  email?: string;
  password?: string;
}): Promise<NextResponse> {
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: 'E-post og passord er påkrevd' },
      { status: 400 }
    );
  }

  const platformPassword = process.env.PLATFORM_PASSWORD;
  if (!platformPassword) {
    return NextResponse.json(
      { error: 'Serverkonfigurasjonsfeil' },
      { status: 500 }
    );
  }

  if (password !== platformPassword) {
    return NextResponse.json(
      { error: 'Ugyldig e-post eller passord' },
      { status: 401 }
    );
  }

  const normalized = email.trim().toLowerCase();
  const { tenants } = resolveUserTenants(normalized);

  if (tenants.length === 0) {
    return NextResponse.json(
      { error: 'Denne e-postadressen har ikke tilgang. Kontakt din gårdeier.' },
      { status: 403 }
    );
  }

  const loginTenant = tenants.find((t) => t !== 'main-board') || tenants[0];
  const token = await createUnifiedSessionToken(
    normalized,
    tenants,
    loginTenant as TenantSlug
  );

  const redirectTo = `/${loginTenant}`;

  const response = NextResponse.json({ success: true, redirectTo });
  response.cookies.set('lokka-session', token, COOKIE_OPTS);
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return handlePassword(body);
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Intern serverfeil' },
      { status: 500 }
    );
  }
}
