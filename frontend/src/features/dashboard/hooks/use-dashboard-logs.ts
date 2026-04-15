import { useQuery } from "@tanstack/react-query";
import { dailyLogsQueryKey } from "../../daily-log/hooks/use-create-daily-log";
import { fetchLogs } from "../api/logs";
import { getRangeBounds } from "../lib/trends";
import type { DashboardRange } from "../types";

export function useDashboardLogs(range: DashboardRange) {
  const bounds = getRangeBounds(range);

  return useQuery({
    queryKey: [...dailyLogsQueryKey, range, bounds.from, bounds.to],
    queryFn: () => fetchLogs(bounds)
  });
}
