import { apiRequest } from "../../../lib/api";
import type { DailyLog } from "../../daily-log/types";

export async function fetchLogs(params: { from: string; to: string }) {
  const query = new URLSearchParams(params);

  return apiRequest<{ logs: DailyLog[] }>(`/logs?${query.toString()}`);
}
