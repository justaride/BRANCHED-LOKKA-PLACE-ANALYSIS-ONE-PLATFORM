'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getTeaterData } from '@/lib/loaders/biblioteket-loader';
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

export default function TeaterPage() {
    const data = getTeaterData();

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900 text-white">
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
                            Scenekunst
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
                            {data.intro}
                        </motion.p>
                    </motion.div>
                </Container>
            </section>

            {/* Stats */}
            <section className="border-b border-gray-200 bg-white py-8">
                <Container>
                    <div className="flex flex-wrap gap-8 md:gap-12 justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-violet-600">{data.venues.length}</div>
                            <div className="text-sm text-gray-500">Scener</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-violet-600">{data.theaterGroups.length}</div>
                            <div className="text-sm text-gray-500">Teatergrupper</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-violet-600">{data.siteSpecificPerformances.length}</div>
                            <div className="text-sm text-gray-500">Stedsspesifikke forestillinger</div>
                        </div>
                    </div>
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
                            Scener og kulturarenaer
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {data.venues.map((venue, index) => (
                                <motion.div
                                    key={venue.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-6 hover:border-violet-200 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{venue.name}</h3>
                                        {venue.established && (
                                            <span className="text-sm font-medium text-violet-600">{venue.established}</span>
                                        )}
                                    </div>
                                    <span className="inline-block rounded bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 mb-2">
                                        {venue.type}
                                    </span>
                                    {venue.address && (
                                        <p className="text-sm text-gray-500 mb-2">{venue.address}</p>
                                    )}
                                    {venue.description && (
                                        <p className="text-sm text-gray-700 mb-2">{venue.description}</p>
                                    )}
                                    {venue.currentUse && (
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium">I dag:</span> {venue.currentUse}
                                        </p>
                                    )}
                                    <p className="text-sm text-violet-600 italic">{venue.significance}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Theater Groups Section */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Frie teatergrupper
                        </motion.h2>
                        <div className="space-y-6">
                            {data.theaterGroups.map((group, index) => (
                                <motion.div
                                    key={group.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-6"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <span className="inline-block rounded-lg bg-violet-100 px-3 py-1 text-lg font-bold text-violet-700">
                                                {group.established}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{group.name}</h3>
                                            <span className="inline-block rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 mb-2">
                                                {group.focus}
                                            </span>
                                            {group.founders && group.founders.length > 0 && (
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Grunnleggere: {group.founders.join(', ')}
                                                </p>
                                            )}
                                            {group.founder && (
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Grunnlegger: {group.founder}
                                                </p>
                                            )}
                                            {group.connection && (
                                                <p className="text-gray-700 mb-2">{group.connection}</p>
                                            )}
                                            {group.description && (
                                                <p className="text-gray-700 mb-2">{group.description}</p>
                                            )}
                                            {group.keyWorks && group.keyWorks.length > 0 && (
                                                <div className="mb-2">
                                                    <span className="text-xs font-medium text-gray-500 uppercase">Nøkkelverk:</span>
                                                    <p className="text-sm text-gray-600">{group.keyWorks.join(', ')}</p>
                                                </div>
                                            )}
                                            <p className="text-sm text-violet-600 italic">{group.significance}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Site-Specific Performances */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Stedsspesifikke forestillinger
                        </motion.h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {data.siteSpecificPerformances.map((perf, index) => (
                                <motion.div
                                    key={perf.title}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-5"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 rounded bg-violet-600 px-2 py-1 text-sm font-bold text-white">
                                            {perf.year}
                                        </span>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{perf.title}</h3>
                                            <p className="text-sm text-gray-500 mb-1">{perf.company} | {perf.location}</p>
                                            <p className="text-sm text-gray-700">{perf.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Children's Theater */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Barneteater og dukketeater
                        </motion.h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            {data.childrenTheater.map((theater, index) => (
                                <motion.div
                                    key={theater.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                >
                                    <h3 className="font-bold text-gray-900 mb-1">{theater.name}</h3>
                                    {theater.years && (
                                        <p className="text-sm text-gray-500 mb-2">{theater.years}</p>
                                    )}
                                    {theater.location && (
                                        <p className="text-sm text-gray-500 mb-2">{theater.location}</p>
                                    )}
                                    <p className="text-sm text-gray-700">{theater.description}</p>
                                    {theater.significance && (
                                        <p className="text-sm text-violet-600 italic mt-2">{theater.significance}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Comedy Section */}
            <section className="bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Stand-up og kabaret
                        </motion.h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            {data.comedy.map((venue, index) => (
                                <motion.div
                                    key={venue.venue}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-5"
                                >
                                    <h3 className="font-bold text-gray-900 mb-2">{venue.venue}</h3>
                                    <p className="text-sm text-gray-700">{venue.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
