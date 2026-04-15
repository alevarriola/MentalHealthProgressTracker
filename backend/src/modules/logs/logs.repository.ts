import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import type { CreateDailyLogInput, ListDailyLogsQuery } from "./logs.schemas.js";

const dailyLogSelect = {
  id: true,
  date: true,
  moodRating: true,
  anxietyLevel: true,
  sleepHours: true,
  sleepQuality: true,
  sleepDisturbances: true,
  physicalActivityType: true,
  physicalActivityDurationMin: true,
  socialInteractionLevel: true,
  stressLevel: true,
  depressionSymptoms: true,
  anxietySymptoms: true,
  notes: true,
  createdAt: true,
  updatedAt: true
} satisfies Prisma.DailyLogSelect;

export type DailyLogRecord = Prisma.DailyLogGetPayload<{
  select: typeof dailyLogSelect;
}>;

type CreateDailyLogRecordInput = Omit<CreateDailyLogInput, "date"> & {
  userId: string;
  date: Date;
};

export async function createDailyLog(input: CreateDailyLogRecordInput) {
  return prisma.dailyLog.create({
    data: input,
    select: dailyLogSelect
  });
}

export async function findDailyLogByUserAndDate(userId: string, date: Date) {
  return prisma.dailyLog.findUnique({
    where: {
      userId_date: {
        userId,
        date
      }
    },
    select: dailyLogSelect
  });
}

export async function listDailyLogsByUser(
  userId: string,
  filters: {
    startDate?: Date;
    endDate?: Date;
  }
) {
  return prisma.dailyLog.findMany({
    where: {
      userId,
      date: {
        gte: filters.startDate,
        lte: filters.endDate
      }
    },
    orderBy: {
      date: "desc"
    },
    select: dailyLogSelect
  });
}
