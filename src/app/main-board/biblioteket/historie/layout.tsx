import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Byhistorie - Løkka Biblioteket',
    description: 'Fra fabrikkbelte til kulturbydel – 170 år med byutvikling på Grünerløkka.',
};

export default function HistorieLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
