import {test} from '@playwright/test';

test("shadow DOM", async ({page}) => {

    await page.goto ('https://books-pwakit.appspot.com/')
    await page.locator('#input').fill('testing books')
})