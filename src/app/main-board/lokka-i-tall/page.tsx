import Container from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import FadeIn from '@/components/ui/FadeIn';
import {
  StreetWeeklyChart,
  SeasonChart,
  WholeAreaWeeklyChart,
  HourlyChart,
  OriginChart,
} from '@/components/lokka-i-tall/LokkaITallCharts';
import LokkaMethodology from '@/components/lokka-i-tall/LokkaMethodology';

import ovreTmgNokkel from '@/data/main-board/ovre-thorvald-meyers-gate/nokkeldata.json';
import nedreTmgNokkel from '@/data/main-board/nedre-thorvald-meyers-gate/nokkeldata.json';
import midtMvNokkel from '@/data/main-board/midt-i-markveien/nokkeldata.json';
import nederstMvNokkel from '@/data/main-board/nederst-i-markveien/nokkeldata.json';
import orp7Nokkel from '@/data/main-board/olaf-ryes-plass-7eleven/nokkeldata.json';
import orpBootsNokkel from '@/data/main-board/olaf-ryes-plass-boots/nokkeldata.json';

import ovreTmgUke from '@/data/main-board/ovre-thorvald-meyers-gate/bevegelse/besok-per-ukedag.json';
import nedreTmgUke from '@/data/main-board/nedre-thorvald-meyers-gate/bevegelse/besok-per-ukedag.json';
import midtMvUke from '@/data/main-board/midt-i-markveien/bevegelse/besok-per-ukedag.json';
import nederstMvUke from '@/data/main-board/nederst-i-markveien/bevegelse/besok-per-ukedag.json';
import orp7Uke from '@/data/main-board/olaf-ryes-plass-7eleven/bevegelse/besok-per-ukedag.json';
import orpBootsUke from '@/data/main-board/olaf-ryes-plass-boots/bevegelse/besok-per-ukedag.json';

import aktorData from '@/data/main-board/aktorer/2025-arsrapport.json';
import ovreTmgAktorer from '@/data/main-board/aktorer/ovre-thorvald-meyers-gate.json';
import nedreTmgAktorer from '@/data/main-board/aktorer/nedre-thorvald-meyers-gate.json';
import midtMvAktorer from '@/data/main-board/aktorer/midt-i-markveien.json';
import nederstMvAktorer from '@/data/main-board/aktorer/nederst-i-markveien.json';

export const metadata = {
  title: 'Løkka i tall',
  description: 'Fokusert analyse: fottrafikk, besøksmønstre, aktøroversikt og bevegelse for Grünerløkka',
};

const DAYS = ['man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.', 'søn.'];

function extractBesokende(
  row: Record<string, unknown>,
  areaKey?: string
): number {
  if (areaKey) {
    return (row as Record<string, number>)[areaKey] ?? 0;
  }
  if ('besokende' in row) return (row as { besokende: number }).besokende;
  const key = Object.keys(row).find(k => k.includes('Besokende') || k.includes('Besøkende'));
  return key ? (row as Record<string, number>)[key] ?? 0 : 0;
}

function findBesokendeKey(data: Record<string, unknown>[]): string | undefined {
  if (!data[0]) return undefined;
  return Object.keys(data[0]).find(k => k.includes('Besokende') || k.includes('Besøkende'));
}

function getBootsData(): Record<string, unknown>[] {
  const raw = orpBootsUke as unknown;
  if (Array.isArray(raw)) return raw as Record<string, unknown>[];
  if (raw && typeof raw === 'object' && 'data' in raw) {
    return (raw as { data: Record<string, unknown>[] }).data;
  }
  return [];
}

function combineWeekly(
  a: Record<string, unknown>[],
  b: Record<string, unknown>[],
  keyA?: string,
  keyB?: string
) {
  return DAYS.map((dag, i) => ({
    dag,
    besokende: extractBesokende(a[i] ?? {}, keyA) + extractBesokende(b[i] ?? {}, keyB),
  }));
}

