import Link from 'next/link';
import Image from 'next/image';
import { getCompanyTenants } from '@/config/tenants';

export default function LandingPage() {
  const companies = getCompanyTenants();

  return (
    <div className="min-h-screen bg-gradient-to-br from-lokka-light to-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold text-lokka-primary">
              Løkka Gårdeierforening
            </h1>
            <h2 className="mb-8 text-3xl font-light text-lokka-secondary">
              og Natural State
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-700">
              Stedsutvikling Grunerløkka
            </p>
          </div>
        </div>
      </section>

      {/* Main Board Featured Section */}
      <section className="py-16">
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
                    Natural State Place Analysis
                  </div>
                  <h2 className="mb-3 text-4xl font-bold text-white md:text-5xl">
                    Områdeanalyser
                  </h2>
                  <p className="mb-6 max-w-2xl text-lg text-white/90 md:text-xl">
                    Omfattende stedsanalyser av Grünerløkka. Utforsk demografi, handel,
                    bevegelsesmønstre og utviklingstrender.
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-semibold text-lokka-primary transition-all group-hover:bg-lokka-primary group-hover:text-white">
                    Se analyser
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
            {companies.map((company) => (
              <Link
                key={company.slug}
                href={`/${company.slug}`}
                className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-lokka-primary hover:shadow-lg"
              >
                <div className="flex h-32 items-center justify-center">
                  <h4 className="text-center text-lg font-semibold text-lokka-primary transition-transform group-hover:scale-105">
                    {company.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
