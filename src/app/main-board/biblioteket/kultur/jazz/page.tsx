'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getJazzData } from '@/lib/loaders/biblioteket-loader';
import { fadeUpVariants, springs, viewport, stagger } from '@/lib/animations';

const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const heroItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springs.smooth,
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger.normal,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: springs.smooth,
    },
};

export default function JazzPage() {
    const data = getJazzData();
    const [expandedPeriod, setExpandedPeriod] = useState<string | null>(data.timeline[0]?.id ?? null);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 bg-gradient-to-br from-blue-900 via-indigo-800 to-sky-900 text-white">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5" />
                <Container className="relative z-10">
                    <motion.div
                        className="max-w-3xl"
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={heroItemVariants}>
                            <Link
                                href="/main-board/biblioteket/kultur"
                                className="mb-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group"
                            >
                                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Tilbake til Kultur
                            </Link>
                        </motion.div>
                        <motion.div
                            variants={heroItemVariants}
                            className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm border border-white/10"
                        >
                            Jazz
                        </motion.div>
                        <motion.h1
                            variants={heroItemVariants}
                            className="mb-6 text-4xl md:text-5xl font-bold leading-tight"
                        >
                            {data.title}
                        </motion.h1>
                        <motion.p
                            variants={heroItemVariants}
                            className="text-lg md:text-xl text-white/90 leading-relaxed"
                        >
                            {data.description}
                        </motion.p>
                    </motion.div>
                </Container>
            </section>

            {/* Stats */}
            <section className="border-b border-gray-200 bg-white py-8">
                <Container>
                    <div className="flex flex-wrap gap-8 md:gap-12 justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{data.artists.length}</div>
                            <div className="text-sm text-gray-500">Artister</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{data.venues.length}</div>
                            <div className="text-sm text-gray-500">Spillesteder</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{data.timeline.length}</div>
                            <div className="text-sm text-gray-500">Tidsperioder</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{data.festivals.length}</div>
                            <div className="text-sm text-gray-500">Festivaler</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Timeline Section */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Tidslinje
                        </motion.h2>
                        <div className="space-y-4">
                            {data.timeline.map((period, index) => {
                                const isExpanded = expandedPeriod === period.id;
                                return (
                                    <motion.div
                                        key={period.id}
                                        variants={cardVariants}
                                        custom={index}
                                        className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setExpandedPeriod(isExpanded ? null : period.id)}
                                            className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <span className="inline-block rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 mb-2">
                                                        {period.period}
                                                    </span>
                                                    <h3 className="text-lg font-bold text-gray-900">{period.title}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{period.description}</p>
                                                </div>
                                                <svg
                                                    className={`h-5 w-5 text-gray-400 flex-shrink-0 ml-4 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </button>
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                                                        <div className="space-y-3">
                                                            {period.events.map((event) => (
                                                                <div key={`${event.year}-${event.title}`} className="flex items-start gap-3">
                                                                    <span className="flex-shrink-0 rounded bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                                                                        {event.year}
                                                                    </span>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                                                        <p className="text-sm text-gray-600">{event.description}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Artists Section */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Artister
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.artists.map((artist, index) => (
                                <motion.div
                                    key={artist.id}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-6"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{artist.name}</h3>
                                        <span className="text-sm font-medium text-blue-600">
                                            {artist.birthYear}{artist.deathYear ? `–${artist.deathYear}` : '–'}
                                        </span>
                                    </div>
                                    <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 mb-3">
                                        {artist.instrument}
                                    </span>
                                    <p className="text-sm text-gray-700 mb-3">{artist.description}</p>
                                    <p className="text-sm text-blue-600 italic mb-3">{artist.connectionToLokka}</p>
                                    {artist.awards && artist.awards.length > 0 && (
                                        <div className="mb-3 flex flex-wrap gap-1.5">
                                            {artist.awards.map((award) => (
                                                <span
                                                    key={award}
                                                    className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700"
                                                >
                                                    {award}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {artist.keyAlbums && artist.keyAlbums.length > 0 && (
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Album:</span>
                                            <p className="text-sm text-gray-600">
                                                {artist.keyAlbums.map(a => `${a.title} (${a.year})`).join(', ')}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Venues Section */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Spillesteder
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.venues.map((venue, index) => (
                                <motion.div
                                    key={venue.id}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-6 hover:border-blue-200 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{venue.name}</h3>
                                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            venue.status === 'aktiv'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {venue.status === 'aktiv' ? 'Aktiv' : 'Nedlagt'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">{venue.address}</p>
                                    <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 mb-3">
                                        {venue.period}
                                    </span>
                                    <p className="text-sm text-gray-700">{venue.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Festivals Section */}
            <section className="bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Festivaler
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.festivals.map((festival, index) => (
                                <motion.div
                                    key={festival.id}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-6"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{festival.name}</h3>
                                        <span className="text-sm font-medium text-blue-600">{festival.founded}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">{festival.location}</p>
                                    <p className="text-sm text-gray-700">{festival.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
