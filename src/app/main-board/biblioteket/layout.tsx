import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Løkka Biblioteket - Løkka Gårdeierforening',
    description: 'Utforsk Grünerløkkas rike historie, kultur og lokale helter gjennom vårt digitale bibliotek.',
};

export default function BibliotekLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
