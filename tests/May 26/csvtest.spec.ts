//CSV - comma separated value, ---> npm i csv-parse --> convert our text i/p into array of objects
import {test} from '@playwright/test';
import fs from "fs"; //file sync
import {parse} from 'csv-parse/sync';

const data = parse(fs.readFileSync("TestData/csvfile.csv"),{
    columns:true,
    skip_empty_lines:true,
    delimiter:"," //optional
})
console.log("converted data:" + data)

data.forEach((dt:any) => {
    test(`csv data with ${dt.ID}`,async({page})=>{
        await page.goto("https://demoqa.com/automation-practice-form")
        await page.waitForLoadState(); //wait for page to load untill DOM is ready

        await page.getByPlaceholder("First Name").fill(dt.Firstname)//("firstname")
        await page.getByPlaceholder("Last Name").fill(dt.Lastname)

    })
})

// const data = [
//     {
//         "ID":"1",
//         "Firstname":"Playwright",
//         "Lastname":"Batch"
//     },
//     {
//         "ID":"2",
//         "Firstname":"Tom",
//         "Lastname":"Jerry"
//     }
// ]

