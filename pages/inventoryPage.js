const { By, until } = require("selenium-webdriver");

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
        this.addToCartButton = By.className("btn_inventory");
        this.cartBadge = By.className("shopping_cart_badge");
        this.cartButton = By.className("shopping_cart_link");
    }

    async addToCart() {
        await this.driver.wait(until.elementLocated(this.addToCartButton), 5000);
        await this.driver.findElement(this.addToCartButton).click();
    }

    async goToCart() {
        await this.driver.wait(until.elementLocated(this.cartButton), 5000);
        await this.driver.findElement(this.cartButton).click();
    }
}

module.exports = InventoryPage;