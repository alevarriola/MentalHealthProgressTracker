import { Router } from "express";
import {
  getCurrentUser,
  handleGoogleCallback,
  logout,
  startGoogleAuth
} from "./auth.controller.js";
import { requireAuth } from "./auth.middleware.js";

export const authRouter = Router();

authRouter.get("/google", startGoogleAuth);
authRouter.get("/google/callback", ...handleGoogleCallback);
authRouter.get("/me", requireAuth, getCurrentUser);
authRouter.post("/logout", requireAuth, logout);
