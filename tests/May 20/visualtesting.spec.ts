import {test, expect} from '@playwright/test';

test('screenshot on page & locator', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("#datepicker").scrollIntoViewIfNeeded();
    await page.locator("#colors").screenshot({path:'locatorLevelSS.png'})
    await page.waitForTimeout(2000)
    await page.fill("#datepicker","10/08/2025")
    await page.screenshot({path: 'pageLevelSS.png'})
    await page.waitForTimeout(2000)
})

test('Visual Testing example 2', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("#datepicker").scrollIntoViewIfNeeded();
    expect(await page.screenshot()).toMatchSnapshot('pageLevelSS.png')
})




//3 workers in config
//two test cases in a file
//going to run this entire file
//  in two browsers
//total 4 tc's to run
//3 -->workers
//1 --> 1 worker fir  --> 
//2 --> 2 worker fir
//3 --> 3 worker web
//4








// test('Visual Testing example 1', async({page})=>{
//     await page.goto("https://www.flightaware.com/live/")
//     expect(await page.screenshot()).toMatchSnapshot('visualmatch.png')
// })

test('Visual Testing - Full Page, Element & Diff Threshold', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/")

    // 1️⃣ Full page snapshot comparison
    await expect(page).toHaveScreenshot('full-page.png', {
        fullPage: true,          // captures entire scrollable page
        maxDiffPixels: 100       // allows up to 100 pixels difference (tolerates minor rendering changes)
    })

    // 2️⃣ Element-level snapshot comparison
    const heading = page.locator('h2.post-title').first()
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toHaveScreenshot('heading-element.png', {
        maxDiffPixelRatio: 0.05  // allows 5% pixel difference ratio
    })

    // 3️⃣ Clip a specific region of the page and compare
    await expect(page).toHaveScreenshot('clipped-region.png', {
        clip: { x: 0, y: 0, width: 800, height: 400 }, // captures only top 800x400 area
        threshold: 0.2           // color difference threshold (0 = strict, 1 = lenient)
    })

    // 4️⃣ Mask dynamic content (e.g. ads/dates) before comparing
    await expect(page).toHaveScreenshot('masked-dynamic.png', {
        fullPage: true,
        mask: [page.locator('.widget')], // masks all widget elements to avoid flakiness
        maxDiffPixels: 50
    })
})