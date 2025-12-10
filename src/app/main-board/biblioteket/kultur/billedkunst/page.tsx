'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getBilledkunstData } from '@/lib/loaders/biblioteket-loader';
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

export default function BilledkunstPage() {
    const data = getBilledkunstData();

    const totalArtists = data.artists.early.length + data.artists.naturalists.length + data.artists.contemporary.length;
    const totalPhotographers = data.photographers.historical.length + data.photographers.modern.length;

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900 text-white">
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
                            Visuell kunst
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
                            <div className="text-3xl font-bold text-amber-600">{totalArtists}</div>
                            <div className="text-sm text-gray-500">Kunstnere</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{data.streetArt.artists.length}</div>
                            <div className="text-sm text-gray-500">Gatekunstnere</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{totalPhotographers}</div>
                            <div className="text-sm text-gray-500">Fotografer</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{data.artVenues.length}</div>
                            <div className="text-sm text-gray-500">Kunstinstitusjoner</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Early Artists */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Tidlige kunstnere (1800-tallet)
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                            Kunstnere som vokste opp eller fant inspirasjon på Grünerløkka i bydelens tidlige år.
                        </motion.p>
                        <div className="space-y-6">
                            {data.artists.early.map((artist, index) => (
                                <motion.div
                                    key={artist.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-6"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{artist.name}</h3>
                                    <p className="text-sm text-amber-600 font-medium mb-3">{artist.years}</p>
                                    <p className="text-gray-700 mb-3">{artist.connection}</p>
                                    {artist.keyWorks && artist.keyWorks.length > 0 && (
                                        <div className="mb-3">
                                            <span className="text-xs font-medium text-gray-500 uppercase">Nøkkelverk:</span>
                                            <div className="mt-2 space-y-1">
                                                {artist.keyWorks.map((work) => (
                                                    <div key={work.title} className="flex items-start gap-2">
                                                        <span className="text-amber-600">•</span>
                                                        <span className="text-sm text-gray-700">
                                                            <strong>{work.title}</strong> {work.year && `(${work.year})`}
                                                            {work.note && <span className="text-gray-500"> – {work.note}</span>}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-sm text-amber-600 italic">{artist.significance}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Naturalists */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Naturalister og realister (1880-1910)
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                            Kunstnere som malte arbeidermiljøer og hverdagsliv langs Akerselva.
                        </motion.p>
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.artists.naturalists.map((artist, index) => (
                                <motion.div
                                    key={artist.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-6"
                                >
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{artist.name}</h3>
                                    <p className="text-sm text-amber-600 font-medium mb-2">{artist.years}</p>
                                    <p className="text-gray-700 mb-3">{artist.connection}</p>
                                    {artist.keyWorks && artist.keyWorks.length > 0 && (
                                        <div className="mb-3">
                                            <span className="text-xs font-medium text-gray-500 uppercase">Nøkkelverk:</span>
                                            <div className="mt-1">
                                                {artist.keyWorks.map((work) => (
                                                    <p key={work.title} className="text-sm text-gray-600">
                                                        • {work.title} {work.year && `(${work.year})`}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {artist.quote && (
                                        <p className="text-sm text-gray-500 italic border-l-2 border-amber-300 pl-3 mb-2">
                                            &ldquo;{artist.quote}&rdquo;
                                        </p>
                                    )}
                                    <p className="text-sm text-amber-600 italic">{artist.significance}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Contemporary Artists */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Samtidskunstnere (1990-i dag)
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                            Moderne kunstnere med atelier og tilknytning til Grünerløkka.
                        </motion.p>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {data.artists.contemporary.map((artist, index) => (
                                <motion.div
                                    key={artist.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-5"
                                >
                                    <h3 className="font-bold text-gray-900 mb-1">{artist.name}</h3>
                                    <p className="text-sm text-amber-600 font-medium mb-2">{artist.years}</p>
                                    <p className="text-sm text-gray-700 mb-2">{artist.connection}</p>
                                    <p className="text-sm text-amber-600 italic">{artist.significance}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Street Art */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Gatekunst og Street Art
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                            {data.streetArt.intro}
                        </motion.p>

                        <div className="grid gap-8 lg:grid-cols-2 mb-8">
                            <motion.div variants={fadeUpVariants} className="prose prose-gray">
                                <p className="text-gray-700">{data.streetArt.background}</p>
                            </motion.div>
                            <motion.div variants={fadeUpVariants}>
                                <h4 className="font-bold text-gray-900 mb-3">Hvor finner du gatekunst?</h4>
                                <div className="flex flex-wrap gap-2">
                                    {data.streetArt.locations.map((loc) => (
                                        <span key={loc} className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
                                            {loc}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {data.streetArt.artists.map((artist, index) => (
                                <motion.div
                                    key={artist.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                >
                                    <h3 className="font-bold text-gray-900 mb-1">{artist.name}</h3>
                                    <span className="inline-block rounded bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700 mb-2">
                                        {artist.style}
                                    </span>
                                    <p className="text-sm text-gray-700 mb-2">{artist.description}</p>
                                    {artist.works && artist.works.length > 0 && (
                                        <p className="text-xs text-gray-500">Verk: {artist.works.join(', ')}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Photographers */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Fotografer som har dokumentert Grünerløkka
                        </motion.h2>

                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Historiske fotografer</h3>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {data.photographers.historical.map((photographer, index) => (
                                    <motion.div
                                        key={photographer.name}
                                        variants={cardVariants}
                                        custom={index}
                                        className="rounded-xl border border-gray-200 bg-white p-5"
                                    >
                                        <h4 className="font-bold text-gray-900 mb-1">{photographer.name}</h4>
                                        <p className="text-sm text-amber-600 font-medium mb-2">{photographer.years}</p>
                                        <p className="text-sm text-gray-700 mb-2">{photographer.contribution}</p>
                                        {photographer.keyWorks && photographer.keyWorks.length > 0 && (
                                            <p className="text-xs text-gray-500">{photographer.keyWorks.join(', ')}</p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Moderne fotografer</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                {data.photographers.modern.map((photographer, index) => (
                                    <motion.div
                                        key={photographer.name}
                                        variants={cardVariants}
                                        custom={index}
                                        className="rounded-xl border border-gray-200 bg-white p-5"
                                    >
                                        <h4 className="font-bold text-gray-900 mb-1">{photographer.name}</h4>
                                        <p className="text-sm text-amber-600 font-medium mb-2">{photographer.years}</p>
                                        <p className="text-sm text-gray-700">{photographer.contribution}</p>
                                        {photographer.note && (
                                            <p className="text-sm text-amber-600 italic mt-2">{photographer.note}</p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Art Venues */}
            <section className="bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Gallerier og kunstinstitusjoner
                        </motion.h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {data.artVenues.map((venue, index) => (
                                <motion.div
                                    key={venue.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-gray-900">{venue.name}</h3>
                                        {venue.established && (
                                            <span className="text-sm font-medium text-amber-600">{venue.established}</span>
                                        )}
                                    </div>
                                    {venue.address && (
                                        <p className="text-sm text-gray-500 mb-2">{venue.address}</p>
                                    )}
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
