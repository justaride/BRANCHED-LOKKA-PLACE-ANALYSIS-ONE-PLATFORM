"use client";

import { classifyDelta, type EventImpactAnalysis, type EventImpactMetric } from "@/lib/event-impact";

interface EventImpactCardProps {
  impact: EventImpactAnalysis;
  compact?: boolean;
}

function formatNumber(n: number): string {
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1) + " M";
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(0) + " k";
  return n.toLocaleString("nb-NO");
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatDateRange(start: string, end: string): string {
  if (start === end) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

const DELTA_STYLE: Record<string, string> = {
  sterk_positiv: "text-emerald-700 bg-emerald-50",
  positiv: "text-emerald-600 bg-emerald-50/60",
  noytral: "text-gray-500 bg-gray-50",
  negativ: "text-orange-700 bg-orange-50",
  sterk_negativ: "text-red-700 bg-red-50",
};

const KONFIDENS_STYLE: Record<string, string> = {
  høy: "text-emerald-700 bg-emerald-100",
  middels: "text-amber-700 bg-amber-100",
  lav: "text-gray-600 bg-gray-100",
};

function DeltaPill({ pct }: { pct: number }) {
  const klasse = classifyDelta(pct);
  const arrow = pct > 0.5 ? "↑" : pct < -0.5 ? "↓" : "→";
  const sign = pct > 0 ? "+" : "";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${DELTA_STYLE[klasse]}`}
    >
      <span>{arrow}</span>
      <span>
        {sign}
        {pct.toFixed(1)}%
      </span>
    </span>
  );
}

function MetricBlock({
  label,
  icon,
  metric,
  unit,
}: {
  label: string;
  icon: string;
  metric: EventImpactMetric;
  unit: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/60 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span className="text-base">{icon}</span>
          <span>{label}</span>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${KONFIDENS_STYLE[metric.konfidens]}`}
        >
          Konfidens: {metric.konfidens}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <div className="text-gray-500">Baseline</div>
          <div className="mt-0.5 font-semibold text-gray-900">
            {formatNumber(metric.baseline)} {unit}
          </div>
        </div>
        <div>
          <div className="text-gray-500">Under</div>
          <div className="mt-0.5 font-semibold text-gray-900">
            {formatNumber(metric.event)} {unit}
          </div>
          <div className="mt-1">
            <DeltaPill pct={metric.delta_event_pct} />
          </div>
        </div>
        <div>
          <div className="text-gray-500">Etter</div>
          <div className="mt-0.5 font-semibold text-gray-900">
            {formatNumber(metric.post)} {unit}
          </div>
          <div className="mt-1">
            <DeltaPill pct={metric.delta_post_pct} />
          </div>
        </div>
      </div>

      <div className="mt-2 text-[10px] text-gray-400">
        {metric.sample_size_baseline} baseline-dager
      </div>
    </div>
  );
}

export default function EventImpactCard({ impact, compact = false }: EventImpactCardProps) {
  const harData = impact.besok || impact.omsetning || impact.flyt;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/50 shadow-sm">
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <h3 className="text-base font-semibold text-natural-forest">
          {impact.event_navn}
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">
          {formatDateRange(impact.event_dato, impact.event_slutt)}
        </p>
      </div>

      <div className={`space-y-3 p-4 ${compact ? "" : "md:p-5"}`}>
        {!harData && (
          <p className="text-sm text-gray-500">
            Ingen overlappende data for dette arrangementet.
          </p>
        )}

        {impact.besok && (
          <MetricBlock label="Besøk" icon="👣" metric={impact.besok} unit="/ dag" />
        )}
        {impact.omsetning && (
          <MetricBlock
            label="Omsetning"
            icon="💰"
            metric={impact.omsetning}
            unit="kr / dag"
          />
        )}
        {impact.flyt && (
          <MetricBlock label="Flyt" icon="🔀" metric={impact.flyt} unit="/ dag" />
        )}

        <div className="border-t border-gray-100 pt-2 text-[10px] text-gray-400">
          Sammenligning: {impact.window.pre_start} → {impact.window.pre_end} (baseline) ·{" "}
          {impact.window.post_start} → {impact.window.post_end} (etter)
        </div>
      </div>
    </div>
  );
}
