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
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                {/* Historical Map Background */}
                <Image
                    src="/images/biblioteket/lokka-bibliotek-hero.jpg"
                    alt="Løkka Biblioteket"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <Link
                            href="/main-board"
                            className="mb-4 inline-flex items-center text-sm text-white/80 hover:text-white transition-colors"
                        >
                            ← Tilbake til hovedsiden
                        </Link>
                        <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                            Digitalt Bibliotek
                        </div>
                        <h1 className="mb-6 text-5xl font-bold leading-tight">
                            Løkka Biblioteket
                        </h1>
                        <p className="mb-8 text-xl text-white/90">
                            Utforsk Grünerløkkas rike historie, fra arbeiderbydel til kulturdestinasjon.
                            Møt lokale ildsjeler, les om byutviklingen, og dykk ned i litteratur og kulturliv.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Dashboard / Stats Section */}
            <section className="border-b border-gray-200 bg-white py-12">
                <Container>
                    <div className="grid gap-6 md:grid-cols-4">
                        <div className="rounded-xl bg-gray-50 p-6">
                            <div className="text-sm font-medium text-gray-500">Kategorier</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">{categories.length}</div>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-6">
                            <div className="text-sm font-medium text-gray-500">Totalt Innhold</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">{stats.totalItems}</div>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-6">
                            <div className="text-sm font-medium text-gray-500">Litteratur</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">
                                {stats.yearSpan.litteratur.earliest}–{stats.yearSpan.litteratur.latest}
                            </div>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-6">
                            <div className="text-sm font-medium text-gray-500">Byhistorie</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">
                                {stats.yearSpan.historie.earliest}–{stats.yearSpan.historie.latest}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Categories Grid - Now positioned before timeline */}
            <section className="border-b border-gray-200 bg-white py-12">
                <Container>
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Utforsk Kategorier</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/main-board/biblioteket/${category.slug}`}
                                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-xl font-bold text-white">
                                        {category.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-white/80 line-clamp-2">
                                        {category.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Master Timeline Section - "Løkkas Livsstrøm" */}
            <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white py-20">
                <Container>
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-1.5 text-sm font-medium text-white">
                            Tidslinje
                        </div>
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">
                            Løkkas Livsstrøm
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Opplev Grünerløkkas historie som en flytende elv av hendelser – fra de første parselleringene på 1850-tallet til kulturknutepunktet vi kjenner i dag.
                        </p>
                    </div>
                    <MasterTimeline events={masterTimelineEvents} />
                </Container>
            </section>

            {/* About Section */}
            <section className="border-t border-gray-200 bg-gray-50 py-16">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">Om Løkka Biblioteket</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Løkka Biblioteket er en digital samling som dokumenterer Grünerløkkas unike historie og identitet.
                            Her finner du fortellinger om lokale ildsjeler som har formet bydelen, et omfattende litteraturarkiv
                            med over 35 verk fra 1913 til i dag, en interaktiv tidslinje over byutviklingen fra 1850-tallet,
                            og en dypdykk i det rike kunst- og kulturlivet som gjør Løkka til Norges mest konsentrerte kulturøkosystem.
                        </p>
                    </div>
                </Container>
            </section>
        </>
    );
}
