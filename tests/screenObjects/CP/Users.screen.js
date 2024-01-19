const fs = require('fs');
class UsersCP {
    constructor(page) {
        const errorlabels = JSON.parse(fs.readFileSync("tests/screenObjects/CP/errorlabels.json"));
        this.page = page;
        this.errorLabels = errorlabels;
        this.strings = require('../../i18n/en-CP.json').screens.users;
    }

    get btnNewUser() {
        return (this.page.locator(`button:has-text("${this.strings.buttons.newUser}")`));
    }

    get textCreateANewUser() {
        return (this.page.getByText(this.strings.texts.createANewUser));
    }

    get btnBack() {
        return (this.page.locator(`div:has-text("${this.strings.texts.createANewUser}")`).getByRole('link'));
    }

    get textEnrollANewUser() {
        return (this.page.getByText(this.strings.texts.enrollANewUser));
    }

    get messageUserCreatedSuccessfully() {
        return (this.page.getByText(this.strings.messages.userCreatedSuccessfully));
    }

    get inputUserName() {
        return (this.page.locator('input[name="username"]'));
    }

    get inputFirstName() {
        return (this.page.locator(`input[name="${this.strings.inputs.firstName}"]`));
    }

    get inputLastName() {
        return (this.page.locator(`input[name="${this.strings.inputs.lastName}"]`));
    }

    get inputEmail() {
        return (this.page.locator(`input[name="${this.strings.inputs.email}"]`));
    }

    get btnSubmit() {
        return (this.page.locator(`button:has-text("${this.strings.buttons.submit}")`));
    }

    get overlayCreatedSuccessfully() {
        return (this.page.locator(`div:has-text("${this.strings.messages.userCreatedSuccessfully}")`).last());
    }

    get linkDelete() {
        return (this.page.locator(`a:has-text("${this.strings.links.delete}")`));
    }
}

module.exports = UsersCP