import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import NaturalStateCard from '@/components/ui/NaturalStateCard';

export default function SpaboHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lokka-primary to-lokka-secondary py-20 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              SPABO Eiendom
            </h1>
            <p className="mb-8 text-xl text-white/90">
              Omfattende placeanalyser og eiendomsinformasjon for SPABO Eiendoms
              portefølje på Grünerløkka. Utforsk demografi, markedsdata og
              utviklingstrender for fem eiendommer i området.
            </p>
            <div className="flex gap-4">
              <Link href="/spabo/eiendommer">
                <Button
                  size="lg"
                  className="bg-white text-lokka-primary hover:bg-white/90"
                >
                  Se Eiendommer
                </Button>
              </Link>
              <Link href="/spabo/om-prosjektet">
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
            src="/images/companies/spabo.jpg"
            alt="Grünerløkka område - SPABO Eiendom portefølje"
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-end">
            <Container className="pb-12">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
                SPABO Eiendom
              </h2>
              <p className="mt-2 text-xl text-white/90 drop-shadow-md">
                22 eiendommer på Grünerløkka
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
                href="/spabo/om-prosjektet#kontakt"
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
              Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for alle 22 eiendommer i SPABO sin portefølje på Grünerløkka.
            </p>
            <Link href="/spabo/eiendommer">
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
                for hver eiendom i porteføljen.
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
                for å forstå det lokale boligmarkedet.
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

        {/* Natural State Card */}
        <div className="mt-12">
          <NaturalStateCard />
        </div>
      </Container>
    </>
  );
}
