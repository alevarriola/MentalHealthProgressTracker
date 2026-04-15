import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const optionalTrimmedString = z.preprocess(
  (value: unknown) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  },
  z.string().max(500).optional()
);

export const createDailyLogSchema = z.object({
  date: z.string().regex(datePattern, "Use YYYY-MM-DD format"),
  moodRating: z.coerce.number().int().min(1).max(10),
  anxietyLevel: z.coerce.number().int().min(1).max(10),
  sleepHours: z.coerce.number().min(0).max(24),
  sleepQuality: z.coerce.number().int().min(1).max(10),
  sleepDisturbances: optionalTrimmedString,
  physicalActivityType: optionalTrimmedString,
  physicalActivityDurationMin: z.preprocess(
    (value: unknown) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }

      return Number(value);
    },
    z.number().int().min(0).max(1440).optional()
  ),
  socialInteractionLevel: z.coerce.number().int().min(1).max(10),
  stressLevel: z.coerce.number().int().min(1).max(10),
  depressionSymptoms: z.coerce.number().int().min(1).max(10),
  anxietySymptoms: z.coerce.number().int().min(1).max(10),
  notes: optionalTrimmedString
});

export type CreateDailyLogInput = z.infer<typeof createDailyLogSchema>;
