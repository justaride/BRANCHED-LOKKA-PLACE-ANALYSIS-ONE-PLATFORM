import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidTenant } from '@/config/tenants';
import type { TenantSlug } from '@/config/tenants';
import {
  verifySessionToken,
  createUnifiedSessionToken,
  isUnifiedPayload,
  resolveUserTenants,
} from '@/lib/auth';

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

  const unifiedCookie = request.cookies.get('lokka-session');
  if (unifiedCookie) {
    const payload = await verifySessionToken(unifiedCookie.value);
    if (payload && isUnifiedPayload(payload)) {
      if (payload.tenants.includes(tenantSlug as TenantSlug)) {
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
      return redirectToLogin(request, tenantSlug, pathname);
    }
  }

  const legacyCookie = request.cookies.get(`auth-${tenantSlug}`);
  if (!legacyCookie) {
    return redirectToLogin(request, tenantSlug, pathname);
  }

  if (legacyCookie.value === 'authenticated') {
    const response = NextResponse.next();
    setCacheHeaders(response);
    return response;
  }

  const legacyPayload = await verifySessionToken(legacyCookie.value);
  if (!legacyPayload) {
    return redirectToLogin(request, tenantSlug, pathname);
  }

  const response = NextResponse.next();
  setCacheHeaders(response);

  if (!isUnifiedPayload(legacyPayload)) {
    const { tenants } = resolveUserTenants(legacyPayload.sub);
    const loginTenant = legacyPayload.tenant as TenantSlug;
    const effectiveTenants =
      tenants.length > 0 ? tenants : [loginTenant, 'main-board' as const];
    const unifiedToken = await createUnifiedSessionToken(
      legacyPayload.sub,
      effectiveTenants,
      loginTenant
    );
    response.cookies.set('lokka-session', unifiedToken, COOKIE_OPTS);
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
