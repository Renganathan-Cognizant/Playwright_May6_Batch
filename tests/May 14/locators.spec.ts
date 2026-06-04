import {chromium, test} from '@playwright/test';

//test.setTimeout(60000); // Set the timeout for this test to 60 seconds

test('Built-in locators', async({page})=>{
    // //Launches a new chromium browser instance
    // const browser = await chromium.launch();

    // //Creates a new browser context (like a fresh browser profile)
    // const context = await browser.newContext()

    // //opens a new page or tab in the browser
    // const page = await context.newPage();

    //Navigates to the orangeHRM demo login page
    //await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //Fills the username inputfield using its placeholder text
    await page.getByPlaceholder("Username").fill("Admin");

    //await page.pause(); //This will pause the execution and open the Playwright Inspector, allowing you to interact with the page and inspect elements before resuming the test.

    ////Fills the username inputfield using its placeholder text
    await page.getByPlaceholder("Password").fill("admin123");

    //Clicks the login button using its ARIA role and accessible name
    await page.getByRole('button',{name:'Login'}).click();//This will click the button with the role of 'button' and the accessible name 'Login'. The timeout option specifies that Playwright should wait up to 5 seconds for the button to become available before throwing an error.

    //This just wait for 5 secons for next page to gets loaded
    await page.waitForTimeout(5000);

    // page.locator("")

})

test('CSS', async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.locator('[name="username"]').fill("Admin");
    await page.locator('[type="password"]').fill("admin123");
    await page.locator("button").click();
    await page.waitForTimeout(5000)

})

test('xpath',async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.locator("//input[@name='username']").fill("Admin");
    await page.pause();
    await page.locator("//input[@type='password']").fill("admin123");
    await page.locator("//button").click();
    await page.waitForTimeout(5000)

})