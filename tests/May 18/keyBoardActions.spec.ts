import{test} from '@playwright/test'

test('keyboardactions', async({page})=>{
    await page.goto('https://gotranscript.com/text-compare')
    await page.fill("[name='text1']",'welcome to automation')

    await page.keyboard.press('Control+A') //combination ~press() //selecting the entire text //more than one key
    await page.keyboard.press('Control+C') //copy the text
    await page.keyboard.down('Tab') //single key //pressing tab
    await page.keyboard.up('Tab') //releasing the tab
    await page.keyboard.press('Control+V')
    await page.waitForTimeout(5000)
    //page.keyboard.press('')

    //await page.keyboard.press('')

    page.keyboard.

})