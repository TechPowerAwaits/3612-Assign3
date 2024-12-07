/*
 * Purpose: Provides a F1 Driver API.
 *
 * Exports as:
 * setDataAndRoutes -- Sets up routes to the API using the given router.
 */

const dataHandler = require("./generic-data.js");
const expressData = require("./express-data.js");

/*
 * Purpose: Assigns API data routes to newly acquired data.
 */
async function setDataAndRoutes(router) {
  await dataHandler.acquireData();
  setDataRoutes(dataHandler.data, router);
}

/*
 * Purpose: Sets up all the API data routes.
 */
function setDataRoutes(data, router) {
  for (const dataSrcName in data) {
    router.get(`/${dataSrcName}`, (req, resp) => resp.json(data[dataSrcName]));
  }

  router.get("/teapot", (req, resp) =>
    resp.status(418).json({ teapot: { short: true, stout: true } })
  );

  specificObjDataRoutes(data, router);
  multiObjDataRoutes(data, router);

  router.get("/", (req, resp) => resp.json(data));
}

/*
 * Purpose: Sets up all the API data routes that return a single JSON object.
 */
function specificObjDataRoutes(data, router) {
  expressData.sndData(router, "/circuits/:id", (params) =>
    data["circuits"].find((circuit) => circuit.circuitId == params.id)
  );

  expressData.sndData(router, "/constructors/:ref", (params) =>
    data["constructors"].find(
      (constructor) => constructor.constructorRef == params.ref
    )
  );

  expressData.sndData(router, "/drivers/:ref", (params) =>
    data["drivers"].find((driver) => driver.driverRef == params.ref)
  );

  expressData.sndData(router, "/races/id/:id", (params) =>
    data["races"].find((race) => race.id == params.id)
  );
}

/*
 * Purpose: Sets up all the API data routes that return an array of JSON objects.
 */
function multiObjDataRoutes(data, router) {
  expressData.sndData(router, "/constructorResults/:ref/:year", (params) =>
    data["results"].filter(
      (result) =>
        result.constructor.ref == params.ref && result.race.year == params.year
    )
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

  expressData.sndData(router, "/qualifying/race/:id", (params) =>
    data["qualifying"].filter((qual) => qual.race.id == params.id)
  );

  expressData.sndData(router, "/qualifying/season/:year", (params) =>
    data["qualifying"].filter((qual) => qual.race.year == params.year)
  );

  expressData.sndData(router, "/results/race/:id", (params) =>
    data["results"].filter((result) => result.race.id == params.id)
  );

  expressData.sndData(router, "/results/season/:year", (params) =>
    data["results"].filter((result) => result.race.year == params.year)
  );
}

module.exports = setDataAndRoutes;
