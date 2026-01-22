import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mediebildet - Løkka Biblioteket',
    description: 'Grünerløkka i norske medier 2000-2025 – artikler, dokumentarer, podcaster og akademiske publikasjoner.',
};

export default function MediebildetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
