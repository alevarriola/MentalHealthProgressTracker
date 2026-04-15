import { frontendEnv } from "./env";
import { logFrontendError, logFrontendInfo } from "./logger";

export const apiBaseUrl = frontendEnv.apiBaseUrl;

export const socketUrl = frontendEnv.socketUrl;

type JsonBody =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | string
  | number
  | boolean
  | null;

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | JsonBody | null;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;
  const method = rest.method ?? "GET";
  const isJsonBody =
    body !== null &&
    body !== undefined &&
    typeof body === "object" &&
    !ArrayBuffer.isView(body) &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer);

  const response = await fetch(`${apiBaseUrl}${path}`, {
    credentials: "include",
    headers: {
      ...(isJsonBody ? { "Content-Type": "application/json" } : {}),
      ...headers
    },
    body: isJsonBody ? JSON.stringify(body) : (body as BodyInit | null | undefined),
    ...rest
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorPayload = (await response.json()) as { error?: string };

      if (errorPayload.error) {
        message = errorPayload.error;
      }
    } catch {
      // Ignore non-JSON error bodies and fall back to a generic message.
    }

    logFrontendError("api_request_failed", {
      method,
      path,
      statusCode: response.status
    });

    throw new ApiError(message, response.status);
  }

  logFrontendInfo("api_request_succeeded", {
    method,
    path,
    statusCode: response.status
  });

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
