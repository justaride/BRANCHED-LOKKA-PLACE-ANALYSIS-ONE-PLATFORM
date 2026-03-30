'use client';

import Container from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

import nokkeldata from '@/data/main-board/nedre-lokka-utsnitt/nokkeldata.json';
import besokPerTime from '@/data/main-board/nedre-lokka-utsnitt/bevegelse/besok-per-time.json';
import besokPerUkedag from '@/data/main-board/nedre-lokka-utsnitt/bevegelse/besok-per-ukedag.json';
import bevegelsesmonster from '@/data/main-board/nedre-lokka-utsnitt/bevegelse/bevegelsesmonster.json';
import aldersfordeling from '@/data/main-board/nedre-lokka-utsnitt/demografi/aldersfordeling.json';
import antallHus from '@/data/main-board/nedre-lokka-utsnitt/demografi/antall-hus.json';
import antallHusholdninger from '@/data/main-board/nedre-lokka-utsnitt/demografi/antall-husholdninger.json';
import demografiOverTid from '@/data/main-board/nedre-lokka-utsnitt/demografi/demografi-over-tid.json';
import inntektsfordeling from '@/data/main-board/nedre-lokka-utsnitt/demografi/inntektsfordeling.json';
import besAlderKjonn from '@/data/main-board/nedre-lokka-utsnitt/besokende/alders-kjonnsfordeling.json';
import besInntekt from '@/data/main-board/nedre-lokka-utsnitt/besokende/inntektsfordeling.json';
import besOpprinnelse from '@/data/main-board/nedre-lokka-utsnitt/besokende/omrader-besokende-kommer-fra.json';
import besHusholdning from '@/data/main-board/nedre-lokka-utsnitt/besokende/husholdningstypefordeling.json';
import konseptmiks from '@/data/main-board/nedre-lokka-utsnitt/konkurransebilde/konseptmiks.json';
import kjederVsUavhengige from '@/data/main-board/nedre-lokka-utsnitt/konkurransebilde/kjeder-vs-uavhengige.json';
import utviklingPerAr from '@/data/main-board/nedre-lokka-utsnitt/konkurransebilde/utvikling-per-ar.json';
import estimertOmsetning from '@/data/main-board/nedre-lokka-utsnitt/konkurransebilde/estimert-omsetning.json';
import korthandelPerUkedag from '@/data/main-board/nedre-lokka-utsnitt/korthandel/korthandel-per-ukedag.json';
import arligVekst from '@/data/main-board/nedre-lokka-utsnitt/korthandel/arlig-vekst.json';
import korthandelTidsrom from '@/data/main-board/nedre-lokka-utsnitt/korthandel/korthandel-tidsrom.json';
import internasjonalt from '@/data/main-board/nedre-lokka-utsnitt/internasjonalt/kvartalsvis-2024.json';

const COLORS = {
  sage: '#87A878',
  moss: '#4A6741',
  blue: '#3B82F6',
  red: '#EF4444',
  amber: '#F59E0B',
  purple: '#8B5CF6',
  teal: '#14B8A6',
  pink: '#EC4899',
};

const PIE_COLORS = ['#3B82F6', '#EF4444', '#8B5CF6', '#F59E0B', '#14B8A6', '#EC4899', '#6366F1', '#10B981'];

function formatNumber(n: number): string {
  return n.toLocaleString('nb-NO');
}

