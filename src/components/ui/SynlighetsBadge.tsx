import { cn } from '@/lib/utils';
import { NIVA_META, type Synlighetsniva } from '@/types/synlighet';

/**
 * Lite farget merke som viser delingsnivået til et felt/datapunkt.
 * Fargene følger 4-trinns skalaen i NIVA_META (grønn → blå → gul → rød),
 * en utvidelse av møtets trafikklys.
 *
 * Server-trygg (ingen hooks/handlers) — kan brukes i både server- og
 * klientkomponenter.
 */

const MERKE_KLASSER: Record<Synlighetsniva, string> = {
  felles: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  internt: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  fortrolig: 'bg-amber-50 text-amber-800 ring-amber-600/30',
  privat: 'bg-red-50 text-red-700 ring-red-600/20',
};

const PRIKK_KLASSER: Record<Synlighetsniva, string> = {
  felles: 'bg-emerald-500',
  internt: 'bg-sky-500',
  fortrolig: 'bg-amber-500',
  privat: 'bg-red-500',
};

interface SynlighetsBadgeProps {
  niva: Synlighetsniva;
  /** Vis kort etikett («Felles») i stedet for full («Felles / åpent»). */
  kort?: boolean;
  /** Vis beskrivelsen som hale etter etiketten. */
  visBeskrivelse?: boolean;
  className?: string;
}

export default function SynlighetsBadge({
  niva,
  kort = false,
  visBeskrivelse = false,
  className,
}: SynlighetsBadgeProps) {
  const meta = NIVA_META[niva];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        MERKE_KLASSER[niva],
        className,
      )}
      title={meta.beskrivelse}
    >
      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', PRIKK_KLASSER[niva])} aria-hidden />
      {kort ? meta.kortLabel : meta.label}
      {visBeskrivelse && (
        <span className="font-normal text-gray-500">— {meta.beskrivelse}</span>
      )}
    </span>
  );
}
