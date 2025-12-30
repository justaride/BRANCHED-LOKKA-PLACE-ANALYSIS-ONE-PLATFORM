'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getHistorieTimeline, getHistorieEvents, getHistorieSections, getHistorieTags, getHistorieEntities } from '@/lib/loaders/biblioteket-loader';
import ImageCarousel from '@/components/biblioteket/ImageCarousel';
import { translateHistorieText } from '@/lib/translate-historie';
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

const sectionLabels: Record<string, string> = {
    '19th_century_origins_industry_and_expansion': '1800-tallet: Opprinnelse og industri',
    'early_20th_century_the_working_class_community': 'Tidlig 1900-tall: Arbeidersamfunnet',
    'world_war_ii_and_postwar_challenges': 'Krig og etterkrigstid',
    'byfornyelse_and_gentrification_1970s_2000s': 'Byfornyelse og gentrifisering',
    'modern_era_2010_2024': '2010-tallet: Moderne Løkka',
    'conclusion_continuity_and_change_in_a_city_district': 'Kontinuitet og endring',
};

const tagColors: Record<string, string> = {
    industry: 'bg-amber-100 text-amber-700',
    urban_expansion: 'bg-blue-100 text-blue-700',
    housing: 'bg-green-100 text-green-700',
    clearance: 'bg-red-100 text-red-700',
    byfornyelse: 'bg-purple-100 text-purple-700',
    gentrification: 'bg-pink-100 text-pink-700',
    heritage_preservation: 'bg-emerald-100 text-emerald-700',
    culture: 'bg-violet-100 text-violet-700',
    working_class: 'bg-orange-100 text-orange-700',
    grassroots: 'bg-cyan-100 text-cyan-700',
};

const tagTranslations: Record<string, string> = {
    industry: 'Industri',
    urban_expansion: 'Byekspansjon',
    housing: 'Bolig',
    clearance: 'Sanering',
    byfornyelse: 'Byfornyelse',
    gentrification: 'Gentrifisering',
    heritage_preservation: 'Verneplaner',
    culture: 'Kultur',
    working_class: 'Arbeiderklasse',
    grassroots: 'Grasrotbevegelse',
    architecture: 'Arkitektur',
    infrastructure: 'Infrastruktur',
    protest: 'Protest',
    activism: 'Aktivisme',
    unemployment: 'Arbeidsløshet',
    renovation: 'Renovering',
    commerce: 'Handel',
    education: 'Utdanning',
    health: 'Helse',
    war: 'Krig',
    occupation: 'Okkupasjon',
    resistance: 'Motstand',
};

