const fs = require('fs');
class LoginScreenCP {
    constructor(page, locale) {
        const errorlabels = JSON.parse(fs.readFileSync("tests/screenObjects/CP/errorlabels-"+locale+".json"));
        this.page = page;
        this.errorLabels = errorlabels;
        this.strings = require('../../i18n/en-CP.json').screens.login;
      }

    get linkURL() {
        return 'https://ticketing-admin-frontend-j6hga.ondigitalocean.app/'
    }

    get imgLogo() {
        return (this.page.getByRole('img', { name: 'Retirement Optimized' }));
    }

    get headingPleaseSignIn() {
        return (this.page.getByRole('heading', { name: 'Please sign in' }));
    }

    get btnLogin() {
        return (this.page.locator('button:has-text("Login")'));
    }

    get inputUsername() {
        return (this.page.locator('input[name="email"]'));
    }

    get inputPassword() {
        return (this.page.locator('input[name="password"]'));
    }

    get errorLabelInvalidUsernamePassword() {
        return (this.page.getByText(this.errorLabels.login.error_label_invalid_username_password))
    }

    get errorLabelEmailSpecialChars() {
        return (this.page.locator(`div[title="${this.errorLabels.login.error_label_email_special_chars}"]`))
    }
}

module.exports = LoginScreenCP