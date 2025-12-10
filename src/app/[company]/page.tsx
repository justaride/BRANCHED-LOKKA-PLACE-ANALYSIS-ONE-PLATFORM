import { getTenant } from '@/config/tenants';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default async function CompanyHomePage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const resolvedParams = await params;
  const { company } = resolvedParams;
  const tenant = getTenant(company);

  if (!tenant || tenant.type !== 'company') {
    notFound();
  }

  // Map slug to image file
  const imageMap: Record<string, string> = {
    'aspelin-ramm': '/images/companies/aspelin-ramm.webp',
    'brodrene-evensen': '/images/companies/brodrene-evensen.webp',
    'eiendomsspar': '/images/companies/eiendomsspar.jpg',
    'malling-co': '/images/companies/malling-co.jpg',
    'maya-eiendom': '/images/companies/maya-eiendom.jpg',
    'roger-vodal': '/images/companies/roger-vodal.jpg',
    'sio': '/images/companies/sio.jpg',
    'spabo': '/images/companies/spabo.jpg',
  };

  const companyImage = imageMap[company];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section with Company Image */}
      <section className="mb-12 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{tenant.name}</h1>
            <p className="text-xl text-gray-600">
              Eiendomsanalyse og porteføljeinformasjon
            </p>
          </div>
          {companyImage && (
            <div className="flex items-center justify-center">
              <div className="relative h-48 w-full overflow-hidden rounded-lg bg-white p-4 md:h-64">
                <Image
                  src={companyImage}
                  alt={tenant.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          )}
        </div>
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
      <section className="mb-8 rounded-lg border border-gray-200 bg-white p-8">
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

      {/* Disclaimer Section with Company Image Above */}
      {companyImage && (
        <section className="mb-8 text-center">
          <div className="mx-auto mb-4 max-w-md">
            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-white p-4 shadow-soft">
              <Image
                src={companyImage}
                alt={tenant.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer Box */}
      <section className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
        <h3 className="mb-3 text-lg font-bold text-yellow-900">
          ⚠️ Verktøy under utvikling
        </h3>
        <p className="text-sm text-yellow-800">
          Denne plattformen er under aktiv utvikling. Noen funksjoner kan være ufullstendige
          eller under testing. Vi jobber kontinuerlig med å forbedre brukeropplevelsen og legge
          til nye analyseverktøy.
        </p>
      </section>
    </div>
  );
}
