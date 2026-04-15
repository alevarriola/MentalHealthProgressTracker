import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { TrendPoint } from "../types";

type TrendsChartProps = {
  data: TrendPoint[];
};

export function TrendsChart({ data }: TrendsChartProps) {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer height={320} width="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(19, 34, 56, 0.08)" strokeDasharray="3 3" />
          <XAxis
            axisLine={false}
            dataKey="date"
            tick={{ fill: "#516274", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            domain={[0, 10]}
            tick={{ fill: "#516274", fontSize: 12 }}
            tickCount={6}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "1px solid rgba(19, 34, 56, 0.12)",
              boxShadow: "0 20px 50px rgba(19, 34, 56, 0.08)"
            }}
          />
          <Legend />
          <Line
            dataKey="moodRating"
            name="Mood"
            stroke="#2f625a"
            strokeLinecap="round"
            strokeWidth={3}
            type="monotone"
          />
          <Line
            dataKey="anxietyLevel"
            name="Anxiety"
            stroke="#f5b22d"
            strokeLinecap="round"
            strokeWidth={3}
            type="monotone"
          />
          <Line
            dataKey="stressLevel"
            name="Stress"
            stroke="#7b8268"
            strokeLinecap="round"
            strokeWidth={3}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
