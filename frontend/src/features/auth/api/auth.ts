import { apiRequest } from "../../../lib/api";
import type { AuthUser } from "../types";

export async function fetchCurrentUser() {
  return apiRequest<{ user: AuthUser }>("/auth/me");
}

export async function logoutUser() {
  return apiRequest<void>("/auth/logout", {
    method: "POST"
  });
}
