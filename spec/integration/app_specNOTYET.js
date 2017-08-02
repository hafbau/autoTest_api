const Browser = require("zombie");
const url = "http://localhost:3000";
const browser = new Browser();

describe("testing with zombie", function() {

    it("should have defined headless browser", function(next){
      expect(typeof browser != "undefined").toBe(true);
      expect(browser instanceof Browser).toBe(true);
      next();
    });

    it("should visit the site", function(next) {
        browser.visit(url, function(err) {
          expect(browser.success).toBe(true);
          expect(browser.html("body")).toContain("Login Page");
          next();
        })
    });

});
