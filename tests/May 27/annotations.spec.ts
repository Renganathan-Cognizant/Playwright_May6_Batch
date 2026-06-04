import {expect, test} from '@playwright/test';

//all the annotation mentioned at very first

//skip
test('skip annotation', async({page,browserName}) => {

    if(browserName == 'chromium'){
        test.skip();
    }

    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#male').check();
    await expect(page.locator('#male')).toBeChecked();
    //await expect(await page.locator('#male').isChecked()).toBeTruthy(); //true
    await page.waitForTimeout(5000)
    await expect(page.locator('#female')).not.toBeChecked();
})

//fixme - similar to skip
//if we have defects - it wont execute
test('fixme', async({page,browserName}) => {
    test.fixme();
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#male').check();
    await expect(page.locator('#male')).toBeChecked();
    //await expect(await page.locator('#male').isChecked()).toBeTruthy(); //true
    await page.waitForTimeout(5000)
    await expect(page.locator('#female')).not.toBeChecked();
})

//slow - triples the timeout 3*10000 = 30000
test('slow', async({page,browserName}) => {
    test.slow();
    test.setTimeout(10000)
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#male').check();
    await expect(page.locator('#male')).toBeChecked();
})

//fail
test('fail', async({page}) => {
    test.fail();
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#male').scrollIntoViewIfNeeded();
    //await page.locator('#male').check();
    await expect(page.locator('#male')).toBeChecked(); //fails because we have not checked the checkbox
})




