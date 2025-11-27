import { KulturTimelineEvent } from '@/types/biblioteket';

interface KulturViewProps {
    events: KulturTimelineEvent[];
}

export default function KulturView({ events }: KulturViewProps) {
    return (
        <div className="space-y-8">
            {events.map((event, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md md:flex-row md:items-start"
                >
                    <div className="flex-shrink-0 md:w-48">
                        <span className="inline-block rounded-lg bg-purple-50 px-3 py-1 text-sm font-bold text-purple-700">
                            {event.period}
                        </span>
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-3 text-lg font-bold text-gray-900">
                            {event.event}
                        </h3>

                        {(event.names.length > 0 || event.places.length > 0) && (
                            <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                {event.names.length > 0 && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400">👥</span>
                                        <span className="text-gray-700">{event.names.join(', ')}</span>
                                    </div>
                                )}
                                {event.places.length > 0 && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400">📍</span>
                                        <span className="text-gray-700">{event.places.join(', ')}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                            {event.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="rounded-full border border-gray-100 px-2.5 py-0.5 text-xs text-gray-500"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
