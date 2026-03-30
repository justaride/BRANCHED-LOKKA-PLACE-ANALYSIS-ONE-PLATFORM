'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { safeNumber } from '@/lib/utils/safe-data';
import DataMethodology from './DataMethodology';
import InfoTooltip from '@/components/ui/InfoTooltip';
import { METRIC_TOOLTIPS } from '@/lib/content/metric-tooltips';

interface BevegelseChartsProps {
  basePath: string;
}

interface BesokPerTime {
  Category: string;
  [key: string]: string | number;
}

interface BesokPerUkedag {
  Category: string;
  [key: string]: string | number;
}

interface Bevegelsesmonster {
  Category: string;
  [key: string]: string | number | null;
}

interface OmraderBesokende {
  Område: string;
  'Antall besøk': number;
  'Antall besøk(%)': number;
}

export default function BevegelseCharts({ basePath }: BevegelseChartsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [besokTimeData, setBesokTimeData] = useState<BesokPerTime[]>([]);
  const [besokUkedagData, setBesokUkedagData] = useState<BesokPerUkedag[]>([]);
  const [bevegelsesmonsterData, setBevegelsesmonsterData] = useState<Bevegelsesmonster[]>([]);
  const [omraderData, setOmraderData] = useState<OmraderBesokende[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [besokTime, besokUkedag, bevegelse, omrader] = await Promise.all([
          fetch(`${basePath}/bevegelse/besok-per-time.json`).then(r => r.json()),
          fetch(`${basePath}/bevegelse/besok-per-ukedag.json`).then(r => r.json()),
          fetch(`${basePath}/bevegelse/bevegelsesmonster.json`).then(r => r.json()),
          fetch(`${basePath}/bevegelse/omrader-besokende-kommer-fra.json`).then(r => r.json()),
        ]);

        setBesokTimeData(besokTime);
        setBesokUkedagData(besokUkedag);
        setBevegelsesmonsterData(bevegelse);
        setOmraderData(omrader);
        setError(null);
      } catch (err) {
        setError('Kunne ikke laste bevegelsedata');
        console.error('Error loading bevegelse data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [basePath]);

  const findKey = (obj: Record<string, unknown>, substring: string): string | undefined => {
    return Object.keys(obj).find(k => k.includes(substring));
  };

  const timeChartData = useMemo(() => {
    if (besokTimeData.length === 0) return [];
    const sample = besokTimeData[0];
    const besokendeKey = findKey(sample, 'Besøkende');
    const jobbKey = findKey(sample, 'På jobb');
    const hjemmeKey = findKey(sample, 'Hjemme');
    return besokTimeData.map(d => ({
      time: d.Category ?? 'Ukjent',
      Besøkende: safeNumber(besokendeKey ? d[besokendeKey] : 0, 0),
      'På jobb': safeNumber(jobbKey ? d[jobbKey] : 0, 0),
      Hjemme: safeNumber(hjemmeKey ? d[hjemmeKey] : 0, 0),
    }));
  }, [besokTimeData]);

  const ukedagChartData = useMemo(() => {
    if (besokUkedagData.length === 0) return [];
    const sample = besokUkedagData[0];
    const besokendeKey = findKey(sample, 'Besøkende');
    const jobbKey = findKey(sample, 'På jobb');
    const hjemmeKey = findKey(sample, 'Hjemme');
    return besokUkedagData.map(d => ({
      ukedag: d.Category ?? 'Ukjent',
      Besøkende: safeNumber(besokendeKey ? d[besokendeKey] : 0, 0),
      'På jobb': safeNumber(jobbKey ? d[jobbKey] : 0, 0),
      Hjemme: safeNumber(hjemmeKey ? d[hjemmeKey] : 0, 0),
    }));
  }, [besokUkedagData]);

  const bevegelseLineData = useMemo(() => {
    if (bevegelsesmonsterData.length === 0) return [];
    const sample = bevegelsesmonsterData[0];
    const besokendeKeys = Object.keys(sample).filter(k => k.includes('Besøkende'));
    const years = besokendeKeys.map(k => {
      const match = k.match(/(\d{4})$/);
      return match ? match[1] : null;
    }).filter(Boolean) as string[];

    const flattened: { quarter: string; Besøkende: number; 'På jobb': number; Hjemme: number }[] = [];
    bevegelsesmonsterData.forEach(q => {
      years.forEach(year => {
        const besokendeKey = Object.keys(q).find(k => k.includes('Besøkende') && k.endsWith(year));
        const jobbKey = Object.keys(q).find(k => k.includes('På jobb') && k.endsWith(year));
        const hjemmeKey = Object.keys(q).find(k => k.includes('Hjemme') && k.endsWith(year));

        const besokende = besokendeKey ? q[besokendeKey] : null;
        if (besokende !== null && besokende !== undefined) {
          flattened.push({
            quarter: `${q.Category ?? 'Q?'} ${year}`,
            Besøkende: safeNumber(besokende, 0),
            'På jobb': safeNumber(jobbKey ? q[jobbKey] : 0, 0),
            Hjemme: safeNumber(hjemmeKey ? q[hjemmeKey] : 0, 0),
          });
        }
      });
    });
    return flattened;
  }, [bevegelsesmonsterData]);

  // Top 20 areas with null-safe sorting
  const top20Areas = useMemo(() => {
    return omraderData
      .filter(d => d['Antall besøk'] !== null && d['Antall besøk'] !== undefined)
      .sort((a, b) => safeNumber(b['Antall besøk'], 0) - safeNumber(a['Antall besøk'], 0))
      .slice(0, 20);
  }, [omraderData]);

  const tabs = [
    { id: 0, label: 'Besøk per time' },
    { id: 1, label: 'Per ukedag' },
    { id: 2, label: 'Bevegelsesmønster' },
    { id: 3, label: 'Områder' },
  ];

  const formatNumber = (num: unknown) => {
    const value = safeNumber(num, 0);
    return value.toLocaleString('nb-NO');
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
        <p className="mb-1 text-xs font-medium text-gray-500">{label ?? 'Ukjent'}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {formatNumber(entry.value)}
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
            Bevegelse og besøk
          </h2>
        </div>
        <div className="flex h-96 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-12 rounded-xl bg-white p-6 shadow-sm md:mb-20">
        <div className="mb-6 md:mb-8">
          <h2 className="mb-2 text-2xl font-bold text-natural-forest md:mb-4 md:text-3xl">
            Bevegelse og besøk
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
          Bevegelse og besøk
        </h2>
        <div className="relative">
          <DataMethodology variant="compact" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-all md:px-4 md:text-sm ${
              activeTab === tab.id
                ? 'bg-teal-600 text-white shadow-sm'
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
            <h3 className="mb-4 text-lg font-semibold text-teal-600">
              Besøk per time (24-timersprofil)
              <InfoTooltip text={METRIC_TOOLTIPS.besokPerTime} />
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeChartData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="time"
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Besøkende"
                    stroke="#0d9488"
                    strokeWidth={2}
                    dot={false}
                    name="Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="På jobb"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    name="På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="Hjemme"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    name="Hjemme"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-teal-600">
              Besøk per ukedag
              <InfoTooltip text={METRIC_TOOLTIPS.besokPerUkedag} />
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ukedagChartData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="ukedag"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
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
                  <Legend />
                  <Bar dataKey="Besøkende" fill="#0d9488" name="Besøkende" />
                  <Bar dataKey="På jobb" fill="#3b82f6" name="På jobb" />
                  <Bar dataKey="Hjemme" fill="#10b981" name="Hjemme" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-teal-600">
              Bevegelsesmønster (kvartalsvis 2023-2025)
              <InfoTooltip text={METRIC_TOOLTIPS.bevegelsesmonster} />
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bevegelseLineData} margin={{ top: 10, right: 30, left: 10, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="quarter"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Besøkende"
                    stroke="#0d9488"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="På jobb"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="Hjemme"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Hjemme"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-teal-600">
              Top 20 områder besøkende kommer fra
              <InfoTooltip text={METRIC_TOOLTIPS.omraderBesokende} />
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={top20Areas}
                  layout="vertical"
                  margin={{ top: 10, right: 50, left: 120, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <YAxis
                    type="category"
                    dataKey="Område"
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    width={110}
                  />
                  <Tooltip
                    formatter={(value: number) => formatNumber(value)}
                    labelStyle={{ fontSize: '11px' }}
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                          <p className="mb-1 text-xs font-medium text-gray-500">{data.Område}</p>
                          <p className="text-sm font-semibold text-teal-600">
                            {formatNumber(data['Antall besøk'])} besøk
                          </p>
                          <p className="text-sm text-gray-600">
                            {data['Antall besøk(%)'].toFixed(2)}%
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="Antall besøk" fill="#0d9488" name="Antall besøk">
                    {/* Add percentage labels */}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
