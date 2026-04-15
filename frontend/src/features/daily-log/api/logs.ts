import { apiRequest } from "../../../lib/api";
import type { CreateDailyLogInput } from "../schema";
import type { DailyLog } from "../types";

export async function createDailyLog(input: CreateDailyLogInput) {
  return apiRequest<{ log: DailyLog }>("/log", {
    method: "POST",
    body: input
  });
}
