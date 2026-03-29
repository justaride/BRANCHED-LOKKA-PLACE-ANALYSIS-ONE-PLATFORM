'use client';

import { useState, useEffect, useRef } from 'react';
import type { AktorWithCoordinates, AktorCategory } from '@/types/aktor-map';

const CATEGORY_CONFIG: Record<AktorCategory | 'all', { color: string; label: string }> = {
  'all': { color: '#1F2937', label: 'Alle' },
  'Handel': { color: '#3B82F6', label: 'Handel' },
  'Mat og opplevelser': { color: '#EF4444', label: 'Mat & opplevelser' },
  'Tjenester': { color: '#8B5CF6', label: 'Tjenester' },
};

const GRUNERLOKKA_CENTER: [number, number] = [59.9225, 10.7575];
const DEFAULT_ZOOM = 15;

type AktorMapProps = {
  actors: AktorWithCoordinates[]
  height?: string
  center?: [number, number]
  zoom?: number
}

export default function AktorMap({
  actors,
  height = '550px',
  center = GRUNERLOKKA_CENTER,
  zoom = DEFAULT_ZOOM,
}: AktorMapProps) {
  const [selectedCategory, setSelectedCategory] = useState<AktorCategory | 'all'>('all');
  const [selectedAktor, setSelectedAktor] = useState<AktorWithCoordinates | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  const filteredActors = selectedCategory === 'all'
    ? actors
    : actors.filter(a => a.category === selectedCategory);

  const categoryCounts = {
    'all': actors.length,
    'Handel': actors.filter(a => a.category === 'Handel').length,
    'Mat og opplevelser': actors.filter(a => a.category === 'Mat og opplevelser').length,
    'Tjenester': actors.filter(a => a.category === 'Tjenester').length,
  };

  useEffect(() => {
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    async function initMap() {
      const L = await import('leaflet');

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center,
        zoom,
        scrollWheelZoom: true,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 20,
        subdomains: 'abcd',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    async function updateMarkers(mapInstance: L.Map) {
      const L = await import('leaflet');

      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      filteredActors.forEach(actor => {
        const config = CATEGORY_CONFIG[actor.category];
        const marker = L.circleMarker([actor.lat, actor.lng], {
          radius: 7,
          fillColor: config.color,
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85,
        }).addTo(mapInstance);

        marker.on('click', () => {
          setSelectedAktor(actor);
        });

        marker.bindTooltip(actor.navn, {
          direction: 'top',
          offset: [0, -8],
          className: 'aktor-tooltip',
        });

        markersRef.current.push(marker);
      });
    }

    updateMarkers(map);
  }, [filteredActors]);

  return (
    <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-natural-sage/5 shadow-lg">
      <div className="p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-natural-forest md:text-xl">
            Aktører på kartet
          </h3>
          <span className="text-sm text-gray-500">
            {filteredActors.length} av {actors.length} aktører
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {(Object.keys(CATEGORY_CONFIG) as (AktorCategory | 'all')[]).map(cat => {
            const config = CATEGORY_CONFIG[cat];
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all md:text-sm ${
                  isActive
                    ? 'bg-natural-forest text-white shadow-sm'
                    : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat !== 'all' && (
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                )}
                {config.label}
                <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                  ({categoryCounts[cat]})
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gray-200/50">
          <div ref={mapRef} style={{ height, width: '100%' }} />

          {selectedAktor && (
            <div className="absolute bottom-4 left-4 right-4 z-[1000] md:left-auto md:right-4 md:w-80">
              <div className="rounded-xl border border-gray-200/50 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-natural-forest">{selectedAktor.navn}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: CATEGORY_CONFIG[selectedAktor.category].color }}
                      />
                      {selectedAktor.type}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAktor(null)}
                    className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">{selectedAktor.adresse}</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <div className="text-xs font-bold text-natural-forest">
                      {selectedAktor.omsetning}M
                    </div>
                    <div className="text-[10px] text-gray-400">Omsetning</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <div className={`text-xs font-bold ${
                      selectedAktor.yoy_vekst !== null && selectedAktor.yoy_vekst > 0
                        ? 'text-green-600'
                        : selectedAktor.yoy_vekst !== null && selectedAktor.yoy_vekst < 0
                          ? 'text-red-500'
                          : 'text-gray-500'
                    }`}>
                      {selectedAktor.yoy_vekst !== null ? `${selectedAktor.yoy_vekst > 0 ? '+' : ''}${selectedAktor.yoy_vekst}%` : '-'}
                    </div>
                    <div className="text-[10px] text-gray-400">Vekst</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <div className="text-xs font-bold text-natural-forest">
                      {selectedAktor.ansatte}
                    </div>
                    <div className="text-[10px] text-gray-400">Ansatte</div>
                  </div>
                </div>
                <div className="mt-2 text-right text-[10px] text-gray-400">
                  Rang {selectedAktor.rank} | {selectedAktor.markedsandel}% markedsandel
                </div>
              </div>
            </div>
          )}
        </div>

        <style jsx global>{`
          .aktor-tooltip {
            font-size: 12px;
            font-weight: 500;
            padding: 4px 8px;
            border-radius: 6px;
          }
          .leaflet-control-attribution {
            font-size: 10px !important;
          }
        `}</style>
      </div>
    </div>
  );
}
