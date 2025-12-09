'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { safeNumber, createSafeFormatter } from '@/lib/utils/safe-data';

interface KonkurransebildeChartsProps {
  basePath: string;
}

interface KjederVsUavhengige {
  Category: number;
  'Uavhengig (mNOK)': number;
  'Kjeder (mNOK)': number;
}

interface Konseptmiks {
  Bydelnavn: string;
  'Kategori (Nivå 1)': string;
  'Kategori (Nivå 2)': string;
  No: number;
}

interface OverUnderandel {
  Category: string;
  'Dining and Experiences (Thorvald Meyers gate 40B (Område 1.14 km²))': number | null;
  'Retail (Thorvald Meyers gate 40B (Område 1.14 km²))': number | null;
  'Services (Thorvald Meyers gate 40B (Område 1.14 km²))': number | null;
}

interface UtviklingPerAr {
  Category: number;
  'Mat og opplevelser': number;
  Handel: number;
  Tjenester: number;
}

export default function KonkurransebildeCharts({
  basePath,
}: KonkurransebildeChartsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [kjederData, setKjederData] = useState<KjederVsUavhengige[]>([]);
  const [konseptData, setKonseptData] = useState<Konseptmiks[]>([]);
  const [overUnderandelData, setOverUnderandelData] = useState<OverUnderandel[]>([]);
  const [utviklingData, setUtviklingData] = useState<UtviklingPerAr[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [kjeder, konsept, overUnder, utvikling] = await Promise.all([
          fetch(`${basePath}/konkurransebilde/kjeder-vs-uavhengige.json`).then(r => r.json()),
          fetch(`${basePath}/konkurransebilde/konseptmiks.json`).then(r => r.json()),
          fetch(`${basePath}/konkurransebilde/over-og-underandel-vs-kommune.json`).then(r => r.json()),
          fetch(`${basePath}/konkurransebilde/utvikling-per-ar.json`).then(r => r.json()),
        ]);

        setKjederData(kjeder);
        setKonseptData(konsept);
        setOverUnderandelData(overUnder);
        setUtviklingData(utvikling);
        setError(null);
      } catch (err) {
        setError('Kunne ikke laste konkurransebildedata');
        console.error('Error loading konkurransebilde data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [basePath]);

  const tabs = [
    { id: 0, label: 'Kjeder vs. Uavhengige' },
    { id: 1, label: 'Konseptmiks' },
    { id: 2, label: 'Over/underandel' },
    { id: 3, label: 'Utvikling per år' },
  ];

  const safeValueFormatter = createSafeFormatter((v) => v.toFixed(1), 'N/A');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        <p className="mb-1 text-xs font-medium text-gray-500">{label ?? 'Ukjent'}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {safeValueFormatter(entry.value)}%
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
            Konkurransebildet
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
            Konkurransebildet
          </h2>
        </div>
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      </div>
    );
  }

  // Group konsept data by level 1 category
  const konseptGrouped = konseptData.reduce((acc, item) => {
    const category = item['Kategori (Nivå 1)'];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, Konseptmiks[]>);

  const konseptChartData = Object.entries(konseptGrouped).map(([category, items]) => {
    const dataPoint: any = { category };
    items.forEach(item => {
      dataPoint[item['Kategori (Nivå 2)']] = item.No;
    });
    return dataPoint;
  });

  // Get unique subcategories for konsept chart
  const subcategories = Array.from(new Set(konseptData.map(d => d['Kategori (Nivå 2)'])));
  const colors = ['#2d5016', '#4a7c2a', '#6ba83e', '#8cbd52', '#add266'];

  return (
    <div className="mb-12 md:mb-20">
      <div className="mb-6 md:mb-8">
        <h2 className="mb-2 text-2xl font-bold text-natural-forest md:mb-4 md:text-3xl">
          Konkurransebildet
        </h2>
        <p className="text-xs text-gray-600 md:text-sm">
          Analyse av konkurransesituasjonen på Grünerløkka
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
              Kjeder vs. Uavhengige (2015-2025)
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kjederData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="Category"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => `${value.toFixed(0)}%`}
                    label={{
                      value: 'Andel (%)',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="Uavhengig (mNOK)"
                    stackId="1"
                    stroke="#2d5016"
                    fill="#2d5016"
                    fillOpacity={0.6}
                    name="Uavhengig"
                  />
                  <Area
                    type="monotone"
                    dataKey="Kjeder (mNOK)"
                    stackId="1"
                    stroke="#8cbd52"
                    fill="#8cbd52"
                    fillOpacity={0.6}
                    name="Kjeder"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-natural-forest">
              Konseptmiks etter kategori
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={konseptChartData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    label={{
                      value: 'Antall virksomheter',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  {subcategories.slice(0, 5).map((subcat, idx) => (
                    <Bar
                      key={subcat}
                      dataKey={subcat}
                      fill={colors[idx % colors.length]}
                      name={subcat}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 2 && (() => {
          const overUnderChartData = overUnderandelData.map(d => ({
            category: d.Category ?? 'Ukjent',
            value: safeNumber(
              d['Dining and Experiences (Thorvald Meyers gate 40B (Område 1.14 km²))'] ??
              d['Retail (Thorvald Meyers gate 40B (Område 1.14 km²))'] ??
              d['Services (Thorvald Meyers gate 40B (Område 1.14 km²))'],
              0
            )
          })).filter(d => d.value !== 0 || d.category !== 'Ukjent');

          return (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-natural-forest">
                Over-/underandel vs. kommune
              </h3>
              <div className="h-80 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={overUnderChartData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      tickFormatter={(value) => `${value.toFixed(1)}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="category"
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      width={140}
                    />
                    <Tooltip
                      formatter={(value: any) => `${value.toFixed(1)}%`}
                      labelStyle={{ fontSize: '11px' }}
                    />
                    <Bar dataKey="value" name="Over-/underandel">
                      {overUnderChartData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#2d5016' : '#dc2626'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })()}

        {activeTab === 3 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-natural-forest">
              Utvikling per år
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={utviklingData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="Category"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => value.toLocaleString('nb-NO')}
                    label={{
                      value: 'Antall',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip
                    formatter={(value: any) => value.toLocaleString('nb-NO')}
                    labelStyle={{ fontSize: '11px' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Mat og opplevelser"
                    stroke="#2d5016"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Mat og opplevelser"
                  />
                  <Line
                    type="monotone"
                    dataKey="Handel"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Handel"
                  />
                  <Line
                    type="monotone"
                    dataKey="Tjenester"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Tjenester"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
