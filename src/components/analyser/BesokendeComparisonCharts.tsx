'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BesokendeComparisonChartsProps {
  basePath: string;
}

interface AntallHusData {
  category: string;
  grunerlokka: number;
  bjorvika: number;
  sentrum: number;
  majorstuen: number;
}

export default function BesokendeComparisonCharts({
  basePath,
}: BesokendeComparisonChartsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [antallHusData, setAntallHusData] = useState<AntallHusData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetch(`${basePath}/besokende/antall-hus.json`).then(r => r.json());
        setAntallHusData(data);
        setError(null);
      } catch (err) {
        setError('Kunne ikke laste besøkendedata');
        console.error('Error loading besokende comparison data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [basePath]);

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
            {entry.name}: {formatNumber(Math.round(entry.value))}
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
            Besøkende - Områdesammenligning
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
            Besøkende - Områdesammenligning
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
          Besøkende - Områdesammenligning
        </h2>
        <p className="text-xs text-gray-600 md:text-sm">
          Sammenligning av boligtyper på tvers av Oslo-områder
        </p>
      </div>

      {/* Chart Content */}
      <div className="rounded-xl bg-white p-4 shadow-sm md:p-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-natural-forest">
            Antall hus etter boligtype
          </h3>
          <div className="h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={antallHusData} margin={{ top: 10, right: 30, left: 10, bottom: 60 }}>
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
                  tickFormatter={(value) => formatNumber(value)}
                  label={{
                    value: 'Antall bygninger',
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
      </div>
    </div>
  );
}
