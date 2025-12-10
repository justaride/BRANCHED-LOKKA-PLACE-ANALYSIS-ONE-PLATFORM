import Link from 'next/link';
import Image from 'next/image';
import { getCompanyTenants } from '@/config/tenants';
import NaturalStateInfo from '@/components/layout/NaturalStateInfo';

export default function LandingPage() {
  const companies = getCompanyTenants();

  return (
    <div className="min-h-screen bg-gradient-to-br from-lokka-light to-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 py-20" style={{ backgroundColor: '#F3F6F4' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Natural State Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative h-24 w-64">
                <Image
                  src="/images/logos/natural-state.png"
                  alt="Natural State"
                  fill
                  className="object-contain"
                  priority
                  sizes="256px"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold text-lokka-primary md:text-5xl">
              Løkka Gårdeierforening & Natural State
            </h1>
            <p className="mx-auto mb-12 max-w-3xl text-2xl font-light text-gray-700">
              Det finnes bare en Løkka
            </p>
          </div>
        </div>
      </section>

      {/* Main Board Featured Section */}
      <section className="py-16" style={{ backgroundColor: '#F3F6F4' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/main-board"
            className="group block overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all hover:border-lokka-primary hover:shadow-xl"
          >
            <div className="relative h-64 w-full md:h-80">
              <Image
                src="/images/areas/grunerlokka-banner.webp"
                alt="Grünerløkka Områdeanalyse"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-8 md:px-12">
                  <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                    Medlemsportal
                  </div>
                  <h2 className="mb-3 text-4xl font-bold text-white md:text-5xl">
                    Hovedsiden
                  </h2>
                  <p className="mb-6 max-w-2xl text-lg text-white/90 md:text-xl">
                    En plattform for medlemmene i Grünerløkka Gårdeierforening for å forstå utviklingen på Løkka.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-semibold text-lokka-primary transition-all group-hover:bg-lokka-primary group-hover:text-white">
                    Login
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Company Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="mb-8 text-center text-2xl font-bold text-lokka-primary">
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
                'carucel': '/images/companies/carucel/olaf-ryes-plass-4-card.webp',
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
        </div>
      </section>

      {/* Natural State Info */}
      <NaturalStateInfo />

      {/* Feedback Section */}
      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-lokka-primary">
              Tilbakemelding
            </h3>
            <p className="mb-8 text-gray-600">
              Har du kommentarer eller tilbakemeldinger? Vi setter pris på din
              mening.
            </p>
            {process.env.NEXT_PUBLIC_GOOGLE_FORM_URL && (
              <a
                href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border-2 border-lokka-primary px-6 py-3 font-semibold text-lokka-primary transition-all hover:bg-lokka-primary hover:text-white"
              >
                Send tilbakemelding
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-gray-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Løkka Gårdeierforening og Natural
            State. Alle rettigheter reservert.
          </p>
        </div>
      </footer>
    </div>
  );
}
