import { NextRequest, NextResponse } from 'next/server';
import { getTenant } from '@/config/tenants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenant, password } = body;

    if (!tenant || !password) {
      return NextResponse.json(
        { error: 'Missing tenant or password' },
        { status: 400 }
      );
    }

    // Get tenant config
    const tenantConfig = getTenant(tenant);

    if (!tenantConfig) {
      return NextResponse.json({ error: 'Invalid tenant' }, { status: 400 });
    }

    // Get password from environment
    const correctPassword = process.env[tenantConfig.passwordEnvVar];
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Debug logging for production
    console.log('Auth attempt:', {
      tenant,
      passwordEnvVar: tenantConfig.passwordEnvVar,
      hasCorrectPassword: !!correctPassword,
      hasAdminPassword: !!adminPassword,
      envVarExists: tenantConfig.passwordEnvVar in process.env,
    });

    if (!correctPassword) {
      console.error(
        `Missing environment variable: ${tenantConfig.passwordEnvVar}`
      );
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify password (either tenant-specific or admin password)
    const isAdminPassword = adminPassword && password === adminPassword;
    const isTenantPassword = password === correctPassword;

    console.log('Password verification:', {
      isAdminPassword,
      isTenantPassword,
      passwordLength: password?.length,
      correctPasswordLength: correctPassword?.length,
    });

    if (isAdminPassword || isTenantPassword) {
      const response = NextResponse.json({ success: true });

      // Set tenant-specific cookie
      response.cookies.set(`auth-${tenant}`, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
