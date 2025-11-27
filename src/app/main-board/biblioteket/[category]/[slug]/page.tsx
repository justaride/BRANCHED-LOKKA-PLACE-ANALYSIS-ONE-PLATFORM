import Container from '@/components/ui/Container';
import Link from 'next/link';
import { getArticle, getArticlesByCategory, getLibraryCategories } from '@/lib/library-loader';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const categories = getLibraryCategories();
    const params = [];

    for (const cat of categories) {
        const articles = getArticlesByCategory(cat.slug);
        for (const article of articles) {
            params.push({
                category: cat.slug,
                slug: article.slug,
            });
        }
    }

    return params;
}

export async function generateMetadata({ params }: PageProps) {
    const { category, slug } = await params;
    const article = getArticle(category, slug);

    if (!article) {
        return {
            title: 'Artikkel ikke funnet',
        };
    }

    return {
        title: `${article.title} - Løkka Biblioteket`,
        description: article.excerpt || `Artikkel i kategorien ${category}`,
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { category, slug } = await params;
    const article = getArticle(category, slug);
    const categories = getLibraryCategories();
    const currentCategory = categories.find(c => c.slug === category);

    if (!article || !currentCategory) {
        notFound();
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 bg-natural-forest py-16 text-white">
                <Container>
                    <div className="max-w-4xl">
                        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-white/80">
                            <Link href="/main-board/biblioteket" className="hover:text-white">
                                Biblioteket
                            </Link>
                            <span>/</span>
                            <Link href={`/main-board/biblioteket/${category}`} className="hover:text-white">
                                {currentCategory.title}
                            </Link>
                        </div>
                        <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                            {article.title}
                        </h1>
                    </div>
                </Container>
            </section>

            {/* Article Content */}
            <Container className="py-16">
                <article className="mx-auto max-w-3xl">
                    <div className="prose prose-lg prose-slate max-w-none">
                        <ReactMarkdown
                            components={{
                                h1: ({ node, ...props }) => <h1 className="mb-6 mt-12 text-3xl font-bold text-gray-900" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-900" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="mb-3 mt-8 text-xl font-bold text-gray-900" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-gray-700" {...props} />,
                                ul: ({ node, ...props }) => <ul className="mb-6 list-disc pl-6 text-gray-700" {...props} />,
                                ol: ({ node, ...props }) => <ol className="mb-6 list-decimal pl-6 text-gray-700" {...props} />,
                                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                                a: ({ node, ...props }) => <a className="font-medium text-lokka-primary hover:underline" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-lokka-primary pl-4 italic text-gray-700" {...props} />,
                            }}
                        >
                            {article.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-16 border-t border-gray-200 pt-8">
                        <Link
                            href={`/main-board/biblioteket/${category}`}
                            className="inline-flex items-center gap-2 font-medium text-lokka-primary hover:underline"
                        >
                            ← Tilbake til {currentCategory.title}
                        </Link>
                    </div>
                </article>
            </Container>
        </>
    );
}
