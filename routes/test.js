/* @params: controller object, and router
** @returns the router, with the routes attached
*/
module.exports = ({ controllers: { test }, middlewares: { ensureUser }, router }) => {
  router
    .post('/tests/saveAndRun', test.saveAndRun)

  return router;
}
