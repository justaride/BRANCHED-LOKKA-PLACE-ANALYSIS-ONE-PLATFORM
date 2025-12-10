import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import NaturalStateCard from '@/components/ui/NaturalStateCard';

export default function CarucelHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <Image
                src="/images/companies/carucel/logo.png"
                alt="Carucel Logo"
                width={80}
                height={80}
                className="rounded-lg bg-white p-2 shadow-sm"
              />
              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                Carucel
              </h1>
            </div>
            <p className="mb-8 text-xl text-gray-600">
              Omfattende 1-minutts gangavstand analyse for Olaf Ryes plass 4 på Grünerløkka.
              Utforsk hyperlokal demografi, bevegelsesmønster, korthandel og konkurransebilde
              i Oslos mest levende bydel.
            </p>
            <div className="flex gap-4">
              <Link href="/carucel/eiendommer">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  Se Eiendomsanalyse
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
            src="/images/companies/carucel/olaf-ryes-plass-4-omradebildet.png"
            alt="Olaf Ryes plass - Carucel eiendomsportefølje"
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
                Olaf Ryes Plass 4
              </h2>
              <p className="mt-2 text-xl text-white/90 drop-shadow-md">
                1 minutts gangavstand analyse - Grünerløkka, Oslo
              </p>
            </Container>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <Container className="py-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-lokka-primary">
          Nøkkeltall fra analysen
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-lokka-primary">616</div>
              <div className="mt-2 text-sm text-gray-600">Innbyggere</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-lokka-primary">3 495</div>
              <div className="mt-2 text-sm text-gray-600">Daglige besøkende</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-lokka-primary">21</div>
              <div className="mt-2 text-sm text-gray-600">Næringsaktører</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-lokka-primary">236M</div>
              <div className="mt-2 text-sm text-gray-600">Total omsetning (NOK)</div>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* Development Notice */}
      <Container className="py-8">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔬</div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-blue-900">
                1-minutts gangavstand analyse
              </h3>
              <p className="mb-3 text-sm text-blue-800">
                Denne rapporten fokuserer på det hyperlokale området rundt Olaf Ryes plass 4
                - ca. 80 meters radius. Data inkluderer demografi, bevegelsesmønster, korthandel,
                konkurransebilde og aktørkartlegging fra Plaace, BankAxept, Telia og SSB.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Properties CTA Section */}
      <section className="border-y border-gray-200 bg-gray-50 py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Utforsk Eiendomsanalysen
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Se detaljerte visualiseringer av demografi, bevegelse, korthandel og konkurransebilde
              for Olaf Ryes plass 4.
            </p>
            <Link href="/carucel/eiendommer/olaf-ryes-plass-4">
              <Button
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800 text-lg px-8 py-6"
              >
                Se Full Analyse →
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-lokka-primary">
          Hva analysen inneholder
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Demografi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Aldersfordeling, inntektsnivå, husholdningstyper og befolkningsutvikling
                for området rundt eiendommen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bevegelsesmønster</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Besøkende per time og ukedag, hvor de kommer fra geografisk,
                og internasjonale besøkende per kvartal.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Konkurransebilde</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Konseptmiks, kjeder vs. uavhengige, over-/underindeks
                sammenlignet med Oslo kommune.
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
