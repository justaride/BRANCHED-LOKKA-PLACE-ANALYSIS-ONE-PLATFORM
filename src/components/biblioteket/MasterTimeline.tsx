'use client';

import { MasterTimelineEvent } from '@/lib/loaders/biblioteket-loader';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface MasterTimelineProps {
    events: MasterTimelineEvent[];
}

const categoryLabels = {
    historie: 'Byhistorie',
    kultur: 'Kultur',
    litteratur: 'Litteratur',
    ildsjeler: 'Ildsjeler'
};

// Category icons (using emoji for simplicity, could use SVG icons)
const categoryIcons = {
    historie: '🏛️',
    kultur: '🎭',
    litteratur: '📚',
    ildsjeler: '⭐'
};

export default function MasterTimeline({ events }: MasterTimelineProps) {
    const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['historie', 'kultur', 'litteratur', 'ildsjeler']));
    const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set());
    const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Intersection Observer for scroll animations
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleEvents((prev) => new Set([...prev, entry.target.id]));
                    }
                });
            },
            { threshold: 0.15 }
        );

        return () => observerRef.current?.disconnect();
    }, []);

    const toggleFilter = (category: string) => {
        setActiveFilters((prev) => {
            const newFilters = new Set(prev);
            if (newFilters.has(category)) {
                newFilters.delete(category);
            } else {
                newFilters.add(category);
            }
            return newFilters;
        });
    };

    const toggleExpand = (eventId: string, e: React.MouseEvent) => {
        e.preventDefault();
        setExpandedEvents((prev) => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(eventId)) {
                newExpanded.delete(eventId);
            } else {
                newExpanded.add(eventId);
            }
            return newExpanded;
        });
    };

    const filteredEvents = events.filter((e) => activeFilters.has(e.category));

    // Group events by decade for better visual organization
    const decades = Array.from(new Set(filteredEvents.map(e => Math.floor(e.year / 10) * 10))).sort((a, b) => a - b);

    return (
        <div className="relative">
            {/* Filters */}
            <div className="sticky top-4 z-20 mb-12 flex justify-center">
                <div className="inline-flex gap-2 rounded-full bg-white/95 p-2 shadow-xl backdrop-blur-md border border-gray-200">
                    {Object.entries(categoryLabels).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => toggleFilter(key)}
                            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${activeFilters.has(key)
                                    ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg scale-105'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:scale-102'
                                }`}
                        >
                            <span className="text-lg">{categoryIcons[key as keyof typeof categoryIcons]}</span>
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Event Count */}
            <div className="mb-8 text-center">
                <p className="text-sm font-medium text-gray-600">
                    Viser {filteredEvents.length} hendelser
                    {activeFilters.size < 4 && ` fra ${Array.from(activeFilters).map(c => categoryLabels[c as keyof typeof categoryLabels]).join(', ')}`}
                </p>
            </div>

            {/* Timeline Container */}
            <div className="relative">
                {/* Enhanced Animated River Background with Gradient Mesh */}
                <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 overflow-hidden" style={{ width: '6px' }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-teal-400 to-emerald-400 opacity-40 animate-river-flow" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse-slow" />
                </div>

                {/* Decade Markers with Enhanced Style */}
                {decades.map((decade) => (
                    <div key={decade} className="relative mb-20">
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 opacity-20 blur-xl animate-pulse-slow" />
                                <div className="relative rounded-full bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-3 text-2xl font-bold text-white shadow-2xl ring-4 ring-white">
                                    {decade}s
                                </div>
                            </div>
                        </div>
                        <div className="h-20" />
                    </div>
                ))}

                {/* Events with Enhanced Design */}
                <div className="space-y-12">
                    {filteredEvents.map((event, index) => {
                        const isLeft = index % 2 === 0;
                        const isExpanded = expandedEvents.has(event.id);
                        const isVisible = visibleEvents.has(event.id);

                        return (
                            <div
                                key={event.id}
                                id={event.id}
                                ref={(el) => {
                                    if (el && observerRef.current) {
                                        observerRef.current.observe(el);
                                    }
                                }}
                                className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                            >
                                {/* Connecting Line with Glow */}
                                <div
                                    className={`absolute top-1/2 h-1 ${isLeft ? 'left-1/2' : 'right-1/2'} transition-all duration-500`}
                                    style={{
                                        width: isExpanded ? '5rem' : '4rem',
                                        background: `linear-gradient(${isLeft ? '90deg' : '-90deg'}, ${event.color}, transparent)`,
                                        boxShadow: `0 0 10px ${event.color}40`
                                    }}
                                />

                                {/* Event Card with Enhanced Design */}
                                <div
                                    className={`relative transition-all duration-700 ${isVisible
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-12'
                                        } ${isLeft ? 'mr-[calc(50%+5rem)]' : 'ml-[calc(50%+5rem)]'} ${isExpanded ? 'w-7/12' : 'w-5/12'
                                        }`}
                                >
                                    <div
                                        className="group relative overflow-hidden rounded-2xl border-2 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                        style={{
                                            borderColor: event.color,
                                            boxShadow: `0 10px 40px ${event.color}20, 0 0 0 1px ${event.color}10`
                                        }}
                                    >
                                        {/* Gradient Overlay */}
                                        <div
                                            className="absolute top-0 left-0 right-0 h-2 opacity-60"
                                            style={{
                                                background: `linear-gradient(90deg, ${event.color}, ${event.color}80, ${event.color})`
                                            }}
                                        />

                                        <div className="p-6">
                                            {/* Header Row */}
                                            <div className="flex items-start justify-between mb-3">
                                                {/* Category Badge with Icon */}
                                                <div
                                                    className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-md"
                                                    style={{ backgroundColor: event.color }}
                                                >
                                                    <span>{categoryIcons[event.category]}</span>
                                                    <span>{categoryLabels[event.category]}</span>
                                                </div>

                                                {/* Expand/Collapse Button */}
                                                <button
                                                    onClick={(e) => toggleExpand(event.id, e)}
                                                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
                                                    aria-label={isExpanded ? 'Minimér' : 'Utvid'}
                                                >
                                                    <svg
                                                        className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Image if available */}
                                            {event.image && (
                                                <div className={`relative mb-4 overflow-hidden rounded-xl transition-all duration-500 ${isExpanded ? 'h-64' : 'h-40'
                                                    }`}>
                                                    <Image
                                                        src={event.image}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                </div>
                                            )}

                                            {/* Year with Enhanced Style */}
                                            <div
                                                className="mb-3 inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-bold"
                                                style={{
                                                    backgroundColor: `${event.color}15`,
                                                    color: event.color
                                                }}
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {event.year}
                                            </div>

                                            {/* Title */}
                                            <h3 className={`mb-3 font-bold text-gray-900 transition-all ${isExpanded ? 'text-2xl' : 'text-lg line-clamp-2'
                                                }`}>
                                                {event.title}
                                            </h3>

                                            {/* Description */}
                                            <p className={`text-gray-600 transition-all ${isExpanded ? 'text-base' : 'text-sm line-clamp-3'
                                                }`}>
                                                {event.description}
                                            </p>

                                            {/* Expandable Content */}
                                            {isExpanded && (
                                                <div className="mt-6 space-y-4 animate-fadeIn">
                                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                                                    <Link
                                                        href={event.link}
                                                        className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                                                        style={{ backgroundColor: event.color }}
                                                    >
                                                        <span>Utforsk mer</span>
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            )}

                                            {/* Collapsed State: Hover Indicator */}
                                            {!isExpanded && (
                                                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                                                    <span>Klikk for å utvide</span>
                                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Year Dot on Timeline */}
                                <div
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                >
                                    <div className="relative">
                                        <div
                                            className="absolute inset-0 rounded-full blur-md animate-pulse-slow"
                                            style={{ backgroundColor: event.color, opacity: 0.4 }}
                                        />
                                        <div
                                            className="relative h-5 w-5 rounded-full border-4 border-white shadow-lg transition-transform hover:scale-125"
                                            style={{ backgroundColor: event.color }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* End Marker */}
            <div className="mt-20 text-center">
                <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 text-white shadow-xl">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="font-semibold">Historien fortsetter...</span>
                </div>
            </div>
        </div>
    );
}
