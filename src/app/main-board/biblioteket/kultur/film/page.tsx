'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getFilmData } from '@/lib/loaders/biblioteket-loader';
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

export default function FilmPage() {
    const data = getFilmData();

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
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
                            Film & Kino
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
                            <div className="text-3xl font-bold text-blue-600">{data.films.length}</div>
                            <div className="text-sm text-gray-500">Filmer</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{data.filmmakers.length}</div>
                            <div className="text-sm text-gray-500">Filmskapere</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{data.cinemas.length}</div>
                            <div className="text-sm text-gray-500">Kinoer</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Films Section */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Filmer innspilt på Grünerløkka
                        </motion.h2>
                        <div className="space-y-4">
                            {data.films.map((film, index) => (
                                <motion.div
                                    key={film.title}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-6 hover:border-blue-200 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <span className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-lg font-bold text-blue-700">
                                                {film.year}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{film.title}</h3>
                                            <p className="text-sm text-gray-500 mb-2">Regi: {film.director} | {film.type}</p>
                                            <p className="text-gray-700 mb-3">{film.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {film.locations.map((loc) => (
                                                    <span key={loc} className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                                        {loc}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-blue-600 italic">{film.significance}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Filmmakers Section */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Filmskapere med tilknytning til Løkka
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.filmmakers.map((maker, index) => (
                                <motion.div
                                    key={maker.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-6 hover:border-blue-200 transition-colors"
                                >
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{maker.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{maker.years} | {maker.role}</p>
                                    <p className="text-gray-700 mb-3">{maker.connection}</p>
                                    {maker.keyWorks.length > 0 && (
                                        <div className="mb-2">
                                            <span className="text-xs font-medium text-gray-500 uppercase">Nøkkelverk:</span>
                                            <p className="text-sm text-gray-600">{maker.keyWorks.join(', ')}</p>
                                        </div>
                                    )}
                                    <p className="text-sm text-blue-600 italic">{maker.significance}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Cinemas Section */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Kinohistorien på Grünerløkka
                        </motion.h2>
                        <div className="space-y-6">
                            {data.cinemas.map((cinema, index) => (
                                <motion.div
                                    key={cinema.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-20 text-center">
                                            <div className="text-2xl font-bold text-blue-600">{cinema.established}</div>
                                            {cinema.closed && (
                                                <div className="text-sm text-gray-400">–{cinema.closed}</div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{cinema.name}</h3>
                                            <p className="text-sm text-gray-500 mb-2">{cinema.address}</p>
                                            <p className="text-gray-700 mb-2">{cinema.description}</p>
                                            {cinema.currentUse && (
                                                <p className="text-sm text-gray-600 mb-2">
                                                    <span className="font-medium">I dag:</span> {cinema.currentUse}
                                                </p>
                                            )}
                                            <p className="text-sm text-blue-600 italic">{cinema.significance}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Documentaries Section */}
            <section className="bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Dokumentarer om Grünerløkka
                        </motion.h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            {data.documentaries.map((doc, index) => (
                                <motion.div
                                    key={doc.title}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                >
                                    <h3 className="font-bold text-gray-900 mb-1">{doc.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">Regi: {doc.director}</p>
                                    <p className="text-sm text-gray-700">{doc.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
