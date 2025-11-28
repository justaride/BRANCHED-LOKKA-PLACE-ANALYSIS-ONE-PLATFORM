import Container from '@/components/ui/Container';
import PlaceAnalysisCard from '@/components/place/PlaceAnalysisCard';
import Link from 'next/link';
import { loadAllAnalyses } from '@/lib/loaders/place-loader';

export const metadata = {
  title: 'Analyser',
  description: 'Oversikt over stedsanalyser for Grünerløkka',
};

export default async function AnalyserPage() {
  const analyses = await loadAllAnalyses();

  // Separate analyses into two groups
  const microAreaAnalyses = analyses.filter(a => a.analysisType === 'location-specific');
  const otherAnalyses = analyses.filter(a => a.analysisType !== 'location-specific');

  return (
    <>
      {/* Header Section */}
      <section className="border-b border-gray-200 bg-gradient-to-br from-natural-forest to-natural-sage py-12">
        <Container>
          <Link
            href="/main-board"
            className="mb-4 inline-flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            ← Tilbake til hovedsiden
          </Link>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Stedsanalyser</h1>
          <p className="text-lg text-gray-700">
            Utforsk stedsanalyser for Grünerløkka
          </p>
        </Container>
      </section>

      <Container className="py-12">
        {analyses.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">
              Ingen analyser tilgjengelig ennå. Første analyse kommer snart!
            </p>
          </div>
        ) : (
          <>
            {/* Other Analyses (Reports, Comparisons, Aggregated) */}
            {otherAnalyses.length > 0 && (
              <div className="mb-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-natural-forest">
                    Rapporter og Oversikter
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {otherAnalyses.length} analyse{otherAnalyses.length !== 1 ? 'r' : ''}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {otherAnalyses.map((analysis) => (
                    <PlaceAnalysisCard
                      key={analysis.id}
                      analysis={analysis}
                      basePath="/main-board/analyser"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Separator */}
            {otherAnalyses.length > 0 && microAreaAnalyses.length > 0 && (
              <div className="my-12 border-t-2 border-gray-200"></div>
            )}

            {/* Micro-Area Analyses */}
            {microAreaAnalyses.length > 0 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-natural-forest">
                    Mikro-områder
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {microAreaAnalyses.length} detaljerte stedsanalyser
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {microAreaAnalyses.map((analysis) => (
                    <PlaceAnalysisCard
                      key={analysis.id}
                      analysis={analysis}
                      basePath="/main-board/analyser"
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}
