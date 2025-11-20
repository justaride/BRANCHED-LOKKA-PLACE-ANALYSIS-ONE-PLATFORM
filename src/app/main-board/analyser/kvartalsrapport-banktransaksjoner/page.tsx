import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import QuarterlyComparisonCharts from '@/components/analyser/QuarterlyComparisonCharts';
import QuarterlyDetailChart from '@/components/analyser/QuarterlyDetailChart';
import QuarterlyInsights from '@/components/analyser/QuarterlyInsights';
import PropertyOwnerAnalysis from '@/components/analyser/PropertyOwnerAnalysis';
import { loadAnalysis } from '@/lib/loaders/place-loader';
import { MainBoardLoaders } from '@/lib/loaders/main-board';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Kvartalsrapport - Banktransaksjoner 2019-2025',
  description: 'Sammenligning av banktransaksjoner per kvartal på Grünerløkka',
};

export default async function KvartalsrapportPage() {
  const analysis = await loadAnalysis('kvartalsrapport-banktransaksjoner');

  if (!analysis) {
    notFound();
  }

  let quarterlyData = null;
  let dailyData = null;

  try {
    quarterlyData = await MainBoardLoaders.loadBanktransaksjoner2019_2025();
  } catch (error) {
    console.error('Could not load quarterly data:', error);
  }

  try {
    dailyData = await MainBoardLoaders.loadDailyTransactions();
  } catch (error) {
    console.error('Could not load daily data:', error);
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative aspect-[21/9] w-full md:aspect-[24/9] lg:aspect-[32/9]">
          {analysis.metadata.heroImage && (
            <Image
              src={analysis.metadata.heroImage}
              alt={analysis.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 via-emerald-600/20 to-teal-600/20 opacity-50 mix-blend-overlay" />

          <Container className="absolute inset-0 flex flex-col justify-between py-6 md:py-8">
            <div>
              <Link
                href="/main-board/analyser"
                className="inline-flex items-center gap-2 text-xs text-white/90 transition-colors hover:text-white md:text-sm"
              >
                <span>←</span> Tilbake til oversikt
              </Link>
            </div>

            <div className="pb-4 md:pb-6">
              <div className="mb-3 md:mb-4">
                <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium backdrop-blur-sm md:text-sm">
                  Kvartalsrapport 2019-2025
                </span>
              </div>
              <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg md:mb-3 md:text-4xl lg:text-5xl">
                {analysis.title}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-white/90 drop-shadow-md md:text-lg">
                {analysis.area.displayName}
              </p>
            </div>
          </Container>
        </div>
      </section>

      <section className="border-b border-gray-200/30 bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-teal-50/30 py-8 md:py-12">
        <Container>
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl font-bold text-natural-forest md:text-3xl">
              Om Analysen
            </h2>
            <p className="mt-2 text-sm text-gray-600 md:text-base">
              {analysis.metadata.notater && analysis.metadata.notater.length > 0
                ? analysis.metadata.notater[0]
                : 'Detaljert analyse av bankhandel-transaksjoner på Grünerløkka fordelt per kvartal fra 2019 til 2025.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:rounded-2xl md:p-6">
              <div className="absolute right-0 top-0 h-2 w-full bg-blue-500" />
              <div className="relative mt-4">
                <div className="mb-2 text-2xl font-bold text-natural-forest md:text-3xl">Q1</div>
                <div className="text-sm text-gray-600">Januar - Mars</div>
                <div className="mt-2 text-xs text-gray-500">Vinter / Tidlig vår</div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:rounded-2xl md:p-6">
              <div className="absolute right-0 top-0 h-2 w-full bg-green-500" />
              <div className="relative mt-4">
                <div className="mb-2 text-2xl font-bold text-natural-forest md:text-3xl">Q2</div>
                <div className="text-sm text-gray-600">April - Juni</div>
                <div className="mt-2 text-xs text-gray-500">Vår / Tidlig sommer</div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:rounded-2xl md:p-6">
              <div className="absolute right-0 top-0 h-2 w-full bg-yellow-500" />
              <div className="relative mt-4">
                <div className="mb-2 text-2xl font-bold text-natural-forest md:text-3xl">Q3</div>
                <div className="text-sm text-gray-600">Juli - September</div>
                <div className="mt-2 text-xs text-gray-500">Sommer / Tidlig høst</div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:rounded-2xl md:p-6">
              <div className="absolute right-0 top-0 h-2 w-full bg-orange-500" />
              <div className="relative mt-4">
                <div className="mb-2 text-2xl font-bold text-natural-forest md:text-3xl">Q4</div>
                <div className="text-sm text-gray-600">Oktober - Desember</div>
                <div className="mt-2 text-xs text-gray-500">Høst / Vinter</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16 lg:py-20">
        {quarterlyData ? (
          <>
            <QuarterlyComparisonCharts quarterlyData={quarterlyData} />

            <div className="mt-20">
              <QuarterlyInsights quarterlyData={quarterlyData} />
            </div>

            <div className="mt-20">
              <PropertyOwnerAnalysis
                quarterlyData={quarterlyData}
                dailyData={dailyData || undefined}
              />
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-lg font-semibold text-red-800">
              Kunne ikke laste kvartalsvise data
            </p>
            <p className="mt-2 text-sm text-red-700">
              Vennligst sjekk at datafilen eksisterer og er riktig formatert.
            </p>
          </div>
        )}

        {dailyData && dailyData.quarters && Object.keys(dailyData.quarters).length > 0 && (
          <div className="mt-16 space-y-16">
            <div>
              <h2 className="mb-8 text-3xl font-bold text-natural-forest">
                Detaljert Daglig Analyse per Kvartal
              </h2>
              <p className="mb-8 text-gray-600">
                Daglige banktransaksjoner fordelt på tre kategorier: Handel, Mat og opplevelser, og Tjenester
              </p>
            </div>

            {Object.entries(dailyData.quarters)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([quarterKey, dailyTransactions]: [string, any]) => {
                const [q, year] = quarterKey.split('_');
                const quarter = parseInt(q?.replace('Q', '') || '0');
                const quarterYear = parseInt(year || '0');

                return (
                  <div key={quarterKey}>
                    <QuarterlyDetailChart
                      quarter={quarter}
                      year={quarterYear}
                      dailyData={dailyTransactions}
                    />
                  </div>
                );
              })}
          </div>
        )}

        {analysis.metadata.notater && analysis.metadata.notater.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h3 className="mb-4 text-xl font-bold text-natural-forest md:text-2xl">
                  Viktige notater
                </h3>
                <ul className="list-disc space-y-3 pl-5 text-gray-700">
                  {analysis.metadata.notater.map((note: string, index: number) => (
                    <li key={index} className="leading-relaxed">
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-500">
          Datakilder: {analysis.plaaceData.datakilder.join(', ')} | Oppdatert:{' '}
          {new Date(analysis.metadata.sistOppdatert).toLocaleDateString('nb-NO')}
        </div>
      </Container>
    </>
  );
}
