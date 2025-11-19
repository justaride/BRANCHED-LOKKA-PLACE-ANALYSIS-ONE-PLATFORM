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

    if (!correctPassword) {
      console.error(
        `Missing environment variable: ${tenantConfig.passwordEnvVar}`
      );
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify password
    if (password === correctPassword) {
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
