import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ildsjeler - Løkka Biblioteket',
    description: 'Møt de lokale heltene som har formet Grünerløkka gjennom tidene.',
};

export default function IldsjelerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
