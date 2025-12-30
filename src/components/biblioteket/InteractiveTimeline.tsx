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

    // Enhanced era definitions with gradient colors
    const eras = [
        {
            name: 'Industrialisering',
            start: 1840,
            end: 1900,
            bgColor: 'bg-gradient-to-br from-amber-100 to-orange-100',
            textColor: 'text-amber-900',
            borderColor: 'border-amber-300'
        },
        {
            name: 'Arbeiderbydel',
            start: 1900,
            end: 1970,
            bgColor: 'bg-gradient-to-br from-slate-100 to-gray-100',
            textColor: 'text-slate-900',
            borderColor: 'border-slate-300'
        },
        {
            name: 'Forfall & Aktivisme',
            start: 1970,
            end: 1990,
            bgColor: 'bg-gradient-to-br from-red-100 to-rose-100',
            textColor: 'text-red-900',
            borderColor: 'border-red-300'
        },
        {
            name: 'Gentrifisering',
            start: 1990,
            end: 2025,
            bgColor: 'bg-gradient-to-br from-emerald-100 to-teal-100',
            textColor: 'text-emerald-900',
            borderColor: 'border-emerald-300'
        },
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
                {/* Enhanced Timeline Line with Gradient */}
                <div className="absolute left-0 right-0 top-[60px] h-1.5 bg-gradient-to-r from-amber-300 via-slate-300 via-red-300 to-emerald-300 rounded-full shadow-sm" />

                {sortedEvents.map((event) => {
                    const era = eras.find(e => event.start_year >= e.start && event.start_year < e.end);

                    return (
                        <div
                            key={event.id}
                            className="relative min-w-[300px] flex-shrink-0 scroll-snap-align-start pt-8 first:pl-4 last:pr-4"
                        >
                            {/* Enhanced Year Marker with Glow */}
                            <div className="absolute left-0 top-[52px] flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 ring-4 ring-white shadow-lg"
                                style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 4px 8px rgba(0,0,0,0.2)' }}
                            />
                            <div className="absolute left-8 top-[48px] text-sm font-bold text-gray-700 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
                                {event.start_year}
                            </div>

                            {/* Enhanced Event Card */}
                            <div className="mt-8 rounded-2xl border-2 bg-white/90 backdrop-blur-sm p-6 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:bg-white"
                                style={era ? {
                                    borderImage: `linear-gradient(135deg, ${era.borderColor.replace('border-', '')}, transparent) 1`
                                } : {}}
                            >
                                {era && (
                                    <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${era.bgColor} ${era.textColor} ${era.borderColor} border-2`}>
                                        {era.name}
                                    </span>
                                )}
                                <h3 className="mb-2 text-lg font-bold text-gray-900">
                                    {event.label}
                                </h3>
                                <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                                    {event.summary}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {event.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md bg-gradient-to-br from-gray-100 to-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm border border-gray-200"
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
