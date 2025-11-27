import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
    getBibliotekCategories,
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
    const categories = getBibliotekCategories();
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
        // Currently only Ildsjeler has detail pages
        notFound();
    }

    const ildsjel = getIldsjelById(slug);

    if (!ildsjel) {
        notFound();
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 bg-natural-forest py-16 text-white">
                <Container>
                    <div className="max-w-4xl">
                        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-white/80">
                            <Link href="/main-board/biblioteket" className="hover:text-white">
                                Biblioteket
                            </Link>
                            <span>/</span>
                            <Link href="/main-board/biblioteket/ildsjeler" className="hover:text-white">
                                Ildsjeler
                            </Link>
                        </div>
                        <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                            {ildsjel.name}
                        </h1>
                        <div className="text-xl text-white/90">
                            {ildsjel.mainPeriod.from}
                            {ildsjel.mainPeriod.to ? `–${ildsjel.mainPeriod.to}` : ''}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Profile Content */}
            <Container className="py-16">
                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Sidebar / Image */}
                    <div className="lg:col-span-1">
                        <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-md">
                            {ildsjel.imageUrl ? (
                                <div className="relative aspect-[3/4]">
                                    <Image
                                        src={ildsjel.imageUrl}
                                        alt={ildsjel.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex aspect-[3/4] items-center justify-center bg-gray-200 text-6xl text-gray-400">
                                    👤
                                </div>
                            )}
                        </div>

                        {/* Key Info */}
                        <div className="mt-8 space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div>
                                <h3 className="mb-2 text-sm font-bold uppercase text-gray-500">Tilknytning</h3>
                                <p className="text-gray-900">{ildsjel.connectionToGrunerlokka}</p>
                            </div>

                            {ildsjel.relatedPlaces.length > 0 && (
                                <div>
                                    <h3 className="mb-2 text-sm font-bold uppercase text-gray-500">Steder</h3>
                                    <ul className="list-disc pl-4 text-gray-900">
                                        {ildsjel.relatedPlaces.map(place => (
                                            <li key={place}>{place}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {ildsjel.links.length > 0 && (
                                <div>
                                    <h3 className="mb-2 text-sm font-bold uppercase text-gray-500">Lenker</h3>
                                    <ul className="space-y-1">
                                        {ildsjel.links.map((link, i) => (
                                            <li key={i}>
                                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-lokka-primary hover:underline break-all">
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="prose prose-lg prose-slate max-w-none">
                            <p className="lead text-xl text-gray-600">
                                {ildsjel.summary}
                            </p>
                            <div className="my-8 h-px w-full bg-gray-200" />
                            <div className="whitespace-pre-wrap">
                                {ildsjel.description}
                            </div>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-2">
                            {ildsjel.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <div className="mt-16 border-t border-gray-200 pt-8">
                            <Link
                                href="/main-board/biblioteket/ildsjeler"
                                className="inline-flex items-center gap-2 font-medium text-lokka-primary hover:underline"
                            >
                                ← Tilbake til oversikten
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
