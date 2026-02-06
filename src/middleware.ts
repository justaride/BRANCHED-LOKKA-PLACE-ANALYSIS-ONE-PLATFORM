import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidTenant } from "@/config/tenants";

export function middleware(request: NextRequest) {
  if (process.env.DISABLE_TENANT_AUTH === "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Public routes - no authentication needed
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/pdf") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/data") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Extract tenant from URL (first segment after /)
  const segments = pathname.split("/").filter(Boolean);
  const tenantSlug = segments[0];

  // Validate tenant exists
  if (!tenantSlug || !isValidTenant(tenantSlug)) {
    // Invalid tenant, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check authentication cookie for this tenant
  const authCookie = request.cookies.get(`auth-${tenantSlug}`);

  if (!authCookie || authCookie.value !== "authenticated") {
    // Not authenticated, redirect to login with return URL
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("tenant", tenantSlug);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, pdf, data, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|pdf|fonts|data).*)",
  ],
};
