'use client';

import { useState, useEffect, useMemo } from 'react';
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

interface InternasjonalComparisonChartsProps {
  basePath: string;
}

interface LandData {
  category: string;
  grunerlokka: number | null;
  bjorvika: number | null;
  sentrum: number | null;
  majorstuen: number | null;
}

export default function InternasjonalComparisonCharts({
  basePath,
}: InternasjonalComparisonChartsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [landData, setLandData] = useState<LandData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetch(`${basePath}/internasjonal/topp-20-land.json`).then(r => r.json());
        setLandData(data);
        setError(null);
      } catch (err) {
        setError('Kunne ikke laste internasjonale data');
        console.error('Error loading internasjonal comparison data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [basePath]);

  // Calculate top 20 countries based on highest value across all areas
  const top20Data = useMemo(() => {
    return landData
      .map(country => ({
        ...country,
        maxValue: Math.max(
          country.grunerlokka || 0,
          country.bjorvika || 0,
          country.sentrum || 0,
          country.majorstuen || 0
        ),
      }))
      .sort((a, b) => b.maxValue - a.maxValue)
      .slice(0, 20);
  }, [landData]);

  const formatPercentage = (num: number | null) => {
    if (num === null) return 'N/A';
    return `${num.toFixed(1)}%`;
  };

  interface TooltipPayload {
    name: string;
    value: number | null;
    color: string;
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {formatPercentage(entry.value)}
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
            Internasjonal profil - Områdesammenligning
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
            Internasjonal profil - Områdesammenligning
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
          Internasjonal profil - Områdesammenligning
        </h2>
        <p className="text-xs text-gray-600 md:text-sm">
          Topp 20 land representert på tvers av Oslo-områder
        </p>
      </div>

      {/* Chart Content */}
      <div className="rounded-xl bg-white p-4 shadow-sm md:p-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-natural-forest">
            Topp 20 land (% av besøkende)
          </h3>
          <div className="h-[600px] md:h-[700px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={top20Data}
                layout="vertical"
                margin={{ top: 10, right: 50, left: 150, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  tickFormatter={(value) => `${value}%`}
                  label={{
                    value: 'Andel (%)',
                    position: 'insideBottom',
                    offset: -5,
                    style: { fontSize: 11, fill: '#6b7280' },
                  }}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  width={140}
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
