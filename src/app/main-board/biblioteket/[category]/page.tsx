import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getArticlesByCategory, getLibraryCategories } from '@/lib/library-loader';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateStaticParams() {
    const categories = getLibraryCategories();
    return categories.map((cat) => ({
        category: cat.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { category } = await params;
    const categories = getLibraryCategories();
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
    const categories = getLibraryCategories();
    const currentCategory = categories.find(c => c.slug === category);

    if (!currentCategory) {
        notFound();
    }

    const articles = getArticlesByCategory(category);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 bg-natural-forest py-16 text-white">
                <Container>
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

            {/* Articles List */}
            <Container className="py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/main-board/biblioteket/${category}/${article.slug}`}
                            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex h-48 items-center justify-center bg-gray-50 p-8">
                                <span className="text-4xl">📄</span>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-lokka-primary">
                                    {article.title}
                                </h3>
                                {article.excerpt && (
                                    <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                )}
                                <div className="mt-auto pt-4 text-sm font-medium text-lokka-primary">
                                    Les artikkelen →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </>
    );
}
