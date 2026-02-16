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
  ResponsiveContainer,
  Cell
} from 'recharts';

interface KorthandelComparisonChartsProps {
  basePath: string;
}

interface KorthandelData {
  totalOmsetning2024: { area: string; color: string; value: number }[];
  arligVekst: { area: string; color: string; value: number }[];
  indeksertVekst: { id: string; color: string; data: { x: string; y: number }[] }[];
  ukedagFordeling: { id: string; color: string; data: { x: string; y: number }[] }[];
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

export default function KorthandelComparisonCharts({
  basePath,
}: KorthandelComparisonChartsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<KorthandelData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${basePath}/korthandel-sammenligning.json`);
        if (!response.ok) throw new Error('Failed to load data');
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError('Kunne ikke laste korthandeldata');
        console.error('Error loading korthandel comparison data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [basePath]);

  const tabs = [
    { id: 0, label: 'Total Omsetning' },
    { id: 1, label: 'Årlig Vekst' },
    { id: 2, label: 'Indeksert Utvikling' },
    { id: 3, label: 'Ukedagsfordeling' },
  ];

  if (loading) return <div className="h-64 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"/></div>;
  if (error || !data) return <div className="h-64 flex items-center justify-center text-red-600">{error || 'Ingen data'}</div>;

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="text-sm flex justify-between gap-4" style={{ color: entry.color }}>
            <span>{entry.name}:</span>
            <span className="font-medium">
              {typeof entry.value === 'number' ? entry.value.toLocaleString('nb-NO') : entry.value}
              {activeTab === 0 ? ' MNOK' : activeTab === 2 ? '' : '%'}
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
          Korthandel - Sammenligning
        </h2>
        <p className="text-sm text-gray-600">
          Sammenligning av omsetning og handelsmønstre
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
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
              <BarChart data={data.totalOmsetning2024} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="area" tick={{fontSize: 12}} />
                <YAxis tickFormatter={(val) => `${val} M`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Omsetning 2024" radius={[4, 4, 0, 0]}>
                  {data.totalOmsetning2024.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            ) : activeTab === 1 ? (
              <BarChart data={data.arligVekst} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="area" tick={{fontSize: 12}} />
                <YAxis tickFormatter={(val) => `${val}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Årlig Vekst" radius={[4, 4, 0, 0]}>
                  {data.arligVekst.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            ) : activeTab === 2 ? (
              <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="category" allowDuplicatedCategory={false} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {data.indeksertVekst.map((series) => (
                  <Line
                    key={series.id}
                    data={series.data}
                    type="monotone"
                    dataKey="y"
                    name={series.id}
                    stroke={series.color}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            ) : (
               <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="category" allowDuplicatedCategory={false} />
                <YAxis tickFormatter={(val) => `${val}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {data.ukedagFordeling.map((series) => (
                  <Line
                    key={series.id}
                    data={series.data}
                    type="monotone"
                    dataKey="y"
                    name={series.id}
                    stroke={series.color}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

