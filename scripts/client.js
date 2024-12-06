/*
 * Purpose: To serve a Formula One webpage.
 *
 * Export is:
 * serve -- Sets up the webpage using the given router.
 */

const express = require("express");

const path = require("path");
const clientPath = path.join(__dirname, "..", "client");

function serve(router) {
  router.use(express.static(clientPath));
  router.get("/", (req, resp) =>
    resp.send(path.join(clientPath, "index.html"))
  );
}

module.exports = serve;
