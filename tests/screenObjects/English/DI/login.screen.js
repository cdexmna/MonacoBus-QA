const fs = require('fs');
class LoginScreen {
    constructor(page, locale) {
        const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + locale + "-DI.json"));
        this.page = page;
        this.strings = languageFile.screens.login
    }

    get linkLogo() {
        return (this.page.getByAltText('Logo').first());
    }

    get img1_2() {
        return (this.page.getByRole('img', { name: '1_2' }));
    }

    get headingWelcomeAboard() {
        return (this.page.getByRole('heading', { name: this.strings.welcome_aboard }));
    }

    get drpLanguage() {
        return (this.page.getByRole('combobox').last());
    }

    get textUsername() {
        return (this.page.getByPlaceholder(this.strings.username_placeholder));
    }

    get textPassword() {
        return (this.page.getByPlaceholder(this.strings.password_placeholder));
    }

    get btnLogin() {
        return (this.page.getByRole('button', { name: this.strings.button_login }));
    }

    get headingSelectYourVehicle() {
        return (this.page.getByRole('heading', { name: this.strings.select_your_vehicle }));
    }

    get drpSelectAVehicle() {
        return (this.page.locator('#selected-transport'))
    }

    get textMileage() {
        return (this.page.getByPlaceholder(this.strings.mileage_placeholder));
    }

    get btnSelect() {
        return (this.page.getByRole('button', { name: this.strings.button_select }));
    }
}

module.exports = LoginScreen