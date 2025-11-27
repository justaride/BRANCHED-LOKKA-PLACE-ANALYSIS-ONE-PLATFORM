'use client';

import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip, Legend,
  Cell
} from 'recharts';

interface Props {
  basePath: string;
}

interface AldersData {
  aldersgruppe: string;
  mann: number;
  kvinne: number;
  total: number;
}

interface DemografiData {
  omrade: string;
  totalBefolkning: number;
  aldersfordeling: AldersData[];
}

interface PyramidData {
  aldersgruppe: string;
  mann: number;
  kvinne: number;
}

export default function NedreLokkaDemografiCharts({ basePath }: Props) {
  const [data, setData] = useState<DemografiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${basePath}/demografi/aldersfordeling.json`);

        if (!response.ok) {
          throw new Error('Kunne ikke laste demografidata');
        }

        const json = await response.json();
        setData(json);
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

  if (!data) {
    return null;
  }

  // Transform data for population pyramid (negative values for men)
  const pyramidData: PyramidData[] = data.aldersfordeling.map(item => ({
    aldersgruppe: item.aldersgruppe,
    mann: -item.mann, // Negative for left side
    kvinne: item.kvinne
  }));

  // Calculate gender totals
  const totalMenn = data.aldersfordeling.reduce((sum, item) => sum + item.mann, 0);
  const totalKvinner = data.aldersfordeling.reduce((sum, item) => sum + item.kvinne, 0);
  const kjonnsfordelingPercent = {
    mann: ((totalMenn / data.totalBefolkning) * 100).toFixed(1),
    kvinne: ((totalKvinner / data.totalBefolkning) * 100).toFixed(1)
  };

  // Find largest age group
  const storsteGruppe = data.aldersfordeling.reduce((max, item) =>
    item.total > max.total ? item : max
  );

  return (
    <div className="space-y-8">
      {/* Population Pyramid */}
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Befolkningsfordeling etter Alder og Kjønn
          </h3>
          <p className="text-gray-600">
            Befolkningspyramide som viser aldersfordelingen for menn og kvinner. Størst gruppe er 23-34 år.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={pyramidData}
            layout="vertical"
            margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              domain={[-400, 400]}
              tickFormatter={(value) => Math.abs(value).toString()}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              type="category"
              dataKey="aldersgruppe"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number, name: string) => [
                Math.abs(value).toLocaleString('nb-NO'),
                name === 'mann' ? 'Menn' : 'Kvinner'
              ]}
              labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => {
                const labels: Record<string, string> = {
                  'mann': 'Menn',
                  'kvinne': 'Kvinner'
                };
                return labels[value] || value;
              }}
            />
            <Bar
              dataKey="mann"
              fill="#3b82f6"
              radius={[8, 0, 0, 8]}
              name="mann"
            />
            <Bar
              dataKey="kvinne"
              fill="#ec4899"
              radius={[0, 8, 8, 0]}
              name="kvinne"
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Demographics Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800 font-semibold mb-1">Menn</div>
            <div className="text-3xl font-bold text-blue-900">
              {totalMenn.toLocaleString('nb-NO')}
            </div>
            <div className="text-xs text-blue-700 mt-1">
              {kjonnsfordelingPercent.mann}% av befolkningen
            </div>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <div className="text-sm text-pink-800 font-semibold mb-1">Kvinner</div>
            <div className="text-3xl font-bold text-pink-900">
              {totalKvinner.toLocaleString('nb-NO')}
            </div>
            <div className="text-xs text-pink-700 mt-1">
              {kjonnsfordelingPercent.kvinne}% av befolkningen
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-800 font-semibold mb-1">Total Befolkning</div>
            <div className="text-3xl font-bold text-green-900">
              {data.totalBefolkning.toLocaleString('nb-NO')}
            </div>
            <div className="text-xs text-green-700 mt-1">
              personer i området
            </div>
          </div>
        </div>
      </div>

      {/* Age Distribution Bar Chart */}
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Aldersfordeling - Total
          </h3>
          <p className="text-gray-600">
            Totalt antall personer per aldersgruppe. Dominert av unge voksne (23-34 år).
          </p>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data.aldersfordeling}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="aldersgruppe"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
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
            <Bar dataKey="total" radius={[8, 8, 0, 0]}>
              {data.aldersfordeling.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.aldersgruppe === storsteGruppe.aldersgruppe ? '#10b981' : '#94a3b8'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-800 font-semibold mb-1">Største Aldersgruppe</div>
            <div className="text-2xl font-bold text-green-900">
              {storsteGruppe.aldersgruppe} år
            </div>
            <div className="text-xs text-green-700 mt-1">
              {storsteGruppe.total.toLocaleString('nb-NO')} personer
              ({((storsteGruppe.total / data.totalBefolkning) * 100).toFixed(1)}% av total)
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-800 font-semibold mb-1">Gjennomsnittsalder</div>
            <div className="text-2xl font-bold text-gray-900">
              ~32 år
            </div>
            <div className="text-xs text-gray-700 mt-1">
              Ung befolkning med mange i arbeidsaktiv alder
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Age Groups Table */}
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Detaljert Aldersfordeling
          </h3>
          <p className="text-gray-600">
            Komplett oversikt over alle aldersgrupper med kjønnsfordeling.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Aldersgruppe</th>
                <th className="text-right py-3 px-4 font-semibold text-blue-900">Menn</th>
                <th className="text-right py-3 px-4 font-semibold text-pink-900">Kvinner</th>
                <th className="text-right py-3 px-4 font-semibold text-green-900">Total</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Andel</th>
              </tr>
            </thead>
            <tbody>
              {data.aldersfordeling.map((gruppe, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${
                    gruppe.aldersgruppe === storsteGruppe.aldersgruppe
                      ? 'bg-green-50'
                      : index % 2 === 0
                      ? 'bg-white'
                      : 'bg-gray-50'
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {gruppe.aldersgruppe} år
                  </td>
                  <td className="py-3 px-4 text-right text-blue-800">
                    {gruppe.mann.toLocaleString('nb-NO')}
                  </td>
                  <td className="py-3 px-4 text-right text-pink-800">
                    {gruppe.kvinne.toLocaleString('nb-NO')}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-green-900">
                    {gruppe.total.toLocaleString('nb-NO')}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">
                    {((gruppe.total / data.totalBefolkning) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300 font-bold">
                <td className="py-3 px-4 text-gray-900">Total</td>
                <td className="py-3 px-4 text-right text-blue-900">
                  {totalMenn.toLocaleString('nb-NO')}
                </td>
                <td className="py-3 px-4 text-right text-pink-900">
                  {totalKvinner.toLocaleString('nb-NO')}
                </td>
                <td className="py-3 px-4 text-right text-green-900">
                  {data.totalBefolkning.toLocaleString('nb-NO')}
                </td>
                <td className="py-3 px-4 text-right text-gray-900">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Note */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">📊 Om Demografidataen</h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Datakilde:</span> SSB (Statistisk Sentralbyrå) via Plaace.ai</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Periode:</span> Aggregert fra 6 mikro-områder på Nedre Løkka</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Befolkning:</span> 1,674 registrerte innbyggere</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span><span className="font-semibold">Profil:</span> Ung befolkning med høy andel i aldersgruppen 23-34 år (40% av total)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
