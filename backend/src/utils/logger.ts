type LogLevel = "info" | "warn" | "error";

type LogMeta = Record<string, unknown>;

const isProduction = process.env.NODE_ENV === "production";

const ansi = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m"
};

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

function colorize(color: string, value: string) {
  return `${color}${value}${ansi.reset}`;
}

function formatTime() {
  return new Date().toLocaleTimeString("en-GB", {
    hour12: false
  });
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}

function shortenId(value: unknown, maxLength = 8) {
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }

  return truncate(value, maxLength);
}

function compactPath(path: unknown) {
  if (typeof path !== "string" || path.length === 0) {
    return "/";
  }

  const [pathname, queryString] = path.split("?");
  const safePathname = pathname ?? "/";

  if (!queryString) {
    return safePathname;
  }

  return `${safePathname}?…`;
}

function getLevelLabel(level: LogLevel) {
  if (level === "error") {
    return colorize(ansi.red, "ERROR");
  }

  if (level === "warn") {
    return colorize(ansi.yellow, "WARN ");
  }

  return colorize(ansi.cyan, "INFO ");
}

function getStatusColor(statusCode: unknown) {
  if (typeof statusCode !== "number") {
    return ansi.gray;
  }

  if (statusCode >= 500) {
    return ansi.red;
  }

  if (statusCode >= 400) {
    return ansi.yellow;
  }

  if (statusCode >= 300) {
    return ansi.blue;
  }

  return ansi.green;
}

function formatKeyValue(key: string, value: unknown) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value === "object") {
    return `${key}=${JSON.stringify(value)}`;
  }

  return `${key}=${String(value)}`;
}

function formatHttpRequest(meta: LogMeta, level: LogLevel) {
  const method = String(meta.method ?? "GET").padEnd(6, " ");
  const path = truncate(compactPath(meta.path), 58).padEnd(58, " ");
  const statusCode = typeof meta.statusCode === "number" ? meta.statusCode : 0;
  const durationMs =
    typeof meta.durationMs === "number" ? `${meta.durationMs.toFixed(1)}ms` : "";
  const userId = shortenId(meta.userId);
  const requestId = shortenId(meta.requestId, 6);

  const extras = [
    durationMs ? colorize(ansi.dim, durationMs) : null,
    userId ? colorize(ansi.gray, `user=${userId}`) : null,
    requestId ? colorize(ansi.gray, `req=${requestId}`) : null
  ]
    .filter(Boolean)
    .join("  ");

  return [
    colorize(ansi.dim, `[${formatTime()}]`),
    getLevelLabel(level),
    colorize(ansi.bold, method),
    path,
    colorize(getStatusColor(statusCode), String(statusCode).padStart(3, " ")),
    extras
  ]
    .filter(Boolean)
    .join(" ");
}

function formatNamedEvent(message: string, level: LogLevel, meta: LogMeta) {
  const base = [
    colorize(ansi.dim, `[${formatTime()}]`),
    getLevelLabel(level)
  ];

  if (message === "server_started") {
    return [
      ...base,
      colorize(ansi.bold, "SERVER"),
      "started",
      colorize(ansi.gray, `port=${String(meta.port ?? "")}`),
      meta.clientUrl ? colorize(ansi.gray, `client=${String(meta.clientUrl)}`) : null
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (message === "socket_connected") {
    return [
      ...base,
      colorize(ansi.magenta, "WS"),
      "connected",
      colorize(ansi.gray, `socket=${shortenId(meta.socketId, 12)}`)
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (message === "socket_disconnected") {
    return [
      ...base,
      colorize(ansi.magenta, "WS"),
      "disconnected",
      colorize(ansi.gray, `socket=${shortenId(meta.socketId, 12)}`),
      meta.reason ? colorize(ansi.gray, `reason=${String(meta.reason)}`) : null
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (message === "dashboard_update_emitted") {
    return [
      ...base,
      colorize(ansi.magenta, "WS"),
      "dashboard:updated emitted"
    ].join(" ");
  }

  if (
    message === "validation_failed" ||
    message === "application_error" ||
    message === "unhandled_error"
  ) {
    return [
      ...base,
      colorize(ansi.bold, truncate(message, 26).replaceAll("_", " ")),
      meta.method ? colorize(ansi.gray, String(meta.method)) : null,
      meta.path ? truncate(compactPath(meta.path), 48) : null,
      meta.statusCode ? colorize(ansi.gray, `status=${String(meta.statusCode)}`) : null,
      meta.userId ? colorize(ansi.gray, `user=${shortenId(meta.userId)}`) : null
    ]
      .filter(Boolean)
      .join(" ");
  }

  return null;
}

function formatDevLine(level: LogLevel, message: string, meta: LogMeta) {
  if (message === "http_request") {
    return formatHttpRequest(meta, level);
  }

  const namedEvent = formatNamedEvent(message, level, meta);

  if (namedEvent) {
    return namedEvent;
  }

  const extras = Object.entries(meta)
    .map(([key, value]) => formatKeyValue(key, value))
    .filter(Boolean)
    .join("  ");

  return [
    colorize(ansi.dim, `[${formatTime()}]`),
    getLevelLabel(level),
    colorize(ansi.bold, message.replaceAll("_", " ")),
    extras
  ]
    .filter(Boolean)
    .join(" ");
}

function writeLog(level: LogLevel, message: string, meta: LogMeta = {}) {
  const sanitizedMeta = sanitizeMeta(meta);

  if (!isProduction) {
    const line = formatDevLine(level, message, sanitizedMeta);

    if (level === "error") {
      console.error(line);
    } else if (level === "warn") {
      console.warn(line);
    } else {
      console.info(line);
    }

    if (
      sanitizedMeta.error &&
      typeof sanitizedMeta.error === "object" &&
      sanitizedMeta.error !== null &&
      "stack" in sanitizedMeta.error
    ) {
      console.error(colorize(ansi.gray, String(sanitizedMeta.error.stack ?? "")));
    }

    return;
  }

  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...sanitizedMeta
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
