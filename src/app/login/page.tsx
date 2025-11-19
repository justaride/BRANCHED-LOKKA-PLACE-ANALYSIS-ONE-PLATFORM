'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getTenant } from '@/config/tenants';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tenantSlug = searchParams.get('tenant') || 'main-board';
  const returnUrl = searchParams.get('from') || `/${tenantSlug}`;
  const tenant = getTenant(tenantSlug);

  useEffect(() => {
    if (!tenant) {
      router.push('/');
    }
  }, [tenant, router]);

  if (!tenant) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenant: tenantSlug,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success! Redirect to return URL
        router.push(returnUrl);
      } else {
        setError(data.error || 'Ugyldig passord');
        setLoading(false);
      }
    } catch (err) {
      setError('En feil oppstod. Vennligst prøv igjen.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Logg inn
            </h1>
            <p className="text-gray-600">{tenant.displayName}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Passord
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                required
                disabled={loading}
                autoFocus
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Logger inn...' : 'Logg inn'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              ← Tilbake til forsiden
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Laster...</div>}>
      <LoginForm />
    </Suspense>
  );
}
