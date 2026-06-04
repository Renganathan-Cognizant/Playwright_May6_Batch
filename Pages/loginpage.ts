import { Locator, Page, expect } from "@playwright/test";
import dt from "../TestData/pomdata.json"
import {URL} from "../constants/url"

export class LoginFunctionality {
    page:Page
    static pageurl=URL.baseURL
    private loginclick:Locator
    private username:Locator
    private password:Locator
    private submitbutton:Locator
    private loggedin:Locator

    constructor(page:Page){
        this.page=page;
        this.loginclick=page.getByRole('link',{name:' Signup / Login'})
        this.username=page.locator('//input[@data-qa="login-email"]') //xpath
        this.password=page.locator('input[data-qa="login-password"]') //css
        this.submitbutton=page.getByRole('button',{name:'Login'})
        this.loggedin=page.getByRole('link',{name:' Logout'}) //built in Locator
    }

    async launchApp(){
        await this.page.goto(LoginFunctionality.pageurl)
        await this.page.waitForLoadState('load')
    }

    async login(){
        try{
            await this.loginclick.click() //await page.getByRole('link',{name:'Signup/Login'}).click()
            await this.username.fill(dt.username)
            await this.password.fill(dt.password)
            await this.submitbutton.click()
            //to validate successfull login
            await this.loggedin.waitFor({state:"visible",timeout:30000})
            expect(await this.loggedin.isVisible()).toBeTruthy()
            //shouldnot use assertion inside class file, 
            // it should be used in test file, but for demo purpose i am using here
        }
        catch(err){
            console.log(`Error: ${err}`)
        }
    }
} 