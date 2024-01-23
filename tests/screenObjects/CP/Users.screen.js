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
        return (this.page.getByText(this.strings.wrapper.texts.createANewUser));
    }

    get btnBack() {
        return (this.page.locator('div').filter({ hasText: /^Create a new User$/ }).getByRole('link'));
    }

    get textEnrollANewUser() {
        return (this.page.getByText(this.strings.wrapper.texts.enrollANewUser));
    }

    get messageUserCreatedSuccessfully() {
        return (this.page.getByText(this.strings.wrapper.messages.userCreatedSuccessfully));
    }

    get inputUserName() {
        return (this.page.locator('input[name="username"]'));
    }

    get inputFirstName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.inputs.firstName}"]`));
    }

    get inputLastName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.inputs.lastName}"]`));
    }

    get inputEmail() {
        return (this.page.locator(`input[name="${this.strings.wrapper.inputs.email}"]`));
    }

    get btnSubmit() {
        return (this.page.locator(`button:has-text("${this.strings.wrapper.buttons.submit}")`));
    }

    get overlayCreatedSuccessfully() {
        return (this.page.locator(`div:has-text("${this.strings.wrapper.messages.userCreatedSuccessfully}")`).last());
    }

    get linkDelete() {
        return (this.page.locator(`a:has-text("${this.strings.links.delete}")`));
    }
}

module.exports = UsersCP