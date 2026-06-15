"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { HjulAr, HjulHendelse, HjulKategori } from "@/types/arshjul";
import ArshjulWheel from "./ArshjulWheel";
import ArshjulAgenda from "./ArshjulAgenda";
import ArshjulDetailPanel from "./ArshjulDetailPanel";
import {
  KATEGORI_FARGE,
  KATEGORI_LABEL,
  KATEGORI_REKKEFOLGE,
  sorterHendelser,
} from "./arshjulShared";

type Visning = "hjul" | "agenda";

const MOBIL_MQ = "(max-width: 768px)";
function subscribeMobil(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const m = window.matchMedia(MOBIL_MQ);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
const getMobilSnapshot = () => window.matchMedia(MOBIL_MQ).matches;
const getMobilServerSnapshot = () => false;

interface ArshjulProps {
  /** Ett eller flere år. Komponenten viser ett av gangen med år-velger. */
  years: HjulAr[];
}

export default function Arshjul({ years }: ArshjulProps) {
  const aarListe = useMemo(
    () => [...years].map((y) => y.ar).sort((a, b) => b - a),
    [years],
  );

  const [aktivtAr, setAktivtAr] = useState<number>(() => {
    const naa = new Date().getFullYear();
    return aarListe.includes(naa) ? naa : (aarListe[0] ?? naa);
  });
  const [visningValg, setVisningValg] = useState<Visning | null>(null);
  const [valgtKategorier, setValgtKategorier] = useState<Set<HjulKategori>>(
    new Set(),
  );
  const [valgtHendelse, setValgtHendelse] = useState<HjulHendelse | null>(null);

  // På små skjermer er agenda standard, men brukerens eget valg overstyrer.
  const erMobil = useSyncExternalStore(
    subscribeMobil,
    getMobilSnapshot,
    getMobilServerSnapshot,
  );
  const visning: Visning = visningValg ?? (erMobil ? "agenda" : "hjul");

  const data = useMemo(
    () => years.find((y) => y.ar === aktivtAr) ?? years[0],
    [years, aktivtAr],
  );

  const synlige = useMemo(() => {
    if (!data) return [];
    if (valgtKategorier.size === 0) return data.hendelser;
    return data.hendelser.filter((h) => valgtKategorier.has(h.kategori));
  }, [data, valgtKategorier]);

  function selectRelative(dir: 1 | -1) {
    const sortert = sorterHendelser(synlige);
    if (sortert.length === 0) return;
    if (!valgtHendelse) {
      setValgtHendelse(dir > 0 ? sortert[0] : sortert[sortert.length - 1]);
      return;
    }
    const idx = sortert.findIndex((h) => h.id === valgtHendelse.id);
    if (idx === -1) {
      setValgtHendelse(sortert[0]);
      return;
    }
    setValgtHendelse(sortert[(idx + dir + sortert.length) % sortert.length]);
  }

  function toggleKategori(k: HjulKategori) {
    setValgtKategorier((prev) => {
      const ny = new Set(prev);
      if (ny.has(k)) ny.delete(k);
      else ny.add(k);
      return ny;
    });
  }

  function byttAr(ar: number) {
    setAktivtAr(ar);
    setValgtHendelse(null);
  }

  if (!data) return null;

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape") setValgtHendelse(null);
      }}
    >
      {/* Kontroller: visningsbytte + år */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex rounded-full border border-gray-200 bg-white p-1"
          role="tablist"
          aria-label="Velg visning"
        >
          {(["hjul", "agenda"] as Visning[]).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={visning === v}
              onClick={() => setVisningValg(v)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                visning === v
                  ? "bg-natural-forest text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {v === "hjul" ? "Hjul" : "Agenda"}
            </button>
          ))}
        </div>

        {aarListe.length > 1 && (
          <div
            className="inline-flex rounded-full border border-gray-200 bg-white p-1"
            role="group"
            aria-label="Velg år"
          >
            {aarListe.map((ar) => (
              <button
                key={ar}
                type="button"
                aria-pressed={aktivtAr === ar}
                onClick={() => byttAr(ar)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium tabular-nums transition ${
                  aktivtAr === ar
                    ? "bg-natural-forest text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {ar}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <div>
          {visning === "hjul" ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/30 p-4">
              <ArshjulWheel
                data={data}
                synlige={synlige}
                valgtHendelse={valgtHendelse}
                onSelect={setValgtHendelse}
                onArrowNav={selectRelative}
              />
            </div>
          ) : (
            <ArshjulAgenda
              data={data}
              synlige={synlige}
              valgtHendelse={valgtHendelse}
              onSelect={setValgtHendelse}
            />
          )}

          {/* Kategori-filtre (delt mellom visningene) */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {KATEGORI_REKKEFOLGE.map((k) => {
              const aktiv = valgtKategorier.size === 0 || valgtKategorier.has(k);
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={valgtKategorier.has(k)}
                  onClick={() => toggleKategori(k)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                    aktiv
                      ? "bg-white shadow-sm ring-1 ring-gray-200"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: KATEGORI_FARGE[k] }}
                  />
                  {KATEGORI_LABEL[k]}
                </button>
              );
            })}
            {valgtKategorier.size > 0 && (
              <button
                type="button"
                onClick={() => setValgtKategorier(new Set())}
                className="rounded-full px-3 py-1 text-xs font-medium text-natural-forest underline hover:no-underline"
              >
                Nullstill
              </button>
            )}
          </div>
        </div>

        <ArshjulDetailPanel
          hendelse={valgtHendelse}
          onClose={() => setValgtHendelse(null)}
        />
      </div>
    </div>
  );
}
