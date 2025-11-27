// Example: How to use the new årsrapport chart components
// Location: src/app/main-board/analyser/2024-arsrapport/page.tsx

import KonkurransebildeCharts from '@/components/analyser/KonkurransebildeCharts';
import KorthandelCharts from '@/components/analyser/KorthandelCharts';
import BevegelseCharts from '@/components/analyser/BevegelseCharts';

export default function Arsrapport2024Page() {
  // Base path to JSON data files
  const basePath = '/data/main-board/2024-arsrapport';

  return (
    <div className="min-h-screen bg-gradient-to-b from-natural-sage/20 to-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h1 className="mb-4 text-3xl font-bold text-natural-forest md:text-5xl">
            Årsrapport 2024
          </h1>
          <p className="text-lg text-gray-600 md:text-xl">
            Grünerløkka Gårdeierforening - Analyse av konkurransebilde, korthandel og bevegelsesmønstre
          </p>
        </div>

        {/* Konkurransebilde Section */}
        <section className="mb-12 md:mb-20">
          <KonkurransebildeCharts basePath={basePath} />
        </section>

        {/* Korthandel Section */}
        <section className="mb-12 md:mb-20">
          <KorthandelCharts basePath={basePath} />
        </section>

        {/* Bevegelse Section */}
        <section className="mb-12 md:mb-20">
          <BevegelseCharts basePath={basePath} />
        </section>

        {/* Footer/Summary */}
        <div className="mt-16 rounded-xl bg-natural-sage/10 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-natural-forest">
            Sammendrag
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                Konkurransebilde
              </h3>
              <p className="text-2xl font-bold text-natural-forest">
                Stabil utvikling
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Balansert fordeling mellom kjeder og uavhengige virksomheter
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                Korthandel
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                NOK 3.97 mrd
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Total korthandelomsetning i 2024
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                Bevegelse
              </h3>
              <p className="text-2xl font-bold text-teal-600">
                217 000+ besøk
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Daglig gjennomsnittlig besøkende i 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
