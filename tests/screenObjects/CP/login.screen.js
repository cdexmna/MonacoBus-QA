const fs = require('fs');
class LoginScreenCP {
    constructor(page, locale) {
        const errorlabels = JSON.parse(fs.readFileSync("tests/screenObjects/CP/errorlabels.json"));
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
        return (this.page.locator('input[name="username"]'));
    }

    get inputPassword() {
        return (this.page.locator('input[name="password"]'));
    }

    get errorLabelFailedLogin() {
        return (this.page.getByText(this.errorLabels.login.error_label_failed_login))
    }
}

module.exports = LoginScreenCP