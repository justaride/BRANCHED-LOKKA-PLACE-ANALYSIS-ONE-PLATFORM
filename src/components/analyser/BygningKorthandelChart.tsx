"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  dato: string;
  beløp: number;
};

type BygningKorthandelChartProps = {
  data: DataPoint[];
};

export default function BygningKorthandelChart({
  data,
}: BygningKorthandelChartProps) {
  const sampledData = data.filter((_, i) => i % 7 === 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("nb-NO", {
      month: "short",
      year: "2-digit",
    });
  };

  const formatTooltipDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={sampledData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="dato"
          tickFormatter={formatDate}
          stroke="#6b7280"
          style={{ fontSize: "12px" }}
        />
        <YAxis
          stroke="#6b7280"
          style={{ fontSize: "12px" }}
          label={{ value: "mNOK", angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          labelFormatter={(label) => formatTooltipDate(label as string)}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "12px",
          }}
          formatter={(value: number) => [
            `${value.toFixed(2)} mNOK`,
            "Korthandel",
          ]}
        />
        <Line
          type="monotone"
          dataKey="beløp"
          stroke="#d97706"
          strokeWidth={2}
          dot={false}
          name="Daglig korthandel"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
