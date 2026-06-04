import {test} from '@playwright/test';
//reuse the session storage
//load storage state from the file and map it to the test
test.use({storageState:'./login.json'}) //maping the session storage



test('storage state',async({page})=>{
    test.setTimeout(60000); // 60 seconds
    await page.goto('https://bookcart.azurewebsites.net/')
    await page.waitForSelector("//span[@class='mdc-button__label']//span[text()=' ortoni']", {timeout:5000})
    await page.waitForTimeout(5000)
})