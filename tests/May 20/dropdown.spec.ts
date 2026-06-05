import {test} from '@playwright/test'

test("static dropdown", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    await page.locator("#country").selectOption({label:'India'}); //label with visible text

    await page.locator("#country").selectOption('India'); //visible text

    await page.locator("#country").selectOption('india'); //by default -value attr

    await page.locator('#country').selectOption({value:'india'});

    await page.locator("#country").selectOption({index:9})// indexing starts from 0

    await page.selectOption("#country", "India")
    await page.waitForTimeout(5000)

})

test("multi dropdown", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("#colors").scrollIntoViewIfNeeded();
    await page.selectOption("#colors", ["Blue","Red"])
    await page.waitForTimeout(5000)
})


//hidden dropdown - completed

























// test("hidden dropdown", async({page})=>{
//     await page.goto("https://opensource-demo.orangehrmlive.com/")
//     await page.locator('[name="username"]').fill("Admin");
//     await page.locator('[type="password"]').fill("admin123");
//     await page.locator("button").click();

//     await page.getByRole('listitem').filter({hasText:'PIM'}).click();
    
//     await page.locator("//label[text()='Job Title']//following::div[@class='oxd-select-text--after'][1]").click();
//     const values = await page.$$('[role="listbox"] >div>span') //page.locator() /page.$ //array //
//     for(let val of values){
//         const option = await val.textContent();
//         if(option=='Chief Financial Officer'){
//             await val.click();
//             break;
//         }
//     }
//     await page.waitForTimeout(5000)

// })

//setTimeout(()=> {debugger;},5000)
//assignment - Auto Suggestion dropdown