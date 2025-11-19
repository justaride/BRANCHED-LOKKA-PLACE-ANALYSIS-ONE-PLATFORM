import { getTenant } from '@/config/tenants';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function CompanyHomePage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const tenant = getTenant(company);

  if (!tenant || tenant.type !== 'company') {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-12 rounded-lg border border-gray-200 bg-gradient-to-br from-lokka-primary to-lokka-secondary p-12 text-white">
        <h1 className="mb-4 text-4xl font-bold">{tenant.name}</h1>
        <p className="text-xl text-white/90">
          Eiendomsanalyse og porteføljeinformasjon
        </p>
      </section>

      {/* Quick Access */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-lokka-primary">
          Utforsk
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href={`/${company}/eiendommer`}
            className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-lokka-primary hover:shadow-lg"
          >
            <h3 className="mb-2 text-lg font-semibold text-lokka-primary">
              Eiendommer
            </h3>
            <p className="text-gray-600">
              Se oversikt over eiendommer i Løkka-området
            </p>
          </Link>

          <Link
            href={`/${company}/om-prosjektet`}
            className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-lokka-primary hover:shadow-lg"
          >
            <h3 className="mb-2 text-lg font-semibold text-lokka-primary">
              Om Prosjektet
            </h3>
            <p className="text-gray-600">
              Les mer om Natural State Place Analysis
            </p>
          </Link>

          <Link
            href="/main-board"
            className="rounded-lg border border-lokka-secondary bg-lokka-secondary/10 p-6 transition-all hover:border-lokka-secondary hover:shadow-lg"
          >
            <h3 className="mb-2 text-lg font-semibold text-lokka-secondary">
              Områdeanalyse →
            </h3>
            <p className="text-gray-600">
              Se områdeanalyser for hele Grünerløkka
            </p>
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="rounded-lg border border-gray-200 bg-white p-8">
        <h2 className="mb-4 text-2xl font-bold text-lokka-primary">
          Velkommen
        </h2>
        <p className="mb-4 text-gray-700">
          Dette er {tenant.name} sin side i Løkka Gårdeierforening-plattformen.
          Her finner du placeanalyser og eiendomsinformasjon for porteføljen i
          Grünerløkka-området.
        </p>
        <p className="text-gray-700">
          Utført av Natural State i samarbeid med Løkka Gårdeierforening.
        </p>
      </section>
    </div>
  );
}