export default function LokkaITallPage() {
  const ovreTmgKey = findBesokendeKey(ovreTmgUke as Record<string, unknown>[]);
  const nedreTmgKey = findBesokendeKey(nedreTmgUke as Record<string, unknown>[]);
  const nederstMvKey = findBesokendeKey(nederstMvUke as Record<string, unknown>[]);
  const orp7Key = findBesokendeKey(orp7Uke as Record<string, unknown>[]);
  const bootsData = getBootsData();
  const bootsKey = findBesokendeKey(bootsData);

  const tmgWeekly = combineWeekly(
    ovreTmgUke as Record<string, unknown>[],
    nedreTmgUke as Record<string, unknown>[],
    ovreTmgKey, nedreTmgKey
  );
  const mvWeekly = combineWeekly(
    midtMvUke as Record<string, unknown>[],
    nederstMvUke as Record<string, unknown>[],
    undefined, nederstMvKey
  );
  const orpWeekly = combineWeekly(
    orp7Uke as Record<string, unknown>[],
    bootsData,
    orp7Key, bootsKey
  );

  const ovreDaglig = (ovreTmgNokkel as Record<string, unknown> & { 'Bevegelse NØKKELTALL': { 'Gjennomsnittlig daglige besøk': { Verdi: number } } })['Bevegelse NØKKELTALL']['Gjennomsnittlig daglige besøk'].Verdi;
  const nedreDaglig = (nedreTmgNokkel as Record<string, unknown> & { 'Bevegelse NØKKELTALL': { 'Gjennomsnittlig daglige besøk': { Verdi: number } } })['Bevegelse NØKKELTALL']['Gjennomsnittlig daglige besøk'].Verdi;
  const midtDaglig = (midtMvNokkel as Record<string, unknown> & { 'Bevegelse NØKKELTALL': { 'Gjennomsnittlig daglige besøk': { Verdi: number } } })['Bevegelse NØKKELTALL']['Gjennomsnittlig daglige besøk'].Verdi;

  const nederstNested = nederstMvNokkel as Record<string, unknown>;
  const nederstInner = Object.values(nederstNested)[0] as Record<string, unknown>;
  const nederstDaglig = ((nederstInner?.['Bevegelse NØKKELTALL'] as Record<string, unknown>)?.['Gjennomsnittlig daglige besøk'] as { Verdi: number })?.Verdi ?? 7177;

  const orp7Daglig = (orp7Nokkel as Record<string, unknown> & { 'Bevegelse NØKKELTALL': { 'Gjennomsnittlig daglige besøk': { Verdi: number } } })['Bevegelse NØKKELTALL']['Gjennomsnittlig daglige besøk'].Verdi;
  const bootsDaglig = (orpBootsNokkel as Record<string, unknown> & { 'Bevegelse NØKKELTALL': { 'Gjennomsnittlig daglige besøk': { Verdi: number } } })['Bevegelse NØKKELTALL']['Gjennomsnittlig daglige besøk'].Verdi;

  const streets = [
    {
      name: 'Thorvald Meyers gate',
      total: ovreDaglig + nedreDaglig,
      areas: [
        { name: 'Øvre (TMG 30, 0.02 km\u00B2)', value: ovreDaglig },
        { name: 'Nedre (TMG 75, 0.04 km\u00B2)', value: nedreDaglig },
      ],
      color: '#1a4d2e',
    },
    {
      name: 'Markveien',
      total: midtDaglig + nederstDaglig,
      areas: [
        { name: 'Midt (Markveien 42E, 0.004 km\u00B2)', value: midtDaglig },
        { name: 'Nederst (Markveien 65, 0.01 km\u00B2)', value: nederstDaglig },
      ],
      color: '#3D7A3E',
    },
    {
      name: 'Olaf Ryes plass',
      total: orp7Daglig + bootsDaglig,
      areas: [
        { name: '7-Eleven-området (0.01 km\u00B2)', value: orp7Daglig },
        { name: 'Boots-området (0.01 km\u00B2)', value: bootsDaglig },
      ],
      color: '#4A8B4C',
    },
  ];

  const seasonData = [
    { kvartal: 'Q1 (jan-mars)', y2023: 54968, y2024: 50096, y2025: 50990 },
    { kvartal: 'Q2 (apr-jun)', y2023: 63006, y2024: 60479, y2025: 56910 },
    { kvartal: 'Q3 (jul-sep)', y2023: 58599, y2024: 53550, y2025: 53281 },
    { kvartal: 'Q4 (okt-des)', y2023: 54790, y2024: 53020, y2025: 53460 },
  ];

  const wholeAreaWeekly = [
    { dag: 'man.', besokende: 47616 },
    { dag: 'tir.', besokende: 49859 },
    { dag: 'ons.', besokende: 51681 },
    { dag: 'tor.', besokende: 53069 },
    { dag: 'fre.', besokende: 61241 },
    { dag: 'lør.', besokende: 64185 },
    { dag: 'søn.', besokende: 48008 },
  ];

  const hourlyData = [
    { time: '00', besokende: 3900 }, { time: '01', besokende: 3558 },
    { time: '02', besokende: 3631 }, { time: '03', besokende: 2918 },
    { time: '04', besokende: 2468 }, { time: '05', besokende: 2465 },
    { time: '06', besokende: 2750 }, { time: '07', besokende: 3100 },
    { time: '08', besokende: 3492 }, { time: '09', besokende: 3570 },
    { time: '10', besokende: 3825 }, { time: '11', besokende: 4310 },
    { time: '12', besokende: 5172 }, { time: '13', besokende: 6208 },
    { time: '14', besokende: 6970 }, { time: '15', besokende: 7813 },
    { time: '16', besokende: 8738 }, { time: '17', besokende: 9225 },
    { time: '18', besokende: 9060 }, { time: '19', besokende: 8376 },
    { time: '20', besokende: 7229 }, { time: '21', besokende: 6005 },
    { time: '22', besokende: 5093 }, { time: '23', besokende: 4425 },
  ];

  const originData = [
    { omrade: 'Grünerløkka', prosent: 14.59 },
    { omrade: 'Torshov', prosent: 7.33 },
    { omrade: 'Rodeløkka', prosent: 7.27 },
    { omrade: 'Sentrum', prosent: 6.35 },
    { omrade: 'Gamle Aker', prosent: 3.53 },
    { omrade: 'Tøyen', prosent: 3.02 },
    { omrade: 'Grønland', prosent: 2.16 },
    { omrade: 'Ila', prosent: 1.89 },
    { omrade: 'Hasle', prosent: 1.65 },
    { omrade: 'Bjerke', prosent: 1.48 },
  ];

  const { categoryStats, metadata: aktorMeta, actors } = aktorData;
  const top10 = actors.slice(0, 10);

  const areaActors = [
    { name: 'Øvre TMG', count: ovreTmgAktorer.metadata.totalActors, revenue: Math.round(ovreTmgAktorer.metadata.totalRevenue), profile: 'Handels-dominert' },
    { name: 'Nedre TMG', count: nedreTmgAktorer.metadata.totalActors, revenue: Math.round(nedreTmgAktorer.metadata.totalRevenue), profile: 'Restaurant-tungt' },
    { name: 'Midt i Markveien', count: midtMvAktorer.metadata.totalActors, revenue: midtMvAktorer.metadata.totalRevenue, profile: 'Få, sterke aktører' },
    { name: 'Nederst i Markveien', count: nederstMvAktorer.metadata.totalActors, revenue: nederstMvAktorer.metadata.totalRevenue, profile: 'Mat og uteliv' },
  ];

  return (
    <Container className="py-8">
      {/* Hero */}
      <FadeIn direction="down">
        <div className="mb-8">
          <div className="mb-2 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800">
            Fokusert analyse 2026
          </div>
          <h1 className="mb-2 text-3xl font-bold text-natural-forest md:text-4xl">
            Løkka i tall
          </h1>
          <p className="max-w-2xl text-gray-600">
            Fottrafikk, besøksmønstre og næringsaktører for Grünerløkka.
            Basert på 3 år med Telia mobildata og Plaace.ai aktørkartlegging.
          </p>
        </div>
      </FadeIn>

      {/* KPI Strip */}
      <FadeIn delay={100} direction="up">
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Daglige besøkende (2025)</div>
              <div className="mt-1 text-3xl font-bold text-natural-forest">~53 700</div>
              <div className="mt-1 text-xs text-gray-400">Hele Grünerløkka, 1.14 km²</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Kartlagte virksomheter</div>
              <div className="mt-1 text-3xl font-bold text-natural-forest">{aktorMeta.totalActors}</div>
              <div className="mt-1 text-xs text-gray-400">Plaace.ai aktørkartlegging</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Datagrunnlag</div>
              <div className="mt-1 text-3xl font-bold text-natural-forest">3 år</div>
              <div className="mt-1 text-xs text-gray-400">Okt 2022 - sept 2025 (Telia)</div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Metodologi */}
      <FadeIn delay={150} direction="up">
        <LokkaMethodology />
      </FadeIn>

      {/* SEKSJON 1: FOTTRAFIKK */}
      <FadeIn delay={200} direction="up">
        <div className="mb-12">
          <div className="mb-1 text-xs font-bold uppercase tracking-widest text-green-600">Seksjon 1</div>
          <h2 className="mb-2 text-2xl font-bold text-natural-forest">Fottrafikk per gate</h2>
          <p className="mb-6 text-sm text-gray-500">Gjennomsnittlig daglig trafikk målt med Telia mobildata over 3 år.</p>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            {streets.map(street => (
              <div
                key={street.name}
                className="rounded-xl p-6 text-center text-white"
                style={{ background: `linear-gradient(135deg, ${street.color}, ${street.color}dd)` }}
              >
                <div className="text-sm font-medium opacity-80">{street.name}</div>
                <div className="my-2 text-4xl font-extrabold">{street.total.toLocaleString('nb-NO')}</div>
                <div className="text-xs opacity-60">personer per dag</div>
                <div className="mt-3 space-y-1 text-left text-xs">
                  {street.areas.map(area => (
                    <div key={area.name} className="flex justify-between border-t border-white/20 pt-1">
                      <span className="opacity-70">{area.name}</span>
                      <span className="font-semibold">{area.value.toLocaleString('nb-NO')}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
            <strong className="text-gray-700">Slik leser du tallene:</strong> TMG har dobbelt så mye trafikk som Markveien,
            som reflekterer at den dekker et større areal (0.06 km² vs 0.014 km²).
            Boots-området har kortere måleperiode (okt 2024 - des 2025). Alle tall er daglige gjennomsnitt.
          </div>

          <h3 className="mb-4 mt-8 text-lg font-semibold text-gray-800">Besøkende per ukedag (kun besøkende, ikke bosatte/arbeidende)</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: 'Thorvald Meyers gate', data: tmgWeekly, color: '#1a4d2e' },
              { title: 'Markveien', data: mvWeekly, color: '#3D7A3E' },
              { title: 'Olaf Ryes plass', data: orpWeekly, color: '#4A8B4C' },
            ].map(chart => (
              <Card key={chart.title}>
                <CardContent>
                  <h4 className="mb-2 text-sm font-semibold text-gray-700">{chart.title}</h4>
                  <StreetWeeklyChart data={chart.data} color={chart.color} />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 rounded-lg border-l-4 border-green-700 bg-green-50 p-4 text-sm">
            <strong className="text-green-800">Nøkkelfunn:</strong> Lørdag er den travleste dagen i alle gater,
            med 50-65% flere besøkende enn mandager.
          </div>
        </div>
      </FadeIn>

      {/* SEKSJON 2: BESØKSMØNSTRE */}
      <FadeIn delay={250} direction="up">
        <div className="mb-12">
          <div className="mb-1 text-xs font-bold uppercase tracking-widest text-green-600">Seksjon 2</div>
          <h2 className="mb-2 text-2xl font-bold text-natural-forest">Besøksmønstre gjennom året og uka</h2>
          <p className="mb-6 text-sm text-gray-500">Grunnlag for årshjul og arrangementsplanlegging med Visitt Løkka.</p>

          <Card className="mb-6">
            <CardContent>
              <h3 className="mb-1 text-base font-semibold text-gray-800">Sesongvariasjon: Besøkende per kvartal (2023-2025)</h3>
              <p className="mb-4 text-xs text-gray-500">Daglig gjennomsnitt besøkende per kvartal, hele Grünerløkka.</p>
              <SeasonChart data={seasonData} />
              <div className="mt-4 rounded-lg border-l-4 border-green-700 bg-green-50 p-4 text-sm">
                <strong className="text-green-800">For arrangementsplanlegging:</strong> Q2 (april-juni) er høysesong med opp mot 63 000 daglig.
                Q1 er lavsesong. Aktiviteter på våren og forsommeren når flest. Nedgang 2023-2025 (ca. 7%) sees også nasjonalt i bysentra.
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent>
                <h3 className="mb-1 text-base font-semibold text-gray-800">Ukemønster (2025)</h3>
                <p className="mb-4 text-xs text-gray-500">Daglig gjennomsnitt besøkende, hele Grünerløkka.</p>
                <WholeAreaWeeklyChart data={wholeAreaWeekly} />
                <div className="mt-4 rounded-lg border-l-4 border-green-700 bg-green-50 p-3 text-sm">
                  <strong className="text-green-800">Topp:</strong> Lørdag: 64 185. <strong>Bunn:</strong> Mandag: 47 616. Lørdag har 35% flere enn mandag.
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="mb-1 text-base font-semibold text-gray-800">Timesmønster (2025)</h3>
                <p className="mb-4 text-xs text-gray-500">Daglig gjennomsnitt besøkende per klokketime.</p>
                <HourlyChart data={hourlyData} />
                <div className="mt-4 rounded-lg border-l-4 border-green-700 bg-green-50 p-3 text-sm">
                  <strong className="text-green-800">Topptime:</strong> kl. 17 med 9 225. <strong>Beste vindu:</strong> 15:00-18:00. Fortsatt høyt 18-20.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeIn>

      {/* SEKSJON 3: AKTØROVERSIKT */}
      <FadeIn delay={300} direction="up">
        <div className="mb-12">
          <div className="mb-1 text-xs font-bold uppercase tracking-widest text-green-600">Seksjon 3</div>
          <h2 className="mb-2 text-2xl font-bold text-natural-forest">Aktøroversikt</h2>
          <p className="mb-6 text-sm text-gray-500">{aktorMeta.totalActors} virksomheter kartlagt på Grünerløkka.</p>

          {/* KPI row */}
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-green-800 to-green-900 p-5 text-center text-white">
              <div className="text-3xl font-extrabold text-green-300">{aktorMeta.totalActors}</div>
              <div className="text-xs opacity-70">virksomheter totalt</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-green-800 to-green-900 p-5 text-center text-white">
              <div className="text-3xl font-extrabold text-green-300">{aktorMeta.totalRevenue.toLocaleString('nb-NO')}M</div>
              <div className="text-xs opacity-70">samlet omsetning (NOK)</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-green-800 to-green-900 p-5 text-center text-white">
              <div className="text-3xl font-extrabold text-green-300">{aktorMeta.totalEmployees.toLocaleString('nb-NO')}</div>
              <div className="text-xs opacity-70">ansatte totalt</div>
            </div>
          </div>

          {/* Category bar */}
          <Card className="mb-6">
            <CardContent>
              <h3 className="mb-3 text-base font-semibold text-gray-800">Kategorifordeling</h3>
              <div className="mb-4 flex h-8 overflow-hidden rounded-lg">
                <div className="flex items-center justify-center text-xs font-semibold text-white" style={{ width: '51%', background: '#EF4444' }}>Mat og opplevelser 51%</div>
                <div className="flex items-center justify-center text-xs font-semibold text-white" style={{ width: '35%', background: '#3B82F6' }}>Handel 35%</div>
                <div className="flex items-center justify-center text-xs font-semibold text-white" style={{ width: '14%', background: '#8B5CF6' }}>Tjenester 14%</div>
              </div>
              <div className="grid gap-4 text-sm md:grid-cols-3">
                <div>
                  <div className="font-bold text-red-500">Mat og opplevelser</div>
                  <div>{categoryStats['Mat og opplevelser'].count} virksomheter</div>
                  <div className="text-gray-500">{categoryStats['Mat og opplevelser'].omsetning.toLocaleString('nb-NO')}M NOK</div>
                </div>
                <div>
                  <div className="font-bold text-blue-500">Handel</div>
                  <div>{categoryStats.Handel.count} virksomheter</div>
                  <div className="text-gray-500">{categoryStats.Handel.omsetning.toLocaleString('nb-NO')}M NOK</div>
                </div>
                <div>
                  <div className="font-bold text-purple-500">Tjenester</div>
                  <div>{categoryStats.Tjenester.count} virksomheter</div>
                  <div className="text-gray-500">{categoryStats.Tjenester.omsetning.toLocaleString('nb-NO')}M NOK</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Per-street actors */}
          <Card className="mb-6">
            <CardContent>
              <h3 className="mb-3 text-base font-semibold text-gray-800">Aktørmiks per gate</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                      <th className="py-3 pr-4">Område</th>
                      <th className="py-3 pr-4">Antall</th>
                      <th className="py-3 pr-4">Omsetning</th>
                      <th className="py-3">Profil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areaActors.map(area => (
                      <tr key={area.name} className="border-b border-gray-100">
                        <td className="py-3 pr-4 font-semibold text-gray-800">{area.name}</td>
                        <td className="py-3 pr-4">{area.count}</td>
                        <td className="py-3 pr-4">{area.revenue}M NOK</td>
                        <td className="py-3 text-gray-500">{area.profile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Top 10 */}
          <Card>
            <CardContent>
              <h3 className="mb-3 text-base font-semibold text-gray-800">Topp 10 aktører etter omsetning</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                      <th className="py-3 pr-2">#</th>
                      <th className="py-3 pr-4">Virksomhet</th>
                      <th className="py-3 pr-4">Type</th>
                      <th className="py-3 pr-4">Omsetning</th>
                      <th className="py-3">Markedsandel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top10.map((a, i) => (
                      <tr key={a.navn} className="border-b border-gray-100">
                        <td className="py-2 pr-2 font-bold text-green-800">{i + 1}</td>
                        <td className="py-2 pr-4 font-medium">{a.navn}</td>
                        <td className="py-2 pr-4 text-gray-500">{a.type}</td>
                        <td className="py-2 pr-4">{a.omsetning}M</td>
                        <td className="py-2">{a.markedsandel}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* SEKSJON 4: BEVEGELSESMØNSTRE */}
      <FadeIn delay={350} direction="up">
        <div className="mb-12">
          <div className="mb-1 text-xs font-bold uppercase tracking-widest text-green-600">Seksjon 4</div>
          <h2 className="mb-2 text-2xl font-bold text-natural-forest">Hvor kommer besøkende fra?</h2>
          <p className="mb-6 text-sm text-gray-500">Geografisk opprinnelse, Telia mobildata 2024 (99,4% dekning).</p>

          <Card>
            <CardContent>
              <h3 className="mb-3 text-base font-semibold text-gray-800">Topp 10 opprinnelsesområder</h3>
              <OriginChart data={originData} />
              <div className="mt-4 rounded-lg border-l-4 border-green-700 bg-green-50 p-4 text-sm">
                <strong className="text-green-800">Nøkkelfunn:</strong> Over 35% av besøkende kommer fra Grünerløkka og de nærmeste naboområdene.
                Sentrum bidrar med 6,4%. Lokal markedsføring og samarbeid med nabobydeler kan være svært effektivt.
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
        <p>Utarbeidet av Natural State for Løkka Gårdeierforening &mdash; April 2026</p>
        <p className="mt-1">Datakilder: Telia mobildata (3 år) &bull; Plaace.ai aktørkartlegging</p>
      </div>
    </Container>
  );
}
