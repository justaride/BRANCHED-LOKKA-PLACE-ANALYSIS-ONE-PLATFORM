import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidTenant } from '@/config/tenants';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (process.env.MAINTENANCE_MODE === 'true') {
    if (pathname === '/maintenance' || pathname.startsWith('/_next') || pathname === '/favicon.ico') {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL('/maintenance', request.url));
  }

  if (
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/documents') ||
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|documents|pdf|fonts|data).*)',
  ],
};
