'use client';

import { useEffect, useRef, useState } from 'react';

type MikroSone = {
  id: string
  navn: string
  kortNavn: string
  dagligBesokende: number
  areal: number
  lat: number
  lng: number
  harData: boolean
}

type MeasurementZone = {
  id: string
  navn: string
  harData: boolean
  polygon: [number, number][]
}

type FootfallBubbleMapProps = {
  mikrosoner: MikroSone[]
  measurementZones?: MeasurementZone[]
  height?: string
}

const GRUNERLOKKA_CENTER: [number, number] = [59.9218, 10.7565];
const DEFAULT_ZOOM = 14;

function getColor(value: number, max: number): string {
  if (value === 0) return '#9CA3AF';
  const ratio = value / max;
  if (ratio > 0.7) return '#DC2626';
  if (ratio > 0.4) return '#F59E0B';
  return '#22C55E';
}

function getRadius(value: number, max: number): number {
  if (value === 0) return 10;
  const minR = 14;
  const maxR = 35;
  return minR + (value / max) * (maxR - minR);
}

export default function FootfallBubbleMap({
  mikrosoner,
  measurementZones,
  height = '600px',
}: FootfallBubbleMapProps) {
  const [showZones, setShowZones] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{ bubbles: L.Layer[]; zones: L.Layer[] }>({ bubbles: [], zones: [] });

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
        center: GRUNERLOKKA_CENTER,
        zoom: DEFAULT_ZOOM,
        scrollWheelZoom: true,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 20,
        subdomains: 'abcd',
      }).addTo(map);

      const maxValue = Math.max(...mikrosoner.map(s => s.dagligBesokende));
      const sortedSoner = [...mikrosoner].sort((a, b) => b.dagligBesokende - a.dagligBesokende);

      sortedSoner.forEach(sone => {
        const color = getColor(sone.dagligBesokende, maxValue);
        const radius = getRadius(sone.dagligBesokende, maxValue);

        const circle = L.circleMarker([sone.lat, sone.lng], {
          radius,
          fillColor: color,
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.75,
        }).addTo(map);

        const label = sone.harData
          ? `${sone.dagligBesokende.toLocaleString('nb-NO')}`
          : 'Ingen data';

        circle.bindTooltip(
          `<div style="text-align:center;font-weight:600">${sone.kortNavn}</div>
           <div style="text-align:center;font-size:13px">${label} ${sone.harData ? 'daglige' : ''}</div>`,
          {
            permanent: true,
            direction: 'center',
            className: 'footfall-label',
          }
        );

        layersRef.current.bubbles.push(circle);
      });

      if (measurementZones) {
        measurementZones.forEach(zone => {
          const polygon = L.polygon(zone.polygon, {
            color: zone.harData ? '#0d9488' : '#D97706',
            weight: 2,
            fillColor: zone.harData ? '#0d9488' : '#D97706',
            fillOpacity: zone.harData ? 0.12 : 0.08,
            dashArray: zone.harData ? undefined : '6 4',
          });

          const tooltipContent = zone.harData
            ? `<div style="text-align:center;font-weight:600">${zone.navn}</div><div style="text-align:center;font-size:12px;color:#0d9488">Aktiv målesone</div>`
            : `<div style="text-align:center;font-weight:600">${zone.navn}</div><div style="text-align:center;font-size:12px;color:#D97706">Utilstrekkelig dekning</div>`;

          polygon.bindTooltip(tooltipContent, {
            permanent: true,
            direction: 'center',
            className: 'footfall-label',
          });

          polygon.addTo(map);
          layersRef.current.zones.push(polygon);
        });
      }

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      layersRef.current = { bubbles: [], zones: [] };
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    layersRef.current.bubbles.forEach(layer => {
      if (showZones) {
        mapInstanceRef.current!.removeLayer(layer);
      } else {
        layer.addTo(mapInstanceRef.current!);
      }
    });

    layersRef.current.zones.forEach(layer => {
      if (showZones) {
        layer.addTo(mapInstanceRef.current!);
      } else {
        mapInstanceRef.current!.removeLayer(layer);
      }
    });
  }, [showZones]);

  const hasZones = measurementZones && measurementZones.length > 0;

  return (
    <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-natural-sage/5 shadow-lg">
      <div className="p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-natural-forest md:text-xl">
            {showZones ? 'Målesoner (datakilde)' : 'Footfall per mikro-område'}
          </h3>
          <div className="flex items-center gap-3">
            {hasZones && (
              <button
                onClick={() => setShowZones(!showZones)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  showZones
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showZones ? 'Vis resultater' : 'Vis målesoner'}
              </button>
            )}
            <span className="text-sm text-gray-500">
              {showZones ? 'Geografiske tellesoner fra Telia' : 'Daglig gjennomsnitt besøkende'}
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gray-200/50">
          <div ref={mapRef} style={{ height, width: '100%' }} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          {showZones ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-sm border-2 border-teal-600 bg-teal-600/20" />
                Aktiv målesone
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-sm border-2 border-dashed border-amber-500 bg-amber-500/10" />
                Utilstrekkelig dekning
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-full bg-red-600" />
                Høy trafikk
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-full bg-amber-500" />
                Middels
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
                Lavere
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-full bg-gray-400" />
                Ingen data
              </div>
            </>
          )}
        </div>

        <style jsx global>{`
          .footfall-label {
            background: rgba(255,255,255,0.92) !important;
            border: 1px solid rgba(0,0,0,0.1) !important;
            border-radius: 8px !important;
            padding: 4px 8px !important;
            font-size: 11px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
          }
          .footfall-label::before {
            display: none !important;
          }
        `}</style>
      </div>
    </div>
  );
}
