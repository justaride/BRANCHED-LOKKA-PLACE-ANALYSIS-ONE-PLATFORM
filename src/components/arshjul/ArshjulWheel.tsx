"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  dayOfYear,
  daysInYear,
  hendelseTilPunkt,
  tildelRadiusOffset,
} from "@/lib/arshjul";
import type { HjulAr, HjulHendelse } from "@/types/arshjul";
import {
  KATEGORI_FARGE,
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
const BASE_RADIUS = 220;
const INNER_RADIUS = 160;

export default function ArshjulWheel({
  data,
  synlige,
  valgtHendelse,
  onSelect,
  onArrowNav,
}: Props) {
  const reduce = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const radiusOffsets = useMemo(
    () => tildelRadiusOffset(synlige, BASE_RADIUS, 18),
    [synlige],
  );

  const maanedSegmenter = useMemo(
    () =>
      MAANEDER.map((maaned, i) => {
        const vinkelStart = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const vinkelMidt = vinkelStart + (1 / 12) * Math.PI;
        const labelR = BASE_RADIUS + 30;
        return {
          maaned,
          labelX: CX + labelR * Math.cos(vinkelMidt),
          labelY: CY + labelR * Math.sin(vinkelMidt),
          line: {
            x1: CX + (INNER_RADIUS - 10) * Math.cos(vinkelStart),
            y1: CY + (INNER_RADIUS - 10) * Math.sin(vinkelStart),
            x2: CX + (BASE_RADIUS + 10) * Math.cos(vinkelStart),
            y2: CY + (BASE_RADIUS + 10) * Math.sin(vinkelStart),
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
      x1: CX + (INNER_RADIUS - 6) * Math.cos(vinkel),
      y1: CY + (INNER_RADIUS - 6) * Math.sin(vinkel),
      x2: CX + (BASE_RADIUS + 14) * Math.cos(vinkel),
      y2: CY + (BASE_RADIUS + 14) * Math.sin(vinkel),
      lx: CX + (BASE_RADIUS + 30) * Math.cos(vinkel),
      ly: CY + (BASE_RADIUS + 30) * Math.sin(vinkel),
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
      aria-label={`Årshjul for ${data.ar}. Bruk piltastene for å bla mellom ${synlige.length} hendelser.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <circle cx={CX} cy={CY} r={BASE_RADIUS} fill="none" stroke="#e5e7eb" strokeWidth={1} />
      <circle cx={CX} cy={CY} r={INNER_RADIUS} fill="none" stroke="#f3f4f6" strokeWidth={1} />

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
          const r = radiusOffsets.get(h.id) ?? BASE_RADIUS;
          const punkt = hendelseTilPunkt(h, CX, CY, r, data.ar);
          const erValgt = valgtHendelse?.id === h.id;
          const erHover = hoveredId === h.id;
          const farge = KATEGORI_FARGE[h.kategori];
          const opacity = STATUS_OPACITY[h.status];
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

              {harSlutt &&
                (() => {
                  const total = daysInYear(data.ar);
                  const vStart = (dayOfYear(h.start) / total) * 2 * Math.PI - Math.PI / 2;
                  const vSlutt = (dayOfYear(h.slutt!) / total) * 2 * Math.PI - Math.PI / 2;
                  const largeArc = dayOfYear(h.slutt!) - dayOfYear(h.start) > total / 2 ? 1 : 0;
                  const xS = CX + r * Math.cos(vStart);
                  const yS = CY + r * Math.sin(vStart);
                  const xE = CX + r * Math.cos(vSlutt);
                  const yE = CY + r * Math.sin(vSlutt);
                  return (
                    <motion.path
                      d={`M ${xS} ${yS} A ${r} ${r} 0 ${largeArc} 1 ${xE} ${yE}`}
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
                cx={punkt.x}
                cy={punkt.y}
                fill={farge}
                opacity={opacity}
                stroke="white"
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
