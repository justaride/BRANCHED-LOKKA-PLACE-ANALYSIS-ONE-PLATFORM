'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface KonkurranseComparisonChartsProps {
  basePath: string;
}

interface KjederData {
  area: string;
  color: string;
  kjeder: {
    count: number;
    revenue: number;
    shareCount: number;
    shareRevenue: number;
  };
  uavhengige: {
    count: number;
    revenue: number;
    shareCount: number;
    shareRevenue: number;
  };
}

interface CategoryData {
  name: string;
  count: number;
  revenue: number;
  share: number;
}

interface KonseptData {
  area: string;
  color: string;
  categories: CategoryData[];
}

interface UtviklingData {
  year: string;
  [key: string]: string | number;
}

interface MarkedsandelData {
  category: string;
  lokka: number;
  bjørvika: number;
  sentrum: number;
  majorstuen: number;
}

interface FullData {
  kjederVsUavhengige: KjederData[];
  konseptmiks: KonseptData[];
  utvikling: UtviklingData[];
  markedsandeler: MarkedsandelData[];
}

// Type for the transformed data used in charts
interface KonseptChartEntry {
  name: string;
  [key: string]: string | number;
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export default function KonkurranseComparisonCharts({
  basePath,
}: KonkurranseComparisonChartsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState('mat_og_opplevelser'); // For Utvikling tab
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FullData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${basePath}/konkurranse-sammenligning.json`);
        if (!response.ok) throw new Error('Failed to load data');
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError('Kunne ikke laste konkurransedata');
        console.error('Error loading konkurranse comparison data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [basePath]);

  const tabs = [
    { id: 0, label: 'Kjeder vs Uavhengige (Antall)' },
    { id: 1, label: 'Kjeder vs Uavhengige (Omsetning)' },
    { id: 2, label: 'Konseptmiks' },
    { id: 3, label: 'Utvikling per år' },
    { id: 4, label: 'Over-/underandel' },
  ];

  const formatPercentage = (num: number) => `${num.toFixed(1)}%`;
  const formatMNOK = (num: number) => `${Math.round(num).toLocaleString('nb-NO')} MNOK`;

  if (loading) return <div className="h-64 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-natural-forest border-t-transparent rounded-full"/></div>;
  if (error || !data) return <div className="h-64 flex items-center justify-center text-red-600">{error || 'Ingen data'}</div>;

  // Prepare Data for Charts
  const kjederCountChartData = data.kjederVsUavhengige.map(d => ({
    name: d.area,
    Kjeder: d.kjeder.shareCount,
    Uavhengige: d.uavhengige.shareCount,
    rawKjeder: d.kjeder.count,
    rawUavhengige: d.uavhengige.count
  }));

  const kjederRevChartData = data.kjederVsUavhengige.map(d => ({
    name: d.area,
    Kjeder: d.kjeder.shareRevenue,
    Uavhengige: d.uavhengige.shareRevenue,
    rawKjeder: d.kjeder.revenue,
    rawUavhengige: d.uavhengige.revenue
  }));

  // For Konseptmiks
  const allCategories = Array.from(new Set(data.konseptmiks.flatMap(d => d.categories.map(c => c.name))));
  const categoryColors = ['#2D5F3F', '#4A90E2', '#E74C3C', '#9B59B6', '#F1C40F', '#34495E'];

  const konseptChartData: KonseptChartEntry[] = data.konseptmiks.map(d => {
    const entry: KonseptChartEntry = { name: d.area };
    d.categories.forEach(c => {
      entry[c.name] = c.share;
    });
    return entry;
  });

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="text-sm flex justify-between gap-4" style={{ color: entry.color }}>
            <span>{entry.name}:</span>
            <span className="font-medium">
              {activeTab === 3 || activeTab === 1 
                ? (typeof entry.value === 'number' && activeTab === 3 ? formatMNOK(entry.value) : `${typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}%`)
                : formatPercentage(typeof entry.value === 'number' ? entry.value : 0)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-12 md:mb-20">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-natural-forest mb-2">
          Konkurransebildet - Sammenligning
        </h2>
        <p className="text-sm text-gray-600">
          Analyse av markedsstruktur og bransjefordeling
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-natural-forest text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 0 ? (
               <BarChart data={kjederCountChartData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={formatPercentage} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Kjeder" stackId="a" fill="#E74C3C" name="Kjeder" />
                <Bar dataKey="Uavhengige" stackId="a" fill="#2D5F3F" name="Uavhengige" />
              </BarChart>
            ) : activeTab === 1 ? (
              <BarChart data={kjederRevChartData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={formatPercentage} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Kjeder" stackId="a" fill="#E74C3C" name="Kjeder (Omsetning)" />
                <Bar dataKey="Uavhengige" stackId="a" fill="#2D5F3F" name="Uavhengige (Omsetning)" />
              </BarChart>
            ) : activeTab === 2 ? (
              <BarChart data={konseptChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tickFormatter={formatPercentage} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {allCategories.map((cat, idx) => (
                  <Bar 
                    key={cat} 
                    dataKey={cat} 
                    stackId="a" 
                    fill={categoryColors[idx % categoryColors.length]} 
                    name={cat} 
                  />
                ))}
              </BarChart>
            ) : activeTab === 3 ? (
              <>
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  {[
                    { key: 'mat_og_opplevelser', label: 'Mat & Opplevelser' },
                    { key: 'handel', label: 'Handel' },
                    { key: 'tjenester', label: 'Tjenester' }
                  ].map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`text-xs px-2 py-1 rounded border ${activeCategory === cat.key ? 'bg-gray-100 border-gray-300 font-bold' : 'bg-white border-transparent text-gray-500'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <LineChart data={data.utvikling} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(val) => `${val/1000}k`} label={{ value: 'MNOK', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey={`lokka_${activeCategory}`} name="Grünerløkka" stroke="#2D5F3F" strokeWidth={3} dot={{r:4}} />
                  <Line type="monotone" dataKey={`bjørvika_${activeCategory}`} name="Bjørvika" stroke="#4A90E2" strokeWidth={3} dot={{r:4}} />
                  <Line type="monotone" dataKey={`sentrum_${activeCategory}`} name="Sentrum" stroke="#E74C3C" strokeWidth={3} dot={{r:4}} />
                  <Line type="monotone" dataKey={`majorstuen_${activeCategory}`} name="Majorstuen" stroke="#9B59B6" strokeWidth={3} dot={{r:4}} />
                </LineChart>
              </>
            ) : (
              <BarChart data={data.markedsandeler} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(val) => `${val}%`} label={{ value: 'Over-/underandel', angle: -90, position: 'insideLeft' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="lokka" name="Grünerløkka" fill="#2D5F3F" />
                <Bar dataKey="bjørvika" name="Bjørvika" fill="#4A90E2" />
                <Bar dataKey="sentrum" name="Sentrum" fill="#E74C3C" />
                <Bar dataKey="majorstuen" name="Majorstuen" fill="#9B59B6" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
