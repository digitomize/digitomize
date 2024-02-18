const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('http://localhost:5173');
    await driver.manage().window().maximize();
    await driver.findElement(By.xpath("a[@href='/login']")).click();
    await driver.wait(5000);
    const url = driver.getCurrentUrl();
    Assert.assertEquals("http://localhost:5173/login");
    
    //await driver.findElement(By.xpath("//a[@href='/login']")).sendKeys('webdriver', Key.RETURN);
    //await driver.wait(until.titleIs('webdriver - Google Search'), 5000);
  } finally {
    await driver.quit();
  }
})();