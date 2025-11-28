import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getLitteratur, getLitteraturTopics, getLitteraturTypes } from '@/lib/loaders/biblioteket-loader';
import ImageCarousel from '@/components/biblioteket/ImageCarousel';

export const metadata = {
    title: 'Litteratur - Løkka Biblioteket',
    description: 'Bøker, artikler og akademiske verk om Grünerløkka fra 1913 til i dag.',
};

const typeLabels: Record<string, string> = {
    book: 'Bok',
    article: 'Artikkel',
    thesis: 'Avhandling',
    report: 'Rapport',
    chapter: 'Kapittel',
    booklet: 'Hefte',
    reference: 'Oppslagsverk',
};

const typeColors: Record<string, string> = {
    book: 'bg-blue-100 text-blue-700',
    article: 'bg-green-100 text-green-700',
    thesis: 'bg-purple-100 text-purple-700',
    report: 'bg-amber-100 text-amber-700',
    chapter: 'bg-pink-100 text-pink-700',
    booklet: 'bg-cyan-100 text-cyan-700',
    reference: 'bg-gray-100 text-gray-700',
};

export default function LitteraturPage() {
    const works = getLitteratur();
    const topics = getLitteraturTopics();
    const types = getLitteraturTypes();

    // Sort by year descending
    const sortedWorks = [...works].sort((a, b) => b.year - a.year);

    // Group by decade
    const decades = new Map<string, typeof works>();
    sortedWorks.forEach((work) => {
        const decade = Math.floor(work.year / 10) * 10;
        const key = `${decade}-tallet`;
        if (!decades.has(key)) {
            decades.set(key, []);
        }
        decades.get(key)!.push(work);
    });

    // Type counts
    const typeCounts = types.map((type) => ({
        type,
        count: works.filter((w) => w.type === type).length,
    })).sort((a, b) => b.count - a.count);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                {/* Hero Background Image */}
                <Image
                    src="/images/biblioteket/litteratur-banner-hero.jpeg"
                    alt="Litteratur om Grünerløkka"
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
                            Litteratur
                        </div>
                        <h1 className="mb-6 text-5xl font-bold leading-tight">
                            Litteratur om Grünerløkka
                        </h1>
                        <p className="mb-8 text-xl text-white/90">
                            En omfattende samling av bøker, artikler, avhandlinger og rapporter
                            som dokumenterer Grünerløkkas historie, byutvikling og kulturliv.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Stats Section */}
            <section className="border-b border-gray-200 bg-white py-8">
                <Container>
                    <div className="flex flex-wrap gap-8 justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{works.length}</div>
                            <div className="text-sm text-gray-500">Verk totalt</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">
                                {Math.min(...works.map((w) => w.year))}–{Math.max(...works.map((w) => w.year))}
                            </div>
                            <div className="text-sm text-gray-500">Tidsperiode</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{types.length}</div>
                            <div className="text-sm text-gray-500">Verkstyper</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{topics.length}</div>
                            <div className="text-sm text-gray-500">Emner</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Intro Section with Carousel */}
            <section className="border-b border-gray-200 bg-gray-50 py-16">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        {/* Text Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">
                                En litterær reise gjennom Løkka
                            </h2>
                            <div className="prose prose-lg text-gray-600">
                                <p>
                                    Litteratur om Grünerløkka er en rikholdig samling som speiler bydelens dramatiske forvandling gjennom over hundre år. Fra de tidlige arbeiderklasse-skildringene til dagens analyser av gentrifisering og byutvikling, gir disse verkene et unikt innblikk i Løkkas sjel.
                                </p>
                                <p>
                                    Samlingen omfatter alt fra historiske oppslagsverk og akademiske avhandlinger til levende kulturrapporter. Den dekker sentrale temaer som industrialiseringens fremvekst, den bitre saneringsstriden på 70-tallet som reddet bydelen fra riving, og transformasjonen til dagens pulserende kulturknutepunkt.
                                </p>
                                <p>
                                    Her finner du både tunge akademiske analyser av byutviklingen og nære skildringer av menneskene som har formet bydelen. Det er en historie om motstand, fellesskap og kjærlighet til en av Oslos mest ikoniske bydeler.
                                </p>
                            </div>
                        </div>

                        {/* Image Carousel */}
                        <div>
                            <ImageCarousel />
                            <p className="mt-3 text-center text-sm text-gray-500 italic">
                                Historiske glimt fra Grünerløkka gjennom tidene
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Main Content */}
            <Container className="py-16">
                <div className="grid gap-12 lg:grid-cols-4">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Types */}
                        <section className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Verkstyper</h3>
                            <ul className="space-y-2">
                                {typeCounts.map(({ type, count }) => (
                                    <li key={type} className="flex items-center justify-between">
                                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeColors[type] || 'bg-gray-100 text-gray-700'}`}>
                                            {typeLabels[type] || type}
                                        </span>
                                        <span className="text-sm text-gray-500">{count}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Topics */}
                        <section className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Emner</h3>
                            <div className="flex flex-wrap gap-2">
                                {topics.slice(0, 20).map((topic) => (
                                    <span
                                        key={topic}
                                        className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Works by Decade */}
                    <div className="lg:col-span-3 space-y-12">
                        {Array.from(decades.entries()).map(([decade, decadeWorks]) => (
                            <section key={decade}>
                                <h2 className="mb-6 text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    {decade}
                                    <span className="text-sm font-normal text-gray-500">
                                        ({decadeWorks.length} {decadeWorks.length === 1 ? 'verk' : 'verk'})
                                    </span>
                                </h2>
                                <div className="space-y-4">
                                    {decadeWorks.map((work) => (
                                        <div
                                            key={work.id}
                                            className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex flex-wrap items-start gap-3 mb-3">
                                                <span className="text-lg font-bold text-blue-600">{work.year}</span>
                                                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeColors[work.type] || 'bg-gray-100 text-gray-700'}`}>
                                                    {typeLabels[work.type] || work.type}
                                                </span>
                                            </div>
                                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                {work.title}
                                            </h3>
                                            <p className="mb-3 text-sm text-gray-600">
                                                {work.authors.join(', ')}
                                            </p>
                                            {work.note && (
                                                <p className="text-sm text-gray-500 italic">
                                                    {work.note}
                                                </p>
                                            )}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {work.topics.map((topic) => (
                                                    <span
                                                        key={topic}
                                                        className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
}
