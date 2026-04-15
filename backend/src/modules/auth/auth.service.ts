import type { Profile } from "passport-google-oauth20";
import { AppError } from "../../utils/app-error.js";
import {
  findUserById,
  upsertGoogleUser,
  type AuthUser
} from "./auth.repository.js";

export async function getUserSessionProfile(userId: string): Promise<AuthUser> {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("Authenticated user not found", 401);
  }

  return user;
}

export async function syncGoogleUser(profile: Profile): Promise<AuthUser> {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new AppError("Google account did not provide an email", 400);
  }

  return upsertGoogleUser({
    email,
    displayName: profile.displayName || profile.name?.givenName || null,
    googleId: profile.id,
    avatarUrl: profile.photos?.[0]?.value || null
  });
}
