'use client';

import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import Navigation from './Navigation';

export default function Header() {
  const tenant = useTenant();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-[2100px] px-[4vw]">
        <div className="flex h-20 items-center justify-between py-[2vw]">
          <div className="flex items-center gap-3">
            {/* Home button - visible on all pages */}
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-lokka-light"
              title="Gå til hovedsiden"
            >
              <svg className="h-5 w-5 text-lokka-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300" />

            {/* Company sites: Show "by Natural State, for Company" */}
            {tenant.type === 'company' && (
              <>
                <span className="text-sm font-light text-gray-500">by</span>
                <Link
                  href={`/${tenant.slug}`}
                  className="flex items-center transition-opacity hover:opacity-70"
                >
                  <span className="text-lg font-semibold text-lokka-primary">
                    Natural State
                  </span>
                </Link>
                <span className="text-lg text-gray-400">,</span>
                <span className="text-sm font-light text-gray-500">for</span>
                {tenant.websiteUrl ? (
                  <a
                    href={tenant.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center transition-opacity hover:opacity-70"
                  >
                    <span className="text-lg font-semibold text-lokka-primary">
                      {tenant.name}
                    </span>
                  </a>
                ) : (
                  <span className="text-lg font-semibold text-lokka-primary">
                    {tenant.name}
                  </span>
                )}
              </>
            )}

            {/* Main Board: Show only Natural State */}
            {tenant.type === 'main-board' && (
              <Link
                href="/main-board"
                className="flex items-center transition-opacity hover:opacity-70"
              >
                <span className="text-xl font-bold text-lokka-primary">
                  Natural State
                </span>
              </Link>
            )}
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
