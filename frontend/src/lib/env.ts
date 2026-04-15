function getRequiredEnv(name: "VITE_API_BASE_URL" | "VITE_SOCKET_URL") {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing required frontend env variable: ${name}`);
  }

  return value;
}

export const frontendEnv = {
  apiBaseUrl: getRequiredEnv("VITE_API_BASE_URL"),
  socketUrl: getRequiredEnv("VITE_SOCKET_URL")
};
