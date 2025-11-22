import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function MainBoardPage() {
  return (
    <>
      {/* Hero Section with Banner */}
      <section className="relative overflow-hidden">
        {/* Background Banner Image */}
        <div className="relative h-[500px] w-full">
          <Image
            src="/images/areas/grunerlokka-banner.webp"
            alt="Grünerløkka"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <Container className="relative z-10">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src="/images/branding/ns-logo.webp"
                  alt="Natural State"
                  width={64}
                  height={64}
                  className="h-16 w-auto"
                />
                <div className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  Natural State Place Analysis 2025
                </div>
              </div>
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white">
                Grünerløkka i Forandring
              </h1>
              <p className="mb-8 text-xl text-white/90">
                Omfattende stedsanalyser av Grünerløkka gjennom hele 2025.
                Utforsk månedlige utviklingstrender, analyser hendelsers innvirkning,
                og følg mediadekningen av området.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/main-board/analyser">
                  <Button
                    size="lg"
                    className="bg-white text-natural-forest hover:bg-white/90"
                  >
                    Utforsk Analyser
                  </Button>
                </Link>
                <Link href="/main-board/om-prosjektet">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-natural-forest"
                  >
                    Om Prosjektet
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
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
                Dette er et analyseverktøy under kontinuerlig utvikling og vil være i prosess og berikelse gjennom hele 2025. Vi ønsker dine tilbakemeldinger, spørsmål, potensielle feil du oppdager, eller innsikter du gjerne skulle kikket nærmere på.
              </p>
              <Link
                href="/main-board/om-prosjektet#kontakt"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                Send tilbakemelding →
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Features Section */}
      <Container className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-natural-forest">
          Hva du finner her
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="mb-3 text-4xl">📊</div>
              <CardTitle>Månedlige Analyser</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Detaljerte stedsanalyser måned for måned. Følg demografi,
                handel, bevegelsesmønstre og utviklingstrender gjennom hele året.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="mb-3 text-4xl">📈</div>
              <CardTitle>Kvartalsrapporter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Sammenlign banktransaksjoner per kvartal fra 2019-2025.
                Følg trender, se sesongvariasjoner og YoY-vekst.
              </p>
              <Link href="/main-board/analyser/kvartalsrapport-banktransaksjoner" className="mt-2 inline-block text-sm text-natural-sage hover:underline">
                Se kvartalsrapport →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="mb-3 text-4xl">📅</div>
              <CardTitle>Hendelsesanalyse</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Utforsk hvordan festivaler, åpninger, byggprosjekter og andre
                hendelser påvirker området. Før/etter-analyser og effektmålinger.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>


      {/* CTA Section */}
      <Container className="py-16">
        <div className="rounded-2xl bg-gradient-to-r from-natural-forest to-natural-sage p-12 text-white text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Klar til å utforske?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Dykk inn i de månedlige analysene og se hvordan Grünerløkka utvikler seg gjennom året.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/main-board/analyser">
              <Button size="lg" variant="primary">
                Se Analyser
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Natural State Preview & Social Media Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-4xl font-bold text-natural-forest">
              Natural State
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Utforsk vår nettside og følg oss på sosiale medier for de siste oppdateringene om stedsanalyse og urban utvikling
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Website Preview - 3/5 width */}
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-r from-natural-forest to-natural-sage p-5 text-white">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="h-3.5 w-3.5 rounded-full bg-white/30"></div>
                      <div className="h-3.5 w-3.5 rounded-full bg-white/30"></div>
                      <div className="h-3.5 w-3.5 rounded-full bg-white/30"></div>
                    </div>
                    <div className="flex-1 rounded-lg bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur">
                      🌐 naturalstate.no
                    </div>
                  </div>
                </div>
                <div className="relative h-[600px] bg-white">
                  <iframe
                    src="https://naturalstate.no"
                    className="h-full w-full border-0"
                    title="Natural State Website"
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                  />
                </div>
                <div className="bg-gray-100 p-5 text-center">
                  <a
                    href="https://naturalstate.no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base font-semibold text-natural-forest transition-colors hover:text-natural-sage"
                  >
                    Besøk naturalstate.no
                    <span className="text-xl">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links - 2/5 width */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl bg-white p-8 shadow-large">
                <h3 className="mb-8 text-2xl font-bold text-natural-forest">
                  Følg oss
                </h3>
                <div className="space-y-5">
                  {/* LinkedIn */}
                  <a
                    href="https://no.linkedin.com/company/naturalstate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 p-5 transition-all hover:border-natural-forest hover:shadow-medium"
                  >
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A66C2] text-white shadow-soft">
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900 group-hover:text-natural-forest">LinkedIn</div>
                      <div className="text-sm text-gray-600">Følg våre oppdateringer</div>
                    </div>
                    <span className="text-xl text-gray-400 transition-transform group-hover:translate-x-1">→</span>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/newnaturalstate/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 p-5 transition-all hover:border-natural-forest hover:shadow-medium"
                  >
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white shadow-soft">
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900 group-hover:text-natural-forest">Instagram</div>
                      <div className="text-sm text-gray-600">Se våre prosjekter</div>
                    </div>
                    <span className="text-xl text-gray-400 transition-transform group-hover:translate-x-1">→</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/naturalstateas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 p-5 transition-all hover:border-natural-forest hover:shadow-medium"
                  >
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-soft">
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900 group-hover:text-natural-forest">Facebook</div>
                      <div className="text-sm text-gray-600">Bli med i vårt samfunn</div>
                    </div>
                    <span className="text-xl text-gray-400 transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-natural-forest to-natural-sage p-8 text-white shadow-large">
                <h4 className="mb-4 text-xl font-bold">Kontakt oss</h4>
                <p className="mb-6 text-base text-white/90">
                  Har du spørsmål om våre analyser eller ønsker samarbeid?
                </p>
                <a
                  href="mailto:kontakt@naturalstate.no"
                  className="inline-flex items-center gap-2 text-base font-semibold text-white transition-all hover:gap-3 hover:underline"
                >
                  kontakt@naturalstate.no
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
