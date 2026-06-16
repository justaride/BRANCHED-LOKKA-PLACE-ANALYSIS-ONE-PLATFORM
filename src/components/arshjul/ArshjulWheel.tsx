"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { dayOfYear, daysInYear, hendelseTilPunkt } from "@/lib/arshjul";
import type { HjulAr, HjulHendelse, HjulKategori } from "@/types/arshjul";
import {
  KATEGORI_FARGE,
  KATEGORI_LABEL,
  KATEGORI_REKKEFOLGE,
  MAANEDER,
  STATUS_LABEL,
  STATUS_OPACITY,
  formatDateRange,
  lesGjentakelse,
} from "./arshjulShared";

interface Props {
  data: HjulAr;
  synlige: HjulHendelse[];
  valgtHendelse: HjulHendelse | null;
  onSelect: (h: HjulHendelse) => void;
  /** Bla kronologisk med piltaster (+1 = neste, -1 = forrige). */
  onArrowNav: (dir: 1 | -1) => void;
  /** Maks visningsbredde i px. Hjulet fyller kolonnen opp til denne grensen. */
  maxBredde?: number;
}

const CX = 280;
const CY = 280;
const OUTER_RING = 216;
const INNER_RING = 120;
const MID_RING = (OUTER_RING + INNER_RING) / 2;
/** Vinkel (øvre venstre, ~235°) der ring-etikettene plasseres — åpent felt med god luft. */
const LABEL_VINKEL = (235 * Math.PI) / 180;
const SVG_PRECISION = 4;
/** Hendelser på samme ring nærmere enn dette (dager) forskyves radielt. */
const KLYNGE_DAGER = 6;

function svgNum(value: number): number {
  return Number(value.toFixed(SVG_PRECISION));
}

function trunkér(s: string, maks: number): string {
  return s.length > maks ? `${s.slice(0, Math.max(1, maks - 1))}…` : s;
}

interface Plassert {
  h: HjulHendelse;
  r: number;
  x: number;
  y: number;
}

