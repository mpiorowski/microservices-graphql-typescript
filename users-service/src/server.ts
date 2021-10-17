console.log("users service says hi");

import { FastifyReply, FastifyRequest } from "fastify";
import userSessionsRoutes from "./user-sessions";
import usersRoutes from "./users";

require("dotenv").config();
export const CONFIG = {
  PORT: process.env["PORT"],
};

// fastify setup
const app = require("fastify")({ logger: true });
app.register(require("fastify-cors"), {
  credentials: true,
});

// app.addHook(
//   "onSend",
//   function (_req: FastifyRequest, _reply: FastifyReply, payload: any) {
//     app.log.info({ body: payload }, "parsed body");
//   }
// );

// error handler
app.setErrorHandler(function (
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  // Log error
  app.log.error(error);
  // Send error response
  reply.status(409).send(error);
});

// Declare routes
usersRoutes(app);
userSessionsRoutes(app);

// Run the app!
const start = async () => {
  try {
    await app.listen(CONFIG.PORT, "0.0.0.0");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
