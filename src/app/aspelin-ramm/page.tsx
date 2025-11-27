import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';


export default function AspelinRammHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lokka-primary to-lokka-secondary py-20 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Aspelin Ramm Vulkan
            </h1>
            <p className="mb-8 text-xl text-white/90">
              Omfattende placeanalyser og eiendomsinformasjon for Aspelin Ramms
              portefølje på Vulkan. Utforsk demografi, markedsdata og
              utviklingstrender for fire bærekraftige eiendommer i
              FutureBuilt-området.
            </p>
            <div className="flex gap-4">
              <Link href="/aspelin-ramm/eiendommer">
                <Button
                  size="lg"
                  className="bg-white text-lokka-primary hover:bg-white/90"
                >
                  Se Eiendommer
                </Button>
              </Link>
              <Link href="/aspelin-ramm/om-prosjektet">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-lokka-primary"
                >
                  Om Prosjektet
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio Hero Image */}
      <section className="relative w-full overflow-hidden bg-gray-100">
        <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
          <Image
            src="/images/companies/aspelin-ramm.webp"
            alt="Vulkan - Aspelin Ramm portefølje"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          <div className="absolute inset-0 flex items-end">
            <Container className="pb-12">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
                Aspelin Ramm Vulkan
              </h2>
              <p className="mt-2 text-xl text-white/90 drop-shadow-md">
                4 eiendommer på Vulkan
              </p>
            </Container>
          </div>
        </div>
      </section>

      {/* Development Notice */}
      <Container className="py-8">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🚧</div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-blue-900">
                Verktøy under utvikling
              </h3>
              <p className="mb-3 text-sm text-blue-800">
                Dette er et analyseverktøy under kontinuerlig utvikling og vil være i prosess og berikelse gjennom hele prosjektet. Vi ønsker dine tilbakemeldinger, spørsmål, potensielle feil du oppdager, eller innsikter du gjerne skulle kikket nærmere på.
              </p>
              <Link
                href="/aspelin-ramm/om-prosjektet#kontakt"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                Send tilbakemelding →
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Properties CTA Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 text-6xl">🏢</div>
            <h2 className="mb-4 text-4xl font-bold text-white">
              Utforsk Våre Eiendommer
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for alle 4 eiendommer i Aspelin Ramm sin portefølje på Vulkan.
            </p>
            <Link href="/aspelin-ramm/eiendommer">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-white/90 shadow-xl text-lg px-8 py-6"
              >
                Se Alle Eiendommer →
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-lokka-primary">
          Hva du finner her
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Placeanalyser</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Detaljerte Plaace-rapporter med demografi, markedsdata og statistikk
                for hver eiendom i Vulkan-området.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Markedsinnsikt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Prisnivåer, leieinntekter, transaksjonsdata og utviklingstrender
                for å forstå det lokale eiendomsmarkedet.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demografisk Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Befolkningssammensetning, inntektsnivå, aldersfordeling og andre
                nøkkeltall for området.
              </p>
            </CardContent>
          </Card>
        </div>


      </Container>
    </>
  );
}
