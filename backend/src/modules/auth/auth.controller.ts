import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import { env } from "../../config/env.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { getUserSessionProfile } from "./auth.service.js";

export const startGoogleAuth = passport.authenticate("google", {
  scope: ["profile", "email"]
});

export const handleGoogleCallback = [
  passport.authenticate("google", {
    failureRedirect: `${env.CLIENT_URL}/login?error=oauth_failed`,
    session: true
  }),
  (_request: Request, response: Response) => {
    response.redirect(env.CLIENT_URL);
  }
];

export const getCurrentUser = asyncHandler(
  async (request: Request, response: Response) => {
    const user = await getUserSessionProfile(request.user!.id);

    return response.status(200).json({
      user
    });
  }
);

export const logout = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    await new Promise<void>((resolve, reject) => {
      request.logout((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    request.session.destroy((error) => {
      if (error) {
        next(error);
        return;
      }

      response.clearCookie("connect.sid");
      response.status(204).send();
    });
  }
);
