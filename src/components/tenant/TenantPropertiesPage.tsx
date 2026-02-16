import Container from '@/components/ui/Container';
import PropertyCard from '@/components/property/PropertyCard';
import type { Eiendom } from '@/types/eiendom';

interface TenantPropertiesPageProps {
  properties: Eiendom[];
  basePath: string;
  headingDescription: string;
  useGradientHeader?: boolean;
}

export default function TenantPropertiesPage({
  properties,
  basePath,
  headingDescription,
  useGradientHeader = false,
}: TenantPropertiesPageProps) {
  return (
    <>
      <section
        className={
          useGradientHeader
            ? 'border-b border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12'
            : 'border-b border-gray-200 bg-gray-50 py-12'
        }
      >
        <Container>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Eiendommer</h1>
          <p className={useGradientHeader ? 'text-lg text-gray-700' : 'text-lg text-gray-600'}>
            {headingDescription}
          </p>
        </Container>
      </section>

      <Container className="py-12">
        {properties.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">
              Ingen eiendommer funnet. Legg til din første eiendom ved å følge instruksjonene i dokumentasjonen.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-lokka-primary">
                {properties.length} eiendom{properties.length !== 1 ? 'mer' : ''}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} basePath={basePath} />
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
