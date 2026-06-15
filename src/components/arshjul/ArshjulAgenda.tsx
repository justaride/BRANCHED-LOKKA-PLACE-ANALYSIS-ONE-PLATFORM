"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { HjulAr, HjulHendelse } from "@/types/arshjul";
import {
  KATEGORI_FARGE,
  KATEGORI_LABEL,
  STATUS_LABEL,
  formatDateRange,
  sorterHendelser,
} from "./arshjulShared";

interface Props {
  data: HjulAr;
  synlige: HjulHendelse[];
  valgtHendelse: HjulHendelse | null;
  onSelect: (h: HjulHendelse) => void;
}

const MAANED_NAVN = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function maanedAv(iso: string): number {
  return new Date(iso + "T00:00:00Z").getUTCMonth();
}

function kortDato(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export default function ArshjulAgenda({
  data,
  synlige,
  valgtHendelse,
  onSelect,
}: Props) {
  const reduce = useReducedMotion();

  const grupper = useMemo(() => {
    const sortert = sorterHendelser(synlige);
    const map = new Map<number, HjulHendelse[]>();
    for (const h of sortert) {
      const m = maanedAv(h.start);
      const list = map.get(m) ?? [];
      list.push(h);
      map.set(m, list);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [synlige]);

  const idagIso =
    new Date().getFullYear() === data.ar ? new Date().toISOString().slice(0, 10) : null;
  const nesteId = useMemo(() => {
    if (!idagIso) return null;
    const neste = sorterHendelser(synlige).find((h) => h.start >= idagIso);
    return neste?.id ?? null;
  }, [synlige, idagIso]);

  if (synlige.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
        <p className="text-sm text-gray-600">
          Ingen hendelser å vise. Juster filtrene under, eller bytt år.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="space-y-6">
        {grupper.map(([maaned, hendelser]) => (
          <section key={maaned}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {MAANED_NAVN[maaned]}
            </h3>
            <ul className="space-y-1.5">
              {hendelser.map((h, i) => {
                const erValgt = valgtHendelse?.id === h.id;
                const erNeste = nesteId === h.id;
                const dim = h.status === "avlyst";
                return (
                  <motion.li
                    key={h.id}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : i * 0.02 }}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(h)}
                      aria-pressed={erValgt}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                        erValgt
                          ? "border-natural-forest/40 bg-natural-forest/5 ring-1 ring-natural-forest/30"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      } ${dim ? "opacity-50" : ""}`}
                    >
                      <span
                        className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: KATEGORI_FARGE[h.kategori] }}
                        aria-hidden
                      />
                      <span className="w-16 shrink-0 text-xs font-medium tabular-nums text-gray-500">
                        {kortDato(h.start)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span
                            className={`truncate text-sm font-medium ${
                              h.status === "avlyst"
                                ? "text-gray-500 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {h.tittel}
                          </span>
                          {erNeste && (
                            <span className="shrink-0 rounded-full bg-natural-forest px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                              Neste
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 flex items-center gap-2 text-xs text-gray-400">
                          <span>{KATEGORI_LABEL[h.kategori]}</span>
                          <span aria-hidden>·</span>
                          <span>{STATUS_LABEL[h.status]}</span>
                          {h.slutt && h.slutt !== h.start && (
                            <>
                              <span aria-hidden>·</span>
                              <span>{formatDateRange(h.start, h.slutt)}</span>
                            </>
                          )}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
