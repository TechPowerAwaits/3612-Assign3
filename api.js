const express = require("express");
const app = express();

const apiRouter = express.Router();
app.use("/api", apiRouter);

setDataAndRoutes(apiRouter);

app.listen(3000);

async function setDataAndRoutes(router) {
  const dataHandler = require("./scripts/generic-data.js");
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

  sndData(router, "/circuits/:id", (params) =>
    data["circuits"].find((circuit) => circuit.circuitId == params.id)
  );

  sndData(router, "/constructors/:ref", (params) =>
    data["constructors"].find(
      (constructor) => constructor.constructorRef == params.ref
    )
  );

  sndData(router, "/constructorResults/:ref/:year", (params) =>
    data["results"].filter(
      (result) =>
        result.constructor.ref == params.ref && result.race.year == params.year
    )
  );

  sndData(router, "/drivers/:ref", (params) =>
    data["drivers"].find((driver) => driver.driverRef == params.ref)
  );

  sndData(router, "/driverResults/:ref/:year", (params) =>
    data["results"].filter(
      (result) =>
        result.driver.ref == params.ref && result.race.year == params.year
    )
  );

  sndData(router, "/races/season/:year", (params) =>
    data["races"].filter((race) => race.year == params.year)
  );

  sndData(router, "/races/id/:id", (params) =>
    data["races"].find((race) => race.id == params.id)
  );

  sndData(router, "/results/race/:id", (params) =>
    data["results"].filter((result) => result.race.id == params.id)
  );

  sndData(router, "/results/season/:year", (params) =>
    data["results"].filter((result) => result.race.year == params.year)
  );

  router.get("/", (req, resp) => {
    resp.json(data);
  });
}

function sndData(router, routePath, dataFunc) {
  router.get(routePath, (req, resp) => {
    const target = dataFunc(req.params);

    if (
      (target instanceof Array && target.length > 0) ||
      (!(target instanceof Array) && target)
    ) {
      resp.json(target);
    } else {
      declareNotFound(resp);
    }
  });

  function declareNotFound(resp) {
    resp
      .status(404)
      .json({ error: { message: "Requested resource cannot be found." } });
  }
}
