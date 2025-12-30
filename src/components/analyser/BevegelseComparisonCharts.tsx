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

interface BevegelseComparisonChartsProps {
  basePath: string;
}

interface BesokPerTime {
  category: string;
  grunerlokka_besokende: number;
  grunerlokka_paJobb: number;
  grunerlokka_hjemme: number;
  bjorvika_besokende: number;
  bjorvika_paJobb: number;
  bjorvika_hjemme: number;
  sentrum_besokende: number;
  sentrum_paJobb: number;
  sentrum_hjemme: number;
  majorstuen_besokende: number;
  majorstuen_paJobb: number;
  majorstuen_hjemme: number;
}

interface BesokPerUkedag {
  category: string;
  grunerlokka_besokende: number;
  grunerlokka_paJobb: number;
  grunerlokka_hjemme: number;
  bjorvika_besokende: number;
  bjorvika_paJobb: number;
  bjorvika_hjemme: number;
  sentrum_besokende: number;
  sentrum_paJobb: number;
  sentrum_hjemme: number;
  majorstuen_besokende: number;
  majorstuen_paJobb: number;
  majorstuen_hjemme: number;
}

interface Bevegelsesmonster {
  category: string;
  grunerlokka_besokende: number;
  grunerlokka_paJobb: number;
  grunerlokka_hjemme: number;
  bjorvika_besokende: number;
  bjorvika_paJobb: number;
  bjorvika_hjemme: number;
  sentrum_besokende: number;
  sentrum_paJobb: number;
  sentrum_hjemme: number;
  majorstuen_besokende: number;
  majorstuen_paJobb: number;
  majorstuen_hjemme: number;
}

