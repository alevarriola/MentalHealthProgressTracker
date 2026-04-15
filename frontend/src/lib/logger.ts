type LogMeta = Record<string, unknown>;

function write(level: "info" | "warn" | "error", message: string, meta?: LogMeta) {
  const payload = {
    scope: "frontend",
    message,
    ...(meta ?? {})
  };

  if (!import.meta.env.DEV && level === "info") {
    return;
  }

  if (level === "error") {
    console.error(payload);
    return;
  }

  if (level === "warn") {
    console.warn(payload);
    return;
  }

  console.info(payload);
}

export function logFrontendInfo(message: string, meta?: LogMeta) {
  write("info", message, meta);
}

export function logFrontendWarn(message: string, meta?: LogMeta) {
  write("warn", message, meta);
}

export function logFrontendError(message: string, meta?: LogMeta) {
  write("error", message, meta);
}
