import type { NextFunction, Request, Response } from "express";

export function notFoundHandler(
  request: Request,
  response: Response,
  _next: NextFunction
) {
  return response.status(404).json({
    error: `Route not found: ${request.method} ${request.originalUrl}`
  });
}
