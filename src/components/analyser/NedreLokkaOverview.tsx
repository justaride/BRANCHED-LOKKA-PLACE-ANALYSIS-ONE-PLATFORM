'use client';

/**
 * Nedre Løkka Områdeprofil - Summary Component
 * Displays key metrics from aggregated 6 micro-areas data
 */

export default function NedreLokkaOverview() {
  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-800 font-semibold mb-1">Befolkning</div>
          <div className="text-4xl font-bold text-blue-900">1,674</div>
          <div className="text-sm text-blue-600 mt-1">innbyggere</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="text-sm text-green-800 font-semibold mb-1">Daglige Besøkende</div>
          <div className="text-4xl font-bold text-green-900">2,796</div>
          <div className="text-sm text-green-600 mt-1">fra 4 av 6 områder</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-800 font-semibold mb-1">Virksomheter</div>
          <div className="text-4xl font-bold text-purple-900">103</div>
          <div className="text-sm text-purple-600 mt-1">kommersielle lokaler</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
          <div className="text-sm text-orange-800 font-semibold mb-1">Omsetning</div>
          <div className="text-4xl font-bold text-orange-900">967M</div>
          <div className="text-sm text-orange-600 mt-1">NOK årlig</div>
        </div>
      </div>

      {/* Data Notice */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="text-lg font-semibold text-yellow-900 mb-2">📊 Om Dataen</h4>
        <p className="text-sm text-yellow-800">
          Tallene er basert på <span className="font-semibold">faktiske data</span> fra 6 mikro-områder på Nedre Løkka.
          Noen områder har begrenset data tilgjengelig, så totaltallene kan være lavere enn forventet.
          Alle tall er hentet direkte fra Plaace.ai uten estimering.
        </p>
      </div>

      {/* Oslo Sporveier Notice */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">🚌 Reisevaner</h4>
        <p className="text-sm text-blue-800 mb-3">
          En betydelig andel av de besøkende kommer til fots eller med sykkel, noe som understreker områdets rolle som en sone for gående og syklende.
        </p>
        <div className="bg-white p-4 rounded border border-blue-300">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Data mangler:</span> Detaljert transportmiddel-statistikk krever data fra Oslo Sporveier.
            Kontakt Oslo Sporveier for tilgang til kollektivtrafikk-data for området.
          </p>
        </div>
      </div>

      {/* 6 Micro-Areas */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">6 Mikro-områder</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Øvre Thorvald Meyers gate', visitors: 667 },
            { name: 'Nedre Thorvald Meyers gate', visitors: 1029 },
            { name: 'Olaf Ryes Plass v/ Boots', visitors: 0 },
            { name: 'Olaf Ryes Plass v/ 7-Eleven', visitors: 742 },
            { name: 'Midt i Markveien', visitors: 0 },
            { name: 'Nederst i Markveien', visitors: 358 }
          ].map(area => (
            <div key={area.name} className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="text-sm font-semibold text-gray-900">{area.name}</div>
              <div className="text-2xl font-bold text-gray-700 mt-1">
                {area.visitors > 0 ? area.visitors.toLocaleString('nb-NO') : '—'}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {area.visitors > 0 ? 'daglige besøkende' : 'data ikke tilgjengelig'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
