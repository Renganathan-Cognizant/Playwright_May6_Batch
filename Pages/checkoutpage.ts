import { Locator, Page, expect } from "@playwright/test";
import dt from "../TestData/checkout.json"

export class checkout {
    page:Page
    private proceedtocheckout:Locator
    private placeorder:Locator
    private cardname: Locator
    private cardnumber: Locator
    private cardMM: Locator
    private cardYYYY: Locator
    private cardCVC: Locator
    private submitButton: Locator
    private verifytext: Locator

    constructor(page:Page){
        this.page=page;
        this.proceedtocheckout=page.getByText('Proceed To Checkout')
        this.placeorder=page.getByRole('link',{name:"Place Order"})
        this.cardname=page.locator('input[name="name_on_card"]')
        this.cardnumber=page.locator('input[name="card_number"]')
        this.cardMM=page.locator('input[name="cvc"]')
        this.cardYYYY=page.getByPlaceholder('MM')
        this.cardCVC=page.getByPlaceholder('YYYY')
        this.submitButton=page.locator('#submit')
        this.verifytext= page.locator('h2[data-qa="order-placed"] ~p')
    }

    async checkout(){
        await this.proceedtocheckout.click()
        await this.placeorder.click({timeout:30000})
        await this.cardname.fill(dt.cardholdername)
        await this.cardnumber.fill(dt.cardnumber)
        await this.cardMM.fill(dt.cardMM)
        await this.cardYYYY.fill(dt.cardyear)
        await this.cardCVC.fill(dt.cardcvv)
        await this.submitButton.click()
        //verify the placed order
        const msg=await this.verifytext.textContent()
        console.log(msg)

    }
}