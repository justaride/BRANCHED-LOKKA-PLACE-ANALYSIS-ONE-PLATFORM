import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kunst og Kultur - Løkka Biblioteket',
    description: 'Musikk, kunst, teater og kulturmiljøet på Grünerløkka.',
};

export default function KulturLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