export default function HistoriePage() {
    const timeline = getHistorieTimeline();
    const events = getHistorieEvents();
    const sections = getHistorieSections();
    const tags = getHistorieTags();
    const entities = getHistorieEntities();

    const sortedEvents = [...events].sort((a, b) => a.start_year - b.start_year);

    const eventsBySection = new Map<string, typeof events>();
    sections.forEach((section) => {
        eventsBySection.set(
            section,
            sortedEvents.filter((e) => e.section_id === section)
        );
    });

    const entityTypes = entities.reduce((acc, e) => {
        acc[e.type] = (acc[e.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                <Image
                    src="/images/biblioteket/byhistorie-banner-hero.jpg"
                    alt="Grünerløkkas byhistorie"
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
                            Byhistorie
                        </motion.div>
                        <motion.h1
                            variants={heroItemVariants}
                            className="mb-6 text-4xl md:text-5xl font-bold leading-tight"
                        >
                            Grünerløkkas Byhistorie
                        </motion.h1>
                        <motion.p
                            variants={heroItemVariants}
                            className="mb-4 text-lg md:text-xl text-white/90"
                        >
                            {timeline.place.name}, {timeline.place.city}
                        </motion.p>
                        <motion.p
                            variants={heroItemVariants}
                            className="text-base md:text-lg text-white/80 leading-relaxed"
                        >
                            Fra fabrikkbelte til kulturbydel – {timeline.time_span.end_year - timeline.time_span.start_year} år
                            med byutvikling fra {timeline.time_span.start_year} til {timeline.time_span.end_year}-tallet.
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
                            { value: events.length, label: 'Historiske hendelser' },
                            { value: sections.length, label: 'Epoker' },
                            { value: entities.length, label: 'Personer & steder' },
                            { value: tags.length, label: 'Temaer' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                variants={statsVariants}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-category-historie">{stat.value}</div>
                                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Introduction Section with Image Carousel */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        className="grid gap-12 lg:grid-cols-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.div variants={fadeUpVariants}>
                            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm md:p-10">
                                <h2 className="mb-6 text-2xl md:text-3xl font-bold text-gray-900">
                                    Om Grünerløkkas Utvikling
                                </h2>
                                <div className="prose prose-lg max-w-none space-y-4">
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Fra åker til fabrikk, fra slum til kulturbydel – Grünerløkka har gjennomgått en enestående transformasjon gjennom mer enn 170 år.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        På 1850-tallet var området fortsatt preget av jordbruk og spredt bebyggelse. Med industrialiseringen vokste det raskt fram en tett arbeiderbydel rundt tekstilfabrikker og verksteder.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Gjennom 1900-tallet ble Grünerløkka både et senter for arbeiderorganisering og politisk aktivisme, men også et område preget av sosiale utfordringer.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Fra 1990-tallet tok gentrifiseringen til, og bydelen ble gradvis omdannet til et av Oslos mest populære og livlige strøk.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div className="flex items-center" variants={fadeUpVariants}>
                            <ImageCarousel images={biblioteketCarouselImages} />
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
                        {/* Sections Navigation */}
                        <motion.section
                            variants={cardVariants}
                            className="rounded-xl border border-gray-200 bg-white p-6"
                        >
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Epoker</h3>
                            <ul className="space-y-2">
                                {sections.map((section) => (
                                    <li key={section}>
                                        <a
                                            href={`#${section}`}
                                            className="block text-sm text-gray-600 hover:text-category-historie transition-colors"
                                        >
                                            {sectionLabels[section] || section}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Tags */}
                        <motion.section
                            variants={cardVariants}
                            className="rounded-xl border border-gray-200 bg-white p-6"
                        >
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Temaer</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.slice(0, 15).map((tag) => (
                                    <span
                                        key={tag}
                                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${tagColors[tag] || 'bg-gray-100 text-gray-700'}`}
                                    >
                                        {tagTranslations[tag] || tag.replace(/_/g, ' ')}
                                    </span>
                                ))}
                            </div>
                        </motion.section>

                        {/* Entity Types */}
                        <motion.section
                            variants={cardVariants}
                            className="rounded-xl border border-gray-200 bg-white p-6"
                        >
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Aktører</h3>
                            <ul className="space-y-2">
                                {Object.entries(entityTypes).map(([type, count]) => (
                                    <li key={type} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 capitalize">
                                            {type === 'person' ? 'Personer' : type === 'organisation' ? 'Organisasjoner' : type === 'place' ? 'Steder' : type}
                                        </span>
                                        <span className="font-medium text-category-historie">{count}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>
                    </motion.div>

                    {/* Timeline by Section */}
                    <div className="lg:col-span-3 space-y-16">
                        {sections.map((section) => {
                            const sectionEvents = eventsBySection.get(section) || [];
                            if (sectionEvents.length === 0) return null;

                            return (
                                <motion.section
                                    key={section}
                                    id={section}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewport.default}
                                    variants={containerVariants}
                                >
                                    <motion.h2
                                        variants={fadeUpVariants}
                                        className="mb-8 text-2xl font-bold text-gray-900 pb-4 border-b border-gray-200"
                                    >
                                        {sectionLabels[section] || section}
                                    </motion.h2>
                                    <div className="relative">
                                        {/* Timeline line */}
                                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-category-historie/20" />

                                        <div className="space-y-6">
                                            {sectionEvents.map((event, eventIndex) => (
                                                <motion.div
                                                    key={event.id}
                                                    className="relative flex gap-6"
                                                    variants={cardVariants}
                                                    custom={eventIndex}
                                                >
                                                    {/* Year marker */}
                                                    <div className="flex-shrink-0 w-16 relative">
                                                        <motion.div
                                                            className="absolute right-0 top-1 w-4 h-4 rounded-full bg-category-historie border-4 border-category-historie/20"
                                                            whileInView={{ scale: [0.5, 1.2, 1] }}
                                                            transition={{ duration: 0.4, delay: eventIndex * 0.05 }}
                                                        />
                                                        <span className="text-sm font-bold text-category-historie">
                                                            {event.start_year}
                                                            {event.end_year !== event.start_year && (
                                                                <span className="text-gray-400">–{event.end_year}</span>
                                                            )}
                                                        </span>
                                                    </div>

                                                    {/* Content */}
                                                    <motion.div
                                                        className="flex-1 rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-category-historie/30"
                                                        whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                                                    >
                                                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                            {translateHistorieText(event.label)}
                                                        </h3>
                                                        <p className="mb-4 text-gray-600 leading-relaxed">
                                                            {translateHistorieText(event.summary)}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {event.tags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}
                                                                >
                                                                    {tagTranslations[tag] || tag.replace(/_/g, ' ')}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.section>
                            );
                        })}
                    </div>
                </div>
            </Container>

            {/* Key Entities */}
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
                            Nøkkelpersoner og steder
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {entities.slice(0, 12).map((entity, index) => (
                                <motion.div
                                    key={entity.id}
                                    variants={cardVariants}
                                    custom={index}
                                    whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
                                    className="rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-category-historie/20"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-medium text-category-historie uppercase">
                                            {entity.type === 'person' ? 'Person' : entity.type === 'organisation' ? 'Organisasjon' : 'Sted'}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{entity.name}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{entity.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
