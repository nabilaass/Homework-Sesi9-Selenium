require('dotenv').config();

module.exports = {
    browser: process.env.BROWSER || 'chrome',
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    firstName: process.env.FIRST_NAME,
    lastName: process.env.LAST_NAME,
    postalCode: process.env.POSTAL_CODE,
    screenshotDir: './screenshots/'
};
