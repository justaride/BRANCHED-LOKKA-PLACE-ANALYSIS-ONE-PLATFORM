import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import NaturalStateInfo from '@/components/layout/NaturalStateInfo';
import { getCompanyTenants } from '@/config/tenants';

export default function MainBoardPage() {
  const companies = getCompanyTenants();
  return (
    <>
      {/* Hero Section with Banner */}
      <section className="relative overflow-hidden">
        {/* Background Banner Image */}
        <div className="relative h-[500px] w-full">
          <Image
            src="/images/areas/grunerlokka-banner.webp"
            alt="Grünerløkka"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <Container className="relative z-10">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src="/images/branding/ns-logo.webp"
                  alt="Natural State"
                  width={64}
                  height={64}
                  className="h-16 w-auto"
                />
                <div className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  Natural State Place Analysis 2025
                </div>
              </div>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white">
                Grünerløkka i Forandring
              </h1>
              <p className="mb-8 text-xl text-white/90">
                Omfattende stedsanalyser av Grünerløkka gjennom hele 2025.
                Utforsk månedlige utviklingstrender, analyser hendelsers innvirkning,
                og følg mediadekningen av området.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/main-board/analyser">
                  <Button
                    size="lg"
                    className="bg-white text-natural-forest hover:bg-white/90"
                  >
                    Utforsk Analyser
                  </Button>
                </Link>
                <Link href="/main-board/om-prosjektet">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-natural-forest"
                  >
                    Om Prosjektet
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Development Notice */}
      <Container className="py-8">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">

            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-blue-900">
                Verktøy under utvikling
              </h3>
              <p className="mb-3 text-sm text-blue-800">
                Dette er et analyseverktøy under kontinuerlig utvikling og vil være i prosess og berikelse gjennom hele 2025. Vi ønsker dine tilbakemeldinger, spørsmål, potensielle feil du oppdager, eller innsikter du gjerne skulle kikket nærmere på.
              </p>
              <Link
                href="/main-board/om-prosjektet#kontakt"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                Send tilbakemelding →
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Navigation Boxes */}
      <Container className="pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Utforsk Analyser - Larger (2 columns) */}
          <Link
            href="/main-board/analyser"
            className="group relative h-80 overflow-hidden rounded-2xl shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl md:col-span-2"
          >
            <Image
              src="/images/navigation/analyser-bg.jpg"
              alt="Utforsk Analyser"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" />

            <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
              <h3 className="mb-2 text-4xl font-bold drop-shadow-md">Utforsk Analyser</h3>
              <p className="mb-6 max-w-lg text-lg text-white/90 drop-shadow-sm">
                Gå til oversikten over månedlige analyser, statistikk og innsikt for Grünerløkka.
              </p>
              <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/20 px-5 py-3 text-lg font-semibold backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-natural-forest">
                Gå til analyser →
              </div>
            </div>
          </Link>

          {/* Om Prosjektet - Smaller (1 column) */}
          <Link
            href="/main-board/om-prosjektet"
            className="group relative h-80 overflow-hidden rounded-2xl shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            <Image
              src="/images/navigation/om-prosjektet-bg.jpg"
              alt="Om Prosjektet"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" />

            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
              <h3 className="mb-2 text-2xl font-bold drop-shadow-md">Om Prosjektet</h3>
              <p className="mb-4 text-sm text-white/90 drop-shadow-sm">
                Les mer om bakgrunnen for prosjektet og metoden vår.
              </p>
              <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-semibold backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-natural-forest">
                Les mer →
              </div>
            </div>
          </Link>
        </div>

        {/* Løkka Biblioteket - Hidden for now */}
        {/*
        <div className="mt-6">
          <Link
            href="/main-board/biblioteket"
            className="group relative block h-[400px] overflow-hidden rounded-2xl shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl"
          >
            <Image
              src="/images/areas/lokka-biblioteket.jpg"
              alt="Løkka Biblioteket"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: 'center 40%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-natural-forest/90 via-natural-forest/60 to-transparent transition-opacity duration-300 group-hover:from-natural-forest/95" />

            <div className="relative z-10 flex h-full flex-col justify-center p-8 text-white md:p-12">
              <div className="max-w-2xl">
                <h3 className="mb-4 text-4xl font-bold drop-shadow-md">Løkka Biblioteket</h3>
                <p className="mb-8 text-xl text-white/90 drop-shadow-sm">
                  Få tilgang til en omfattende samling av dokumenter, rapporter og ressurser.
                  Din kunnskapsbank for utviklingen på Grünerløkka.
                </p>
                <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/20 px-6 py-3 text-lg font-semibold backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-natural-forest">
                  Gå til biblioteket →
                </div>
              </div>
            </div>
          </Link>
        </div>
        */}
      </Container>

      {/* Features Section */}
      <Container className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-natural-forest">
          Hva du finner her
        </h2>
        <div className="grid gap-8 md:grid-cols-3">

          {/* Market Reports & Economy */}
          <div className="group relative h-[400px] overflow-hidden rounded-2xl shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
            <Image
              src="/images/features/okonomi.jpg"
              alt="Markedsrapporter & Økonomi"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/50" />

            <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">

              <h3 className="mb-3 text-2xl font-bold drop-shadow-md">Markedsrapporter & Økonomi</h3>
              <p className="mb-6 text-white/90 drop-shadow-sm">
                Følg den økonomiske utviklingen med kvartalsvise banktransaksjonsdata og årlige markedsrapporter.
              </p>
              <Link
                href="/main-board/analyser/kvartalsrapport-banktransaksjoner"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-semibold backdrop-blur-sm transition-colors hover:bg-white hover:text-natural-forest"
              >
                Se kvartalsrapporter →
              </Link>
            </div>
          </div>

          {/* Area Profiles & Demographics */}
          <div className="group relative h-[400px] overflow-hidden rounded-2xl shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
            <Image
              src="/images/features/demografi.jpg"
              alt="Områdeprofiler & Demografi"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/50" />

            <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">

              <h3 className="mb-3 text-2xl font-bold drop-shadow-md">Områdeprofiler & Demografi</h3>
              <p className="mb-6 text-white/90 drop-shadow-sm">
                Dypdykk i hvem som bor og bruker området. Se befolkningsutvikling og detaljerte områdeprofiler.
              </p>
              <Link
                href="/main-board/analyser/demografi-2017-2023"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-semibold backdrop-blur-sm transition-colors hover:bg-white hover:text-natural-forest"
              >
                Se demografidata →
              </Link>
            </div>
          </div>

          {/* City Life & Movement */}
          <div className="group relative h-[400px] overflow-hidden rounded-2xl shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
            <Image
              src="/images/features/byliv.jpg"
              alt="Byliv & Bevegelse"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/50" />

            <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">

              <h3 className="mb-3 text-2xl font-bold drop-shadow-md">Byliv & Bevegelse</h3>
              <p className="mb-6 text-white/90 drop-shadow-sm">
                Utforsk bevegelsesmønstre på sentrale lokasjoner. Se hvordan folk beveger seg gjennom døgnet.
              </p>
              <Link
                href="/main-board/analyser/nedre-lokka-dashboard"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-semibold backdrop-blur-sm transition-colors hover:bg-white hover:text-natural-forest"
              >
                Se bevegelsesdata →
              </Link>
            </div>
          </div>

        </div>
      </Container>


      {/* Company Grid */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h3 className="mb-8 text-center text-2xl font-bold text-natural-forest">
            Eiendomsanalyser
          </h3>
          <p className="mb-12 text-center text-gray-600">
            Velg din eiendomsaktør for å se placeanalyser og porteføljeinformasjon
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {companies.map((company) => {
              // Map slug to image file
              const imageMap: Record<string, string> = {
                'aspelin-ramm': '/images/companies/aspelin-ramm.webp',
                'brodrene-evensen': '/images/companies/brodrene-evensen.webp',
                'eiendomsspar': '/images/companies/eiendomsspar.jpg',
                'front-real-estate': '/images/companies/malling-co.jpg', // Using existing image for now
                'maya-eiendom': '/images/companies/maya-eiendom.jpg',
                'roger-vodal': '/images/companies/roger-vodal.jpg',
                'sio': '/images/companies/sio.jpg',
                'spabo': '/images/companies/spabo.jpg',
              };

              return (
                <Link
                  key={company.slug}
                  href={`/${company.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {imageMap[company.slug] ? (
                      <Image
                        src={imageMap[company.slug]}
                        alt={company.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                        <span>Ingen bilde</span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-xl font-bold text-white drop-shadow-md">
                      {company.name}
                    </h4>
                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
                      <span>Utforsk portefølje</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Natural State Info */}
      <NaturalStateInfo />

      {/* CTA Section */}
      <Container className="py-16">
        <div className="rounded-2xl bg-gradient-to-r from-natural-forest to-natural-sage p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Klar til å utforske?
          </h2>
          <p className="mb-8 text-lg text-gray-700">
            Dykk inn i de månedlige analysene og se hvordan Grünerløkka utvikler seg gjennom året.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/main-board/analyser">
              <Button size="lg" variant="primary">
                Se Analyser
              </Button>
            </Link>
          </div>
        </div>
      </Container>


    </>
  );
}
