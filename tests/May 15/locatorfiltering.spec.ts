import {chromium, test} from '@playwright/test';

test('Locator-Filtering', async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator('[name="username"]').fill("Admin");
    await page.locator('[type="password"]').fill("admin123");
    await page.locator("button").click();
    
    //filter by text
    await page.getByRole('listitem').filter({hasText:'Leave'}).click();

    // //filtering with nth()
    await page.getByRole('listitem').nth(2).click();

    //await page.waitForTimeout(10000)

    await page.pause()

    // filter by child/descendant
    await page.getByRole('listitem').filter({has:page.getByRole('link',{name:'Leave'})}).click();
})



//assignment
//https://www.saucedemo.com/





/*
p 1
p 2 - out of stock
p 3
p 4 - out of stock

*/ 