import Container from "@/components/ui/Container";
import TabbedImageViewer from "@/components/property/TabbedImageViewer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markveien 35 - 5 min Stedsanalyse",
  description:
    "Utvidet stedsanalyse for Markveien 35 med 5 minutters gangavstand - demografi, besøkende, bevegelse, korthandel og konkurransebilde",
};

const screenshots = [
  {
    filnavn: "Nøkkeldata",
    path: "/images/malling-co/plaace/markveien-35/noekkeldata.jpg",
    beskrivelse: "Nøkkeldata for området",
    kategori: "oversikt",
  },
  {
    filnavn: "Demografi",
    path: "/images/malling-co/plaace/markveien-35/demografi.jpg",
    beskrivelse: "Demografisk profil for området",
    kategori: "demografi",
  },
  {
    filnavn: "Besøkende",
    path: "/images/malling-co/plaace/markveien-35/besokende.jpg",
    beskrivelse: "Besøksmønstre og besøkende",
    kategori: "demografi",
  },
  {
    filnavn: "Bevegelse",
    path: "/images/malling-co/plaace/markveien-35/bevegelse.jpg",
    beskrivelse: "Bevegelsesdata for området",
    kategori: "demografi",
  },
  {
    filnavn: "Korthandel",
    path: "/images/malling-co/plaace/markveien-35/korthandel.jpg",
    beskrivelse: "Korthandel og transaksjonsdata",
    kategori: "marked",
  },
  {
    filnavn: "Konkurransebildet",
    path: "/images/malling-co/plaace/markveien-35/konkurransebildet.jpg",
    beskrivelse: "Konkurransebilde og markedsanalyse",
    kategori: "marked",
  },
];

export default function Markveien355MinAnalysePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
          <Image
            src="/images/malling-co/markveien-35-map.png"
            alt="Kart over Markveien 35 område"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-br from-natural-sage/20 to-natural-moss/20 opacity-40 mix-blend-overlay" />

          <Container className="absolute inset-0 flex flex-col justify-between py-8">
            <div>
              <Link
                href="/front-real-estate/eiendommer/markveien-35"
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Tilbake til eiendom
              </Link>
            </div>

            <div>
              <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                5-min Stedsanalyse
              </span>
              <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Markveien 35
              </h1>
              <p className="mb-4 text-lg text-white/90 md:text-xl">
                Grünerløkka Sør - Utvidet dekningsområde (400m radius)
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
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
                  <span>5 minutters gangavstand</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Rapport: 14.11.2025</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <Container className="py-12">
        <section className="mb-16">
          <div className="mb-8 rounded-2xl border-2 border-natural-sage/20 bg-gradient-to-br from-natural-sage/5 to-white p-6 shadow-medium md:p-8">
            <h2 className="mb-4 text-xl font-bold text-lokka-primary">
              Om analysen
            </h2>
            <p className="mb-4 text-sm text-lokka-secondary md:text-base">
              5 minutters gangavstand gir et utvidet perspektiv på området rundt
              Markveien 35, med radius på ca. 400 meter. Analysen dekker et
              større marked og gir innsikt i det bredere næringslivet og
              demografien på Grünerløkka.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-natural-sage/10 p-4">
                <p className="text-sm font-semibold text-natural-forest">
                  Gangeavstand
                </p>
                <p className="text-2xl font-bold text-lokka-primary">
                  5 minutter
                </p>
              </div>
              <div className="rounded-lg bg-natural-sage/10 p-4">
                <p className="text-sm font-semibold text-natural-forest">
                  Radius
                </p>
                <p className="text-2xl font-bold text-lokka-primary">~400m</p>
              </div>
              <div className="rounded-lg bg-natural-sage/10 p-4">
                <p className="text-sm font-semibold text-natural-forest">
                  Datakilde
                </p>
                <p className="text-2xl font-bold text-lokka-primary">
                  Plaace.ai
                </p>
              </div>
            </div>
          </div>
        </section>

        <TabbedImageViewer
          screenshots={screenshots}
          title="5 minutters stedsanalyse"
        />

        <section className="mt-12">
          <div className="rounded-2xl border-2 border-natural-sage/30 bg-gradient-to-br from-natural-sage/5 to-white p-8 shadow-medium">
            <h2 className="mb-6 text-2xl font-bold text-lokka-primary">
              Datakilder
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">
                  Plaace.ai
                </h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p>
                    <strong>Type:</strong> Stedsanalyse og markedsdata
                  </p>
                  <p>
                    <strong>Innhold:</strong> Demografi, besøkende, bevegelse
                  </p>
                  <p>
                    <strong>Oppdatert:</strong> November 2025
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">
                  Analysebutikken / BankAxept
                </h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p>
                    <strong>Type:</strong> Transaksjonsdata
                  </p>
                  <p>
                    <strong>Innhold:</strong> Korthandel, konkurransebilde
                  </p>
                  <p>
                    <strong>Dekning:</strong> Komplett transaksjonsdata
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-natural-sage/10 p-4">
              <p className="text-sm text-natural-forest">
                <strong>Viktig:</strong> Datasettet er kun for intern bruk og
                analyse. Henvis alltid til Plaace.ai og datakilde når dataen
                brukes i grafer eller rapporter.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
