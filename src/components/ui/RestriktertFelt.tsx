import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { erMaskert, NIVA_META, type Synlighetsniva } from '@/types/synlighet';
import SynlighetsBadge from './SynlighetsBadge';

/**
 * Rendrer et felt som kan være maskert av synlighetslaget.
 *
 * - Hvis `verdi` er en MaskertVerdi-sentinel (resultat av maskerEntitet/
 *   maskerVerdi), vises en låst plassholder med {@link SynlighetsBadge} og
 *   forklaring.
 * - Ellers rendres `children` (eller selve verdien hvis den er en primitiv).
 *
 * Du kan også tvinge restriktert visning via `niva` (f.eks. når serveren
 * utelot verdien helt): `<RestriktertFelt niva="privat" verdi={null} />`.
 *
 * Server-trygg (ingen hooks/handlers).
 */

interface RestriktertFeltProps {
  /** Verdien å vise. Kan være en MaskertVerdi-sentinel eller en faktisk verdi. */
  verdi: unknown;
  /** Tving restriktert visning på dette nivået når `verdi` ikke er en sentinel. */
  niva?: Synlighetsniva;
  /** Egendefinert rendering av den faktiske (ikke-maskerte) verdien. */
  children?: ReactNode;
  /** Tekst som vises i stedet for verdien når den er skjult. */
  skjultTekst?: string;
  /** Vis nivå-badge ved siden av plassholderen (default true). */
  visBadge?: boolean;
  className?: string;
}

function erPrimitiv(v: unknown): v is string | number | boolean {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';
}

export default function RestriktertFelt({
  verdi,
  niva,
  children,
  skjultTekst = 'Skjult',
  visBadge = true,
  className,
}: RestriktertFeltProps) {
  const maskert = erMaskert(verdi);
  const restriktert = maskert || (niva !== undefined && verdi == null);

  if (restriktert) {
    const nivaEff: Synlighetsniva = maskert ? verdi.niva : (niva ?? 'privat');
    return (
      <span
        className={cn('inline-flex items-center gap-2 text-gray-400', className)}
        title={NIVA_META[nivaEff].beskrivelse}
      >
        <span className="inline-flex items-center gap-1 italic">
          <LåsIkon />
          {skjultTekst}
        </span>
        {visBadge && <SynlighetsBadge niva={nivaEff} kort />}
      </span>
    );
  }

  if (children !== undefined) {
    return <span className={className}>{children}</span>;
  }

  return <span className={className}>{erPrimitiv(verdi) ? String(verdi) : null}</span>;
}

function LåsIkon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3" y="7" width="10" height="6.5" rx="1.25" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}
