"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { dayOfYear, daysInYear, hendelseTilPunkt } from "@/lib/arshjul";
import type { HjulAr, HjulHendelse, HjulKategori } from "@/types/arshjul";
import {
  KATEGORI_FARGE,
  KATEGORI_REKKEFOLGE,
  MAANEDER,
  STATUS_LABEL,
  STATUS_OPACITY,
  formatDateRange,
} from "./arshjulShared";

interface Props {
  data: HjulAr;
  synlige: HjulHendelse[];
  valgtHendelse: HjulHendelse | null;
  onSelect: (h: HjulHendelse) => void;
  /** Bla kronologisk med piltaster (+1 = neste, -1 = forrige). */
  onArrowNav: (dir: 1 | -1) => void;
}

const CX = 280;
const CY = 280;
const OUTER_RING = 216;
const INNER_RING = 120;
const SVG_PRECISION = 4;

function svgNum(value: number): number {
  return Number(value.toFixed(SVG_PRECISION));
}

export default function ArshjulWheel({
  data,
  synlige,
  valgtHendelse,
  onSelect,
  onArrowNav,
}: Props) {
  const reduce = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Én konsentrisk ring per kategori som finnes i årets data.
  // Layouten er stabil (basert på data, ikke filteret) slik at filtrering
  // dimmer/skjuler prikker uten at ringene flytter seg.
  const kategoriRinger = useMemo(() => {
    const tilstede = KATEGORI_REKKEFOLGE.filter((k) =>
      data.hendelser.some((h) => h.kategori === k),
    );
    const n = tilstede.length;
    const map = new Map<HjulKategori, number>();
    tilstede.forEach((k, i) => {
      const r =
        n <= 1
          ? (OUTER_RING + INNER_RING) / 2
          : OUTER_RING - (i * (OUTER_RING - INNER_RING)) / (n - 1);
      map.set(k, r);
    });
    return map;
  }, [data.hendelser]);

  const ringFor = (k: HjulKategori): number =>
    kategoriRinger.get(k) ?? (OUTER_RING + INNER_RING) / 2;

  const maanedSegmenter = useMemo(
    () =>
      MAANEDER.map((maaned, i) => {
        const vinkelStart = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const vinkelMidt = vinkelStart + (1 / 12) * Math.PI;
        const labelR = OUTER_RING + 28;
        return {
          maaned,
          labelX: svgNum(CX + labelR * Math.cos(vinkelMidt)),
          labelY: svgNum(CY + labelR * Math.sin(vinkelMidt)),
          line: {
            x1: svgNum(CX + (INNER_RING - 12) * Math.cos(vinkelStart)),
            y1: svgNum(CY + (INNER_RING - 12) * Math.sin(vinkelStart)),
            x2: svgNum(CX + (OUTER_RING + 10) * Math.cos(vinkelStart)),
            y2: svgNum(CY + (OUTER_RING + 10) * Math.sin(vinkelStart)),
          },
        };
      }),
    [],
  );

  // «I dag»-markør (kun når hjulet viser inneværende år).
  const idag = useMemo(() => {
    const now = new Date();
    if (now.getFullYear() !== data.ar) return null;
    const iso = now.toISOString().slice(0, 10);
    const vinkel = (dayOfYear(iso) / daysInYear(data.ar)) * 2 * Math.PI - Math.PI / 2;
    return {
      x1: svgNum(CX + (INNER_RING - 6) * Math.cos(vinkel)),
      y1: svgNum(CY + (INNER_RING - 6) * Math.sin(vinkel)),
      x2: svgNum(CX + (OUTER_RING + 14) * Math.cos(vinkel)),
      y2: svgNum(CY + (OUTER_RING + 14) * Math.sin(vinkel)),
      lx: svgNum(CX + (OUTER_RING + 30) * Math.cos(vinkel)),
      ly: svgNum(CY + (OUTER_RING + 30) * Math.sin(vinkel)),
    };
  }, [data.ar]);

  function onKeyDown(e: React.KeyboardEvent<SVGSVGElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onArrowNav(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onArrowNav(-1);
    }
  }

  return (
    <svg
      viewBox="0 0 560 560"
      className="mx-auto h-auto w-full max-w-[560px] outline-none focus-visible:ring-2 focus-visible:ring-natural-forest/40 rounded-2xl"
      role="group"
      aria-label={`Årshjul for ${data.ar} med ${kategoriRinger.size} kategori-ringer. Bruk piltastene for å bla mellom ${synlige.length} hendelser.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Kategori-ringer: én svakt farget guide-sirkel per kategori. */}
      {[...kategoriRinger.entries()].map(([kat, r]) => (
        <circle
          key={kat}
          cx={CX}
          cy={CY}
          r={svgNum(r)}
          fill="none"
          stroke={KATEGORI_FARGE[kat]}
          strokeOpacity={0.25}
          strokeWidth={1}
        />
      ))}

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

      {idag && (
        <g>
          <line
            x1={idag.x1}
            y1={idag.y1}
            x2={idag.x2}
            y2={idag.y2}
            stroke="#2C5F2D"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
          <text
            x={idag.lx}
            y={idag.ly}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-natural-forest text-[9px] font-semibold uppercase tracking-wide"
          >
            I dag
          </text>
        </g>
      )}

      <text x={CX} y={CY - 8} textAnchor="middle" className="fill-natural-forest text-4xl font-bold">
        {data.ar}
      </text>
      <text x={CX} y={CY + 18} textAnchor="middle" className="fill-gray-500 text-xs">
        {synlige.length} av {data.hendelser.length} hendelser
      </text>

      <motion.g
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: reduce ? {} : { staggerChildren: 0.012 } },
        }}
      >
        {synlige.map((h) => {
          const r = ringFor(h.kategori);
          const punkt = hendelseTilPunkt(h, CX, CY, r, data.ar);
          const punktX = svgNum(punkt.x);
          const punktY = svgNum(punkt.y);
          const erValgt = valgtHendelse?.id === h.id;
          const erHover = hoveredId === h.id;
          const farge = KATEGORI_FARGE[h.kategori];
          const opacity = STATUS_OPACITY[h.status];
          const erAvlyst = h.status === "avlyst";
          const aria = `${h.tittel}, ${formatDateRange(h.start, h.slutt)}, ${STATUS_LABEL[h.status]}`;

          const harSlutt = h.slutt && h.slutt !== h.start;
          const dotR = erValgt ? 9 : erHover ? 8 : harSlutt ? 5 : 6;

          return (
            <motion.g
              key={h.id}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: reduce ? 0 : 0.25 } },
              }}
              className="cursor-pointer"
              role="button"
              aria-label={aria}
              onClick={() => onSelect(h)}
              onMouseEnter={() => setHoveredId(h.id)}
              onMouseLeave={() => setHoveredId((id) => (id === h.id ? null : id))}
            >
              <title>{aria}</title>

              {/* Usynlig trefflate (≥24px) for tilgjengelig klikkmål (WCAG 2.5.8). */}
              <circle cx={punktX} cy={punktY} r={14} fill="transparent" />

              {harSlutt &&
                (() => {
                  const total = daysInYear(data.ar);
                  const vStart = (dayOfYear(h.start) / total) * 2 * Math.PI - Math.PI / 2;
                  const vSlutt = (dayOfYear(h.slutt!) / total) * 2 * Math.PI - Math.PI / 2;
                  const largeArc = dayOfYear(h.slutt!) - dayOfYear(h.start) > total / 2 ? 1 : 0;
                  const xS = svgNum(CX + r * Math.cos(vStart));
                  const yS = svgNum(CY + r * Math.sin(vStart));
                  const xE = svgNum(CX + r * Math.cos(vSlutt));
                  const yE = svgNum(CY + r * Math.sin(vSlutt));
                  return (
                    <motion.path
                      d={`M ${xS} ${yS} A ${svgNum(r)} ${svgNum(r)} 0 ${largeArc} 1 ${xE} ${yE}`}
                      stroke={farge}
                      fill="none"
                      opacity={opacity}
                      strokeLinecap="round"
                      initial={false}
                      animate={{ strokeWidth: erValgt ? 6 : erHover ? 5 : 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    />
                  );
                })()}

              <motion.circle
                cx={punktX}
                cy={punktY}
                fill={erAvlyst ? "none" : farge}
                opacity={opacity}
                stroke={erAvlyst ? farge : "white"}
                strokeWidth={2}
                initial={false}
                animate={{ r: dotR }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.g>
          );
        })}
      </motion.g>
    </svg>
  );
}
