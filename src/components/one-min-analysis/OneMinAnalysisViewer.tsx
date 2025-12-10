'use client';

import Image from 'next/image';
import {
  UserGroupIcon,
  BuildingStorefrontIcon,
  CreditCardIcon,
  MapPinIcon,
  UsersIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import type { OneMinAnalysisData } from '@/types/one-min-analysis';
import AnalysisSection from './AnalysisSection';
import AldersfordelingChart from './AldersfordelingChart';
import KorthandelChart from './KorthandelChart';
import BevegelseChart from './BevegelseChart';
import KonkurransebildeChart from './KonkurransebildeChart';
import ExpandableActorList from './ExpandableActorList';

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
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-soft md:p-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">5-minutts Analyse</h2>
        <p className="text-lg text-gray-700">{propertyName}</p>
        <p className="mt-2 text-sm text-gray-500">
          Hyperlokal analyse av området innenfor 5 minutters gange
        </p>
      </div>

      {/* Map Section - Above sections */}
      {kartImage && (
        <div className="overflow-hidden rounded-2xl shadow-soft">
          <Image
            src={kartImage}
            alt="5-minutts område kart"
            width={1200}
            height={600}
            className="w-full"
            priority
          />
        </div>
      )}

      {/* Section 1: DEMOGRAFI */}
      {data.demografi && data.demografi.aldersfordeling.mann.length > 0 && (
        <AnalysisSection
          title="Demografi"
          sectionNumber={1}
          icon={<UserGroupIcon className="h-6 w-6" />}
        >
          <AldersfordelingChart data={data.demografi} />

          {/* Additional demografi data */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Inntektsfordeling */}
            {data.demografi.inntektsfordeling.length > 0 && (
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 font-semibold text-gray-900">Inntektsfordeling</h4>
                <div className="space-y-2">
                  {data.demografi.inntektsfordeling.slice(0, 6).map((item) => (
                    <div key={item.kategori} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.kategori}</span>
                      <span className="font-medium text-gray-900">{item.antall.toLocaleString('nb-NO')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Husholdninger */}
            {data.demografi.husholdninger.length > 0 && (
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 font-semibold text-gray-900">Husholdningstyper</h4>
                <div className="space-y-2">
                  {data.demografi.husholdninger.map((item) => (
                    <div key={item.type} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.type}</span>
                      <span className="font-medium text-gray-900">{item.antall.toLocaleString('nb-NO')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnalysisSection>
      )}

      {/* Section 2: KONKURRANSEBILDET */}
      <AnalysisSection
        title="Konkurransebildet"
        sectionNumber={data.demografi && data.demografi.aldersfordeling.mann.length > 0 ? 2 : 1}
        icon={<BuildingStorefrontIcon className="h-6 w-6" />}
      >
        <KonkurransebildeChart data={data.konkurransebilde} />

        {/* Aktørliste under konkurransebilde */}
        <div className="mt-8">
          <h4 className="mb-4 text-lg font-semibold text-gray-900">Næringsaktører i området</h4>
          <ExpandableActorList data={data.aktorer} initialCount={10} />
        </div>
      </AnalysisSection>

      {/* Section 3: KORTHANDEL */}
      <AnalysisSection
        title="Korthandel"
        sectionNumber={data.demografi && data.demografi.aldersfordeling.mann.length > 0 ? 3 : 2}
        icon={<CreditCardIcon className="h-6 w-6" />}
      >
        <KorthandelChart data={data.korthandel} />
      </AnalysisSection>

      {/* Section 4: BEVEGELSE */}
      <AnalysisSection
        title="Bevegelse"
        sectionNumber={data.demografi && data.demografi.aldersfordeling.mann.length > 0 ? 4 : 3}
        icon={<MapPinIcon className="h-6 w-6" />}
      >
        <BevegelseChart data={data.bevegelse} />
      </AnalysisSection>

      {/* Section 5: BESØKENDE */}
      {data.besokende && (
        <AnalysisSection
          title="Besøkende"
          sectionNumber={data.demografi && data.demografi.aldersfordeling.mann.length > 0 ? 5 : 4}
          icon={<UsersIcon className="h-6 w-6" />}
        >
          <div className="space-y-6">
            {/* Nøkkeltall */}
            <div className="rounded-lg bg-lokka-light p-4 text-center">
              <div className="text-sm text-gray-600">Periode</div>
              <div className="text-lg font-semibold text-lokka-primary">{data.besokende.periode}</div>
            </div>

            {/* Aldersfordeling besøkende */}
            {data.besokende.aldersfordeling.mann.length > 0 && (
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Aldersfordeling (besøkende)</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h5 className="mb-2 text-sm font-medium text-blue-700">Menn</h5>
                    <div className="space-y-1">
                      {data.besokende.aldersfordeling.mann.slice(0, 6).map((item) => (
                        <div key={item.kategori} className="flex justify-between text-xs">
                          <span>{item.kategori}</span>
                          <span className="font-medium">{Math.round(item.antall).toLocaleString('nb-NO')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-pink-50 p-4">
                    <h5 className="mb-2 text-sm font-medium text-pink-700">Kvinner</h5>
                    <div className="space-y-1">
                      {data.besokende.aldersfordeling.kvinne.slice(0, 6).map((item) => (
                        <div key={item.kategori} className="flex justify-between text-xs">
                          <span>{item.kategori}</span>
                          <span className="font-medium">{Math.round(item.antall).toLocaleString('nb-NO')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Områder besøkende kommer fra */}
            {data.besokende.områderBesøkendeKommerFra.length > 0 && (
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Hvor besøkende kommer fra</h4>
                <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4">
                  {data.besokende.områderBesøkendeKommerFra.slice(0, 20).map((item) => (
                    <div
                      key={item.område}
                      className="flex items-center justify-between rounded bg-gray-50 px-3 py-2 text-sm"
                    >
                      <span className="truncate text-gray-700">{item.område}</span>
                      <span className="ml-2 font-medium text-lokka-primary">{item.prosent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnalysisSection>
      )}

      {/* Section 6: INTERNASJONALT */}
      {data.internasjonalt && data.internasjonalt.toppLand.length > 0 && (
        <AnalysisSection
          title="Internasjonalt besøkende"
          sectionNumber={data.demografi && data.demografi.aldersfordeling.mann.length > 0 ? 6 : 5}
          icon={<GlobeAltIcon className="h-6 w-6" />}
        >
          <div className="space-y-4">
            <div className="rounded-lg bg-lokka-light p-4 text-center">
              <div className="text-sm text-gray-600">Periode</div>
              <div className="text-lg font-semibold text-lokka-primary">{data.internasjonalt.periode}</div>
            </div>

            <h4 className="font-semibold text-gray-900">Topp 20 land</h4>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              {data.internasjonalt.toppLand.map((item, index) => (
                <div
                  key={item.land}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lokka-primary/10 text-xs font-medium text-lokka-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{item.land}</span>
                  </div>
                  <span className="text-sm font-semibold text-lokka-primary">{item.prosent}%</span>
                </div>
              ))}
            </div>
          </div>
        </AnalysisSection>
      )}

      {/* Footer Info */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <h4 className="mb-2 font-semibold text-gray-900">Om dataene</h4>
        <p className="text-sm text-gray-600">
          Denne analysen er basert på data fra Plaace.ai og viser detaljert informasjon om
          området innenfor 5 minutters gange fra {propertyName}. Dataene inkluderer demografi,
          bevegelsesmønstre, korthandel, konkurransebilde og næringsaktører.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Analysetype: {data.aktorer.metadata.analysisType} | Områdestørrelse: {data.aktorer.metadata.areaSize} | Generert:{' '}
          {new Date(data.aktorer.metadata.generatedAt).toLocaleDateString('nb-NO')}
        </p>
      </div>
    </div>
  );
}
