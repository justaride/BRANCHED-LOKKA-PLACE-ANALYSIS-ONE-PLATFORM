import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Idrett - Løkka Biblioteket',
    description: 'Fra arbeideridretten til Grüner IL – 100 år med folkesport på Grünerløkka.',
};

export default function IdrettLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
