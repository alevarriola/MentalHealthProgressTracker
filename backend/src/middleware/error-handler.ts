import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error.js";
import { logError, logWarn } from "../utils/logger.js";

export function errorHandler(
  error: unknown,
  request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    logWarn("validation_failed", {
      method: request.method,
      path: request.originalUrl,
      userId: request.user?.id ?? null,
      details: error.flatten()
    });

    return response.status(400).json({
      error: "Validation failed",
      details: error.flatten()
    });
  }

  if (error instanceof AppError) {
    logWarn("application_error", {
      method: request.method,
      path: request.originalUrl,
      statusCode: error.statusCode,
      userId: request.user?.id ?? null,
      error: {
        name: error.name,
        message: error.message
      }
    });

    return response.status(error.statusCode).json({
      error: error.message
    });
  }

  logError("unhandled_error", {
    method: request.method,
    path: request.originalUrl,
    userId: request.user?.id ?? null,
    error
  });

  return response.status(500).json({
    error: "Internal server error"
  });
}
