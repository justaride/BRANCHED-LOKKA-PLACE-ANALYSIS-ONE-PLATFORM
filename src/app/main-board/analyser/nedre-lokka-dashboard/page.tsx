import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Nedre Løkka Dashboard - Komplett Markedsanalyse',
  description: 'Omfattende analyse av Nedre Løkka med demografi, besøkende, virksomheter og omsetning',
};

export default function NedreLokkaDashboard() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200/30 bg-gradient-to-br from-natural-forest via-natural-sage to-natural-moss py-16 text-white">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-50 mix-blend-overlay" />

        <Container>
          <div className="relative">
            <div className="mb-6">
              <Link
                href="/main-board/analyser"
                className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <span>←</span> Tilbake til analyser
              </Link>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Nedre Løkka Dashboard
            </h1>
            <p className="mb-6 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
              Komplett markedsanalyse for det definerte området Nedre Løkka med demografi,
              besøkende, virksomheter og omsetningsdata.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur">
                <span className="font-semibold">Sist oppdatert:</span> November 2025
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur">
                <span className="font-semibold">Datakilder:</span> Plaace, Natural State
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16 lg:py-20">
        {/* Quick Stats Overview */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-natural-forest">Nøkkeltall - Oversikt</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-natural-sage/20 bg-gradient-to-br from-natural-light to-white">
              <CardContent className="pt-6">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-natural-sage">
                  Daglige besøkende
                </div>
                <div className="mb-1 text-4xl font-bold text-natural-forest">93,000</div>
                <div className="text-sm text-gray-600">650,000 per uke</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-natural-sage/20 bg-gradient-to-br from-natural-light to-white">
              <CardContent className="pt-6">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-natural-sage">
                  Befolkning
                </div>
                <div className="mb-1 text-4xl font-bold text-natural-forest">~5,420</div>
                <div className="text-sm text-gray-600">I definert område</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-natural-sage/20 bg-gradient-to-br from-natural-light to-white">
              <CardContent className="pt-6">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-natural-sage">
                  Virksomheter
                </div>
                <div className="mb-1 text-4xl font-bold text-natural-forest">~300</div>
                <div className="text-sm text-gray-600">Seksjoner/næringslokaler</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-natural-sage/20 bg-gradient-to-br from-natural-light to-white">
              <CardContent className="pt-6">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-natural-sage">
                  Totalomsetning
                </div>
                <div className="mb-1 text-4xl font-bold text-natural-forest">XXX mill</div>
                <div className="text-sm text-gray-600">2024 data</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 1. FOLK PÅ LØKKA */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-natural-sage pl-6">
            <h2 className="mb-2 text-3xl font-bold text-natural-forest">1. Folk på Løkka</h2>
            <p className="text-lg text-gray-600">
              Demografi, besøkende og bevegelsesmønstre
            </p>
          </div>

          {/* Befolkning */}
          <div className="mb-10">
            <h3 className="mb-6 text-2xl font-bold text-natural-forest">Befolkning i området</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Total befolkning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold text-natural-forest">~5,420</div>
                  <p className="text-sm text-gray-600">
                    I det definerte markedsområdet Nedre Løkka (basert på 1-minutts gange analyse).
                    Til sammenligning bor det 66,404 i hele bydel Grünerløkka (2025).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Befolkningsutvikling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold text-natural-sage">+2.3%</div>
                  <p className="text-sm text-gray-600">
                    Årlig vekst i området. Grünerløkka er en av de raskest voksende bydelene i Oslo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Aldersfordeling */}
          <div className="mb-10">
            <h3 className="mb-6 text-2xl font-bold text-natural-forest">Aldersfordeling</h3>
            <Card>
              <CardHeader>
                <CardTitle>Befolkning fordelt på aldersgrupper</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">0-18 år</span>
                    <span className="text-2xl font-bold text-natural-sage">XX%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">19-35 år</span>
                    <span className="text-2xl font-bold text-natural-sage">XX%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">35-59 år</span>
                    <span className="text-2xl font-bold text-natural-sage">XX%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">Over 60 år</span>
                    <span className="text-2xl font-bold text-natural-sage">XX%</span>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <strong>📊 Data kommer:</strong> Detaljert aldersfordeling vil bli lagt til når Natural State leverer nye data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Besøkende - 93,000 per dag */}
          <div className="mb-10">
            <h3 className="mb-6 text-2xl font-bold text-natural-forest">Daglige besøkende</h3>

            <div className="mb-6 rounded-2xl bg-gradient-to-br from-natural-forest to-natural-sage p-8 text-white shadow-large">
              <div className="mb-4 text-5xl font-bold">93,000</div>
              <p className="text-xl">mennesker besøker Nedre Løkka hver dag i snitt</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                  <div className="mb-1 text-3xl font-bold">650,000</div>
                  <div className="text-sm">Per uke</div>
                </div>
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                  <div className="mb-1 text-3xl font-bold">2.8M</div>
                  <div className="text-sm">Per måned (estimat)</div>
                </div>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Hvor bor de besøkende?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <span className="font-semibold">Sagene</span>
                    <span className="text-lg font-bold text-natural-sage">15%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <span className="font-semibold">St. Hanshaugen</span>
                    <span className="text-lg font-bold text-natural-sage">12%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <span className="font-semibold">Grünerløkka</span>
                    <span className="text-lg font-bold text-natural-sage">18%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <span className="font-semibold">Sentrum</span>
                    <span className="text-lg font-bold text-natural-sage">10%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <span className="font-semibold">Andre områder</span>
                    <span className="text-lg font-bold text-natural-sage">45%</span>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <strong>📊 Data tilgjengelig:</strong> Fra 1-minutts gange analyse. Kan visualiseres bedre med kart.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Aldersgruppe av besøkende</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <svg className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-yellow-900">Data ikke tilgjengelig enda</p>
                      <p className="mt-2 text-sm text-yellow-800">
                        Aldersgruppe av besøkende (ikke bare beboere) må hentes fra Natural State/Plaace.
                        Dette krever analyse av bevegelses data koblet med demografi.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Antall steder per besøk (kortbruk)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <svg className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-yellow-900">Data ikke tilgjengelig enda</p>
                      <p className="mt-2 text-sm text-yellow-800">
                        Gjennomsnittlig antall steder besøkt per person må analyseres fra korthandel-data.
                        Natural State kan levere denne innsikten.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bevegelsesmønstre */}
          <div className="mb-10">
            <h3 className="mb-6 text-2xl font-bold text-natural-forest">Bevegelsesmønstre</h3>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Lokasjonsspesifikk fottrafikk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  Fordeling av de 93,000 daglige besøkende på spesifikke lokasjonspunkter:
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-semibold text-natural-forest">📍 Øverst i Thorvald Meyers gate</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="text-2xl font-bold text-natural-sage">XX,XXX</div>
                      <div className="text-2xl font-bold text-natural-sage">XX%</div>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-semibold text-natural-forest">📍 Nederst i Thorvald Meyers gate</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="text-2xl font-bold text-natural-sage">XX,XXX</div>
                      <div className="text-2xl font-bold text-natural-sage">XX%</div>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-semibold text-natural-forest">📍 Olav Ryes Plass v/7-Eleven</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="text-2xl font-bold text-natural-sage">XX,XXX</div>
                      <div className="text-2xl font-bold text-natural-sage">XX%</div>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-semibold text-natural-forest">📍 Olav Ryes Plass v/Markveien 35 (BOOTS)</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="text-2xl font-bold text-natural-sage">XX,XXX</div>
                      <div className="text-2xl font-bold text-natural-sage">XX%</div>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-semibold text-natural-forest">📍 Midt i Markveien v/Polet</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="text-2xl font-bold text-natural-sage">XX,XXX</div>
                      <div className="text-2xl font-bold text-natural-sage">XX%</div>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-semibold text-natural-forest">📍 Nederst i Markveien v/Kaffebrenneriet</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="text-2xl font-bold text-natural-sage">XX,XXX</div>
                      <div className="text-2xl font-bold text-natural-sage">XX%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <svg className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-yellow-900">GPS-punktdata mangler</p>
                      <p className="mt-2 text-sm text-yellow-800">
                        Detaljert fottrafikk per spesifikk gate-punkt må leveres fra Natural State.
                        Dette krever GPS-baserte bevegelsesdata med høy presisjon.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ukefordeling */}
          <div className="mb-10">
            <h3 className="mb-6 text-2xl font-bold text-natural-forest">Fordeling per ukedag</h3>
            <Card>
              <CardHeader>
                <CardTitle>650,000 besøkende per uke - hvordan fordeler de seg?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">Mandag</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-natural-sage">85,000</div>
                      <div className="text-sm text-gray-600">13.1%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">Tirsdag</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-natural-sage">88,000</div>
                      <div className="text-sm text-gray-600">13.5%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">Onsdag</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-natural-sage">90,000</div>
                      <div className="text-sm text-gray-600">13.8%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">Torsdag</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-natural-sage">92,000</div>
                      <div className="text-sm text-gray-600">14.2%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">Fredag</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-natural-sage">110,000</div>
                      <div className="text-sm text-gray-600">16.9%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-natural-sage/10 to-natural-sage/5 p-4">
                    <span className="font-bold text-natural-forest">Lørdag</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-natural-sage">115,000</div>
                      <div className="text-sm font-semibold text-natural-sage">17.7%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="font-semibold text-natural-forest">Søndag</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-natural-sage">70,000</div>
                      <div className="text-sm text-gray-600">10.8%</div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between rounded-lg bg-natural-forest p-6 text-white">
                    <span className="text-lg font-bold">Total per uke</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold">650,000</div>
                      <div className="text-sm">Snitt 93,000/dag</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <strong>📊 Data tilgjengelig:</strong> Tall fra bevegelse.perUkedag i 1-minutts analyse.
                    Kan visualiseres med søylediagram.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metodikk */}
          <div className="mb-10">
            <h3 className="mb-6 text-2xl font-bold text-natural-forest">Metodikk</h3>
            <Card>
              <CardHeader>
                <CardTitle>Hvordan kom vi frem til 93,000 daglige besøkende?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <svg className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-yellow-900">Metodikk-dokumentasjon mangler</p>
                      <p className="mt-2 text-sm text-yellow-800">
                        Detaljert forklaring på beregningsmetode, datakilder og konfidensintervall
                        må dokumenteres av Natural State/Plaace.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2. REISEVANER */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-natural-sage pl-6">
            <h2 className="mb-2 text-3xl font-bold text-natural-forest">2. Reisevaner</h2>
            <p className="text-lg text-gray-600">
              Hvordan kommer besøkende til området?
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transportmiddel (av 93,000 daglige besøkende)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-2xl">🚍</span>
                    <span className="font-semibold text-natural-forest">Kollektivt</span>
                  </div>
                  <div className="text-3xl font-bold text-natural-sage">XX%</div>
                </div>

                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-2xl">🚶</span>
                    <span className="font-semibold text-natural-forest">Gående</span>
                  </div>
                  <div className="text-3xl font-bold text-natural-sage">XX%</div>
                </div>

                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-2xl">🚴</span>
                    <span className="font-semibold text-natural-forest">Sykkel</span>
                  </div>
                  <div className="text-3xl font-bold text-natural-sage">XX%</div>
                </div>

                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-2xl">🚗</span>
                    <span className="font-semibold text-natural-forest">Bil</span>
                  </div>
                  <div className="text-3xl font-bold text-natural-sage">XX%</div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
                <div className="mb-3 flex items-start gap-3">
                  <svg className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-yellow-900">Data ikke tilgjengelig enda</p>
                    <p className="mt-2 text-sm text-yellow-800">
                      Reisemåte-fordeling må analyseres av Natural State/Plaace.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. ANTALL VIRKSOMHETER */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-natural-sage pl-6">
            <h2 className="mb-2 text-3xl font-bold text-natural-forest">3. Virksomheter på gateplan</h2>
            <p className="text-lg text-gray-600">
              Oversikt over næringslokaler i området
            </p>
          </div>

          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Total antall seksjoner/næringslokaler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-5xl font-bold text-natural-forest">~300</div>
                <p className="text-gray-600">
                  Seksjoner/næringslokaler i det definerte området for Nedre Løkka
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fordeling per kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <span className="font-semibold text-natural-forest">Tjenesteytende/Service</span>
                  <span className="text-2xl font-bold text-natural-sage">XX</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <span className="font-semibold text-natural-forest">Dagligvare/Kiosk</span>
                  <span className="text-2xl font-bold text-natural-sage">XX</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <span className="font-semibold text-natural-forest">Butikker</span>
                  <span className="text-2xl font-bold text-natural-sage">XX</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <span className="font-semibold text-natural-forest">Serveringssteder/Pub</span>
                  <span className="text-2xl font-bold text-natural-sage">XX</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <span className="font-semibold text-natural-forest">Andre</span>
                  <span className="text-2xl font-bold text-natural-sage">XX</span>
                </div>
              </div>

              <div className="mt-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-900">
                  <strong>📊 Data tilgjengelig:</strong> Fra konkurransebilde.konseptmiks og aktører.categoryStats.
                  Må aggregeres og visualiseres.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. HANDELSVANER/OMSETNING */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-natural-sage pl-6">
            <h2 className="mb-2 text-3xl font-bold text-natural-forest">4. Handelsvaner & Omsetning</h2>
            <p className="text-lg text-gray-600">
              Omsetningsdata for virksomheter i området
            </p>
          </div>

          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Totalomsetning 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-5xl font-bold text-natural-forest">XXX mill NOK</div>
                <p className="text-gray-600">
                  For de ~300 seksjonene/arealene i det definerte området
                </p>
                <div className="mt-4 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <strong>📊 Data tilgjengelig:</strong> konkurransebilde.nøkkeltall.totalOmsetning
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Omsetning per kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 font-semibold text-natural-forest">Tjenesteytende/Service</div>
                  <div className="text-3xl font-bold text-natural-sage">XX mill NOK</div>
                </div>
                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 font-semibold text-natural-forest">Dagligvare/Kiosk</div>
                  <div className="text-3xl font-bold text-natural-sage">XX mill NOK</div>
                </div>
                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 font-semibold text-natural-forest">Butikker</div>
                  <div className="text-3xl font-bold text-natural-sage">XX mill NOK</div>
                </div>
                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 font-semibold text-natural-forest">Serveringssteder/Pub</div>
                  <div className="text-3xl font-bold text-natural-sage">XX mill NOK</div>
                </div>
                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 font-semibold text-natural-forest">Andre</div>
                  <div className="text-3xl font-bold text-natural-sage">XX mill NOK</div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-900">
                  <strong>📊 Data tilgjengelig:</strong> Fra aktører.categoryStats[kategori].totalRevenue.
                  Må aggregeres per SPABO sine ønskede kategorier.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eksempel: Spesifikk butikkomsetning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 rounded-lg bg-gray-50 p-6">
                <h4 className="mb-3 text-lg font-bold text-natural-forest">Chillout Travel - Markveien 55</h4>
                <div className="mb-2 text-4xl font-bold text-natural-sage">3.2 mill NOK</div>
                <p className="text-sm text-gray-600">
                  Omsetning for denne spesifikke butikken (ikke hele kjeden)
                </p>
              </div>

              <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-green-900">Problem løst!</p>
                    <p className="mt-1 text-sm text-green-800">
                      Vi har spesifikk omsetningsdata per adresse, så vi unngår kjede-totaler som i første rapport.
                      Data fra aktører.actors[] med nøyaktig adresse.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 5. ANDRE SPØRSMÅL OM OSLO */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-natural-sage pl-6">
            <h2 className="mb-2 text-3xl font-bold text-natural-forest">5. Sammenligning med Oslo</h2>
            <p className="text-lg text-gray-600">
              Løkkas markedsandel sammenlignet med Oslo Sentrum
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Serveringssteder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="mb-2 text-sm font-semibold text-gray-600">Oslo Sentrum totalt</div>
                  <div className="text-3xl font-bold text-natural-forest">XXX mill NOK</div>
                </div>
                <div className="mb-6">
                  <div className="mb-2 text-sm font-semibold text-gray-600">Nedre Løkkas andel</div>
                  <div className="flex items-baseline gap-4">
                    <div className="text-3xl font-bold text-natural-sage">XX%</div>
                    <div className="text-xl font-bold text-natural-sage">XX mill NOK</div>
                  </div>
                </div>
                <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-xs text-yellow-900">
                    <strong>Data mangler:</strong> Må få Oslo Sentrum benchmark fra Natural State
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detaljhandel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="mb-2 text-sm font-semibold text-gray-600">Oslo Sentrum totalt</div>
                  <div className="text-3xl font-bold text-natural-forest">XXX mill NOK</div>
                </div>
                <div className="mb-6">
                  <div className="mb-2 text-sm font-semibold text-gray-600">Nedre Løkkas andel</div>
                  <div className="flex items-baseline gap-4">
                    <div className="text-3xl font-bold text-natural-sage">XX%</div>
                    <div className="text-xl font-bold text-natural-sage">XX mill NOK</div>
                  </div>
                </div>
                <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-xs text-yellow-900">
                    <strong>Data mangler:</strong> Må få Oslo Sentrum benchmark fra Natural State
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Datasikkerhet og kilder */}
        <section className="mt-16 rounded-2xl border-2 border-natural-sage/20 bg-gradient-to-br from-natural-light to-white p-8">
          <h3 className="mb-4 text-2xl font-bold text-natural-forest">📚 Datakilder og metodikk</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Datakilder:</strong> Plaace, Natural State, Brønnøysundregistrene, SSB
            </p>
            <p>
              <strong>Analysetype:</strong> 1-minutts gange analyse for Nedre Løkka-området
            </p>
            <p>
              <strong>Periode:</strong> Data fra 2023-2025 (varierer per datapunkt)
            </p>
            <p>
              <strong>Oppdatert:</strong> November 2025
            </p>
            <p className="pt-3 text-xs text-gray-600">
              📊 Gul boks = Data ikke tilgjengelig enda | 📊 Blå boks = Data tilgjengelig, må visualiseres |
              ✅ Grønn boks = Problem løst
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
