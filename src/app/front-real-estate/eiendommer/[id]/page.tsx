import { notFound } from "next/navigation";
import {
  loadEiendom,
  getAllPropertyIds,
} from "@/lib/loaders/front-real-estate";
import { loadOneMinAnalysisData } from "@/lib/loaders/one-min-loader";
import Container from "@/components/ui/Container";
import AnalyseSelector from "@/components/property/AnalyseSelector";
import KeyMetrics from "@/components/property/KeyMetrics";
import EiendomsprofilExpander from "@/components/property/EiendomsprofilExpander";
import BusinessActors from "@/components/property/BusinessActors";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import Image from "next/image";
import { formaterDato } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const ids = getAllPropertyIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const eiendom = await loadEiendom(id);

  if (!eiendom) {
    return {
      title: "Eiendom ikke funnet",
    };
  }

  return {
    title: `${eiendom.adresse} - Front Real Estate`,
    description: eiendom.beskrivelse || `Placeanalyse for ${eiendom.adresse}`,
  };
}

export default async function FrontRealEstateEiendomPage({
  params,
}: PageProps) {
  const { id } = await params;
  const eiendom = await loadEiendom(id);

  if (!eiendom) {
    notFound();
  }

  // Load 1-minute analysis data if available
  const oneMinData = await loadOneMinAnalysisData("front-real-estate", id);

  // Calculate metrics from næringsaktører data
  const totalRevenue =
    eiendom.naringsaktorer?.actors?.reduce(
      (sum, actor) => sum + (actor.omsetning || 0),
      0,
    ) || 0;

  const totalActors = eiendom.naringsaktorer?.metadata?.totalActors || 0;

  const topCategory = eiendom.naringsaktorer?.categoryStats
    ? Object.entries(eiendom.naringsaktorer.categoryStats).sort(
        (a, b) => b[1].count - a[1].count,
      )[0]?.[0] || ""
    : "";

  return (
    <>
      {/* Header Section with Image */}
      <section className="border-b border-gray-200 bg-gray-50 py-8 md:py-16">
        <Container>
          <FadeIn direction="down">
            <div className="mb-4 md:mb-6">
              <Link
                href="/front-real-estate/eiendommer"
                className="inline-flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-gray-900 md:text-sm"
              >
                <span>←</span> Tilbake til oversikt
              </Link>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            {/* Text Content */}
            <div className="flex-1">
              <FadeIn delay={100} direction="up">
                <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:mb-6 md:text-5xl lg:text-6xl">
                  {eiendom.adresse}
                </h1>
              </FadeIn>
              {eiendom.beskrivelse && (
                <FadeIn delay={200} direction="up">
                  <p className="mb-4 max-w-3xl text-sm leading-relaxed text-gray-600 md:mb-6 md:text-lg lg:text-xl">
                    {eiendom.beskrivelse}
                  </p>
                </FadeIn>
              )}
              <FadeIn delay={300} direction="up">
                <div className="flex flex-wrap gap-2 text-xs md:gap-3 md:text-sm">
                  {eiendom.gnr && eiendom.bnr && (
                    <div className="rounded-lg bg-gray-200 px-3 py-1.5 text-gray-700 md:px-4 md:py-2">
                      <span className="font-semibold">Gnr/Bnr:</span>{" "}
                      {eiendom.gnr}/{eiendom.bnr}
                    </div>
                  )}
                  <div className="rounded-lg bg-gray-200 px-3 py-1.5 text-gray-700 md:px-4 md:py-2">
                    <span className="font-semibold">Rapport:</span>{" "}
                    {formaterDato(eiendom.plaaceData.rapportDato)}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Property Image */}
            {eiendom.heroImage && (
              <FadeIn delay={400} direction="right">
                <div className="flex-shrink-0">
                  <div className="relative h-48 w-48 overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-200 md:h-64 md:w-64 lg:h-72 lg:w-72">
                    <Image
                      src={eiendom.heroImage}
                      alt={eiendom.adresse}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      quality={85}
                    />
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </Container>
      </section>

      {/* Key Metrics Section */}
      <KeyMetrics
        energyRating={eiendom.plaaceData.nokkeldata?.energimerke}
        buildingArea={eiendom.plaaceData.nokkeldata?.areal}
        totalRevenue={totalRevenue}
        totalActors={totalActors}
        topCategory={topCategory}
      />

      {/* Location Section */}
      {(eiendom.mapImage || eiendom.coordinates) && (
        <section className="border-b border-gray-200/30 bg-white py-8 md:py-16">
          <Container>
            <h2 className="mb-6 text-2xl font-bold text-lokka-primary md:mb-8 md:text-3xl">
              Beliggenhet
            </h2>

            {/* Google Maps - Primary, Full Width with Satellite View */}
            {eiendom.coordinates && (
              <div className="mb-6 h-[300px] overflow-hidden rounded-xl shadow-medium md:mb-8 md:h-[400px] md:rounded-2xl">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${eiendom.coordinates.lat},${eiendom.coordinates.lng}&zoom=18&maptype=satellite`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Google Maps - ${eiendom.adresse}`}
                />
              </div>
            )}

            {/* Area Map - Secondary, Smaller */}
            {eiendom.mapImage && (
              <div className="grid gap-4 md:gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="relative h-[200px] overflow-hidden rounded-xl shadow-medium md:h-[250px] md:rounded-2xl">
                    <Image
                      src={eiendom.mapImage}
                      alt={`Kartuttak ${eiendom.adresse}`}
                      fill
                      className="object-contain"
                      quality={80}
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center text-xs text-lokka-secondary md:mt-3 md:text-sm">
                    Kartuttak fra området
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className="rounded-xl border border-gray-200/50 bg-lokka-light/30 p-4 md:rounded-2xl md:p-6">
                    <h3 className="mb-2 text-base font-bold text-lokka-primary md:mb-3 md:text-lg">
                      Om beliggenheten
                    </h3>
                    <p className="text-xs leading-relaxed text-lokka-secondary md:text-sm">
                      Eiendom på Grünerløkka med god tilgang til
                      kollektivtransport, handel og byens fasiliteter. Området
                      preges av høy aktivitet, urbant liv og et mangfoldig
                      lokalmiljø.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Main Content */}
      <Container className="py-8 md:py-16 lg:py-20">
        {/* Expandable Eiendomsprofil */}
        {eiendom.tilleggsinfo?.historikk && (
          <EiendomsprofilExpander
            historikk={eiendom.tilleggsinfo.historikk}
            adresse={eiendom.adresse}
          />
        )}

        {/* Plaace Analytics */}
        <AnalyseSelector
          plaaceData={eiendom.plaaceData}
          oneMinData={oneMinData}
          propertyName={eiendom.adresse}
        />
      </Container>

      {/* Business Actors Section */}
      {eiendom.naringsaktorer && (
        <BusinessActors
          actors={eiendom.naringsaktorer.actors}
          categoryStats={eiendom.naringsaktorer.categoryStats}
          metadata={eiendom.naringsaktorer.metadata}
        />
      )}
    </>
  );
}
