'use client';

import type { AktorerData } from '@/types/one-min-analysis';

interface AktorerTableProps {
  data: AktorerData;
}

export default function AktorerTable({ data }: AktorerTableProps) {
  // Show all actors
  const allActors = data.actors;

  return (
    <div className="space-y-6">
      {/* Summary metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-lokka-light p-4 text-center">
          <div className="text-sm text-gray-600">Totalt antall aktører</div>
          <div className="text-2xl font-bold text-lokka-primary">{data.metadata.totalActors}</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-4 text-center">
          <div className="text-sm text-gray-600">Kategorier</div>
          <div className="text-2xl font-bold text-blue-600">{data.metadata.totalCategories}</div>
        </div>
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <div className="text-sm text-gray-600">Total omsetning</div>
          <div className="text-2xl font-bold text-green-600">
            {data.metadata.totalRevenue.toFixed(0)}M
          </div>
          <div className="text-xs text-gray-500">NOK</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-4 text-center">
          <div className="text-sm text-gray-600">Områdestørrelse</div>
          <div className="text-2xl font-bold text-purple-600">{data.metadata.areaSize}</div>
        </div>
      </div>

      {/* All actors table */}
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <h4 className="mb-4 text-base font-semibold text-gray-900">Alle aktører i området ({allActors.length})</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Navn</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Omsetning</th>
                <th className="px-4 py-3">YoY Vekst</th>
                <th className="px-4 py-3">Ansatte</th>
                <th className="px-4 py-3">Markedsandel</th>
              </tr>
            </thead>
            <tbody>
              {allActors.map((actor, index) => (
                <tr
                  key={actor.rank}
                  className={`border-b ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 font-medium">{actor.rank}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{actor.navn}</div>
                    <div className="text-xs text-gray-500">{actor.adresse}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{actor.type}</td>
                  <td className="px-4 py-3 font-medium">{actor.omsetning}M NOK</td>
                  <td className="px-4 py-3">
                    {actor.yoyVekst !== null ? (
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          actor.yoyVekst > 0
                            ? 'bg-green-100 text-green-800'
                            : actor.yoyVekst < 0
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {actor.yoyVekst > 0 ? '+' : ''}
                        {actor.yoyVekst}%
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{actor.ansatteLokalt}</td>
                  <td className="px-4 py-3 font-medium">{actor.markedsandel.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category statistics */}
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <h4 className="mb-4 text-base font-semibold text-gray-900">Statistikk per kategori</h4>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(data.categoryStats).map(([category, stats]) => (
            <div key={category} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-2 text-sm font-medium text-gray-900">{category}</div>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Antall:</span>
                  <span className="font-medium">{stats.count}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total omsetning:</span>
                  <span className="font-medium">{stats.totalRevenue.toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span>Gj.snitt:</span>
                  <span className="font-medium">{stats.avgRevenue.toFixed(1)}M</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
