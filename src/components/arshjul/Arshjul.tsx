"use client";

import { useMemo, useState } from "react";
import {
  dayOfYear,
  daysInYear,
  hendelseTilPunkt,
  tildelRadiusOffset,
} from "@/lib/arshjul";
import type { HjulAr, HjulHendelse, HjulKategori, HjulStatus } from "@/types/arshjul";

interface ArshjulProps {
  data: HjulAr;
}

const KATEGORI_FARGE: Record<HjulKategori, string> = {
  "aktor-aktivitet": "#10b981",
  styremote: "#3b82f6",
  "visit-lokka": "#f59e0b",
  kampanje: "#a855f7",
  fou: "#ef4444",
  rapport: "#6b7280",
  workshop: "#06b6d4",
  annet: "#94a3b8",
};

const KATEGORI_LABEL: Record<HjulKategori, string> = {
  "aktor-aktivitet": "Aktør-aktivitet",
  styremote: "Styremøte",
  "visit-lokka": "Visit Løkka",
  kampanje: "Kampanje",
  fou: "FoU",
  rapport: "Rapport",
  workshop: "Workshop",
  annet: "Annet",
};

const STATUS_LABEL: Record<HjulStatus, string> = {
  planlagt: "Planlagt",
  bekreftet: "Bekreftet",
  gjennomfort: "Gjennomført",
  avlyst: "Avlyst",
};

const MAANEDER = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAI",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OKT",
  "NOV",
  "DES",
];

function formatDateRange(start: string, slutt?: string): string {
  const s = new Date(start + "T00:00:00Z").toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  if (!slutt || slutt === start) return s;
  const e = new Date(slutt + "T00:00:00Z").toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  return `${s} – ${e}`;
}

const STATUS_OPACITY: Record<HjulStatus, number> = {
  planlagt: 0.55,
  bekreftet: 1,
  gjennomfort: 0.75,
  avlyst: 0.3,
};

