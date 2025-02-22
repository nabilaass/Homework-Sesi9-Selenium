const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Fungsi delay untuk memperlambat proses
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function saucedemo() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('--ignore-certificate-errors'))
        .build();

    try {
        console.log('Membuka website saucedemo');
        await driver.get('https://www.saucedemo.com/');
        await delay(2000); 

        console.log('Melakukan login');
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await delay(1000);
        await driver.findElement(By.id('password')).sendKeys('secret_sauce', Key.RETURN);
        await driver.wait(until.urlContains('inventory'), 10000);
        console.log('Login berhasil, user diarahkan ke dashboard.');
        await delay(1500); 

        console.log('Validasi dashboard');
        let title = await driver.findElement(By.className('title')).getText();
        if (title === 'Products') {
            console.log('Berhasil masuk ke dashboard.');
        } else {
            console.log('Gagal masuk ke dashboard.');
        }
        await delay(1500); 

        console.log('Menambahkan item ke keranjang');
        await driver.findElement(By.className('btn_inventory')).click();
        await delay(2000);

        console.log('Membuka halaman keranjang');
        await driver.findElement(By.className('shopping_cart_link')).click();
        await delay(2000);
        console.log('Item berhasil ditambahkan ke cart.');

        console.log('Validasi item di keranjang');
        let cartItem = await driver.findElement(By.className('inventory_item_name')).getText();
        if (cartItem) {
            console.log('Item "${cartItem}" ada di cart');
        } else {
            console.log('Item tidak ada di cart.');
        }

    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    } finally {
        console.log('Menutup browser');
        await delay(1500); 
        await driver.quit();
        console.log('Browser berhasil ditutup.');
    }
}

// Jalankan test
saucedemo();