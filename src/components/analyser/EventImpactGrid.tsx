"use client";

import { useMemo, useState } from "react";
import EventImpactCard from "./EventImpactCard";
import {
  analyseEventImpacts,
  classifyDelta,
  type DailyDataPoint,
  type EventImpactAnalysis,
} from "@/lib/event-impact";
export type EventImpactGridEvent = {
  id: string;
  title: string;
  date: string;
  endDate?: string;
};

interface EventImpactGridProps {
  events: EventImpactGridEvent[];
  besokData?: DailyDataPoint[];
  omsetningData?: DailyDataPoint[];
}

type SortKey = "dato" | "besok" | "omsetning";

export default function EventImpactGrid({
  events,
  besokData,
  omsetningData,
}: EventImpactGridProps) {
  const [sortKey, setSortKey] = useState<SortKey>("dato");
  const [bareSignifikante, setBareSignifikante] = useState(false);

  const analyses: EventImpactAnalysis[] = useMemo(
    () =>
      analyseEventImpacts(events, {
        besok: besokData,
        omsetning: omsetningData,
      }),
    [events, besokData, omsetningData],
  );

  const filtered = useMemo(() => {
    let list = analyses;
    if (bareSignifikante) {
      list = list.filter((a) => {
        const b = a.besok?.delta_event_pct ?? 0;
        const o = a.omsetning?.delta_event_pct ?? 0;
        const klasse_b = classifyDelta(b);
        const klasse_o = classifyDelta(o);
        return (
          klasse_b !== "noytral" || klasse_o !== "noytral"
        );
      });
    }

    if (sortKey === "dato") {
      list = [...list].sort((a, b) => a.event_dato.localeCompare(b.event_dato));
    } else if (sortKey === "besok") {
      list = [...list].sort(
        (a, b) => (b.besok?.delta_event_pct ?? -999) - (a.besok?.delta_event_pct ?? -999),
      );
    } else if (sortKey === "omsetning") {
      list = [...list].sort(
        (a, b) =>
          (b.omsetning?.delta_event_pct ?? -999) - (a.omsetning?.delta_event_pct ?? -999),
      );
    }
    return list;
  }, [analyses, sortKey, bareSignifikante]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <SortButton current={sortKey} value="dato" onClick={setSortKey}>
            Dato
          </SortButton>
          <SortButton current={sortKey} value="besok" onClick={setSortKey}>
            Mest besøkseffekt
          </SortButton>
          <SortButton current={sortKey} value="omsetning" onClick={setSortKey}>
            Mest omsetningseffekt
          </SortButton>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={bareSignifikante}
            onChange={(e) => setBareSignifikante(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Vis bare signifikante effekter (±5%)
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
          Ingen arrangementer matcher filteret.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((impact) => (
            <EventImpactCard key={impact.event_id} impact={impact} />
          ))}
        </div>
      )}
    </div>
  );
}

function SortButton({
  current,
  value,
  onClick,
  children,
}: {
  current: SortKey;
  value: SortKey;
  onClick: (v: SortKey) => void;
  children: React.ReactNode;
}) {
  const aktiv = current === value;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
        aktiv
          ? "bg-natural-forest text-white"
          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}
