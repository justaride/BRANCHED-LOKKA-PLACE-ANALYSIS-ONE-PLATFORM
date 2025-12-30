import { Metadata } from 'next';
import Link from 'next/link';
import NedreLokkaOverview from '@/components/analyser/NedreLokkaOverview';
import NedreLokkaBevegelseCharts from '@/components/analyser/NedreLokkaBevegelseCharts';
import NedreLokkaDemografiCharts from '@/components/analyser/NedreLokkaDemografiCharts';
import NedreLokkaVirksomheterCharts from '@/components/analyser/NedreLokkaVirksomheterCharts';
import metadata from '@/data/main-board/analyser/nedre-lokka-omradeprofil.json';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${metadata.tittel} | Natural State`,
    description: metadata.beskrivelse,
  };
}

export default function NedreLokkaOmradeprofilPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-4">
            <Link
              href="/main-board/analyser"
              className="text-green-100 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              ← Tilbake til Analyser
            </Link>
          </nav>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{metadata.tittel}</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            {metadata.beskrivelse}
          </p>

          {/* Meta Info */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-green-100">
            <div>
              <span className="font-semibold">Dato:</span> {metadata.dato}
            </div>
            <div>
              <span className="font-semibold">Kategori:</span> {metadata.kategori}
            </div>
            <div>
              <span className="font-semibold">Områder:</span> {metadata.omrade.antallOmrader} mikro-områder
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Om Nedre Løkka
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg leading-relaxed">
              Området har en <span className="font-semibold">diversifisert boligbestand</span> og
              tiltrekker seg en <span className="font-semibold">mangfoldig befolkning</span>. I tillegg
              til fastboende, er området kjent for å tiltrekke seg <span className="font-semibold">kreative
              fagfolk, studenter og unge familier</span>, noe som bidrar til et livlig og dynamisk lokalmiljø.
            </p>
            <p className="mt-4">
              Denne analysen aggregerer data fra <span className="font-semibold">6 mikro-områder</span> på
              Nedre Løkka for å gi et helhetlig bilde av området.
            </p>
          </div>
        </div>

        {/* Overview Component */}
        <NedreLokkaOverview />

        {/* Movement Patterns Section */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Bevegelsesmønster</h2>
            <p className="text-gray-600">
              Hvordan folk beveger seg på Nedre Løkka gjennom døgnet og uka.
            </p>
          </div>
          <NedreLokkaBevegelseCharts basePath="/data/main-board/nedre-lokka-omradeprofil" />
        </div>

        {/* Demographics Section */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Folk på Løkka</h2>
            <p className="text-gray-600">
              Demografisk profil av de 1,674 innbyggerne på Nedre Løkka.
            </p>
          </div>
          <NedreLokkaDemografiCharts basePath="/data/main-board/nedre-lokka-omradeprofil" />
        </div>

        {/* Business Section */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Næringsliv og Virksomheter</h2>
            <p className="text-gray-600">
              103 kommersielle virksomheter med samlet omsetning på 967 millioner NOK.
            </p>
          </div>
          <NedreLokkaVirksomheterCharts basePath="/data/main-board/nedre-lokka-omradeprofil" />
        </div>

        {/* Micro-Areas List */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Inkluderte Mikro-områder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metadata.omrade.mikroOmrader.map((omrade, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div className="text-gray-900">{omrade}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Datakilder
          </h3>
          <div className="flex flex-wrap gap-2">
            {metadata.datakilder.map((kilde, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  kilde.includes('mangler')
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {kilde}
              </span>
            ))}
          </div>

          {/* Data Notes */}
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            {Object.entries(metadata.datamerknader).map(([key, note]) => (
              <div key={key} className="flex gap-2">
                <span className="text-gray-500">•</span>
                <span><span className="font-semibold capitalize">{key}:</span> {note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/main-board/analyser"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            ← Tilbake til Analyser
          </Link>
        </div>
      </div>
    </div>
  );
}
