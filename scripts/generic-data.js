/*
 * Purpose: Handles storage of JSON data in a generic way.
 *
 * Exposes:
 * acquireData -- Information from JSON files are stored for future access.
 *
 * data -- The data acquired.
 */

const fs = require("fs").promises;
const path = require("path");

const defaultDataPath = path.join(__dirname, "..", "data");
const data = {};

/*
 * Purpose: Reads in JSON files stored in the given dataPath.
 *
 * Details: The information from each file is interpreted as JSON file and is
 * inserted into data as data[baseFileName]. For example, JSON content from a
 * file `test.json` will be stored as data[test].
 */
async function acquireData(dataPath = defaultDataPath) {
  const dataFiles = (await fs.readdir(dataPath)).map(
    (filename) => new DataFile(path.join(dataPath, filename))
  );

  await Promise.all(
    dataFiles.map(async (dataFile) => {
      try {
        const jsonData = await fs.readFile(dataFile.path, "utf8");
        data[dataFile.basename] = JSON.parse(jsonData);
      } catch (error) {
        console.error(`${dataFile.path}: ${error.message}`);
      }
    })
  );

  /*
   * Purpose: Creates a DataFile object.
   */
  function DataFile(absPath) {
    this.path = absPath;
    this.basename = path.basename(absPath, path.extname(absPath));
  }
}

module.exports = { acquireData, data };
