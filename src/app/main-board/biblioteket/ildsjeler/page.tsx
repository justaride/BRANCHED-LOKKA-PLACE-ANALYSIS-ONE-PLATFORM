import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getIldsjeler, getIldsjelKategorier, getIldsjelTidslinje } from '@/lib/loaders/biblioteket-loader';
import ImageCarousel from '@/components/biblioteket/ImageCarousel';
import { ildsjelerCarouselImages } from '@/lib/constants/carousel-images';

export const metadata = {
    title: 'Ildsjeler - Løkka Biblioteket',
    description: 'Møt de lokale heltene som har formet Grünerløkka gjennom tidene.',
};

export default function IldsjelerPage() {
    const ildsjeler = getIldsjeler();
    const kategorier = getIldsjelKategorier();
    const tidslinje = getIldsjelTidslinje();

    // Group ildsjeler by living status
    const livingIldsjeler = ildsjeler.filter((i) => i.isLiving === true);
    const historicalIldsjeler = ildsjeler.filter((i) => i.isLiving === false || i.isLiving === null);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                {/* Hero Background Image */}
                <Image
                    src="/images/biblioteket/ildsjeler-banner-hero.jpg"
                    alt="Løkkas Ildsjeler"
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
                            Ildsjeler
                        </div>
                        <h1 className="mb-6 text-5xl font-bold leading-tight">
                            Løkkas Ildsjeler
                        </h1>
                        <p className="mb-8 text-xl text-white/90">
                            Møt de lokale heltene som har formet Grünerløkka – fra pionerer i utdanning og likestilling
                            til kulturentreprenører og idrettsfrivillige.
                        </p>
                    </div>
                </Container>
            </section >

            {/* Intro Section with Carousel */}
            < section className="border-b border-gray-200 bg-gray-50 py-16" >
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Menneskene som bygget Løkka
                            </h2>
                            <div className="prose prose-lg text-gray-600">
                                <p>
                                    Grünerløkkas historie er ikke bare murstein og asfalt – det er historien om menneskene som har bodd her, kjempet for bydelen sin, og skapt det unike fellesskapet vi kjenner i dag.
                                </p>
                                <p>
                                    Fra fabrikkarbeiderne som organiserte seg for bedre kår på 1800-tallet, til aksjonistene som stoppet rivingen på 70-tallet, og dagens kulturentreprenører. Ildsjeler har alltid vært drivkraften i bydelens utvikling.
                                </p>
                            </div>
                        </div>
                        <div>
                            <ImageCarousel images={ildsjelerCarouselImages} />
                            <p className="mt-3 text-center text-sm text-gray-500 italic">
                                Engasjement og fellesskap gjennom tidene
                            </p>
                        </div>
                    </div>
                </Container>
            </section >

            {/* Stats Section */}
            < section className="border-b border-gray-200 bg-white py-8" >
                <Container>
                    <div className="flex flex-wrap gap-8 justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600">{ildsjeler.length}</div>
                            <div className="text-sm text-gray-500">Ildsjeler</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600">{kategorier.length}</div>
                            <div className="text-sm text-gray-500">Kategorier</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600">{tidslinje.length}</div>
                            <div className="text-sm text-gray-500">Historiske hendelser</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600">1854–i dag</div>
                            <div className="text-sm text-gray-500">Tidsperiode</div>
                        </div>
                    </div>
                </Container>
            </section >

            {/* Main Content */}
            < Container className="py-16" >
                {/* Living Ildsjeler */}
                {
                    livingIldsjeler.length > 0 && (
                        <section className="mb-16">
                            <h2 className="mb-8 text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-green-500">●</span> Aktive Ildsjeler i dag
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {livingIldsjeler.map((ildsjel) => (
                                    <Link
                                        key={ildsjel.id}
                                        href={`/main-board/biblioteket/ildsjeler/${ildsjel.id}`}
                                        className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:border-orange-200"
                                    >
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600">
                                                {ildsjel.name}
                                            </h3>
                                            {ildsjel.birthYear && (
                                                <p className="text-sm text-gray-500">
                                                    f. {ildsjel.birthYear}
                                                    {ildsjel.mainPeriod.from && ` · Aktiv fra ${ildsjel.mainPeriod.from}`}
                                                </p>
                                            )}
                                        </div>
                                        <p className="mb-4 text-gray-600 line-clamp-3">
                                            {ildsjel.summary}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {ildsjel.categories.slice(0, 2).map((cat) => {
                                                const kategori = kategorier.find((k) => k.id === cat);
                                                return (
                                                    <span
                                                        key={cat}
                                                        className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
                                                    >
                                                        {kategori?.name || cat}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )
                }

                {/* Historical Ildsjeler */}
                {
                    historicalIldsjeler.length > 0 && (
                        <section className="mb-16">
                            <h2 className="mb-8 text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-gray-400">●</span> Historiske Ildsjeler
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {historicalIldsjeler.map((ildsjel) => (
                                    <Link
                                        key={ildsjel.id}
                                        href={`/main-board/biblioteket/ildsjeler/${ildsjel.id}`}
                                        className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:border-orange-200"
                                    >
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600">
                                                {ildsjel.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {ildsjel.birthYear && ildsjel.deathYear
                                                    ? `${ildsjel.birthYear}–${ildsjel.deathYear}`
                                                    : ildsjel.mainPeriod.from && ildsjel.mainPeriod.to
                                                        ? `Aktiv ${ildsjel.mainPeriod.from}–${ildsjel.mainPeriod.to}`
                                                        : ildsjel.mainPeriod.from
                                                            ? `Aktiv fra ${ildsjel.mainPeriod.from}`
                                                            : ''}
                                            </p>
                                        </div>
                                        <p className="mb-4 text-gray-600 line-clamp-3">
                                            {ildsjel.summary}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {ildsjel.categories.slice(0, 2).map((cat) => {
                                                const kategori = kategorier.find((k) => k.id === cat);
                                                return (
                                                    <span
                                                        key={cat}
                                                        className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                                                    >
                                                        {kategori?.name || cat}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )
                }

                {/* Categories */}
                <section className="mb-16">
                    <h2 className="mb-8 text-2xl font-bold text-gray-900">Kategorier</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {kategorier.map((kategori) => {
                            const count = ildsjeler.filter((i) => i.categories.includes(kategori.id)).length;
                            return (
                                <div
                                    key={kategori.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4"
                                >
                                    <h3 className="font-semibold text-gray-900">{kategori.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{kategori.description}</p>
                                    <p className="mt-2 text-xs font-medium text-orange-600">
                                        {count} {count === 1 ? 'ildsjel' : 'ildsjeler'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Timeline */}
                <section>
                    <h2 className="mb-8 text-2xl font-bold text-gray-900">Tidslinje</h2>
                    <div className="space-y-4">
                        {tidslinje.sort((a, b) => a.year - b.year).map((event) => (
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
                                    {event.ildsjelIds.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {event.ildsjelIds.map((id) => {
                                                const ildsjel = ildsjeler.find((i) => i.id === id);
                                                return ildsjel ? (
                                                    <Link
                                                        key={id}
                                                        href={`/main-board/biblioteket/ildsjeler/${id}`}
                                                        className="text-xs text-orange-600 hover:underline"
                                                    >
                                                        {ildsjel.name}
                                                    </Link>
                                                ) : null;
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Container >
        </>
    );
}
