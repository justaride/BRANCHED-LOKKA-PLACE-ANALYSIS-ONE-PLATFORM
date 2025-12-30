'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
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
import { safeNumber, createSafeFormatter } from '@/lib/utils/safe-data';

interface KorthandelChartsProps {
  basePath: string;
}

interface ArligVekst {
  DateTime: number;
  'Grünerløkka nord (+5 Urbant område) (x)': number;
  'Grünerløkka nord (+5 Urbant område) - year-to-date (%)': number;
  'NOK (M)': number;
  'Oslo (Kommune) (x)': number;
  'Oslo (Kommune) - year-to-date (%)': number;
  'Norway (Land) (x)': number;
  'Norway (Land) - year-to-date (%)': number;
}

interface KorthandelTidsrom {
  DateTime: string;
  Handel: string;
  sumTransactionAmount: number | null;
  'Handel (batchDate)': string;
  'Mat og opplevelser': string;
  'Mat og opplevelser (batchDate)': string;
  Tjenester: string | null;
  'Tjenester (batchDate)': string | null;
}

interface KorthandelUkedag {
  DateTime: string;
  '2024': number;
}

interface IndeksertVekst {
  DateTime: number;
  'Grünerløkka nord (+5 Urbant område)': number;
  'Oslo (Kommune)': number;
  'Norway (Land)': number;
}

