describe("Tests for /utils files", () => {
  beforeEach(() => {
    this.utils = require('../../utils');
  })

   describe("requiring /utils/index", () => {
     it("should return a non null object", () => {

       expect(this.utils).not.toBe(null);
       expect(JSON.stringify(this.utils)).not.toBe(JSON.stringify({}));
       expect(this.utils.toString()).toBe('[object Object]')
       expect(typeof this.utils.modelDecorator).toBe('function')
       expect(typeof this.utils.getSiblingFiles).toBe('function')
       expect(typeof this.utils.getExports).toBe('function')

     })
   });

   describe("getExports for other module", () => {
     it("should get exported routes", () => {
      const models = require('../../models');
      const controllers = require('../../controllers')(models);
      const router = require('koa-router')();
      const dir = `${__dirname}/../../routes`;
      const currentFile = "index.js";

      const exportedRoutes = this.utils.getExports({dir, currentFile}, controllers, router)
      expect(exportedRoutes).not.toBe(null);
      expect(JSON.stringify(exportedRoutes)).not.toBe(JSON.stringify({}));
      expect(exportedRoutes.toString()).toBe('[object Object]');

      expect(exportedRoutes.auth).not.toBe(null);
      expect(exportedRoutes.auth.toString()).toBe('[object Object]')
      expect(typeof exportedRoutes.auth).not.toBe('function')
     })
   })
})
