import { getTenant } from '@/config/tenants';
import { notFound } from 'next/navigation';

export default function OmProsjektetPage({
  params,
}: {
  params: { company: string };
}) {
  const tenant = getTenant(params.company);

  if (!tenant || tenant.type !== 'company') {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-lg border border-gray-200 bg-gradient-to-br from-lokka-primary to-lokka-secondary p-8 text-white">
        <h1 className="mb-2 text-4xl font-bold">Om Prosjektet</h1>
        <p className="text-lg text-white/90">
          Natural State Place Analysis
        </p>
      </div>

      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-lokka-primary">
            Om Natural State
          </h2>
          <p className="mb-4 text-gray-700">
            Natural State gir omfattende placeanalyser og
            eiendomsinformasjon for {tenant.name} sin portefølje i
            Grünerløkka-området.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-lokka-primary">
            Samarbeid
          </h2>
          <p className="mb-4 text-gray-700">
            Dette er et samarbeidsprosjekt mellom Natural State, Løkka
            Gårdeierforening og {tenant.name}.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-lokka-primary">
            Tilbakemelding
          </h2>
          <p className="mb-4 text-gray-700">
            Vi setter pris på din tilbakemelding og dine innspill til
            prosjektet.
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
