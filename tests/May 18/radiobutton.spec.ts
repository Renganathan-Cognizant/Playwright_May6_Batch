import {expect, test} from '@playwright/test';

test('radiobutton', async({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#male').check();
    await expect(page.locator('#male')).toBeChecked(); //expect(actual). expected condition
    //await expect(await page.locator('#male').isChecked()).toBeTruthy(); //true
    await page.waitForTimeout(5000)
    await expect(page.locator('#female')).not.toBeChecked();


})

//Assignment
//Write for female radio button