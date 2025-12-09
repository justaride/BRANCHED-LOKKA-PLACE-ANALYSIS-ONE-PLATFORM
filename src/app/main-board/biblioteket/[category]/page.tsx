import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
    getBibliotekCategories,
    getIldsjeler,
    getLitteratur,
    getHistorieEvents,
    getKulturTimeline,
    getIldsjelPlaces
} from '@/lib/loaders/biblioteket-loader';
import IldsjelGrid from '@/components/biblioteket/IldsjelGrid';
import IldsjelMap from '@/components/biblioteket/IldsjelMap';
import LitteraturList from '@/components/biblioteket/LitteraturList';
import LitteraturStats from '@/components/biblioteket/LitteraturStats';
import HistorieTimeline from '@/components/biblioteket/HistorieTimeline';
import InteractiveTimeline from '@/components/biblioteket/InteractiveTimeline';
import KulturView from '@/components/biblioteket/KulturView';
import KulturNetwork from '@/components/biblioteket/KulturNetwork';

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateStaticParams() {
    const categories = getBibliotekCategories();
    return categories.map((cat) => ({
        category: cat.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { category } = await params;
    const categories = getBibliotekCategories();
    const currentCategory = categories.find(c => c.slug === category);

    if (!currentCategory) {
        return {
            title: 'Kategori ikke funnet',
        };
    }

    return {
        title: `${currentCategory.title} - Løkka Biblioteket`,
        description: currentCategory.description,
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;
    const categories = getBibliotekCategories();
    const currentCategory = categories.find(c => c.slug === category);

    if (!currentCategory) {
        notFound();
    }

    // Render content based on category
    const renderContent = () => {
        switch (category) {
            case 'ildsjeler':
                const ildsjeler = getIldsjeler();
                const places = getIldsjelPlaces();
                return (
                    <div className="space-y-16">
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Utforsk Kartet</h2>
                            <IldsjelMap places={places} />
                        </section>
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Alle Ildsjeler</h2>
                            <IldsjelGrid ildsjeler={ildsjeler} />
                        </section>
                    </div>
                );
            case 'litteratur':
                const works = getLitteratur();
                return (
                    <div className="space-y-16">
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Litterær Analyse</h2>
                            <LitteraturStats works={works} />
                        </section>
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Bokarkivet</h2>
                            <LitteraturList works={works} />
                        </section>
                    </div>
                );
            case 'historie':
                const events = getHistorieEvents();
                return (
                    <div className="space-y-16">
                        {/* Introduction Section */}
                        <section className="prose prose-lg max-w-none">
                            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm md:p-12">
                                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                    Grünerløkkas Byhistorie
                                </h2>
                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p className="text-lg">
                                        Fra åker til fabrikk, fra slum til kulturbydel – Grünerløkka har gjennomgått en enestående transformasjon gjennom mer enn 170 år.
                                    </p>
                                    <p>
                                        På 1850-tallet var området fortsatt preget av jordbruk og spredt bebyggelse. Med industrialiseringen vokste det raskt fram en tett arbeiderbydel rundt tekstilfabrikker og verksteder. Trange gater ble fylt med leiegårder hvor arbeiderklassen bodde under krevende forhold.
                                    </p>
                                    <p>
                                        Gjennom 1900-tallet ble Grünerløkka både et senter for arbeiderorganisering og politisk aktivisme, men også et område preget av sosiale utfordringer. På 1970- og 80-tallet sto bydelen overfor forfall og nedleggelse av industri, samtidig som en aktiv motstand mot rivningsplaner samlet et kreativt og engasjert miljø.
                                    </p>
                                    <p>
                                        Fra 1990-tallet tok gentrifiseringen til, og bydelen ble gradvis omdannet til et av Oslos mest populære og livlige strøk – et kulturelt kraftsenter med kafeer, gallerier, musikksteder og mangfold. Historien om Grünerløkka er en fortelling om klassekamp, byutvikling og identitet.
                                    </p>
                                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                                        <div className="rounded-lg bg-white p-4 shadow-sm">
                                            <div className="text-2xl font-bold text-amber-700">1850–1900</div>
                                            <div className="text-sm text-gray-600">Industrialisering og urbanisering</div>
                                        </div>
                                        <div className="rounded-lg bg-white p-4 shadow-sm">
                                            <div className="text-2xl font-bold text-slate-700">1900–1990</div>
                                            <div className="text-sm text-gray-600">Arbeiderbydel og aktivisme</div>
                                        </div>
                                        <div className="rounded-lg bg-white p-4 shadow-sm">
                                            <div className="text-2xl font-bold text-emerald-700">1990–</div>
                                            <div className="text-sm text-gray-600">Gentrifisering og kulturliv</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Tidslinje</h2>
                            <InteractiveTimeline events={events} />
                        </section>
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Detaljert Historikk</h2>
                            <HistorieTimeline events={events} />
                        </section>
                    </div>
                );
            case 'kultur':
                const kulturEvents = getKulturTimeline();
                return (
                    <div className="space-y-16">
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Kulturnettverket</h2>
                            <KulturNetwork events={kulturEvents} />
                        </section>
                        <section>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Kronologisk Oversikt</h2>
                            <KulturView events={kulturEvents} />
                        </section>
                    </div>
                );
            default:
                return <p>Innhold kommer snart...</p>;
        }
    };

    // Hero image mapping
    const heroImages: Record<string, string> = {
        'ildsjeler': '/images/biblioteket/ildsjeler-banner-hero.jpg',
        'litteratur': '/images/biblioteket/litteratur-banner-hero.jpeg',
        'kultur': '/images/biblioteket/kultur-banner-hero.jpg',
        'historie': '/images/biblioteket/byhistorie-banner-hero.jpg',
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 py-16 text-white">
                {/* Hero Background Image */}
                <Image
                    src={heroImages[category] || heroImages.ildsjeler}
                    alt={currentCategory.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <Link
                            href="/main-board/biblioteket"
                            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
                        >
                            ← Tilbake til biblioteket
                        </Link>
                        <h1 className="mb-4 text-4xl font-bold leading-tight">
                            {currentCategory.title}
                        </h1>
                        <p className="text-lg text-white/90">
                            {currentCategory.description}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <Container className="py-16">
                {renderContent()}
            </Container>
        </>
    );
}
