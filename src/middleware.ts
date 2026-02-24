import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidTenant } from '@/config/tenants';
import { verifySessionToken, createSessionToken } from '@/lib/auth';

const SLIDING_REFRESH_DAYS = 30;
const SESSION_MAX_AGE = 60 * 60 * 24 * 90;

export async function middleware(request: NextRequest) {
  if (process.env.DISABLE_TENANT_AUTH === 'true') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    pathname === '/' ||
    pathname === '/login' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/pdf') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/data') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const tenantSlug = segments[0];

  if (!tenantSlug || !isValidTenant(tenantSlug)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const authCookie = request.cookies.get(`auth-${tenantSlug}`);

  if (!authCookie) {
    return redirectToLogin(request, tenantSlug, pathname);
  }

  if (authCookie.value === 'authenticated') {
    const response = NextResponse.next();
    setCacheHeaders(response);
    return response;
  }

  const payload = await verifySessionToken(authCookie.value);

  if (!payload) {
    return redirectToLogin(request, tenantSlug, pathname);
  }

  const response = NextResponse.next();
  setCacheHeaders(response);

  const ageInDays = (Date.now() / 1000 - payload.iat) / 86400;
  if (ageInDays > SLIDING_REFRESH_DAYS) {
    const newToken = await createSessionToken(payload.sub, payload.tenant);
    response.cookies.set(`auth-${tenantSlug}`, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    });
  }

  return response;
}

function redirectToLogin(request: NextRequest, tenantSlug: string, pathname: string) {
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('tenant', tenantSlug);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

function setCacheHeaders(response: NextResponse) {
  response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  response.headers.set('Vary', 'Cookie');
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|pdf|fonts|data).*)',
  ],
};
