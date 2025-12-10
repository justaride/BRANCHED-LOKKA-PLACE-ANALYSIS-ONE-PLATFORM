'use client';

import { useState } from 'react';
import type { AktorerData, Actor } from '@/types/one-min-analysis';

interface ExpandableActorListProps {
  data: AktorerData;
  initialCount?: number;
}

function ActorRow({ actor, index }: { actor: Actor; index: number }) {
  const bgColor = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

  return (
    <tr className={`${bgColor} transition-colors hover:bg-lokka-light/50`}>
      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-lokka-primary">
        {actor.rank}
      </td>
      <td className="px-4 py-3">
        <div className="font-medium text-gray-900">{actor.navn}</div>
        <div className="text-xs text-gray-500">{actor.adresse}</div>
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">{actor.type}</td>
      <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-semibold text-gray-900">
        {actor.omsetning} mill.
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            actor.yoyVekst === null
              ? 'bg-gray-100 text-gray-600'
              : actor.yoyVekst >= 0
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {actor.yoyVekst === null ? '-' : `${actor.yoyVekst >= 0 ? '+' : ''}${actor.yoyVekst}%`}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-600">
        {actor.markedsandel.toFixed(1)}%
      </td>
    </tr>
  );
}

export default function ExpandableActorList({
  data,
  initialCount = 10,
}: ExpandableActorListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedActors = showAll ? data.actors : data.actors.slice(0, initialCount);
  const hasMore = data.actors.length > initialCount;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4 border-b border-gray-200 bg-gray-50 p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-lokka-primary">
            {data.metadata.totalActors}
          </div>
          <div className="text-xs text-gray-500">Aktører</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {data.metadata.totalRevenue}M
          </div>
          <div className="text-xs text-gray-500">Total omsetning (NOK)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {data.metadata.totalCategories}
          </div>
          <div className="text-xs text-gray-500">Kategorier</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Navn
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Kategori
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                Omsetning
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                YoY
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                Andel
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayedActors.map((actor, index) => (
              <ActorRow key={`${actor.rank}-${actor.navn}`} actor={actor} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Expand/Collapse Button */}
      {hasMore && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-lokka-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lokka-primary/90"
          >
            {showAll ? (
              <>
                <span>Vis færre</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>Vis alle {data.actors.length} aktører</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {/* Category breakdown */}
      {Object.keys(data.categoryStats).length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-700">Fordeling per kategori</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(data.categoryStats)
              .sort((a, b) => b[1].count - a[1].count)
              .map(([category, stats]) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs shadow-sm ring-1 ring-gray-200"
                >
                  <span className="font-medium text-gray-700">{category}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-lokka-primary">{stats.count}</span>
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
