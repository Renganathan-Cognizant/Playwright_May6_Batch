import {test as basetest} from '@playwright/test'

import { LoginFunctionality } from "../Pages/loginpage";
import { ProductSelection } from "../Pages/productselectionpage";
import { checkout } from '../Pages/checkoutpage'

type myfixture = {
    loginpage: LoginFunctionality,
    productselection: ProductSelection,
    checkoutpage: checkout,
}

export const test = basetest.extend<myfixture>({
    loginpage:async({page},use)=>{
        const loginpage=new LoginFunctionality(page)
        await use(loginpage)
    },
    productselection:async({page},use)=>{
        const prodsel = new ProductSelection(page)
        await use(prodsel)
    },
    checkoutpage:async({page},use)=>{
        const ck=new checkout(page)
        await use(ck)
    }
})


//Promise<number>
//Array<string>
//type definition vs object creation