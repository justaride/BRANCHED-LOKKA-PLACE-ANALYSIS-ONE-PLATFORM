'use client';

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
  Cell,
} from 'recharts';
import type { KonkurransebildeData } from '@/types/one-min-analysis';

interface KonkurransebildeChartProps {
  data: KonkurransebildeData;
}

const CATEGORY_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
  '#6366f1', // indigo
];

export default function KonkurransebildeChart({ data }: KonkurransebildeChartProps) {
  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-lokka-light p-4 text-center">
          <div className="text-sm text-gray-600">Konsepttetthet</div>
          <div className="text-2xl font-bold text-lokka-primary">
            {data.nøkkeltall.konseptTetthet}
          </div>
          <div className="text-xs text-gray-500">per km²</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <div className="text-sm text-gray-600">Total omsetning</div>
          <div className="text-2xl font-bold text-blue-600">
            {data.nøkkeltall.totalOmsetning}M
          </div>
          <div className="text-xs text-gray-500">NOK</div>
        </div>
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <div className="text-sm text-gray-600">Omsetning/km²</div>
          <div className="text-2xl font-bold text-green-600">
            {data.nøkkeltall.omsetningTetthet}M
          </div>
          <div className="text-xs text-gray-500">NOK</div>
        </div>
        <div className={`rounded-lg p-4 text-center ${
          data.nøkkeltall.trend.konseptTetthet < 0 ? 'bg-red-50' : 'bg-green-50'
        }`}>
          <div className="text-sm text-gray-600">Konsepttetthet trend</div>
          <div className={`text-2xl font-bold ${
            data.nøkkeltall.trend.konseptTetthet < 0 ? 'text-red-600' : 'text-green-600'
          }`}>
            {data.nøkkeltall.trend.konseptTetthet > 0 ? '+' : ''}
            {data.nøkkeltall.trend.konseptTetthet}%
          </div>
        </div>
      </div>

      {/* Concept mix */}
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <h4 className="mb-4 text-base font-semibold text-gray-900">Konseptmiks</h4>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data.konseptmiks} margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="kategori2"
              stroke="#6b7280"
              angle={-45}
              textAnchor="end"
              height={100}
              style={{ fontSize: '11px' }}
            />
            <YAxis stroke="#6b7280" label={{ value: 'Antall', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value, name, props) => [
                value,
                `${props.payload.kategori1} - ${props.payload.kategori2}`,
              ]}
            />
            <Bar dataKey="antall" name="Antall konsepter">
              {data.konseptmiks.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chains vs Independent */}
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <h4 className="mb-4 text-base font-semibold text-gray-900">
          Kjeder vs. Uavhengige konsepter
        </h4>
        <p className="mb-4 text-sm text-gray-600">
          Utviklingen av uavhengige konsepter vs. kjedekonsepter over tid
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data.kjederVsUavhengige}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" stroke="#6b7280" />
            <YAxis stroke="#6b7280" label={{ value: 'Prosent (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="uavhengig"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Uavhengige (%)"
            />
            <Line
              type="monotone"
              dataKey="kjeder"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Kjeder (%)"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-700">
            <strong>Trend:</strong> Andelen uavhengige konsepter har økt fra{' '}
            {data.kjederVsUavhengige[0].uavhengig.toFixed(1)}% i{' '}
            {data.kjederVsUavhengige[0].year} til{' '}
            {data.kjederVsUavhengige[data.kjederVsUavhengige.length - 1].uavhengig.toFixed(1)}% i{' '}
            {data.kjederVsUavhengige[data.kjederVsUavhengige.length - 1].year}.
          </p>
        </div>
      </div>
    </div>
  );
}
