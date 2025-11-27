import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';

export default function OmProsjektetPage() {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/om-prosjektet/header-high-res.jpg"
            alt="Grünerløkka kontorlandskap"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-natural-forest/80 mix-blend-multiply" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight">Om Prosjektet</h1>
            <p className="text-xl text-white/90 font-light leading-relaxed">
              Et samarbeid for å skape varig verdi på Grünerløkka gjennom helhetlig stedsanalyse.
            </p>
          </div>
        </Container>
      </section>

      {/* Intro Section */}
      <Container className="py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-natural-forest">
              Natural State Place Analysis
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Natural State Place Analysis gir omfattende temporale og komparative
              analyser av Grünerløkka. Dette verktøyet er utviklet for å gi gårdeiere,
              utviklere og beslutningstakere innsikt i stedets dynamikk.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Gjennom å kartlegge verdiskaping innen natur, menneske, samfunn og marked,
              skaper vi et grunnlag for bærekraftig stedsutvikling.
            </p>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/natural-state/venn-diagram.png"
              alt="Natural State Method"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </Container>

      {/* Holistic Sphere Section */}
      <section className="bg-gray-50 py-24">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-natural-forest">
              Stedets Helhetlige Markedsfære
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Vi analyserer stedet som en helhetlig økosystem der fire dimensjoner samspiller.
            </p>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative h-[500px] w-full">
              <Image
                src="/images/natural-state/sphere-holistic.png"
                alt="Stedets helhetlige marked sfære"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-12">
              <div className="flex gap-6 items-center group">
                <div className="relative h-24 w-24 flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Image src="/images/natural-state/sphere-green.png" alt="Natur" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-natural-forest">Natur</h3>
                  <p className="text-gray-600">
                    Det fysiske grunnlaget og de økologiske rammene for stedet.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-center group">
                <div className="relative h-24 w-24 flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Image src="/images/natural-state/sphere-yellow.png" alt="Menneske" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-natural-forest">Menneske</h3>
                  <p className="text-gray-600">
                    Menneskene som bor, bruker og opplever stedet. Deres behov og adferd.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-center group">
                <div className="relative h-24 w-24 flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Image src="/images/natural-state/sphere-red.png" alt="Samfunn" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-natural-forest">Samfunn</h3>
                  <p className="text-gray-600">
                    De sosiale strukturene, kulturen og fellesskapet som binder stedet sammen.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-center group">
                <div className="relative h-24 w-24 flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                  <Image src="/images/natural-state/sphere-blue.png" alt="Marked" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-natural-forest">Marked</h3>
                  <p className="text-gray-600">
                    Økonomien, næringslivet og verdiskapingen som finner sted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Feedback Section */}
      <Container className="py-24" id="kontakt">
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 text-natural-forest shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-10">
            <Image
              src="/images/om-prosjektet/dj-festival.jpg"
              alt="Gamlebyen Gatefestival"
              fill
              className="object-cover grayscale"
            />
          </div>

          <div className="relative z-10 p-16 text-center">
            <h2 className="mb-6 text-3xl font-bold">
              {process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ? (
                <a
                  href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline decoration-2 underline-offset-8 decoration-natural-forest"
                >
                  Vi ønsker din tilbakemelding
                </a>
              ) : (
                "Vi ønsker din tilbakemelding"
              )}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-700 leading-relaxed font-medium">
              Dette prosjektet er under kontinuerlig utvikling. Dine innspill er verdifulle for oss
              for å gjøre analysene enda mer relevante.
            </p>
            {process.env.NEXT_PUBLIC_GOOGLE_FORM_URL && (
              <a
                href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-natural-forest px-10 py-4 font-bold text-white transition-all hover:bg-natural-forest/90 hover:shadow-lg transform hover:-translate-y-1"
              >
                Send tilbakemelding
              </a>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
