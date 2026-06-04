import {test,chromium, expect} from '@playwright/test';

test('New page', async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const page1 = await context.newPage();

    const page2 = await context.newPage();


    //reference for getting no of pages
    const totalpage=context.pages();
    // console.log(totalpage) //array of pages
    console.log(totalpage.length)//number of pages active

    await page1.goto('https://testautomationpractice.blogspot.com/')

    await expect(page1).toHaveTitle('Automation Testing Practice')
    //await expect(page1).to

    await page2.goto('https://ui.vision/demo/webtest/frames')

    await page1.bringToFront()
    await page1.waitForTimeout(5000)

    await page2.bringToFront()
    //await page2.waitForTimeout(5000)
})

test('multitab - context', async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //listener
    const pagepromise = context.waitForEvent('page'); //waits for a new page 
    // to open and returns a promise that resolves to the new page object when the event occurs.

    await page.getByText('OrangeHRM, INC').click(); //clicking on the link will open a new page

    const newpage = await pagepromise//waits for the promise to resolve and 
    // assigns the new page object to the variable newpage


    expect(newpage).toHaveTitle("Human Resources Management Software | HRMS | OrangeHRM")
    await newpage.getByRole('button',{name:'Allow All'}).click();
    await newpage.getByPlaceholder('Your email address').fill("HI")
    await newpage.waitForTimeout(3000)

})

test('multitab - promise', async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //Runs multiple asynchronous operations in parallel and waits for all of them to complete.
    //Destructures the result of Promise.all

    //promise.all()

    const [multipage] = await Promise.all([ //waits for a new page to open and clicks on the link in parallel
        context.waitForEvent('page'),
        await page.getByText('OrangeHRM, INC').click() //clicking on the link will open a new page and wait for 
        // the page event to occur, which indicates that a new page has been opened. 
        // The result of the Promise.all is an array containing the new page object, 
        // which is destructured to assign it to the variable multipage.
    ])

    console.log("multipage: " + multipage) //[object object] - page object
    await multipage.waitForLoadState(); //waits for the page to load completely
    await multipage.getByRole('button',{name:'Allow All'}).click();

    //to find the number of pages openend
    const totalpage = multipage.context().pages() //active tabs
    console.log("totalpage: " + totalpage) // [object object],[object object] - array of page objects
    console.log("total page length: "+totalpage.length) //2

    //to get the url of the open pages
    totalpage.forEach((url)=>{
        console.log("URL of active pages: " +url.url())
    })

    //to access element in the webpage
        let webpage;

        for(let i=0;i< await totalpage.length; i++){

            const title = await totalpage[i].title()
            if (title == "Human Resources Management Software | HRMS | OrangeHRM")
            {
                webpage = totalpage[i]
            }
        }
        await webpage.getByPlaceholder("Your email address").fill("HI Batch")
        await webpage.waitForTimeout(2000)
})





//Assignment
//session handson - 29/05/2026
/**
 * open the orangehrm website
 * click on the orangehrm, inc link
 * validate the title of the new page or print the page URL
 * in the email input field enter "test@testmail.com"
 *
 */