export default function Arshjul({ data }: ArshjulProps) {
  const [valgtKategorier, setValgtKategorier] = useState<Set<HjulKategori>>(
    new Set(),
  );
  const [valgtHendelse, setValgtHendelse] = useState<HjulHendelse | null>(null);

  const synlige = useMemo(() => {
    if (valgtKategorier.size === 0) return data.hendelser;
    return data.hendelser.filter((h) => valgtKategorier.has(h.kategori));
  }, [data.hendelser, valgtKategorier]);

  const radiusOffsets = useMemo(
    () => tildelRadiusOffset(synlige, 220, 18),
    [synlige],
  );

  const toggleKategori = (k: HjulKategori) => {
    setValgtKategorier((prev) => {
      const ny = new Set(prev);
      if (ny.has(k)) ny.delete(k);
      else ny.add(k);
      return ny;
    });
  };

  const cx = 280;
  const cy = 280;
  const baseRadius = 220;
  const innerRadius = 160;

  const maanedSegmenter = MAANEDER.map((maaned, i) => {
    const vinkelStart = (i / 12) * 2 * Math.PI - Math.PI / 2;
    const vinkelSlutt = ((i + 1) / 12) * 2 * Math.PI - Math.PI / 2;
    const vinkelMidt = (vinkelStart + vinkelSlutt) / 2;
    const labelR = baseRadius + 30;
    const labelX = cx + labelR * Math.cos(vinkelMidt);
    const labelY = cy + labelR * Math.sin(vinkelMidt);

    const x1 = cx + (innerRadius - 10) * Math.cos(vinkelStart);
    const y1 = cy + (innerRadius - 10) * Math.sin(vinkelStart);
    const x2 = cx + (baseRadius + 10) * Math.cos(vinkelStart);
    const y2 = cy + (baseRadius + 10) * Math.sin(vinkelStart);

    return {
      maaned,
      labelX,
      labelY,
      line: { x1, y1, x2, y2 },
    };
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/30 p-4">
        <svg
          viewBox="0 0 560 560"
          className="mx-auto h-auto w-full max-w-[560px]"
          role="img"
          aria-label={`Årshjul for ${data.ar}`}
        >
          <circle
            cx={cx}
            cy={cy}
            r={baseRadius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={1}
          />
          <circle
            cx={cx}
            cy={cy}
            r={innerRadius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={1}
          />

          {maanedSegmenter.map((s) => (
            <g key={s.maaned}>
              <line
                x1={s.line.x1}
                y1={s.line.y1}
                x2={s.line.x2}
                y2={s.line.y2}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={s.labelX}
                y={s.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-500 text-[11px] font-semibold tracking-wide"
              >
                {s.maaned}
              </text>
            </g>
          ))}

          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            className="fill-natural-forest text-4xl font-bold"
          >
            {data.ar}
          </text>
          <text
            x={cx}
            y={cy + 18}
            textAnchor="middle"
            className="fill-gray-500 text-xs"
          >
            {synlige.length} av {data.hendelser.length} hendelser
          </text>

          {synlige.map((h) => {
            const r = radiusOffsets.get(h.id) ?? baseRadius;
            const punkt = hendelseTilPunkt(h, cx, cy, r, data.ar);
            const erValgt = valgtHendelse?.id === h.id;
            const farge = KATEGORI_FARGE[h.kategori];
            const opacity = STATUS_OPACITY[h.status];

            const harSlutt = h.slutt && h.slutt !== h.start;
            if (harSlutt) {
              const dagStart = dayOfYear(h.start);
              const dagSlutt = dayOfYear(h.slutt!);
              const total = daysInYear(data.ar);
              const vStart = (dagStart / total) * 2 * Math.PI - Math.PI / 2;
              const vSlutt = (dagSlutt / total) * 2 * Math.PI - Math.PI / 2;
              const largeArc = dagSlutt - dagStart > total / 2 ? 1 : 0;
              const xS = cx + r * Math.cos(vStart);
              const yS = cy + r * Math.sin(vStart);
              const xE = cx + r * Math.cos(vSlutt);
              const yE = cy + r * Math.sin(vSlutt);
              return (
                <g
                  key={h.id}
                  className="cursor-pointer"
                  onClick={() => setValgtHendelse(h)}
                >
                  <path
                    d={`M ${xS} ${yS} A ${r} ${r} 0 ${largeArc} 1 ${xE} ${yE}`}
                    stroke={farge}
                    strokeWidth={erValgt ? 6 : 4}
                    fill="none"
                    opacity={opacity}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={punkt.x}
                    cy={punkt.y}
                    r={erValgt ? 7 : 5}
                    fill={farge}
                    opacity={opacity}
                    stroke="white"
                    strokeWidth={2}
                  />
                </g>
              );
            }

            return (
              <circle
                key={h.id}
                cx={punkt.x}
                cy={punkt.y}
                r={erValgt ? 9 : 6}
                fill={farge}
                opacity={opacity}
                stroke="white"
                strokeWidth={2}
                className="cursor-pointer transition-all hover:r-8"
                onClick={() => setValgtHendelse(h)}
              >
                <title>{`${h.tittel} (${formatDateRange(h.start, h.slutt)})`}</title>
              </circle>
            );
          })}
        </svg>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {(Object.keys(KATEGORI_FARGE) as HjulKategori[]).map((k) => {
            const aktiv = valgtKategorier.size === 0 || valgtKategorier.has(k);
            return (
              <button
                key={k}
                type="button"
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
        </div>
      </div>

      <aside className="rounded-2xl border border-gray-200 bg-white p-5">
        {valgtHendelse ? (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: KATEGORI_FARGE[valgtHendelse.kategori] }}
              />
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {KATEGORI_LABEL[valgtHendelse.kategori]}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-natural-forest">
              {valgtHendelse.tittel}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {formatDateRange(valgtHendelse.start, valgtHendelse.slutt)}
            </p>
            <p className="mt-2 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              {STATUS_LABEL[valgtHendelse.status]}
            </p>
            {valgtHendelse.beskrivelse && (
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {valgtHendelse.beskrivelse}
              </p>
            )}
            {valgtHendelse.ansvarlig && (
              <p className="mt-3 text-xs text-gray-500">
                Ansvarlig: {valgtHendelse.ansvarlig}
              </p>
            )}
            {valgtHendelse.lenke && (
              <a
                href={valgtHendelse.lenke}
                className="mt-4 inline-block text-sm text-natural-forest underline hover:no-underline"
              >
                Se mer →
              </a>
            )}
            <button
              type="button"
              onClick={() => setValgtHendelse(null)}
              className="mt-4 block text-xs text-gray-400 hover:text-gray-600"
            >
              Lukk
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-base font-semibold text-natural-forest">
              Klikk en hendelse
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Velg en hendelse i hjulet for å se detaljer.
            </p>
            <p className="mt-4 text-xs text-gray-400">
              Bruk filtrene under hjulet for å vise eller skjule kategorier.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
