import { notFound } from "next/navigation";
import { loadEiendom } from "@/lib/loaders/front-real-estate";
import Container from "@/components/ui/Container";
import KeyMetrics from "@/components/property/KeyMetrics";
import EiendomsprofilExpander from "@/components/property/EiendomsprofilExpander";
import BusinessActors from "@/components/property/BusinessActors";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import Image from "next/image";
import { formaterDato } from "@/lib/utils";

export async function generateMetadata() {
  const eiendom = await loadEiendom("markveien-35");

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

export default async function Markveien35Page() {
  const eiendom = await loadEiendom("markveien-35");

  if (!eiendom) {
    notFound();
  }

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

        {/* Analysis Navigation Cards */}
        <section className="mb-12 md:mb-20">
          <FadeIn direction="none">
            <div className="mb-6 md:mb-8">
              <h2 className="mb-2 text-2xl font-bold text-lokka-primary md:mb-4 md:text-3xl">
                Stedsanalyser
              </h2>
              <p className="text-xs text-lokka-secondary md:text-sm">
                Velg analysetype for å se detaljert markedsdata
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 1 Minute Analysis Card */}
            <FadeIn delay={100} direction="up">
              <Link
                href="/front-real-estate/eiendommer/markveien-35/analyse"
                className="group block"
              >
                <div className="h-full rounded-2xl border-2 border-natural-sage/30 bg-gradient-to-br from-natural-sage/5 to-white p-6 shadow-medium transition-all duration-300 hover:border-natural-sage hover:shadow-large md:p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-natural-sage/20">
                      <svg
                        className="h-6 w-6 text-natural-forest"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className="rounded-full bg-natural-sage/20 px-3 py-1 text-xs font-medium text-natural-forest">
                      Interaktiv
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-lokka-primary md:text-2xl">
                    1 minutts gange
                  </h3>
                  <p className="mb-4 text-sm text-lokka-secondary">
                    Hyperlokal analyse av umiddelbar nærhet til eiendommen med
                    interaktive diagrammer og detaljerte data.
                  </p>

                  <div className="mb-6 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-lokka-secondary">
                      <svg
                        className="h-4 w-4 text-natural-sage"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>8,468 daglige besøk</span>
                    </div>
                    <div className="flex items-center gap-2 text-lokka-secondary">
                      <svg
                        className="h-4 w-4 text-natural-sage"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>20+ virksomheter</span>
                    </div>
                    <div className="flex items-center gap-2 text-lokka-secondary">
                      <svg
                        className="h-4 w-4 text-natural-sage"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>NOK 332M omsetning</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-semibold text-natural-forest transition-colors group-hover:text-natural-sage">
                    Se analyse
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* 5 Minute Analysis Card */}
            <FadeIn delay={200} direction="up">
              <Link
                href="/front-real-estate/eiendommer/markveien-35/5min-analyse"
                className="group block"
              >
                <div className="h-full rounded-2xl border-2 border-blue-200/50 bg-gradient-to-br from-blue-50 to-white p-6 shadow-medium transition-all duration-300 hover:border-blue-400 hover:shadow-large md:p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      Plaace Screenshots
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-lokka-primary md:text-2xl">
                    5 minutters gange
                  </h3>
                  <p className="mb-4 text-sm text-lokka-secondary">
                    Utvidet stedsanalyse med større dekningsområde. Visning av
                    Plaace.ai screenshots.
                  </p>

                  <div className="mb-6 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-lokka-secondary">
                      <svg
                        className="h-4 w-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Demografi og befolkning</span>
                    </div>
                    <div className="flex items-center gap-2 text-lokka-secondary">
                      <svg
                        className="h-4 w-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Bevegelse og besøkende</span>
                    </div>
                    <div className="flex items-center gap-2 text-lokka-secondary">
                      <svg
                        className="h-4 w-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Korthandel og konkurranse</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                    Se analyse
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Bare Bygget Analysis Card */}
            <FadeIn delay={300} direction="up">
              <Link
                href="/front-real-estate/eiendommer/markveien-35/bare-bygget"
                className="group block"
              >
                <div className="h-full rounded-2xl border-2 border-rose-200/50 bg-gradient-to-br from-rose-50 to-white p-6 shadow-medium transition-all duration-300 hover:border-rose-400 hover:shadow-large md:p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                      <svg
                        className="h-6 w-6 text-rose-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                      Bygningsnivå
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-lokka-primary md:text-2xl">
                    Bare bygget
                  </h3>
                  <p className="mb-4 text-sm text-lokka-secondary">
                    Analyse på bygningsnivå — det minste granulerte nivået.
                    Markveien 35A/B/C.
                  </p>

                  <div className="mb-6 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-lokka-secondary">
                      <svg
                        className="h-4 w-4 text-rose-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>5 leietakere</span>
                    </div>
                    <div className="flex items-center gap-2 text-lokka-secondary">
                      <svg
                        className="h-4 w-4 text-rose-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>NOK 123M omsetning</span>
                    </div>
                    <div className="flex items-center gap-2 text-lokka-secondary">
                      <svg
                        className="h-4 w-4 text-rose-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>4,685 daglige besøk</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-semibold text-rose-600 transition-colors group-hover:text-rose-700">
                    Se analyse
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
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
