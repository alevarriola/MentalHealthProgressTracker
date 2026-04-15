import { Router } from "express";
import { requireAuth } from "../auth/auth.middleware.js";
import { createLog, listLogs } from "./logs.controller.js";

export const logsRouter = Router();

logsRouter.post("/log", requireAuth, createLog);
logsRouter.get("/logs", requireAuth, listLogs);
