'use client';

import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';

export default function Footer() {
  const tenant = useTenant();

  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="mx-auto max-w-[2100px] px-[4vw]">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-gray-600 md:text-left">
            <p>
              &copy; {new Date().getFullYear()} Løkka Gårdeierforening og
              Natural State
            </p>
            <p className="text-sm">Alle rettigheter reservert</p>
          </div>

          <div className="flex gap-4 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-lokka-primary"
            >
              Hjem
            </Link>
            <Link
              href={`/${tenant.slug}/om-prosjektet`}
              className="text-gray-600 hover:text-lokka-primary"
            >
              Om Prosjektet
            </Link>
            {process.env.NEXT_PUBLIC_GOOGLE_FORM_URL && (
              <a
                href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-lokka-primary"
              >
                Tilbakemelding
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
