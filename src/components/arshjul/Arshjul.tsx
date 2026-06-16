"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import type { HjulAr, HjulHendelse, HjulKategori, HjulStatus } from "@/types/arshjul";
import type { ArshjulKandidat } from "@/data/main-board/arshjul-kandidater-2026";
import ArshjulWheel from "./ArshjulWheel";
import ArshjulAgenda from "./ArshjulAgenda";
import ArshjulDetailPanel from "./ArshjulDetailPanel";
import ArshjulEditor from "./ArshjulEditor";
import ArshjulKandidatOversikt from "./ArshjulKandidatOversikt";
import {
  KATEGORI_FARGE,
  KATEGORI_LABEL,
  KATEGORI_REKKEFOLGE,
  STATUS_LABEL,
  STATUS_OPACITY,
  STATUS_REKKEFOLGE,
  sorterHendelser,
} from "./arshjulShared";

type Visning = "hjul" | "agenda";

/** Mulige visningsbredder (px) for hjulet — brukes av +/− zoom-kontrollen. */
const HJUL_STORRELSER = [560, 680, 760, 860, 960];
/** Standard er klart større enn den gamle faste bredden (560px). */
const STANDARD_STORRELSE_INDEX = 2; // 760px
const STORRELSE_LAGER_NOKKEL = "arshjul-storrelse-index";

