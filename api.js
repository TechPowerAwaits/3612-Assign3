const express = require("express");
const app = express();
const data = require("./scripts/generic-data.js")(app);

app.listen(3000);