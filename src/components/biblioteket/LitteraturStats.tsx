'use client';

import { LitteraryWork } from '@/types/biblioteket';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface LitteraturStatsProps {
    works: LitteraryWork[];
}

export default function LitteraturStats({ works }: LitteraturStatsProps) {
    // Process data for charts
    const worksByDecade = works.reduce((acc, work) => {
        const decade = Math.floor(work.year / 10) * 10;
        acc[decade] = (acc[decade] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    const decadeData = Object.entries(worksByDecade)
        .map(([decade, count]) => ({ name: `${decade}s`, count }))
        .sort((a, b) => parseInt(a.name) - parseInt(b.name));

    const topics = works.flatMap(w => w.topics);
    const topicsCount = topics.reduce((acc, topic) => {
        acc[topic] = (acc[topic] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topicData = Object.entries(topicsCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8); // Top 8 topics

    return (
        <div className="grid gap-8 md:grid-cols-2">
            {/* Publications per Decade */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-bold text-gray-900">Utgivelser per Tiår</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={decadeData}>
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: '#f3f4f6' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="count" fill="#1e40af" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Topics */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-bold text-gray-900">Mest Omtalte Temaer</h3>
                <div className="flex flex-wrap gap-3">
                    {topicData.map((topic, index) => (
                        <div
                            key={topic.name}
                            className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2"
                            style={{ opacity: 1 - (index * 0.05) }}
                        >
                            <span className="font-medium text-gray-700">{topic.name}</span>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                                {topic.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
