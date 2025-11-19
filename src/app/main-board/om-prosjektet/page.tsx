export default function OmProsjektetPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-lg border border-gray-200 bg-gradient-to-br from-lokka-primary to-lokka-secondary p-8 text-white">
        <h1 className="mb-2 text-4xl font-bold">Om Prosjektet</h1>
        <p className="text-lg text-white/90">
          Stedsutvikling Grünerløkka
        </p>
      </div>

      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-lokka-primary">
            Om Natural State Place Analysis
          </h2>
          <p className="mb-4 text-gray-700">
            Natural State Place Analysis gir omfattende temporale og komparative
            analyser av Grünerløkka, Oslo. Dette er et samarbeidsprosjekt mellom
            Løkka Gårdeierforening og Natural State.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-lokka-primary">
            Formål
          </h2>
          <p className="mb-4 text-gray-700">
            Målet med prosjektet er å gi alle medlemmer av Løkka Gårdeierforening
            tilgang til detaljerte områdeanalyser, demografiske data, mediadekning
            og annen relevant informasjon om Grünerløkka-området.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-lokka-primary">
            Tilbakemelding
          </h2>
          <p className="mb-4 text-gray-700">
            Vi setter pris på din tilbakemelding og dine innspill til prosjektet.
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
        </section>
      </div>
    </div>
  );
}
