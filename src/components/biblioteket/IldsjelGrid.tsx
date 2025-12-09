import Link from 'next/link';
import Image from 'next/image';
import { Ildsjel } from '@/types/biblioteket';

interface IldsjelGridProps {
    ildsjeler: Ildsjel[];
}

export default function IldsjelGrid({ ildsjeler }: IldsjelGridProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ildsjeler.map((ildsjel) => (
                <Link
                    key={ildsjel.id}
                    href={`/main-board/biblioteket/ildsjeler/${ildsjel.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-natural-sage/40"
                >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-natural-sand/30 to-natural-sand/10">
                        {ildsjel.imageUrl ? (
                            <Image
                                src={ildsjel.imageUrl}
                                alt={ildsjel.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-natural-sand/50">
                                    <svg className="h-12 w-12 text-natural-earth" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {ildsjel.mainPeriod.from}
                                {ildsjel.mainPeriod.to ? `–${ildsjel.mainPeriod.to}` : '–'}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                        <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-natural-forest transition-colors">
                            {ildsjel.name}
                        </h3>
                        <p className="mb-4 line-clamp-3 text-sm text-gray-600 leading-relaxed">
                            {ildsjel.summary}
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2">
                            {ildsjel.categories.slice(0, 3).map((cat) => (
                                <span
                                    key={cat}
                                    className="rounded-full bg-natural-sand/30 px-2.5 py-1 text-xs font-medium text-natural-earth border border-natural-sand"
                                >
                                    {cat}
                                </span>
                            ))}
                            {ildsjel.categories.length > 3 && (
                                <span className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500">
                                    +{ildsjel.categories.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
