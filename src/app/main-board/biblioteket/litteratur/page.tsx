'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getLitteratur, getLitteraturTopics, getLitteraturTypes } from '@/lib/loaders/biblioteket-loader';
import ImageCarousel from '@/components/biblioteket/ImageCarousel';
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

const typeLabels: Record<string, string> = {
    book: 'Bok',
    article: 'Artikkel',
    thesis: 'Avhandling',
    report: 'Rapport',
    chapter: 'Kapittel',
    booklet: 'Hefte',
    reference: 'Oppslagsverk',
    fiction: 'Skjønnlitteratur',
    poetry: 'Poesi',
};

const typeColors: Record<string, string> = {
    book: 'bg-blue-100 text-blue-700',
    article: 'bg-green-100 text-green-700',
    thesis: 'bg-purple-100 text-purple-700',
    report: 'bg-amber-100 text-amber-700',
    chapter: 'bg-pink-100 text-pink-700',
    booklet: 'bg-cyan-100 text-cyan-700',
    reference: 'bg-gray-100 text-gray-700',
    fiction: 'bg-rose-100 text-rose-700',
    poetry: 'bg-indigo-100 text-indigo-700',
};

export default function LitteraturPage() {
    const works = getLitteratur();
    const topics = getLitteraturTopics();
    const types = getLitteraturTypes();

    const sortedWorks = [...works].sort((a, b) => b.year - a.year);

    const decades = new Map<string, typeof works>();
    sortedWorks.forEach((work) => {
        const decade = Math.floor(work.year / 10) * 10;
        const key = `${decade}-tallet`;
        if (!decades.has(key)) {
            decades.set(key, []);
        }
        decades.get(key)!.push(work);
    });

    const typeCounts = types.map((type) => ({
        type,
        count: works.filter((w) => w.type === type).length,
    })).sort((a, b) => b.count - a.count);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                <Image
                    src="/images/biblioteket/litteratur-banner-hero.jpeg"
                    alt="Litteratur om Grünerløkka"
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
                            Litteratur
                        </motion.div>
                        <motion.h1
                            variants={heroItemVariants}
                            className="mb-6 text-4xl md:text-5xl font-bold leading-tight"
                        >
                            Litteratur om Grünerløkka
                        </motion.h1>
                        <motion.p
                            variants={heroItemVariants}
                            className="mb-8 text-lg md:text-xl text-white/90 leading-relaxed"
                        >
                            En omfattende samling av bøker, artikler, avhandlinger og rapporter
                            som dokumenterer Grünerløkkas historie, byutvikling og kulturliv.
                        </motion.p>
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
                            { value: works.length, label: 'Verk totalt' },
                            { value: `${Math.min(...works.map((w) => w.year))}–${Math.max(...works.map((w) => w.year))}`, label: 'Tidsperiode' },
                            { value: types.length, label: 'Verkstyper' },
                            { value: topics.length, label: 'Emner' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                variants={statsVariants}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-category-litteratur">{stat.value}</div>
                                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
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
                                En litterær reise gjennom Løkka
                            </h2>
                            <div className="prose prose-lg text-gray-600 space-y-4">
                                <p className="leading-relaxed">
                                    Litteratur om Grünerløkka er en rikholdig samling som speiler bydelens dramatiske forvandling gjennom over hundre år.
                                </p>
                                <p className="leading-relaxed">
                                    Samlingen omfatter alt fra historiske oppslagsverk og akademiske avhandlinger til levende kulturrapporter om saneringsstriden på 70-tallet.
                                </p>
                                <p className="leading-relaxed">
                                    Det er en historie om motstand, fellesskap og kjærlighet til en av Oslos mest ikoniske bydeler.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeUpVariants}>
                            <ImageCarousel />
                            <p className="mt-3 text-center text-sm text-gray-500 italic">
                                Historiske glimt fra Grünerløkka gjennom tidene
                            </p>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* Main Content */}
            <Container className="py-16">
                <div className="grid gap-12 lg:grid-cols-4">
                    {/* Sidebar */}
                    <motion.div
                        className="lg:col-span-1 space-y-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        {/* Types */}
                        <motion.section
                            variants={cardVariants}
                            className="rounded-xl border border-gray-200 bg-white p-6"
                        >
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Verkstyper</h3>
                            <ul className="space-y-2">
                                {typeCounts.map(({ type, count }) => (
                                    <li key={type} className="flex items-center justify-between">
                                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeColors[type] || 'bg-gray-100 text-gray-700'}`}>
                                            {typeLabels[type] || type}
                                        </span>
                                        <span className="text-sm text-category-litteratur font-medium">{count}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Topics */}
                        <motion.section
                            variants={cardVariants}
                            className="rounded-xl border border-gray-200 bg-white p-6"
                        >
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Emner</h3>
                            <div className="flex flex-wrap gap-2">
                                {topics.slice(0, 20).map((topic) => (
                                    <span
                                        key={topic}
                                        className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </motion.section>
                    </motion.div>

                    {/* Works by Decade */}
                    <div className="lg:col-span-3 space-y-12">
                        {Array.from(decades.entries()).map(([decade, decadeWorks]) => (
                            <motion.section
                                key={decade}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport.default}
                                variants={containerVariants}
                            >
                                <motion.h2
                                    variants={fadeUpVariants}
                                    className="mb-6 text-2xl font-bold text-gray-900 flex items-center gap-3"
                                >
                                    {decade}
                                    <span className="text-sm font-normal text-gray-500">
                                        ({decadeWorks.length} verk)
                                    </span>
                                </motion.h2>
                                <div className="space-y-4">
                                    {decadeWorks.map((work, workIndex) => (
                                        <motion.div
                                            key={work.id}
                                            variants={cardVariants}
                                            custom={workIndex}
                                            whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                                            className="rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-category-litteratur/30"
                                        >
                                            <div className="flex flex-wrap items-start gap-3 mb-3">
                                                <span className="text-lg font-bold text-category-litteratur">{work.year}</span>
                                                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeColors[work.type] || 'bg-gray-100 text-gray-700'}`}>
                                                    {typeLabels[work.type] || work.type}
                                                </span>
                                            </div>
                                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                {work.title}
                                            </h3>
                                            <p className="mb-3 text-sm text-gray-600">
                                                {work.authors.join(', ')}
                                            </p>
                                            {work.note && (
                                                <p className="text-sm text-gray-500 italic leading-relaxed">
                                                    {work.note}
                                                </p>
                                            )}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {work.topics.map((topic) => (
                                                    <span
                                                        key={topic}
                                                        className="inline-block rounded-full bg-category-litteratur/10 px-2 py-0.5 text-xs text-category-litteratur"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
}
