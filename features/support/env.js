import fse from 'fs-extra';
import { setWorldConstructor, BeforeAll, AfterAll, After, setDefaultTimeout, Status } from '@cucumber/cucumber';

import appUrl from '../lib/appUrl.js';
import { Builder } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';


let driver;


class CustomWorld {
  constructor() {
    this.driver = driver;
  }
}

setWorldConstructor(CustomWorld);

After(function(testCase) {
  if (testCase.result.status == Status.FAILED) {
    return this.driver.takeScreenshot().then( screenShot => {
      const filePath = `features/test_reports/${testCase.pickle.name.split(' ').join('_')}.png`;
      fse.outputFile(filePath, screenShot, { encoding: 'base64' }, err => {
        if (err) console.log(err)
        console.log("Screenshot created: ", filePath)
      });
    });
  }
});


BeforeAll(function() {
  driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOption())
  .build();
  driver.manage().setTimeouts({ implicit: 1000 });
  return driver.get(appUrl())
});

function firefoxOption() {
  // GitHub Actions set CI to true
  // Ref: https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables#default-environment-variables
  return process.env.HEADLESS ? new firefox.Options().headless() : new firefox.Options()
}

AfterAll(function() {
  driver.quit();
});

/**
 * Sometimes booting Selenium or Webpack takes a while.
 * This should reduce test failures from that.
 */
setDefaultTimeout(30000);
