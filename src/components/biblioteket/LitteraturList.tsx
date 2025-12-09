'use client';

import { LitteraryWork } from '@/types/biblioteket';
import { useState } from 'react';

interface LitteraturListProps {
    works: LitteraryWork[];
}

export default function LitteraturList({ works }: LitteraturListProps) {
    const [sortBy, setSortBy] = useState<'year' | 'title'>('year');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const sortedWorks = [...works].sort((a, b) => {
        if (sortBy === 'year') {
            return sortOrder === 'desc' ? b.year - a.year : a.year - b.year;
        }
        return sortOrder === 'desc'
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title);
    });

    const toggleSort = (field: 'year' | 'title') => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    return (
        <div className="space-y-4">
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span>Sorter etter:</span>
                    <button
                        onClick={() => toggleSort('year')}
                        className={`px-3 py-1.5 rounded-full transition-colors ${sortBy === 'year' ? 'bg-natural-forest/10 text-natural-forest font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        År {sortBy === 'year' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                    <button
                        onClick={() => toggleSort('title')}
                        className={`px-3 py-1.5 rounded-full transition-colors ${sortBy === 'title' ? 'bg-natural-forest/10 text-natural-forest font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Tittel {sortBy === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                </div>
                {sortedWorks.map((work) => (
                    <div
                        key={work.id}
                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-natural-forest/10 px-3 py-1 text-sm font-bold text-natural-forest border border-natural-forest/20">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {work.year}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-natural-sand/40 px-2.5 py-1 text-xs font-medium text-natural-earth">
                                {work.type}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{work.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{work.authors.join(', ')}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {work.topics.map((topic) => (
                                <span
                                    key={topic}
                                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-6 py-4">
                                    <button
                                        onClick={() => toggleSort('year')}
                                        className="flex items-center gap-1 font-bold hover:text-natural-forest transition-colors"
                                    >
                                        År
                                        {sortBy === 'year' && (
                                            <svg className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-4">
                                    <button
                                        onClick={() => toggleSort('title')}
                                        className="flex items-center gap-1 font-bold hover:text-natural-forest transition-colors"
                                    >
                                        Tittel
                                        {sortBy === 'title' && (
                                            <svg className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-4 font-bold">Forfatter</th>
                                <th className="px-6 py-4 font-bold">Type</th>
                                <th className="px-6 py-4 font-bold">Tema</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sortedWorks.map((work) => (
                                <tr key={work.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className="inline-flex items-center rounded-lg bg-natural-forest/10 px-2.5 py-1 text-sm font-bold text-natural-forest">
                                            {work.year}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">
                                        {work.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {work.authors.join(', ')}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-natural-sand/40 px-2.5 py-1 text-xs font-medium text-natural-earth border border-natural-sand">
                                            {work.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                                            {work.topics.slice(0, 3).map((topic) => (
                                                <span
                                                    key={topic}
                                                    className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                            {work.topics.length > 3 && (
                                                <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-400">
                                                    +{work.topics.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
