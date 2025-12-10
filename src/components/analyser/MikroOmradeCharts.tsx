'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';
import { safeNumber } from '@/lib/utils/safe-data';

interface KonseptmiksData {
  summary: {
    total: number;
    categories: Array<{
      name: string;
      count: number;
      percentage: number;
    }>;
  };
  detailed: Array<{
    category: string;
    subcategory: string;
    count: number;
  }>;
}

interface MikroOmradeChartsProps {
  basePath: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Mat og opplevelser': '#7c3aed',
  'Handel': '#2563eb',
  'Tjenester': '#059669',
};

const PIE_COLORS = ['#7c3aed', '#2563eb', '#059669', '#d97706', '#dc2626'];

export default function MikroOmradeCharts({ basePath }: MikroOmradeChartsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [konseptData, setKonseptData] = useState<KonseptmiksData | null>(null);
  const [activeTab, setActiveTab] = useState<'pie' | 'bar' | 'detailed'>('pie');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${basePath}/konseptmiks.json`);
        if (!response.ok) throw new Error('Kunne ikke laste data');
        const data = await response.json();
        setKonseptData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ukjent feil');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [basePath]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  if (error || !konseptData) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        <p>Kunne ikke laste chart-data: {error}</p>
      </div>
    );
  }

  const pieData = konseptData.summary.categories.map(cat => ({
    name: cat.name,
    value: cat.count,
    percentage: cat.percentage,
  }));

  const barData = konseptData.detailed.map(item => ({
    name: item.subcategory,
    count: item.count,
    category: item.category,
  }));

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-small md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-lokka-primary">Konseptmiks Visualisering</h3>
        <div className="flex gap-2">
          {(['pie', 'bar', 'detailed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab === 'pie' ? 'Kakediagram' : tab === 'bar' ? 'Søylediagram' : 'Detaljert'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'pie' && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, payload }) => `${name}: ${payload?.percentage ?? 0}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CATEGORY_COLORS[entry.name] || PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} konsepter`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'bar' && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => [`${value} konsepter`, 'Antall']}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CATEGORY_COLORS[entry.category] || PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'detailed' && (
        <div className="space-y-6">
          {konseptData.summary.categories.map(cat => {
            const categoryItems = konseptData.detailed.filter(d => d.category === cat.name);
            return (
              <div key={cat.name}>
                <h4
                  className="mb-3 font-semibold"
                  style={{ color: CATEGORY_COLORS[cat.name] || '#374151' }}
                >
                  {cat.name} ({cat.count} konsepter, {cat.percentage}%)
                </h4>
                <div className="space-y-2 pl-4">
                  {categoryItems.map(item => (
                    <div key={item.subcategory} className="flex items-center justify-between">
                      <span className="text-sm text-lokka-secondary">{item.subcategory}</span>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${safeNumber(item.count / cat.count * 100, 0)}px`,
                            minWidth: '20px',
                            maxWidth: '100px',
                            backgroundColor: CATEGORY_COLORS[cat.name] || '#6b7280'
                          }}
                        />
                        <span className="w-8 text-right font-semibold text-lokka-primary">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 rounded-lg bg-purple-50 p-4">
        <p className="text-sm text-purple-900">
          <strong>Totalt:</strong> {konseptData.summary.total} konsepter fordelt på{' '}
          {konseptData.summary.categories.length} hovedkategorier
        </p>
      </div>
    </div>
  );
}
