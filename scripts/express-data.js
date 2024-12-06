/*
 * Purpose: Handles the sending of JSON data using Express JS.
 *
 * Exposes:
 * notFoundHandler -- Handles when a searched for item has not been found. Can be overwritten.
 *
 * sndData -- Handles sending requested data when a specific router path has been accessed.
 */

/*
 * Purpose: Outputs JSON content indicating that a resource could not be found.
 *
 * Details: resp should be a Express JS HTTP Response Object.
 */
let notFoundHandler = (resp) =>
  resp
    .status(404)
    .json({ error: { message: "Requested resource cannot be found." } });

/*
 * Purpose: Sends the data retrieved by dataFunc when a get request is made to
 * the given router at the given path.
 *
 * Details: The dataFunc receives a params object containing property names
 * corresponding to the received parameters.
 *
 * If the dataFunc returns an empty array or a falsy value, the notFoundHandler
 * will be triggered.
 */
function sndData(router, routePath, dataFunc) {
  router.get(routePath, (req, resp) => {
    const target = dataFunc(req.params);

    if (
      (target instanceof Array && target.length > 0) ||
      (!(target instanceof Array) && target)
    ) {
      resp.json(target);
    } else {
      notFoundHandler(resp);
    }
  });
}

module.exports = { notFoundHandler, sndData };
