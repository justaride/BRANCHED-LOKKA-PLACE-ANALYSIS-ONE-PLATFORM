'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getHiphopData } from '@/lib/loaders/biblioteket-loader';
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

export default function HiphopPage() {
    const data = getHiphopData();

    const xraySection = data.sections.find(s => s.id === 'xray');
    const breakdanceSection = data.sections.find(s => s.id === 'breakdance');
    const graffitiSection = data.sections.find(s => s.id === 'graffiti');
    const producersSection = data.sections.find(s => s.id === 'producers');

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 bg-gradient-to-br from-red-900 via-orange-800 to-amber-900 text-white">
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
                            Hiphop
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
                            <div className="text-3xl font-bold text-red-600">{data.sections.length}</div>
                            <div className="text-sm text-gray-500">Seksjoner</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600">{data.artists.length}</div>
                            <div className="text-sm text-gray-500">Artister</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600">{data.crews.length}</div>
                            <div className="text-sm text-gray-500">Crews</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600">{data.events.length}</div>
                            <div className="text-sm text-gray-500">Hendelser</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* X-Ray Ungdomskulturhus */}
            {xraySection && (
                <section className="border-b border-gray-200 bg-gray-50 py-16">
                    <Container>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport.default}
                            variants={containerVariants}
                        >
                            <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                                {xraySection.title}
                            </motion.h2>
                            <motion.p variants={fadeUpVariants} className="mb-6 text-lg text-gray-600">
                                {xraySection.subtitle}
                            </motion.p>
                            <motion.div variants={cardVariants} className="rounded-xl border border-gray-200 bg-white p-8">
                                <p className="text-gray-700 mb-6 leading-relaxed">{xraySection.description}</p>
                                <div className="flex flex-wrap gap-6 mb-6">
                                    {xraySection.founded && (
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Grunnlagt</span>
                                            <p className="text-lg font-bold text-red-600">{xraySection.founded}</p>
                                        </div>
                                    )}
                                    {xraySection.address && (
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Adresse</span>
                                            <p className="text-lg font-bold text-gray-900">{xraySection.address}</p>
                                        </div>
                                    )}
                                    {xraySection.founder && (
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Grunnlegger</span>
                                            <p className="text-lg font-bold text-gray-900">{xraySection.founder}</p>
                                        </div>
                                    )}
                                </div>
                                {xraySection.highlights && xraySection.highlights.length > 0 && (
                                    <div>
                                        <span className="text-xs font-medium text-gray-500 uppercase mb-3 block">Høydepunkter</span>
                                        <ul className="space-y-2">
                                            {xraySection.highlights.map((highlight, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-red-600 mt-1">&#8226;</span>
                                                    <span className="text-gray-700">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    </Container>
                </section>
            )}

            {/* Breakdance Timeline */}
            {breakdanceSection && (
                <section className="border-b border-gray-200 bg-white py-16">
                    <Container>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport.default}
                            variants={containerVariants}
                        >
                            <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                                Breakdance-tidslinje
                            </motion.h2>
                            <motion.p variants={fadeUpVariants} className="mb-2 text-lg text-gray-600">
                                {breakdanceSection.subtitle}
                            </motion.p>
                            <motion.p variants={fadeUpVariants} className="mb-8 text-gray-700">
                                {breakdanceSection.description}
                            </motion.p>
                            {breakdanceSection.timeline && breakdanceSection.timeline.length > 0 && (
                                <div className="relative">
                                    <div className="absolute left-[60px] top-0 bottom-0 w-px bg-red-200 md:left-[80px]" />
                                    <div className="space-y-6">
                                        {breakdanceSection.timeline.map((event, index) => (
                                            <motion.div
                                                key={index}
                                                variants={cardVariants}
                                                custom={index}
                                                className="relative flex items-start gap-4 md:gap-6"
                                            >
                                                <div className="flex-shrink-0 z-10 w-[52px] md:w-[64px]">
                                                    <span className="inline-block rounded-lg bg-red-600 px-2 py-1 text-sm font-bold text-white">
                                                        {event.year}
                                                    </span>
                                                </div>
                                                <div className="flex-shrink-0 z-10 mt-2.5 h-3 w-3 rounded-full bg-red-600 ring-4 ring-white" />
                                                <div className="flex-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
                                                    <h4 className="font-bold text-gray-900 mb-1">{event.title}</h4>
                                                    <p className="text-sm text-gray-700">{event.description}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </Container>
                </section>
            )}

            {/* Graffiti */}
            {graffitiSection && (
                <section className="border-b border-gray-200 bg-gray-50 py-16">
                    <Container>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport.default}
                            variants={containerVariants}
                        >
                            <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                                {graffitiSection.title}
                            </motion.h2>
                            <motion.p variants={fadeUpVariants} className="mb-2 text-lg text-gray-600">
                                {graffitiSection.subtitle}
                            </motion.p>
                            <motion.p variants={fadeUpVariants} className="mb-8 text-gray-700">
                                {graffitiSection.description}
                            </motion.p>

                            {graffitiSection.timeline && graffitiSection.timeline.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tidslinje</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {graffitiSection.timeline.map((event, index) => (
                                            <motion.div
                                                key={index}
                                                variants={cardVariants}
                                                custom={index}
                                                className="rounded-xl border border-gray-200 bg-white p-5"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 rounded bg-red-600 px-2 py-1 text-sm font-bold text-white">
                                                        {event.year}
                                                    </span>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">{event.title}</h4>
                                                        <p className="text-sm text-gray-700">{event.description}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {graffitiSection.pioneers && graffitiSection.pioneers.length > 0 && (
                                <motion.div variants={fadeUpVariants} className="mb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Pionerer</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {graffitiSection.pioneers.map((pioneer) => (
                                            <span
                                                key={pioneer}
                                                className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
                                            >
                                                {pioneer}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {graffitiSection.currentCurators && (
                                <motion.div variants={fadeUpVariants} className="rounded-xl border border-red-200 bg-red-50 p-5">
                                    <h3 className="text-sm font-bold text-red-800 mb-1">I dag</h3>
                                    <p className="text-sm text-red-700">{graffitiSection.currentCurators}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </Container>
                </section>
            )}

            {/* Beat-produsenter og studioer */}
            {producersSection && (
                <section className="border-b border-gray-200 bg-white py-16">
                    <Container>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport.default}
                            variants={containerVariants}
                        >
                            <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                                {producersSection.title}
                            </motion.h2>
                            <motion.p variants={fadeUpVariants} className="mb-2 text-lg text-gray-600">
                                {producersSection.subtitle}
                            </motion.p>
                            <motion.p variants={fadeUpVariants} className="mb-8 text-gray-700 leading-relaxed">
                                {producersSection.description}
                            </motion.p>
                            {producersSection.venues && producersSection.venues.length > 0 && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {producersSection.venues.map((venue, index) => (
                                        <motion.div
                                            key={venue.name}
                                            variants={cardVariants}
                                            custom={index}
                                            className="rounded-xl border border-gray-200 bg-gray-50 p-6"
                                        >
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{venue.name}</h3>
                                            <p className="text-sm text-gray-700">{venue.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </Container>
                </section>
            )}

            {/* Artister */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
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
                                    className="rounded-xl border border-gray-200 bg-white p-6 hover:border-red-200 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{artist.name}</h3>
                                            {artist.realName && (
                                                <p className="text-sm text-gray-500">{artist.realName}</p>
                                            )}
                                        </div>
                                        <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                                            {artist.genre}
                                        </span>
                                    </div>
                                    {artist.members && artist.members.length > 0 && (
                                        <p className="text-sm text-gray-500 mb-2">
                                            Medlemmer: {artist.members.join(', ')}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-700 mb-3">{artist.description}</p>
                                    <p className="text-sm text-red-600 italic">{artist.connectionToLokka}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Crews */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Crews
                        </motion.h2>
                        <div className="space-y-6">
                            {data.crews.map((crew, index) => (
                                <motion.div
                                    key={crew.id}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-6"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                                        <div className="flex-shrink-0">
                                            {crew.founded && (
                                                <span className="inline-block rounded-lg bg-red-100 px-3 py-1 text-lg font-bold text-red-700">
                                                    {crew.founded}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{crew.name}</h3>
                                            <span className="inline-block rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 mb-2">
                                                {crew.style}
                                            </span>
                                            <p className="text-gray-700 mb-2">{crew.description}</p>
                                            {crew.connectionToLokka && (
                                                <p className="text-sm text-red-600 italic">{crew.connectionToLokka}</p>
                                            )}
                                            {crew.website && (
                                                <a
                                                    href={crew.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-2 inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                                                >
                                                    Nettside
                                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Hendelser */}
            <section className="bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Hendelser
                        </motion.h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {data.events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-5"
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        {event.year && (
                                            <span className="flex-shrink-0 rounded bg-red-600 px-2 py-1 text-sm font-bold text-white">
                                                {event.year}
                                            </span>
                                        )}
                                        <span className="inline-block rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                                            {event.type}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">{event.name}</h3>
                                    {event.location && (
                                        <p className="text-sm text-gray-500 mb-2">{event.location}</p>
                                    )}
                                    <p className="text-sm text-gray-700">{event.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
