import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import {
  createDailyLogSchema,
  listDailyLogsQuerySchema
} from "./logs.schemas.js";
import { createUserDailyLog, listUserDailyLogs } from "./logs.service.js";

export const createLog = asyncHandler(
  async (request: Request, response: Response) => {
    const input = createDailyLogSchema.parse(request.body);
    const log = await createUserDailyLog(request.user!.id, input);

    return response.status(201).json({
      log
    });
  }
);

export const listLogs = asyncHandler(
  async (request: Request, response: Response) => {
    const query = listDailyLogsQuerySchema.parse(request.query);
    const logs = await listUserDailyLogs(request.user!.id, query);

    return response.status(200).json({
      logs
    });
  }
);
