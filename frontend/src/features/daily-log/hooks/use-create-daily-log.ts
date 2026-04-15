import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDailyLog } from "../api/logs";

export const dailyLogsQueryKey = ["logs"];

export function useCreateDailyLogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDailyLog,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: dailyLogsQueryKey
      });
    }
  });
}
