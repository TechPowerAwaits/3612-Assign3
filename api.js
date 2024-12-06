const express = require("express");
const app = express();

const apiRouter = express.Router();
app.use("/api", apiRouter);

const dataHandler = require("./scripts/generic-data.js");
const expressData = require("./scripts/express-data.js");

setDataAndRoutes(apiRouter);

app.listen(3000);

async function setDataAndRoutes(router) {
  await dataHandler.acquireData();
  setDataRoutes(dataHandler.data, router);
}

function setDataRoutes(data, router) {
  for (const dataSrcName in data) {
    router.get(`/${dataSrcName}`, (req, resp) => resp.json(data[dataSrcName]));
  }

  router.get("/teapot", (req, resp) =>
    resp.status(418).json({ teapot: { short: true, stout: true } })
  );

  expressData.sndData(router, "/circuits/:id", (params) =>
    data["circuits"].find((circuit) => circuit.circuitId == params.id)
  );

  expressData.sndData(router, "/constructors/:ref", (params) =>
    data["constructors"].find(
      (constructor) => constructor.constructorRef == params.ref
    )
  );

  expressData.sndData(router, "/constructorResults/:ref/:year", (params) =>
    data["results"].filter(
      (result) =>
        result.constructor.ref == params.ref && result.race.year == params.year
    )
  );

  expressData.sndData(router, "/drivers/:ref", (params) =>
    data["drivers"].find((driver) => driver.driverRef == params.ref)
  );

  expressData.sndData(router, "/driverResults/:ref/:year", (params) =>
    data["results"].filter(
      (result) =>
        result.driver.ref == params.ref && result.race.year == params.year
    )
  );

  expressData.sndData(router, "/races/season/:year", (params) =>
    data["races"].filter((race) => race.year == params.year)
  );

  expressData.sndData(router, "/races/id/:id", (params) =>
    data["races"].find((race) => race.id == params.id)
  );

  expressData.sndData(router, "/results/race/:id", (params) =>
    data["results"].filter((result) => result.race.id == params.id)
  );

  expressData.sndData(router, "/results/season/:year", (params) =>
    data["results"].filter((result) => result.race.year == params.year)
  );

  router.get("/", (req, resp) => resp.json(data));
}
