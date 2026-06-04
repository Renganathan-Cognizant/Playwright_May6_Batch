import {expect, test} from '@playwright/test';

test('radiobutton', async({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#male').check();
    await expect(page.locator('#male')).toBeChecked(); //expect(actual). expected condition
    //await expect(await page.locator('#male').isChecked()).toBeTruthy(); //true
    await page.waitForTimeout(5000)
    await expect(page.locator('#female')).not.toBeChecked();


})

test('checkbox', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    //await page.check('[value="sunday"]') //check the sunday checkbox
    expect (page.locator('[value="sunday"]')).toBeChecked();
    await page.waitForTimeout(5000)
    await page.uncheck('[value="sunday"]')
    expect (page.locator('[value="monday"]')).not.toBeChecked();
    await page.waitForTimeout(5000)
})