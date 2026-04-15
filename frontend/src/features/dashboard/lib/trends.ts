import type { DailyLog } from "../../daily-log/types";
import type {
  DashboardRange,
  DashboardSummary,
  TrendPoint
} from "../types";

function getRangeLength(range: DashboardRange) {
  return range === "weekly" ? 6 : 29;
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function shiftDays(date: Date, days: number) {
  const shifted = new Date(date);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted;
}

export function getRangeBounds(range: DashboardRange) {
  const today = new Date();
  const end = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );
  const start = shiftDays(end, -getRangeLength(range));

  return {
    from: formatDateKey(start),
    to: formatDateKey(end)
  };
}

function formatAxisLabel(date: string, range: DashboardRange) {
  const parsed = new Date(`${date}T00:00:00.000Z`);

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(range === "monthly" ? { weekday: undefined } : {})
  });
}

export function buildTrendPoints(logs: DailyLog[], range: DashboardRange): TrendPoint[] {
  return [...logs]
    .sort((left, right) => left.date.localeCompare(right.date))
    .map((log) => ({
      date: formatAxisLabel(log.date, range),
      moodRating: log.moodRating,
      anxietyLevel: log.anxietyLevel,
      stressLevel: log.stressLevel
    }));
}

export function buildDashboardSummary(logs: DailyLog[]): DashboardSummary {
  if (logs.length === 0) {
    return {
      averageMood: 0,
      averageAnxiety: 0,
      averageStress: 0,
      totalEntries: 0
    };
  }

  const totals = logs.reduce(
    (accumulator, log) => {
      accumulator.mood += log.moodRating;
      accumulator.anxiety += log.anxietyLevel;
      accumulator.stress += log.stressLevel;
      return accumulator;
    },
    {
      mood: 0,
      anxiety: 0,
      stress: 0
    }
  );

  return {
    averageMood: totals.mood / logs.length,
    averageAnxiety: totals.anxiety / logs.length,
    averageStress: totals.stress / logs.length,
    totalEntries: logs.length
  };
}
