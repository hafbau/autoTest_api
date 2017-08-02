/* @params: controller object, middlewares and router
** @returns the router, with the routes attached
*/
module.exports = ({ controllers: { root }, router }) => {
  router
    .get('/', root.getRoot)

    return router;
}
