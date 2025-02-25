const { Builder } = require("selenium-webdriver");

async function getDriver(browser = "chrome", headless = false) {
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
    } else if (browser === "edge") {
        const { Options } = require("selenium-webdriver/edge");
        options = new Options();
        if (headless) options.headless();
    } else {
        throw new Error("Unsupported browser: " + browser);
    }

    try {
        const driver = await new Builder()
            .forBrowser(browser)
            .setChromeOptions(options)
            .build();
        console.log("WebDriver started successfully!");
        return driver;
    } catch (error) {
        console.error("Error starting WebDriver:", error);
        throw error;
    }
}

module.exports = { getDriver };