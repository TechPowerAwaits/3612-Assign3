const path = require("path");
const express = require("express");
const app = express();
const clientPath = path.join(__dirname, "client");

app.use(express.static(clientPath));
startServer();

/*
 * Purpose: Starts up the core parts of the server.
 */
async function startServer() {
  const apiRouter = express.Router();
  app.use("/api", apiRouter);
  await require("./scripts/api.js")(apiRouter);
  app.get("/", (req, resp) => resp.send(path.join(clientPath, "index.html")));
  app.listen(3000);
}
