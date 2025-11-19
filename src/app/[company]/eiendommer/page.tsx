import { getTenant } from '@/config/tenants';
import { notFound } from 'next/navigation';

export default function EiendommerPage({
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
        <h1 className="mb-2 text-4xl font-bold">Eiendommer</h1>
        <p className="text-lg text-white/90">
          {tenant.name} sin portefølje i Løkka-området
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-8">
        <p className="text-gray-600">
          Eiendommer vil bli tilgjengelig her etter migrering av {tenant.name}{' '}
          sine data.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Denne siden vil inneholde: Eiendomskort, placeanalyser,
          nøkkelinformasjon, bilder og PDF-rapporter for hver eiendom.
        </p>
      </div>
    </div>
  );
}
