'use client';

import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';

interface Props {
  basePath: string;
}

interface KategoriData {
  kategori: string;
  antall: number;
  omsetning: number;
  andel: number;
  [key: string]: string | number; // Index signature for Recharts
}

interface OmradeData {
  omrade: string;
  antall: number;
  andel: number;
}

interface VirksomhetData {
  navn: string;
  type: string;
  omsetning: number;
  adresse: string;
  ansatte: number;
}

interface OversiktData {
  omrade: string;
  totalVirksomheter: number;
  totalOmsetning: number;
  kategoriOversikt: KategoriData[];
  omradeOversikt: OmradeData[];
}

interface AlleVirksomheterData {
  omrade: string;
  antall: number;
  virksomheter: VirksomhetData[];
}

// Color palette for charts
const CATEGORY_COLORS = [
  '#10b981', // green
  '#3b82f6', // blue
  '#f59e0b', // amber
  '#ec4899', // pink
  '#8b5cf6', // purple
  '#ef4444', // red
  '#06b6d4', // cyan
  '#84cc16', // lime
  '#f97316', // orange
  '#6366f1', // indigo
  '#14b8a6', // teal
  '#a855f7', // violet
  '#f43f5e', // rose
  '#64748b'  // slate
];

export default function NedreLokkaVirksomheterCharts({ basePath }: Props) {
  const [oversiktData, setOversiktData] = useState<OversiktData | null>(null);
  const [alleVirksomheterData, setAlleVirksomheterData] = useState<AlleVirksomheterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [oversiktResponse, alleResponse] = await Promise.all([
          fetch(`${basePath}/virksomheter/oversikt.json`),
          fetch(`${basePath}/virksomheter/alle-virksomheter.json`)
        ]);

        if (!oversiktResponse.ok || !alleResponse.ok) {
          throw new Error('Kunne ikke laste virksomhetsdata');
        }

        const [oversiktJson, alleJson] = await Promise.all([
          oversiktResponse.json(),
          alleResponse.json()
        ]);

        setOversiktData(oversiktJson);
        setAlleVirksomheterData(alleJson);
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
          <div className="h-96 bg-gray-200 rounded"></div>
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

  if (!oversiktData || !alleVirksomheterData) {
    return null;
  }

  // Get top 10 businesses by revenue
  const top10Virksomheter = [...alleVirksomheterData.virksomheter]
    .sort((a, b) => b.omsetning - a.omsetning)
    .slice(0, 10);

  // Prepare data for pie chart (top 5 categories + "Andre")
  const top5Kategorier = oversiktData.kategoriOversikt.slice(0, 5);
  const andreKategorier = oversiktData.kategoriOversikt.slice(5);
  const andreSum = andreKategorier.reduce((sum, k) => sum + k.antall, 0);

  const pieData = [
    ...top5Kategorier,
    ...(andreSum > 0 ? [{
      kategori: 'Andre kategorier',
      antall: andreSum,
      omsetning: andreKategorier.reduce((sum, k) => sum + k.omsetning, 0),
      andel: andreKategorier.reduce((sum, k) => sum + k.andel, 0)
    }] : [])
  ];

  return (
    <div className="space-y-8">
      {/* Business Categories - Pie Chart */}
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Virksomhetstyper
          </h3>
          <p className="text-gray-600">
            Fordeling av 103 virksomheter etter kategori. Restauranter dominerer med 40 % av totalen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="antall"
                nameKey="kategori"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label={({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#6b7280', strokeWidth: 1 }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px'
                }}
                formatter={(value: number, name: string) => [
                  `${value} virksomheter`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-4">Kategorifordeling</h4>
            {oversiktData.kategoriOversikt.map((kategori, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
                  />
                  <span className="text-sm text-gray-900">{kategori.kategori}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {kategori.antall}
                  </span>
                  <span className="text-xs text-gray-600 w-12 text-right">
                    {kategori.andel}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-800 font-semibold mb-1">Total Virksomheter</div>
            <div className="text-3xl font-bold text-green-900">
              {oversiktData.totalVirksomheter}
            </div>
            <div className="text-xs text-green-700 mt-1">
              kommersielle lokaler
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800 font-semibold mb-1">Største Kategori</div>
            <div className="text-lg font-bold text-blue-900">
              {oversiktData.kategoriOversikt[0].kategori.split(' / ')[1]}
            </div>
            <div className="text-xs text-blue-700 mt-1">
              {oversiktData.kategoriOversikt[0].antall} virksomheter ({oversiktData.kategoriOversikt[0].andel}%)
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-800 font-semibold mb-1">Total Omsetning</div>
            <div className="text-3xl font-bold text-purple-900">
              {oversiktData.totalOmsetning}M
            </div>
            <div className="text-xs text-purple-700 mt-1">
              NOK årlig
            </div>
          </div>
        </div>
      </div>

      {/* Top 10 Businesses - Bar Chart */}
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Topp 10 Virksomheter etter Omsetning
          </h3>
          <p className="text-gray-600">
            De 10 største virksomhetene på Nedre Løkka basert på årlig omsetning.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={top10Virksomheter}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value}M`}
            />
            <YAxis
              type="category"
              dataKey="navn"
              stroke="#6b7280"
              style={{ fontSize: '11px' }}
              width={140}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number) => [`${value}M NOK`, 'Omsetning']}
              labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
            />
            <Bar dataKey="omsetning" radius={[0, 8, 8, 0]}>
              {top10Virksomheter.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#10b981' : '#94a3b8'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-800 font-semibold mb-1">Største Virksomhet</div>
              <div className="text-lg font-bold text-green-900">{top10Virksomheter[0].navn}</div>
              <div className="text-xs text-green-700 mt-1">{top10Virksomheter[0].type}</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-900">
                {top10Virksomheter[0].omsetning}M
              </div>
              <div className="text-xs text-green-700 mt-1">NOK årlig</div>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Geografisk Fordeling
          </h3>
          <p className="text-gray-600">
            Antall virksomheter per mikro-område på Nedre Løkka.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={oversiktData.omradeOversikt}
            margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="omrade"
              stroke="#6b7280"
              style={{ fontSize: '11px' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number) => [`${value} virksomheter`, 'Antall']}
              labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
            />
            <Bar dataKey="antall" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {oversiktData.omradeOversikt.map((omrade, index) => (
            <div
              key={index}
              className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center"
            >
              <div className="text-2xl font-bold text-blue-900">{omrade.antall}</div>
              <div className="text-xs text-blue-700 mt-1">{omrade.andel}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Note */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">📊 Om Virksomhetsdataen</h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Totalt:</span> 103 registrerte kommersielle virksomheter</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Omsetning:</span> 967 millioner NOK årlig (aggregert)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Dominans:</span> Mat og opplevelser står for 52 virksomheter (50%)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Datakilde:</span> Plaace.ai med data fra Brønnøysundregistrene</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
