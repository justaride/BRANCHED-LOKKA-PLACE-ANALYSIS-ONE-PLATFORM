'use client';

import dynamic from 'next/dynamic';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const FootfallBubbleMap = dynamic(
  () => import('@/components/analyser/FootfallBubbleMap'),
  { ssr: false, loading: () => <div className="flex h-[600px] items-center justify-center rounded-xl bg-gray-50"><span className="text-gray-400">Laster kart...</span></div> }
);

type FootfallData = {
  metadata: {
    generated: string
    periode: string
    kilde: string
    antallSoner: number
    sonerMedData: number
    sonerUtenData: number
    note: string
  }
  aggregert: {
    dagligBesokende: number
    dagligTotal: number
    travlesteDag: string
    travlesteTime: string
    lordagAndel: number
  }
  mikrosoner: Array<{
    id: string
    navn: string
    kortNavn: string
    dagligBesokende: number
    areal: number
    lat: number
    lng: number
    harData: boolean
  }>
  timefordeling: Array<{ time: string; besokende: number }>
  ukedagsfordeling: Array<{ dag: string; besokende: number }>
}

type ArsmotetClientProps = {
  footfallData: FootfallData
  mapOnly?: boolean
}

const PEAK_COLOR = '#2D5F3F';
const BAR_COLOR = '#4A9E6F';

export default function ArsmotetClient({ footfallData, mapOnly }: ArsmotetClientProps) {
  if (mapOnly) {
    return <FootfallBubbleMap mikrosoner={footfallData.mikrosoner} height="600px" />;
  }

  const maxHourly = Math.max(...footfallData.timefordeling.map(t => t.besokende));
  const maxWeekday = Math.max(...footfallData.ukedagsfordeling.map(d => d.besokende));

  return (
    <div className="space-y-8">
      {/* Timefordeling */}
      <div className="rounded-xl border border-gray-200/50 bg-white p-5 shadow-sm md:p-8">
        <h3 className="mb-1 text-lg font-bold text-natural-forest">Besøkende per time</h3>
        <p className="mb-6 text-xs text-gray-500">Aggregert fra {footfallData.metadata.sonerMedData} mikro-områder, daglig gjennomsnitt</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={footfallData.timefordeling} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11 }}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickFormatter={(v: number) => v.toLocaleString('nb-NO')}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.[0]) return null;
                return (
                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-lg">
                    <div className="font-semibold text-natural-forest">Kl. {label}</div>
                    <div>{(payload[0].value as number).toLocaleString('nb-NO')} besøkende</div>
                  </div>
                );
              }}
            />
            <Bar dataKey="besokende" radius={[3, 3, 0, 0]}>
              {footfallData.timefordeling.map((entry) => (
                <Cell
                  key={entry.time}
                  fill={entry.besokende === maxHourly ? PEAK_COLOR : BAR_COLOR}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Ukedagsfordeling */}
      <div className="rounded-xl border border-gray-200/50 bg-white p-5 shadow-sm md:p-8">
        <h3 className="mb-1 text-lg font-bold text-natural-forest">Besøkende per ukedag</h3>
        <p className="mb-6 text-xs text-gray-500">Daglig gjennomsnitt besøkende, aggregert</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={footfallData.ukedagsfordeling} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="dag" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 11 }}
              tickFormatter={(v: number) => v.toLocaleString('nb-NO')}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.[0]) return null;
                return (
                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-lg">
                    <div className="font-semibold text-natural-forest">{label}</div>
                    <div>{(payload[0].value as number).toLocaleString('nb-NO')} besøkende</div>
                  </div>
                );
              }}
            />
            <Bar dataKey="besokende" radius={[3, 3, 0, 0]}>
              {footfallData.ukedagsfordeling.map((entry) => (
                <Cell
                  key={entry.dag}
                  fill={entry.besokende === maxWeekday ? PEAK_COLOR : BAR_COLOR}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
