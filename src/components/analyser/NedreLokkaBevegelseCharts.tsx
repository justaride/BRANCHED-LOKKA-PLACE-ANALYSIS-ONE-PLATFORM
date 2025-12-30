'use client';

import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart, Bar,
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip, Legend
} from 'recharts';

interface Props {
  basePath: string;
}

interface TimeData {
  time: string;
  besokende: number;
  paJobb: number;
  hjemme: number;
  total: number;
}

interface UkedagData {
  ukedag: string;
  besokende: number;
  paJobb: number;
  hjemme: number;
  total: number;
}

interface BevegelseData {
  omrade: string;
  besokPerTime: TimeData[];
}

interface UkedagDataWrapper {
  omrade: string;
  besokPerUkedag: UkedagData[];
}

export default function NedreLokkaBevegelseCharts({ basePath }: Props) {
  const [timeData, setTimeData] = useState<BevegelseData | null>(null);
  const [ukedagData, setUkedagData] = useState<UkedagDataWrapper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [timeResponse, ukedagResponse] = await Promise.all([
          fetch(`${basePath}/bevegelse/besok-per-time.json`),
          fetch(`${basePath}/bevegelse/besok-per-ukedag.json`)
        ]);

        if (!timeResponse.ok || !ukedagResponse.ok) {
          throw new Error('Kunne ikke laste bevegelsesdata');
        }

        const [timeJson, ukedagJson] = await Promise.all([
          timeResponse.json(),
          ukedagResponse.json()
        ]);

        setTimeData(timeJson);
        setUkedagData(ukedagJson);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ukjent feil');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [basePath]);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <p className="text-red-800">Feil ved lasting av data: {error}</p>
      </div>
    );
  }

  if (!timeData || !ukedagData) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Besøk per Time - Line Chart */}
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Bevegelsesmønster Gjennom Dagen
          </h3>
          <p className="text-gray-600">
            Antall besøkende per time i løpet av et døgn. Viser tydelig rush-timer mellom kl. 16-19.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={timeData.besokPerTime}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBesokende" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPaJobb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHjemme" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              interval={2}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => value.toLocaleString('nb-NO')}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number) => value.toLocaleString('nb-NO')}
              labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => {
                const labels: Record<string, string> = {
                  'besokende': 'Besøkende',
                  'paJobb': 'På jobb',
                  'hjemme': 'Hjemme'
                };
                return labels[value] || value;
              }}
            />
            <Area
              type="monotone"
              dataKey="besokende"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBesokende)"
            />
            <Area
              type="monotone"
              dataKey="paJobb"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPaJobb)"
            />
            <Area
              type="monotone"
              dataKey="hjemme"
              stroke="#f59e0b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorHjemme)"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-800 font-semibold mb-1">Peak Time - Besøkende</div>
            <div className="text-2xl font-bold text-green-900">
              kl. {timeData.besokPerTime.reduce((max, item) =>
                item.besokende > max.besokende ? item : max
              ).time}
            </div>
            <div className="text-xs text-green-700 mt-1">
              {timeData.besokPerTime.reduce((max, item) =>
                item.besokende > max.besokende ? item : max
              ).besokende.toLocaleString('nb-NO')} besøkende
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800 font-semibold mb-1">Peak Time - På Jobb</div>
            <div className="text-2xl font-bold text-blue-900">
              kl. {timeData.besokPerTime.reduce((max, item) =>
                item.paJobb > max.paJobb ? item : max
              ).time}
            </div>
            <div className="text-xs text-blue-700 mt-1">
              {timeData.besokPerTime.reduce((max, item) =>
                item.paJobb > max.paJobb ? item : max
              ).paJobb.toLocaleString('nb-NO')} personer
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="text-sm text-amber-800 font-semibold mb-1">Peak Time - Hjemme</div>
            <div className="text-2xl font-bold text-amber-900">
              kl. {timeData.besokPerTime.reduce((max, item) =>
                item.hjemme > max.hjemme ? item : max
              ).time}
            </div>
            <div className="text-xs text-amber-700 mt-1">
              {timeData.besokPerTime.reduce((max, item) =>
                item.hjemme > max.hjemme ? item : max
              ).hjemme.toLocaleString('nb-NO')} personer
            </div>
          </div>
        </div>
      </div>

      {/* Besøk per Ukedag - Bar Chart */}
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Ukentlig Besøksmønster
          </h3>
          <p className="text-gray-600">
            Antall besøkende per ukedag. Lørdag er den mest besøkte dagen med tydelig helgetrafikk.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={ukedagData.besokPerUkedag}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="ukedag"
              stroke="#6b7280"
              style={{ fontSize: '12px', textTransform: 'capitalize' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => value.toLocaleString('nb-NO')}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number) => value.toLocaleString('nb-NO')}
              labelStyle={{ fontWeight: 'bold', marginBottom: '8px', textTransform: 'capitalize' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => {
                const labels: Record<string, string> = {
                  'besokende': 'Besøkende',
                  'paJobb': 'På jobb',
                  'hjemme': 'Hjemme'
                };
                return labels[value] || value;
              }}
            />
            <Bar dataKey="besokende" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="paJobb" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="hjemme" fill="#f59e0b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-800 font-semibold mb-1">Mest Besøkt Dag</div>
            <div className="text-2xl font-bold text-green-900 capitalize">
              {ukedagData.besokPerUkedag.reduce((max, item) =>
                item.besokende > max.besokende ? item : max
              ).ukedag}
            </div>
            <div className="text-xs text-green-700 mt-1">
              {ukedagData.besokPerUkedag.reduce((max, item) =>
                item.besokende > max.besokende ? item : max
              ).besokende.toLocaleString('nb-NO')} besøkende
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-800 font-semibold mb-1">Minst Besøkt Dag</div>
            <div className="text-2xl font-bold text-gray-900 capitalize">
              {ukedagData.besokPerUkedag.reduce((min, item) =>
                item.besokende < min.besokende ? item : min
              ).ukedag}
            </div>
            <div className="text-xs text-gray-700 mt-1">
              {ukedagData.besokPerUkedag.reduce((min, item) =>
                item.besokende < min.besokende ? item : min
              ).besokende.toLocaleString('nb-NO')} besøkende
            </div>
          </div>
        </div>
      </div>

      {/* Data Note */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">📊 Om Bevegelsesdataen</h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Besøkende:</span> Personer som besøker området, men ikke bor eller jobber der</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">På jobb:</span> Personer som jobber i området</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Hjemme:</span> Fastboende i området</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Datakilde:</span> Aggregert fra 4 av 6 mikro-områder med Telia mobildata</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
