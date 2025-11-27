import Container from '@/components/ui/Container';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIldsjeler, getIldsjelById, getIldsjelKategorier, getIldsjelTidslinje, getIldsjelPlaces } from '@/lib/loaders/biblioteket-loader';

export async function generateStaticParams() {
    const ildsjeler = getIldsjeler();
    return ildsjeler.map((ildsjel) => ({
        id: ildsjel.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const ildsjel = getIldsjelById(id);
    if (!ildsjel) return { title: 'Ikke funnet' };
    return {
        title: `${ildsjel.name} - Ildsjeler - Løkka Biblioteket`,
        description: ildsjel.summary,
    };
}

export default async function IldsjelDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const ildsjel = getIldsjelById(id);

    if (!ildsjel) {
        notFound();
    }

    const kategorier = getIldsjelKategorier();
    const tidslinje = getIldsjelTidslinje();
    const places = getIldsjelPlaces();

    // Get related timeline events
    const relatedEvents = tidslinje.filter((e) => e.ildsjelIds.includes(ildsjel.id));

    // Get related places
    const relatedPlaces = places.filter((p) => ildsjel.relatedPlaceIds.includes(p.id));

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-orange-500 to-orange-600 py-16 text-white">
                <Container>
                    <div className="max-w-3xl">
                        <Link
                            href="/main-board/biblioteket/ildsjeler"
                            className="mb-4 inline-flex items-center text-sm text-white/80 hover:text-white transition-colors"
                        >
                            ← Tilbake til ildsjeler
                        </Link>

                        <div className="flex items-center gap-3 mb-4">
                            {ildsjel.isLiving === true && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-white">
                                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                                    Aktiv i dag
                                </span>
                            )}
                            {ildsjel.categories.map((cat) => {
                                const kategori = kategorier.find((k) => k.id === cat);
                                return (
                                    <span
                                        key={cat}
                                        className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white"
                                    >
                                        {kategori?.name || cat}
                                    </span>
                                );
                            })}
                        </div>

                        <h1 className="mb-4 text-5xl font-bold leading-tight">
                            {ildsjel.name}
                        </h1>

                        <div className="mb-6 text-white/80">
                            {ildsjel.birthYear && (
                                <span>
                                    {ildsjel.birthYear}
                                    {ildsjel.deathYear ? `–${ildsjel.deathYear}` : '–'}
                                </span>
                            )}
                            {ildsjel.mainPeriod.from && (
                                <span className="ml-4">
                                    Aktiv {ildsjel.mainPeriod.from}
                                    {ildsjel.mainPeriod.to ? `–${ildsjel.mainPeriod.to}` : '–i dag'}
                                </span>
                            )}
                        </div>

                        <p className="text-xl text-white/90">
                            {ildsjel.summary}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Main Content */}
            <Container className="py-16">
                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Om {ildsjel.name}</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {ildsjel.description}
                            </p>
                        </section>

                        {/* Connection to Grünerløkka */}
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Tilknytning til Grünerløkka</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {ildsjel.connectionToGrunerlokka}
                            </p>
                        </section>

                        {/* Timeline */}
                        {relatedEvents.length > 0 && (
                            <section>
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">Tidslinje</h2>
                                <div className="space-y-4">
                                    {relatedEvents.sort((a, b) => a.year - b.year).map((event) => (
                                        <div
                                            key={event.id}
                                            className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
                                        >
                                            <div className="flex-shrink-0 w-16 text-center">
                                                <span className="text-2xl font-bold text-orange-600">{event.year}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                                <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                                                {event.place && (
                                                    <p className="mt-2 text-xs text-gray-500">
                                                        {event.place}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Related Places */}
                        {(ildsjel.relatedPlaces.length > 0 || relatedPlaces.length > 0) && (
                            <section className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">Relaterte steder</h3>
                                <ul className="space-y-3">
                                    {relatedPlaces.map((place) => (
                                        <li key={place.id}>
                                            <p className="font-medium text-gray-900">{place.name}</p>
                                            {place.description && (
                                                <p className="text-sm text-gray-500">{place.description}</p>
                                            )}
                                        </li>
                                    ))}
                                    {ildsjel.relatedPlaces
                                        .filter((p) => !relatedPlaces.some((rp) => rp.name === p))
                                        .map((place) => (
                                            <li key={place}>
                                                <p className="font-medium text-gray-900">{place}</p>
                                            </li>
                                        ))}
                                </ul>
                            </section>
                        )}

                        {/* Related Organizations */}
                        {ildsjel.relatedOrganizations.length > 0 && (
                            <section className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">Organisasjoner</h3>
                                <ul className="space-y-2">
                                    {ildsjel.relatedOrganizations.map((org) => (
                                        <li key={org}>
                                            <span className="text-gray-700">{org}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Categories */}
                        <section className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Kategorier</h3>
                            <div className="space-y-3">
                                {ildsjel.categories.map((cat) => {
                                    const kategori = kategorier.find((k) => k.id === cat);
                                    return (
                                        <div key={cat}>
                                            <p className="font-medium text-gray-900">{kategori?.name || cat}</p>
                                            {kategori?.description && (
                                                <p className="text-sm text-gray-500">{kategori.description}</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </div>
            </Container>
        </>
    );
}
