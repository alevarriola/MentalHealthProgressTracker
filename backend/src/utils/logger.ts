type LogLevel = "info" | "warn" | "error";

type LogMeta = Record<string, unknown>;

function serializeError(error: unknown) {
  if (!(error instanceof Error)) {
    return error;
  }

  return {
    name: error.name,
    message: error.message,
    ...(process.env.NODE_ENV !== "production" ? { stack: error.stack } : {})
  };
}

function sanitizeMeta(meta: LogMeta) {
  return Object.fromEntries(
    Object.entries(meta).map(([key, value]) => [
      key,
      key === "error" ? serializeError(value) : value
    ])
  );
}

function writeLog(level: LogLevel, message: string, meta: LogMeta = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...sanitizeMeta(meta)
  };

  const line = JSON.stringify(payload);

  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.info(line);
}

export function logInfo(message: string, meta?: LogMeta) {
  writeLog("info", message, meta);
}

export function logWarn(message: string, meta?: LogMeta) {
  writeLog("warn", message, meta);
}

export function logError(message: string, meta?: LogMeta) {
  writeLog("error", message, meta);
}
