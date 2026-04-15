import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../config/env.js";

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
    socket.emit("connection:ready", {
      message: "Realtime channel connected."
    });
  });

  return io;
}

export function getSocketServer() {
  return io;
}

export function emitDashboardUpdated() {
  io?.emit(DASHBOARD_UPDATED_EVENT, {
    type: "daily-log-created",
    occurredAt: new Date().toISOString()
  });
}
