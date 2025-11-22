'use client';

import { useState } from 'react';
import TabbedImageViewer from './TabbedImageViewer';
import OneMinAnalysisViewer from '@/components/one-min-analysis/OneMinAnalysisViewer';
import { PlaaceAnalyse, PlaaceData } from '@/types/eiendom';
import type { OneMinAnalysisData } from '@/types/one-min-analysis';
import FadeIn from '@/components/ui/FadeIn';

interface AnalyseSelectorProps {
  // Legacy single analysis support
  plaaceData?: PlaaceData;
  // New multiple analyses support
  plaaceAnalyses?: PlaaceAnalyse[];
  // 1-minute analysis data
  oneMinData?: OneMinAnalysisData | null;
  // Property name for display
  propertyName?: string;
}

export default function AnalyseSelector({ plaaceData, plaaceAnalyses, oneMinData, propertyName }: AnalyseSelectorProps) {
  const [selectedAnalyseId, setSelectedAnalyseId] = useState<string | null>(null);

  // If new format with multiple analyses
  if (plaaceAnalyses && plaaceAnalyses.length > 0) {
    // Initialize selected analysis
    const currentAnalyse = selectedAnalyseId
      ? plaaceAnalyses.find(a => a.id === selectedAnalyseId) || plaaceAnalyses[0]
      : plaaceAnalyses[0];

    // Safety check
    if (!currentAnalyse) {
      return null;
    }

    return (
      <div className="mb-12 md:mb-20">
        {plaaceAnalyses.length > 1 && (
          <FadeIn direction="up">
            {/* Analysis Selector - Enhanced Visibility */}
            <div className="mb-10 rounded-2xl border-2 border-lokka-primary/20 bg-gradient-to-br from-lokka-light/50 to-white p-6 shadow-large md:mb-12 md:p-8">
              {/* Header with count */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-lokka-primary md:text-3xl">
                    Velg Stedsanalyse
                  </h3>
                  <p className="text-base text-lokka-secondary md:text-lg">
                    Denne eiendommen har <strong>{plaaceAnalyses.length} forskjellige analyser</strong> tilgjengelig
                  </p>
                </div>
                <div className="hidden rounded-full bg-lokka-primary px-4 py-2 text-sm font-bold text-white md:block">
                  {plaaceAnalyses.length} analyser
                </div>
              </div>

              {/* Large, prominent analysis selection buttons */}
              <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                {plaaceAnalyses.map((analyse, index) => (
                  <button
                    key={analyse.id}
                    onClick={() => setSelectedAnalyseId(analyse.id)}
                    className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300 md:p-8 ${
                      currentAnalyse.id === analyse.id
                        ? 'border-lokka-primary bg-lokka-primary text-white shadow-large scale-[1.02]'
                        : 'border-gray-300 bg-white text-lokka-secondary hover:border-lokka-primary/50 hover:shadow-medium hover:scale-[1.01]'
                    }`}
                  >
                    {/* Analysis number badge */}
                    <div className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold md:mb-4 md:text-sm ${
                      currentAnalyse.id === analyse.id
                        ? 'bg-white/20 text-white'
                        : 'bg-lokka-primary/10 text-lokka-primary'
                    }`}>
                      <span>Analyse {index + 1}</span>
                      {currentAnalyse.id === analyse.id && (
                        <span className="flex h-2 w-2">
                          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                        </span>
                      )}
                    </div>

                    {/* Analysis title - large and bold */}
                    <h4 className={`mb-3 text-xl font-bold md:mb-4 md:text-2xl ${
                      currentAnalyse.id === analyse.id ? 'text-white' : 'text-lokka-primary'
                    }`}>
                      {analyse.tittel}
                    </h4>

                    {/* Walking distance parameter - prominent */}
                    {analyse.parametere.gangeavstand && (
                      <div className={`mb-3 flex items-center gap-2 text-base md:mb-4 md:text-lg ${
                        currentAnalyse.id === analyse.id ? 'text-white/90' : 'text-lokka-secondary'
                      }`}>
                        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-semibold">{analyse.parametere.gangeavstand}</span>
                      </div>
                    )}

                    {/* Description if available */}
                    {analyse.beskrivelse && (
                      <p className={`text-sm leading-relaxed md:text-base ${
                        currentAnalyse.id === analyse.id ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {analyse.beskrivelse}
                      </p>
                    )}

                    {/* Selected indicator */}
                    {currentAnalyse.id === analyse.id && (
                      <div className="absolute right-4 top-4 md:right-6 md:top-6">
                        <svg className="h-8 w-8 md:h-10 md:w-10" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                    {/* Hover effect overlay */}
                    {currentAnalyse.id !== analyse.id && (
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-lokka-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    )}
                  </button>
                ))}
              </div>

              {/* Current selection summary */}
              <div className="mt-6 rounded-xl bg-lokka-primary/5 p-4 md:mt-8 md:p-6">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-6 w-6 flex-shrink-0 text-lokka-primary md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-lokka-primary md:text-lg">
                      Valgt analyse: {currentAnalyse.tittel}
                    </p>
                    {currentAnalyse.beskrivelse && (
                      <p className="mt-1 text-sm text-lokka-secondary md:text-base">
                        {currentAnalyse.beskrivelse}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Display selected analysis */}
        {/* Check if this is 1-minute analysis with interactive data */}
        {currentAnalyse.id === '1min-gange' && oneMinData ? (
          <OneMinAnalysisViewer
            data={oneMinData}
            kartImage={currentAnalyse.screenshots[0]?.path}
            propertyName={propertyName || 'Eiendom'}
          />
        ) : (
          currentAnalyse.screenshots.length > 0 && (
            <TabbedImageViewer
              screenshots={currentAnalyse.screenshots}
              title={plaaceAnalyses.length === 1
                ? `Plaace Stedsanalyse - ${currentAnalyse.tittel}`
                : 'Plaace Stedsanalyse'
              }
            />
          )
        )}
      </div>
    );
  }

  // Legacy format - single analysis via plaaceData
  if (plaaceData && plaaceData.screenshots.length > 0) {
    return (
      <div className="mb-12 md:mb-20">
        <div className="mb-4 rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            <strong>Merk:</strong> Denne analysen er basert på 5 minutters gange.
          </p>
        </div>
        <TabbedImageViewer
          screenshots={plaaceData.screenshots}
          title="Plaace Stedsanalyse - 5 minutters gange"
        />
      </div>
    );
  }

  return null;
}
