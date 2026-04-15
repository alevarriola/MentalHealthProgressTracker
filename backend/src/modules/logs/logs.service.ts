import { emitDashboardUpdated } from "../../app/socket.js";
import { AppError } from "../../utils/app-error.js";
import {
  createDailyLog,
  findDailyLogByUserAndDate,
  listDailyLogsByUser,
  type DailyLogRecord
} from "./logs.repository.js";
import type { CreateDailyLogInput, ListDailyLogsQuery } from "./logs.schemas.js";

function parseDayAsUtc(date: string) {
  return new Date(`${date}T00:00:00.000Z`);
}

function formatDayFromUtc(date: Date) {
  return date.toISOString().slice(0, 10);
}

function endOfUtcDay(date: string) {
  return new Date(`${date}T23:59:59.999Z`);
}

function serializeDailyLog(log: DailyLogRecord) {
  return {
    ...log,
    date: formatDayFromUtc(log.date)
  };
}

export async function createUserDailyLog(
  userId: string,
  input: CreateDailyLogInput
) {
  const logDate = parseDayAsUtc(input.date);
  const existingLog = await findDailyLogByUserAndDate(userId, logDate);

  if (existingLog) {
    throw new AppError("A daily log already exists for this date", 409);
  }

  const createdLog = await createDailyLog({
    ...input,
    userId,
    date: logDate
  });

  const serializedLog = serializeDailyLog(createdLog);

  emitDashboardUpdated();

  return serializedLog;
}

export async function listUserDailyLogs(
  userId: string,
  query: ListDailyLogsQuery
) {
  const logs = await listDailyLogsByUser(userId, {
    startDate: query.from ? parseDayAsUtc(query.from) : undefined,
    endDate: query.to ? endOfUtcDay(query.to) : undefined
  });

  return logs.map(serializeDailyLog);
}
