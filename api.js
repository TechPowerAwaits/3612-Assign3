const express = require("express");
const app = express();

const apiRouter = express.Router();
app.use("/api", apiRouter);

const dataHandler = require("./scripts/generic-data.js");

dataHandler.setDataRoutes(apiRouter);
const data = dataHandler.data;

apiRouter.get("/teapot", (req, resp) => {
  resp.status(418).json({ teapot: { short: true, stout: true } });
});

function sndData(router, routePath, dataFunc) {
  router.get(routePath, (req, resp) => {
    const target = dataFunc(req.params);
    console.log(target);

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

sndData(apiRouter, "/circuits/:id", (params) =>
  data["circuits"].find((circuit) => circuit.circuitId == params.id)
);

sndData(apiRouter, "/constructors/:ref", (params) =>
  data["constructors"].find(
    (constructor) => constructor.constructorRef == params.ref
  )
);

sndData(apiRouter, "/constructorResults/:ref/:year", (params) =>
  data["results"].filter(
    (result) =>
      result.constructor.ref == params.ref && result.race.year == params.year
  )
);

sndData(apiRouter, "/drivers/:ref", (params) =>
  data["drivers"].find((driver) => driver.driverRef == params.ref)
);

sndData(apiRouter, "/driverResults/:ref/:year", (params) =>
  data["results"].filter(
    (result) =>
      result.driver.ref == params.ref && result.race.year == params.year
  )
);

sndData(apiRouter, "/races/season/:year", (params) =>
  data["races"].filter((race) => race.year == params.year)
);

sndData(apiRouter, "/races/id/:id", (params) =>
  data["races"].find((race) => race.id == params.id)
);

sndData(apiRouter, "/results/race/:id", (params) =>
  data["results"].filter((result) => result.race.id == params.id)
);

sndData(apiRouter, "/results/season/:year", (params) =>
  data["results"].filter((result) => result.race.year == params.year)
);

app.listen(3000);
