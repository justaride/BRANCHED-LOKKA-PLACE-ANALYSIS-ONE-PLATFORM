'use client';

import DataMethodology from './DataMethodology';
import InfoTooltip from '@/components/ui/InfoTooltip';
import { METRIC_TOOLTIPS } from '@/lib/content/metric-tooltips';
import DataFreshness from '@/components/ui/DataFreshness';

export default function NedreLokkaOverview() {
  return (
    <div className="space-y-8">
      {/* Data Freshness */}
      <DataFreshness lastUpdated="november 2025" source="Plaace.ai / Telia / SSB" />

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-800 font-semibold mb-1">
            Befolkning
            <InfoTooltip text={METRIC_TOOLTIPS.befolkning} />
          </div>
          <div className="text-4xl font-bold text-blue-900">1,674</div>
          <div className="text-sm text-blue-600 mt-1">innbyggere</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="text-sm text-green-800 font-semibold mb-1">
            Daglige Besøkende
            <InfoTooltip text={METRIC_TOOLTIPS.dagligeBesokende} />
          </div>
          <div className="text-4xl font-bold text-green-900">2,796</div>
          <div className="text-sm text-green-600 mt-1">fra 4 av 6 områder</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-800 font-semibold mb-1">
            Virksomheter
            <InfoTooltip text={METRIC_TOOLTIPS.virksomheter} />
          </div>
          <div className="text-4xl font-bold text-purple-900">91</div>
          <div className="text-sm text-purple-600 mt-1">kommersielle lokaler</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
          <div className="text-sm text-orange-800 font-semibold mb-1">
            Omsetning
            <InfoTooltip text={METRIC_TOOLTIPS.omsetning} />
          </div>
          <div className="text-4xl font-bold text-orange-900">902M</div>
          <div className="text-sm text-orange-600 mt-1">NOK årlig</div>
        </div>
      </div>

      {/* Data Methodology */}
      <DataMethodology variant="inline" />

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
        <div className="mb-4 flex items-baseline justify-between">
          <h4 className="text-lg font-semibold text-gray-900">6 Mikro-områder</h4>
          <span className="text-sm text-gray-500">
            Datagrunnlag: 4 av 6 soner
            <InfoTooltip text={METRIC_TOOLTIPS.dagligeBesokende} />
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Øvre Thorvald Meyers gate', visitors: 667 },
            { name: 'Nedre Thorvald Meyers gate', visitors: 1029 },
            { name: 'Olaf Ryes Plass v/ Boots', visitors: 0 },
            { name: 'Olaf Ryes Plass v/ 7-Eleven', visitors: 742 },
            { name: 'Midt i Markveien', visitors: 0 },
            { name: 'Nederst i Markveien', visitors: 358 }
          ].map(area => {
            const hasData = area.visitors > 0;
            return (
              <div
                key={area.name}
                className={
                  hasData
                    ? 'bg-gray-50 p-4 rounded-lg border border-gray-200'
                    : 'bg-amber-50/50 p-4 rounded-lg border border-dashed border-amber-300'
                }
              >
                <div className="text-sm font-semibold text-gray-900">{area.name}</div>
                <div className={`text-2xl font-bold mt-1 ${hasData ? 'text-gray-700' : 'text-amber-400'}`}>
                  {hasData ? area.visitors.toLocaleString('nb-NO') : '—'}
                </div>
                <div className={`text-xs mt-1 ${hasData ? 'text-gray-600' : 'text-amber-700'}`}>
                  {hasData
                    ? 'daglige besøkende'
                    : 'Utilstrekkelig signaldekning fra Telia i denne sonen'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
