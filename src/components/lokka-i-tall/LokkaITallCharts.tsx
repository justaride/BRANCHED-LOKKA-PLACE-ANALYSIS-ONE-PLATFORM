'use client';

import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';

type StreetWeeklyData = { dag: string; besokende: number }[];

type SeasonData = {
  kvartal: string;
  y2023: number;
  y2024: number;
  y2025: number;
}[];

type HourlyData = { time: string; besokende: number }[];

type OriginData = { omrade: string; prosent: number }[];

type TooltipPayload = {
  name: string;
  value: number;
  color: string;
};

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
      <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString('nb-NO')}
        </p>
      ))}
    </div>
  );
};

const PercentTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
      <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.value.toFixed(1)}% av alle besokende
        </p>
      ))}
    </div>
  );
};

export function StreetWeeklyChart({ data, color }: { data: StreetWeeklyData; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="dag" tick={{ fontSize: 11, fill: '#6b7280' }} />
        <YAxis
          tick={{ fontSize: 11, fill: '#6b7280' }}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="besokende"
          name="Besokende"
          fill={color}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SeasonChart({ data }: { data: SeasonData }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="kvartal" tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis
          tick={{ fontSize: 11, fill: '#6b7280' }}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="y2023" name="2023" fill="#1a4d2e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="y2024" name="2024" fill="#3D7A3E" radius={[4, 4, 0, 0]} />
        <Bar dataKey="y2025" name="2025" fill="#97BC62" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function WholeAreaWeeklyChart({ data }: { data: StreetWeeklyData }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="dag" tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis
          tick={{ fontSize: 11, fill: '#6b7280' }}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="besokende"
          name="Besokende"
          fill="#1a4d2e"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function HourlyChart({ data }: { data: HourlyData }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 10, fill: '#6b7280' }}
          interval={2}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#6b7280' }}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="besokende"
          name="Besokende"
          stroke="#1a4d2e"
          strokeWidth={2}
          dot={{ fill: '#1a4d2e', r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function OriginChart({ data }: { data: OriginData }) {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: '#6b7280' }}
          tickFormatter={v => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="omrade"
          tick={{ fontSize: 12, fill: '#374151' }}
          width={75}
        />
        <Tooltip content={<PercentTooltip />} />
        <Bar
          dataKey="prosent"
          name="Andel"
          fill="#3D7A3E"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
