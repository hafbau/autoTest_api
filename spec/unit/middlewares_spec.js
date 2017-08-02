describe("Tests for /middlewares files", () => {
  beforeEach(() => {
    this.middlewares = require('../../middlewares');
  })

   describe("requiring /middlewares/index", () => {
     it("should return a non null object", () => {

       expect(this.middlewares).not.toBe(null);
       expect(JSON.stringify(this.middlewares)).not.toBe(JSON.stringify({}));
       expect(this.middlewares.toString()).toBe('[object Object]')
       expect(typeof this.middlewares.ensureUser).toBe('function')
      //  expect(typeof this.middlewares.getSiblingFiles).toBe('function')
      //  expect(typeof this.middlewares.getExports).toBe('function')

     })
   });

   describe("Testing ensureUser middleware", () => {

     const userMock = {
       name: { first: 'test_first', last: 'test_last'},
       email: 'test@test.api',
       password: 'test_password'
     }

     describe("Given app context", () => {
     xit("should return logged in status of user", () => {

     })
   })
})
