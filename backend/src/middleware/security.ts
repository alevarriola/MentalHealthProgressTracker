import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { logWarn } from "../utils/logger.js";

const mutatingMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function securityHeaders(
  _request: Request,
  response: Response,
  next: NextFunction
) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  next();
}

export function enforceTrustedOrigin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!mutatingMethods.has(request.method)) {
    next();
    return;
  }

  const origin = request.get("origin");

  if (!origin) {
    next();
    return;
  }

  if (origin !== env.CLIENT_URL) {
    logWarn("blocked_request_origin", {
      method: request.method,
      path: request.originalUrl,
      origin
    });

    response.status(403).json({
      error: "Origin not allowed"
    });
    return;
  }

  next();
}
