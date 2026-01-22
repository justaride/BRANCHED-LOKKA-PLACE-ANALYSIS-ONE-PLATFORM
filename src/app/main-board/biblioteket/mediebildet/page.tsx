'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getMediebildetData, getTotalMediaItems } from '@/lib/loaders/biblioteket-loader';
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

const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', icon: '📰' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', icon: '📺' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', icon: '🎙️' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: '💻' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', icon: '📚' },
};

export default function MediebildetPage() {
    const data = getMediebildetData();
    const totalItems = getTotalMediaItems();

    return (
        <>
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
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
                                className="text-slate-300 hover:text-white transition-colors mb-4 inline-flex items-center gap-2"
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
                            className="text-xl text-slate-200 mb-6"
                        >
                            {data.subtitle}
                        </motion.p>

                        <motion.p
                            variants={heroItemVariants}
                            className="text-slate-300 max-w-2xl"
                        >
                            {data.description}
                        </motion.p>

                        <motion.div
                            variants={heroItemVariants}
                            className="mt-8 flex items-center gap-6"
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold">{totalItems}</div>
                                <div className="text-sm text-slate-300">Totalt</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">5</div>
                                <div className="text-sm text-slate-300">Kategorier</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">25</div>
                                <div className="text-sm text-slate-300">År med dekning</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            <section className="py-16 bg-white">
                <Container>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Utforsk etter medietype
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {data.subsections.map((section) => {
                            const colors = colorMap[section.color] || colorMap.slate;
                            return (
                                <motion.div key={section.slug} variants={cardVariants}>
                                    <Link
                                        href={`/main-board/biblioteket/mediebildet/${section.slug}`}
                                        className={`block ${colors.bg} rounded-xl p-6 border ${colors.border} hover:shadow-lg transition-all group`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="text-3xl">{colors.icon}</span>
                                            <span className={`text-sm font-medium ${colors.text}`}>
                                                {section.count} elementer
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                                            {section.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {section.description}
                                        </p>
                                        <div className={`mt-4 flex items-center gap-1 ${colors.text} text-sm font-medium`}>
                                            Utforsk
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </Container>
            </section>

            <section className="py-16 bg-gray-50">
                <Container>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Temaer
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {data.themes.map((theme) => (
                            <span
                                key={theme}
                                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-slate-400 transition-colors cursor-default"
                            >
                                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </span>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="py-12 bg-white border-t border-gray-100">
                <Container>
                    <div className="text-center text-gray-500">
                        <p className="text-sm">
                            Mediebildet er en pågående kartlegging. Har du tips til artikler eller medieinnhold vi bør inkludere?
                        </p>
                        <a
                            href="mailto:kontakt@naturalstate.no"
                            className="text-slate-600 hover:text-slate-800 underline text-sm mt-2 inline-block"
                        >
                            Send oss en e-post
                        </a>
                    </div>
                </Container>
            </section>
        </>
    );
}
