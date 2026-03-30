import Container from '@/components/ui/Container';
import Link from 'next/link';
import footfallData from '@/data/main-board/analyser/arsmotet/footfall-aggregert.json';
import aktorData from '@/data/main-board/aktorer/2025-arsrapport.json';
import combinedData from '@/data/main-board/aktorer/sammenligning-2024/combined.json';
import ArsmotetClient from './client';

export const metadata = {
  title: 'Årsmøte 2026 - Plattformrapport',
  description: 'Presentasjon av Løkka Gårdeierforening-plattformen for årsmøtet 2026',
};

export default function ArsmotetPage() {
  const topActors = aktorData.actors.slice(0, 10);

  return (
    <>
      <section className="print:hidden border-b border-gray-200 bg-gradient-to-br from-natural-forest to-natural-sage py-12">
        <Container>
          <Link
            href="/main-board/analyser"
            className="mb-4 inline-flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            &larr; Tilbake til analyser
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Årsmøte 2026</h1>
          <p className="text-lg text-gray-700">
            Plattformrapport for Løkka Gårdeierforening
          </p>
        </Container>
      </section>

      <Container className="py-8 md:py-12">
        {/* SEKSJON 1: Hero - Løkka i tall */}
        <section className="mb-16 md:mb-20 print:mb-8 print:break-inside-avoid">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-natural-forest print:text-2xl">
              Grünerløkka i tall
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Nøkkeltall fra plattformen, basert på data fra Plaace.ai, Telia og BankAxept
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard
              label="Aktører kartlagt"
              value={aktorData.metadata.totalActors.toLocaleString('nb-NO')}
              sub="bedrifter"
            />
            <StatCard
              label="Total omsetning"
              value={`${aktorData.metadata.totalRevenue.toLocaleString('nb-NO')}M`}
              sub="NOK"
            />
            <StatCard
              label="Ansatte"
              value={aktorData.metadata.totalEmployees.toLocaleString('nb-NO')}
              sub="totalt"
            />
            <StatCard
              label="Daglige besøkende"
              value={footfallData.aggregert.dagligBesokende.toLocaleString('nb-NO')}
              sub="snitt (4 av 6 soner)"
            />
            <StatCard
              label="Mikro-områder"
              value="6"
              sub="analyserte soner"
            />
          </div>
        </section>

        {/* SEKSJON 2: Footfall-oversikt */}
        <section className="mb-16 md:mb-20 print:mb-8 print:break-inside-avoid">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-natural-forest md:text-3xl print:text-2xl">
              Fotgjengertrafikk
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Aggregert bevegelsesdata fra {footfallData.metadata.antallSoner} mikro-områder
              ({footfallData.metadata.sonerMedData} med data). Periode: {footfallData.metadata.periode}
            </p>
          </div>

          <ArsmotetClient footfallData={footfallData} />
        </section>

        {/* SEKSJON 3: Footfall-kart */}
        <section className="mb-16 md:mb-20 print:mb-8 print:break-inside-avoid">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-natural-forest md:text-3xl print:text-2xl">
              Kartutsnitt med fotgjengertrafikk
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Daglig gjennomsnitt besøkende per mikro-område (1 minutts gange, naturlig inndeling)
            </p>
          </div>

          <ArsmotetClient footfallData={footfallData} mapOnly />
        </section>

        {/* SEKSJON 4: Aktørmiks */}
        <section className="mb-16 md:mb-20 print:mb-8 print:break-inside-avoid">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-natural-forest md:text-3xl print:text-2xl">
              Aktørmiks
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Oversikt over {aktorData.metadata.totalActors} kartlagte bedrifter på Grünerløkka (2025)
            </p>
          </div>

          {/* Kategorifordeling */}
          <div className="mb-8 grid gap-5 sm:grid-cols-3">
            <CategoryCard
              name="Handel"
              count={aktorData.categoryStats.Handel.count}
              revenue={aktorData.categoryStats.Handel.omsetning}
              employees={aktorData.categoryStats.Handel.ansatte}
              color="#3B82F6"
            />
            <CategoryCard
              name="Mat og opplevelser"
              count={aktorData.categoryStats['Mat og opplevelser'].count}
              revenue={aktorData.categoryStats['Mat og opplevelser'].omsetning}
              employees={aktorData.categoryStats['Mat og opplevelser'].ansatte}
              color="#EF4444"
            />
            <CategoryCard
              name="Tjenester"
              count={aktorData.categoryStats.Tjenester.count}
              revenue={aktorData.categoryStats.Tjenester.omsetning}
              employees={aktorData.categoryStats.Tjenester.ansatte}
              color="#8B5CF6"
            />
          </div>

          {/* Topp 10 aktører */}
          <div className="rounded-xl border border-gray-200/50 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-4 md:p-6">
              <h3 className="text-lg font-bold text-natural-forest">Topp 10 aktører</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-4 py-3 md:px-6">#</th>
                    <th className="px-4 py-3 md:px-6">Navn</th>
                    <th className="px-4 py-3 md:px-6">Type</th>
                    <th className="px-4 py-3 text-right md:px-6">Omsetning</th>
                    <th className="px-4 py-3 text-right md:px-6">Ansatte</th>
                    <th className="px-4 py-3 text-right md:px-6">Markedsandel</th>
                  </tr>
                </thead>
                <tbody>
                  {topActors.map((actor) => (
                    <tr key={actor.rank} className="border-b border-gray-50 last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-400 md:px-6">{actor.rank}</td>
                      <td className="px-4 py-3 font-semibold text-natural-forest md:px-6">{actor.navn}</td>
                      <td className="px-4 py-3 text-gray-600 md:px-6">{actor.type}</td>
                      <td className="px-4 py-3 text-right font-medium md:px-6">{actor.omsetning}M</td>
                      <td className="px-4 py-3 text-right md:px-6">{actor.ansatte}</td>
                      <td className="px-4 py-3 text-right md:px-6">{actor.markedsandel}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SEKSJON 5: Sammenligning */}
        <section className="mb-16 md:mb-20 print:mb-8 print:break-inside-avoid">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-natural-forest md:text-3xl print:text-2xl">
              Sammenligning med andre bydeler
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Grünerløkka sammenlignet med Bjørvika, Sentrum og Majorstuen (aktørkartlegging 2024)
            </p>
          </div>

          {/* Sammendrag-kort */}
          <div className="mb-8 grid gap-5 md:grid-cols-4">
            {Object.entries(combinedData.areas).map(([key, area]) => {
              const avgRevenue = Math.round(area.totalRevenue / area.totalActors);
              return (
                <div
                  key={key}
                  className="relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm md:p-6"
                >
                  <div
                    className="absolute right-0 top-0 h-2 w-full"
                    style={{ backgroundColor: area.color }}
                  />
                  <div className="mt-3">
                    <h4 className="text-lg font-bold text-natural-forest">{area.displayName}</h4>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Aktører:</span>
                        <span className="font-semibold">{area.totalActors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Omsetning:</span>
                        <span className="font-semibold">{area.totalRevenue.toLocaleString('nb-NO')}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ansatte:</span>
                        <span className="font-semibold">{area.totalEmployees.toLocaleString('nb-NO')}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-100 pt-2">
                        <span className="text-gray-600">Snitt/aktør:</span>
                        <span className="font-semibold">{avgRevenue}M</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm md:p-6">
            <h3 className="mb-4 text-lg font-bold text-natural-forest">Oversikt</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-natural-forest">
                  {combinedData.metadata.totalActors.toLocaleString('nb-NO')}
                </div>
                <div className="text-xs text-gray-500">bedrifter totalt</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-natural-forest">
                  {combinedData.metadata.totalRevenue.toLocaleString('nb-NO')}M
                </div>
                <div className="text-xs text-gray-500">NOK total omsetning</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-natural-forest">
                  {combinedData.metadata.totalEmployees.toLocaleString('nb-NO')}
                </div>
                <div className="text-xs text-gray-500">ansatte totalt</div>
              </div>
            </div>
          </div>
        </section>

        {/* SEKSJON 6: Plattformverdi */}
        <section className="mb-16 md:mb-20 print:mb-8 print:break-inside-avoid">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-natural-forest md:text-3xl print:text-2xl">
              Plattformens merverdi
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Hva plattformen gir utover et standard Plaace-abonnement
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200/50 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3 md:px-6">Funksjon</th>
                  <th className="px-4 py-3 md:px-6">Standard Plaace</th>
                  <th className="px-4 py-3 md:px-6">Løkka-plattformen</th>
                </tr>
              </thead>
              <tbody>
                <PlatformRow
                  feature="Eiendomsanalyse"
                  standard="Enkelt-eiendom rapport"
                  custom="Multi-tenant med 51 eiendommer, 9 gårdeiere + hovedstyre"
                />
                <PlatformRow
                  feature="Sammenligning"
                  standard="Ikke tilgjengelig"
                  custom="4-områders komparativ analyse (Bjørvika, Sentrum, Majorstuen)"
                />
                <PlatformRow
                  feature="Mikro-soner"
                  standard="Standard 5-min radius"
                  custom="1-min og 5-min dybdeanalyser per eiendom"
                />
                <PlatformRow
                  feature="Korthandel"
                  standard="Ikke inkludert"
                  custom="BankAxept korttransaksjonsdata (daglig/ukentlig/årlig)"
                />
                <PlatformRow
                  feature="Bevegelsesdata"
                  standard="Begrenset"
                  custom="Telia mobildata med 886 opprinnelsessoner"
                />
                <PlatformRow
                  feature="Konkurranse"
                  standard="Snapshot"
                  custom="10-års tidsserier fra Analysebutikken (2015-2025)"
                />
                <PlatformRow
                  feature="Kulturhistorie"
                  standard="Ikke tilgjengelig"
                  custom="Biblioteket: 170+ hendelser, ildsjeler, litteratur, idrett"
                />
                <PlatformRow
                  feature="Tilgang"
                  standard="Delt login"
                  custom="Per-gårdeier dashboards med sikker OTP-innlogging"
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* SEKSJON 7: Spesialrapporter */}
        <section className="print:break-inside-avoid">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-natural-forest md:text-3xl print:text-2xl">
              Spesialrapporter
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-natural-sage/5 p-6 shadow-sm md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-bold text-natural-forest">4 bestilte analyser per år</h3>
                <p className="text-sm text-gray-600">
                  I tillegg til de faste rapportene kan gårdeierforeningen bestille inntil 4 skreddersydde
                  analyser per år, for eksempel i forbindelse med:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-natural-forest" />
                    Tiltak i samarbeid med Visitt Løkka
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-natural-forest" />
                    Sesonganalyser (sommer/jul/påske)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-natural-forest" />
                    Effektmåling av arrangementer
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-natural-forest" />
                    Ad hoc-analyser ved behov
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-natural-forest">Hva inkluderes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-natural-forest" />
                    Oppdatert aktørkartlegging for valgt område
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-natural-forest" />
                    Bevegelsesdata og fotgjengertrafikk
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-natural-forest" />
                    Korttransaksjonsanalyse (BankAxept)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-natural-forest" />
                    Demografisk profil og besøkendes opprinnelse
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-natural-forest" />
                    Konkurransebilde og markedsutvikling
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Print footer */}
        <div className="mt-12 hidden border-t border-gray-200 pt-6 text-center text-xs text-gray-400 print:block">
          Løkka Gårdeierforening - Plattformrapport 2026 | Generert av Natural State
        </div>
      </Container>
    </>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all hover:shadow-md md:p-6">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 md:text-xs">
        {label}
      </div>
      <div className="text-2xl font-bold text-natural-forest md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs text-gray-600">{sub}</div>
    </div>
  );
}

function CategoryCard({
  name,
  count,
  revenue,
  employees,
  color,
}: {
  name: string
  count: number
  revenue: number
  employees: number
  color: string
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm md:p-6">
      <div className="absolute right-0 top-0 h-2 w-full" style={{ backgroundColor: color }} />
      <div className="mt-2">
        <h4 className="text-lg font-bold text-natural-forest">{name}</h4>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Antall:</span>
            <span className="font-semibold">{count}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Omsetning:</span>
            <span className="font-semibold">{revenue.toLocaleString('nb-NO')}M NOK</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ansatte:</span>
            <span className="font-semibold">{employees.toLocaleString('nb-NO')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformRow({
  feature,
  standard,
  custom,
}: {
  feature: string
  standard: string
  custom: string
}) {
  return (
    <tr className="border-b border-gray-50 last:border-0">
      <td className="px-4 py-3 font-semibold text-natural-forest md:px-6">{feature}</td>
      <td className="px-4 py-3 text-gray-400 md:px-6">{standard}</td>
      <td className="px-4 py-3 font-medium text-gray-800 md:px-6">{custom}</td>
    </tr>
  );
}
