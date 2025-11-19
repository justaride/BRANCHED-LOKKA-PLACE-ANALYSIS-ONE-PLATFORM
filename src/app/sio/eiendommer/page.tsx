import Container from '@/components/ui/Container';
import PropertyCard from '@/components/property/PropertyCard';
import { loadAllEiendommer } from '@/lib/loaders/sio';

export const metadata = {
  title: 'SiO Studentboliger',
  description: 'Oversikt over SiOs studentboliger på Grünerløkka',
};

export default async function SioEiendommerPage() {
  const eiendommer = await loadAllEiendommer();

  return (
    <>
      {/* Header Section */}
      <section className="border-b border-gray-200 bg-gradient-to-br from-lokka-primary to-lokka-secondary py-12 text-white">
        <Container>
          <h1 className="mb-4 text-4xl font-bold">Eiendommer</h1>
          <p className="text-lg text-white/90">
            Utforsk placeanalyser og eiendomsinformasjon for SiOs
            studentboliger på Grünerløkka
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
                  basePath="/sio"
                />
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
