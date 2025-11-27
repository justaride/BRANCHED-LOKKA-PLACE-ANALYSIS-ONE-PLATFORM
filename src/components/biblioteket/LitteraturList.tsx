import { LitteraryWork } from '@/types/biblioteket';

interface LitteraturListProps {
    works: LitteraryWork[];
}

export default function LitteraturList({ works }: LitteraturListProps) {
    // Sort by year descending
    const sortedWorks = [...works].sort((a, b) => b.year - a.year);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-6 py-4 font-bold">År</th>
                            <th className="px-6 py-4 font-bold">Tittel</th>
                            <th className="px-6 py-4 font-bold">Forfatter</th>
                            <th className="px-6 py-4 font-bold">Type</th>
                            <th className="px-6 py-4 font-bold">Tema</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sortedWorks.map((work) => (
                            <tr key={work.id} className="hover:bg-gray-50">
                                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                                    {work.year}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {work.title}
                                </td>
                                <td className="px-6 py-4">
                                    {work.authors.join(', ')}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                        {work.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {work.topics.map((topic) => (
                                            <span
                                                key={topic}
                                                className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
