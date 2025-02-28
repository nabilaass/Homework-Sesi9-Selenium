const { Builder } = require("selenium-webdriver");
const config = require("../test-config");

async function getDriver(browser = config.browser, headless = config.headless) {
    console.log(`Starting WebDriver for: ${browser}, Headless: ${headless}`);

    let options;
    if (browser === "chrome") {
        const { Options } = require("selenium-webdriver/chrome");
        options = new Options();
        if (headless) options.headless();
    } else if (browser === "firefox") {
        const { Options } = require("selenium-webdriver/firefox");
        options = new Options();
        if (headless) options.headless();
    } else {
        throw new Error("Unsupported browser: " + browser);
    }

    return new Builder().forBrowser(browser).setChromeOptions(options).build();
}

module.exports = { getDriver };
