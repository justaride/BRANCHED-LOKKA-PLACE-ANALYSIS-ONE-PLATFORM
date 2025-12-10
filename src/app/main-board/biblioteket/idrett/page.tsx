'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getIdrettData } from '@/lib/loaders/biblioteket-loader';
import { springs, stagger } from '@/lib/animations';

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

export default function IdrettPage() {
    const data = getIdrettData();

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                <Image
                    src="/images/biblioteket/idrett-hero.png"
                    alt="Idrett på Grünerløkka"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-800/70 to-green-700/50" />
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
                                className="text-green-200 hover:text-white transition-colors mb-4 inline-flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Tilbake til Biblioteket
                            </Link>
                        </motion.div>

                        <motion.h1
                            variants={heroItemVariants}
                            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                        >
                            {data.title}
                        </motion.h1>

                        <motion.p
                            variants={heroItemVariants}
                            className="text-xl text-green-100 mb-6"
                        >
                            {data.subtitle}
                        </motion.p>

                        <motion.p
                            variants={heroItemVariants}
                            className="text-green-200 max-w-2xl"
                        >
                            {data.description}
                        </motion.p>
                    </motion.div>
                </Container>
            </section>

            {/* Sections */}
            <section className="py-16 bg-white">
                <Container>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {data.sections.map((section) => (
                            <motion.div
                                key={section.id}
                                variants={cardVariants}
                                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {section.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {section.description}
                                </p>
                                {section.founded && (
                                    <p className="text-green-600 font-medium mt-3">
                                        Etablert {section.founded}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Timeline */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Tidslinje
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-4"
                    >
                        {data.timeline.map((event, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="flex gap-4 items-start bg-white rounded-lg p-4 border border-gray-100"
                            >
                                <span className="text-green-600 font-bold text-lg min-w-[60px]">
                                    {event.year}
                                </span>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                    <p className="text-gray-600 text-sm">{event.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Historical Clubs */}
            <section className="py-16 bg-white">
                <Container>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Historiske klubber
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {data.clubs.map((club) => (
                            <motion.div
                                key={club.id}
                                variants={cardVariants}
                                className="bg-gray-50 rounded-xl p-5 border border-gray-100"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900">{club.name}</h3>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        club.type.includes('Arbeider')
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {club.type}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{club.description}</p>
                                {club.achievements && club.achievements.length > 0 && (
                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <p className="text-xs text-gray-500 mb-1">Meritter:</p>
                                        <ul className="text-sm text-green-700">
                                            {club.achievements.map((a, i) => (
                                                <li key={i}>• {a}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Pioneers */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Idrettspionerer
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {data.pioneers.map((pioneer) => (
                            <motion.div
                                key={pioneer.id}
                                variants={cardVariants}
                                className="bg-white rounded-lg p-4 border border-gray-100"
                            >
                                <h4 className="font-semibold text-gray-900">{pioneer.name}</h4>
                                <p className="text-green-600 text-sm font-medium">{pioneer.role}</p>
                                <p className="text-gray-500 text-xs mb-2">{pioneer.period}</p>
                                <p className="text-gray-600 text-sm">{pioneer.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Sources */}
            <section className="py-12 bg-white border-t border-gray-100">
                <Container>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Kilder</h3>
                    <div className="flex flex-wrap gap-3">
                        {data.sources.map((source, idx) => (
                            <a
                                key={idx}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-green-600 hover:text-green-800 underline"
                            >
                                {source.title}
                            </a>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
}
