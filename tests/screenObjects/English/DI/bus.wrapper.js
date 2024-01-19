const fs = require('fs');
class BusWrapper {
    constructor(page, locale) {
        // const ticketTypes = require('../DI/ticketTypes.json')
        const TicketTypes = JSON.parse(fs.readFileSync("tests/screenObjects/English/DI/ticketTypes.json"));
        const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + locale + ".json"));
        this.page = page;
        this.ticketTypes = TicketTypes
        this.strings = languageFile.screens.bus
    }

    get pass2DaysAdult() {
        const labelObject = this.ticketTypes.BUS.PASS['2 DAYS ADULT'].label
        const priceObject = this.ticketTypes.BUS.PASS['2 DAYS ADULT'].price
        return (this.page.locator(`text=${labelObject} ${priceObject}`))
    }

    get passBusMuseum() {
        const labelObject = this.ticketTypes.BUS.PASS['BUS/MUSEUM'].label
        const priceObject = this.ticketTypes.BUS.PASS['BUS/MUSEUM'].price
        
        return (this.page.locator(`text=${labelObject} ${priceObject}`))
    }

    get passBusPalace() {
        const labelObject = this.ticketTypes.BUS.PASS['BUS+PALACE'].label
        const priceObject = this.ticketTypes.BUS.PASS['BUS+PALACE'].price

        return (this.page.locator(`text=${labelObject} ${priceObject}`))
    }

    get passTarifPMR() {
        const labelObject = this.ticketTypes.BUS.PASS['TARIF PMR'].label
        const priceObject = this.ticketTypes.BUS.PASS['TARIF PMR'].price

        return (this.page.locator(`text=${labelObject} ${priceObject}`))
    }

    get passInvites() {
        const labelObject = this.ticketTypes.BUS.PASS['INVITES'].label
        const priceObject = this.ticketTypes.BUS.PASS['INVITES'].price

        return (this.page.locator(`text=${labelObject} ${priceObject}`))
    }

    get group1DayAdult() {
        const labelObject = this.ticketTypes.BUS.GROUP['1 DAY ADULT'].label
        const priceObject = this.ticketTypes.BUS.GROUP['1 DAY ADULT'].price

        return (this.page.locator(`text=${labelObject} ${priceObject}`))
    }

    get group1DayChild() {
        const labelObject = this.ticketTypes.BUS.GROUP['1 DAY CHILD'].label
        const priceObject = this.ticketTypes.BUS.GROUP['1 DAY CHILD'].price

        return (this.page.locator(`text=${labelObject} ${priceObject}`))
    }
    
    get group1DaySenior() {
        const labelObject = this.ticketTypes.BUS.GROUP['1 DAY SENIOR'].label
        const priceObject = this.ticketTypes.BUS.GROUP['1 DAY SENIOR'].price
        return (this.page.locator(`text=${labelObject} ${priceObject}`))
    }

    get familyPass() {
        const labelObject = this.ticketTypes.BUS['FAMILY'].label
        const priceObject = this.ticketTypes.BUS['FAMILY'].price
        return (this.page.locator(`text=${labelObject} ${priceObject}`))
    }
}

module.exports = BusWrapper