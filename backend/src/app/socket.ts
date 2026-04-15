import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../config/env.js";
import { logInfo } from "../utils/logger.js";

export const DASHBOARD_UPDATED_EVENT = "dashboard:updated";

let io: Server | null = null;

export function createSocketServer(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    logInfo("socket_connected", {
      socketId: socket.id
    });

    socket.emit("connection:ready", {
      message: "Realtime channel connected."
    });

    socket.on("disconnect", (reason) => {
      logInfo("socket_disconnected", {
        socketId: socket.id,
        reason
      });
    });
  });

  return io;
}

export function getSocketServer() {
  return io;
}

export function emitDashboardUpdated() {
  logInfo("dashboard_update_emitted");

  io?.emit(DASHBOARD_UPDATED_EVENT, {
    type: "daily-log-created",
    occurredAt: new Date().toISOString()
  });
}
