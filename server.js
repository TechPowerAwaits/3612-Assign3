const express = require("express");
const app = express();

const api = require("./scripts/api.js");
const client = require("./scripts/client.js");

startServer();

/*
 * Purpose: Starts up the core parts of the server.
 */
async function startServer() {
  const apiRouter = express.Router();
  app.use("/api", apiRouter);

  const clientRouter = express.Router();
  app.use("/", clientRouter);

  await api(apiRouter);
  client(clientRouter);

  app.listen(3000);
}
