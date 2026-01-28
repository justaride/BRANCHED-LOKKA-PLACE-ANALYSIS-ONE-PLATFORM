import Container from "@/components/ui/Container";
import ExpandableImage from "@/components/ui/ExpandableImage";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AktorOversikt from "@/components/analyser/AktorOversikt";
import aktorData from "@/data/main-board/aktorer/markveien-35.json";

export const metadata: Metadata = {
  title: "Markveien 35 - Stedsanalyse",
  description:
    "Komplett markedsanalyse for Markveien 35 med demografi, besøkende, virksomheter og omsetning",
};

export default function Markveien35AnalysePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
          <Image
            src="/images/malling-co/markveien-35-map.png"
            alt="Kart over Markveien 35 område"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-br from-natural-sage/20 to-natural-moss/20 opacity-40 mix-blend-overlay" />

          <Container className="absolute inset-0 flex flex-col justify-between py-8">
            <div>
              <Link
                href="/front-real-estate/eiendommer/markveien-35"
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Tilbake til eiendom
              </Link>
            </div>

            <div>
              <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                1-min Stedsanalyse
              </span>
              <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Markveien 35
              </h1>
              <p className="mb-4 text-lg text-white/90 md:text-xl">
                Grünerløkka Sør - Birkelunden (0.019 km²)
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>20+ virksomheter</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Periode: 01.10.2025 – 31.12.2025</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <Container className="py-12">
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-lokka-primary">
            Nøkkeltall - Oversikt
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border-2 border-natural-sage/20 bg-gradient-to-br from-natural-sage/5 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                  Daglige Besøk
                </h3>
                <svg
                  className="h-8 w-8 text-natural-sage"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-4xl font-bold text-lokka-primary">
                8,468
              </p>
              <p className="text-sm text-lokka-secondary">Gj.snitt per dag</p>
              <div className="mt-4 text-xs text-natural-forest/60">
                <p>65,750 besøk per km²</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-blue-200/50 bg-gradient-to-br from-blue-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-900/70">
                  Daglig Korthandel
                </h3>
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-4xl font-bold text-blue-900">NOK 2.6M</p>
              <p className="text-sm text-blue-700">Per dag</p>
              <div className="mt-4 text-xs text-blue-600">
                <p>Total: NOK 233M for perioden</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-purple-200/50 bg-gradient-to-br from-purple-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                  Travleste Dag
                </h3>
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <p className="mb-2 text-3xl font-bold text-purple-900">Lørdag</p>
              <p className="text-sm text-purple-700">18% av ukesbesøk</p>
              <div className="mt-4 text-xs text-purple-600">
                <p>6,456 besøkende på lørdager</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-amber-200/50 bg-gradient-to-br from-amber-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                  Total Omsetning
                </h3>
                <svg
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-4xl font-bold text-amber-900">NOK 332M</p>
              <p className="text-sm text-amber-700">Estimert årlig</p>
              <div className="mt-4 text-xs text-amber-600">
                <p>+11% vekst</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-10 border-l-4 border-natural-sage pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              1. Demografi
            </h2>
            <p className="text-lg text-lokka-secondary">
              Befolkningsdata og områdeinformasjon
            </p>
          </div>

          <div className="mb-8">
            <ExpandableImage
              src="/images/malling-co/markveien-35-map.png"
              alt="Detaljert lokasjonskart - Markveien 35"
              width={1200}
              height={800}
              borderColor="natural-sage"
              bgColor="natural-sage/10"
              quality={80}
              caption={
                <p className="text-sm text-lokka-secondary">
                  <strong>Lokasjonskart:</strong> Markveien 35 ligger sentralt
                  på Grünerløkka, ved Birkelunden med gangavstand til Thorvald
                  Meyers gate og Olaf Ryes plass.
                </p>
              }
            />
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Befolkning
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">499</p>
              <p className="text-sm text-lokka-secondary">Innbyggere (2024)</p>
            </div>

            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Befolkningstetthet
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">
                25,868
              </p>
              <p className="text-sm text-lokka-secondary">Per km²</p>
            </div>

            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Områdestørrelse
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">
                0.019
              </p>
              <p className="text-sm text-lokka-secondary">km²</p>
            </div>

            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Endring
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">
                -1.0%
              </p>
              <p className="text-sm text-lokka-secondary">Fra 2023</p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Husholdninger
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-2xl font-bold text-blue-900">158</p>
                <p className="text-sm text-blue-700">Aleneboende</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-2xl font-bold text-purple-900">53</p>
                <p className="text-sm text-purple-700">Par uten barn</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-2xl font-bold text-green-900">27</p>
                <p className="text-sm text-green-700">Par med barn</p>
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-amber-50 p-4">
              <p className="text-sm text-amber-900">
                <strong>Medianinntekt:</strong> NOK 479,000 for alle
                husholdninger. Par med barn: NOK 1,015,000 | Par uten barn: NOK
                826,000
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-10 border-l-4 border-blue-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              2. Bevegelse og Besøkende
            </h2>
            <p className="text-lg text-lokka-secondary">
              Besøksmønstre og bevegelsesdata for området
            </p>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">
              Besøksmønstre
            </h3>
            <p className="mb-6 text-sm text-lokka-secondary">
              Periode: 01.10.2025 – 31.12.2025
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-blue-50 p-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-900/70">
                  Daglige Besøk
                </h4>
                <p className="mb-1 text-3xl font-bold text-blue-900">8,468</p>
                <p className="text-sm text-blue-700">Gjennomsnitt per dag</p>
              </div>

              <div className="rounded-xl bg-blue-50 p-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-900/70">
                  Besøk per km²
                </h4>
                <p className="mb-1 text-3xl font-bold text-blue-900">65,750</p>
                <p className="text-sm text-blue-700">+6% fra forrige periode</p>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">
              Besøk per ukedag
            </h3>
            <div className="grid gap-4 grid-cols-7">
              {[
                { dag: "Man", besøk: 3884 },
                { dag: "Tir", besøk: 3935 },
                { dag: "Ons", besøk: 4059 },
                { dag: "Tor", besøk: 4246 },
                { dag: "Fre", besøk: 5345 },
                { dag: "Lør", besøk: 6456 },
                { dag: "Søn", besøk: 4231 },
              ].map((d) => (
                <div
                  key={d.dag}
                  className={`rounded-lg p-3 text-center ${d.dag === "Lør" ? "bg-blue-100" : "bg-gray-50"}`}
                >
                  <p className="text-xs font-medium text-gray-600">{d.dag}</p>
                  <p
                    className={`text-lg font-bold ${d.dag === "Lør" ? "text-blue-900" : "text-gray-900"}`}
                  >
                    {d.besøk.toLocaleString("no-NO")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 p-6">
            <h4 className="mb-3 font-semibold text-blue-900">
              Datakilde og Status
            </h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                <strong>Status:</strong> Faktiske data
              </p>
              <p>
                <strong>Kilde:</strong> Plaace.ai / Telia
              </p>
              <p>
                <strong>Periode:</strong> 01.10.2025 – 31.12.2025
              </p>
              <p>
                <strong>Metode:</strong> Mobildata aggregert for personvern
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-10 border-l-4 border-purple-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              3. Konkurransebilde og Konseptmiks
            </h2>
            <p className="text-lg text-lokka-secondary">
              Virksomheter og næringsaktører i området
            </p>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Konsepttetthet
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">1,244</p>
              <p className="text-sm text-purple-700">Per km²</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Total Omsetning
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">
                NOK 332M
              </p>
              <p className="text-sm text-purple-700">+11% vekst</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Omsetningstetthet
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">
                NOK 17 mrd
              </p>
              <p className="text-sm text-purple-700">Per km²</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-medium md:p-8">
            <h3 className="mb-4 text-xl font-bold text-purple-900">
              Markedsledere
            </h3>
            <p className="mb-6 text-sm text-purple-700">
              Top 5 aktører i området etter omsetning
            </p>

            {[
              { navn: "Extra Birkelunden", omsetning: 87, andel: 4.1 },
              { navn: "Vinmonopolet Nordregate", omsetning: 73, andel: 3.46 },
              { navn: "Rema 1000 Vulkan", omsetning: 72, andel: 3.38 },
              { navn: "Kiwi Minipris Markveien", omsetning: 69, andel: 3.27 },
              { navn: "McDonald's TMG", omsetning: 58, andel: 2.73 },
            ].map((a, i) => (
              <div key={a.navn} className="mb-4 rounded-xl bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-bold text-purple-900">
                    #{i + 1} {a.navn}
                  </span>
                  <span className="text-lg font-bold text-purple-900">
                    {a.andel}%
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: `${a.andel * 10}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  NOK {a.omsetning}M omsetning
                </p>
              </div>
            ))}
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">
              Konseptmiks - Kategorifordeling
            </h3>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-lokka-primary">
                      Handel
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      (10 aktører)
                    </span>
                  </div>
                  <span className="text-xl font-bold text-lokka-primary">
                    NOK 509M
                  </span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: "56%" }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  56% av total omsetning
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-lokka-primary">
                      Mat og opplevelser
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      (9 aktører)
                    </span>
                  </div>
                  <span className="text-xl font-bold text-lokka-primary">
                    NOK 357M
                  </span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  40% av total omsetning
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-lokka-primary">
                      Tjenester
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      (1 aktør)
                    </span>
                  </div>
                  <span className="text-xl font-bold text-lokka-primary">
                    NOK 36M
                  </span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: "4%" }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  4% av total omsetning
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-purple-100 p-4">
            <p className="text-sm text-purple-900">
              <strong>Kjeder vs. uavhengige (2025):</strong> 75.4% kjeder, 24.6%
              uavhengige. Området har stabil fordeling over tid med dominans av
              dagligvarekjeder.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-10 border-l-4 border-amber-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              4. Korthandel
            </h2>
            <p className="text-lg text-lokka-secondary">
              Banktransaksjoner og kortbruk i området
            </p>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                Daglig Korthandel
              </h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 2.6M</p>
              <p className="text-sm text-amber-700">Per dag</p>
            </div>

            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                Total Korthandel
              </h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 233M</p>
              <p className="text-sm text-amber-700">For perioden</p>
            </div>

            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                Beløp per transaksjon
              </h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 284</p>
              <p className="text-sm text-amber-700">Gjennomsnitt</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">
              Korthandel per ukedag (millioner NOK)
            </h3>
            <div className="grid gap-4 grid-cols-7">
              {[
                { dag: "Man", beløp: 2.46 },
                { dag: "Tir", beløp: 2.5 },
                { dag: "Ons", beløp: 2.29 },
                { dag: "Tor", beløp: 2.59 },
                { dag: "Fre", beløp: 3.67 },
                { dag: "Lør", beløp: 4.55 },
                { dag: "Søn", beløp: 1.67 },
              ].map((d) => (
                <div
                  key={d.dag}
                  className={`rounded-lg p-3 text-center ${d.dag === "Lør" ? "bg-amber-100" : "bg-gray-50"}`}
                >
                  <p className="text-xs font-medium text-gray-600">{d.dag}</p>
                  <p
                    className={`text-lg font-bold ${d.dag === "Lør" ? "text-amber-900" : "text-gray-900"}`}
                  >
                    {d.beløp.toFixed(1)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 p-6">
            <h4 className="mb-3 font-semibold text-amber-900">
              Korthandelstrender
            </h4>
            <div className="space-y-2 text-sm text-amber-800">
              <p>
                <strong>Status:</strong> Faktiske data
              </p>
              <p>
                <strong>Kilde:</strong> Analysebutikken / BankAxept
              </p>
              <p>
                <strong>Periode:</strong> 01.10.2025 – 31.12.2025
              </p>
              <p>
                <strong>Trend:</strong> +0.3% endring siste 30 dager
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="rounded-2xl border-2 border-natural-sage/30 bg-gradient-to-br from-natural-sage/5 to-white p-8 shadow-medium">
            <h2 className="mb-6 text-2xl font-bold text-lokka-primary">
              Datakilder og Metodikk
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">
                  Bevegelse og Besøkende
                </h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p>
                    <strong>Kilde:</strong> Plaace.ai / Telia (mobildata)
                  </p>
                  <p>
                    <strong>Status:</strong> Faktiske data
                  </p>
                  <p>
                    <strong>Metode:</strong> Aggregert mobildata anonymisert for
                    personvern
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">
                  Demografi
                </h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p>
                    <strong>Kilde:</strong> Statistisk sentralbyrå, Geodata
                  </p>
                  <p>
                    <strong>Status:</strong> Estimert
                  </p>
                  <p>
                    <strong>År:</strong> 2024
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">
                  Korthandel
                </h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p>
                    <strong>Kilde:</strong> BankAxept
                  </p>
                  <p>
                    <strong>Status:</strong> Faktiske data
                  </p>
                  <p>
                    <strong>Dekning:</strong> Komplett transaksjonsdata
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">
                  Konkurransebilde
                </h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p>
                    <strong>Kilde:</strong> Plaace.ai / Analysebutikken
                  </p>
                  <p>
                    <strong>Status:</strong> Estimerte tall
                  </p>
                  <p>
                    <strong>År:</strong> 2024-2025
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-natural-sage/10 p-4">
              <p className="text-sm text-natural-forest">
                <strong>Viktig:</strong> Datasettet er kun for intern bruk og
                analyse. Henvis alltid til Plaace.ai og datakilde (BankAxept,
                Telia, Analysebutikken eller SSB) når dataen brukes i grafer
                eller rapporter.
              </p>
            </div>
          </div>
        </section>

        <AktorOversikt
          actors={aktorData.actors}
          categoryStats={aktorData.categoryStats}
          metadata={aktorData.metadata}
        />
      </Container>
    </>
  );
}
