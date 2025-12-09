'use client';

import { MasterTimelineEvent } from '@/lib/loaders/biblioteket-loader';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { HistorieIcon, KulturIcon, LitteraturIcon, IldsjelIcon } from './CategoryIcons';

interface MasterTimelineProps {
    events: MasterTimelineEvent[];
}

const categoryLabels = {
    historie: 'Byhistorie',
    kultur: 'Kultur',
    litteratur: 'Litteratur',
    ildsjeler: 'Ildsjeler'
};

// Category colors using natural palette
const categoryColors = {
    historie: {
        primary: '#2C5F2D', // natural-forest
        gradient: 'from-natural-forest to-natural-sage',
        glow: 'rgba(44, 95, 45, 0.15)'
    },
    kultur: {
        primary: '#8B7355', // natural-earth
        gradient: 'from-natural-earth to-natural-sand',
        glow: 'rgba(139, 115, 85, 0.15)'
    },
    litteratur: {
        primary: '#97BC62', // natural-sage
        gradient: 'from-natural-sage to-natural-forest',
        glow: 'rgba(151, 188, 98, 0.15)'
    },
    ildsjeler: {
        primary: '#6B7280', // natural-stone
        gradient: 'from-natural-stone to-gray-500',
        glow: 'rgba(107, 114, 128, 0.15)'
    }
};

const CategoryIconComponent = ({ category, className }: { category: string; className?: string }) => {
    switch (category) {
        case 'historie':
            return <HistorieIcon className={className} />;
        case 'kultur':
            return <KulturIcon className={className} />;
        case 'litteratur':
            return <LitteraturIcon className={className} />;
        case 'ildsjeler':
            return <IldsjelIcon className={className} />;
        default:
            return null;
    }
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
            {/* Filter Buttons */}
            <div className="sticky top-4 z-20 mb-10 flex justify-center">
                <div className="inline-flex flex-wrap justify-center gap-2 rounded-2xl bg-white p-2 shadow-lg border border-gray-100">
                    {Object.entries(categoryLabels).map(([key, label]) => {
                        const colors = categoryColors[key as keyof typeof categoryColors];
                        const isActive = activeFilters.has(key);
                        return (
                            <button
                                key={key}
                                onClick={() => toggleFilter(key)}
                                aria-pressed={isActive}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'text-white shadow-md'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                                style={isActive ? { backgroundColor: colors.primary } : {}}
                            >
                                <CategoryIconComponent category={key} className="h-4 w-4" />
                                <span className="hidden sm:inline">{label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Event Count */}
            <div className="mb-8 text-center">
                <p className="text-sm text-gray-500">
                    {filteredEvents.length} hendelser
                    {activeFilters.size < 4 && activeFilters.size > 0 && (
                        <span className="text-gray-400"> · {Array.from(activeFilters).map(c => categoryLabels[c as keyof typeof categoryLabels]).join(', ')}</span>
                    )}
                </p>
            </div>

            {/* Timeline Container */}
            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 rounded-full" />

                {/* Decade Markers */}
                {decades.map((decade) => (
                    <div key={decade} className="relative mb-16">
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                            <div className="rounded-xl bg-gray-900 px-6 py-3 text-lg font-bold text-white shadow-lg">
                                {decade}s
                            </div>
                        </div>
                        <div className="h-16" />
                    </div>
                ))}

                {/* Events */}
                <div className="space-y-8">
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
                                {/* Connecting Line */}
                                <div
                                    className={`absolute top-1/2 h-0.5 ${isLeft ? 'left-1/2' : 'right-1/2'}`}
                                    style={{
                                        width: '3rem',
                                        backgroundColor: event.color,
                                        opacity: 0.5
                                    }}
                                />

                                {/* Event Card */}
                                <div
                                    className={`relative transition-all duration-500 ${isVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        } ${isLeft ? 'mr-[calc(50%+4rem)]' : 'ml-[calc(50%+4rem)]'} w-5/12 max-w-md`}
                                >
                                    <div
                                        className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                                        style={{ borderColor: `${event.color}40` }}
                                    >
                                        {/* Color accent bar */}
                                        <div
                                            className="absolute top-0 left-0 right-0 h-1"
                                            style={{ backgroundColor: event.color }}
                                        />

                                        <div className="p-5">
                                            {/* Header */}
                                            <div className="flex items-start justify-between gap-3 mb-3">
                                                <div
                                                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white"
                                                    style={{ backgroundColor: event.color }}
                                                >
                                                    <CategoryIconComponent category={event.category} className="h-3 w-3" />
                                                    <span>{categoryLabels[event.category]}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => toggleExpand(event.id, e)}
                                                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                                    aria-label={isExpanded ? 'Lukk' : 'Utvid'}
                                                    aria-expanded={isExpanded}
                                                >
                                                    <svg
                                                        className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Image */}
                                            {event.image && (
                                                <div className={`relative mb-3 overflow-hidden rounded-lg transition-all duration-300 ${isExpanded ? 'h-48' : 'h-32'}`}>
                                                    <Image
                                                        src={event.image}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="300px"
                                                    />
                                                </div>
                                            )}

                                            {/* Year */}
                                            <div
                                                className="mb-2 inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-bold"
                                                style={{ backgroundColor: `${event.color}15`, color: event.color }}
                                            >
                                                {event.year}
                                            </div>

                                            {/* Title */}
                                            <h3 className={`mb-2 font-bold text-gray-900 ${isExpanded ? 'text-lg' : 'text-base line-clamp-2'}`}>
                                                {event.title}
                                            </h3>

                                            {/* Description */}
                                            <p className={`text-sm text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                                                {event.description}
                                            </p>

                                            {/* Expanded Content */}
                                            {isExpanded && (
                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                    <Link
                                                        href={event.link}
                                                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
                                                        style={{ backgroundColor: event.color }}
                                                    >
                                                        Utforsk mer
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Dot */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div
                                        className="h-4 w-4 rounded-full border-3 border-white shadow-md"
                                        style={{ backgroundColor: event.color }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* End Marker */}
            <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 text-gray-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Historien fortsetter...</span>
                </div>
            </div>
        </div>
    );
}
