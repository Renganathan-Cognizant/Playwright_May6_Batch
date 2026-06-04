import{expect,test} from '@playwright/test';

test('checkbox', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    //clicking of single checkbox
    //.fill(locator, "string")
    //page.locator().check()
    await page.check('[value="sunday"]') //check the sunday checkbox
    expect (page.locator('[value="sunday"]')).toBeChecked();
    await page.waitForTimeout(5000)
    await page.uncheck('[value="sunday"]')
    expect (page.locator('[value="monday"]')).not.toBeChecked();
    await page.waitForTimeout(5000)
})

//what if i need to check on multiple checkboxes
//achieving that by loops

test('multiple checkboxes', async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    const checkbox = ['[value="sunday"]',"//input[@id='monday' and @type='checkbox']"]
    
    for (const local of checkbox){
        await page.locator(local).check();
        //console.log
    }
    await page.waitForTimeout(5000)

    //to uncheck multiple check box

    for (const locator of checkbox){
        if(await page.locator(locator).isChecked()){
            await page.locator(locator).uncheck();
        }
    }
    await page.waitForTimeout(5000)
})