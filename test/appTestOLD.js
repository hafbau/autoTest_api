// Test for a test site
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
// console.log('CHAIASPROMISED', chaiAsPromised)
chai.use(chaiAsPromised);
const expect = chai.expect;
// const should = require('should');

const Browser = require("node-horseman");
const url = "http://staging.mystrengthbook.com";

describe(`testing ${url}`, function() {

    it('should set the user agent', async function(done) {
			const horseman = new Browser({
				timeout: 18000,
			});
			const userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) ' +
					'AppleWebKit/537.36 (KHTML, like Gecko) ' +
					'Chrome/37.0.2062.124 Safari/537.36';
			return await expect(
        await horseman
				.userAgent(userAgent)
				.open(url)
				.evaluate(function() {
					return navigator.userAgent;
				})
        .close()
      ).to.eventually.equal(userAgent);
    });

    it("should visit the site", function() {
      const horseman = new Browser({
				timeout: 8000,
			});

      return expect(
        horseman
        .open(url)
        .title()
        // .plainText()
        // .then(pageText => assert.include(pageText, "Log In"))
        // .close()
      ).to.eventually.equal(200);
    });

    // describe('login', function() {
    //
    //   before(function(done) {
    //     browser
    //       .fill('email', 'test@tillerdigital.ca')
    //       .fill('password', 'T!ll3rTEAM')
    //       .pressButton('Log In', done);
    //   });
    //
    //   after(function(done) {
    //     browser.close();
    //   });
    //
    //   xit('should be successful', function() {
    //     browser.wait(function () {
    //       browser.assert.success();
    //       expect(browser.html("body")).toContain("Calendar");
    //     });
    //   });
    //
    //   xit('should see calendar page', function() {
    //   });
    //
    // });

});
