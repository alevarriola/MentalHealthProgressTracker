import { createServer } from "node:http";
import { createApp } from "./app/app.js";
import { createSocketServer } from "./app/socket.js";
import { env } from "./config/env.js";
import { logInfo } from "./utils/logger.js";

const app = createApp();
const httpServer = createServer(app);

createSocketServer(httpServer);

httpServer.listen(env.PORT, () => {
  logInfo("server_started", {
    port: env.PORT,
    clientUrl: env.CLIENT_URL
  });
});
