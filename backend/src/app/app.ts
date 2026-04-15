import cors from "cors";
import express from "express";
import session from "express-session";
import { env } from "../config/env.js";
import { errorHandler } from "../middleware/error-handler.js";
import { notFoundHandler } from "../middleware/not-found.js";
import { apiRouter } from "../routes/index.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false
      }
    })
  );

  app.use("/api", apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
