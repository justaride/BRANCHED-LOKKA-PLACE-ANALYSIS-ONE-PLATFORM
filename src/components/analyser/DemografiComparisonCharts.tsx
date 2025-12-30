'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DemografiComparisonChartsProps {
  basePath: string;
}

interface DemografiData {
  category: string;
  grunerlokka_mann: number;
  grunerlokka_kvinne: number;
  bjorvika_mann: number;
  bjorvika_kvinne: number;
  sentrum_mann: number;
  sentrum_kvinne: number;
  majorstuen_mann: number;
  majorstuen_kvinne: number;
}

interface HusholdningstypeData {
  category: string;
  grunerlokka: number;
  bjorvika: number;
  sentrum: number;
  majorstuen: number;
}

interface InntektsData {
  category: string;
  grunerlokka: number;
  bjorvika: number;
  sentrum: number;
  majorstuen: number;
}

interface MedianinntektData {
  category: string;
  grunerlokka: number;
  bjorvika: number;
  sentrum: number;
  majorstuen: number;
}

export default function DemografiComparisonCharts({
  basePath,
}: DemografiComparisonChartsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [demografiData, setDemografiData] = useState<DemografiData[]>([]);
  const [husholdningsData, setHusholdningsData] = useState<HusholdningstypeData[]>([]);
  const [inntektsData, setInntektsData] = useState<InntektsData[]>([]);
  const [medianinntektData, setMedianinntektData] = useState<MedianinntektData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [demografi, husholdning, inntekt, medianinntekt] = await Promise.all([
          fetch(`${basePath}/demografi/besokende-demografi.json`).then(r => r.json()),
          fetch(`${basePath}/demografi/husholdningstypefordeling.json`).then(r => r.json()),
          fetch(`${basePath}/demografi/inntektsfordeling.json`).then(r => r.json()),
          fetch(`${basePath}/demografi/medianinntekt-per-husholdningstype.json`).then(r => r.json()),
        ]);

        setDemografiData(demografi);
        setHusholdningsData(husholdning);
        setInntektsData(inntekt);
        setMedianinntektData(medianinntekt);
        setError(null);
      } catch (err) {
        setError('Kunne ikke laste demografidata');
        console.error('Error loading demografi comparison data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [basePath]);

  const tabs = [
    { id: 0, label: 'Aldersfordeling' },
    { id: 1, label: 'Husholdningstype' },
    { id: 2, label: 'Inntektsfordeling' },
    { id: 3, label: 'Medianinntekt' },
  ];

  const formatNumber = (num: number) => {
    return num.toLocaleString('nb-NO');
  };

  const formatCurrency = (num: number) => {
    return `kr ${Math.round(num).toLocaleString('nb-NO')}`;
  };

  interface TooltipPayload {
    name: string;
    value: number;
    color: string;
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {formatNumber(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  const CurrencyTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="mb-12 rounded-xl bg-white p-6 shadow-sm md:mb-20">
        <div className="mb-6 md:mb-8">
          <h2 className="mb-2 text-2xl font-bold text-natural-forest md:mb-4 md:text-3xl">
            Demografi - Områdesammenligning
          </h2>
        </div>
        <div className="flex h-96 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-natural-forest border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-12 rounded-xl bg-white p-6 shadow-sm md:mb-20">
        <div className="mb-6 md:mb-8">
          <h2 className="mb-2 text-2xl font-bold text-natural-forest md:mb-4 md:text-3xl">
            Demografi - Områdesammenligning
          </h2>
        </div>
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <div className="mb-12 md:mb-20">
      <div className="mb-6 md:mb-8">
        <h2 className="mb-2 text-2xl font-bold text-natural-forest md:mb-4 md:text-3xl">
          Demografi - Områdesammenligning
        </h2>
        <p className="text-xs text-gray-600 md:text-sm">
          Sammenligning av demografiske data på tvers av Oslo-områder
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-all md:px-4 md:text-sm ${
              activeTab === tab.id
                ? 'bg-natural-forest text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart Content */}
      <div className="rounded-xl bg-white p-4 shadow-sm md:p-6">
        {activeTab === 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-natural-forest">
              Aldersfordeling etter kjønn
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demografiData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => formatNumber(value)}
                    label={{
                      value: 'Antall',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  {/* Grünerløkka */}
                  <Bar dataKey="grunerlokka_mann" fill="#2D5F3F" name="Grünerløkka - Mann" />
                  <Bar dataKey="grunerlokka_kvinne" fill="#2D5F3F" fillOpacity={0.7} name="Grünerløkka - Kvinne" />
                  {/* Bjørvika */}
                  <Bar dataKey="bjorvika_mann" fill="#4A90E2" name="Bjørvika - Mann" />
                  <Bar dataKey="bjorvika_kvinne" fill="#4A90E2" fillOpacity={0.7} name="Bjørvika - Kvinne" />
                  {/* Sentrum */}
                  <Bar dataKey="sentrum_mann" fill="#E74C3C" name="Sentrum - Mann" />
                  <Bar dataKey="sentrum_kvinne" fill="#E74C3C" fillOpacity={0.7} name="Sentrum - Kvinne" />
                  {/* Majorstuen */}
                  <Bar dataKey="majorstuen_mann" fill="#9B59B6" name="Majorstuen - Mann" />
                  <Bar dataKey="majorstuen_kvinne" fill="#9B59B6" fillOpacity={0.7} name="Majorstuen - Kvinne" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-natural-forest">
              Husholdningstypefordeling
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={husholdningsData} margin={{ top: 10, right: 30, left: 10, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => formatNumber(value)}
                    label={{
                      value: 'Antall',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="grunerlokka" fill="#2D5F3F" name="Grünerløkka" />
                  <Bar dataKey="bjorvika" fill="#4A90E2" name="Bjørvika" />
                  <Bar dataKey="sentrum" fill="#E74C3C" name="Sentrum" />
                  <Bar dataKey="majorstuen" fill="#9B59B6" name="Majorstuen" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-natural-forest">
              Inntektsfordeling
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inntektsData} margin={{ top: 10, right: 30, left: 10, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 9, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => formatNumber(value)}
                    label={{
                      value: 'Antall',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line
                    type="monotone"
                    dataKey="grunerlokka"
                    stroke="#2D5F3F"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Grünerløkka"
                  />
                  <Line
                    type="monotone"
                    dataKey="bjorvika"
                    stroke="#4A90E2"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Bjørvika"
                  />
                  <Line
                    type="monotone"
                    dataKey="sentrum"
                    stroke="#E74C3C"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Sentrum"
                  />
                  <Line
                    type="monotone"
                    dataKey="majorstuen"
                    stroke="#9B59B6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Majorstuen"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-natural-forest">
              Medianinntekt per husholdningstype
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={medianinntektData} margin={{ top: 10, right: 30, left: 10, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                    label={{
                      value: 'Medianinntekt (NOK)',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip content={<CurrencyTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="grunerlokka" fill="#2D5F3F" name="Grünerløkka" />
                  <Bar dataKey="bjorvika" fill="#4A90E2" name="Bjørvika" />
                  <Bar dataKey="sentrum" fill="#E74C3C" name="Sentrum" />
                  <Bar dataKey="majorstuen" fill="#9B59B6" name="Majorstuen" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
