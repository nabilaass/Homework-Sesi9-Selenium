const { By, until } = require("selenium-webdriver");

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.checkoutButton = By.id("checkout");
    }

    async proceedToCheckout() {
        await this.driver.wait(until.elementLocated(this.checkoutButton), 5000);
        await this.driver.findElement(this.checkoutButton).click();
    }
}

module.exports = CartPage;