export default function KorthandelCharts({ basePath }: KorthandelChartsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [vekstData, setVekstData] = useState<ArligVekst[]>([]);
  const [tidsromData, setTidsromData] = useState<KorthandelTidsrom[]>([]);
  const [ukedagData, setUkedagData] = useState<KorthandelUkedag[]>([]);
  const [indeksData, setIndeksData] = useState<IndeksertVekst[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [vekst, tidsrom, ukedag, indeks] = await Promise.all([
          fetch(`${basePath}/korthandel/arlig-vekst.json`).then(r => r.json()),
          fetch(`${basePath}/korthandel/korthandel-i-valgt-tidsrom.json`).then(r => r.json()),
          fetch(`${basePath}/korthandel/korthandel-per-ukedag.json`).then(r => r.json()),
          fetch(`${basePath}/korthandel/indeksert-vekst.json`).then(r => r.json()),
        ]);

        setVekstData(vekst);
        setTidsromData(tidsrom);
        setUkedagData(ukedag);
        setIndeksData(indeks);
        setError(null);
      } catch (err) {
        setError('Kunne ikke laste korthandeldata');
        console.error('Error loading korthandel data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [basePath]);

  // Aggregate daily data to monthly for better readability with null-safe handling
  const monthlyData = useMemo(() => {
    const monthly: Record<string, { month: string; Handel: number; 'Mat og opplevelser': number; Tjenester: number; count: number }> = {};

    tidsromData.forEach(day => {
      const batchDate = day['Handel (batchDate)'] || day['Mat og opplevelser (batchDate)'];
      if (!batchDate) return;

      const date = new Date(batchDate);
      if (isNaN(date.getTime())) return;

      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthly[monthKey]) {
        monthly[monthKey] = {
          month: monthKey,
          Handel: 0,
          'Mat og opplevelser': 0,
          Tjenester: 0,
          count: 0,
        };
      }

      monthly[monthKey].Handel += safeNumber(day.sumTransactionAmount, 0);
      monthly[monthKey]['Mat og opplevelser'] += safeNumber(day.sumTransactionAmount, 0);
      monthly[monthKey].Tjenester += safeNumber(day.sumTransactionAmount, 0);
      monthly[monthKey].count += 1;
    });

    return Object.values(monthly)
      .filter(m => m.count > 0)
      .map(m => ({
        month: m.month,
        Handel: m.Handel,
        'Mat og opplevelser': m['Mat og opplevelser'],
        Tjenester: m.Tjenester,
      }));
  }, [tidsromData]);

  const norwegianUkedagData = useMemo(() => {
    // Map English weekday names to Norwegian
    const weekdayMap: Record<string, string> = {
      'Monday': 'man.',
      'Tuesday': 'tir.',
      'Wednesday': 'ons.',
      'Thursday': 'tor.',
      'Friday': 'fre.',
      'Saturday': 'lør.',
      'Sunday': 'søn.',
    };
    return ukedagData.map(d => ({
      ukedag: weekdayMap[d.DateTime] || d.DateTime,
      prosent: d['2024'],
    }));
  }, [ukedagData]);

  const tabs = [
    { id: 0, label: 'Årlig vekst' },
    { id: 1, label: 'Korthandel i 2024' },
    { id: 2, label: 'Per ukedag' },
    { id: 3, label: 'Indeksert vekst' },
  ];

  const safeValueFormatter = createSafeFormatter((v) => v.toFixed(2), 'N/A');

  interface TooltipPayload {
    name: string;
    value: number;
    color: string;
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string | number }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        <p className="mb-1 text-xs font-medium text-gray-500">{label ?? 'Ukjent'}</p>
        {payload.map((entry, index) => (
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
            Korthandel
          </h2>
        </div>
        <div className="flex h-96 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-12 rounded-xl bg-white p-6 shadow-sm md:mb-20">
        <div className="mb-6 md:mb-8">
          <h2 className="mb-2 text-2xl font-bold text-natural-forest md:mb-4 md:text-3xl">
            Korthandel
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
          Korthandel
        </h2>
        <p className="text-xs text-gray-600 md:text-sm">
          Analyse av korthandeldata på Grünerløkka
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
                ? 'bg-blue-600 text-white shadow-sm'
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
            <h3 className="mb-4 text-lg font-semibold text-blue-600">
              Årlig vekst i korthandel
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vekstData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="DateTime"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => `${value.toFixed(1)}%`}
                    label={{
                      value: 'Vekst (%)',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Grünerløkka nord (+5 Urbant område) - year-to-date (%)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Grünerløkka"
                  />
                  <Line
                    type="monotone"
                    dataKey="Oslo (Kommune) - year-to-date (%)"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Oslo"
                  />
                  <Line
                    type="monotone"
                    dataKey="Norway (Land) - year-to-date (%)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Norge"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-blue-600">
              Korthandel i 2024 (månedlig)
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => `${value.toFixed(0)} M`}
                    label={{
                      value: 'NOK (millioner)',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip
                    formatter={(value: number) => `NOK ${value.toFixed(2)} M`}
                    labelStyle={{ fontSize: '11px' }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="Handel"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Handel"
                  />
                  <Area
                    type="monotone"
                    dataKey="Mat og opplevelser"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Mat og opplevelser"
                  />
                  <Area
                    type="monotone"
                    dataKey="Tjenester"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                    name="Tjenester"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-blue-600">
              Korthandel fordelt på ukedag
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={norwegianUkedagData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="ukedag"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => `${value.toFixed(1)}%`}
                    label={{
                      value: 'Andel (%)',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip
                    formatter={(value: number) => `${value.toFixed(2)}%`}
                    labelStyle={{ fontSize: '11px' }}
                  />
                  <Bar dataKey="prosent" fill="#3b82f6" name="Andel av ukentlig omsetning" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-blue-600">
              Indeksert vekst (2024 = 100)
            </h3>
            <div className="rounded-lg bg-blue-50 p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {indeksData.map((data) => (
                  <div key={data.DateTime}>
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                      <p className="mb-2 text-sm text-gray-600">Grünerløkka</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {data['Grünerløkka nord (+5 Urbant område)']}
                      </p>
                    </div>
                    <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
                      <p className="mb-2 text-sm text-gray-600">Oslo</p>
                      <p className="text-3xl font-bold text-green-600">
                        {data['Oslo (Kommune)']}
                      </p>
                    </div>
                    <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
                      <p className="mb-2 text-sm text-gray-600">Norge</p>
                      <p className="text-3xl font-bold text-amber-600">
                        {data['Norway (Land)']}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-gray-600">
                Baseline: 2024 = 100
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
