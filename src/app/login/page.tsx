'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const rawReturnUrl = searchParams.get('from') || '/main-board';
  const returnUrl = rawReturnUrl.startsWith('/') && !rawReturnUrl.startsWith('//') ? rawReturnUrl : '/main-board';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleCallback = useCallback(async (response: { credential: string }) => {
    setError('');
    setGoogleLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'google', credential: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Google-innlogging feilet');
        setGoogleLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => { window.location.href = returnUrl; }, 500);
    } catch {
      setError('En feil oppstod. Vennligst prøv igjen.');
      setGoogleLoading(false);
    }
  }, [returnUrl]);

  useEffect(() => {
    const initGoogle = () => {
      const google = (window as unknown as { google?: { accounts: { id: { initialize: (config: { client_id: string; callback: (response: { credential: string }) => void; auto_select: boolean }) => void; renderButton: (element: HTMLElement, config: { theme: string; size: string; width: number; text: string; locale: string }) => void } } } }).google;
      if (!google) return;

      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleGoogleCallback,
        auto_select: false,
      });

      const buttonDiv = document.getElementById('google-signin-button');
      if (buttonDiv) {
        google.accounts.id.renderButton(buttonDiv, {
          theme: 'outline',
          size: 'large',
          width: 350,
          text: 'signin_with',
          locale: 'no',
        });
      }
    };

    if ((window as unknown as { google?: unknown }).google) {
      initGoogle();
    } else {
      (window as unknown as { onGoogleLibraryLoad?: () => void }).onGoogleLibraryLoad = initGoogle;
    }
  }, [handleGoogleCallback]);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'password', password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => { window.location.href = returnUrl; }, 500);
      } else {
        setError(data.error || 'Ugyldig passord');
        setLoading(false);
      }
    } catch {
      setError('En feil oppstod. Vennligst prøv igjen.');
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-900">Logg inn</h1>
              <p className="text-gray-600">Løkka Gårdeierforening & Natural State</p>
            </div>

            {/* Google Sign-In */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-gray-700">Natural State-teamet</p>
              {googleLoading ? (
                <div className="flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-3 text-gray-600">
                  <Spinner /> Logger inn...
                </div>
              ) : (
                <div id="google-signin-button" className="flex justify-center" />
              )}
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">eller</span>
              </div>
            </div>

            {/* Password Login */}
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Passord
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Skriv inn passord"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                  disabled={loading || success}
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
                  Innlogging vellykket! Videresender...
                </div>
              )}

              <button
                type="submit"
                disabled={loading || success}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
              >
                {success ? (
                  <span className="flex items-center justify-center gap-2"><Spinner /> Videresender...</span>
                ) : loading ? (
                  <span className="flex items-center justify-center gap-2"><Spinner /> Logger inn...</span>
                ) : (
                  'Logg inn'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-blue-600 hover:text-blue-800">
                &larr; Tilbake til forsiden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Laster...</div>}>
      <LoginForm />
    </Suspense>
  );
}
