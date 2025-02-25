const { By, Key, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { getDriver } = require("./driverSetup");

describe("SauceDemo UI Tests", function () {
    this.timeout(30000); // Timeout 30 detik untuk semua test

    let driver;
    const browser = process.env.BROWSER || "chrome";
    const headless = process.env.HEADLESS === "true";

    // Hook sebelum semua test
    before(async function () {
        this.timeout(30000); // Tambahkan timeout 30 detik ke before hook
        console.log("Starting WebDriver...");

        try {
            driver = await getDriver(browser, headless);
            console.log("WebDriver started successfully!");
        } catch (error) {
            console.error("Error initializing WebDriver:", error);
            throw error;
        }
    });

    // Hook setelah semua test
    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    // Hook sebelum setiap test
    beforeEach(async function () {
        console.log(`Running test: ${this.currentTest.title}`);
    });

    // Hook setelah setiap test
    afterEach(async function () {
        console.log(`Completed test: ${this.currentTest.title}`);
    });

    // Test Case 1: User success login
    it("1. User success login", async function () {
        await driver.get("https://www.saucedemo.com/");
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver.findElement(By.id("password")).sendKeys("secret_sauce", Key.RETURN);

        await driver.wait(until.elementLocated(By.className("title")), 5000);
        const titleText = await driver.findElement(By.className("title")).getText();
        expect(titleText).to.equal("Products");
    });

    // Test Case 2: Validate user berada di dashboard setelah login
    it("2. Validate user berada di dashboard setelah login", async function () {
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include("inventory.html");
    });

    // Test Case 3: Add item to cart
    it("3. Add item to cart", async function () {
        await driver.findElement(By.className("btn_inventory")).click();
        const cartCount = await driver.findElement(By.className("shopping_cart_badge")).getText();
        expect(cartCount).to.equal("1");
    });

    // Test Case 4: Validate item sukses ditambahkan ke cart
    it("4. Validate item sukses ditambahkan ke cart", async function () {
        await driver.findElement(By.className("shopping_cart_link")).click();
        const cartItem = await driver.findElement(By.className("inventory_item_name")).getText();
        expect(cartItem).to.not.be.empty;
    });
});