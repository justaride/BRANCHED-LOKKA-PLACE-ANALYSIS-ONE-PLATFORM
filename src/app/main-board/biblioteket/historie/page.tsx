import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getHistorieTimeline, getHistorieEvents, getHistorieSections, getHistorieTags, getHistorieEntities } from '@/lib/loaders/biblioteket-loader';
import ImageCarousel from '@/components/biblioteket/ImageCarousel';
import { translateHistorieText } from '@/lib/translate-historie';
import { biblioteketCarouselImages } from '@/lib/constants/carousel-images';

export const metadata = {
    title: 'Byhistorie - Løkka Biblioteket',
    description: 'Fra fabrikkbelte til kulturbydel – 170 år med byutvikling på Grünerløkka.',
};

const sectionLabels: Record<string, string> = {
    '19th_century_origins_industry_and_expansion': '1800-tallet: Opprinnelse og industri',
    'early_20th_century_the_working_class_community': 'Tidlig 1900-tall: Arbeidersamfunnet',
    'world_war_ii_and_postwar_challenges': 'Krig og etterkrigstid',
    'byfornyelse_and_gentrification_1970s_2000s': 'Byfornyelse og gentrifisering',
    'conclusion_continuity_and_change_in_a_city_district': 'Kontinuitet og endring',
};

const tagColors: Record<string, string> = {
    industry: 'bg-amber-100 text-amber-700',
    urban_expansion: 'bg-blue-100 text-blue-700',
    housing: 'bg-green-100 text-green-700',
    clearance: 'bg-red-100 text-red-700',
    byfornyelse: 'bg-purple-100 text-purple-700',
    gentrification: 'bg-pink-100 text-pink-700',
    heritage_preservation: 'bg-emerald-100 text-emerald-700',
    culture: 'bg-violet-100 text-violet-700',
    working_class: 'bg-orange-100 text-orange-700',
    grassroots: 'bg-cyan-100 text-cyan-700',
};

const tagTranslations: Record<string, string> = {
    industry: 'Industri',
    urban_expansion: 'Byekspansjon',
    housing: 'Bolig',
    clearance: 'Sanering',
    byfornyelse: 'Byfornyelse',
    gentrification: 'Gentrifisering',
    heritage_preservation: 'Verneplaner',
    culture: 'Kultur',
    working_class: 'Arbeiderklasse',
    grassroots: 'Grasrotbevegelse',
    architecture: 'Arkitektur',
    infrastructure: 'Infrastruktur',
    protest: 'Protest',
    activism: 'Aktivisme',
    unemployment: 'Arbeidsløshet',
    renovation: 'Renovering',
    commerce: 'Handel',
    education: 'Utdanning',
    health: 'Helse',
    war: 'Krig',
    occupation: 'Okkupasjon',
    resistance: 'Motstand',
};


