// var assert = require('assert'),
// test = require('selenium-webdriver/testing'),
// webdriver = require('selenium-webdriver');
//
// test.describe('Google Search', function() {
//   test.before(function() {
//     this.timeout(5000)
//   })
//   test.it('should work', function() {
//     var driver = new webdriver.Builder().
//     withCapabilities(webdriver.Capabilities.chrome()).
//     build();
//   driver.get('http://www.google.com');
//     var searchBox = driver.findElement(webdriver.By.name('q'));
//     searchBox.sendKeys('simple programmer');
//   return searchBox.getAttribute('value').then(function(value) {
//       assert.equal(value, 'simple programmer');
//     });
//     // driver.quit();
//   });
// });
// Test for a test site
const selenium = require("selenium-webdriver");
const By = selenium.By;
const until = selenium.until;
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const url = "http://staging.mystrengthbook.com";

describe(`testing ${url}`, function() {

  before(function() {
    // this.timeout(15000);
    // set up
    this.driver = new selenium.Builder()
    .withCapabilities(selenium.Capabilities.chrome())
    .build();
    // this.driver.manage().timeouts().implicitlyWait(1500000)
    this.driver.getWindowHandle();
    this.driver.get(url);
  })

  after(function() {
    // tear down
    this.driver.quit()
  })

  describe('Login', function() {

    // beforeEach(async function() {
    //   // this.timeout(25000);
    //   // return await this.driver.wait(until.elementLocated(By.css('img.logo')));
    //   // await this.driver.get('http://bites.goodeggs.com/posts/selenium-webdriver-nodejs-tutorial/');
    // })

    it('has the title of app', async function(done) {
      return await this.driver.wait(until.elementLocated(By.css('img.logo')))
        .then(_ => {
          return this.driver.getTitle();
        })
        .then(title => expect(title).to.eventually.contain(
          'MyStrengthBook'
        ))
        .then(done, done);

    })

    xit('has publication date', async function() {
      const text = await this.driver.findElement(By.css('.post .meta time')).getText()
      return await expect(text).to.eventually.equal('December 30th, 2014');
    })

    xit('links back to the homepage', async function() {
      await this.driver.findElement(By.linkText('Bites')).click()
      return await expect(this.driver.getCurrentUrl()).to.eventually.equal('http://bites.goodeggs.com/')
    })

  })

})
