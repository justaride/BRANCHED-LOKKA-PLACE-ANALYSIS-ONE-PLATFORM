'use client';

import { toRechartsNumber } from '@/lib/utils/recharts';
import Container from '@/components/ui/Container';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  DataSourcesSection,
  KeyMetricsSection,
  NedreLokkaUtsnittHero,
  PlaaceMapSection,
  RelatedAnalysisBanner,
  SectionHeader,
} from './_components/NedreLokkaUtsnittShared';
import {
  buildKonseptPie,
  filterKorthandelMonthly,
  getTopItems,
} from '@/lib/analyser/nedre-lokka-utsnitt';
import {
  getNedreLokkaBevegelseData,
  getNedreLokkaKonkurransebildeData,
  getNedreLokkaKorthandelData,
} from '@/lib/analyser/nedre-lokka-utsnitt-data';

import aldersfordeling from '@/data/main-board/nedre-lokka-utsnitt/demografi/aldersfordeling.json';
import antallHusholdninger from '@/data/main-board/nedre-lokka-utsnitt/demografi/antall-husholdninger.json';
import demografiOverTid from '@/data/main-board/nedre-lokka-utsnitt/demografi/demografi-over-tid.json';
import inntektsfordeling from '@/data/main-board/nedre-lokka-utsnitt/demografi/inntektsfordeling.json';
import besAlderKjonn from '@/data/main-board/nedre-lokka-utsnitt/besokende/alders-kjonnsfordeling.json';
import besInntekt from '@/data/main-board/nedre-lokka-utsnitt/besokende/inntektsfordeling.json';
import besOpprinnelse from '@/data/main-board/nedre-lokka-utsnitt/besokende/omrader-besokende-kommer-fra.json';
import besHusholdning from '@/data/main-board/nedre-lokka-utsnitt/besokende/husholdningstypefordeling.json';
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
  const { besokPerTime, besokPerUkedag, bevegelsesmonster } =
    getNedreLokkaBevegelseData();
  const { korthandelPerUkedag, arligVekst, korthandelTidsrom } =
    getNedreLokkaKorthandelData();
  const {
    konseptmiks,
    kjederVsUavhengige,
    utviklingPerAr,
    estimertOmsetning,
  } = getNedreLokkaKonkurransebildeData();
  const topActors = getTopItems(estimertOmsetning.actors, 10);
  const topOrigins = getTopItems(besOpprinnelse, 15);
  const konseptPie = buildKonseptPie(konseptmiks);
  const korthandelMonthly = filterKorthandelMonthly(
    korthandelTidsrom,
    '2023-01',
    '2025-12',
  );

  return (
    <>
      <NedreLokkaUtsnittHero />

      <Container className="py-12">
        <KeyMetricsSection />
        <RelatedAnalysisBanner />

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
                <Tooltip formatter={(v) => formatNumber(toRechartsNumber(v))} />
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
                <Tooltip formatter={(v) => formatNumber(toRechartsNumber(v))} />
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
                <Tooltip formatter={(v) => formatNumber(toRechartsNumber(v))} />
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
                  <Tooltip formatter={(v) => formatNumber(toRechartsNumber(v))} />
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
                <Tooltip formatter={(v) => formatNumber(toRechartsNumber(v))} />
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
                <Tooltip formatter={(v) => formatNumber(toRechartsNumber(v))} />
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
                  <Tooltip formatter={(v) => formatNumber(toRechartsNumber(v))} />
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
                <Tooltip formatter={(v) => formatNumber(toRechartsNumber(v))} />
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
                <Tooltip formatter={(v) => `${toRechartsNumber(v).toFixed(1)} mNOK`} />
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
                <Tooltip formatter={(v) => `${v}%`} />
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
                  <Tooltip formatter={(v) => `${toRechartsNumber(v).toFixed(1)}%`} />
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
                <Tooltip formatter={(v) => `${toRechartsNumber(v).toFixed(0)} mNOK`} />
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

        <DataSourcesSection />
        <PlaaceMapSection />
      </Container>
    </>
  );
}
