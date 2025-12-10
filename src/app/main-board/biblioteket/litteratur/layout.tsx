import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Litteratur - Løkka Biblioteket',
    description: 'Bøker, artikler og akademiske verk om Grünerløkka fra 1913 til i dag.',
};

export default function LitteraturLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
