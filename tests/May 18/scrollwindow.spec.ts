import {test, expect } from "@playwright/test";

test ("scrollingwindow", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")

    //approach1

    await page.evaluate(()=>{
        window.scrollBy(0,80)//vertically
        window.scrollBy(2,0)//
        //window.
    })

    //approach2
    //page.locator().scrollIntoViewIfNeeded() - this method will scroll the page until the element is visible in the viewport. It will only scroll if the element is not already visible, and it will ensure that the element is fully visible after scrolling.
    const ele=page.locator('#country')
    ele.scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000)

    //approach3 - bounding box
    //console.log(page.locator().boundingBox()) - this method returns the bounding box of the element, which includes its position and dimensions. You can use the bounding box to determine how much to scroll the page to bring the element into view.
    let val=page.locator('#country')
    const box = await val.boundingBox();

    if(box){
        console.log(box.x); //88
        console.log(box.y); //1000
        await page.mouse.wheel(0,box.y);
    }
    await page.waitForTimeout(10000)
})

