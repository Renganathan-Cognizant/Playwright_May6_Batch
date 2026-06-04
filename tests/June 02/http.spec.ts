import {test} from '@playwright/test';

test('http',async({browser})=>{
    const context = await browser.newContext({
        httpCredentials:{
            username:'admin',
            password:'admin',
        }
    })
    const page = await context.newPage()
    await page.goto('https://the-internet.herokuapp.com/digest_auth')
    await page.waitForTimeout(5000)
})