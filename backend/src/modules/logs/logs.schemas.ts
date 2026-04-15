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
  date: z.string().regex(datePattern, "Date must use YYYY-MM-DD format"),
  moodRating: z.number().int().min(1).max(10),
  anxietyLevel: z.number().int().min(1).max(10),
  sleepHours: z.number().min(0).max(24),
  sleepQuality: z.number().int().min(1).max(10),
  sleepDisturbances: optionalTrimmedString,
  physicalActivityType: optionalTrimmedString,
  physicalActivityDurationMin: z.number().int().min(0).max(1440).optional(),
  socialInteractionLevel: z.number().int().min(1).max(10),
  stressLevel: z.number().int().min(1).max(10),
  depressionSymptoms: z.number().int().min(1).max(10),
  anxietySymptoms: z.number().int().min(1).max(10),
  notes: optionalTrimmedString
});

export const listDailyLogsQuerySchema = z
  .object({
    from: z.string().regex(datePattern, "from must use YYYY-MM-DD format").optional(),
    to: z.string().regex(datePattern, "to must use YYYY-MM-DD format").optional()
  })
  .refine(
    ({ from, to }) => {
      if (!from || !to) {
        return true;
      }

      return from <= to;
    },
    {
      message: "from must be before or equal to to",
      path: ["from"]
    }
  );

export type CreateDailyLogInput = z.infer<typeof createDailyLogSchema>;
export type ListDailyLogsQuery = z.infer<typeof listDailyLogsQuerySchema>;
