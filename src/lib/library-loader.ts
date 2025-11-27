import fs from 'fs';
import path from 'path';

export interface LibraryArticle {
    slug: string;
    category: string;
    title: string;
    content: string;
    excerpt?: string;
}

export interface LibraryCategory {
    slug: string;
    title: string;
    description: string;
    articles: LibraryArticle[];
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/biblioteket');

const CATEGORIES: Record<string, { title: string; description: string }> = {
    'kunst-og-kultur': {
        title: 'Kunst og Kultur',
        description: 'Utforsk Grünerløkkas rike kulturhistorie og byutvikling.',
    },
    'litteratur': {
        title: 'Litteratur',
        description: 'Bøker, dikt og fortellinger fra og om Løkka.',
    },
};

export function getLibraryCategories(): LibraryCategory[] {
    const categories: LibraryCategory[] = [];

    if (!fs.existsSync(CONTENT_DIR)) {
        return [];
    }

    const dirs = fs.readdirSync(CONTENT_DIR);

    for (const dir of dirs) {
        const categoryPath = path.join(CONTENT_DIR, dir);
        if (fs.statSync(categoryPath).isDirectory() && CATEGORIES[dir]) {
            const articles = getArticlesByCategory(dir);
            categories.push({
                slug: dir,
                title: CATEGORIES[dir].title,
                description: CATEGORIES[dir].description,
                articles,
            });
        }
    }

    return categories;
}

export function getArticlesByCategory(categorySlug: string): LibraryArticle[] {
    const categoryPath = path.join(CONTENT_DIR, categorySlug);

    if (!fs.existsSync(categoryPath)) {
        return [];
    }

    const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.md'));
    const articles: LibraryArticle[] = [];

    for (const file of files) {
        const filePath = path.join(categoryPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const slug = file.replace('.md', '');

        // Simple title extraction (first line starting with #)
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');

        // Simple excerpt extraction (first paragraph)
        const excerptMatch = content.split('\n\n').find(p => p.length > 50 && !p.startsWith('#'));
        const excerpt = excerptMatch ? excerptMatch.slice(0, 150) + '...' : '';

        articles.push({
            slug,
            category: categorySlug,
            title,
            content,
            excerpt,
        });
    }

    return articles;
}

export function getArticle(categorySlug: string, articleSlug: string): LibraryArticle | null {
    const filePath = path.join(CONTENT_DIR, categorySlug, `${articleSlug}.md`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Simple title extraction
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : articleSlug.replace(/-/g, ' ');

    return {
        slug: articleSlug,
        category: categorySlug,
        title,
        content,
    };
}
