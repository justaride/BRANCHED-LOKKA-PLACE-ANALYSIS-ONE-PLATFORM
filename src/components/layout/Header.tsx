'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/lib/tenant-context';
import Navigation from './Navigation';

export default function Header() {
  const pathname = usePathname();
  const tenant = useTenant();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-[2100px] px-[4vw]">
        <div className="flex h-20 items-center justify-between py-[2vw]">
          <div className="flex items-center gap-3">
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
