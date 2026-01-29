import Container from "@/components/ui/Container";
import ExpandableImage from "@/components/ui/ExpandableImage";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const BygningKorthandelChart = dynamic(
  () => import("@/components/analyser/BygningKorthandelChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[350px] animate-pulse rounded-lg bg-gray-100" />
    ),
  },
);
import korthandelData from "@/data/front-real-estate/markveien-35/bygning/korthandel.json";

export const metadata: Metadata = {
  title: "Markveien 35 - Bare bygget",
  description:
    "Bygningsnivå analyse for Markveien 35A/B/C med aktører, besøkende, korthandel og konkurransebilde",
};

export default function BareByggetPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-gray-100 to-gray-50 md:aspect-[21/9]">
          <Image
            src="/images/malling-co/markveien-35-render.jpg"
            alt="Arkitektonisk render av Markveien 35"
            fill
            priority
            className="object-contain object-center"
            sizes="100vw"
            quality={90}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-red-500/10 opacity-30 mix-blend-overlay" />

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
              <span className="mb-3 inline-block rounded-full bg-rose-500/30 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                Bygningsnivå
              </span>
              <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Markveien 35 — Bare bygget
              </h1>
              <p className="mb-4 text-lg text-white/90 md:text-xl">
                Markveien 35A / 35B / 35C — Grünerløkka Sør
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>5 leietakere</span>
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
                  <span>Periode: 27.10.2024 – 26.10.2025</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <Container className="py-12">
        {/* Nøkkeltall */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-lokka-primary">
            Nøkkeltall - Oversikt
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border-2 border-rose-200/50 bg-gradient-to-br from-rose-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-900/70">
                  Daglige Besøk
                </h3>
                <svg
                  className="h-8 w-8 text-rose-600"
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
              <p className="mb-2 text-4xl font-bold text-rose-900">4,685</p>
              <p className="text-sm text-rose-700">Gj.snitt per dag</p>
              <div className="mt-4 text-xs text-rose-600">
                <p>Besøkende: 2,142 | På jobb: 504 | Hjemme: 1,188</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-amber-200/50 bg-gradient-to-br from-amber-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                  Daglig Korthandel
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-4xl font-bold text-amber-900">NOK 1.3M</p>
              <p className="text-sm text-amber-700">Per dag</p>
              <div className="mt-4 text-xs text-amber-600">
                <p>Total: NOK 462M for perioden</p>
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
              <p className="text-sm text-purple-700">2,930 besøkende</p>
              <div className="mt-4 text-xs text-purple-600">
                <p>17.9% av ukesbesøk</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-blue-200/50 bg-gradient-to-br from-blue-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-900/70">
                  Total Omsetning
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-4xl font-bold text-blue-900">NOK 123M</p>
              <p className="text-sm text-blue-700">Estimert årlig</p>
              <div className="mt-4 text-xs text-blue-600">
                <p>5 aktører i bygget</p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Demografi */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-rose-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              1. Demografi
            </h2>
            <p className="text-lg text-lokka-secondary">
              Befolkningsdata for bygningens fotavtrykk
            </p>
          </div>

          <div className="mb-8">
            <ExpandableImage
              src="/images/malling-co/markveien-35/bygning/markert-omradet.png"
              alt="Markveien 35 — markert bygningsområde"
              width={1200}
              height={800}
              borderColor="purple"
              bgColor="purple/10"
              quality={80}
              caption={
                <p className="text-sm text-lokka-secondary">
                  <strong>Bygningsområde:</strong> Markveien 35A/B/C — det
                  minste granulerte analysenivået, begrenset til selve
                  bygningens fotavtrykk.
                </p>
              }
            />
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <div className="rounded-xl bg-rose-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-rose-900/70">
                Befolkning
              </h3>
              <p className="mb-1 text-3xl font-bold text-rose-900">72</p>
              <p className="text-sm text-rose-700">Innbyggere (2024)</p>
            </div>

            <div className="rounded-xl bg-rose-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-rose-900/70">
                Husholdninger
              </h3>
              <p className="mb-1 text-3xl font-bold text-rose-900">41</p>
              <p className="text-sm text-rose-700">Totalt</p>
            </div>

            <div className="rounded-xl bg-rose-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-rose-900/70">
                Bygningstype
              </h3>
              <p className="mb-1 text-3xl font-bold text-rose-900">2</p>
              <p className="text-sm text-rose-700">Leilighetsbygg</p>
            </div>

            <div className="rounded-xl bg-rose-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-rose-900/70">
                Endring
              </h3>
              <p className="mb-1 text-3xl font-bold text-rose-900">-1.4%</p>
              <p className="text-sm text-rose-700">Fra 2023 (73 → 72)</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Husholdninger
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-2xl font-bold text-blue-900">23</p>
                <p className="text-sm text-blue-700">Aleneboende</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-2xl font-bold text-purple-900">8</p>
                <p className="text-sm text-purple-700">Par uten barn</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-2xl font-bold text-green-900">4</p>
                <p className="text-sm text-green-700">Par med barn</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-2xl font-bold text-amber-900">2</p>
                <p className="text-sm text-amber-700">Enslig forelder</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-700">Andre husholdninger</p>
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

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Aldersfordeling
            </h3>
            <p className="mb-4 text-sm text-lokka-secondary">
              Befolkning fordelt på aldersgrupper og kjønn (totalt 72 personer)
            </p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {[
                { gruppe: "0-5", m: 2, k: 2 },
                { gruppe: "6-12", m: 1, k: 1 },
                { gruppe: "13-15", m: 1, k: 1 },
                { gruppe: "16-18", m: 1, k: 1 },
                { gruppe: "19-23", m: 3, k: 4 },
                { gruppe: "23-34", m: 12, k: 12 },
                { gruppe: "35-44", m: 6, k: 5 },
                { gruppe: "45-54", m: 4, k: 4 },
                { gruppe: "55-64", m: 3, k: 3 },
                { gruppe: "65-74", m: 2, k: 2 },
                { gruppe: "75-84", m: 1, k: 1 },
                { gruppe: "85+", m: 0, k: 0 },
              ].map((a) => (
                <div
                  key={a.gruppe}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {a.gruppe}
                  </span>
                  <div className="flex gap-3 text-sm">
                    <span className="text-blue-600">{a.m} M</span>
                    <span className="text-rose-600">{a.k} K</span>
                    <span className="font-semibold text-gray-900">
                      {a.m + a.k}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-rose-50 p-4">
              <p className="text-sm text-rose-900">
                <strong>Dominerende aldersgruppe:</strong> 23-34 år utgjør 33%
                av befolkningen (24 av 72 innbyggere)
              </p>
            </div>
          </div>
        </section>

        {/* 2. Bevegelse */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-blue-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              2. Bevegelse og Besøkende
            </h2>
            <p className="text-lg text-lokka-secondary">
              Besøksmønstre og bevegelsesdata for bygget
            </p>
          </div>

          <div className="mb-8">
            <ExpandableImage
              src="/images/malling-co/markveien-35/bygning/bevegelse-omrade.png"
              alt="Bevegelsesanalyse — Markveien 35"
              width={1200}
              height={800}
              borderColor="blue"
              bgColor="blue-50"
              quality={80}
              caption={
                <p className="text-sm text-lokka-secondary">
                  <strong>Bevegelsesområde:</strong> Analyse av
                  fotgjengertrafikk rundt bygget basert på mobildata.
                </p>
              }
            />
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">
              Daglig gjennomsnitt — 3-veis split
            </h3>
            <p className="mb-6 text-sm text-lokka-secondary">
              Periode: 01.07.2025 – 31.12.2025
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-blue-50 p-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-900/70">
                  Besøkende
                </h4>
                <p className="mb-1 text-3xl font-bold text-blue-900">4,685</p>
                <p className="text-sm text-blue-700">Per dag (snitt)</p>
              </div>

              <div className="rounded-xl bg-purple-50 p-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                  På jobb
                </h4>
                <p className="mb-1 text-3xl font-bold text-purple-900">3,737</p>
                <p className="text-sm text-purple-700">Per dag (snitt)</p>
              </div>

              <div className="rounded-xl bg-green-50 p-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-900/70">
                  Hjemme
                </h4>
                <p className="mb-1 text-3xl font-bold text-green-900">13,736</p>
                <p className="text-sm text-green-700">Per dag (snitt)</p>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">
              Besøk per time (daglig gjennomsnitt)
            </h3>
            <div className="grid gap-2 grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
              {[
                { t: "00", b: 142 },
                { t: "01", b: 117 },
                { t: "02", b: 108 },
                { t: "03", b: 82 },
                { t: "04", b: 67 },
                { t: "05", b: 66 },
                { t: "06", b: 73 },
                { t: "07", b: 83 },
                { t: "08", b: 92 },
                { t: "09", b: 97 },
                { t: "10", b: 116 },
                { t: "11", b: 154 },
                { t: "12", b: 218 },
                { t: "13", b: 285 },
                { t: "14", b: 335 },
                { t: "15", b: 367 },
                { t: "16", b: 389 },
                { t: "17", b: 383 },
                { t: "18", b: 352 },
                { t: "19", b: 315 },
                { t: "20", b: 270 },
                { t: "21", b: 223 },
                { t: "22", b: 187 },
                { t: "23", b: 164 },
              ].map((h) => (
                <div
                  key={h.t}
                  className={`rounded-lg p-2 text-center ${h.t === "16" ? "bg-blue-100" : "bg-gray-50"}`}
                >
                  <p className="text-xs font-medium text-gray-500">{h.t}:00</p>
                  <p
                    className={`text-sm font-bold ${h.t === "16" ? "text-blue-900" : "text-gray-900"}`}
                  >
                    {h.b}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-900">
                <strong>Peak:</strong> kl. 16:00 med 389 besøkende.
                Ettermiddagen (14:00–18:00) utgjør toppperioden.
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">
              Besøk per ukedag
            </h3>
            <div className="grid gap-4 grid-cols-7">
              {[
                { dag: "Man", besøk: 1808 },
                { dag: "Tir", besøk: 1882 },
                { dag: "Ons", besøk: 1945 },
                { dag: "Tor", besøk: 2014 },
                { dag: "Fre", besøk: 2438 },
                { dag: "Lør", besøk: 2930 },
                { dag: "Søn", besøk: 1980 },
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
                <strong>Periode:</strong> 01.07.2025 – 31.12.2025
              </p>
              <p>
                <strong>Metode:</strong> Mobildata aggregert for personvern
              </p>
            </div>
          </div>
        </section>

        {/* 3. Besøkende */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-teal-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              3. Besøkende — Hvem besøker bygget
            </h2>
            <p className="text-lg text-lokka-secondary">
              Opprinnelsesområder og demografi for besøkende
            </p>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Topp 15 opprinnelsesområder
            </h3>
            <p className="mb-6 text-sm text-lokka-secondary">
              Periode: 31.12.2024 – 30.12.2025 | 44 nabolag totalt
            </p>

            <div className="space-y-3">
              {[
                { område: "Grünerløkka", besøk: 924647, pct: 33.4 },
                { område: "Sentrum 2", besøk: 266906, pct: 11.4 },
                { område: "Gamle Aker", besøk: 224990, pct: 8.6 },
                { område: "Rodeløkka", besøk: 186424, pct: 6.5 },
                { område: "Sentrum 1", besøk: 39300, pct: 3.9 },
                { område: "Sentrum 3", besøk: 37079, pct: 2.8 },
                { område: "Torshov", besøk: 105040, pct: 2.8 },
                { område: "Tøyen", besøk: 79992, pct: 2.1 },
                { område: "Grefsenlia", besøk: 60665, pct: 1.6 },
                { område: "Grønland", besøk: 59593, pct: 1.6 },
                { område: "Hasle", besøk: 58096, pct: 1.5 },
                { område: "Ila", besøk: 51180, pct: 1.4 },
                { område: "Ulven", besøk: 48792, pct: 1.3 },
                { område: "Bjerke", besøk: 46913, pct: 1.2 },
                { område: "St.hanshaugen", besøk: 43832, pct: 1.2 },
              ].map((o, i) => (
                <div key={o.område} className="flex items-center gap-4">
                  <span className="w-6 text-sm font-bold text-gray-400">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {o.område}
                      </span>
                      <span className="text-sm text-gray-600">
                        {o.besøk.toLocaleString("no-NO")} besøk ({o.pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-teal-500"
                        style={{ width: `${(o.pct / 33.4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Besøkendes husholdningstype
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-teal-50 p-4 text-center">
                <p className="text-2xl font-bold text-teal-900">12,544</p>
                <p className="text-sm text-teal-700">Aleneboende (61%)</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <p className="text-2xl font-bold text-blue-900">4,582</p>
                <p className="text-sm text-blue-700">Par uten barn (22%)</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <p className="text-2xl font-bold text-green-900">2,074</p>
                <p className="text-sm text-green-700">Par med barn (10%)</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-teal-50 p-4">
              <p className="text-sm text-teal-900">
                <strong>Medianinntekt besøkende:</strong> NOK 499,000 for alle |
                Par med barn: NOK 1,000,000 | Par uten barn: NOK 813,000
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Besøkendes boligtype
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { type: "Leilighetsbygg", antall: 1029, pct: 39.4 },
                { type: "Næringsbygg", antall: 732, pct: 28.0 },
                { type: "Eneboliger", antall: 515, pct: 19.7 },
                { type: "Småhus", antall: 282, pct: 10.8 },
                { type: "Hytter", antall: 41, pct: 1.6 },
                { type: "Andre bygg", antall: 11, pct: 0.4 },
              ].map((b) => (
                <div key={b.type} className="rounded-lg bg-gray-50 p-4">
                  <p className="text-lg font-bold text-gray-900">
                    {b.antall.toLocaleString("no-NO")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {b.type} ({b.pct}%)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Korthandel */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-amber-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              4. Korthandel
            </h2>
            <p className="text-lg text-lokka-secondary">
              Banktransaksjoner og kortbruk i byggets område
            </p>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                Daglig Korthandel
              </h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 1.3M</p>
              <p className="text-sm text-amber-700">Per dag</p>
            </div>

            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                Total Korthandel
              </h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 462M</p>
              <p className="text-sm text-amber-700">For perioden (12 mnd)</p>
            </div>

            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                Årlig vekst (2025)
              </h3>
              <p className="mb-1 text-3xl font-bold text-red-600">-12.6%</p>
              <p className="text-sm text-amber-700">vs. Oslo: -2.3%</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-2 text-xl font-bold text-lokka-primary">
              Daglig korthandel — 365 dager
            </h3>
            <p className="mb-6 text-sm text-lokka-secondary">
              27.10.2024 – 26.10.2025 | Ukentlig gjennomsnitt (mNOK)
            </p>
            <BygningKorthandelChart data={korthandelData.tidsserie} />
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">
              Korthandel per ukedag (mNOK)
            </h3>
            <div className="grid gap-4 grid-cols-7">
              {[
                { dag: "Man", y24: 1.24, y25: 0.89 },
                { dag: "Tir", y24: 1.09, y25: 1.01 },
                { dag: "Ons", y24: 1.2, y25: 1.14 },
                { dag: "Tor", y24: 1.45, y25: 1.19 },
                { dag: "Fre", y24: 2.07, y25: 1.71 },
                { dag: "Lør", y24: 2.42, y25: 1.96 },
                { dag: "Søn", y24: 0.77, y25: 0.67 },
              ].map((d) => (
                <div
                  key={d.dag}
                  className={`rounded-lg p-3 text-center ${d.dag === "Lør" ? "bg-amber-100" : "bg-gray-50"}`}
                >
                  <p className="text-xs font-medium text-gray-600">{d.dag}</p>
                  <p
                    className={`text-sm font-bold ${d.dag === "Lør" ? "text-amber-900" : "text-gray-900"}`}
                  >
                    {d.y25.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">{d.y24.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-xs text-gray-500">
              <span>Topprad: 2025</span>
              <span>Bunnrad: 2024</span>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 p-6">
            <h4 className="mb-3 font-semibold text-amber-900">
              Årlig vekst — sammenligning
            </h4>
            <div className="space-y-2 text-sm text-amber-800">
              <p>
                <strong>2024:</strong> Lokalt -9.5% | Oslo -7.0% | Norge -3.9%
              </p>
              <p>
                <strong>2025:</strong> Lokalt -12.6% | Oslo -2.3% | Norge -0.5%
              </p>
              <p>
                <strong>2026 (prognose):</strong> Lokalt +12.4% | Oslo +1.8% |
                Norge +0.7%
              </p>
              <p>
                <strong>Kilde:</strong> Analysebutikken / BankAxept
              </p>
            </div>
          </div>
        </section>

        {/* 5. Konkurransebilde */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-purple-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              5. Konkurransebilde og Konseptmiks
            </h2>
            <p className="text-lg text-lokka-secondary">
              Virksomheter og markedsstruktur i bygget
            </p>
          </div>

          <div className="mb-8">
            <ExpandableImage
              src="/images/malling-co/markveien-35/bygning/konkurransebilde-omrade.png"
              alt="Konkurransebilde — Markveien 35 bygningsnivå"
              width={1200}
              height={800}
              borderColor="purple"
              bgColor="purple-50"
              quality={80}
              caption={
                <p className="text-sm text-lokka-secondary">
                  <strong>Konkurransebildets dekningsområde:</strong> Analyse av
                  næringsaktører innenfor bygningens adresse.
                </p>
              }
            />
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Antall Aktører
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">5</p>
              <p className="text-sm text-purple-700">I bygget</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Total Omsetning
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">
                NOK 123M
              </p>
              <p className="text-sm text-purple-700">Estimert årlig</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Ansatte
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">50</p>
              <p className="text-sm text-purple-700">Totalt i bygget</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">
              Konseptmiks — Lik fordeling
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  kat: "Mat og drikke",
                  nivå: "Handel",
                  pct: 25,
                  farge: "bg-green-500",
                },
                {
                  kat: "Annen handel",
                  nivå: "Handel",
                  pct: 25,
                  farge: "bg-blue-500",
                },
                {
                  kat: "Hjem og interiør",
                  nivå: "Handel",
                  pct: 25,
                  farge: "bg-purple-500",
                },
                {
                  kat: "Treningssentre",
                  nivå: "Tjenester",
                  pct: 25,
                  farge: "bg-amber-500",
                },
              ].map((k) => (
                <div key={k.kat} className="rounded-lg bg-gray-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-900">{k.kat}</span>
                    <span className="text-sm font-bold text-gray-700">
                      {k.pct}%
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full ${k.farge}`}
                      style={{ width: `${k.pct}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{k.nivå}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-lg bg-purple-100 p-4">
            <p className="text-sm text-purple-900">
              <strong>Kjeder vs. uavhengige (2025):</strong> 65.0% kjeder, 35.0%
              uavhengige. Kiwi og Fitness 24 Seven utgjør 85.9% av byggets
              omsetning.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Over- og underrepresentasjon vs. kommune
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-2xl font-bold text-red-700">-18.4%</p>
                <p className="text-sm text-red-600">
                  Handel (underrepresentert)
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-2xl font-bold text-green-700">+44.4%</p>
                <p className="text-sm text-green-600">
                  Tjenester (overrepresentert)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Aktører i bygget */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-rose-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">
              6. Aktører i bygget
            </h2>
            <p className="text-lg text-lokka-secondary">
              5 leietakere med omsetning og markedsandel
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                rank: 1,
                navn: "Kiwi Minipris Markveien",
                type: "Handel / Mat og drikke",
                adresse: "Markveien 35B",
                omsetning: 70,
                andel: 56.6,
                ansatte: 20,
                vekst: "+0.6%",
              },
              {
                rank: 2,
                navn: "Fitness 24 Seven",
                type: "Tjenester / Treningssentre",
                adresse: "Østre Aker vei 17",
                omsetning: 36,
                andel: 29.3,
                ansatte: 5,
                vekst: "0%",
              },
              {
                rank: 3,
                navn: "Kid Interiør Grünerløkka",
                type: "Handel / Hjem og interiør",
                adresse: "Markveien 35A",
                omsetning: 10,
                andel: 8.4,
                ansatte: 10,
                vekst: "—",
              },
              {
                rank: 4,
                navn: "0186 Bardrift AS",
                type: "Mat og opplevelser / Puber og barer",
                adresse: "Markveien 35A",
                omsetning: 4,
                andel: 2.9,
                ansatte: 15,
                vekst: "—",
              },
              {
                rank: 5,
                navn: "M35 Collective AS",
                type: "Handel / Annen handel",
                adresse: "Markveien 35A",
                omsetning: 3,
                andel: 2.8,
                ansatte: 0,
                vekst: "0%",
              },
            ].map((a) => (
              <div
                key={a.rank}
                className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-lg font-bold text-rose-700">
                      {a.rank}
                    </span>
                    <div>
                      <h4 className="font-bold text-lokka-primary">{a.navn}</h4>
                      <p className="text-xs text-lokka-secondary">{a.type}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-lokka-primary">
                    NOK {a.omsetning}M
                  </span>
                </div>

                <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-rose-500"
                    style={{ width: `${a.andel}%` }}
                  ></div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-lokka-secondary">
                  <span>{a.andel}% markedsandel</span>
                  <span>{a.ansatte} ansatte</span>
                  <span>YoY: {a.vekst}</span>
                  <span>{a.adresse}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Kategorifordeling
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-lg font-bold text-purple-900">Handel</p>
                <p className="text-2xl font-bold text-purple-900">NOK 83M</p>
                <p className="text-sm text-purple-700">3 aktører, 30 ansatte</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-lg font-bold text-green-900">Tjenester</p>
                <p className="text-2xl font-bold text-green-900">NOK 36M</p>
                <p className="text-sm text-green-700">1 aktør, 5 ansatte</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-lg font-bold text-amber-900">
                  Mat og opplevelser
                </p>
                <p className="text-2xl font-bold text-amber-900">NOK 4M</p>
                <p className="text-sm text-amber-700">1 aktør, 15 ansatte</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Datakilder */}
        <section className="mb-12">
          <div className="rounded-2xl border-2 border-rose-300/30 bg-gradient-to-br from-rose-50/50 to-white p-8 shadow-medium">
            <h2 className="mb-6 text-2xl font-bold text-lokka-primary">
              Datakilder og Metodikk
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold text-rose-800">
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
                <h3 className="mb-3 font-semibold text-rose-800">Demografi</h3>
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
                <h3 className="mb-3 font-semibold text-rose-800">Korthandel</h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p>
                    <strong>Kilde:</strong> BankAxept
                  </p>
                  <p>
                    <strong>Status:</strong> Faktiske data
                  </p>
                  <p>
                    <strong>Periode:</strong> 27.10.2024 – 26.10.2025
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-rose-800">
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
                    <strong>Oppdatert:</strong> 21. desember 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-rose-100/50 p-4">
              <p className="text-sm text-rose-900">
                <strong>Viktig:</strong> Datasettet er kun for intern bruk og
                analyse. Henvis alltid til Plaace.ai og datakilde (BankAxept,
                Telia, Analysebutikken eller SSB) når dataen brukes i grafer
                eller rapporter.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
