import { HistorieTimelineEvent } from '@/types/biblioteket';

interface HistorieTimelineProps {
    events: HistorieTimelineEvent[];
}

export default function HistorieTimeline({ events }: HistorieTimelineProps) {
    // Sort by start year ascending
    const sortedEvents = [...events].sort((a, b) => a.start_year - b.start_year);

    return (
        <div className="relative border-l-2 border-gray-200 pl-8 ml-4 space-y-12 py-8">
            {sortedEvents.map((event) => (
                <div key={event.id} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-lokka-primary ring-4 ring-white" />

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                        <div className="w-32 flex-shrink-0">
                            <span className="text-xl font-bold text-lokka-primary">
                                {event.start_year}
                                {event.end_year !== event.start_year && `–${event.end_year}`}
                            </span>
                        </div>
                        <div className="flex-1 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                            <h3 className="mb-2 text-xl font-bold text-gray-900">
                                {event.label}
                            </h3>
                            <p className="mb-4 text-gray-600">
                                {event.summary}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
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
