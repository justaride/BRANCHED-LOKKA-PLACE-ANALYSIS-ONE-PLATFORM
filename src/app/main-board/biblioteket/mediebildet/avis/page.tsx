'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getAvisData } from '@/lib/loaders/biblioteket-loader';
import { springs, stagger } from '@/lib/animations';

const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const heroItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: springs.smooth },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: stagger.normal, delayChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: springs.smooth },
};

export default function AvisPage() {
    const data = getAvisData();
    const items = data.items;

    return (
        <>
            <section className="relative overflow-hidden border-b border-gray-200 py-16 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600" />
                <Container className="relative z-10">
                    <motion.div
                        className="max-w-3xl"
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={heroItemVariants}>
                            <Link
                                href="/main-board/biblioteket/mediebildet"
                                className="text-slate-300 hover:text-white transition-colors mb-4 inline-flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Tilbake til Mediebildet
                            </Link>
                        </motion.div>

                        <motion.div variants={heroItemVariants} className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">📰</span>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                {data.title}
                            </h1>
                        </motion.div>

                        <motion.p variants={heroItemVariants} className="text-slate-200">
                            {data.description}
                        </motion.p>

                        <motion.div variants={heroItemVariants} className="mt-6">
                            <span className="text-2xl font-bold">{items.length}</span>
                            <span className="text-slate-300 ml-2">artikler</span>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            <section className="py-12 bg-white">
                <Container>
                    {items.length === 0 ? (
                        <div className="text-center py-16">
                            <span className="text-6xl mb-4 block">📰</span>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Kommer snart
                            </h3>
                            <p className="text-gray-600">
                                Vi jobber med å samle inn avisartikler om Grünerløkka.
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="space-y-4"
                        >
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={cardVariants}
                                    className="bg-gray-50 rounded-lg p-5 border border-gray-100 hover:border-slate-300 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                        <span className="text-xs text-gray-500">{item.date}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-2">{item.source}</p>
                                    <p className="text-gray-600 text-sm">{item.summary}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {item.themes.map((theme) => (
                                            <span
                                                key={theme}
                                                className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
                                            >
                                                {theme}
                                            </span>
                                        ))}
                                    </div>
                                    {item.url && (
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-600 hover:text-slate-800 text-sm mt-3 inline-flex items-center gap-1"
                                        >
                                            Les artikkelen
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </Container>
            </section>
        </>
    );
}
