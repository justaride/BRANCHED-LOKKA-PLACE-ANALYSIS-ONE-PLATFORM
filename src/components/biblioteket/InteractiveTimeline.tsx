'use client';

import { HistorieTimelineEvent } from '@/types/biblioteket';
import { useRef } from 'react';

interface InteractiveTimelineProps {
    events: HistorieTimelineEvent[];
}

export default function InteractiveTimeline({ events }: InteractiveTimelineProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Sort by start year ascending
    const sortedEvents = [...events].sort((a, b) => a.start_year - b.start_year);

    // Group into eras (simplified logic for demo)
    const eras = [
        { name: 'Industrialisering', start: 1840, end: 1900, color: 'bg-amber-100 text-amber-800' },
        { name: 'Arbeiderbydel', start: 1900, end: 1970, color: 'bg-slate-100 text-slate-800' },
        { name: 'Forfall & Aktivisme', start: 1970, end: 1990, color: 'bg-red-100 text-red-800' },
        { name: 'Gentrifisering', start: 1990, end: 2025, color: 'bg-emerald-100 text-emerald-800' },
    ];

    return (
        <div className="relative">
            {/* Scroll Controls Hint */}
            <div className="mb-4 flex items-center justify-end text-sm text-gray-500">
                <span className="mr-2">Scroll horisontalt</span>
                <svg className="h-5 w-5 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>

            {/* Timeline Container */}
            <div
                ref={scrollContainerRef}
                className="hide-scrollbar flex gap-8 overflow-x-auto pb-12 pt-8"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {/* Timeline Line */}
                <div className="absolute left-0 right-0 top-[60px] h-1 bg-gray-200" />

                {sortedEvents.map((event, index) => {
                    const era = eras.find(e => event.start_year >= e.start && event.start_year < e.end);

                    return (
                        <div
                            key={event.id}
                            className="relative min-w-[300px] flex-shrink-0 scroll-snap-align-start pt-8 first:pl-4 last:pr-4"
                        >
                            {/* Year Marker */}
                            <div className="absolute left-0 top-[52px] flex h-5 w-5 items-center justify-center rounded-full bg-lokka-primary ring-4 ring-white" />
                            <div className="absolute left-6 top-[50px] text-sm font-bold text-gray-500">
                                {event.start_year}
                            </div>

                            {/* Event Card */}
                            <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                                {era && (
                                    <span className={`mb-3 inline-block rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${era.color}`}>
                                        {era.name}
                                    </span>
                                )}
                                <h3 className="mb-2 text-lg font-bold text-gray-900">
                                    {event.label}
                                </h3>
                                <p className="mb-4 text-sm text-gray-600">
                                    {event.summary}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {event.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-500"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
