import { IldsjelPlace } from '@/types/biblioteket';
import Image from 'next/image';

interface IldsjelMapProps {
    places: IldsjelPlace[];
    onPlaceClick?: (place: IldsjelPlace) => void;
}

export default function IldsjelMap({ places, onPlaceClick }: IldsjelMapProps) {
    // Approximate bounds for Grünerløkka to map lat/lng to %
    // These would need to be calibrated to the specific map image used
    const BOUNDS = {
        minLat: 59.918,
        maxLat: 59.928,
        minLng: 10.750,
        maxLng: 10.765
    };

    const getPosition = (lat: number, lng: number) => {
        const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
        const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
        return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
    };

    return (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 shadow-inner">
            {/* Map Background - Placeholder until real image is added */}
            <div className="absolute inset-0 bg-[#e5e7eb]">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
                <div className="flex h-full items-center justify-center text-gray-400">
                    Kart over Grünerløkka (Placeholder)
                </div>
            </div>

            {/* Pins */}
            {places.map((place) => {
                if (!place.lat || !place.lng) return null;
                const pos = getPosition(place.lat, place.lng);

                return (
                    <div
                        key={place.id}
                        className="group absolute -ml-3 -mt-3 cursor-pointer"
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        onClick={() => onPlaceClick?.(place)}
                    >
                        <div className="relative flex items-center justify-center">
                            <div className="h-6 w-6 rounded-full border-2 border-white bg-lokka-primary shadow-md transition-transform group-hover:scale-125" />
                            <div className="absolute bottom-full mb-2 hidden whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg group-hover:block">
                                {place.name}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
