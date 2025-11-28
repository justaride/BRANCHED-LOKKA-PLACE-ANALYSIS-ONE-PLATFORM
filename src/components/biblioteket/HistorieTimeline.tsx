import { HistorieTimelineEvent } from '@/types/biblioteket';

interface HistorieTimelineProps {
    events: HistorieTimelineEvent[];
}

export default function HistorieTimeline({ events }: HistorieTimelineProps) {
    // Sort by start year ascending
    const sortedEvents = [...events].sort((a, b) => a.start_year - b.start_year);

    return (
        <div className="relative border-l-4 border-gradient-to-b from-blue-500 via-purple-500 to-pink-500 pl-8 ml-4 space-y-12 py-8"
            style={{
                borderLeftWidth: '4px',
                borderImage: 'linear-gradient(to bottom, #3B82F6, #8B5CF6, #EC4899) 1'
            }}
        >
            {sortedEvents.map((event) => (
                <div key={event.id} className="relative">
                    {/* Enhanced Timeline Dot with Glow */}
                    <div
                        className="absolute -left-[43px] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 ring-4 ring-white shadow-xl"
                        style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0,0,0,0.2)' }}
                    />

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                        <div className="w-32 flex-shrink-0">
                            <span className="text-xl font-black text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text">
                                {event.start_year}
                                {event.end_year !== event.start_year && `–${event.end_year}`}
                            </span>
                        </div>
                        <div className="flex-1 rounded-2xl border-2 border-gray-100 bg-white/90 backdrop-blur-sm p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-200">
                            <h3 className="mb-2 text-xl font-bold text-gray-900">
                                {event.label}
                            </h3>
                            <p className="mb-4 text-gray-600 leading-relaxed">
                                {event.summary}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm border border-blue-100"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