export default function HistoriePage() {
    const timeline = getHistorieTimeline();
    const events = getHistorieEvents();
    const sections = getHistorieSections();
    const tags = getHistorieTags();
    const entities = getHistorieEntities();

    // Sort events by year
    const sortedEvents = [...events].sort((a, b) => a.start_year - b.start_year);

    // Group events by section
    const eventsBySection = new Map<string, typeof events>();
    sections.forEach((section) => {
        eventsBySection.set(
            section,
            sortedEvents.filter((e) => e.section_id === section)
        );
    });

    // Count entities by type
    const entityTypes = entities.reduce((acc, e) => {
        acc[e.type] = (acc[e.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-20 text-white">
                {/* Hero Background Image */}
                <Image
                    src="/images/biblioteket/byhistorie-banner-hero.jpg"
                    alt="Grünerløkkas byhistorie"
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
                            Byhistorie
                        </div>
                        <h1 className="mb-6 text-5xl font-bold leading-tight">
                            Grünerløkkas Byhistorie
                        </h1>
                        <p className="mb-4 text-xl text-white/90">
                            {timeline.place.name}, {timeline.place.city}
                        </p>
                        <p className="text-lg text-white/80">
                            Fra fabrikkbelte til kulturbydel – {timeline.time_span.end_year - timeline.time_span.start_year} år
                            med byutvikling fra {timeline.time_span.start_year} til {timeline.time_span.end_year}-tallet.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Stats Section */}
            <section className="border-b border-gray-200 bg-white py-8">
                <Container>
                    <div className="flex flex-wrap gap-8 justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{events.length}</div>
                            <div className="text-sm text-gray-500">Historiske hendelser</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{sections.length}</div>
                            <div className="text-sm text-gray-500">Epoker</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{entities.length}</div>
                            <div className="text-sm text-gray-500">Personer & steder</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600">{tags.length}</div>
                            <div className="text-sm text-gray-500">Temaer</div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Introduction Section with Image Carousel */}
            <section className="border-b border-gray-200 bg-white py-16">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Text Column */}
                        <div>
                            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm md:p-10">
                                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                    Om Grünerløkkas Utvikling
                                </h2>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Fra åker til fabrikk, fra slum til kulturbydel – Grünerløkka har gjennomgått en enestående transformasjon gjennom mer enn 170 år.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        På 1850-tallet var området fortsatt preget av jordbruk og spredt bebyggelse. Med industrialiseringen vokste det raskt fram en tett arbeiderbydel rundt tekstilfabrikker og verksteder. Trange gater ble fylt med leiegårder hvor arbeiderklassen bodde under krevende forhold.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Gjennom 1900-tallet ble Grünerløkka både et senter for arbeiderorganisering og politisk aktivisme, men også et område preget av sosiale utfordringer. På 1970- og 80-tallet sto bydelen overfor forfall og nedleggelse av industri, samtidig som en aktiv motstand mot rivningsplaner samlet et kreativt og engasjert miljø.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Fra 1990-tallet tok gentrifiseringen til, og bydelen ble gradvis omdannet til et av Oslos mest populære og livlige strøk – et kulturelt kraftsenter med kafeer, gallerier, musikksteder og mangfold. Historien om Grünerløkka er en fortelling om klassekamp, byutvikling og identitet.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image Carousel Column */}
                        <div className="flex items-center">
                            <ImageCarousel images={biblioteketCarouselImages} />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Main Content */}
            <Container className="py-16">
                <div className="grid gap-12 lg:grid-cols-4">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Sections Navigation */}
                        <section className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Epoker</h3>
                            <ul className="space-y-2">
                                {sections.map((section) => (
                                    <li key={section}>
                                        <a
                                            href={`#${section}`}
                                            className="block text-sm text-gray-600 hover:text-amber-600 transition-colors"
                                        >
                                            {sectionLabels[section] || section}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Tags */}
                        <section className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Temaer</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.slice(0, 15).map((tag) => (
                                    <span
                                        key={tag}
                                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${tagColors[tag] || 'bg-gray-100 text-gray-700'}`}
                                    >
                                        {tagTranslations[tag] || tag.replace(/_/g, ' ')}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Entity Types */}
                        <section className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Aktører</h3>
                            <ul className="space-y-2">
                                {Object.entries(entityTypes).map(([type, count]) => (
                                    <li key={type} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 capitalize">{type === 'person' ? 'Personer' : type === 'organisation' ? 'Organisasjoner' : type === 'place' ? 'Steder' : type}</span>
                                        <span className="font-medium text-amber-600">{count}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Timeline by Section */}
                    <div className="lg:col-span-3 space-y-16">
                        {sections.map((section) => {
                            const sectionEvents = eventsBySection.get(section) || [];
                            if (sectionEvents.length === 0) return null;

                            return (
                                <section key={section} id={section}>
                                    <h2 className="mb-8 text-2xl font-bold text-gray-900 pb-4 border-b border-gray-200">
                                        {sectionLabels[section] || section}
                                    </h2>
                                    <div className="relative">
                                        {/* Timeline line */}
                                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-amber-200" />

                                        <div className="space-y-6">
                                            {sectionEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="relative flex gap-6"
                                                >
                                                    {/* Year marker */}
                                                    <div className="flex-shrink-0 w-16 relative">
                                                        <div className="absolute right-0 top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-amber-100" />
                                                        <span className="text-sm font-bold text-amber-600">
                                                            {event.start_year}
                                                            {event.end_year !== event.start_year && (
                                                                <span className="text-gray-400">–{event.end_year}</span>
                                                            )}
                                                        </span>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                                                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                            {translateHistorieText(event.label)}
                                                        </h3>
                                                        <p className="mb-4 text-gray-600">
                                                            {translateHistorieText(event.summary)}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {event.tags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}
                                                                >
                                                                    {tagTranslations[tag] || tag.replace(/_/g, ' ')}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </Container>

            {/* Key Entities */}
            <section className="border-t border-gray-200 bg-gray-50 py-16">
                <Container>
                    <h2 className="mb-8 text-2xl font-bold text-gray-900">Nøkkelpersoner og steder</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {entities.slice(0, 12).map((entity) => (
                            <div
                                key={entity.id}
                                className="rounded-lg border border-gray-200 bg-white p-5"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-medium text-amber-600 uppercase">
                                        {entity.type === 'person' ? 'Person' : entity.type === 'organisation' ? 'Organisasjon' : 'Sted'}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{entity.name}</h3>
                                <p className="text-sm text-gray-600">{entity.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
}
