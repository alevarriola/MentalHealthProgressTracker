import type { Request, Response } from "express";
import { env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";

export async function getHealth(_request: Request, response: Response) {
  await prisma.$queryRaw`SELECT 1`;

  return response.status(200).json({
    status: "ok",
    service: "mental-health-progress-tracker-backend",
    port: env.PORT,
    timestamp: new Date().toISOString()
  });
}
