'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/lib/tenant-context';

export default function Navigation() {
  const pathname = usePathname();
  const tenant = useTenant();

  const linkClass = (path: string) =>
    `font-medium transition-colors ${
      pathname === path
        ? 'text-lokka-primary'
        : 'text-gray-600 hover:text-lokka-primary'
    }`;

  return (
    <nav className="flex items-center gap-6">
      {/* Home */}
      <Link href={`/${tenant.slug}`} className={linkClass(`/${tenant.slug}`)}>
        Hjem
      </Link>

      {/* Main Board: Show Analyser */}
      {tenant.features.showAnalyser && (
        <Link
          href={`/${tenant.slug}/analyser`}
          className={linkClass(`/${tenant.slug}/analyser`)}
        >
          Analyser
        </Link>
      )}

      {/* Companies: Show Eiendommer */}
      {tenant.features.showEiendommer && (
        <Link
          href={`/${tenant.slug}/eiendommer`}
          className={linkClass(`/${tenant.slug}/eiendommer`)}
        >
          Eiendommer
        </Link>
      )}

      {/* Om Prosjektet */}
      <Link
        href={`/${tenant.slug}/om-prosjektet`}
        className={linkClass(`/${tenant.slug}/om-prosjektet`)}
      >
        Om Prosjektet
      </Link>

      {/* Cross-tenant link: Main Board (only for company sites) */}
      {tenant.features.showMainBoardLink && (
        <Link
          href="/main-board"
          className="rounded-md bg-lokka-primary/10 px-4 py-2 font-medium text-lokka-primary transition-colors hover:bg-lokka-primary hover:text-white"
        >
          Områdeanalyse →
        </Link>
      )}
    </nav>
  );
}
