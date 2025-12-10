import Container from '@/components/ui/Container';
import PropertyCard from '@/components/property/PropertyCard';
import { loadAllEiendommer } from '@/lib/loaders/front-real-estate';

export const metadata = {
  title: 'Front Real Estate Eiendommer',
  description: 'Oversikt over Front Real Estate sine eiendommer på Grünerløkka',
};

export default async function FrontRealEstateEiendommerPage() {
  const eiendommer = await loadAllEiendommer();

  return (
    <>
      {/* Header Section */}
      <section className="border-b border-gray-200 bg-gray-50 py-12">
        <Container>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Eiendommer</h1>
          <p className="text-lg text-gray-600">
            Utforsk placeanalyser og eiendomsinformasjon for Front Real Estate sin
            portefølje på Grünerløkka
          </p>
        </Container>
      </section>

      {/* Properties Grid */}
      <Container className="py-12">
        {eiendommer.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">
              Ingen eiendommer funnet. Legg til din første eiendom ved å følge
              instruksjonene i dokumentasjonen.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-lokka-primary">
                {eiendommer.length} eiendom{eiendommer.length !== 1 ? 'mer' : ''}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eiendommer.map((eiendom) => (
                <PropertyCard
                  key={eiendom.id}
                  property={eiendom}
                  basePath="/front-real-estate"
                />
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
