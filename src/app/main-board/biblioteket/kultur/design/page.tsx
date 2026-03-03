'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getDesignKreativData } from '@/lib/loaders/biblioteket-loader';
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

const fashionTypeColors: Record<string, { bg: string; text: string }> = {
    merke: { bg: 'bg-teal-100', text: 'text-teal-700' },
    butikk: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
    vintage: { bg: 'bg-amber-100', text: 'text-amber-700' },
    konsept: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

const workspaceTypeColors: Record<string, { bg: string; text: string }> = {
    coworking: { bg: 'bg-teal-100', text: 'text-teal-700' },
    atelier: { bg: 'bg-amber-100', text: 'text-amber-700' },
    kontor: { bg: 'bg-gray-100', text: 'text-gray-700' },
    kollektiv: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

function getFashionBadgeColor(type: string) {
    const lower = type.toLowerCase();
    for (const [key, colors] of Object.entries(fashionTypeColors)) {
        if (lower.includes(key)) return colors;
    }
    return { bg: 'bg-gray-100', text: 'text-gray-700' };
}

function getWorkspaceBadgeColor(type: string) {
    const lower = type.toLowerCase();
    for (const [key, colors] of Object.entries(workspaceTypeColors)) {
        if (lower.includes(key)) return colors;
    }
    return { bg: 'bg-gray-100', text: 'text-gray-700' };
}

export default function DesignKreativPage() {
    const data = getDesignKreativData();

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 bg-gradient-to-br from-teal-900 via-cyan-800 to-emerald-900 text-white">
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
                            Design & Kreativ
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
                            <div className="text-3xl font-bold text-teal-600">{data.agencies.length}</div>
                            <div className="text-sm text-gray-500">Byraer</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-teal-600">{data.fashionBrands.length}</div>
                            <div className="text-sm text-gray-500">Mote & Design</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-teal-600">{data.workspaces.length}</div>
                            <div className="text-sm text-gray-500">Arbeidsplasser</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-teal-600">{data.educationInstitutions.length}</div>
                            <div className="text-sm text-gray-500">Utdanningsinstitusjoner</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Agencies Section */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Kreative Byraer
                        </motion.h2>
                        {data.sections[0] && (
                            <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                                {data.sections[0].description}
                            </motion.p>
                        )}
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.agencies.map((agency, index) => (
                                <motion.div
                                    key={agency.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-6"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{agency.name}</h3>
                                        <span className="inline-block rounded-full bg-teal-100 px-3 py-0.5 text-sm font-medium text-teal-700">
                                            {agency.founded}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">{agency.address}</p>
                                    <p className="text-sm text-teal-600 font-medium mb-3">{agency.specialization}</p>
                                    <p className="text-gray-700 mb-3">{agency.description}</p>
                                    {agency.notableWork && agency.notableWork.length > 0 && (
                                        <div className="mb-3">
                                            <span className="text-xs font-medium text-gray-500 uppercase">Kjente arbeider:</span>
                                            <div className="mt-2 space-y-1">
                                                {agency.notableWork.map((work) => (
                                                    <div key={work} className="flex items-start gap-2">
                                                        <span className="text-teal-600">•</span>
                                                        <span className="text-sm text-gray-700">{work}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-sm text-teal-600 italic">{agency.connectionToLokka}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Fashion & Streetwear */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Mote og Streetwear
                        </motion.h2>
                        {data.sections[1] && (
                            <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                                {data.sections[1].description}
                            </motion.p>
                        )}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {data.fashionBrands.map((brand, index) => {
                                const colors = getFashionBadgeColor(brand.type);
                                return (
                                    <motion.div
                                        key={brand.name}
                                        variants={cardVariants}
                                        custom={index}
                                        className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-gray-900">{brand.name}</h3>
                                            {brand.established && (
                                                <span className="text-sm font-medium text-teal-600">{brand.established}</span>
                                            )}
                                        </div>
                                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} mb-2`}>
                                            {brand.type}
                                        </span>
                                        <p className="text-sm text-gray-500 mb-2">{brand.address}</p>
                                        <p className="text-sm text-gray-700">{brand.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Creative Workspaces */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Kreative Arbeidsplasser
                        </motion.h2>
                        {data.sections[2] && (
                            <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                                {data.sections[2].description}
                            </motion.p>
                        )}
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.workspaces.map((workspace, index) => {
                                const colors = getWorkspaceBadgeColor(workspace.type);
                                return (
                                    <motion.div
                                        key={workspace.name}
                                        variants={cardVariants}
                                        custom={index}
                                        className="rounded-xl border border-gray-200 bg-white p-6"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{workspace.name}</h3>
                                            {workspace.established && (
                                                <span className="text-sm font-medium text-teal-600">{workspace.established}</span>
                                            )}
                                        </div>
                                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} mb-2`}>
                                            {workspace.type}
                                        </span>
                                        <p className="text-sm text-gray-500 mb-2">{workspace.address}</p>
                                        <p className="text-gray-700 mb-3">{workspace.description}</p>
                                        {workspace.notableTenants && workspace.notableTenants.length > 0 && (
                                            <div>
                                                <span className="text-xs font-medium text-gray-500 uppercase">Leietakere:</span>
                                                <div className="mt-1 flex flex-wrap gap-1.5">
                                                    {workspace.notableTenants.map((tenant) => (
                                                        <span key={tenant} className="inline-block rounded-full bg-teal-50 px-2.5 py-0.5 text-xs text-teal-700 border border-teal-200">
                                                            {tenant}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Vulkan Hub */}
            {data.creativeHubs.map((hub) => (
                <section key={hub.name} className="border-b border-gray-200 bg-white py-16">
                    <Container>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport.default}
                            variants={containerVariants}
                        >
                            <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                                Vulkan som Kreativt Kvartal
                            </motion.h2>
                            {data.sections[3] && (
                                <motion.p variants={fadeUpVariants} className="mb-4 text-gray-600">
                                    {data.sections[3].description}
                                </motion.p>
                            )}
                            <motion.div variants={fadeUpVariants} className="mb-8 rounded-xl border border-teal-200 bg-teal-50 p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-bold text-teal-900">{hub.name}</h3>
                                    <span className="inline-block rounded-full bg-teal-200 px-3 py-0.5 text-sm font-medium text-teal-800">
                                        Fra {hub.yearStarted}
                                    </span>
                                </div>
                                <p className="text-sm text-teal-700 font-medium mb-3">{hub.developer}</p>
                                <p className="text-gray-700">{hub.description}</p>
                            </motion.div>
                            <div className="grid gap-4 md:grid-cols-2">
                                {hub.components.map((component, index) => (
                                    <motion.div
                                        key={component.name}
                                        variants={cardVariants}
                                        custom={index}
                                        className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-bold text-gray-900">{component.name}</h4>
                                            <span className="inline-block rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                                                {component.opened}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">{component.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </Container>
                </section>
            ))}

            {/* Education */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Utdanning
                        </motion.h2>
                        {data.sections[4] && (
                            <motion.p variants={fadeUpVariants} className="mb-8 text-gray-600">
                                {data.sections[4].description}
                            </motion.p>
                        )}
                        <div className="space-y-6">
                            {data.educationInstitutions.map((institution, index) => (
                                <motion.div
                                    key={institution.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-white p-6"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{institution.name}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{institution.address}</p>
                                    <div className="mb-3 flex flex-wrap gap-1.5">
                                        {institution.departments.map((dept) => (
                                            <span key={dept} className="inline-block rounded-full bg-teal-100 px-3 py-0.5 text-xs font-medium text-teal-700">
                                                {dept}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-3">{institution.description}</p>
                                    <p className="text-sm text-teal-600 italic">{institution.connectionToLokka}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Notable Designers */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-8 text-2xl font-bold text-gray-900">
                            Designere og Formgivere
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.notableDesigners.map((designer, index) => (
                                <motion.div
                                    key={designer.name}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-6"
                                >
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{designer.name}</h3>
                                    <p className="text-sm text-teal-600 font-medium mb-1">{designer.field}</p>
                                    <p className="text-sm text-gray-500 mb-3">{designer.period}</p>
                                    {designer.notableWork && designer.notableWork.length > 0 && (
                                        <div className="mb-3">
                                            <span className="text-xs font-medium text-gray-500 uppercase">Kjente arbeider:</span>
                                            <div className="mt-1 space-y-1">
                                                {designer.notableWork.map((work) => (
                                                    <div key={work} className="flex items-start gap-2">
                                                        <span className="text-teal-600">•</span>
                                                        <span className="text-sm text-gray-700">{work}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-sm text-teal-600 italic">{designer.connection}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Industry Stats */}
            <section className="bg-gray-50 py-16">
                <Container>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport.default}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={fadeUpVariants} className="mb-2 text-2xl font-bold text-gray-900">
                            Kreativ Naering i Tall
                        </motion.h2>
                        <motion.p variants={fadeUpVariants} className="mb-8 text-gray-700 leading-relaxed max-w-3xl">
                            {data.industryStats.description}
                        </motion.p>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {data.industryStats.highlights.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    custom={index}
                                    className="rounded-xl border border-teal-200 bg-white p-5"
                                >
                                    <p className="text-sm text-gray-700 font-medium">{highlight}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
