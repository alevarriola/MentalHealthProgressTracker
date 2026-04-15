import { createServer } from "node:http";
import { createApp } from "./app/app.js";
import { createSocketServer } from "./app/socket.js";
import { env } from "./config/env.js";

const app = createApp();
const httpServer = createServer(app);

createSocketServer(httpServer);

httpServer.listen(env.PORT, () => {
  console.log(`Backend listening on http://localhost:${env.PORT}`);
});
