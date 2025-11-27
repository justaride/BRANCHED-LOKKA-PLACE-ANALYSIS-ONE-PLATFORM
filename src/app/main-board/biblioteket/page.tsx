import Container from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Løkka Biblioteket - Løkka Gårdeierforening',
    description: 'Samling av dokumenter, rapporter og ressurser for Løkka Gårdeierforening.',
};

export default function LokkaBiblioteketPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 bg-natural-forest py-20 text-white">
                <Container>
                    <div className="max-w-3xl">
                        <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                            Ressursbank
                        </div>
                        <h1 className="mb-6 text-5xl font-bold leading-tight">
                            Løkka Biblioteket
                        </h1>
                        <p className="mb-8 text-xl text-white/90">
                            En samling av viktige dokumenter, rapporter, presentasjoner og andre ressurser
                            for medlemmer av Løkka Gårdeierforening.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <Container className="py-16">
                <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-3xl">
                        📚
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">Under Utvikling</h2>
                    <p className="text-gray-600">
                        Biblioteket er under oppbygging. Her vil du snart finne nyttige ressurser.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/main-board"
                            className="inline-flex items-center gap-2 font-medium text-lokka-primary hover:underline"
                        >
                            ← Tilbake til oversikten
                        </Link>
                    </div>
                </div>
            </Container>
        </>
    );
}
