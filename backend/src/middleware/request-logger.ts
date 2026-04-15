import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { logInfo } from "../utils/logger.js";

export function requestLogger(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const startedAt = process.hrtime.bigint();
  const requestId = randomUUID();

  response.setHeader("X-Request-Id", requestId);

  response.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;

    logInfo("http_request", {
      requestId,
      method: request.method,
      path: request.originalUrl,
      statusCode: response.statusCode,
      durationMs: Number(durationMs.toFixed(1)),
      ip: request.ip,
      userId: request.user?.id ?? null
    });
  });

  next();
}