const MOBIL_MQ = "(max-width: 768px)";
function subscribeMobil(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const m = window.matchMedia(MOBIL_MQ);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
const getMobilSnapshot = () => window.matchMedia(MOBIL_MQ).matches;
const getMobilServerSnapshot = () => false;

// Hjulstørrelse (zoom) — lagres i localStorage og deles via en liten ekstern
// store, slik at useSyncExternalStore gir hydrerings-trygg lesing (server =
// standard, klient = lagret valg) uten setState i en effekt.
const storrelseListeners = new Set<() => void>();
function lesLagretStorrelse(): number {
  try {
    const lagret = window.localStorage.getItem(STORRELSE_LAGER_NOKKEL);
    if (lagret !== null) {
      const n = Number(lagret);
      if (Number.isInteger(n) && n >= 0 && n < HJUL_STORRELSER.length) return n;
    }
  } catch {
    /* localStorage utilgjengelig */
  }
  return STANDARD_STORRELSE_INDEX;
}
function subscribeStorrelse(cb: () => void) {
  storrelseListeners.add(cb);
  return () => {
    storrelseListeners.delete(cb);
  };
}
const getStorrelseSnapshot = () => lesLagretStorrelse();
const getStorrelseServerSnapshot = () => STANDARD_STORRELSE_INDEX;
function settLagretStorrelse(index: number) {
  try {
    window.localStorage.setItem(STORRELSE_LAGER_NOKKEL, String(index));
  } catch {
    /* ignorer */
  }
  storrelseListeners.forEach((cb) => cb());
}

interface ArshjulProps {
  /** Ett eller flere år. Komponenten viser ett av gangen med år-velger. */
  years: HjulAr[];
}

export default function Arshjul({ years }: ArshjulProps) {
  const router = useRouter();

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
  const [valgtStatuser, setValgtStatuser] = useState<Set<HjulStatus>>(new Set());
  const [valgtHendelse, setValgtHendelse] = useState<HjulHendelse | null>(null);

  // Hjulstørrelse (zoom). Standarden er bevisst større enn før (760px).
  const storrelseIndex = useSyncExternalStore(
    subscribeStorrelse,
    getStorrelseSnapshot,
    getStorrelseServerSnapshot,
  );

  function settStorrelse(nyIndex: number) {
    const klemt = Math.max(0, Math.min(HJUL_STORRELSER.length - 1, nyIndex));
    settLagretStorrelse(klemt);
  }

  // Redigering
  const [redaktor, setRedaktor] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorInitial, setEditorInitial] = useState<HjulHendelse | null>(null);
  const [editorPrefill, setEditorPrefill] = useState<Partial<HjulHendelse> | null>(
    null,
  );

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
    return data.hendelser.filter(
      (h) =>
        (valgtKategorier.size === 0 || valgtKategorier.has(h.kategori)) &&
        (valgtStatuser.size === 0 || valgtStatuser.has(h.status)),
    );
  }, [data, valgtKategorier, valgtStatuser]);

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

  function toggleStatus(s: HjulStatus) {
    setValgtStatuser((prev) => {
      const ny = new Set(prev);
      if (ny.has(s)) ny.delete(s);
      else ny.add(s);
      return ny;
    });
  }

  function byttAr(ar: number) {
    setAktivtAr(ar);
    setValgtHendelse(null);
  }

  function nyHendelse() {
    setEditorInitial(null);
    setEditorPrefill(null);
    setEditorOpen(true);
  }

  function redigerHendelse(h: HjulHendelse) {
    setEditorInitial(h);
    setEditorPrefill(null);
    setEditorOpen(true);
  }

  function leggTilFraKandidat(kandidat: ArshjulKandidat) {
    setEditorInitial(null);
    setEditorPrefill({
      tittel: kandidat.tittel,
      ...(kandidat.start ? { start: kandidat.start } : {}),
      ...(kandidat.slutt ? { slutt: kandidat.slutt } : {}),
      kategori: kandidat.kategori,
      status: "planlagt",
      beskrivelse: kandidat.beskrivelse,
      lenke: kandidat.kilde,
    });
    setEditorOpen(true);
  }

  function lagret() {
    setEditorOpen(false);
    router.refresh(); // re-render server-komponenten med ferske DB-data
  }

  async function slettHendelse(h: HjulHendelse) {
    if (!confirm(`Slette «${h.tittel}»?`)) return;
    const res = await fetch(`/api/arshjul/${h.id}`, { method: "DELETE" });
    if (res.ok) {
      setValgtHendelse(null);
      router.refresh();
    } else {
      const d = (await res.json().catch(() => null)) as { error?: string } | null;
      alert(
        d?.error === "Database ikke konfigurert"
          ? "Sletting krever at databasen er koblet til."
          : "Sletting feilet.",
      );
    }
  }

  if (!data) return null;

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape" && !editorOpen) setValgtHendelse(null);
      }}
    >
      {/* Kontroller: visningsbytte + år + redigering */}
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

        <div className="flex flex-wrap items-center gap-2">
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

          <a
            href={`/api/arshjul/ical?ar=${aktivtAr}`}
            download={`arshjul-${aktivtAr}.ics`}
            className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition hover:text-gray-900"
            title="Last ned årets hendelser som kalenderfil (.ics)"
          >
            Last ned .ics
          </a>

          {redaktor && (
            <button
              type="button"
              onClick={nyHendelse}
              className="rounded-full bg-natural-forest px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-natural-forest/90"
            >
              + Ny hendelse
            </button>
          )}

          <button
            type="button"
            onClick={() => setRedaktor((r) => !r)}
            aria-pressed={redaktor}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              redaktor
                ? "border-natural-forest bg-natural-forest/10 text-natural-forest"
                : "border-gray-200 bg-white text-gray-600 hover:text-gray-900"
            }`}
          >
            {redaktor ? "Redigerer" : "Rediger"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <div>
          {visning === "hjul" ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/30 p-4">
              <div className="mb-2 flex items-center justify-end gap-1.5">
                <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Størrelse
                </span>
                <button
                  type="button"
                  onClick={() => settStorrelse(storrelseIndex - 1)}
                  disabled={storrelseIndex === 0}
                  aria-label="Mindre hjul"
                  title="Mindre hjul"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-base font-semibold leading-none text-gray-600 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => settStorrelse(storrelseIndex + 1)}
                  disabled={storrelseIndex === HJUL_STORRELSER.length - 1}
                  aria-label="Større hjul"
                  title="Større hjul"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-base font-semibold leading-none text-gray-600 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>
              </div>
              <ArshjulWheel
                data={data}
                synlige={synlige}
                valgtHendelse={valgtHendelse}
                onSelect={setValgtHendelse}
                onArrowNav={selectRelative}
                maxBredde={HJUL_STORRELSER[storrelseIndex]}
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

          {/* Filtre (delt mellom visningene) — fungerer også som tegnforklaring */}
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Kategori
              </span>
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
                      aria-hidden
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

            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Status
              </span>
              {STATUS_REKKEFOLGE.map((s) => {
                const aktiv = valgtStatuser.size === 0 || valgtStatuser.has(s);
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={valgtStatuser.has(s)}
                    onClick={() => toggleStatus(s)}
                    title={
                      s === "avlyst"
                        ? "Avlyst — vises som åpen ring i hjulet"
                        : `${STATUS_LABEL[s]} — opasitet ${STATUS_OPACITY[s]}`
                    }
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                      aktiv
                        ? "bg-white shadow-sm ring-1 ring-gray-200"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {s === "avlyst" ? (
                      <span
                        className="h-2.5 w-2.5 rounded-full border-2 border-gray-600"
                        aria-hidden
                      />
                    ) : (
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-gray-700"
                        style={{ opacity: STATUS_OPACITY[s] }}
                        aria-hidden
                      />
                    )}
                    {STATUS_LABEL[s]}
                  </button>
                );
              })}
              {valgtStatuser.size > 0 && (
                <button
                  type="button"
                  onClick={() => setValgtStatuser(new Set())}
                  className="rounded-full px-3 py-1 text-xs font-medium text-natural-forest underline hover:no-underline"
                >
                  Nullstill
                </button>
              )}
            </div>
          </div>
        </div>

        <ArshjulDetailPanel
          hendelse={valgtHendelse}
          onClose={() => setValgtHendelse(null)}
          editable={redaktor}
          onEdit={redigerHendelse}
          onDelete={slettHendelse}
        />
      </div>

      <ArshjulKandidatOversikt
        redaktor={redaktor}
        onLeggTil={leggTilFraKandidat}
      />

      {editorOpen && (
        <ArshjulEditor
          key={editorInitial?.id ?? editorPrefill?.tittel ?? "ny"}
          initial={editorInitial}
          prefill={editorPrefill}
          onClose={() => setEditorOpen(false)}
          onSaved={lagret}
        />
      )}
    </div>
  );
}
