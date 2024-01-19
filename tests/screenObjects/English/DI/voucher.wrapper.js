const fs = require('fs');
class VoucherWrapper {
    constructor(page, locale) {
        // const ticketTypes = require('../DI/ticketTypes.json')
        const TicketTypes = JSON.parse(fs.readFileSync("tests/screenObjects/English/DI/ticketTypes.json"));
        const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + locale + ".json"));
        this.page = page;
        this.ticketTypes = TicketTypes
        this.strings = languageFile.screens.voucher
    }

    get gyg1DayChild() {
        const labelObject = this.ticketTypes.VOUCHERS.GYG['1 DAY CHILD'].label
        return (this.page.locator(`text=${labelObject}`).locator(".."))
    }

    get gyg2DaysAdult() {
        const labelObject = this.ticketTypes.VOUCHERS.GYG['2 DAYS ADULT'].label
        return (this.page.locator(`text=${labelObject}`).locator(".."))
    }

    get tiqets1DayAdult() {
        const labelObject = this.ticketTypes.VOUCHERS.TIQETS['1 DAY ADULT'].label
        return (this.page.locator(`text=${labelObject}`).locator(".."))
    }

    get tiqets2DaysAdult() {
        const labelObject = this.ticketTypes.VOUCHERS.TIQETS['2 DAYS ADULT'].label
        return (this.page.locator(`text=${labelObject}`).locator(".."))
    }

    get tiqets1DayChild() {
        const labelObject = this.ticketTypes.VOUCHERS.TIQETS['1 DAY CHILD'].label
        return (this.page.locator(`text=${labelObject}`).locator(".."))
    }
}

module.exports = VoucherWrapper