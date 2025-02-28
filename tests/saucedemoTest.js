const { getDriver } = require("../utils/driverSetup");
const config = require("../test-config");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/checkoutPage");
const fs = require("fs");
const { By, until } = require("selenium-webdriver");

// Fungsi delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("SauceDemo Checkout Flow", function () {
    this.timeout(30000);
    let driver, loginPage, inventoryPage, cartPage, checkoutPage;

    before(async function () {
        driver = await getDriver();
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
    });

    after(async function () {
        if (driver) await driver.quit();
    });

    async function takeScreenshot(driver, fileName) {
        let image = await driver.takeScreenshot();
        fs.writeFileSync(`screenshots/${fileName}.png`, image, "base64");
    }
    
    afterEach(async function () {
        let screenshot = await driver.takeScreenshot();
        fs.writeFileSync(`${config.screenshotDir}${this.currentTest.title.replace(/ /g, "_")}.png`, screenshot, 'base64');
    });

    it("1. User successfully logs in", async function () {
        await loginPage.open(); 
        await driver.wait(until.elementLocated(By.id("user-name")), 5000);
        await sleep(2000);
        await loginPage.login("standard_user", "secret_sauce");
        await sleep(2000);
    });

    it("2. User adds an item to the cart", async function () {
        await driver.wait(until.elementLocated(By.className("btn_inventory")), 5000);
        await sleep(2000);
        await inventoryPage.addToCart();
        await sleep(2000);
        await driver.wait(until.elementLocated(By.className("shopping_cart_link")), 5000);
        await sleep(2000);
        await inventoryPage.goToCart();
        await sleep(2000);
    });

    it("3. User proceeds to checkout", async function () {
        await driver.wait(until.elementLocated(By.id("checkout")), 5000);
        await sleep(2000);
        await cartPage.proceedToCheckout();
        await sleep(2000);
    });

    it("4. User fills checkout form and completes purchase", async function () {
        console.log("First Name:", config.firstName);
        console.log("Last Name:", config.lastName);
        console.log("Postal Code:", config.postalCode);
    
        await checkoutPage.fillCheckoutForm(config.firstName, config.lastName, config.postalCode);
        await sleep(2000);
        await checkoutPage.completePurchase();
    });
    
});