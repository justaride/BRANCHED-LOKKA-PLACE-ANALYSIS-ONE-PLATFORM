import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
    getIldsjelById,
    getIldsjeler
} from '@/lib/loaders/biblioteket-loader';

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const params = [];

    // Add Ildsjeler paths
    const ildsjeler = getIldsjeler();
    for (const ildsjel of ildsjeler) {
        params.push({
            category: 'ildsjeler',
            slug: ildsjel.id,
        });
    }

    // Add other categories if they have detail pages later

    return params;
}

export async function generateMetadata({ params }: PageProps) {
    const { category, slug } = await params;

    if (category === 'ildsjeler') {
        const ildsjel = getIldsjelById(slug);
        if (!ildsjel) return { title: 'Fant ikke ildsjel' };
        return {
            title: `${ildsjel.name} - Løkka Biblioteket`,
            description: ildsjel.summary,
        };
    }

    return {
        title: 'Side ikke funnet',
    };
}

export default async function DetailPage({ params }: PageProps) {
    const { category, slug } = await params;

    if (category !== 'ildsjeler') {
        notFound();
    }

    const ildsjel = getIldsjelById(slug);

    if (!ildsjel) {
        notFound();
    }

    const getLinkDisplayName = (url: string) => {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch {
            return 'Ekstern lenke';
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-natural-forest via-natural-forest to-natural-sage py-16 md:py-20 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                </div>
                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-white/70">
                            <Link href="/main-board/biblioteket" className="hover:text-white transition-colors">
                                Biblioteket
                            </Link>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <Link href="/main-board/biblioteket/ildsjeler" className="hover:text-white transition-colors">
                                Ildsjeler
                            </Link>
                        </nav>
                        <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                            {ildsjel.name}
                        </h1>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 text-lg text-white/90 border border-white/20">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {ildsjel.mainPeriod.from}
                            {ildsjel.mainPeriod.to ? `–${ildsjel.mainPeriod.to}` : '–'}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Profile Content */}
            <Container className="py-12 md:py-16">
                <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
                    {/* Sidebar / Image */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <div className="overflow-hidden rounded-2xl shadow-lg">
                                {ildsjel.imageUrl ? (
                                    <div className="relative aspect-[3/4]">
                                        <Image
                                            src={ildsjel.imageUrl}
                                            alt={ildsjel.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-natural-sand/30 to-natural-sand/10">
                                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-natural-sand/50">
                                            <svg className="h-16 w-16 text-natural-earth" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Key Info Card */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
                                <div>
                                    <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        Tilknytning
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{ildsjel.connectionToGrunerlokka}</p>
                                </div>

                                {ildsjel.relatedPlaces.length > 0 && (
                                    <div>
                                        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Steder
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {ildsjel.relatedPlaces.map(place => (
                                                <span key={place} className="inline-flex items-center rounded-lg bg-gray-50 px-3 py-1.5 text-sm text-gray-700 border border-gray-100">
                                                    {place}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {ildsjel.links.length > 0 && (
                                    <div>
                                        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Lenker
                                        </h3>
                                        <div className="space-y-2">
                                            {ildsjel.links.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 rounded-lg bg-natural-forest/5 px-3 py-2 text-sm text-natural-forest hover:bg-natural-forest/10 transition-colors group"
                                                >
                                                    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                    </svg>
                                                    <span className="truncate">{getLinkDisplayName(link)}</span>
                                                    <svg className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="prose prose-lg prose-slate max-w-none">
                            <p className="text-xl text-gray-600 leading-relaxed font-medium border-l-4 border-natural-sage pl-6 py-2 bg-natural-sage/10 rounded-r-lg">
                                {ildsjel.summary}
                            </p>
                            <div className="my-10 h-px w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                {ildsjel.description}
                            </div>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-2">
                            {ildsjel.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="rounded-full bg-natural-sand/30 px-4 py-1.5 text-sm font-medium text-natural-earth border border-natural-sand"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <Link
                                href="/main-board/biblioteket/ildsjeler"
                                className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors group"
                            >
                                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Tilbake til oversikten
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
