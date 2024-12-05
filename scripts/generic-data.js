/*
 * Purpose: Handles distribution of JSON data in a generic way.
 *
 * Exposes:
 * setDataRoutes -- Information from JSON files are stored and routes assigned
 * to them.
 *
 * data -- The data acquired while setting the data routes.
 */

const fs = require("fs").promises;
const path = require("path");

const defaultDataPath = path.join(__dirname, "..", "data");
const data = {};

/*
 * Purpose: Routes paths to data stored in dataPath.
 *
 * Details: The information from each file is interpreted as JSON file and is
 * inserted into data as data[baseFileName]. For example, JSON content from a
 * file `test.json` will be stored as data[test].
 *
 * routePrefix specifies any string that will be appended to the created routes.
 * It must not end nor begin with a slash.
 */
async function setDataRoutes(
  app,
  routePrefix = "",
  dataPath = defaultDataPath
) {
  const dataFiles = (await fs.readdir(dataPath)).map(
    (filename) => new DataFile(path.join(dataPath, filename))
  );

  await Promise.all(
    dataFiles.map(async (dataFile) => {
      try {
        const jsonData = await fs.readFile(dataFile.path, "utf8");
        data[dataFile.basename] = JSON.parse(jsonData);

        app.get(
          `/${routePrefix}${routePrefix ? "/" : ""}${dataFile.basename}`,
          (req, resp) => {
            resp.json(data[dataFile.basename]);
          }
        );
      } catch (error) {
        console.error(`${dataFile.path}: ${error.message}`);
      }
    })
  );

  app.get(`/${routePrefix}`, (req, resp) => {
    resp.json(data);
  });

  /*
   * Purpose: Creates a DataFile object.
   */
  function DataFile(absPath) {
    this.path = absPath;
    this.basename = path.basename(absPath, path.extname(absPath));
  }
}

module.exports = { setDataRoutes, data };
