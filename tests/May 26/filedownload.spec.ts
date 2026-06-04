import {test} from '@playwright/test';

test("download file event handler",async({page})=>{
    await page.goto ("https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo")


    //await page.type("#textbox","hi")
    await page.locator("#textbox").pressSequentially("Welcome playwright")
    await page.waitForTimeout(2000)

    await page.click('button[id="create"]')
    
    const download = page.waitForEvent('download')
    await page.locator("#link-to-download").click()
    const File = await download

    await File.saveAs("Download File/"+File.suggestedFilename())
})