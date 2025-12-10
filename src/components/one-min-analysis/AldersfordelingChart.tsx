'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DemografiData } from '@/types/one-min-analysis';

interface AldersfordelingChartProps {
  data: DemografiData;
}

export default function AldersfordelingChart({ data }: AldersfordelingChartProps) {
  // Transform data for population pyramid (negative values for male)
  const chartData = data.aldersfordeling.mann.map((mannData, index) => {
    const kvinneData = data.aldersfordeling.kvinne[index];
    return {
      category: mannData.kategori,
      Mann: -mannData.antall, // Negative for left side of pyramid
      Kvinne: kvinneData.antall,
    };
  });

  // Calculate totals from data
  const totalMann = data.aldersfordeling.mann.reduce((sum, d) => sum + d.antall, 0);
  const totalKvinne = data.aldersfordeling.kvinne.reduce((sum, d) => sum + d.antall, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <div className="text-sm text-gray-600">Menn</div>
          <div className="text-2xl font-bold text-blue-600">{totalMann.toLocaleString('nb-NO')}</div>
        </div>
        <div className="rounded-lg bg-lokka-light p-4 text-center">
          <div className="text-sm text-gray-600">Total befolkning</div>
          <div className="text-2xl font-bold text-lokka-primary">{data.nøkkeltall.befolkning.toLocaleString('nb-NO')}</div>
        </div>
        <div className="rounded-lg bg-pink-50 p-4 text-center">
          <div className="text-sm text-gray-600">Kvinner</div>
          <div className="text-2xl font-bold text-pink-600">{totalKvinne.toLocaleString('nb-NO')}</div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-soft">
        <h4 className="mb-4 text-base font-semibold text-gray-900">Aldersfordeling</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[
                (dataMin: number) => Math.floor(dataMin * 1.1),
                (dataMax: number) => Math.ceil(dataMax * 1.1),
              ]}
              tickFormatter={(value) => Math.abs(value).toString()}
            />
            <YAxis type="category" dataKey="category" width={80} />
            <Tooltip
              formatter={(value: number) => Math.abs(value)}
              labelStyle={{ color: '#374151' }}
            />
            <Legend />
            <Bar dataKey="Mann" fill="#3b82f6" stackId="a" />
            <Bar dataKey="Kvinne" fill="#ec4899" stackId="b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
