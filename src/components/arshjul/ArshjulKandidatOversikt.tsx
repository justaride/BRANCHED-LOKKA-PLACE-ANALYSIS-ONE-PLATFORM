"use client";

import { useMemo, useState } from "react";
import type {
  ArshjulKandidat,
  ArshjulKandidatStatus,
} from "@/data/main-board/arshjul-kandidater-2026";
import { arshjulKandidater2026 } from "@/data/main-board/arshjul-kandidater-2026";
import type { HjulKategori } from "@/types/arshjul";
import {
  KATEGORI_FARGE,
  KATEGORI_LABEL,
  KATEGORI_REKKEFOLGE,
  formatDateRange,
} from "./arshjulShared";

const STATUS_LABEL: Record<ArshjulKandidatStatus, string> = {
  klar: "Klar kandidat",
  sjekk: "Sjekk først",
  oppdater: "Oppdater eksisterende",
};

const STATUS_STIL: Record<ArshjulKandidatStatus, string> = {
  klar: "border-natural-forest/20 bg-natural-forest/10 text-natural-forest",
  sjekk: "border-amber-200 bg-amber-50 text-amber-800",
  oppdater: "border-blue-200 bg-blue-50 text-blue-800",
};

const STATUS_REKKEFOLGE: ArshjulKandidatStatus[] = [
  "klar",
  "sjekk",
  "oppdater",
];

function kandidatDato(kandidat: ArshjulKandidat): string {
  if (kandidat.rytme) return kandidat.rytme;
  if (kandidat.start) return formatDateRange(kandidat.start, kandidat.slutt);
  return "Dato må avklares";
}

function sorterKandidater(a: ArshjulKandidat, b: ArshjulKandidat): number {
  const statusDiff =
    STATUS_REKKEFOLGE.indexOf(a.vurdering) - STATUS_REKKEFOLGE.indexOf(b.vurdering);
  if (statusDiff !== 0) return statusDiff;
  const aDato = a.start ?? "9999-12-31";
  const bDato = b.start ?? "9999-12-31";
  return aDato.localeCompare(bDato) || a.tittel.localeCompare(b.tittel);
}

export default function ArshjulKandidatOversikt() {
  const [aktivStatus, setAktivStatus] = useState<ArshjulKandidatStatus | "alle">(
    "alle",
  );
  const [aktivKategori, setAktivKategori] = useState<HjulKategori | "alle">("alle");

  const synlige = useMemo(
    () =>
      arshjulKandidater2026
        .filter((kandidat) =>
          aktivStatus === "alle" ? true : kandidat.vurdering === aktivStatus,
        )
        .filter((kandidat) =>
          aktivKategori === "alle" ? true : kandidat.kategori === aktivKategori,
        )
        .sort(sorterKandidater),
    [aktivKategori, aktivStatus],
  );

  const antallPerStatus = useMemo(() => {
    const counts: Record<ArshjulKandidatStatus, number> = {
      klar: 0,
      sjekk: 0,
      oppdater: 0,
    };
    for (const kandidat of arshjulKandidater2026) {
      counts[kandidat.vurdering] += 1;
    }
    return counts;
  }, []);

  return (
    <section
      aria-labelledby="arshjul-kandidater-heading"
      className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="border-b border-gray-100 bg-gradient-to-r from-natural-forest/5 via-white to-natural-cream/30 p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-natural-forest/70">
              Diskusjonsgrunnlag
            </p>
            <h2
              id="arshjul-kandidater-heading"
              className="mt-2 text-2xl font-bold text-natural-forest"
            >
              Til vurdering for årshjulet
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
              Kandidater som kan vurderes før de eventuelt legges inn som faktiske
              hendelser. Listen er separat fra kalenderen og påvirker ikke hjul,
              agenda eller API.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
            <span className="block text-2xl font-bold text-natural-forest">
              {arshjulKandidater2026.length}
            </span>
            forslag til gjennomgang
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2" aria-label="Filtrer på vurdering">
            <button
              type="button"
              onClick={() => setAktivStatus("alle")}
              aria-pressed={aktivStatus === "alle"}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                aktivStatus === "alle"
                  ? "border-natural-forest bg-natural-forest text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              Alle
            </button>
            {STATUS_REKKEFOLGE.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setAktivStatus(status)}
                aria-pressed={aktivStatus === status}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  aktivStatus === status
                    ? "border-natural-forest bg-natural-forest text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {STATUS_LABEL[status]} ({antallPerStatus[status]})
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Filtrer på kategori">
            <button
              type="button"
              onClick={() => setAktivKategori("alle")}
              aria-pressed={aktivKategori === "alle"}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                aktivKategori === "alle"
                  ? "border-natural-forest/40 bg-natural-forest/10 text-natural-forest"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              Alle kategorier
            </button>
            {KATEGORI_REKKEFOLGE.map((kategori) => (
              <button
                key={kategori}
                type="button"
                onClick={() => setAktivKategori(kategori)}
                aria-pressed={aktivKategori === kategori}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  aktivKategori === kategori
                    ? "border-natural-forest/40 bg-natural-forest/10 text-natural-forest"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: KATEGORI_FARGE[kategori] }}
                  aria-hidden
                />
                {KATEGORI_LABEL[kategori]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {synlige.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
            Ingen kandidater matcher filtrene.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {synlige.map((kandidat) => (
              <article
                key={kandidat.id}
                className="flex min-h-[260px] flex-col rounded-xl border border-gray-200 bg-white p-4 transition hover:border-natural-forest/25 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${STATUS_STIL[kandidat.vurdering]}`}
                  >
                    {STATUS_LABEL[kandidat.vurdering]}
                  </span>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-500">
                    Ikke i kalenderen
                  </span>
                </div>

                <h3 className="mt-4 text-base font-semibold leading-snug text-gray-950">
                  {kandidat.tittel}
                </h3>

                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-900">Tid:</span>{" "}
                    {kandidatDato(kandidat)}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Sted:</span>{" "}
                    {kandidat.sted}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: KATEGORI_FARGE[kandidat.kategori] }}
                      aria-hidden
                    />
                    <span>{KATEGORI_LABEL[kandidat.kategori]}</span>
                  </p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {kandidat.beskrivelse}
                </p>

                {kandidat.avklaring && (
                  <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
                    {kandidat.avklaring}
                  </p>
                )}

                <a
                  href={kandidat.kilde}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-4 text-sm font-medium text-natural-forest underline decoration-natural-forest/30 underline-offset-4 hover:decoration-natural-forest"
                >
                  Åpne kilde
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
