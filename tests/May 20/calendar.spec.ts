import {test} from '@playwright/test';
import moment from 'moment';
/**
 * Date and time handling is a common task in web automation testing. 
 * It is important to handle date and time correctly in order to avoid any issues with the test cases. 
 * There are several libraries available in js to handle date and time, 
 * but the most popular one is moment.js. 
 * It provides a lot of methods to handle date and time in js. 
 * It is very easy to use and it is very popular in js community.
 */
//npm install moment - purpose of this library is to handle date and time in js. It provides a lot of methods to handle date and time. It is very easy to use and it is very popular in js community.

test('datepicker1 Method1', async({page})=>{
    //direct method if we can write inside the input box
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("#datepicker").scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000)
    await page.fill("#datepicker","05/20/2026")
    await page.waitForTimeout(5000)
})

test('datepicker1 Method2', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("#datepicker").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500)

    const expectedYear = "2026"
    const expectedMonth = "April"
    const expectedDate = "25"    

    await page.click("#datepicker"); //this locator click will opens the calendar

    while(true){

        const currentYear = await page.locator(".ui-datepicker-year").textContent(); //current year
        const currentMonth = await page.locator(".ui-datepicker-month").textContent();

        if(currentYear === expectedYear && currentMonth === expectedMonth){
            break;
        }
        await page.locator('[title="Next"]').click();
 
    }

    await page.locator(`tr>td>a:text-is('${expectedDate}')`).click();

})

test('datepicker1 Method3', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("#datepicker").scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000)

    const expectedYear = "2024"
    const expectedMonth = "April"
    const expectedDate = "25"    

    await page.click("#datepicker"); //this locator click will opens the calendar

    const monthMap: { [key: string]: number } = {January: 1, February: 2, March: 3, April: 4,
    May: 5, June: 6, July: 7, August: 8,
    September: 9, October: 10, November: 11, December: 12};
    
    while (true) {
        const currentYearText = await page.locator(".ui-datepicker-year").textContent();
        const currentMonthText = await page.locator(".ui-datepicker-month").textContent();

        const currentYear = Number(currentYearText?.trim());
        const currentMonth = monthMap[currentMonthText?.trim() || ""];

        const expectedMonthNumber = monthMap[expectedMonth];

        if (Number(currentYear) === Number(expectedYear) && currentMonth === expectedMonthNumber)
            {
                break;
            }

        if ( Number(expectedYear) > currentYear || (Number(expectedYear) === currentYear && expectedMonthNumber > currentMonth))
            {
            await page.locator('[title="Next"]').click();
            } else 
            {
            await page.locator('[title="Prev"]').click();
            }

            await page.waitForTimeout(300); // Optional: wait for calendar to update
    }

    await page.locator(`tr>td>a:text-is('${expectedDate}')`).click();

})

test('datepicker2', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("#datepicker").scrollIntoViewIfNeeded();
    await page.click('#txtDate')

    let selectMonth = "Nov"
    let selectYear = "2026"
    let date = "16"

    await page.selectOption('.ui-datepicker-year', `${selectYear}`);
    await page.selectOption('.ui-datepicker-month', `${selectMonth}`);
    await page.locator(`tr>td>a:text-is('${date}')`).click(); 
    ////*[@class='ui-state-default' and text()='1']
    await page.waitForTimeout(5000)

})

test('lambdasite daterange', async({page})=>{

    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo")

    await selectDate(13, "January 2025")
    //await selectDate(12, "December 2026")
    //await selectDate(8, "October 2025")


    async function selectDate(date: number, dateToSelect: string){

        await page.click("//input[@placeholder='Start date']")

        const currentValue = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]")
        const prev = page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]")
        const next = page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]")


        const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
        console.log("this month? " + thisMonth ); //true
        while (await currentValue.textContent() != dateToSelect){
            if (thisMonth){
                await prev.click();
            } else {
                await next.click();
            }
        }
        await page.click(`//td[@class='day'][text()='${date}']`);
    }
})

// test('calendar demo', async({page})=>{

//     await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");

//     await page.click("//input[@placeholder='Start date']");

//     const currentValue = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
//     const prev = page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]");
//     const next = page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]");

//     let dateToSele: String = "August 2025"

//     const thisMont = moment(date, "MMMM YYYY").isBefore();

//     while(await currentValue.textContent() != ) {
//         await prev.click();
//     }

//     // await prev.click();
//     // await page.click("//td[@class='day'][text()='17']")

//     await page.waitForTimeout(2000)

// })

//luxon

//date range is pending - Feb 11