export default function NedreLokkaUtsnittPage() {
  const topActors = estimertOmsetning.actors.slice(0, 10);
  const topOrigins = besOpprinnelse.slice(0, 15);

  const konseptPie = konseptmiks.reduce((acc: { kategori: string; antall: number }[], item) => {
    const existing = acc.find(a => a.kategori === item.kategori);
    if (existing) existing.antall += item.antall || 0;
    else acc.push({ kategori: item.kategori, antall: item.antall || 0 });
    return acc;
  }, []);

  const korthandelMonthly = korthandelTidsrom.filter(d => d.maaned >= '2023-01' && d.maaned <= '2025-12');

  return (
    <>
      {/* Hero */}
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

      <Container className="py-12">
        {/* Nøkkeltall */}
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

        {/* Relatert analyse-banner */}
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

        {/* 1. BEVEGELSE */}
        <section className="mb-20">
          <SectionHeader color="blue" title="1. Bevegelse" subtitle="Besøksmønstre og bevegelsesdata" />

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Besøk per time (daglig gjennomsnitt)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={besokPerTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatNumber(v)} />
                <Legend />
                <Bar dataKey="besokende" name="Besøkende" fill={COLORS.blue} radius={[2, 2, 0, 0]} />
                <Bar dataKey="paJobb" name="På jobb" fill={COLORS.sage} radius={[2, 2, 0, 0]} />
                <Bar dataKey="hjemme" name="Hjemme" fill={COLORS.purple} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Besøk per ukedag (daglig gjennomsnitt)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={besokPerUkedag}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ukedag" />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatNumber(v)} />
                <Legend />
                <Bar dataKey="besokende" name="Besøkende" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
                <Bar dataKey="paJobb" name="På jobb" fill={COLORS.sage} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Årlig bevegelsesmønster</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bevegelsesmonster}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ar" />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatNumber(v)} />
                <Legend />
                <Bar dataKey="besokende" name="Besøkende" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
                <Bar dataKey="paJobb" name="På jobb" fill={COLORS.sage} radius={[4, 4, 0, 0]} />
                <Bar dataKey="hjemme" name="Hjemme" fill={COLORS.purple} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 2. DEMOGRAFI */}
        <section className="mb-20">
          <SectionHeader color="sage" title="2. Demografi" subtitle="Befolkningsdata og inntektsfordeling" />

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">Befolkning (2024)</h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">5 691</p>
              <p className="text-sm text-green-700">+1% vekst</p>
            </div>
            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">Befolkningstetthet</h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">20 819</p>
              <p className="text-sm text-lokka-secondary">per km²</p>
            </div>
            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">Områdestørrelse</h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">0,27</p>
              <p className="text-sm text-lokka-secondary">km²</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Aldersfordeling (innbyggere)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aldersfordeling} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="aldersgruppe" type="category" width={50} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="mann" name="Menn" fill={COLORS.blue} stackId="a" />
                <Bar dataKey="kvinne" name="Kvinner" fill={COLORS.pink} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-lokka-primary">Befolkning over tid</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={demografiOverTid}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ar" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                  <Tooltip formatter={(v: number) => formatNumber(v)} />
                  <Line type="monotone" dataKey="befolkning" stroke={COLORS.sage} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-lokka-primary">Husholdningstyper</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={antallHusholdninger}
                    dataKey="antall"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {antallHusholdninger.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Inntektsfordeling (innbyggere)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inntektsfordeling}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="inntektsgruppe" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatNumber(v)} />
                <Bar dataKey="antall" name="Antall" fill={COLORS.sage} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 3. BESØKENDE */}
        <section className="mb-20">
          <SectionHeader color="teal" title="3. Besøkende" subtitle="Demografisk profil på besøkende i området" />

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Aldersfordeling – besøkende (årlig estimat)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={besAlderKjonn} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="aldersgruppe" type="category" width={50} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatNumber(v)} />
                <Legend />
                <Bar dataKey="mann" name="Menn" fill={COLORS.blue} stackId="a" />
                <Bar dataKey="kvinne" name="Kvinner" fill={COLORS.pink} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-lokka-primary">Inntektsfordeling – besøkende</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={besInntekt}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="inntektsgruppe" tick={{ fontSize: 9 }} angle={-35} textAnchor="end" height={90} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => formatNumber(v)} />
                  <Bar dataKey="antall" name="Antall besøk" fill={COLORS.teal} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-lokka-primary">Husholdningstype – besøkende</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={besHusholdning}
                    dataKey="antall"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {besHusholdning.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Hvor kommer besøkende fra? (topp 15)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topOrigins} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="omrade" type="category" width={120} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatNumber(v)} />
                <Bar dataKey="antallBesok" name="Daglige besøk" fill={COLORS.blue} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 4. KORTHANDEL */}
        <section className="mb-20">
          <SectionHeader color="amber" title="4. Korthandel" subtitle="Banktransaksjoner og kortbruk" />

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">Daglig Korthandel</h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 2,6M</p>
              <p className="text-sm text-red-600">-8% endring</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">Total (perioden)</h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 948M</p>
              <p className="text-sm text-red-600">-8% endring</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">Per Transaksjon</h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">275 NOK</p>
              <p className="text-sm text-green-700">+3% endring</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Månedlig korthandel (mNOK)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={korthandelMonthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="maaned" tick={{ fontSize: 10 }} interval={2} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)} mNOK`} />
                <Line type="monotone" dataKey="belop" stroke={COLORS.amber} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Korthandel per ukedag (mNOK)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 text-left font-semibold text-lokka-primary">Dag</th>
                    {Object.keys(korthandelPerUkedag[0] || {}).filter(k => k !== 'ukedag').map(year => (
                      <th key={year} className="px-3 py-3 text-right font-semibold text-lokka-primary">{year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {korthandelPerUkedag.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 font-medium text-lokka-primary">{row.ukedag}</td>
                      {Object.entries(row).filter(([k]) => k !== 'ukedag').map(([year, val]) => (
                        <td key={year} className="px-3 py-2 text-right text-lokka-secondary">
                          {typeof val === 'number' ? val.toFixed(2) : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Årlig vekst – sammenligning</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={arligVekst}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ar" />
                <YAxis tick={{ fontSize: 11 }} unit="%" />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Legend />
                <Bar dataKey="grunerlokka.vekstProsent" name="Grünerløkka Sør" fill={COLORS.amber} radius={[4, 4, 0, 0]} />
                <Bar dataKey="oslo.vekstProsent" name="Oslo" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
                <Bar dataKey="norge.vekstProsent" name="Norge" fill={COLORS.sage} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 5. KONKURRANSEBILDE */}
        <section className="mb-20">
          <SectionHeader color="purple" title="5. Konkurransebilde" subtitle="Virksomheter og næringsaktører" />

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">Konsepttetthet</h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">541/km²</p>
              <p className="text-sm text-red-600">-3% endring</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">Total Omsetning</h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">NOK 1,4 mrd.</p>
              <p className="text-sm text-green-700">+7% vekst</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">Omsetningstetthet</h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">NOK 5,3 mrd./km²</p>
              <p className="text-sm text-green-700">+7% vekst</p>
            </div>
          </div>

          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-lokka-primary">Konseptmiks</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={konseptPie}
                    dataKey="antall"
                    nameKey="kategori"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value }: { name?: string; value?: number }) => `${name || ''} (${value || 0})`}
                  >
                    {konseptPie.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-lokka-primary">Kjeder vs. uavhengige (%)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={kjederVsUavhengige}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ar" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[40, 60]} unit="%" />
                  <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="uavhengig" name="Uavhengig" stroke={COLORS.sage} strokeWidth={2} />
                  <Line type="monotone" dataKey="kjeder" name="Kjeder" stroke={COLORS.red} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Omsetning per kategori (mNOK per år)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={utviklingPerAr}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ar" />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `${v.toFixed(0)} mNOK`} />
                <Legend />
                <Bar dataKey="matOgOpplevelser" name="Mat og opplevelser" fill={COLORS.red} stackId="a" />
                <Bar dataKey="handel" name="Handel" fill={COLORS.blue} stackId="a" />
                <Bar dataKey="tjenester" name="Tjenester" fill={COLORS.purple} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Topp 10 aktører */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Topp 10 aktører (estimert omsetning 2024)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 text-left font-semibold">#</th>
                    <th className="py-3 text-left font-semibold">Navn</th>
                    <th className="py-3 text-left font-semibold">Type</th>
                    <th className="py-3 text-right font-semibold">Omsetning</th>
                    <th className="py-3 text-right font-semibold">YoY</th>
                    <th className="py-3 text-right font-semibold">Andel</th>
                  </tr>
                </thead>
                <tbody>
                  {topActors.map(a => (
                    <tr key={a.rank} className="border-b border-gray-100">
                      <td className="py-2 text-lokka-secondary">{a.rank}</td>
                      <td className="py-2 font-medium text-lokka-primary">{a.navn}</td>
                      <td className="py-2 text-lokka-secondary">{a.type}</td>
                      <td className="py-2 text-right">{a.omsetning_raw}</td>
                      <td className={`py-2 text-right ${(a.yoy_vekst ?? 0) >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                        {a.yoy_vekst !== null ? `${a.yoy_vekst}%` : '–'}
                      </td>
                      <td className="py-2 text-right text-lokka-secondary">{a.markedsandel}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-lokka-secondary">
              Totalt {estimertOmsetning.actors.length} aktører i området. Kilde: Plaace.ai / Analysebutikken
            </p>
          </div>
        </section>

        {/* 6. INTERNASJONALE BESØKENDE */}
        <section className="mb-20">
          <SectionHeader color="teal" title="6. Internasjonale besøkende" subtitle="Opprinnelsesland per kvartal 2024" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {internasjonalt.map(q => (
              <div key={q.kvartal} className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-lokka-primary">{q.kvartal} 2024</h3>
                <div className="space-y-2">
                  {q.land.slice(0, 10).map((l, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-lokka-secondary">{l.land}</span>
                      <span className="font-medium text-lokka-primary">{l.prosent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Datakilder */}
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

        {/* Plaace-kart */}
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
      </Container>
    </>
  );
}

function SectionHeader({ color, title, subtitle }: { color: string; title: string; subtitle: string }) {
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

function StatCard({ label, value, detail, color, icon }: { label: string; value: string; detail: string; color: string; icon: React.ReactNode }) {
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
