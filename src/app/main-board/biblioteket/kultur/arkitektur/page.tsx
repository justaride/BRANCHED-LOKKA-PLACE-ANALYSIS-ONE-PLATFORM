'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getArkitekturData } from '@/lib/loaders/biblioteket-loader';
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

function getHeritageColor(type: string): { bg: string; text: string } {
    switch (type) {
        case 'fredning':
            return { bg: 'bg-red-100', text: 'text-red-700' };
        case 'vern':
            return { bg: 'bg-amber-100', text: 'text-amber-700' };
        case 'regulering':
            return { bg: 'bg-blue-100', text: 'text-blue-700' };
        default:
            return { bg: 'bg-gray-100', text: 'text-gray-700' };
    }
}

export default function ArkitekturPage() {
    const data = getArkitekturData();

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 bg-gradient-to-br from-stone-800 via-amber-900 to-stone-900 text-white">
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
                            Arkitektur
                        </motion.div>
                        <motion.h1
                            variants={heroItemVariants}
                            className="mb-6 text-4xl md:text-5xl font-bold leading-tight"
                        >
                            {data.title}
                        </motion.h1>
                        {data.subtitle && (
                            <motion.p
                                variants={heroItemVariants}
                                className="mb-4 text-xl text-white/80 font-medium"
                            >
                                {data.subtitle}
                            </motion.p>
                        )}
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
                            <div className="text-3xl font-bold text-amber-600">{data.buildingStyles.length}</div>
                            <div className="text-sm text-gray-500">Bygningsstiler</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{data.iconicBuildings.length}</div>
                            <div className="text-sm text-gray-500">Ikoniske bygg</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{data.parks.length}</div>
                            <div className="text-sm text-gray-500">Parker og byrom</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{data.architects.length}</div>
                            <div className="text-sm text-gray-500">Arkitekter</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Building Styles */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Bygningsstiler
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-10 text-gray-600">
                            Fra murgårdenes nyklassisisme til Vulkans energipositive arkitektur.
                        </motion.p>
                        <div className="space-y-10">
                            {data.buildingStyles.map((style) => (
                                <motion.div
                                    key={style.id}
                                    variants={cardVariants}
                                    className="rounded-xl border border-gray-200 bg-white p-6 md:p-8"
                                >
                                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">{style.name}</h3>
                                        <span className="inline-block rounded-full bg-amber-100 px-3 py-0.5 text-sm font-medium text-amber-700">
                                            {style.period}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mb-5 leading-relaxed">{style.description}</p>

                                    <div className="mb-5">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Kjennetegn:</span>
                                        <ul className="mt-2 space-y-1">
                                            {style.characteristics.map((char) => (
                                                <li key={char} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <span className="text-amber-600 mt-1">&#8226;</span>
                                                    {char}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {style.notableExamples.length > 0 && (
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Eksempler:</span>
                                            <div className="mt-2 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                                {style.notableExamples.map((example) => (
                                                    <div key={example.address} className="rounded-lg bg-stone-50 border border-stone-200 p-4">
                                                        <div className="flex items-start justify-between gap-2 mb-1">
                                                            <p className="text-sm font-medium text-gray-900">{example.address}</p>
                                                            <span className="shrink-0 rounded bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-700">
                                                                {example.yearBuilt}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{example.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Byfornyelsen (Urban Renewal) */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.div variants={fadeUpVariants} className="mb-3 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
                            Den sentrale fortellingen
                        </motion.div>
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-3xl font-bold text-gray-900">
                            Byfornyelsen
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-10 text-lg text-gray-700 leading-relaxed max-w-3xl">
                            {data.urbanRenewal.intro}
                        </motion.p>

                        {/* Timeline */}
                        <div className="relative mb-16">
                            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-amber-200" />
                            <div className="space-y-8">
                                {data.urbanRenewal.timeline.map((event, index) => (
                                    <motion.div
                                        key={`${event.year}-${event.title}`}
                                        variants={cardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={viewport.default}
                                        className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-4 md:gap-8`}
                                    >
                                        {/* Year marker */}
                                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-sm z-10" />

                                        {/* Content */}
                                        <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                            <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 mb-1">
                                                {event.year}
                                            </span>
                                            <h4 className="text-base font-bold text-gray-900 mb-1">{event.title}</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
                                            {event.significance && (
                                                <p className="mt-2 text-sm text-amber-700 italic font-medium">{event.significance}</p>
                                            )}
                                        </div>

                                        {/* Spacer for opposite side */}
                                        <div className="hidden md:block md:w-1/2" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Key Events */}
                        <motion.h3
                            variants={fadeUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport.default}
                            className="mb-6 text-xl font-bold text-gray-900"
                        >
                            Vendepunkter
                        </motion.h3>
                        <div className="grid gap-6 md:grid-cols-3">
                            {data.urbanRenewal.keyEvents.map((event) => (
                                <motion.div
                                    key={`key-${event.year}-${event.title}`}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewport.default}
                                    className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6"
                                >
                                    <span className="inline-block rounded-full bg-amber-600 px-3 py-1 text-sm font-bold text-white mb-3">
                                        {event.year}
                                    </span>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h4>
                                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">{event.description}</p>
                                    <p className="text-sm text-amber-800 italic font-medium border-l-2 border-amber-400 pl-3">
                                        {event.significance}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Iconic Buildings */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Ikoniske Bygg
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                            Bygninger som definerer bydelens karakter gjennom 160 ar.
                        </motion.p>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {data.iconicBuildings.map((building) => (
                                <motion.div
                                    key={building.name}
                                    variants={cardVariants}
                                    className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{building.name}</h3>
                                        <span className="shrink-0 rounded bg-stone-200 px-2 py-0.5 text-xs font-bold text-stone-700">
                                            {building.yearBuilt}
                                        </span>
                                    </div>
                                    <p className="text-sm text-amber-600 font-medium mb-1">{building.architect}</p>
                                    <p className="text-xs text-gray-500 mb-2">{building.address}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        <span className="inline-block rounded bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
                                            {building.style}
                                        </span>
                                        {building.heritageStatus && (
                                            <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                                                {building.heritageStatus.length > 50
                                                    ? building.heritageStatus.substring(0, 50) + '...'
                                                    : building.heritageStatus}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2 leading-relaxed flex-1">{building.description}</p>
                                    <p className="text-xs text-gray-500 mb-2">
                                        <span className="font-medium">Bruk i dag:</span> {building.currentUse}
                                    </p>
                                    <p className="text-sm text-amber-600 italic">{building.significance}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Parks */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Parker og Byrom
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                            Grunnlokkas gronne lunger og sosiale moteplasser.
                        </motion.p>
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.parks.map((park) => (
                                <motion.div
                                    key={park.name}
                                    variants={cardVariants}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-6"
                                >
                                    <div className="flex items-baseline justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{park.name}</h3>
                                        <span className="text-sm font-medium text-amber-600">Est. {park.established}</span>
                                    </div>
                                    {park.area && (
                                        <p className="text-xs text-gray-500 mb-3">{park.area}</p>
                                    )}
                                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">{park.description}</p>
                                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{park.history}</p>
                                    <p className="text-xs text-gray-500 mb-2">
                                        <span className="font-medium">Bruk i dag:</span> {park.currentUse}
                                    </p>
                                    <p className="text-sm text-amber-600 italic">{park.culturalSignificance}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Architects */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Arkitekter
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                            Menneskene som formet Grunnerlokkas fysiske miljoe.
                        </motion.p>
                        <div className="space-y-6">
                            {data.architects.map((architect) => (
                                <motion.div
                                    key={architect.name}
                                    variants={cardVariants}
                                    className="rounded-xl border border-gray-200 bg-white p-6"
                                >
                                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{architect.name}</h3>
                                        <span className="text-sm text-amber-600 font-medium">{architect.period}</span>
                                    </div>
                                    <p className="text-gray-700 mb-4 leading-relaxed">{architect.description}</p>
                                    <div>
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Verk:</span>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {architect.works.map((work) => (
                                                <span key={work} className="inline-block rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700">
                                                    {work}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Heritage Status */}
            <section className="bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Kulturminnestatus
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                            Vern og fredning som sikrer bydelens historiske verdier.
                        </motion.p>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {data.heritageStatus.map((item) => {
                                const colors = getHeritageColor(item.type);
                                return (
                                    <motion.div
                                        key={item.name}
                                        variants={cardVariants}
                                        className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                    >
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                                            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors.bg} ${colors.text}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        <span className="inline-block rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600 mb-3">
                                            {item.authority}
                                        </span>
                                        <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
