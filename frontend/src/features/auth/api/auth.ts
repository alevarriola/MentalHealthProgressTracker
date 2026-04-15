import { ApiError, apiRequest } from "../../../lib/api";
import type { AuthUser } from "../types";

export async function fetchCurrentUser() {
  try {
    return await apiRequest<{ user: AuthUser }>("/auth/me");
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }

    throw error;
  }
}

export async function logoutUser() {
  return apiRequest<void>("/auth/logout", {
    method: "POST"
  });
}
