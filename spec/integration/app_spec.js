// Test for a test site

const Browser = require("zombie");
const url = "http://localhost:3002";
const browser = new Browser({ debug: true});
browser.headers = { "user-agent": "Chrome/10.0.613.0", "connection": "keep-alive", "accept-encoding": "identity"}
describe(`testing ${url} with zombie`, function() {

    it("should have defined headless browser", function(next){
      expect(typeof browser != "undefined").toBe(true);
      expect(browser instanceof Browser).toBe(true);
      next();
    });

    it("should visit the site", function(next) {
        browser.visit(url, function(err) {
          expect(browser.success).toBe(true);
          expect(browser.html("body")).toContain("My Stength Book");
          expect(browser.html("body")).toContain("Log In");
          browser.assert.text('title', "MyStrengthBook - Track, Analyze, Train")
          next();
        })
    });

    describe('login', function() {

      beforeEach(function(done) {
        browser
          .fill('email', 'test@tillerdigital.ca')
          .fill('password', 'T!ll3rTEAM')
          .pressButton('Log In', done);
      });

      afterEach(function(done) {
        browser.destroy();
      });

      it('should be successful', function() {
        browser.wait(function () {
          browser.assert.success();
          expect(browser.html("body")).toContain("Calendar");
        });
      });

      xit('should see calendar page', function() {
      });

    });

});
