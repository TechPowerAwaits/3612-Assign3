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

apiRouter.get("/circuits/:id", (req, resp) => {
  const targetCircuit = data["circuits"].find(
    (circuit) => circuit.circuitId == req.params.id
  );

  if (targetCircuit) {
    resp.json(targetCircuit);
  } else {
    declareNotFound(resp);
  }
});

apiRouter.get("/constructors/:ref", (req, resp) => {
  const targetConstructor = data["constructors"].find(
    (constructor) => constructor.constructorRef == req.params.ref
  );

  if (targetConstructor) {
    resp.json(targetConstructor);
  } else {
    declareNotFound(resp);
  }
});

apiRouter.get("/constructorResults/:ref/:year", (req, resp) => {
  const targetResults = data["results"].filter(
    (result) =>
      result.constructor.ref == req.params.ref &&
      result.race.year == req.params.year
  );

  if (targetResults) {
    resp.json(targetResults);
  } else {
    declareNotFound(resp);
  }
});

apiRouter.get("/drivers/:ref", (req, resp) => {
  const targetDriver = data["drivers"].find(
    (driver) => driver.driverRef == req.params.ref
  );

  if (targetDriver) {
    resp.json(targetDriver);
  } else {
    declareNotFound(resp);
  }
});

apiRouter.get("/driverResults/:ref/:year", (req, resp) => {
  const targetResults = data["results"].filter(
    (result) =>
      result.driver.ref == req.params.ref && result.race.year == req.params.year
  );

  if (targetResults) {
    resp.json(targetResults);
  } else {
    declareNotFound(resp);
  }
});

apiRouter.get("/races/season/:year", (req, resp) => {
  const targetRaces = data["races"].filter(
    (race) => race.year == req.params.year
  );

  if (targetRaces) {
    resp.json(targetRaces);
  } else {
    declareNotFound(resp);
  }
});

apiRouter.get("/races/id/:id", (req, resp) => {
  const targetRace = data["races"].find((race) => race.id == req.params.id);

  if (targetRace) {
    resp.json(targetRace);
  } else {
    declareNotFound(resp);
  }
});

apiRouter.get("/results/race/:id", (req, resp) => {
  const targetResults = data["results"].filter(
    (result) => result.race.id == req.params.id
  );

  if (targetResults) {
    resp.json(targetResults);
  } else {
    declareNotFound(resp);
  }
});

apiRouter.get("/results/season/:year", (req, resp) => {
  const targetResults = data["results"].filter(
    (result) => result.race.year == req.params.year
  );

  if (targetResults) {
    resp.json(targetResults);
  } else {
    declareNotFound(resp);
  }
});

function declareNotFound(resp) {
  resp
    .status(404)
    .json({ error: { message: "Requested resource cannot be found." } });
}

app.listen(3000);
