import {test,expect} from '@playwright/test';
import data from '../../TestData/testdata.json' 

import fs from 'fs'
import path from 'path'

test('json test 1',async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/")
    await page.getByPlaceholder("Username").fill(data.username)//"username"
    await page.getByPlaceholder("Password").fill(data.password)
    await page.getByRole('button', {name: 'Login'}).click();
    await page.getByRole('link', {name: 'Recruitment'}).click();
    await page.getByRole('button', {name: 'Add'}).click();
    await expect(page.locator('#app')).toContainText('Add Candidate');
    await page.getByPlaceholder('First Name').fill(data.fname)
    await page.getByPlaceholder('Last Name').fill(data.lname)
    await page.getByPlaceholder('Type Here').first().fill(data.email)
    await page.getByRole('button', {name: 'Save'}).click();
    await page.waitForTimeout(10000)
    await expect(page.getByText('Application Stage')).toBeVisible();
})

//Parameterize tests with different data
//fs.readFileSync(filepath, encoding))
const data1 = JSON.parse(fs.readFileSync(path.join(__dirname,"../../TestData/recruitmentdata.json"),'utf-8'))
for(const dt of data1){
    test(`json test No: ${dt.ID}`, async ({page})=>{
        await page.goto("https://opensource-demo.orangehrmlive.com/")
        await page.getByPlaceholder("Username").fill(data.username)
        await page.getByPlaceholder("Password").fill(data.password) //this is from import statement
        await page.getByRole('button', {name: 'Login'}).click();
        await page.getByRole('link', {name: 'Recruitment'}).click();
        await page.getByRole('button', {name: 'Add'}).click();
        await expect(page.locator('#app')).toContainText('Add Candidate');
        await page.getByPlaceholder('First Name').fill(dt.fname) //this is from ref data recruitmentdata.jsom
        await page.getByPlaceholder('Last Name').fill(dt.lname)
        await page.getByPlaceholder('Type Here').first().fill(dt.email)
        await page.getByRole('button', {name: 'Save'}).click();
        //await page.waitForSelector()
        await expect(page.getByText('Application Stage')).toBeVisible();
    })
}

/*
buffer data -> data in binary format -> not readable
utf-8 -> converts buffer data to string -> readable format
<buffer 7b 22 69 6e 6d>


/*
fs -> reads the file
path -> makes path safe across os
__dirname -> current folder
readfilesync -> reads file synchronously
utf-8 -> converts buffer data to string
json.parse -> converts string to json object
*/


/*
//const data1 = JSON.parse(fs.readFileSync(path.join(__dirname,"../../TestData/recruitmentdata.json"),'utf-8'))
//reads the json file --> converts to JS object -> store in variable data1
execution flow - inside out;
1. path.join(__dirname,"../../TestData/recruitmentdata.json") -> gives the path of json file
2. fs.readFileSync(path.join(__dirname,"../../TestData/recruitmentdata.json"),'utf-8') -> reads the file and converts buffer to string
3. JSON.parse(fs.readFileSync(path.join(__dirname,"../../TestData/recruitmentdata.json"),'utf-8')) -> converts string to JS object
4. const data1 = JSON.parse(fs.readFileSync(path.join(__dirname,"../../TestData/recruitmentdata.json"),'utf-8')) -> stores the data in variable data1
*/