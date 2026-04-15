export type DailyLog = {
  id: string;
  date: string;
  moodRating: number;
  anxietyLevel: number;
  sleepHours: number;
  sleepQuality: number;
  sleepDisturbances?: string;
  physicalActivityType?: string;
  physicalActivityDurationMin?: number;
  socialInteractionLevel: number;
  stressLevel: number;
  depressionSymptoms: number;
  anxietySymptoms: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