export default function ArshjulWheel({
  data,
  synlige,
  valgtHendelse,
  onSelect,
  onArrowNav,
  maxBredde = 760,
}: Props) {
  const reduce = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Én konsentrisk ring per kategori som finnes i årets data. Stabil layout
  // (basert på data, ikke filteret) slik at filtrering ikke flytter ringene.
  const kategoriRinger = useMemo(() => {
    const tilstede = KATEGORI_REKKEFOLGE.filter((k) =>
      data.hendelser.some((h) => h.kategori === k),
    );
    const n = tilstede.length;
    const map = new Map<HjulKategori, number>();
    tilstede.forEach((k, i) => {
      const r = n <= 1 ? MID_RING : OUTER_RING - (i * (OUTER_RING - INNER_RING)) / (n - 1);
      map.set(k, r);
    });
    return map;
  }, [data.hendelser]);

  // Neste kommende hendelse (kun inneværende år) — får en svak puls.
  const nesteId = useMemo(() => {
    const now = new Date();
    if (now.getFullYear() !== data.ar) return null;
    const iso = now.toISOString().slice(0, 10);
    const fremtidige = synlige
      .filter((h) => h.start >= iso)
      .sort((a, b) => a.start.localeCompare(b.start));
    return fremtidige[0]?.id ?? null;
  }, [synlige, data.ar]);

  // Plassér hver synlig hendelse: kategoriens ring + radiell forskyvning for
  // tette klynger (så prikker på samme ring og nær dato ikke overlapper).
  const plasserte = useMemo<Plassert[]>(() => {
    const byKat = new Map<HjulKategori, HjulHendelse[]>();
    for (const h of synlige) {
      const list = byKat.get(h.kategori) ?? [];
      list.push(h);
      byKat.set(h.kategori, list);
    }

    const offset = new Map<string, number>();
    for (const [, list] of byKat) {
      const sortert = [...list].sort(
        (a, b) => dayOfYear(a.start) - dayOfYear(b.start),
      );
      let i = 0;
      while (i < sortert.length) {
        let j = i + 1;
        while (
          j < sortert.length &&
          dayOfYear(sortert[j].start) - dayOfYear(sortert[j - 1].start) <= KLYNGE_DAGER
        ) {
          j++;
        }
        const klynge = sortert.slice(i, j);
        const n = klynge.length;
        klynge.forEach((h, k) => {
          const o = n === 1 ? 0 : Math.max(-6, Math.min(6, (k - (n - 1) / 2) * 5));
          offset.set(h.id, o);
        });
        i = j;
      }
    }

    return synlige.map((h) => {
      const r = (kategoriRinger.get(h.kategori) ?? MID_RING) + (offset.get(h.id) ?? 0);
      const punkt = hendelseTilPunkt(h, CX, CY, r, data.ar);
      return { h, r, x: svgNum(punkt.x), y: svgNum(punkt.y) };
    });
  }, [synlige, kategoriRinger, data.ar]);

  const hoveredPlassert = hoveredId
    ? (plasserte.find((p) => p.h.id === hoveredId) ?? null)
    : null;
  const valgtPlassert = valgtHendelse
    ? (plasserte.find((p) => p.h.id === valgtHendelse.id) ?? null)
    : null;
  const tooltipMål = hoveredPlassert ?? valgtPlassert;
  const aktivKategori =
    hoveredPlassert?.h.kategori ?? valgtPlassert?.h.kategori ?? null;

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
    const vinkel =
      (dayOfYear(iso) / daysInYear(data.ar)) * 2 * Math.PI - Math.PI / 2;
    return {
      x1: svgNum(CX + (INNER_RING - 6) * Math.cos(vinkel)),
      y1: svgNum(CY + (INNER_RING - 6) * Math.sin(vinkel)),
      x2: svgNum(CX + (OUTER_RING + 16) * Math.cos(vinkel)),
      y2: svgNum(CY + (OUTER_RING + 16) * Math.sin(vinkel)),
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
      className="mx-auto h-auto w-full outline-none focus-visible:ring-2 focus-visible:ring-natural-forest/40 rounded-2xl"
      style={{ maxWidth: maxBredde }}
      role="group"
      aria-label={`Årshjul for ${data.ar} med ${kategoriRinger.size} kategori-ringer. Bruk piltastene for å bla mellom ${synlige.length} hendelser.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <defs>
        {/* Svak lyskuppel: gir hjulet krumning (lysere oppe til venstre). */}
        <radialGradient id="hjul-dome" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fbfbfa" />
          <stop offset="100%" stopColor="#eef0ee" />
        </radialGradient>
        {/* Myk skygge som løfter hendelses-prikkene av ringene. */}
        <filter id="hjul-prikk-skygge" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow
            dx="0"
            dy="1.4"
            stdDeviation="1.6"
            floodColor="#1f2937"
            floodOpacity="0.28"
          />
        </filter>
      </defs>

      {/* Bakgrunns-kuppel bak ringene for et mykt, buet inntrykk. */}
      <circle cx={CX} cy={CY} r={OUTER_RING + 34} fill="url(#hjul-dome)" />

      {/* Kategori-ringer: tegnes inn ved lasting, lyser opp ved hover/valg. */}
      {[...kategoriRinger.entries()].map(([kat, r], i) => {
        const aktiv = kat === aktivKategori;
        return (
          <motion.circle
            key={kat}
            cx={CX}
            cy={CY}
            r={svgNum(r)}
            fill="none"
            stroke={KATEGORI_FARGE[kat]}
            strokeOpacity={aktiv ? 0.6 : 0.25}
            strokeWidth={aktiv ? 2 : 1}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : i * 0.06,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Ring-etiketter: kategorinavn høyrejustert oppe til venstre, der hver bue
          har god luft. Plassert på sin egen ring (radius = mapping) i stedet for
          stablet i det tette midtpartiet. Hvit halo for lesbarhet over ringer/prikker. */}
      {[...kategoriRinger.entries()].map(([kat, r]) => {
        const x = svgNum(CX + r * Math.cos(LABEL_VINKEL) - 7);
        const y = svgNum(CY + r * Math.sin(LABEL_VINKEL));
        return (
          <text
            key={`lbl-${kat}`}
            x={x}
            y={y}
            textAnchor="end"
            dominantBaseline="middle"
            className="text-[10px] font-medium"
            fill={KATEGORI_FARGE[kat]}
            stroke="white"
            strokeWidth={2.5}
            style={{ paintOrder: "stroke" }}
          >
            {KATEGORI_LABEL[kat]}
          </text>
        );
      })}

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
          <circle cx={idag.x2} cy={idag.y2} r={4} fill="#2C5F2D" />
          {!reduce && (
            <motion.circle
              cx={idag.x2}
              cy={idag.y2}
              fill="none"
              stroke="#2C5F2D"
              strokeWidth={1.5}
              initial={{ r: 4, opacity: 0.55 }}
              animate={{ r: [4, 12], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {/* Fast «I dag»-brikke øverst til venstre — kolliderer aldri med månedsmerkene. */}
          <line
            x1={22}
            y1={26}
            x2={44}
            y2={26}
            stroke="#2C5F2D"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
          <text
            x={50}
            y={26}
            dominantBaseline="middle"
            className="fill-natural-forest text-[11px] font-semibold uppercase tracking-wide"
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
        {plasserte.map(({ h, r, x, y }) => {
          const erValgt = valgtHendelse?.id === h.id;
          const erHover = hoveredId === h.id;
          const erNeste = nesteId === h.id;
          const farge = KATEGORI_FARGE[h.kategori];
          const opacity = STATUS_OPACITY[h.status];
          const erAvlyst = h.status === "avlyst";
          const aria = `${h.tittel}, ${formatDateRange(h.start, h.slutt)}, ${STATUS_LABEL[h.status]}`;

          const harSlutt = h.slutt && h.slutt !== h.start;
          const gjent = h.gjentakelse ? lesGjentakelse(h.gjentakelse) : null;
          const aarSlutt = `${data.ar}-12-31`;
          const gjentSlutt =
            gjent?.until && gjent.until < aarSlutt ? gjent.until : aarSlutt;
          // Stiplet bue gir bare mening for sub-årlige kadenser (årlig = én prikk).
          const visBand = gjent !== null && gjent.preset !== "arlig";
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
              <circle cx={x} cy={y} r={14} fill="transparent" />

              {erNeste && !erValgt && !reduce && (
                <motion.circle
                  cx={x}
                  cy={y}
                  fill="none"
                  stroke={farge}
                  strokeWidth={1.5}
                  initial={{ r: dotR, opacity: 0.5 }}
                  animate={{ r: [dotR, dotR + 10], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              )}

              {erValgt && !erAvlyst && (
                <circle cx={x} cy={y} r={dotR + 6} fill={farge} opacity={0.15} />
              )}

              {(visBand || harSlutt) &&
                (() => {
                  const total = daysInYear(data.ar);
                  const sluttDato = visBand ? gjentSlutt : h.slutt!;
                  const vStart = (dayOfYear(h.start) / total) * 2 * Math.PI - Math.PI / 2;
                  const vSlutt = (dayOfYear(sluttDato) / total) * 2 * Math.PI - Math.PI / 2;
                  const largeArc = dayOfYear(sluttDato) - dayOfYear(h.start) > total / 2 ? 1 : 0;
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
                      strokeDasharray={visBand ? "1 6" : undefined}
                      initial={false}
                      animate={{ strokeWidth: erValgt ? 6 : erHover ? 5 : visBand ? 3 : 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    />
                  );
                })()}

              <motion.circle
                cx={x}
                cy={y}
                fill={erAvlyst ? "none" : farge}
                opacity={opacity}
                stroke={erAvlyst ? farge : "white"}
                strokeWidth={2}
                filter="url(#hjul-prikk-skygge)"
                initial={false}
                animate={{ r: dotR }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.g>
          );
        })}
      </motion.g>

      {/* Hover/valg-tooltip — tittel + dato, klemt innenfor viewBox. */}
      {tooltipMål &&
        (() => {
          const tittel = tooltipMål.h.tittel;
          const dato = formatDateRange(tooltipMål.h.start, tooltipMål.h.slutt);
          const bredde = Math.min(248, Math.max(96, Math.max(tittel.length, dato.length) * 6.2 + 18));
          const høyde = 40;
          const maksTegn = Math.floor((bredde - 18) / 6.2);
          const bx = Math.max(4, Math.min(560 - bredde - 4, tooltipMål.x - bredde / 2));
          const overDot = tooltipMål.y - høyde - 12;
          const by = overDot < 4 ? tooltipMål.y + 14 : overDot;
          return (
            <g style={{ pointerEvents: "none" }}>
              <rect
                x={svgNum(bx)}
                y={svgNum(by)}
                width={svgNum(bredde)}
                height={høyde}
                rx={8}
                fill="white"
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={svgNum(bx + 9)}
                y={svgNum(by + 16)}
                className="fill-gray-900 text-[11px] font-semibold"
              >
                {trunkér(tittel, maksTegn)}
              </text>
              <text
                x={svgNum(bx + 9)}
                y={svgNum(by + 31)}
                className="fill-gray-500 text-[10px]"
              >
                {dato}
              </text>
            </g>
          );
        })()}
    </svg>
  );
}
