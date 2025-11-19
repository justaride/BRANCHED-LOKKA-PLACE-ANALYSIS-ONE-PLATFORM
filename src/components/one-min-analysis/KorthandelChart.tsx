'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { KorthandelData } from '@/types/one-min-analysis';

interface KorthandelChartProps {
  data: KorthandelData;
}

export default function KorthandelChart({ data }: KorthandelChartProps) {
  // Sample data for better performance (every 7th day)
  const sampledData = data.tidsserie.filter((_, index) => index % 7 === 0);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('nb-NO', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-soft">
      <h4 className="mb-4 text-base font-semibold text-gray-900">
        Korthandelutvikling 2019-2025
      </h4>
      <p className="mb-6 text-sm text-gray-600">
        Ukentlig gjennomsnitt av korttransaksjoner fordelt på kategori
      </p>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={sampledData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: 'Transaksjoner', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            labelFormatter={(label) => formatDate(label as string)}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="mat_opplevelser"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="Mat & opplevelser"
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="handel"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Handel"
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="tjenester"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            name="Tjenester"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="h-2 w-full rounded bg-green-500"></div>
          <div className="mt-2 text-sm font-medium text-gray-900">Mat & opplevelser</div>
        </div>
        <div className="text-center">
          <div className="h-2 w-full rounded bg-blue-500"></div>
          <div className="mt-2 text-sm font-medium text-gray-900">Handel</div>
        </div>
        <div className="text-center">
          <div className="h-2 w-full rounded bg-amber-500"></div>
          <div className="mt-2 text-sm font-medium text-gray-900">Tjenester</div>
        </div>
      </div>
    </div>
  );
}
