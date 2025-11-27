import Container from '@/components/ui/Container';
import ExpandableImage from '@/components/ui/ExpandableImage';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import AktorOversikt from '@/components/analyser/AktorOversikt';
import aktorData from '@/data/main-board/aktorer/nederst-i-markveien.json';

export const metadata: Metadata = {
  title: 'Nederst i Markveien ved Kaffebrenneriet - Stedsanalyse',
  description: 'Komplett markedsanalyse for Nederst i Markveien ved Kaffebrenneriet med demografi, besøkende, virksomheter og omsetning',
};

export default function NederstIMarkveienPage() {
  return (
    <>
      {/* Hero Section with Image */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
          <Image
            src="/images/analyser/nederst-i-markveien-aerial.png"
            alt="Fugleperspektiv av Nederst i Markveien ved Kaffebrenneriet"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Colored overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-natural-sage/20 to-natural-moss/20 opacity-40 mix-blend-overlay" />

          <Container className="absolute inset-0 flex flex-col justify-between py-8">
            {/* Back link */}
            <div>
              <Link
                href="/main-board/analyser"
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Tilbake til oversikt
              </Link>
            </div>

            {/* Title and metadata */}
            <div>
              <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                Stedsanalyse
              </span>
              <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Nederst i Markveien ved Kaffebrenneriet
              </h1>
              <p className="mb-4 text-lg text-white/90 md:text-xl">
                Markveien 58-67 område (0.01 km²)
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>12 virksomheter, 182 ansatte</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Periode: 01.10.2022 – 30.09.2025</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Quick Stats Overview */}
      <Container className="py-12">
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-lokka-primary">Nøkkeltall - Oversikt</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Daglige besøk */}
            <div className="rounded-2xl border-2 border-natural-sage/20 bg-gradient-to-br from-natural-sage/5 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                  Daglige Besøk
                </h3>
                <svg className="h-8 w-8 text-natural-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="mb-2 text-4xl font-bold text-lokka-primary">7,177</p>
              <p className="text-sm text-lokka-secondary">Gjennomsnitt (alle besøk)</p>
              <div className="mt-4 text-xs text-natural-forest/60">
                <p>56,262 per km²</p>
              </div>
            </div>

            {/* Daglig korthandel */}
            <div className="rounded-2xl border-2 border-blue-200/50 bg-gradient-to-br from-blue-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-900/70">
                  Daglig Korthandel
                </h3>
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <p className="mb-2 text-4xl font-bold text-blue-900">NOK 1.3M</p>
              <p className="text-sm text-blue-700">Per dag i perioden</p>
              <div className="mt-4 text-xs text-blue-600">
                <p>Total: NOK 3.3 mrd.</p>
                <p>Snitt: NOK 215 per transaksjon</p>
              </div>
            </div>

            {/* Dominerende aktør */}
            <div className="rounded-2xl border-2 border-red-200/50 bg-gradient-to-br from-red-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-red-900/70">
                  Dominerende Aktør
                </h3>
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="mb-2 text-3xl font-bold text-red-900">Sharika AS</p>
              <p className="text-sm text-red-700">30.33% markedsandel</p>
              <div className="mt-4 text-xs text-red-600">
                <p>NOK 37M omsetning årlig</p>
                <p className="flex items-center gap-1 text-green-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +77% YoY vekst
                </p>
              </div>
            </div>

            {/* Total omsetning */}
            <div className="rounded-2xl border-2 border-amber-200/50 bg-gradient-to-br from-amber-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                  Total Omsetning
                </h3>
                <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="mb-2 text-4xl font-bold text-amber-900">NOK 122M</p>
              <p className="text-sm text-amber-700">Estimert årlig (2024)</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-green-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>+4% vekst</span>
              </div>
            </div>
          </div>
        </section>

        {/* 1. DEMOGRAFI */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-natural-sage pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">1. Demografi</h2>
            <p className="text-lg text-lokka-secondary">
              Befolkningsdata og områdeprofil
            </p>
          </div>

          {/* Location Map */}
          <div className="mb-8">
            <ExpandableImage
              src="/images/analyser/nederst-i-markveien-aerial.png"
              alt="Fugleperspektiv - Nederst i Markveien ved Kaffebrenneriet"
              width={1200}
              height={800}
              borderColor="natural-sage"
              bgColor="natural-sage/10"
              quality={80}
              caption={
                <p className="text-sm text-lokka-secondary">
                  <strong>Lokasjonskart:</strong> Området strekker seg langs Markveien 58-67, med Kaffebrenneriet som
                  et kjent landemerke. Høy konsentrasjon av spisesteder og opplevelseskonsepter.
                </p>
              }
            />
          </div>

          {/* Nøkkeltall demografi */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Virksomheter
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">12</p>
              <p className="text-sm text-lokka-secondary">Totalt i området</p>
            </div>

            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Total Ansatte
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">182</p>
              <p className="text-sm text-lokka-secondary">Personer</p>
            </div>

            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Områdestørrelse
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">0.01</p>
              <p className="text-sm text-lokka-secondary">km²</p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">Områdeprofil</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-900">
                  <strong>Levende gateområde:</strong> Nederst i Markveien ved Kaffebrenneriet er preget av høy
                  fotgjengertrafikk og mangfold av spisesteder og kaféer.
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-sm text-purple-900">
                  <strong>Mat og opplevelser:</strong> 9 av 12 virksomheter er spisesteder eller kaféer,
                  med Sharika AS, Sabrura Markveien AS og Flamme Burger som toppaktører.
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm text-green-900">
                  <strong>Høy besøkstetthet:</strong> Med 56,262 besøk per km² daglig viser området betydelig
                  trekkraft og popularitet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. BEVEGELSE OG BESØKENDE */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-blue-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">2. Bevegelse og Besøkende</h2>
            <p className="text-lg text-lokka-secondary">
              Besøksmønstre og bevegelsesdata for området
            </p>
          </div>

          {/* Key visitor stats */}
          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Besøksmønstre</h3>
            <p className="mb-6 text-sm text-lokka-secondary">Periode: 01.10.2022 – 30.09.2025</p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-blue-50 p-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-900/70">
                  Travleste Dag
                </h4>
                <p className="mb-1 text-3xl font-bold text-blue-900">Lørdag</p>
                <p className="text-sm text-blue-700">17% av ukesbesøk</p>
              </div>

              <div className="rounded-xl bg-blue-50 p-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-900/70">
                  Gjennomsnitt per km²
                </h4>
                <p className="mb-1 text-3xl font-bold text-blue-900">56,262</p>
                <p className="text-sm text-blue-700">Høy besøkstetthet</p>
              </div>
            </div>
          </div>

          {/* Heat Map - Visitor Origins */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Geografisk Fordeling av Besøkende
            </h3>
            <p className="mb-6 text-sm text-lokka-secondary">
              Heat map viser hvor de besøkende kommer fra. Majoriteten kommer fra lokale Oslo-områder,
              med sterk konsentrasjon fra Grünerløkka og sentrale bydeler.
            </p>

            <ExpandableImage
              src="/images/analyser/nederst-i-markveien-visitor-origins.png"
              alt="Heat map - Geografisk opprinnelse av besøkende til Nederst i Markveien"
              width={1200}
              height={800}
              borderColor="blue"
              bgColor="blue-50"
              quality={75}
              caption={
                <p className="text-xs text-lokka-secondary">
                  Besøkende tiltrekkes fra et bredt geografisk område, med betydelig lokal trafikk
                  fra Grünerløkka og nabobydeler.
                </p>
              }
            />
          </div>

          {/* Metadata */}
          <div className="rounded-xl bg-blue-50 p-6">
            <h4 className="mb-3 font-semibold text-blue-900">Datakilde og Status</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Status:</strong> Faktiske data</p>
              <p><strong>Kilde:</strong> Telia</p>
              <p><strong>Periode:</strong> 01.10.2022 – 30.09.2025</p>
              <p><strong>Metode:</strong> Mobildata aggregert for personvern</p>
            </div>
          </div>
        </section>

        {/* 3. KONKURRANSEBILDE OG KONSEPTMIKS */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-purple-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">3. Konkurransebilde og Konseptmiks</h2>
            <p className="text-lg text-lokka-secondary">
              Virksomheter og næringsaktører i området
            </p>
          </div>

          {/* Key competition stats */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Topp 3 Aktører
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">52%</p>
              <p className="text-sm text-purple-700">Markedsandel kombinert</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Total Omsetning
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">NOK 122M</p>
              <div className="flex items-center gap-1 text-sm text-green-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>+4% vekst</span>
              </div>
            </div>

            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Mat & Opplevelser
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">75%</p>
              <p className="text-sm text-purple-700">Av virksomhetene</p>
            </div>
          </div>

          {/* Top 3 dominance */}
          <div className="mb-8 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-medium md:p-8">
            <h3 className="mb-4 text-xl font-bold text-red-900">Topp 3 Aktører</h3>
            <p className="mb-6 text-sm text-red-700">
              De tre største aktørene kontrollerer over halvparten av omsetningen i området
            </p>

            <div className="space-y-4">
              {/* Sharika AS */}
              <div className="rounded-xl bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-red-900">Sharika AS</span>
                  <span className="text-2xl font-bold text-red-900">30.33%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-red-500" style={{width: '30.33%'}}></div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-semibold text-red-900">NOK 37M</p>
                    <p className="text-gray-600">Omsetning</p>
                  </div>
                  <div>
                    <p className="font-semibold text-red-900">42</p>
                    <p className="text-gray-600">Ansatte</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">+77%</p>
                    <p className="text-gray-600">YoY vekst</p>
                  </div>
                </div>
              </div>

              {/* Sabrura Markveien AS */}
              <div className="rounded-xl bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-900">Sabrura Markveien AS</span>
                  <span className="text-2xl font-bold text-orange-900">11.48%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-orange-500" style={{width: '11.48%'}}></div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-semibold text-orange-900">NOK 14M</p>
                    <p className="text-gray-600">Omsetning</p>
                  </div>
                  <div>
                    <p className="font-semibold text-orange-900">19</p>
                    <p className="text-gray-600">Ansatte</p>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700">-21%</p>
                    <p className="text-gray-600">YoY vekst</p>
                  </div>
                </div>
              </div>

              {/* Flamme Burger */}
              <div className="rounded-xl bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-900">Flamme Burger Grunerløkka AS</span>
                  <span className="text-2xl font-bold text-amber-900">10.66%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-amber-500" style={{width: '10.66%'}}></div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-semibold text-amber-900">NOK 13M</p>
                    <p className="text-gray-600">Omsetning</p>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">12</p>
                    <p className="text-gray-600">Ansatte</p>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700">-8%</p>
                    <p className="text-gray-600">YoY vekst</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-red-100 p-4">
              <p className="text-sm text-red-900">
                <strong>Observasjon:</strong> De tre største aktørene (Sharika AS, Sabrura Markveien AS,
                Flamme Burger) kontrollerer 52% av omsetningen. Sharika AS skiller seg ut med sterk
                vekst (+77%) og høyest markedsandel.
              </p>
            </div>
          </div>

          {/* Heat Map - Area Overview */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-bold text-lokka-primary">
              Områdeoversikt med Bevegelsesmønster
            </h3>
            <ExpandableImage
              src="/images/analyser/nederst-i-markveien-heatmap.png"
              alt="Heat map - Bevegelsesmønster Nederst i Markveien"
              width={1600}
              height={1200}
              borderColor="purple"
              bgColor="purple-50"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
              quality={80}
              caption={
                <p className="text-sm text-lokka-secondary">
                  <strong>Heat map:</strong> Området viser høy konsentrasjon av bevegelse langs Markveien,
                  med særlig aktivitet rundt spisesteder og Kaffebrenneriet.
                </p>
              }
            />
          </div>
        </section>

        {/* 4. KORTHANDEL */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-amber-500 pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">4. Korthandel</h2>
            <p className="text-lg text-lokka-secondary">
              Banktransaksjoner og kortbruk i området
            </p>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                Total Korthandel (Periode)
              </h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 3.3 mrd.</p>
              <p className="text-sm text-amber-700">Hele perioden (3 år)</p>
            </div>

            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                Beløp per Transaksjon
              </h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 215</p>
              <p className="text-sm text-amber-700">Gjennomsnitt</p>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 p-6">
            <h4 className="mb-3 font-semibold text-amber-900">Korthandelstrender</h4>
            <div className="space-y-2 text-sm text-amber-800">
              <p><strong>Daglig korthandel:</strong> NOK 1.3 millioner</p>
              <p><strong>Status:</strong> Faktiske data</p>
              <p><strong>Kilde:</strong> BankAxept</p>
              <p><strong>Periode:</strong> 01.10.2022 – 30.09.2025</p>
            </div>
          </div>
        </section>

        {/* Datakilder og metode */}
        <section className="mb-12">
          <div className="rounded-2xl border-2 border-natural-sage/30 bg-gradient-to-br from-natural-sage/5 to-white p-8 shadow-medium">
            <h2 className="mb-6 text-2xl font-bold text-lokka-primary">Datakilder og Metodikk</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">Bevegelse og Besøkende</h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p><strong>Kilde:</strong> Telia (mobildata)</p>
                  <p><strong>Status:</strong> Estimert</p>
                  <p><strong>Metode:</strong> Aggregert mobildata anonymisert for personvern</p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">Demografi</h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p><strong>Kilde:</strong> Statistisk sentralbyrå, Geodata</p>
                  <p><strong>Status:</strong> Estimert</p>
                  <p><strong>År:</strong> 2023</p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">Korthandel</h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p><strong>Kilde:</strong> BankAxept</p>
                  <p><strong>Status:</strong> Faktiske data</p>
                  <p><strong>Dekning:</strong> Alle korttransaksjoner i området</p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-natural-forest">Konkurransebilde</h3>
                <div className="space-y-2 text-sm text-lokka-secondary">
                  <p><strong>Kilde:</strong> Analysebutikken</p>
                  <p><strong>Status:</strong> Estimerte tall</p>
                  <p><strong>År:</strong> 2024</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-natural-sage/10 p-4">
              <p className="text-sm text-natural-forest">
                <strong>Viktig:</strong> Datasettet er kun for intern bruk og analyse.
                Henvis alltid til Plaace og datakilde (BankAxept, Telia, Analysebutikken eller SSB)
                når dataen brukes i grafer eller rapporter.
              </p>
            </div>
          </div>
        </section>

        {/* Actor Overview Section */}
        <AktorOversikt
          actors={aktorData.actors}
          categoryStats={aktorData.categoryStats}
          metadata={aktorData.metadata}
        />
      </Container>
    </>
  );
}
