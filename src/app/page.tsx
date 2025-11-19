import Link from 'next/link';
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

            {/* Main Board CTA */}
            <div className="mb-12">
              <Link
                href="/main-board"
                className="inline-block rounded-lg bg-lokka-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-lokka-secondary hover:shadow-lg"
              >
                Områdeanalyse - Main Board
              </Link>
            </div>
          </div>
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
