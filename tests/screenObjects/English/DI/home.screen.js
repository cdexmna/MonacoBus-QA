const fs = require('fs');
class HomeScreen {
    constructor(page, locale) {
        // const ticketTypes = require('../DI/ticketTypes.json')
        
        const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + locale + ".json"));
        this.page = page;
        
        this.strings = languageFile.screens.home
    }

    get linkLogo() {
        return (this.page.locator('.w-16 > .w-full'));
    }

    get card() {
        return (this.page.getByText(ticketTypes))
    }

    get linkLogout() {
        return (this.page.getByRole('link', { name: this.strings.logout }));
    }

    get drpLanguage() {
        return (this.page.getByRole('combobox').last());
    }

    get linkReadVoucher() {
        return (this.page.getByRole('link', { name: this.strings.link_read_voucher }));
    }

    get btnFavs() {
        return (this.page.getByText('FAVS', {exact:true}));
    }

    get btnBus() {
        return (this.page.getByText('BUS', {exact:true}));
    }

    get btnMonacoLGT() {
        return (this.page.getByText('MONACO LGT', {exact:true}));
    }

    get btnVouchers() {
        return (this.page.getByText('VOUCHERS', {exact:true}));
    }

    get drpSelectAVehicle() {
        return (this.page.locator('#selected-transport'))
    }

    get textMileage() {
        return (this.page.getByPlaceholder('Enter the vehicle'));
    }

    get btnSelect() {
        return (this.page.getByRole('button', { name: 'Select' }));
    }
}

module.exports = HomeScreen