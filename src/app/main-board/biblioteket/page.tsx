import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getBibliotekCategories, getBibliotekStats, getMasterTimelineEvents } from '@/lib/loaders/biblioteket-loader';
import MasterTimeline from '@/components/biblioteket/MasterTimeline';

export const metadata = {
    title: 'Løkka Biblioteket - Løkka Gårdeierforening',
    description: 'Utforsk Grünerløkkas rike historie, kultur og lokale helter gjennom vårt digitale bibliotek.',
};

export default function LokkaBiblioteketPage() {
    const categories = getBibliotekCategories();
    const stats = getBibliotekStats();
    const masterTimelineEvents = getMasterTimelineEvents();

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-16 md:py-24 text-white">
                {/* Historical Map Background */}
                <Image
                    src="/images/biblioteket/lokka-bibliotek-hero.jpg"
                    alt="Løkka Biblioteket"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <Link
                            href="/main-board"
                            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group"
                        >
                            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Tilbake til hovedsiden
                        </Link>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md border border-white/20">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Digitalt Bibliotek
                        </div>
                        <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                            Løkka Biblioteket
                        </h1>
                        <p className="mb-4 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                            Utforsk Grünerløkkas rike historie, fra arbeiderbydel til kulturdestinasjon.
                            Møt lokale ildsjeler, les om byutviklingen, og dykk ned i litteratur og kulturliv.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Dashboard / Stats Section */}
            <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white py-10 md:py-12">
                <Container>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-natural-forest/20">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-natural-forest/10 text-natural-forest">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div className="text-sm font-medium text-gray-500">Kategorier</div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{categories.length}</div>
                        </div>
                        <div className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-natural-sage/40">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-natural-sage/10 text-natural-forest">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="text-sm font-medium text-gray-500">Totalt Innhold</div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stats.totalItems}</div>
                        </div>
                        <div className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-natural-earth/30">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-natural-earth/10 text-natural-earth">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div className="text-sm font-medium text-gray-500">Litteratur</div>
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-gray-900">
                                {stats.yearSpan.litteratur.earliest}–{stats.yearSpan.litteratur.latest}
                            </div>
                        </div>
                        <div className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-natural-sand">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-natural-sand/40 text-natural-earth">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="text-sm font-medium text-gray-500">Byhistorie</div>
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-gray-900">
                                {stats.yearSpan.historie.earliest}–{stats.yearSpan.historie.latest}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Categories Grid */}
            <section className="border-b border-gray-200 bg-white py-12 md:py-16">
                <Container>
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Utforsk Kategorier</h2>
                            <p className="mt-2 text-gray-600">Velg en kategori for å dykke dypere</p>
                        </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/main-board/biblioteket/${category.slug}`}
                                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity group-hover:from-black/95" />
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                                        {category.itemCount} elementer
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                                        {category.title}
                                    </h3>
                                    <p className="text-sm text-white/75 line-clamp-2 leading-relaxed">
                                        {category.description}
                                    </p>
                                    <div className="mt-3 flex items-center gap-1 text-sm font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Utforsk</span>
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Master Timeline Section - "Løkkas Livsstrøm" */}
            <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
                <Container>
                    <div className="mb-12 md:mb-16 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-natural-forest to-natural-sage px-5 py-2 text-sm font-medium text-white shadow-md">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Interaktiv Tidslinje
                        </div>
                        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                            Løkkas Livsstrøm
                        </h2>
                        <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed">
                            Opplev Grünerløkkas historie som en flytende elv av hendelser – fra de første parselleringene på 1850-tallet til kulturknutepunktet vi kjenner i dag.
                        </p>
                    </div>
                    <MasterTimeline events={masterTimelineEvents} />
                </Container>
            </section>

            {/* About Section */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-20">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-natural-forest/10">
                            <svg className="h-7 w-7 text-natural-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="mb-6 text-2xl md:text-3xl font-bold text-gray-900">Om Løkka Biblioteket</h2>
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                            Løkka Biblioteket er en digital samling som dokumenterer Grünerløkkas unike historie og identitet.
                            Her finner du fortellinger om lokale ildsjeler som har formet bydelen, et omfattende litteraturarkiv
                            med over 35 verk fra 1913 til i dag, en interaktiv tidslinje over byutviklingen fra 1850-tallet,
                            og en dypdykk i det rike kunst- og kulturlivet som gjør Løkka til Norges mest konsentrerte kulturøkosystem.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/main-board/biblioteket/ildsjeler"
                                className="inline-flex items-center gap-2 rounded-full bg-natural-forest px-5 py-2.5 text-sm font-medium text-white hover:bg-natural-forest/90 transition-colors"
                            >
                                Start utforskningen
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
