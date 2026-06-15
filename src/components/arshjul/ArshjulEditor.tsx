"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { HjulHendelse, HjulKategori, HjulStatus } from "@/types/arshjul";
import {
  GJENTAKELSE_OPSJONER,
  KATEGORI_LABEL,
  KATEGORI_REKKEFOLGE,
  STATUS_LABEL,
  byggGjentakelse,
  lesGjentakelse,
  type GjentakelsePreset,
} from "./arshjulShared";

const STATUSER: HjulStatus[] = ["planlagt", "bekreftet", "gjennomfort", "avlyst"];

interface Props {
  /** null = ny hendelse */
  initial: HjulHendelse | null;
  /** Forhåndsutfylling ved ny hendelse (f.eks. fra en kandidat). Lagres som ny. */
  prefill?: Partial<HjulHendelse> | null;
  onClose: () => void;
  onSaved: () => void;
}

const felt =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-natural-forest focus:outline-none focus:ring-1 focus:ring-natural-forest";

export default function ArshjulEditor({
  initial,
  prefill,
  onClose,
  onSaved,
}: Props) {
  const reduce = useReducedMotion();
  const [tittel, setTittel] = useState(initial?.tittel ?? prefill?.tittel ?? "");
  const [start, setStart] = useState(initial?.start ?? prefill?.start ?? "");
  const [slutt, setSlutt] = useState(initial?.slutt ?? prefill?.slutt ?? "");
  const [kategori, setKategori] = useState<HjulKategori>(
    initial?.kategori ?? prefill?.kategori ?? "arrangement",
  );
  const [status, setStatus] = useState<HjulStatus>(
    initial?.status ?? prefill?.status ?? "planlagt",
  );
  const [beskrivelse, setBeskrivelse] = useState(
    initial?.beskrivelse ?? prefill?.beskrivelse ?? "",
  );
  const [lenke, setLenke] = useState(initial?.lenke ?? prefill?.lenke ?? "");
  const [ansvarlig, setAnsvarlig] = useState(
    initial?.ansvarlig ?? prefill?.ansvarlig ?? "",
  );
  const [gjentakelse, setGjentakelse] = useState<GjentakelsePreset | "">(() => {
    return lesGjentakelse(initial?.gjentakelse ?? prefill?.gjentakelse)?.preset ?? "";
  });
  const [gjentakelseTil, setGjentakelseTil] = useState(() => {
    return lesGjentakelse(initial?.gjentakelse ?? prefill?.gjentakelse)?.until ?? "";
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!tittel.trim() || !start) {
      setError("Tittel og startdato er påkrevd.");
      return;
    }
    if (slutt && slutt < start) {
      setError("Sluttdato kan ikke være før startdato.");
      return;
    }
    if (gjentakelse && gjentakelseTil && gjentakelseTil < start) {
      setError("«Gjenta til» kan ikke være før startdato.");
      return;
    }
    setPending(true);
    const payload = {
      tittel: tittel.trim(),
      start,
      slutt: slutt || null,
      kategori,
      status,
      beskrivelse: beskrivelse.trim() || null,
      lenke: lenke.trim() || null,
      ansvarlig: ansvarlig.trim() || null,
      gjentakelse: gjentakelse
        ? byggGjentakelse(gjentakelse, gjentakelseTil || null)
        : null,
    };
    try {
      const res = initial
        ? await fetch(`/api/arshjul/${initial.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/arshjul", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(
          data?.error === "Database ikke konfigurert"
            ? "Lagring krever at databasen er koblet til (DATABASE_URL)."
            : (data?.error ?? `Lagring feilet (${res.status}).`),
        );
        setPending(false);
        return;
      }
      onSaved();
    } catch {
      setError("Nettverksfeil. Prøv igjen.");
      setPending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={initial ? "Rediger hendelse" : "Ny hendelse"}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <motion.form
        onSubmit={submit}
        initial={reduce ? false : { opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-large"
      >
        <h2 className="text-lg font-semibold text-natural-forest">
          {initial ? "Rediger hendelse" : "Ny hendelse"}
        </h2>

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Tittel *
            </label>
            <input
              className={felt}
              value={tittel}
              onChange={(e) => setTittel(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Startdato *
              </label>
              <input
                type="date"
                className={felt}
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Sluttdato
              </label>
              <input
                type="date"
                className={felt}
                value={slutt}
                onChange={(e) => setSlutt(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Kategori
              </label>
              <select
                className={felt}
                value={kategori}
                onChange={(e) => setKategori(e.target.value as HjulKategori)}
              >
                {KATEGORI_REKKEFOLGE.map((k) => (
                  <option key={k} value={k}>
                    {KATEGORI_LABEL[k]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Status
              </label>
              <select
                className={felt}
                value={status}
                onChange={(e) => setStatus(e.target.value as HjulStatus)}
              >
                {STATUSER.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Gjentakelse
              </label>
              <select
                className={felt}
                value={gjentakelse}
                onChange={(e) =>
                  setGjentakelse(e.target.value as GjentakelsePreset | "")
                }
              >
                <option value="">Ingen (engang)</option>
                {GJENTAKELSE_OPSJONER.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            {gjentakelse && (
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Gjenta til
                </label>
                <input
                  type="date"
                  className={felt}
                  value={gjentakelseTil}
                  onChange={(e) => setGjentakelseTil(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Beskrivelse
            </label>
            <textarea
              className={felt}
              rows={3}
              value={beskrivelse}
              onChange={(e) => setBeskrivelse(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Ansvarlig
              </label>
              <input
                className={felt}
                value={ansvarlig}
                onChange={(e) => setAnsvarlig(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Lenke
              </label>
              <input
                className={felt}
                value={lenke}
                onChange={(e) => setLenke(e.target.value)}
                placeholder="/main-board/… eller https://"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Avbryt
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-natural-forest px-4 py-2 text-sm font-medium text-white hover:bg-natural-forest/90 disabled:opacity-60"
          >
            {pending ? "Lagrer…" : "Lagre"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
