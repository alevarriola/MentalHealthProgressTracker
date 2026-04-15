import cors from "cors";
import express from "express";
import session from "express-session";
import { env } from "../config/env.js";
import { errorHandler } from "../middleware/error-handler.js";
import { notFoundHandler } from "../middleware/not-found.js";
import { requestLogger } from "../middleware/request-logger.js";
import { enforceTrustedOrigin, securityHeaders } from "../middleware/security.js";
import { passport } from "../modules/auth/auth.passport.js";
import { apiRouter } from "../routes/index.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true
    })
  );
  app.use(securityHeaders);

  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ extended: true, limit: "100kb" }));
  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
      }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(requestLogger);
  app.use(enforceTrustedOrigin);

  app.use("/api", apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
