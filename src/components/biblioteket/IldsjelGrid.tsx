import Link from 'next/link';
import Image from 'next/image';
import { Ildsjel } from '@/types/biblioteket';

interface IldsjelGridProps {
    ildsjeler: Ildsjel[];
}

export default function IldsjelGrid({ ildsjeler }: IldsjelGridProps) {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ildsjeler.map((ildsjel) => (
                <Link
                    key={ildsjel.id}
                    href={`/main-board/biblioteket/ildsjeler/${ildsjel.id}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                        {ildsjel.imageUrl ? (
                            <Image
                                src={ildsjel.imageUrl}
                                alt={ildsjel.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                                <span className="text-4xl">👤</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="text-sm font-medium opacity-90">
                                {ildsjel.mainPeriod.from}
                                {ildsjel.mainPeriod.to ? `–${ildsjel.mainPeriod.to}` : ''}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                        <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-lokka-primary">
                            {ildsjel.name}
                        </h3>
                        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                            {ildsjel.summary}
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2">
                            {ildsjel.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
