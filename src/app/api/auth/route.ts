import { NextRequest, NextResponse } from 'next/server';
import {
  generateOTP,
  createOTPToken,
  verifyOTPToken,
  createUnifiedSessionToken,
  isAllowedEmail,
  getAllTenantSlugs,
} from '@/lib/auth';
import { sendOTPEmail } from '@/lib/email';

const SESSION_MAX_AGE = 60 * 60 * 24 * 90;

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: SESSION_MAX_AGE,
  path: '/',
};

async function handleSendOTP(body: { email?: string }): Promise<NextResponse> {
  const email = body.email?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: 'E-post er påkrevd' }, { status: 400 });
  }

  if (!isAllowedEmail(email)) {
    return NextResponse.json(
      { error: 'Denne e-postadressen har ikke tilgang' },
      { status: 403 }
    );
  }

  const code = generateOTP();
  const otpToken = await createOTPToken(email, code);

  await sendOTPEmail(email, code);

  const response = NextResponse.json({ success: true, step: 'otp-sent' });
  response.cookies.set('lokka-otp', otpToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 600,
    path: '/',
  });
  return response;
}

async function handleVerifyOTP(
  body: { code?: string },
  otpCookie: string
): Promise<NextResponse> {
  const code = body.code?.trim();
  if (!code) {
    return NextResponse.json({ error: 'Kode er påkrevd' }, { status: 400 });
  }

  const email = await verifyOTPToken(otpCookie, code);
  if (!email) {
    return NextResponse.json({ error: 'Ugyldig eller utløpt kode' }, { status: 401 });
  }

  const allTenants = getAllTenantSlugs();
  const token = await createUnifiedSessionToken(email, allTenants, 'main-board');

  const response = NextResponse.json({ success: true, step: 'authenticated' });
  response.cookies.set('lokka-session', token, COOKIE_OPTS);
  response.cookies.delete('lokka-otp');
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.action === 'verify-otp') {
      const otpCookie = request.cookies.get('lokka-otp')?.value;
      if (!otpCookie) {
        return NextResponse.json({ error: 'Ingen ventende kode. Prøv på nytt.' }, { status: 400 });
      }
      return handleVerifyOTP(body, otpCookie);
    }

    return handleSendOTP(body);
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Intern serverfeil' }, { status: 500 });
  }
}
