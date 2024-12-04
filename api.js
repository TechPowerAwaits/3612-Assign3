const express = require("express");
const app = express();

const api_path = "api";
const data = require("./scripts/generic-data.js")(app, api_path);

app.listen(3000);