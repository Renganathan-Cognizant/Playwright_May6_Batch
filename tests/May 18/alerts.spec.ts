import{expect,test} from '@playwright/test';

test('simple alert', async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')
    //handling popup


    //event listener syntax page.on() ---> page.on('event name', callback function)
    page.on('dialog', async(dialog) => {
        console.log(dialog.type()) //alert
        console.log(dialog.message()) //I am an alert box!
        await dialog.accept(); //to click on ok button of the alert 
        
    })
    //CONDITION: in playwright before clicking any prompt we need to handle that event 

    await page.click("button:has-text('Simple Alert')")
    
})

//explore "page.once()" & which is a good option to use


test('confirmation alert', async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')

    page.on('dialog', async(dialog) => {
        console.log(dialog.type()) //confirmation
        console.log(dialog.message()) // Press a button!
        expect(dialog.message()).toContain('Press a button!') //expect().toContain() is used to check if the message contains a specific text or not
        await dialog.dismiss();
        //await dialog.accept();
    })
    
    await page.click("button:has-text('Confirmation Alert')") //
    await page.waitForTimeout(10000)
    //await expect(page.locator('//p[@id="demo"]')).toHaveText('You pressed OK!');
})

// test('prompt alert', async({page})=>{

//     await page.goto('https://testautomationpractice.blogspot.com/')

//     page.on('dialog', async(dialog) => {
//         console.log(dialog.type())
//         console.log(dialog.message())
//         await page.waitForTimeout(3000)
//         console.log(dialog.defaultValue())//to get the default value availble in the input box of an alert
//         //
//         //await dialog.dismiss();

//         await dialog.accept("playwright is evolving faster");
        
//         await page.waitForTimeout(3000)
//     })
    
//     await page.click("button:has-text('Prompt Alert')")
//     await page.waitForTimeout(3000)
// })

//Assignment
//confirmation alert & Prompt alert
//page.once








/*
case1
 page.on('dialog', async(dialog) => {
     await dialog.accept();
 })

 await page.click("button:has-text('Confirmation Alert')")

"if dialog comes --> handle it"
if not do nothing

case2
const dialog = await page.waitForEvent('dialog')

//throw toimeout error




 */






*/