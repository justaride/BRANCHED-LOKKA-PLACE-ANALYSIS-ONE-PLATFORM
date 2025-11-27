'use client';

import { KulturTimelineEvent } from '@/types/biblioteket';
import { useState } from 'react';

interface KulturNetworkProps {
    events: KulturTimelineEvent[];
}

export default function KulturNetwork({ events }: KulturNetworkProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique people and places
    const allPeople = Array.from(new Set(events.flatMap(e => e.names))).sort();
    const allPlaces = Array.from(new Set(events.flatMap(e => e.places))).sort();

    // Filter events based on selection
    const filteredEvents = selectedTag
        ? events.filter(e => e.names.includes(selectedTag) || e.places.includes(selectedTag))
        : events;

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {/* Explorer Sidebar */}
            <div className="lg:col-span-1 space-y-8">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-sm font-bold uppercase text-gray-500">Utforsk Personer</h3>
                    <div className="flex flex-wrap gap-2">
                        {allPeople.map(person => (
                            <button
                                key={person}
                                onClick={() => setSelectedTag(selectedTag === person ? null : person)}
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedTag === person
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                                    }`}
                            >
                                {person}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-sm font-bold uppercase text-gray-500">Utforsk Steder</h3>
                    <div className="flex flex-wrap gap-2">
                        {allPlaces.map(place => (
                            <button
                                key={place}
                                onClick={() => setSelectedTag(selectedTag === place ? null : place)}
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedTag === place
                                        ? 'bg-pink-600 text-white'
                                        : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                                    }`}
                            >
                                {place}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Feed */}
            <div className="lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                        {selectedTag ? `Hendelser knyttet til "${selectedTag}"` : 'Alle Hendelser'}
                    </h3>
                    <span className="text-sm text-gray-500">{filteredEvents.length} treff</span>
                </div>

                <div className="space-y-4">
                    {filteredEvents.map((event, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600">
                                    {event.period}
                                </span>
                                <div className="flex gap-2">
                                    {event.categories.map(cat => (
                                        <span key={cat} className="text-xs text-gray-400">#{cat}</span>
                                    ))}
                                </div>
                            </div>

                            <h4 className="text-lg font-bold text-gray-900">{event.event}</h4>

                            {(event.names.length > 0 || event.places.length > 0) && (
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {event.names.map(name => (
                                        <span key={name} className="flex items-center gap-1 rounded bg-purple-50 px-2 py-0.5 text-purple-700">
                                            👤 {name}
                                        </span>
                                    ))}
                                    {event.places.map(place => (
                                        <span key={place} className="flex items-center gap-1 rounded bg-pink-50 px-2 py-0.5 text-pink-700">
                                            📍 {place}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