test('Date Range Picker - Start date today & End date 5 days from today', async ({ page }) => {

    // 📅 Generate dates using moment.js
    const startDate = moment();                    // today
    const endDate   = moment().add(5, 'days');     // today + 5 days

    const startDay   = startDate.format('D');      // e.g. "20"
    const endDay     = endDate.format('D');        // e.g. "25"
    const startMonth = startDate.format('MMMM YYYY'); // e.g. "May 2026"
    const endMonth   = endDate.format('MMMM YYYY');   // e.g. "May 2026"

    console.log(`Start Date : ${startDate.format('MM/DD/YYYY')}`);
    console.log(`End Date   : ${endDate.format('MM/DD/YYYY')}`);

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Scroll to Date Range Picker section
    await page.locator('.date-picker-box #start-date').scrollIntoViewIfNeeded();

    // ── Helper: navigate calendar to target month and pick a day ─────────────
    async function pickDate(inputLocator: string, targetMonth: string, targetDay: string) {

        await page.click(inputLocator);

        // Calendar header showing current month+year
        const calHeader = page.locator('.ui-datepicker-title');
        const prevBtn   = page.locator('[title="Prev"]');
        const nextBtn   = page.locator('[title="Next"]');

        // Navigate to the correct month
        while (true) {
            const currentHeader = await calHeader.textContent();
            const currentMoment = moment(currentHeader?.trim(), 'MMMM YYYY');
            const targetMoment  = moment(targetMonth, 'MMMM YYYY');

            if (currentMoment.isSame(targetMoment, 'month')) break;

            if (targetMoment.isAfter(currentMoment, 'month')) {
                await nextBtn.click();
            } else {
                await prevBtn.click();
            }
            await page.waitForTimeout(300);
        }

        // Click the target date
        await page.locator(`tr > td > a:text-is('${targetDay}')`).click();
        await page.waitForTimeout(500);
    }

    // ── Pick Start Date ───────────────────────────────────────────────────────
    await pickDate('#start-date', startMonth, startDay);

    // ── Pick End Date ─────────────────────────────────────────────────────────
    await pickDate('#end-date', endMonth, endDay);

    // ── Verify the selected values in the input fields ────────────────────────
    const fromValue = await page.inputValue('#start-date');
    const toValue   = await page.inputValue('#end-date');

    console.log(`From field value : ${fromValue}`);
    console.log(`To field value   : ${toValue}`);

    await page.waitForTimeout(3000);
});

// ─────────────────────────────────────────────────────────────────────────────
// Date Picker 3: Select a Date Range  (format: dd-mm-yyyy)
// ─────────────────────────────────────────────────────────────────────────────
test('Date Picker 3 - Select a Date Range', async ({ page }) => {

    // 📅 Define Start Date and End Date (change these values as needed)
    const startMoment = moment('10-08-2026', 'DD-MM-YYYY');  // 10 August 2026
    const endMoment   = moment('25-08-2026', 'DD-MM-YYYY');  // 25 August 2026

    // Extract individual parts for navigation
    const startDay   = startMoment.format('D');           // "10"
    const endDay     = endMoment.format('D');             // "25"
    const startMonth = startMoment.format('MMMM YYYY');   // "August 2026"
    const endMonth   = endMoment.format('MMMM YYYY');     // "August 2026"

    console.log(`Start Date : ${startMoment.format('DD-MM-YYYY')}`);
    console.log(`End Date   : ${endMoment.format('DD-MM-YYYY')}`);

    await page.goto("https://testautomationpractice.blogspot.com/");

    // Scroll Date Picker 3 into view
    await page.locator('#start-date').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // ── Helper: open a date input, navigate to the target month, click the day ─
    async function pickDate(inputId: string, targetMonth: string, targetDay: string) {

        await page.click(inputId);

        // Calendar header that shows current "Month YYYY"
        const calHeader = page.locator('.ui-datepicker-title');
        const prevBtn   = page.locator('[title="Prev"]');
        const nextBtn   = page.locator('[title="Next"]');

        // Navigate to the correct month ──────────────────────────────────────
        while (true) {
            const headerText    = await calHeader.textContent();
            const currentMoment = moment(headerText?.trim(), 'MMMM YYYY');
            const targetMoment  = moment(targetMonth, 'MMMM YYYY');

            if (currentMoment.isSame(targetMoment, 'month')) break;

            if (targetMoment.isAfter(currentMoment, 'month')) {
                await nextBtn.click();
            } else {
                await prevBtn.click();
            }
            await page.waitForTimeout(300);
        }

        // Click the matching day cell ─────────────────────────────────────────
        await page.locator(`tr > td > a:text-is('${targetDay}')`).click();
        await page.waitForTimeout(500);
    }

    // ── Select Start Date ─────────────────────────────────────────────────────
    await pickDate('#start-date', startMonth, startDay);

    // ── Select End Date ───────────────────────────────────────────────────────
    await pickDate('#end-date', endMonth, endDay);

    // ── Read back the values and log them ─────────────────────────────────────
    const startValue = await page.inputValue('#start-date');
    const endValue   = await page.inputValue('#end-date');

    console.log(`Start date field : ${startValue}`);  // expected: 10-08-2026
    console.log(`End date field   : ${endValue}`);    // expected: 25-08-2026

    // ── Click the Submit button for Date Picker 3 ─────────────────────────────
    await page.locator('.date-picker-box button').click();

    await page.waitForTimeout(2000);
});