const fs = require('fs');
class BasketWrapper {
    constructor(page, locale) {
        // const ticketTypes = require('../DI/ticketTypes.json')
        const TicketTypes = JSON.parse(fs.readFileSync("tests/screenObjects/English/DI/ticketTypes.json"));
        const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + locale + ".json"));
        this.page = page;
        this.ticketTypes = TicketTypes
        this.strings = languageFile.screens.basket
    }

    get headingBasket() {
        return (this.page.getByRole('heading', { name: this.strings.heading }));
    }

    get animEmptyBasket() {
        return (this.page.getByRole('img', { name: this.strings.empty_cart }));
    }

    get btnCheckout() {
        return (this.page.getByText(this.strings.checkout));
    }

    get itemLocatorRemove() {
        return (this.page.itemLocator.getByText(' Remove'))
    }

    async itemLocator(itemCode) {
        return (this.page.locator('#cart').locator(`text=${itemCode}`));
    }

    async btnMinus(itemCode) {
        return (this.page.locator(`text=${itemCode}` + ` Remove -`).locator('button:has-text("-")'));
    }

    async btnPlus(itemCode) {
        return (this.page.locator(`text=${itemCode}` + ` Remove -`).locator('button:has-text("+")'));
    }

    async iconRemove(itemCode) {
        return (this.page.locator(`text=${itemCode}` + ` Remove -`).locator('button:has-text("Remove")'));
    }

    // get btnMinus() {
    //     return (this.page.getByRole('button', {name: '-'}));
    // }

    async textTotal(number) {
        return(this.page.locator(`text=${this.strings.total} (${number} ticket`));
        // return(this.page.getByText(this.strings.total  + ' ('+number+' ticket)'));
    }

    async textPriceAmount(itemCodePrice) {
        const parsedPrice = parseFloat(itemCodePrice);
        const itemPriceFixed = parsedPrice.toFixed(2);
        return (this.page.getByText(`${itemPriceFixed}` + '  €'));
    }

    // async expectedPriceAmount(itemCodePrice, expectedPrice) {
    //     // const priceAmountWritten = await this.textPriceAmount(itemCodePrice);
    //     const parsedAmountWritten = parseInt(itemCodePrice);
    //     await expect(parsedAmountWritten).toBe(expectedPrice);
    // }
    
        
}

module.exports = BasketWrapper