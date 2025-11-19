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
} from 'recharts';
import type { BevegelseData } from '@/types/one-min-analysis';

interface BevegelseChartProps {
  data: BevegelseData;
}

export default function BevegelseChart({ data }: BevegelseChartProps) {
  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-lokka-light p-4 text-center">
          <div className="text-sm text-gray-600">Daglig besøk</div>
          <div className="text-2xl font-bold text-lokka-primary">
            {data.nøkkeltall.dagligBesøk.toLocaleString('nb-NO')}
          </div>
        </div>
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <div className="text-sm text-gray-600">Besøk per km²</div>
          <div className="text-2xl font-bold text-blue-600">
            {data.nøkkeltall.besøkPerKm2.toLocaleString('nb-NO')}
          </div>
        </div>
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <div className="text-sm text-gray-600">Travleste dag</div>
          <div className="text-2xl font-bold text-green-600">{data.nøkkeltall.travlesteDag}</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-4 text-center">
          <div className="text-sm text-gray-600">Lørdag andel</div>
          <div className="text-2xl font-bold text-purple-600">{data.nøkkeltall.lørdagAndel}%</div>
        </div>
      </div>

      {/* Per weekday */}
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <h4 className="mb-4 text-base font-semibold text-gray-900">Bevegelse per ukedag</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.perUkedag} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="dag" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="besøkende" fill="#3b82f6" name="Besøkende" />
            <Bar dataKey="påJobb" fill="#10b981" name="På jobb" />
            <Bar dataKey="hjemme" fill="#f59e0b" name="Hjemme" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Per hour */}
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <h4 className="mb-4 text-base font-semibold text-gray-900">Bevegelse per time</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.perTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              interval={2}
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="besøk"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Besøk"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quarterly trend */}
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <h4 className="mb-4 text-base font-semibold text-gray-900">
          Kvartalsvis utvikling (2023-2025)
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data.bevegelsesmønster}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="category" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="besøkende"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Besøkende"
            />
            <Line
              type="monotone"
              dataKey="påJobb"
              stroke="#10b981"
              strokeWidth={2}
              name="På jobb"
            />
            <Line
              type="monotone"
              dataKey="hjemme"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Hjemme"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
