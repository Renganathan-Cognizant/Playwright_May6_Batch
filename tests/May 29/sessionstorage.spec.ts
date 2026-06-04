import {test} from '@playwright/test';
//login + save session
test('session storage',async({page})=>{
    //test.setTimeout(60000); // 60 seconds
    await page.goto("https://bookcart.azurewebsites.net/login");
    await page.locator("input[formcontrolname='username']").fill("ortoni");
    await page.locator("input[formcontrolname='password']").fill("Pass1234$");
    await page.locator("//span[@class='mdc-button__label' and text()='Login']").click();

    await page.waitForSelector("//span[@class='mdc-button__label']//span[text()=' ortoni']", {timeout:5000})

    await page.context().storageState({path:'./Login.json'})
})


/**
 * every test:
 * open app
 * enter username and password
 * click on login
 * verify login successful
 * then i will start the actual test
 * 
 * problem: --> slow, repeated login, Flaky OTP/ auth flows, wastes execution time, not suitable for parallel execution
 */




/**
 * Storage state:
 * purpose: save & reuse authentication / session state across tests
 * 
 * Best for: --> Login reuse, Avoid repeated auth, Faster execution
 * 
 * Hooks:
 * run setup/cleanup logic
 * 
 * Best for: --> Navigation, Test data setup, Resource management, cleanup, not suitable for parallel execution
 * precondition: --> Ensure a clean state before each test
 * 
 * custom fixtures:
 * purpose: create reusable components for specific test scenarios
 * --> create reusable dependency injection objects
 * 
 * Best for:
 * --> Page objects
 * --> API clients
 * --> Test data generators
 * --> Mock services
 * --> Resusable setup/teardown logic
 * 
 */