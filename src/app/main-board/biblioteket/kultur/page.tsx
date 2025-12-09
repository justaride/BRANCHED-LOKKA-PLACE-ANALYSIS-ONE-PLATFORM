import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getKulturTimeline, getKulturIndexes, getKulturMasterText } from '@/lib/loaders/biblioteket-loader';
import ImageCarousel from '@/components/biblioteket/ImageCarousel';
import { biblioteketCarouselImages } from '@/lib/constants/carousel-images';

export const metadata = {
    title: 'Kunst og Kultur - Løkka Biblioteket',
    description: 'Musikk, kunst, teater og kulturmiljøet på Grünerløkka.',
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

    // Split master text into paragraphs
    const paragraphs = masterText.split('\n\n');

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                {/* Hero Background Image */}
                <Image
                    src="/images/biblioteket/kultur-banner-hero.jpg"
                    alt="Kunst og kultur på Grünerløkka"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <Link
                            href="/main-board/biblioteket"
                            className="mb-4 inline-flex items-center text-sm text-white/80 hover:text-white transition-colors"
                        >
                            ← Tilbake til biblioteket
                        </Link>
                        <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                            Kunst og Kultur
                        </div>
                        <h1 className="mb-6 text-5xl font-bold leading-tight">
                            Kunst, kultur og musikk
                        </h1>
                        <p className="text-xl text-white/90">
                            Grünerløkka – Norges mest konsentrerte musikk- og kulturøkosystem.
                            Fra Edvard Munchs barndom til dagens levende scener, atelierer og gallerier.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Stats Section */}
            <section className="border-b border-gray-200 bg-white py-8">
                <Container>
                    <div className="flex flex-wrap gap-8 justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{timeline.length}</div>
                            <div className="text-sm text-gray-500">Epoker</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{indexes.venues_and_institutions.length}</div>
                            <div className="text-sm text-gray-500">Scener & institusjoner</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{indexes.people.length}</div>
                            <div className="text-sm text-gray-500">Kunstnere & musikere</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{indexes.festivals_and_series.length}</div>
                            <div className="text-sm text-gray-500">Festivaler</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Main Text with Carousel */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div>
                            <h2 className="mb-8 text-2xl font-bold text-gray-900">Om kulturlivet på Grünerløkka</h2>
                            <div className="prose prose-lg prose-gray">
                                {paragraphs.slice(0, 3).map((p, i) => (
                                    <p key={i} className="mb-6 text-gray-700 leading-relaxed">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <ImageCarousel images={biblioteketCarouselImages} />
                            <p className="mt-3 text-center text-sm text-gray-500 italic">
                                Kulturelle øyeblikk fra bydelen
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Timeline */}
            <Container className="py-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">Kulturhistorisk tidslinje</h2>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-purple-200" />

                    <div className="space-y-8">
                        {timeline.map((event, index) => (
                            <div
                                key={index}
                                className="relative flex gap-4 md:gap-8"
                            >
                                {/* Period marker */}
                                <div className="flex-shrink-0 w-28 md:w-36 relative">
                                    <div className="absolute right-0 top-2 w-3 h-3 rounded-full bg-purple-500 border-4 border-purple-100" />
                                    <span className="text-sm font-bold text-purple-600 pr-4">
                                        {event.period}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                                    <p className="mb-4 text-gray-700">
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
                                                        className="inline-block rounded bg-purple-50 px-2 py-0.5 text-sm text-purple-700"
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Indexes */}
            <section className="border-t border-gray-200 bg-gray-50 py-16">
                <Container>
                    <h2 className="mb-8 text-2xl font-bold text-gray-900">Indekser</h2>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Venues */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">
                                Scener og institusjoner
                            </h3>
                            <p className="mb-4 text-sm text-gray-500">{indexes.venues_and_institutions.length} steder</p>
                            <div className="max-h-64 overflow-y-auto space-y-1">
                                {indexes.venues_and_institutions.slice(0, 30).map((venue) => (
                                    <p key={venue} className="text-sm text-gray-700">
                                        {venue}
                                    </p>
                                ))}
                                {indexes.venues_and_institutions.length > 30 && (
                                    <p className="text-sm text-gray-400 italic">+ {indexes.venues_and_institutions.length - 30} flere...</p>
                                )}
                            </div>
                        </div>

                        {/* People */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">
                                Kunstnere og musikere
                            </h3>
                            <p className="mb-4 text-sm text-gray-500">{indexes.people.length} personer</p>
                            <div className="max-h-64 overflow-y-auto space-y-1">
                                {indexes.people.slice(0, 30).map((person) => (
                                    <p key={person} className="text-sm text-gray-700">
                                        {person}
                                    </p>
                                ))}
                                {indexes.people.length > 30 && (
                                    <p className="text-sm text-gray-400 italic">+ {indexes.people.length - 30} flere...</p>
                                )}
                            </div>
                        </div>

                        {/* Groups */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">
                                Band og grupper
                            </h3>
                            <p className="mb-4 text-sm text-gray-500">{indexes.groups_and_bands.length} grupper</p>
                            <div className="max-h-64 overflow-y-auto space-y-1">
                                {indexes.groups_and_bands.map((group) => (
                                    <p key={group} className="text-sm text-gray-700">
                                        {group}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Festivals */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">
                                Festivaler og serier
                            </h3>
                            <p className="mb-4 text-sm text-gray-500">{indexes.festivals_and_series.length} arrangementer</p>
                            <div className="space-y-1">
                                {indexes.festivals_and_series.map((festival) => (
                                    <p key={festival} className="text-sm text-gray-700">
                                        {festival}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Works */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">
                                Verk og publikasjoner
                            </h3>
                            <p className="mb-4 text-sm text-gray-500">{indexes.works_and_publications.length} titler</p>
                            <div className="max-h-64 overflow-y-auto space-y-1">
                                {indexes.works_and_publications.slice(0, 20).map((work) => (
                                    <p key={work} className="text-sm text-gray-700">
                                        {work}
                                    </p>
                                ))}
                                {indexes.works_and_publications.length > 20 && (
                                    <p className="text-sm text-gray-400 italic">+ {indexes.works_and_publications.length - 20} flere...</p>
                                )}
                            </div>
                        </div>

                        {/* Places */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">
                                Steder
                            </h3>
                            <p className="mb-4 text-sm text-gray-500">{indexes.geographical_places.length} lokasjoner</p>
                            <div className="max-h-64 overflow-y-auto space-y-1">
                                {indexes.geographical_places.slice(0, 20).map((place) => (
                                    <p key={place} className="text-sm text-gray-700">
                                        {place}
                                    </p>
                                ))}
                                {indexes.geographical_places.length > 20 && (
                                    <p className="text-sm text-gray-400 italic">+ {indexes.geographical_places.length - 20} flere...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
