import {test,chromium,devices} from '@playwright/test';

//inside a test case
test('device emulation', async()=>{
    const mobile = devices['iPhone SE'] //mobile instance
    const browser = await chromium.launch();
    const context = await browser.newContext({...mobile});
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.waitForTimeout(3000)
})



test.use({...devices['iPhone 12']})

test('device emulation 2', async({page})=>{
   
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.waitForTimeout(5000)

})
