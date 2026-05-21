import Container from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export function NedreLokkaUtsnittHero() {
  return (
    <section className="relative overflow-hidden border-b border-gray-200">
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image
          src="/images/analyser/nedre-lokka-utsnitt-map.png"
          alt="Nedre Løkka Utsnitt – Kartvisning"
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
              href="/main-board/analyser"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tilbake til oversikt
            </Link>
          </div>
          <div>
            <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              Plaace Utsnitt
            </span>
            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Nedre Løkka Utsnitt
            </h1>
            <p className="mb-4 text-lg text-white/90 md:text-xl">
              Markveien 42E – Komplett områdeanalyse (0,27 km²)
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>5 691 innbyggere (2024)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Periode: 01.01.2023 – 31.12.2025</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export function KeyMetricsSection() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold text-lokka-primary">Nøkkeltall</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Daglige Besøk"
          value="38 792"
          detail="55 545 per km²"
          color="sage"
          icon={<PeopleIcon />}
        />
        <StatCard
          label="Daglig Korthandel"
          value="NOK 2,6M"
          detail="Total: NOK 948M i perioden"
          color="blue"
          icon={<CardIcon />}
        />
        <StatCard
          label="Innbyggere (2024)"
          value="5 691"
          detail="20 819/km² tetthet"
          color="purple"
          icon={<HomeIcon />}
        />
        <StatCard
          label="Total Omsetning"
          value="NOK 1,4 mrd."
          detail="148 aktører, 541/km²"
          color="amber"
          icon={<ChartIcon />}
        />
      </div>
    </section>
  );
}

export function RelatedAnalysisBanner() {
  return (
    <div className="mb-16 rounded-xl border-2 border-natural-sage/30 bg-natural-sage/5 p-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">Relatert analyse</p>
      <p className="mb-3 text-lokka-secondary">
        Dette utsnittet dekker hele Nedre Løkka (0,27 km²) og gir komplett data.
        Se også den detaljerte mikro-områdeanalysen med 6 individuelle soner.
      </p>
      <Link
        href="/main-board/analyser/nedre-lokka-omradeprofil"
        className="inline-flex items-center gap-2 rounded-lg bg-natural-sage px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-natural-moss"
      >
        Nedre Løkka Områdeprofil
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}

export function DataSourcesSection() {
  return (
    <section className="mb-12">
      <div className="rounded-2xl border-2 border-natural-sage/30 bg-gradient-to-br from-natural-sage/5 to-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-lokka-primary">Datakilder og Metodikk</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold text-natural-forest">Bevegelse</h3>
            <p className="text-sm text-lokka-secondary"><strong>Kilde:</strong> Telia (mobildata) | <strong>Status:</strong> Faktiske data | <strong>Periode:</strong> 01.01.2023 – 31.12.2025</p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-natural-forest">Demografi</h3>
            <p className="text-sm text-lokka-secondary"><strong>Kilde:</strong> SSB, Geodata | <strong>Status:</strong> Estimert | <strong>År:</strong> 2024</p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-natural-forest">Korthandel</h3>
            <p className="text-sm text-lokka-secondary"><strong>Kilde:</strong> BankAxept | <strong>Status:</strong> Faktiske data | <strong>Tidsrom:</strong> 2019–2026</p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-natural-forest">Konkurransebilde</h3>
            <p className="text-sm text-lokka-secondary"><strong>Kilde:</strong> Plaace.ai / Analysebutikken | <strong>Status:</strong> Estimert | <strong>År:</strong> 2024</p>
          </div>
        </div>
        <div className="mt-6 rounded-lg bg-natural-sage/10 p-4">
          <p className="text-sm text-natural-forest">
            <strong>Viktig:</strong> Datasettet er kun for intern bruk og analyse.
            Henvis alltid til Plaace og datakilde når dataen brukes i grafer eller rapporter.
          </p>
        </div>
      </div>
    </section>
  );
}

export function PlaaceMapSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-lokka-primary">Plaace-kart</h2>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border-2 border-gray-200 shadow-sm">
        <Image
          src="/images/analyser/nedre-lokka-utsnitt-plaace.png"
          alt="Nedre Løkka – Plaace kartvisning"
          fill
          className="object-cover"
          sizes="100vw"
          quality={80}
        />
      </div>
      <p className="mt-3 text-sm text-lokka-secondary">
        Kart fra Plaace viser utsnittets avgrensning (0,27 km²) rundt Markveien 42E.
      </p>
    </section>
  );
}

export function SectionHeader({ color, title, subtitle }: { color: string; title: string; subtitle: string }) {
  const borderColors: Record<string, string> = {
    blue: 'border-blue-500',
    sage: 'border-natural-sage',
    purple: 'border-purple-500',
    amber: 'border-amber-500',
    teal: 'border-teal-500',
  };
  return (
    <div className={`mb-10 border-l-4 ${borderColors[color] || 'border-gray-500'} pl-6`}>
      <h2 className="mb-2 text-3xl font-bold text-lokka-primary">{title}</h2>
      <p className="text-lg text-lokka-secondary">{subtitle}</p>
    </div>
  );
}

function StatCard({ label, value, detail, color, icon }: { label: string; value: string; detail: string; color: string; icon: ReactNode }) {
  const styles: Record<string, { border: string; bg: string; labelColor: string; valueColor: string; iconColor: string }> = {
    sage: { border: 'border-natural-sage/20', bg: 'from-natural-sage/5 to-white', labelColor: 'text-natural-forest/70', valueColor: 'text-lokka-primary', iconColor: 'text-natural-sage' },
    blue: { border: 'border-blue-200/50', bg: 'from-blue-50 to-white', labelColor: 'text-blue-900/70', valueColor: 'text-blue-900', iconColor: 'text-blue-600' },
    purple: { border: 'border-purple-200/50', bg: 'from-purple-50 to-white', labelColor: 'text-purple-900/70', valueColor: 'text-purple-900', iconColor: 'text-purple-600' },
    amber: { border: 'border-amber-200/50', bg: 'from-amber-50 to-white', labelColor: 'text-amber-900/70', valueColor: 'text-amber-900', iconColor: 'text-amber-600' },
  };
  const s = styles[color] || styles.sage;
  return (
    <div className={`rounded-2xl border-2 ${s.border} bg-gradient-to-br ${s.bg} p-6 shadow-sm`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`text-sm font-semibold uppercase tracking-wider ${s.labelColor}`}>{label}</h3>
        <div className={`h-8 w-8 ${s.iconColor}`}>{icon}</div>
      </div>
      <p className={`mb-2 text-4xl font-bold ${s.valueColor}`}>{value}</p>
      <p className={`text-sm ${s.labelColor}`}>{detail}</p>
    </div>
  );
}

function PeopleIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}
