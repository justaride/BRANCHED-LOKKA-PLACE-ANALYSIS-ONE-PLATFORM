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

// Enhanced category colors with gradients
const categoryColors = {
    historie: {
        primary: '#3B82F6',
        gradient: 'from-blue-500 to-blue-400',
        glow: 'rgba(59, 130, 246, 0.15)'
    },
    kultur: {
        primary: '#8B5CF6',
        gradient: 'from-purple-500 to-purple-400',
        glow: 'rgba(139, 92, 246, 0.15)'
    },
    litteratur: {
        primary: '#EC4899',
        gradient: 'from-pink-500 to-pink-400',
        glow: 'rgba(236, 72, 153, 0.15)'
    },
    ildsjeler: {
        primary: '#F59E0B',
        gradient: 'from-amber-500 to-amber-400',
        glow: 'rgba(245, 158, 11, 0.15)'
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
            {/* Enhanced Filters with Glassmorphism */}
            <div className="sticky top-4 z-20 mb-12 flex justify-center">
                <div className="inline-flex gap-2 rounded-full bg-white/80 p-2 shadow-2xl backdrop-blur-xl border border-white/60 ring-1 ring-black/5">
                    {Object.entries(categoryLabels).map(([key, label]) => {
                        const colors = categoryColors[key as keyof typeof categoryColors];
                        return (
                            <button
                                key={key}
                                onClick={() => toggleFilter(key)}
                                className={`group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 overflow-hidden ${activeFilters.has(key)
                                    ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg scale-105`
                                    : 'bg-white/60 text-gray-700 hover:bg-white hover:shadow-md hover:scale-102'
                                    }`}
                                style={activeFilters.has(key) ? {
                                    boxShadow: `0 0 0 2px white, 0 0 0 4px ${colors.primary}`
                                } : {}}
                            >
                                {activeFilters.has(key) && (
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r opacity-20 animate-shimmer"
                                        style={{
                                            backgroundImage: `linear-gradient(90deg, transparent, white, transparent)`,
                                        }}
                                    />
                                )}
                                <CategoryIconComponent category={key} className="h-4 w-4 relative z-10" />
                                <span className="relative z-10">{label}</span>
                            </button>
                        );
                    })}
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
                {/* Enhanced Multi-Layer River with Flowing Particles */}
                <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 overflow-hidden" style={{ width: '8px' }}>
                    {/* Base gradient layer */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 via-pink-500 to-amber-500 opacity-30 animate-river-flow rounded-full" />
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-pulse-slow" />
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-sm bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 opacity-20 animate-river-flow" style={{ animationDuration: '25s' }} />
                </div>

                {/* Enhanced Decade Markers with Float Animation */}
                {decades.map((decade, idx) => (
                    <div key={decade} className="relative mb-20">
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                            <div className="relative animate-float" style={{ animationDelay: `${idx * 0.2}s` }}>
                                {/* Multiple glow layers for depth */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-2xl animate-glow-pulse" />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-amber-500 opacity-10 blur-xl animate-pulse-slow" />
                                {/* Main badge */}
                                <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-10 py-4 text-2xl font-black text-white shadow-2xl ring-4 ring-white border border-white/10">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent" />
                                    <span className="relative bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">
                                        {decade}s
                                    </span>
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
                                        className="group relative overflow-hidden rounded-2xl border-2 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
                                        style={{
                                            borderColor: event.color,
                                            boxShadow: `0 10px 40px ${event.color}20, 0 5px 15px rgba(0,0,0,0.1), 0 0 0 1px ${event.color}10`
                                        }}
                                    >
                                        {/* Enhanced Gradient Overlay with Shimmer */}
                                        <div
                                            className="absolute top-0 left-0 right-0 h-3 opacity-70"
                                            style={{
                                                background: `linear-gradient(90deg, ${event.color}, ${event.color}CC, ${event.color})`
                                            }}
                                        />
                                        {/* Glassmorphism effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/0 group-hover:to-transparent transition-all duration-500" />

                                        <div className="p-6">
                                            {/* Header Row */}
                                            <div className="flex items-start justify-between mb-3">
                                                {/* Enhanced Category Badge with Icon */}
                                                <div
                                                    className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg ring-2 ring-white/50"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${event.color}, ${event.color}DD)`,
                                                        boxShadow: `0 4px 12px ${event.color}40`
                                                    }}
                                                >
                                                    <CategoryIconComponent category={event.category} className="h-3.5 w-3.5" />
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

                                {/* Enhanced Year Dot with Multi-Layer Glow */}
                                <div
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                >
                                    <div className="relative">
                                        {/* Outer glow */}
                                        <div
                                            className="absolute inset-0 rounded-full blur-lg animate-glow-pulse"
                                            style={{ backgroundColor: event.color, opacity: 0.4, transform: 'scale(2)' }}
                                        />
                                        {/* Inner glow */}
                                        <div
                                            className="absolute inset-0 rounded-full blur-md animate-pulse-slow"
                                            style={{ backgroundColor: event.color, opacity: 0.5, transform: 'scale(1.5)' }}
                                        />
                                        {/* Main dot with gradient */}
                                        <div
                                            className="relative h-6 w-6 rounded-full border-4 border-white shadow-2xl transition-all duration-300 hover:scale-150 cursor-pointer"
                                            style={{
                                                background: `radial-gradient(circle at 30% 30%, ${event.color}FF, ${event.color}CC)`,
                                                boxShadow: `0 0 20px ${event.color}60, 0 4px 10px rgba(0,0,0,0.2)`
                                            }}
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
