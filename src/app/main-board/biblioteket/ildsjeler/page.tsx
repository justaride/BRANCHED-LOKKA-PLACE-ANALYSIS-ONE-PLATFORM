'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getIldsjeler, getIldsjelKategorier, getIldsjelTidslinje } from '@/lib/loaders/biblioteket-loader';
import ImageCarousel from '@/components/biblioteket/ImageCarousel';
import { ildsjelerCarouselImages } from '@/lib/constants/carousel-images';
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

const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: springs.bouncy,
    },
};

export default function IldsjelerPage() {
    const ildsjeler = getIldsjeler();
    const kategorier = getIldsjelKategorier();
    const tidslinje = getIldsjelTidslinje();

    const livingIldsjeler = ildsjeler.filter((i) => i.isLiving === true);
    const historicalIldsjeler = ildsjeler.filter((i) => i.isLiving === false || i.isLiving === null);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                <Image
                    src="/images/biblioteket/ildsjeler-banner-hero.jpg"
                    alt="Løkkas Ildsjeler"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                <Container className="relative z-10">
                    <motion.div
                        className="max-w-3xl"
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={heroItemVariants}>
                            <Link
                                href="/main-board/biblioteket"
                                className="mb-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group"
                            >
                                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Tilbake til biblioteket
                            </Link>
                        </motion.div>
                        <motion.div
                            variants={heroItemVariants}
                            className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm border border-white/10"
                        >
                            Ildsjeler
                        </motion.div>
                        <motion.h1
                            variants={heroItemVariants}
                            className="mb-6 text-4xl md:text-5xl font-bold leading-tight"
                        >
                            Løkkas Ildsjeler
                        </motion.h1>
                        <motion.p
                            variants={heroItemVariants}
                            className="mb-8 text-lg md:text-xl text-white/90 leading-relaxed"
                        >
                            Møt de lokale heltene som har formet Grünerløkka – fra pionerer i utdanning og likestilling
                            til kulturentreprenører og idrettsfrivillige.
                        </motion.p>
                    </motion.div>
                </Container>
            </section>

            {/* Intro Section with Carousel */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        className="grid gap-12 lg:grid-cols-2 items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.div className="space-y-6" variants={fadeUpVariants}>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Menneskene som bygget Løkka
                            </h2>
                            <div className="prose prose-lg text-gray-600">
                                <p>
                                    Grünerløkkas historie er ikke bare murstein og asfalt – det er historien om menneskene som har bodd her, kjempet for bydelen sin, og skapt det unike fellesskapet vi kjenner i dag.
                                </p>
                                <p>
                                    Fra fabrikkarbeiderne som organiserte seg for bedre kår på 1800-tallet, til aksjonistene som stoppet rivingen på 70-tallet, og dagens kulturentreprenører. Ildsjeler har alltid vært drivkraften i bydelens utvikling.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeUpVariants}>
                            <ImageCarousel images={ildsjelerCarouselImages} />
                            <p className="mt-3 text-center text-sm text-gray-500 italic">
                                Engasjement og fellesskap gjennom tidene
                            </p>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* Stats Section */}
            <section className="border-b border-gray-200 bg-white py-10">
                <Container>
                    <motion.div
                        className="flex flex-wrap gap-8 md:gap-12 justify-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                    >
                        {[
                            { value: ildsjeler.length, label: 'Ildsjeler' },
                            { value: kategorier.length, label: 'Kategorier' },
                            { value: tidslinje.length, label: 'Historiske hendelser' },
                            { value: '1854–i dag', label: 'Tidsperiode' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                variants={statsVariants}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-category-ildsjeler">{stat.value}</div>
                                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Main Content */}
            <Container className="py-16">
                {/* Living Ildsjeler */}
                {livingIldsjeler.length > 0 && (
                    <motion.section
                        className="mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={fadeUpVariants}
                            className="mb-8 text-2xl font-bold text-gray-900 flex items-center gap-2"
                        >
                            <span className="text-green-500">●</span> Aktive Ildsjeler i dag
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {livingIldsjeler.map((ildsjel, index) => (
                                <motion.div
                                    key={ildsjel.id}
                                    variants={cardVariants}
                                    custom={index}
                                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
                                    transition={springs.snappy}
                                >
                                    <Link
                                        href={`/main-board/biblioteket/ildsjeler/${ildsjel.id}`}
                                        className="group block rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-category-ildsjeler/30"
                                    >
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-category-ildsjeler transition-colors">
                                                {ildsjel.name}
                                            </h3>
                                            {ildsjel.birthYear && (
                                                <p className="text-sm text-gray-500">
                                                    f. {ildsjel.birthYear}
                                                    {ildsjel.mainPeriod.from && ` · Aktiv fra ${ildsjel.mainPeriod.from}`}
                                                </p>
                                            )}
                                        </div>
                                        <p className="mb-4 text-gray-600 line-clamp-3 leading-relaxed">
                                            {ildsjel.summary}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {ildsjel.categories.slice(0, 2).map((cat) => {
                                                const kategori = kategorier.find((k) => k.id === cat);
                                                return (
                                                    <span
                                                        key={cat}
                                                        className="inline-block rounded-full bg-category-ildsjeler/10 px-3 py-1 text-xs font-medium text-category-ildsjeler"
                                                    >
                                                        {kategori?.name || cat}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Historical Ildsjeler */}
                {historicalIldsjeler.length > 0 && (
                    <motion.section
                        className="mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={fadeUpVariants}
                            className="mb-8 text-2xl font-bold text-gray-900 flex items-center gap-2"
                        >
                            <span className="text-gray-400">●</span> Historiske Ildsjeler
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {historicalIldsjeler.map((ildsjel, index) => (
                                <motion.div
                                    key={ildsjel.id}
                                    variants={cardVariants}
                                    custom={index}
                                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
                                    transition={springs.snappy}
                                >
                                    <Link
                                        href={`/main-board/biblioteket/ildsjeler/${ildsjel.id}`}
                                        className="group block rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-category-ildsjeler/30"
                                    >
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-category-ildsjeler transition-colors">
                                                {ildsjel.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {ildsjel.birthYear && ildsjel.deathYear
                                                    ? `${ildsjel.birthYear}–${ildsjel.deathYear}`
                                                    : ildsjel.mainPeriod.from && ildsjel.mainPeriod.to
                                                        ? `Aktiv ${ildsjel.mainPeriod.from}–${ildsjel.mainPeriod.to}`
                                                        : ildsjel.mainPeriod.from
                                                            ? `Aktiv fra ${ildsjel.mainPeriod.from}`
                                                            : ''}
                                            </p>
                                        </div>
                                        <p className="mb-4 text-gray-600 line-clamp-3 leading-relaxed">
                                            {ildsjel.summary}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {ildsjel.categories.slice(0, 2).map((cat) => {
                                                const kategori = kategorier.find((k) => k.id === cat);
                                                return (
                                                    <span
                                                        key={cat}
                                                        className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                                                    >
                                                        {kategori?.name || cat}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Categories */}
                <motion.section
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport.default}
                    variants={containerVariants}
                >
                    <motion.h2
                        variants={fadeUpVariants}
                        className="mb-8 text-2xl font-bold text-gray-900"
                    >
                        Kategorier
                    </motion.h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {kategorier.map((kategori, index) => {
                            const count = ildsjeler.filter((i) => i.categories.includes(kategori.id)).length;
                            return (
                                <motion.div
                                    key={kategori.id}
                                    variants={cardVariants}
                                    custom={index}
                                    whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                                    className="rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-category-ildsjeler/20"
                                >
                                    <h3 className="font-semibold text-gray-900">{kategori.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">{kategori.description}</p>
                                    <p className="mt-3 text-xs font-medium text-category-ildsjeler">
                                        {count} {count === 1 ? 'ildsjel' : 'ildsjeler'}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Timeline */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport.default}
                    variants={containerVariants}
                >
                    <motion.h2
                        variants={fadeUpVariants}
                        className="mb-8 text-2xl font-bold text-gray-900"
                    >
                        Tidslinje
                    </motion.h2>
                    <div className="space-y-4">
                        {tidslinje.sort((a, b) => a.year - b.year).map((event, index) => (
                            <motion.div
                                key={event.id}
                                variants={cardVariants}
                                custom={index}
                                whileHover={{ x: 4 }}
                                className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-category-ildsjeler/20"
                            >
                                <div className="flex-shrink-0 w-16 text-center">
                                    <span className="text-2xl font-bold text-category-ildsjeler">{event.year}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{event.description}</p>
                                    {event.ildsjelIds.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {event.ildsjelIds.map((id) => {
                                                const ildsjel = ildsjeler.find((i) => i.id === id);
                                                return ildsjel ? (
                                                    <Link
                                                        key={id}
                                                        href={`/main-board/biblioteket/ildsjeler/${id}`}
                                                        className="text-xs text-category-ildsjeler hover:underline font-medium"
                                                    >
                                                        {ildsjel.name}
                                                    </Link>
                                                ) : null;
                                            })}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </Container>
        </>
    );
}
