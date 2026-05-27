"use client";

import { useMemo, useState } from "react";
import { groupEndringerByYear } from "@/lib/eiendom-endringer";
import type { EiendomEndring, EndringType } from "@/types/eiendom-endring";

interface EndringsloggTimelineProps {
  endringer: EiendomEndring[];
  eiendomNavn: string;
  meldFeilHref?: string;
}

const TYPE_LABEL: Record<EndringType, string> = {
  innflytting: "Innflytting",
  utflytting: "Utflytting",
  navnebytte: "Navnebytte",
  kategoriendring: "Kategoriendring",
  bruksendring: "Bruksendring",
  oppussing: "Oppussing",
  notat: "Hendelse",
};

const TYPE_ICON: Record<EndringType, string> = {
  innflytting: "🟢",
  utflytting: "🔴",
  navnebytte: "🔵",
  kategoriendring: "🟡",
  bruksendring: "🟠",
  oppussing: "🔧",
  notat: "📝",
};

const TYPE_DOT_STYLE: Record<EndringType, string> = {
  innflytting: "bg-emerald-500",
  utflytting: "bg-red-500",
  navnebytte: "bg-blue-500",
  kategoriendring: "bg-amber-500",
  bruksendring: "bg-orange-500",
  oppussing: "bg-gray-500",
  notat: "bg-purple-500",
};

const KILDE_LABEL: Record<string, string> = {
  brreg: "Brønnøysund",
  manuell: "Manuell",
  gardeier: "Gårdeier",
  plaace: "Plaace",
};

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatDateRange(start: string, end?: string): string {
  if (!end || end === start) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

type Filter = "alle" | EndringType;

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: "alle", label: "Alle" },
  { value: "innflytting", label: "Innflyttinger" },
  { value: "utflytting", label: "Utflyttinger" },
  { value: "kategoriendring", label: "Endringer" },
  { value: "oppussing", label: "Oppussing" },
];

export default function EndringsloggTimeline({
  endringer,
  eiendomNavn,
  meldFeilHref,
}: EndringsloggTimelineProps) {
  const [filter, setFilter] = useState<Filter>("alle");

  const filtered = useMemo(() => {
    if (filter === "alle") return endringer;
    if (filter === "kategoriendring") {
      return endringer.filter(
        (e) =>
          e.type === "kategoriendring" ||
          e.type === "navnebytte" ||
          e.type === "bruksendring",
      );
    }
    return endringer.filter((e) => e.type === filter);
  }, [endringer, filter]);

  const grouped = useMemo(() => groupEndringerByYear(filtered), [filtered]);

  if (endringer.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center">
        <h3 className="text-lg font-semibold text-natural-forest">Endringslogg</h3>
        <p className="mt-2 text-sm text-gray-600">
          Ingen registrerte endringer for {eiendomNavn}.
        </p>
        {meldFeilHref && (
          <a
            href={meldFeilHref}
            className="mt-3 inline-block text-sm text-natural-forest underline hover:no-underline"
          >
            Legg til første hendelse
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-natural-forest">Endringslogg</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {endringer.length} registrert{endringer.length === 1 ? "" : "e"} hendels
            {endringer.length === 1 ? "e" : "er"}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFilter(opt.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                filter === opt.value
                  ? "bg-natural-forest text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-500">
          Ingen hendelser matcher filteret.
        </p>
      ) : (
        <ol className="relative space-y-6">
          {grouped.map(({ year, items }) => (
            <li key={year}>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-sm font-bold text-natural-forest">{year}</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <ul className="space-y-3 border-l border-gray-200 pl-5">
                {items.map((e) => (
                  <li key={e.id} className="relative">
                    <span
                      className={`absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-white shadow ${TYPE_DOT_STYLE[e.type]}`}
                    />
                    <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{TYPE_ICON[e.type]}</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {TYPE_LABEL[e.type]}
                          </span>
                          {e.aktor_navn && (
                            <span className="text-sm text-gray-700">
                              — {e.aktor_navn}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDateRange(e.dato, e.dato_til)}
                        </span>
                      </div>

                      {(e.fra || e.til) && (
                        <p className="mt-1.5 text-xs text-gray-600">
                          {e.fra && <span className="line-through opacity-60">{e.fra}</span>}
                          {e.fra && e.til && <span className="mx-1">→</span>}
                          {e.til && <span className="font-medium">{e.til}</span>}
                        </p>
                      )}

                      {e.notat && (
                        <p className="mt-1.5 text-sm italic text-gray-700">
                          «{e.notat}»
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
                        {e.kilde && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5">
                            Kilde: {KILDE_LABEL[e.kilde] ?? e.kilde}
                          </span>
                        )}
                        {e.registrert_av && (
                          <span>Registrert av {e.registrert_av}</span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}

      {meldFeilHref && (
        <div className="mt-5 border-t border-gray-100 pt-4 text-center">
          <a
            href={meldFeilHref}
            className="text-sm text-natural-forest hover:underline"
          >
            Meld inn ny endring →
          </a>
        </div>
      )}
    </div>
  );
}
