import { Locator, Page, expect } from "@playwright/test";

export class ProductSelection {
    page:Page
    private firstproduct:Locator
    private secondproduct:Locator
    private continueshopping:Locator
    private viewcart:Locator

    constructor(page:Page){
        this.page=page;
        this.firstproduct=page.locator('a[data-product-id="1"]').first()
        this.secondproduct=page.locator('a[data-product-id="2"]').first()
        this.continueshopping=page.getByRole('button',{name:'Continue Shopping'})
        this.viewcart=page.getByRole('link',{name:"View Cart"})
    }

    async SelectProduct(){
        await this.firstproduct.click()
        await this.continueshopping.click({timeout:2000})
        await this.secondproduct.click()
        await this.viewcart.click()
    }
}