import Container from '@/components/ui/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Øvre Thorvald Meyers Gate - Stedsanalyse',
  description: 'Komplett markedsanalyse for Øvre Thorvald Meyers Gate med demografi, besøkende, virksomheter og omsetning',
};

export default function OvreThorvaldMeyersGatePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200/30 bg-gradient-to-br from-natural-forest via-natural-sage to-natural-moss py-16 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Øvre Thorvald Meyers Gate
            </h1>
            <p className="mb-4 text-lg text-white/90 md:text-xl">
              Komplett stedsanalyse for området rundt Thorvald Meyers gate 30
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Område: 0.018 km²</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Befolkning: 371 (2023)</span>
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
              <p className="mb-2 text-4xl font-bold text-lokka-primary">13,614</p>
              <p className="text-sm text-lokka-secondary">Gjennomsnitt (alle besøk)</p>
              <div className="mt-4 text-xs text-natural-forest/60">
                <p>71,272 per km²</p>
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
              <p className="mb-2 text-4xl font-bold text-blue-900">NOK 1.7M</p>
              <p className="text-sm text-blue-700">Per dag i perioden</p>
              <div className="mt-4 text-xs text-blue-600">
                <p>Total: NOK 4.2 mrd.</p>
                <p>Snitt: NOK 216 per transaksjon</p>
              </div>
            </div>

            {/* Virksomheter */}
            <div className="rounded-2xl border-2 border-purple-200/50 bg-gradient-to-br from-purple-50 to-white p-6 shadow-medium">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                  Virksomheter
                </h3>
                <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="mb-2 text-4xl font-bold text-purple-900">28</p>
              <p className="text-sm text-purple-700">Totalt antall konsepter</p>
              <div className="mt-4 text-xs text-purple-600">
                <p>1,553 per km²</p>
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
              <p className="mb-2 text-4xl font-bold text-amber-900">NOK 317M</p>
              <p className="text-sm text-amber-700">Estimert årlig (2024)</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-red-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span>-1% endring</span>
              </div>
            </div>
          </div>
        </section>

        {/* 1. DEMOGRAFI */}
        <section className="mb-20">
          <div className="mb-10 border-l-4 border-natural-sage pl-6">
            <h2 className="mb-2 text-3xl font-bold text-lokka-primary">1. Demografi</h2>
            <p className="text-lg text-lokka-secondary">
              Befolkningsdata og inntektsfordeling i området
            </p>
          </div>

          {/* Nøkkeltall demografi */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Befolkning 2023
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">371</p>
              <div className="flex items-center gap-1 text-sm text-green-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>+2% endring</span>
              </div>
            </div>

            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Befolkningstetthet
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">20,582</p>
              <p className="text-sm text-lokka-secondary">per km²</p>
            </div>

            <div className="rounded-xl bg-natural-sage/10 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-natural-forest/70">
                Områdestørrelse
              </h3>
              <p className="mb-1 text-3xl font-bold text-lokka-primary">0.018</p>
              <p className="text-sm text-lokka-secondary">km²</p>
            </div>
          </div>

          {/* Aldersfordeling */}
          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Aldersfordeling</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">0-5 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-400" style={{ width: `${(14/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">7 mann, 7 kvinner (14 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">6-12 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-400" style={{ width: `${(13/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">6 mann, 7 kvinner (13 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">13-15 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-400" style={{ width: `${(7/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">3 mann, 4 kvinner (7 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">16-18 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-400" style={{ width: `${(6/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">3 mann, 3 kvinner (6 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">19-23 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-500" style={{ width: `${(37/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">15 mann, 22 kvinner (37 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">23-34 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-600" style={{ width: `${(160/371)*100}%` }}></div>
                    <span className="text-sm font-bold text-lokka-primary">80 mann, 80 kvinner (160 totalt - største gruppe)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">35-44 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-500" style={{ width: `${(57/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">31 mann, 26 kvinner (57 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">45-54 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-500" style={{ width: `${(39/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">21 mann, 18 kvinner (39 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">55-64 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-400" style={{ width: `${(24/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">14 mann, 10 kvinner (24 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">65-74 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-300" style={{ width: `${(8/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">4 mann, 4 kvinner (8 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">75-84 år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-300" style={{ width: `${(5/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">2 mann, 3 kvinner (5 totalt)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-lokka-secondary">85+ år</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 rounded bg-blue-300" style={{ width: `${(1/371)*100}%` }}></div>
                    <span className="text-sm text-lokka-secondary">0 mann, 1 kvinner (1 totalt)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-900">
                <strong>Hovedobservasjon:</strong> Området domineres av unge voksne i alderen 23-34 år (43% av befolkningen),
                noe som gjenspeiler områdets urbane karakter og attraktivitet for yngre beboere.
              </p>
            </div>
          </div>

          {/* Inntektsfordeling */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Inntektsfordeling</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">0 NOK</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-400" style={{ width: `${41.76}%` }}></div>
                    <span className="text-sm text-lokka-secondary">41.8 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">0 - 100k</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-500" style={{ width: `${49.41}%` }}></div>
                    <span className="text-sm text-lokka-secondary">49.4 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">100k - 200k</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-500" style={{ width: `${37.14}%` }}></div>
                    <span className="text-sm text-lokka-secondary">37.1 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">200k - 300k</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-500" style={{ width: `${36.30}%` }}></div>
                    <span className="text-sm text-lokka-secondary">36.3 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">300k - 400k</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-600" style={{ width: `${42.61}%` }}></div>
                    <span className="text-sm text-lokka-secondary">42.6 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">400k - 500k</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-600" style={{ width: `${40.47}%` }}></div>
                    <span className="text-sm text-lokka-secondary">40.5 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">500k - 600k</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-500" style={{ width: `${31.45}%` }}></div>
                    <span className="text-sm text-lokka-secondary">31.5 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">600k - 700k</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-400" style={{ width: `${18.73}%` }}></div>
                    <span className="text-sm text-lokka-secondary">18.7 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">700k - 800k</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-400" style={{ width: `${11.55}%` }}></div>
                    <span className="text-sm text-lokka-secondary">11.5 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">800k - 1M</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-500" style={{ width: `${22.48}%` }}></div>
                    <span className="text-sm text-lokka-secondary">22.5 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">1M - 1.5M</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-300" style={{ width: `${3.36}%` }}></div>
                    <span className="text-sm text-lokka-secondary">3.4 personer</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-lokka-secondary">1.5M+</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 rounded bg-green-300" style={{ width: `${2.03}%` }}></div>
                    <span className="text-sm text-lokka-secondary">2.0 personer</span>
                  </div>
                </div>
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

          {/* Besøk per ukedag */}
          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Besøk per Ukedag (Daglig Gjennomsnitt)</h3>
            <p className="mb-6 text-sm text-lokka-secondary">Periode: 01.10.2022 – 30.09.2025</p>

            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-lokka-secondary">Mandag</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-blue-600">Besøkende: 5,813</span>
                    <span className="text-green-600">På jobb: 1,820</span>
                    <span className="text-purple-600">Hjemme: 5,393</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-8 rounded-l bg-blue-500" style={{ width: `${(5813/8249)*100}%` }} title="Besøkende"></div>
                  <div className="h-8 bg-green-500" style={{ width: `${(1820/8249)*100}%` }} title="På jobb"></div>
                  <div className="h-8 rounded-r bg-purple-500" style={{ width: `${(5393/8249)*100}%` }} title="Hjemme"></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-lokka-secondary">Tirsdag</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-blue-600">Besøkende: 6,139</span>
                    <span className="text-green-600">På jobb: 1,887</span>
                    <span className="text-purple-600">Hjemme: 5,475</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-8 rounded-l bg-blue-500" style={{ width: `${(6139/8249)*100}%` }}></div>
                  <div className="h-8 bg-green-500" style={{ width: `${(1887/8249)*100}%` }}></div>
                  <div className="h-8 rounded-r bg-purple-500" style={{ width: `${(5475/8249)*100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-lokka-secondary">Onsdag</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-blue-600">Besøkende: 6,520</span>
                    <span className="text-green-600">På jobb: 1,961</span>
                    <span className="text-purple-600">Hjemme: 5,494</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-8 rounded-l bg-blue-500" style={{ width: `${(6520/8249)*100}%` }}></div>
                  <div className="h-8 bg-green-500" style={{ width: `${(1961/8249)*100}%` }}></div>
                  <div className="h-8 rounded-r bg-purple-500" style={{ width: `${(5494/8249)*100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-lokka-secondary">Torsdag</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-blue-600">Besøkende: 6,639</span>
                    <span className="text-green-600">På jobb: 1,969</span>
                    <span className="text-purple-600">Hjemme: 5,470</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-8 rounded-l bg-blue-500" style={{ width: `${(6639/8249)*100}%` }}></div>
                  <div className="h-8 bg-green-500" style={{ width: `${(1969/8249)*100}%` }}></div>
                  <div className="h-8 rounded-r bg-purple-500" style={{ width: `${(5470/8249)*100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-lokka-secondary">Fredag</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-blue-600">Besøkende: 7,623</span>
                    <span className="text-green-600">På jobb: 2,125</span>
                    <span className="text-purple-600">Hjemme: 5,380</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-8 rounded-l bg-blue-500" style={{ width: `${(7623/8249)*100}%` }}></div>
                  <div className="h-8 bg-green-500" style={{ width: `${(2125/8249)*100}%` }}></div>
                  <div className="h-8 rounded-r bg-purple-500" style={{ width: `${(5380/8249)*100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-lokka-secondary font-bold">Lørdag (Travleste dag)</span>
                  <div className="flex gap-4 text-xs font-bold">
                    <span className="text-blue-600">Besøkende: 8,249</span>
                    <span className="text-green-600">På jobb: 2,244</span>
                    <span className="text-purple-600">Hjemme: 5,176</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-10 rounded-l bg-blue-600" style={{ width: `${(8249/8249)*100}%` }}></div>
                  <div className="h-10 bg-green-600" style={{ width: `${(2244/8249)*100}%` }}></div>
                  <div className="h-10 rounded-r bg-purple-600" style={{ width: `${(5176/8249)*100}%` }}></div>
                </div>
                <p className="mt-2 text-xs text-blue-700">16% av ukesbesøk</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-lokka-secondary">Søndag</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-blue-600">Besøkende: 6,638</span>
                    <span className="text-green-600">På jobb: 1,757</span>
                    <span className="text-purple-600">Hjemme: 4,996</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-8 rounded-l bg-blue-500" style={{ width: `${(6638/8249)*100}%` }}></div>
                  <div className="h-8 bg-green-500" style={{ width: `${(1757/8249)*100}%` }}></div>
                  <div className="h-8 rounded-r bg-purple-500" style={{ width: `${(4996/8249)*100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-blue-500"></div>
                <span>Besøkende</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-green-500"></div>
                <span>På jobb</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-purple-500"></div>
                <span>Hjemme</span>
              </div>
            </div>
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

          {/* Konseptmiks oversikt */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Mat og Opplevelser
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">11</p>
              <p className="text-sm text-purple-700">konsepter (39%)</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Handel
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">14</p>
              <p className="text-sm text-purple-700">konsepter (50%)</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-900/70">
                Tjenester
              </h3>
              <p className="mb-1 text-3xl font-bold text-purple-900">3</p>
              <p className="text-sm text-purple-700">konsepter (11%)</p>
            </div>
          </div>

          {/* Detaljert konseptmiks */}
          <div className="mb-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Detaljert Konseptfordeling</h3>

            <div className="space-y-6">
              {/* Mat og opplevelser */}
              <div>
                <h4 className="mb-3 font-semibold text-purple-900">Mat og opplevelser (11 konsepter)</h4>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Restaurant</span>
                    <span className="font-semibold text-lokka-primary">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Bakeri og kafé</span>
                    <span className="font-semibold text-lokka-primary">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Pub og bar</span>
                    <span className="font-semibold text-lokka-primary">1</span>
                  </div>
                </div>
              </div>

              {/* Handel */}
              <div>
                <h4 className="mb-3 font-semibold text-purple-900">Handel (14 konsepter)</h4>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Klesbutikker</span>
                    <span className="font-semibold text-lokka-primary">6</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Mat og drikke</span>
                    <span className="font-semibold text-lokka-primary">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Sport og fritid</span>
                    <span className="font-semibold text-lokka-primary">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Hjem og interiør</span>
                    <span className="font-semibold text-lokka-primary">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Annen handel</span>
                    <span className="font-semibold text-lokka-primary">1</span>
                  </div>
                </div>
              </div>

              {/* Tjenester */}
              <div>
                <h4 className="mb-3 font-semibold text-purple-900">Tjenester (3 konsepter)</h4>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Skjønnhet og velvære</span>
                    <span className="font-semibold text-lokka-primary">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-lokka-secondary">Profesjoner</span>
                    <span className="font-semibold text-lokka-primary">1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top virksomheter */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
            <h3 className="mb-6 text-xl font-bold text-lokka-primary">Top 10 Virksomheter etter Omsetning (2024)</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="pb-3 text-left text-sm font-semibold text-lokka-secondary">#</th>
                    <th className="pb-3 text-left text-sm font-semibold text-lokka-secondary">Navn</th>
                    <th className="pb-3 text-left text-sm font-semibold text-lokka-secondary">Kategori</th>
                    <th className="pb-3 text-right text-sm font-semibold text-lokka-secondary">Omsetning (Mill.)</th>
                    <th className="pb-3 text-right text-sm font-semibold text-lokka-secondary">Markedsandel</th>
                    <th className="pb-3 text-right text-sm font-semibold text-lokka-secondary">YoY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">1</td>
                    <td className="py-3 text-sm">Extra Birkelunden</td>
                    <td className="py-3 text-xs text-lokka-secondary">Dagligvare</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 87M</td>
                    <td className="py-3 text-right text-sm">27.3%</td>
                    <td className="py-3 text-right text-sm text-red-600">-0.3%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">2</td>
                    <td className="py-3 text-sm">McDonald's</td>
                    <td className="py-3 text-xs text-lokka-secondary">Restaurant</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 58M</td>
                    <td className="py-3 text-right text-sm">18.3%</td>
                    <td className="py-3 text-right text-sm text-green-600">+0.3%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">3</td>
                    <td className="py-3 text-sm">Ark Grünerløkka</td>
                    <td className="py-3 text-xs text-lokka-secondary">Bok/papir</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 21M</td>
                    <td className="py-3 text-right text-sm">6.6%</td>
                    <td className="py-3 text-right text-sm text-green-600">+31%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">4</td>
                    <td className="py-3 text-sm">Ses Optikk</td>
                    <td className="py-3 text-xs text-lokka-secondary">Optikere</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 18M</td>
                    <td className="py-3 text-right text-sm">5.7%</td>
                    <td className="py-3 text-right text-sm text-green-600">+2%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">5</td>
                    <td className="py-3 text-sm">Art & Mat</td>
                    <td className="py-3 text-xs text-lokka-secondary">Pub/bar</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 18M</td>
                    <td className="py-3 text-right text-sm">5.8%</td>
                    <td className="py-3 text-right text-sm text-green-600">+10%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">6</td>
                    <td className="py-3 text-sm">Mucho Mas</td>
                    <td className="py-3 text-xs text-lokka-secondary">Restaurant</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 17M</td>
                    <td className="py-3 text-right text-sm">5.3%</td>
                    <td className="py-3 text-right text-sm text-green-600">+13%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">7</td>
                    <td className="py-3 text-sm">Smæg</td>
                    <td className="py-3 text-xs text-lokka-secondary">Restaurant</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 14M</td>
                    <td className="py-3 text-right text-sm">4.3%</td>
                    <td className="py-3 text-right text-sm text-lokka-secondary">-</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">8</td>
                    <td className="py-3 text-sm">Birkelundens Lille Franske</td>
                    <td className="py-3 text-xs text-lokka-secondary">Kafé</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 10M</td>
                    <td className="py-3 text-right text-sm">3.1%</td>
                    <td className="py-3 text-right text-sm text-green-600">+16%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">9</td>
                    <td className="py-3 text-sm">Kaffebrenneriet</td>
                    <td className="py-3 text-xs text-lokka-secondary">Kaffebar</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 8M</td>
                    <td className="py-3 text-right text-sm">2.5%</td>
                    <td className="py-3 text-right text-sm text-red-600">-13%</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm font-bold text-lokka-primary">10</td>
                    <td className="py-3 text-sm">Carlings Grünerløkka</td>
                    <td className="py-3 text-xs text-lokka-secondary">Klesbutikk</td>
                    <td className="py-3 text-right text-sm font-semibold">NOK 7M</td>
                    <td className="py-3 text-right text-sm">2.1%</td>
                    <td className="py-3 text-right text-sm text-green-600">+26%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-lg bg-purple-50 p-4">
              <p className="text-sm text-purple-900">
                <strong>Observasjon:</strong> Extra Birkelunden dominerer med 27.3% markedsandel,
                mens de to største aktørene (Extra og McDonald's) står for 45.6% av total omsetning i området.
              </p>
            </div>
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
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 4.2 mrd.</p>
              <p className="text-sm text-amber-700">Hele perioden</p>
            </div>

            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-900/70">
                Beløp per Transaksjon
              </h3>
              <p className="mb-1 text-3xl font-bold text-amber-900">NOK 216</p>
              <p className="text-sm text-amber-700">Gjennomsnitt</p>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 p-6">
            <h4 className="mb-3 font-semibold text-amber-900">Siste Trender</h4>
            <div className="space-y-2 text-sm text-amber-800">
              <p><strong>Endring siste 30 dager:</strong> -0.9% (25.10.2025 – 23.11.2025)</p>
              <p><strong>Status:</strong> Faktiske data</p>
              <p><strong>Kilde:</strong> BankAxept</p>
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
      </Container>
    </>
  );
}
