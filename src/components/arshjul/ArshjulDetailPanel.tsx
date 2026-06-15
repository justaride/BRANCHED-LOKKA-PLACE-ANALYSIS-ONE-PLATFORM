"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { HjulHendelse } from "@/types/arshjul";
import {
  KATEGORI_FARGE,
  KATEGORI_LABEL,
  STATUS_LABEL,
  formatDateRange,
} from "./arshjulShared";

interface Props {
  hendelse: HjulHendelse | null;
  onClose: () => void;
}

export default function ArshjulDetailPanel({ hendelse, onClose }: Props) {
  const reduce = useReducedMotion();

  return (
    <aside
      className="rounded-2xl border border-gray-200 bg-white p-5"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {hendelse ? (
          <motion.div
            key={hendelse.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: KATEGORI_FARGE[hendelse.kategori] }}
              />
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {KATEGORI_LABEL[hendelse.kategori]}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-natural-forest">
              {hendelse.tittel}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {formatDateRange(hendelse.start, hendelse.slutt)}
            </p>
            <p className="mt-2 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              {STATUS_LABEL[hendelse.status]}
            </p>
            {hendelse.beskrivelse && (
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {hendelse.beskrivelse}
              </p>
            )}
            {hendelse.ansvarlig && (
              <p className="mt-3 text-xs text-gray-500">
                Ansvarlig: {hendelse.ansvarlig}
              </p>
            )}
            {hendelse.lenke &&
              (hendelse.lenke.startsWith("/") ? (
                <Link
                  href={hendelse.lenke}
                  className="mt-4 inline-block text-sm text-natural-forest underline hover:no-underline"
                >
                  Se mer →
                </Link>
              ) : (
                <a
                  href={hendelse.lenke}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-natural-forest underline hover:no-underline"
                >
                  Se mer →
                </a>
              ))}
            <button
              type="button"
              onClick={onClose}
              className="mt-4 block text-xs text-gray-400 hover:text-gray-600"
            >
              Lukk
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="tom"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h3 className="text-base font-semibold text-natural-forest">
              Velg en hendelse
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Klikk en hendelse i hjulet eller agendaen for å se detaljer.
            </p>
            <p className="mt-4 text-xs text-gray-400">
              Tips: bruk piltastene for å bla mellom hendelser, og filtrene for å
              vise eller skjule kategorier.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
