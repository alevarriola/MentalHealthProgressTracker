export type DashboardRange = "weekly" | "monthly";

export type TrendPoint = {
  date: string;
  moodRating: number;
  anxietyLevel: number;
  stressLevel: number;
};

export type DashboardSummary = {
  averageMood: number;
  averageAnxiety: number;
  averageStress: number;
  totalEntries: number;
};
