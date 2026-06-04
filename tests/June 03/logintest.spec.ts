import {test} from '@playwright/test';

test ("Automation Exercise", async({page})=>{

    //launch the app
    await page.goto("https://automationexercise.com/")

    //login
    await page.getByRole('link',{name:'Signup/Login'}).click()
    await page.locator('input[data-qa="login-email"]').fill("playdemo@gmail.com")
    await page.getByPlaceholder('password').fill("hwdlxed")
    await page.getByRole('button',{name:'Login'}).click()

    //product selection
    await page.locator('a[data-product-id="1"]').first().click();
    await page.getByRole('button',{name:'Continue Shopping'}).click()
    await page.locator('a[data-product-id="2"]').first().click();
    await page.getByRole('link',{name:"View Cart"}).click()

    //checkout
    await page.getByText('Proceed To Checkout').click({timeout:10000})
    await page.getByRole('link',{name:"Place Order"}).click()
    await page.locator('input[name="name_on_card"]').fill('testcard')
    await page.locator('input[name="card_number"]').fill('1234567890')
    await page.locator('input[name="cvc"]').fill('000')
    await page.getByPlaceholder('MM').fill('10')
    await page.getByPlaceholder('YYYY').fill('2025')
    await page.locator('#submit').click()

    //placed order msg
    const msg = await page.locator('h2[data-qa="order-placed"] ~p').textContent()
    console.log(msg)
})