export default function BevegelseComparisonCharts({
  basePath,
}: BevegelseComparisonChartsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [besokTimeData, setBesokTimeData] = useState<BesokPerTime[]>([]);
  const [besokUkedagData, setBesokUkedagData] = useState<BesokPerUkedag[]>([]);
  const [bevegelsesmonsterData, setBevegelsesmonsterData] = useState<Bevegelsesmonster[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [besokTime, besokUkedag, bevegelse] = await Promise.all([
          fetch(`${basePath}/bevegelse/besok-per-time.json`).then(r => r.json()),
          fetch(`${basePath}/bevegelse/besok-per-ukedag.json`).then(r => r.json()),
          fetch(`${basePath}/bevegelse/bevegelsesmonster.json`).then(r => r.json()),
        ]);

        setBesokTimeData(besokTime);
        setBesokUkedagData(besokUkedag);
        setBevegelsesmonsterData(bevegelse);
        setError(null);
      } catch (err) {
        setError('Kunne ikke laste bevegelsedata');
        console.error('Error loading bevegelse comparison data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [basePath]);

  const tabs = [
    { id: 0, label: 'Besøk per time' },
    { id: 1, label: 'Besøk per ukedag' },
    { id: 2, label: 'Bevegelsesmønster' },
  ];

  const formatNumber = (num: number) => {
    return num.toLocaleString('nb-NO');
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

  if (loading) {
    return (
      <div className="mb-12 rounded-xl bg-white p-6 shadow-sm md:mb-20">
        <div className="mb-6 md:mb-8">
          <h2 className="mb-2 text-2xl font-bold text-natural-forest md:mb-4 md:text-3xl">
            Bevegelse - Områdesammenligning
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
            Bevegelse - Områdesammenligning
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
          Bevegelse - Områdesammenligning
        </h2>
        <p className="text-xs text-gray-600 md:text-sm">
          Sammenligning av bevegelsesmønstre på tvers av Oslo-områder
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
              Besøk per time (24-timersprofil)
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={besokTimeData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
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
                      value: 'Antall besøkende',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  {/* Grünerløkka */}
                  <Line
                    type="monotone"
                    dataKey="grunerlokka_besokende"
                    stroke="#2D5F3F"
                    strokeWidth={2}
                    dot={false}
                    name="Grünerløkka - Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="grunerlokka_paJobb"
                    stroke="#2D5F3F"
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Grünerløkka - På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="grunerlokka_hjemme"
                    stroke="#2D5F3F"
                    strokeWidth={2}
                    strokeOpacity={0.3}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Grünerløkka - Hjemme"
                  />
                  {/* Bjørvika */}
                  <Line
                    type="monotone"
                    dataKey="bjorvika_besokende"
                    stroke="#4A90E2"
                    strokeWidth={2}
                    dot={false}
                    name="Bjørvika - Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="bjorvika_paJobb"
                    stroke="#4A90E2"
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Bjørvika - På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="bjorvika_hjemme"
                    stroke="#4A90E2"
                    strokeWidth={2}
                    strokeOpacity={0.3}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Bjørvika - Hjemme"
                  />
                  {/* Sentrum */}
                  <Line
                    type="monotone"
                    dataKey="sentrum_besokende"
                    stroke="#E74C3C"
                    strokeWidth={2}
                    dot={false}
                    name="Sentrum - Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="sentrum_paJobb"
                    stroke="#E74C3C"
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Sentrum - På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="sentrum_hjemme"
                    stroke="#E74C3C"
                    strokeWidth={2}
                    strokeOpacity={0.3}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Sentrum - Hjemme"
                  />
                  {/* Majorstuen */}
                  <Line
                    type="monotone"
                    dataKey="majorstuen_besokende"
                    stroke="#9B59B6"
                    strokeWidth={2}
                    dot={false}
                    name="Majorstuen - Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="majorstuen_paJobb"
                    stroke="#9B59B6"
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Majorstuen - På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="majorstuen_hjemme"
                    stroke="#9B59B6"
                    strokeWidth={2}
                    strokeOpacity={0.3}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Majorstuen - Hjemme"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-natural-forest">
              Besøk per ukedag
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={besokUkedagData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => formatNumber(value)}
                    label={{
                      value: 'Antall besøkende',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  {/* Grünerløkka */}
                  <Bar dataKey="grunerlokka_besokende" stackId="grunerlokka" fill="#2D5F3F" name="Grünerløkka - Besøkende" />
                  <Bar dataKey="grunerlokka_paJobb" stackId="grunerlokka" fill="#2D5F3F" fillOpacity={0.5} name="Grünerløkka - På jobb" />
                  <Bar dataKey="grunerlokka_hjemme" stackId="grunerlokka" fill="#2D5F3F" fillOpacity={0.3} name="Grünerløkka - Hjemme" />
                  {/* Bjørvika */}
                  <Bar dataKey="bjorvika_besokende" stackId="bjorvika" fill="#4A90E2" name="Bjørvika - Besøkende" />
                  <Bar dataKey="bjorvika_paJobb" stackId="bjorvika" fill="#4A90E2" fillOpacity={0.5} name="Bjørvika - På jobb" />
                  <Bar dataKey="bjorvika_hjemme" stackId="bjorvika" fill="#4A90E2" fillOpacity={0.3} name="Bjørvika - Hjemme" />
                  {/* Sentrum */}
                  <Bar dataKey="sentrum_besokende" stackId="sentrum" fill="#E74C3C" name="Sentrum - Besøkende" />
                  <Bar dataKey="sentrum_paJobb" stackId="sentrum" fill="#E74C3C" fillOpacity={0.5} name="Sentrum - På jobb" />
                  <Bar dataKey="sentrum_hjemme" stackId="sentrum" fill="#E74C3C" fillOpacity={0.3} name="Sentrum - Hjemme" />
                  {/* Majorstuen */}
                  <Bar dataKey="majorstuen_besokende" stackId="majorstuen" fill="#9B59B6" name="Majorstuen - Besøkende" />
                  <Bar dataKey="majorstuen_paJobb" stackId="majorstuen" fill="#9B59B6" fillOpacity={0.5} name="Majorstuen - På jobb" />
                  <Bar dataKey="majorstuen_hjemme" stackId="majorstuen" fill="#9B59B6" fillOpacity={0.3} name="Majorstuen - Hjemme" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-natural-forest">
              Bevegelsesmønster (2023-2024)
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bevegelsesmonsterData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
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
                      value: 'Gjennomsnittlig daglig besøk',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 11, fill: '#6b7280' },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  {/* Grünerløkka */}
                  <Line
                    type="monotone"
                    dataKey="grunerlokka_besokende"
                    stroke="#2D5F3F"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Grünerløkka - Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="grunerlokka_paJobb"
                    stroke="#2D5F3F"
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                    name="Grünerløkka - På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="grunerlokka_hjemme"
                    stroke="#2D5F3F"
                    strokeWidth={2}
                    strokeOpacity={0.3}
                    strokeDasharray="3 3"
                    dot={{ r: 3 }}
                    name="Grünerløkka - Hjemme"
                  />
                  {/* Bjørvika */}
                  <Line
                    type="monotone"
                    dataKey="bjorvika_besokende"
                    stroke="#4A90E2"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Bjørvika - Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="bjorvika_paJobb"
                    stroke="#4A90E2"
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                    name="Bjørvika - På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="bjorvika_hjemme"
                    stroke="#4A90E2"
                    strokeWidth={2}
                    strokeOpacity={0.3}
                    strokeDasharray="3 3"
                    dot={{ r: 3 }}
                    name="Bjørvika - Hjemme"
                  />
                  {/* Sentrum */}
                  <Line
                    type="monotone"
                    dataKey="sentrum_besokende"
                    stroke="#E74C3C"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Sentrum - Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="sentrum_paJobb"
                    stroke="#E74C3C"
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                    name="Sentrum - På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="sentrum_hjemme"
                    stroke="#E74C3C"
                    strokeWidth={2}
                    strokeOpacity={0.3}
                    strokeDasharray="3 3"
                    dot={{ r: 3 }}
                    name="Sentrum - Hjemme"
                  />
                  {/* Majorstuen */}
                  <Line
                    type="monotone"
                    dataKey="majorstuen_besokende"
                    stroke="#9B59B6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Majorstuen - Besøkende"
                  />
                  <Line
                    type="monotone"
                    dataKey="majorstuen_paJobb"
                    stroke="#9B59B6"
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                    name="Majorstuen - På jobb"
                  />
                  <Line
                    type="monotone"
                    dataKey="majorstuen_hjemme"
                    stroke="#9B59B6"
                    strokeWidth={2}
                    strokeOpacity={0.3}
                    strokeDasharray="3 3"
                    dot={{ r: 3 }}
                    name="Majorstuen - Hjemme"
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
