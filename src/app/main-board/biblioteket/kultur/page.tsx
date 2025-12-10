'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getKulturTimeline, getKulturIndexes, getKulturMasterText } from '@/lib/loaders/biblioteket-loader';
import ImageCarousel from '@/components/biblioteket/ImageCarousel';
import { biblioteketCarouselImages } from '@/lib/constants/carousel-images';
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

const categoryColors: Record<string, string> = {
    kunst: 'bg-purple-100 text-purple-700',
    musikk: 'bg-pink-100 text-pink-700',
    scenekunst: 'bg-violet-100 text-violet-700',
    film: 'bg-blue-100 text-blue-700',
    historie: 'bg-amber-100 text-amber-700',
    subkultur: 'bg-red-100 text-red-700',
    festival: 'bg-green-100 text-green-700',
    publikasjon: 'bg-cyan-100 text-cyan-700',
    kulturpolitikk: 'bg-orange-100 text-orange-700',
    byutvikling: 'bg-emerald-100 text-emerald-700',
    ungdom: 'bg-yellow-100 text-yellow-700',
    fotografi: 'bg-slate-100 text-slate-700',
};

export default function KulturPage() {
    const timeline = getKulturTimeline();
    const indexes = getKulturIndexes();
    const masterText = getKulturMasterText();

    const paragraphs = masterText.split('\n\n');

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                <Image
                    src="/images/biblioteket/kultur-banner-hero.jpg"
                    alt="Kunst og kultur på Grünerløkka"
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
                            Kunst og Kultur
                        </motion.div>
                        <motion.h1
                            variants={heroItemVariants}
                            className="mb-6 text-4xl md:text-5xl font-bold leading-tight"
                        >
                            Kunst, kultur og musikk
                        </motion.h1>
                        <motion.p
                            variants={heroItemVariants}
                            className="text-lg md:text-xl text-white/90 leading-relaxed"
                        >
                            Grünerløkka – Norges mest konsentrerte musikk- og kulturøkosystem.
                            Fra Edvard Munchs barndom til dagens levende scener, atelierer og gallerier.
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
                            { value: timeline.length, label: 'Epoker' },
                            { value: indexes.venues_and_institutions.length, label: 'Scener & institusjoner' },
                            { value: indexes.people.length, label: 'Kunstnere & musikere' },
                            { value: indexes.festivals_and_series.length, label: 'Festivaler' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                variants={statsVariants}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-category-kultur">{stat.value}</div>
                                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Main Text with Carousel */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        className="grid gap-12 lg:grid-cols-2 items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.div variants={fadeUpVariants}>
                            <h2 className="mb-8 text-2xl md:text-3xl font-bold text-gray-900">Om kulturlivet på Grünerløkka</h2>
                            <div className="prose prose-lg prose-gray space-y-6">
                                {paragraphs.slice(0, 3).map((p, i) => (
                                    <p key={i} className="text-gray-700 leading-relaxed">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={fadeUpVariants}>
                            <ImageCarousel images={biblioteketCarouselImages} />
                            <p className="mt-3 text-center text-sm text-gray-500 italic">
                                Kulturelle øyeblikk fra bydelen
                            </p>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* Timeline */}
            <Container className="py-16">
                <div>
                    <h2 className="mb-8 text-2xl font-bold text-gray-900">
                        Kulturhistorisk tidslinje
                    </h2>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-category-kultur/20" />

                        <div className="space-y-8">
                            {timeline.map((event, index) => (
                                <motion.div
                                    key={index}
                                    className="relative flex gap-4 md:gap-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {/* Period marker */}
                                    <div className="flex-shrink-0 w-28 md:w-36 relative">
                                        <motion.div
                                            className="absolute right-0 top-2 w-3 h-3 rounded-full bg-category-kultur border-4 border-category-kultur/20"
                                            whileInView={{ scale: [0.5, 1.2, 1] }}
                                            transition={{ duration: 0.4, delay: index * 0.03 }}
                                        />
                                        <span className="text-sm font-bold text-category-kultur pr-4">
                                            {event.period}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <motion.div
                                        className="flex-1 rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-category-kultur/30"
                                        whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                                    >
                                        <p className="mb-4 text-gray-700 leading-relaxed">
                                            {event.event}
                                        </p>

                                        {/* Names */}
                                        {event.names.length > 0 && (
                                            <div className="mb-3">
                                                <span className="text-xs font-medium text-gray-500 uppercase">Navn:</span>
                                                <div className="mt-1 flex flex-wrap gap-2">
                                                    {event.names.map((name) => (
                                                        <span
                                                            key={name}
                                                            className="inline-block rounded bg-category-kultur/10 px-2 py-0.5 text-sm text-category-kultur"
                                                        >
                                                            {name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Places */}
                                        {event.places.length > 0 && (
                                            <div className="mb-3">
                                                <span className="text-xs font-medium text-gray-500 uppercase">Steder:</span>
                                                <div className="mt-1 flex flex-wrap gap-2">
                                                    {event.places.map((place) => (
                                                        <span
                                                            key={place}
                                                            className="inline-block rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-600"
                                                        >
                                                            {place}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Categories */}
                                        <div className="flex flex-wrap gap-2">
                                            {event.categories.map((cat) => (
                                                <span
                                                    key={cat}
                                                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[cat] || 'bg-gray-100 text-gray-600'}`}
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            {/* Indexes */}
            <section className="border-t border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={fadeUpVariants}
                            className="mb-8 text-2xl font-bold text-gray-900"
                        >
                            Indekser
                        </motion.h2>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: 'Scener og institusjoner', data: indexes.venues_and_institutions, limit: 30 },
                                { title: 'Kunstnere og musikere', data: indexes.people, limit: 30 },
                                { title: 'Band og grupper', data: indexes.groups_and_bands, limit: 30 },
                                { title: 'Festivaler og serier', data: indexes.festivals_and_series, limit: 30 },
                                { title: 'Verk og publikasjoner', data: indexes.works_and_publications, limit: 20 },
                                { title: 'Steder', data: indexes.geographical_places, limit: 20 },
                            ].map((section, index) => (
                                <motion.div
                                    key={section.title}
                                    variants={cardVariants}
                                    custom={index}
                                    whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
                                    className="rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-category-kultur/20"
                                >
                                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                                        {section.title}
                                    </h3>
                                    <p className="mb-4 text-sm text-category-kultur font-medium">{section.data.length} {section.title.toLowerCase().includes('steder') ? 'lokasjoner' : 'elementer'}</p>
                                    <div className="max-h-64 overflow-y-auto space-y-1">
                                        {section.data.slice(0, section.limit).map((item) => (
                                            <p key={item} className="text-sm text-gray-700">
                                                {item}
                                            </p>
                                        ))}
                                        {section.data.length > section.limit && (
                                            <p className="text-sm text-gray-400 italic">+ {section.data.length - section.limit} flere...</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
