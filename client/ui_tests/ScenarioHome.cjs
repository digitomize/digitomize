const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');



describe('CanNavigateToLogin', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  after(async function() {
    await driver.quit();
  });

  it('run the login navigation test', async function() {
    await driver.get('http://localhost:5173');
    await driver.manage().window().maximize();

    new Promise(resolve => setTimeout(resolve, 3000));
    await driver.findElement(By.xpath("//a[text()='Login']")).click();

    await new Promise(resolve => setTimeout(resolve, 1000));
    const url =  await driver.getCurrentUrl();
    const expectedUrl = "http://localhost:5173/login";
    await driver.getCurrentUrl(expectedUrl);
    assert.strictEqual(url, expectedUrl, 'Current URL did not match expected');

    await new Promise(resolve => setTimeout(resolve, 1000));
  });

});


// describe('PreviewUserInputtedProfile', function() {
//   let driver;

//   before(async function() {
//     driver = await new Builder().forBrowser(Browser.CHROME).build();
//   });

//   after(async function() {
//     await driver.quit();
//   });

//   it('run the preview test', async function() {
//     await driver.get('http://localhost:5173');
//     await driver.manage().window().maximize();

//     new Promise(resolve => setTimeout(resolve, 3000));
//     const username =  "Ethan";
//     const phone = "1112223333";
//     const usernameField = await driver.findElement(By.xpath("//input[@name='name']"));
//     usernameField.sendKeys(username);

//     new Promise(resolve => setTimeout(resolve, 1000));
//     const phoneField = await driver.findElement(By.xpath("//input[@name='phoneNumber']"));
//     usernameField.sendKeys(username);

//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     ;
//     const previewUsername = await driver.findElement(By.xpath("p[text()='pranshu']"));
//     expect(previewUsername).toBe(username);

//     await new Promise(resolve => setTimeout(resolve, 1000));
//   });

// });

