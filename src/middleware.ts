import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidTenant } from '@/config/tenants';
import { verifySessionToken, createUnifiedSessionToken } from '@/lib/auth';

const SLIDING_REFRESH_DAYS = 30;
const SESSION_MAX_AGE = 60 * 60 * 24 * 90;

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: SESSION_MAX_AGE,
  path: '/',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (process.env.MAINTENANCE_MODE === 'true') {
    if (pathname === '/maintenance' || pathname.startsWith('/_next') || pathname === '/favicon.ico') {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL('/maintenance', request.url));
  }

  if (process.env.DISABLE_TENANT_AUTH === 'true') {
    return NextResponse.next();
  }

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

  const cookie = request.cookies.get('lokka-session');
  if (cookie) {
    const payload = await verifySessionToken(cookie.value);
    if (payload) {
      const response = NextResponse.next();
      setCacheHeaders(response);

      const ageInDays = (Date.now() / 1000 - payload.iat) / 86400;
      if (ageInDays > SLIDING_REFRESH_DAYS) {
        const newToken = await createUnifiedSessionToken(
          payload.sub,
          payload.tenants,
          payload.loginTenant
        );
        response.cookies.set('lokka-session', newToken, COOKIE_OPTS);
      }

      return response;
    }
  }

  return redirectToLogin(request, pathname);
}

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL('/login', request.url);
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
