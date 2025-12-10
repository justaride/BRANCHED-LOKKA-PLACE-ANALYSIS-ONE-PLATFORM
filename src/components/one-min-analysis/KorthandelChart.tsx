'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { KorthandelData } from '@/types/one-min-analysis';

interface KorthandelChartProps {
  data: KorthandelData;
}

const UKEDAG_LABELS: Record<string, string> = {
  Monday: 'Man',
  Tuesday: 'Tir',
  Wednesday: 'Ons',
  Thursday: 'Tor',
  Friday: 'Fre',
  Saturday: 'Lør',
  Sunday: 'Søn',
};

export default function KorthandelChart({ data }: KorthandelChartProps) {
  // Sample data for better performance (every 7th day)
  const sampledData = data.tidsserie.filter((_, index) => index % 7 === 0);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('nb-NO', { month: 'short', year: 'numeric' });
  };

  // Format ukedag data with Norwegian labels
  const ukedagData = data.korthandelPerUkedag?.map((item) => ({
    ...item,
    dagNorsk: UKEDAG_LABELS[item.dag] || item.dag,
  })) || [];

  return (
    <div className="space-y-8">
      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-lokka-light p-4 text-center">
          <div className="text-sm text-gray-600">Daglig korthandel</div>
          <div className="text-2xl font-bold text-lokka-primary">
            {data.nøkkeltall.dagligKorthandel}M
          </div>
          <div className="text-xs text-gray-500">NOK</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <div className="text-sm text-gray-600">Total korthandel</div>
          <div className="text-2xl font-bold text-blue-600">
            {data.nøkkeltall.totalKorthandel}M
          </div>
          <div className="text-xs text-gray-500">NOK (2 år)</div>
        </div>
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <div className="text-sm text-gray-600">Per transaksjon</div>
          <div className="text-2xl font-bold text-green-600">
            {data.nøkkeltall.beløpPerTransaksjon}
          </div>
          <div className="text-xs text-gray-500">NOK snitt</div>
        </div>
        <div className={`rounded-lg p-4 text-center ${
          data.nøkkeltall.endring30d >= 0 ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="text-sm text-gray-600">Endring 30d</div>
          <div className={`text-2xl font-bold ${
            data.nøkkeltall.endring30d >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {data.nøkkeltall.endring30d > 0 ? '+' : ''}{data.nøkkeltall.endring30d}%
          </div>
        </div>
      </div>

      {/* Main timeseries chart */}
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <h4 className="mb-4 text-base font-semibold text-gray-900">
          Korthandelutvikling 2023-2025
        </h4>
        <p className="mb-6 text-sm text-gray-600">
          Ukentlig gjennomsnitt av korttransaksjoner fordelt på kategori
        </p>

        <ResponsiveContainer width="100%" height={350}>
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
              label={{ value: 'Mill NOK', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              labelFormatter={(label) => formatDate(label as string)}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
              }}
              formatter={(value: number) => [`${value.toFixed(2)} mill`, '']}
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
      </div>

      {/* Årlig vekst - Kvartalsvis utvikling */}
      {data.årligVekst && data.årligVekst.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-soft">
          <h4 className="mb-4 text-base font-semibold text-gray-900">
            Kvartalsvis utvikling (2023-2025)
          </h4>
          <p className="mb-6 text-sm text-gray-600">
            Årlig vekst sammenlignet med Oslo og Norge
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.årligVekst} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="år" stroke="#6b7280" />
              <YAxis
                stroke="#6b7280"
                label={{ value: 'Vekst (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
              />
              <Legend />
              <Bar dataKey="område" name="Området" fill="#8b5cf6" />
              <Bar dataKey="oslo" name="Oslo" fill="#3b82f6" />
              <Bar dataKey="norge" name="Norge" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>

          {/* Trend summary */}
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Trend:</strong> Området hadde{' '}
              {data.årligVekst[data.årligVekst.length - 1]?.område > data.årligVekst[0]?.område
                ? 'positiv'
                : 'negativ'}{' '}
              vekst fra {data.årligVekst[0]?.år} til{' '}
              {data.årligVekst[data.årligVekst.length - 1]?.år} ({data.årligVekst[0]?.område}% →{' '}
              {data.årligVekst[data.årligVekst.length - 1]?.område}%)
            </p>
          </div>
        </div>
      )}

      {/* Indeksert vekst */}
      {data.indeksertVekst && data.indeksertVekst.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-soft">
          <h4 className="mb-4 text-base font-semibold text-gray-900">
            Indeksert vekst (indeks = 100)
          </h4>
          <p className="mb-6 text-sm text-gray-600">
            Utvikling relativt til startpunkt
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.indeksertVekst} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="år" stroke="#6b7280" />
              <YAxis
                stroke="#6b7280"
                domain={[80, 120]}
                label={{ value: 'Indeks', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [value.toFixed(1), '']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="område"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 5 }}
                name="Området"
              />
              <Line
                type="monotone"
                dataKey="oslo"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Oslo"
              />
              <Line
                type="monotone"
                dataKey="norge"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Norge"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Korthandel per ukedag */}
      {ukedagData.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-soft">
          <h4 className="mb-4 text-base font-semibold text-gray-900">
            Korthandel per ukedag
          </h4>
          <p className="mb-6 text-sm text-gray-600">
            Gjennomsnittlig daglig omsetning fordelt på ukedag
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ukedagData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dagNorsk" stroke="#6b7280" />
              <YAxis
                stroke="#6b7280"
                label={{ value: 'Mill NOK', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value.toFixed(2)} mill`, '']}
              />
              <Legend />
              <Bar dataKey="år2023" name="2023" fill="#3b82f6" />
              <Bar dataKey="år2024" name="2024" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>

          {/* Weekday insight */}
          <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
            <div>
              <div className="text-xs text-gray-500">Travleste dag</div>
              <div className="font-semibold text-gray-900">Lørdag</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Roligste dag</div>
              <div className="font-semibold text-gray-900">Søndag</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
