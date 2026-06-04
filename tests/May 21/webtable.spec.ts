import {test, expect, Locator, Page} from "@playwright/test";

test("simple web table handling Method1", async({page})=>{

    await page.goto("https://letcode.in/table")

    const table = page.locator("#simpletable");
    const headers = table.locator("thead")
    console.log(await headers.allTextContents()); //4 heading details

    const rows = table.locator("tbody tr") //#simpletable tbody tr
    console.log("Rows count: " + await rows.count()); // count ?

    const cols = rows.first().locator("td")
    console.log("Cols count: " + await cols.count()) //counts 

    await inputChecker(rows, page, "Raj");
    //await inputChecker(rows, page, "Chatterjee");

})

//row - #simpletable tbody tr td --> 12 datas
async function inputChecker(rows: Locator, page: Page, name: string) {
    const nameMatch = rows.filter({
        has: page.locator("td"), //#simpletable tbody tr td
        hasText: name
    });
    console.log(nameMatch);
    await nameMatch.locator("input").check();
}

test("simple web table handling Approach2", async({page})=>{

    await page.goto("https://letcode.in/table")

    const table = page.locator("#simpletable");

    const headers = table.locator("thead")
    console.log(await headers.allTextContents()); // 4 heading details

    const rows = table.locator("tbody tr")
    console.log("Rows count: " + await rows.count()); // rows count 3
    //#simpletable tbody tr td

    for (let i=0; i< await rows.count(); i++) { //iterates rows
        const row = rows.nth(i);  // this partical row will check for my last name iterating
        const tds = row.locator("td"); // from row - iterate coloumn data
        for (let j=0; j < await tds.count(); j++) { //from td -> if text matches
            if(await tds.nth(j).textContent() == "Raj"){
                console.log(await tds.nth(2).textContent());
                await tds.last().locator("input").check();
            }
        }
    }
    
})

test("web table - calculation", async({page})=>{
    await page.goto("https://letcode.in/table")

    const table = page.locator("#shopping")
    const tbody = table.locator("tbody") // #shopping tbody
    const tfoot = table.locator("tfoot") // #shopping tfoot

    const rowsCount = await tbody.locator("tr").count(); //4
    expect (rowsCount).toBe(4);

    let total = 0;
    //start --> 0
    //1st iteration -> total = 0 + 150 = 150
    //2nd iteration -> total = 150 + 180 = 330 //Number("150") + Number ("180") = 330
    //3rd iteration -> total = 330 + 48 = 378
    //4th iteration -> total = 378 + 480 = 858


    for (let i=0; i<rowsCount; i++) {  //loops to get last col val
        const row = tbody.locator("tr").nth(i); //selects the current row // #shopping tbody tr
        const price = await row.locator("td").last().textContent(); //etract price from last col
        total = total+ Number(price);
    }

    const actualValue = await tfoot.locator("td").last().textContent(); //"858"
    expect (Number(actualValue)).toBe(total); //858 858

    console.log(actualValue, total)
})
