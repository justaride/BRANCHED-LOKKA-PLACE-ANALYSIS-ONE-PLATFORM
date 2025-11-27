'use client';

import Image from 'next/image';
import type { OneMinAnalysisData } from '@/types/one-min-analysis';
import AldersfordelingChart from './AldersfordelingChart';
import KorthandelChart from './KorthandelChart';
import BevegelseChart from './BevegelseChart';
import KonkurransebildeChart from './KonkurransebildeChart';
import AktorerTable from './AktorerTable';

interface OneMinAnalysisViewerProps {
  data: OneMinAnalysisData;
  kartImage?: string;
  propertyName: string;
}

export default function OneMinAnalysisViewer({
  data,
  kartImage,
  propertyName,
}: OneMinAnalysisViewerProps) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="rounded-lg bg-gradient-to-r from-lokka-primary to-lokka-secondary p-8 text-white shadow-soft">
        <h2 className="mb-2 text-3xl font-bold">1-minutts Analyse</h2>
        <p className="text-lg opacity-90">{propertyName}</p>
        <p className="mt-2 text-sm opacity-75">
          Hyperlokal analyse av området innenfor 1 minutts gange
        </p>
      </div>

      {/* Map Section */}
      {kartImage && (
        <section>
          <h3 className="mb-4 text-2xl font-bold text-gray-900">Områdekart</h3>
          <div className="overflow-hidden rounded-lg shadow-soft">
            <Image
              src={kartImage}
              alt="1-minutts område kart"
              width={1200}
              height={800}
              className="w-full"
              priority
            />
          </div>
          {data.demografi ? (
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-sm text-gray-600">Befolkning</div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.demografi.nøkkeltall.befolkning}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-sm text-gray-600">Befolkningstetthet</div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.demografi.nøkkeltall.befolkningstetthet.toLocaleString('nb-NO')}
                </div>
                <div className="text-xs text-gray-500">per km²</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-sm text-gray-600">Områdestørrelse</div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.demografi.nøkkeltall.områdestørrelse}
                </div>
                <div className="text-xs text-gray-500">km²</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-sm text-gray-600">Vekst</div>
                <div className={`text-2xl font-bold ${
                  data.demografi.nøkkeltall.vekst > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.demografi.nøkkeltall.vekst > 0 ? '+' : ''}
                  {data.demografi.nøkkeltall.vekst}%
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-sm text-gray-600">Daglig besøk</div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.bevegelse.nøkkeltall.dagligBesøk.toLocaleString('nb-NO')}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-sm text-gray-600">Besøk per km²</div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.bevegelse.nøkkeltall.besøkPerKm2.toLocaleString('nb-NO')}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-sm text-gray-600">Travleste dag</div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.bevegelse.nøkkeltall.travlesteDag}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-sm text-gray-600">Lørdag-andel</div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.bevegelse.nøkkeltall.lørdagAndel}%
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Demografi Section - only show if demografi data exists */}
      {data.demografi && (
        <section>
          <h3 className="mb-6 text-2xl font-bold text-gray-900">Demografi</h3>
          <AldersfordelingChart data={data.demografi} />
        </section>
      )}

      {/* Bevegelse Section */}
      <section>
        <h3 className="mb-6 text-2xl font-bold text-gray-900">Bevegelsesmønster</h3>
        <BevegelseChart data={data.bevegelse} />
      </section>

      {/* Korthandel Section */}
      <section>
        <h3 className="mb-6 text-2xl font-bold text-gray-900">Korthandelutvikling</h3>
        <KorthandelChart data={data.korthandel} />
      </section>

      {/* Konkurransebilde Section */}
      <section>
        <h3 className="mb-6 text-2xl font-bold text-gray-900">Konkurransebilde</h3>
        <KonkurransebildeChart data={data.konkurransebilde} />
      </section>

      {/* Aktører Section */}
      <section>
        <h3 className="mb-6 text-2xl font-bold text-gray-900">Næringsaktører</h3>
        <AktorerTable data={data.aktorer} />
      </section>

      {/* Footer Info */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h4 className="mb-2 font-semibold text-gray-900">Om dataene</h4>
        <p className="text-sm text-gray-600">
          Denne analysen er basert på data fra Plaace.ai og viser detaljert informasjon om
          området innenfor 1 minutts gange fra {propertyName}. Dataene inkluderer demografi,
          bevegelsesmønstre, korthandel, konkurransebilde og næringsaktører.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Analysetype: {data.aktorer.metadata.analysisType} | Generert:{' '}
          {new Date(data.aktorer.metadata.generatedAt).toLocaleDateString('nb-NO')}
        </p>
      </div>
    </div>
  );
}
