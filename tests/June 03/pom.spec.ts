import {test} from '@playwright/test'

import { LoginFunctionality } from "../../Pages/loginpage"
import { ProductSelection } from '../../Pages/productselectionpage'
import { checkout } from '../../Pages/checkoutpage'

test ("login",async({page})=>{
    //to login
    const loginpage = new LoginFunctionality(page)
    await loginpage.launchApp()
    await loginpage.login()

    //to select product
    const prodsel = new ProductSelection(page)
    await prodsel.SelectProduct()

    //checkout
    const ck = new checkout(page)
    await ck.checkout()
})




/*
Factory Pattern
------------------
ex: diff browsers
if(browser=="chromium")
if(browser=="firefox")

BrowserFactory.getBrowser(browser)

-------------------------------------------------------------------

Singleton Pattern
------------------
ex: database connection
if(connection==null)
    connection = createConnection()


Strategy Pattern
------------------
ex: payment method
if(paymentMethod=="creditcard")
    processCreditCardPayment()
else if(paymentMethod=="paypal")
    processPaypalPayment()


Builder Pattern
------------------
ex: constructing complex test data creation
const user = new UserBuilder()
    .setName("John Doe")
    .setEmail("john.doe@example.com")
    .setAge(30)
    .build();



Fixture Pattern ( playwright special)
------------------
playwright heavily uses fixtures



Data Driven Pattern
------------------
ex: running same test with multiple data sets
const testData = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
    { username: "user3", password: "pass3" },
];

for (const data of testData) {
    test(`login test for ${data.username}`, async ({ page }) => {
        const loginpage = new LoginFunctionality(page);
        await loginpage.launchApp();
        await loginpage.login(data.username, data.password);
    });
}



Hybrid Pattern
------------------- 
POM
Fixtures
data driven
utilities
Reports
Retry logic

this becomes enterprise-level architecture

POM Architecture
-------------------
Project
 tests
 pages
 utils
 fixtures
 testData
 constants
 environment
 reports
*/

