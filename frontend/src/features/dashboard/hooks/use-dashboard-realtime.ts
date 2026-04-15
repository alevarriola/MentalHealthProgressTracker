import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { socketUrl } from "../../../lib/api";
import {
  logFrontendInfo,
  logFrontendWarn
} from "../../../lib/logger";
import { dailyLogsQueryKey } from "../../daily-log/hooks/use-create-daily-log";

const DASHBOARD_UPDATED_EVENT = "dashboard:updated";

export function useDashboardRealtime() {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(socketUrl, {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket", "polling"]
    });

    const handleConnect = () => {
      setIsConnected(true);
      logFrontendInfo("socket_connected");
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      logFrontendWarn("socket_disconnected");
    };

    const handleDashboardUpdated = () => {
      logFrontendInfo("dashboard_update_received");
      queryClient.invalidateQueries({
        queryKey: dailyLogsQueryKey
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on(DASHBOARD_UPDATED_EVENT, handleDashboardUpdated);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off(DASHBOARD_UPDATED_EVENT, handleDashboardUpdated);
      socket.disconnect();
    };
  }, [queryClient]);

  return {
    isConnected
  };
}
