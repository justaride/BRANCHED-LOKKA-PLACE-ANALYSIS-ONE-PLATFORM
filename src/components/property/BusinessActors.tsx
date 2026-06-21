'use client';

import { useState } from 'react';
import type { BusinessActor, CategoryStats } from '@/types/eiendom';
import type { Maskert } from '@/lib/synlighet/filter';
import { erMaskert } from '@/types/synlighet';
import RestriktertFelt from '@/components/ui/RestriktertFelt';

type SynligBusinessActor = Maskert<BusinessActor>;

interface BusinessActorsProps {
  actors: SynligBusinessActor[];
  categoryStats: Record<string, CategoryStats>;
  metadata: {
    totalActors: number;
    totalCategories: number;
    generatedAt?: string;
  };
}

export default function BusinessActors({ actors, categoryStats, metadata }: BusinessActorsProps) {
  const [isExpanded, setIsExpanded] = useState(true); // Changed to true - show all actors by default
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const numericValue = (value: number | null | unknown): number | null =>
    typeof value === 'number' && Number.isFinite(value) ? value : null;

  const textValue = (value: string | null | unknown): string =>
    typeof value === 'string' ? value : '';

  // Filter actors by category and sort by revenue (highest first)
  const safeActors = actors || [];
  const filteredActors = (selectedCategory === 'all'
    ? [...safeActors]
    : safeActors.filter(a => textValue(a.type) === selectedCategory))
    .sort((a, b) => (numericValue(b.omsetning) || 0) - (numericValue(a.omsetning) || 0));

  // Top 3 categories by count
  const safeCategoryStats = categoryStats || {};
  const topCategories = Object.entries(safeCategoryStats)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3);

  // Calculate total revenue
  const totalRevenue = safeActors.reduce((sum, a) => sum + (numericValue(a.omsetning) || 0), 0);
  const revenueRestricted = safeActors.some(a => erMaskert(a.omsetning));
  const topActor = revenueRestricted
    ? undefined
    : [...safeActors].sort(
      (a, b) => (numericValue(b.omsetning) || 0) - (numericValue(a.omsetning) || 0),
    )[0];

  // Format number with thousand separators
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('nb-NO').format(Math.round(num));
  };

  return (
    <section className="border-t border-gray-200/30 bg-white py-8 md:py-16">
      <div className="mx-auto max-w-[1900px] px-[4vw]">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="mb-4">
            <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">Næringsaktører i området</h2>
            <p className="text-sm text-slate-600">
              Oversikt over {metadata.totalActors} bedrifter fordelt på {metadata.totalCategories} kategorier
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 md:mb-12 md:gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-4 md:p-6">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-600 md:text-sm">
              Totalt antall
            </div>
            <div className="text-3xl font-bold text-slate-900 md:text-4xl">{metadata.totalActors}</div>
            <div className="mt-1 text-xs text-indigo-600 md:mt-2 md:text-sm">registrerte aktører</div>
          </div>

          <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-4 md:p-6">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-600 md:text-sm">
              Total omsetning
            </div>
            <div className="text-3xl font-bold text-slate-900 md:text-4xl">
              {revenueRestricted ? (
                <RestriktertFelt verdi={null} niva="internt" />
              ) : (
                formatNumber(totalRevenue)
              )}
            </div>
            <div className="mt-1 text-xs text-indigo-600 md:mt-2 md:text-sm">NOK millioner</div>
          </div>

          <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-4 md:p-6">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-600 md:text-sm">
              Kategorier
            </div>
            <div className="text-3xl font-bold text-slate-900 md:text-4xl">{metadata.totalCategories}</div>
            <div className="mt-1 text-xs text-indigo-600 md:mt-2 md:text-sm">ulike bransjer</div>
          </div>

          <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-indigo-50/30 p-4 md:p-6">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-600 md:text-sm">
              Største aktør
            </div>
            <div className="text-base font-bold text-slate-900 md:text-lg line-clamp-2">
              <RestriktertFelt verdi={topActor?.navn}>{textValue(topActor?.navn) || 'N/A'}</RestriktertFelt>
            </div>
            <div className="mt-1 text-xs text-indigo-600 md:mt-2 md:text-sm">
              {revenueRestricted ? (
                <RestriktertFelt verdi={null} niva="internt" visBadge={false} />
              ) : (
                <RestriktertFelt verdi={topActor?.omsetning} visBadge={false}>
                  NOK {numericValue(topActor?.omsetning) || 0} mill.
                </RestriktertFelt>
              )}
            </div>
          </div>
        </div>

        {/* Top 3 Categories */}
        <div className="mb-8 md:mb-12">
          <h3 className="mb-4 text-lg font-bold text-slate-900 md:mb-6 md:text-xl">Største kategorier</h3>
          <div className="grid gap-3 md:gap-4 md:grid-cols-3">
            {topCategories.map(([category, stats], index) => (
              <div
                key={category}
                className="rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm md:p-6"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900 md:text-2xl">#{index + 1}</span>
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-slate-700 md:px-3 md:text-sm">
                    {stats.count} bedrifter
                  </span>
                </div>
                <div className="mb-1 text-sm font-semibold text-slate-900 md:mb-2 md:text-base">{category}</div>
                <div className="text-xs text-indigo-600 md:text-sm">
                  Snitt omsetning:{' '}
                  {revenueRestricted ? (
                    <RestriktertFelt verdi={null} niva="internt" />
                  ) : (
                    <>NOK {formatNumber(stats.avgRevenue)} mill.</>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter & Button Row */}
        <div className="mb-6 rounded-xl border-2 border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/30 p-4 shadow-sm md:p-6">
          <label htmlFor="category-filter" className="mb-3 block text-sm font-semibold text-slate-700">
            Filtrer og vis aktører:
          </label>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            {/* Dropdown */}
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition-all hover:border-indigo-500 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 md:w-auto md:min-w-[280px]"
            >
              <option value="all">Alle kategorier ({metadata.totalActors})</option>
              {Object.entries(safeCategoryStats)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([category, stats]) => (
                  <option key={category} value={category}>
                    {category} ({stats.count})
                  </option>
                ))}
            </select>

            {/* Vis alle aktører button - STØRRE */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`group flex w-full items-center justify-center gap-3 rounded-lg px-8 py-4 text-base font-bold shadow-lg transition-all hover:shadow-xl md:w-auto md:min-w-[240px] ${isExpanded
                ? 'border-2 border-indigo-300 bg-white text-slate-900 hover:bg-indigo-50'
                : 'border-2 border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700'
                }`}
              aria-expanded={isExpanded}
              aria-controls="aktor-liste"
            >
              <span className="text-xl">📋</span>
              <span>{isExpanded ? 'Skjul liste' : 'Vis alle aktører'}</span>
              <svg
                className={`h-5 w-5 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Filter status */}
            {selectedCategory !== 'all' && (
              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                Viser {filteredActors.length} av {metadata.totalActors} aktører
              </span>
            )}
          </div>
        </div>

        {/* Collapsible Table */}
        <div
          id="aktor-liste"
          className={`overflow-hidden transition-all duration-700 ease-out ${isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          style={{
            transitionTimingFunction: isExpanded
              ? 'cubic-bezier(0.4, 0, 0.2, 1)'
              : 'cubic-bezier(0.4, 0, 1, 1)'
          }}
        >
          <div className="overflow-x-auto rounded-2xl border border-gray-200/50 bg-white shadow-sm">
            <table className="w-full">
              <thead className="border-b border-gray-200/50 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 md:px-6 md:py-4">
                    Rang
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 md:px-6 md:py-4">
                    Navn
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 md:px-6 md:py-4">
                    Kategori
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 md:table-cell md:px-6 md:py-4">
                    Adresse
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600 md:px-6 md:py-4">
                    Omsetning
                  </th>
                  <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600 md:table-cell md:px-6 md:py-4">
                    Vekst
                  </th>
                  <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600 lg:table-cell md:px-6 md:py-4">
                    Ansatte
                  </th>
                  <th className="hidden px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600 lg:table-cell md:px-6 md:py-4">
                    Markedsandel
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/30">
                {filteredActors.map((aktor, index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-indigo-50/30"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900 md:px-6 md:py-4">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900 md:px-6 md:py-4">
                      <RestriktertFelt verdi={aktor.navn}>{textValue(aktor.navn)}</RestriktertFelt>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600 md:px-6 md:py-4">
                      <RestriktertFelt verdi={aktor.type}>{textValue(aktor.type)}</RestriktertFelt>
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 text-sm text-slate-600 md:table-cell md:px-6 md:py-4">
                      <RestriktertFelt verdi={aktor.adresse}>{textValue(aktor.adresse)}</RestriktertFelt>
                    </td>
                    <td className="px-4 py-3 text-right text-sm md:px-6 md:py-4">
                      <div className="font-medium text-slate-900">
                        <RestriktertFelt verdi={aktor.omsetning}>
                          {numericValue(aktor.omsetning) !== null ? `${formatNumber(numericValue(aktor.omsetning) ?? 0)} mill.` : '-'}
                        </RestriktertFelt>
                      </div>
                      {textValue(aktor.kjedeProsent) && (
                        <div className="text-xs text-indigo-600">
                          {textValue(aktor.kjedeProsent)} av kjede
                        </div>
                      )}
                    </td>
                    <td
                      className={`hidden whitespace-nowrap px-4 py-3 text-right text-sm font-semibold md:table-cell md:px-6 md:py-4 ${numericValue(aktor.yoyVekst) === null
                        ? 'text-slate-600'
                        : (numericValue(aktor.yoyVekst) ?? 0) < 0
                          ? 'text-red-600'
                          : 'text-green-600'
                        }`}
                    >
                      <RestriktertFelt verdi={aktor.yoyVekst}>
                        {numericValue(aktor.yoyVekst) !== null
                          ? `${(numericValue(aktor.yoyVekst) ?? 0) > 0 ? '+' : ''}${numericValue(aktor.yoyVekst)}%`
                          : '-'}
                      </RestriktertFelt>
                    </td>
                    <td className="hidden px-4 py-3 text-right text-sm lg:table-cell md:px-6 md:py-4">
                      <div className="font-medium text-slate-900">
                        <RestriktertFelt verdi={aktor.ansatteLokalt}>
                          {numericValue(aktor.ansatteLokalt) !== null ? numericValue(aktor.ansatteLokalt) : '-'}
                        </RestriktertFelt>
                      </div>
                      {numericValue(aktor.ansatteKjede) !== null && numericValue(aktor.kjedeLokasjoner) !== null && (
                        <div className="text-xs text-indigo-600">
                          {numericValue(aktor.ansatteKjede)} i {numericValue(aktor.kjedeLokasjoner)} lok.
                        </div>
                      )}
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-slate-900 lg:table-cell md:px-6 md:py-4">
                      <RestriktertFelt verdi={aktor.markedsandel}>
                        {numericValue(aktor.markedsandel) !== null ? `${(numericValue(aktor.markedsandel) ?? 0).toFixed(2)}%` : '-'}
                      </RestriktertFelt>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Distribution (always visible) */}
        <div className="mt-8 md:mt-12">
          <h3 className="mb-4 text-lg font-bold text-slate-900 md:mb-6 md:text-xl">Fordeling per kategori</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(safeCategoryStats)
              .sort((a, b) => b[1].count - a[1].count)
              .map(([category, stats]) => {
                const percentage = (stats.count / metadata.totalActors) * 100;
                const isSelected = selectedCategory === category;
                return (
                  <div
                    key={category}
                    className={`group relative cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${isSelected
                      ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                      : 'border-gray-200/50 bg-white hover:border-indigo-600'
                      }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsExpanded(true);
                      // Scroll to table after a short delay to let it expand
                      setTimeout(() => {
                        document.getElementById('aktor-liste')?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest'
                        });
                      }, 100);
                    }}
                  >
                    {isSelected && (
                      <div className="absolute right-2 top-2 rounded bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">
                        ✓ Valgt
                      </div>
                    )}
                    <div className="mb-2 flex items-center justify-between">
                      <span className={`text-sm font-medium ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                        {category}
                      </span>
                      <span className={`text-xs ${isSelected ? 'text-indigo-700' : 'text-indigo-600'}`}>
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all ${isSelected ? 'bg-indigo-700' : 'bg-indigo-600 group-hover:bg-indigo-700'
                          }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>{stats.count} bedrifter</span>
                      <span>
                        {revenueRestricted ? (
                          <RestriktertFelt verdi={null} niva="internt" visBadge={false} />
                        ) : (
                          <>Ø {formatNumber(stats.avgRevenue)} mill.</>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
