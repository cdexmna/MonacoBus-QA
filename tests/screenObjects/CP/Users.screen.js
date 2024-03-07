const fs = require('fs');
class UsersCP {
    constructor(page, locale) {
        const errorlabels = JSON.parse(fs.readFileSync("tests/screenObjects/CP/errorlabels-"+locale+".json"));
        this.page = page;
        this.errorLabels = errorlabels;
        this.strings = require('../../i18n/en-CP.json').screens.users;
    }

    get btnNewUser() {
        return (this.page.locator(`button:has-text("${this.strings.buttons.newUser}")`));
    }

    get textCreateANewUser() {
        return (this.page.getByText(this.strings.wrapper.newUser.text.createANewUser));
    }

    get btnBack() {
        return (this.page.locator('div').filter({ hasText: /^Create a new User$/ }).getByRole('link'));
    }

    get textEnrollANewUser() {
        return (this.page.getByText(this.strings.wrapper.newUser.text.enrollANewUser));
    }

    get messageUserCreatedSuccessfully() {
        return (this.page.getByText(this.strings.wrapper.messages.userCreatedSuccessfully));
    }

    get inputUserName() {
        return (this.page.locator('input[name="username"]'));
    }

    get inputFirstName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newUser.inputs.firstName}"]`));
    }

    get inputLastName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newUser.inputs.lastName}"]`));
    }

    get inputEmail() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newUser.inputs.email}"]`));
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

    get errorLabelUsernameRequired() {
        return (this.page.getByText(this.errorLabels.users.usernameRequired));
    }

    get errorLabelLastNameRequired() {
        return (this.page.getByText(this.errorLabels.users.lastNameRequired));
    }

    get errorLabelFirstNameRequired() {
        return (this.page.getByText(this.errorLabels.users.firstNameRequired));
    }

    get errorLabelUsernameAlreadyExist() {
        return (this.page.getByText(this.errorLabels.users.usernameExisting));
    }

    get errorLabelUsernameInvalid() {
        return (this.page.getByText(this.errorLabels.users.usernameInvalid));
    }

    get errorLabelEmailAlreadyExist() {
        return (this.page.getByText(this.errorLabels.users.emailExisting));
    }

    get errorLabelEmailRequired() {
        return (this.page.getByText(this.errorLabels.users.emailRequired));
    }

    get errorLabelEmailInvalid() {
        return (this.page.getByText(this.errorLabels.users.emailInvalid));
    }



   get editUserHeading() {
        return (this.page.locator(`p:text-is("${this.strings.wrapper.editUser.text.editUser}")`));
    }

    get editUserUsername() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editUser.inputs.username}"]`));
    }

    get editUserFirstName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editUser.inputs.firstName}"]`));
    }

    get editUserLastName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editUser.inputs.lastName}"]`));
    }

    get editUserEmail() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editUser.inputs.email}"]`));
    }

    get editUserUpdateUser() {
        return (this.page.locator(`button:text-is("${this.strings.wrapper.editUser.buttons.updateUser}")`));
    }

    get overlayUpdatedSuccessfully() {
        return this.page.locator(`:text("${this.strings.wrapper.editUser.messages.userUpdatedSuccessfully}")`);
    }
    get overlayCreateError() {
        return this.page.locator(`:text("${this.strings.wrapper.editUser.messages.userCreateError}")`);
    }

    get overlayUpdateError() {
        return this.page.locator(`:text("${this.strings.wrapper.editUser.messages.userUpdatedError}")`);
    }

    get overlayDeleteError() {
        return this.page.locator(`:text("${this.strings.wrapper.editUser.messages.userDeleteError}")`);
    }

    get editUserDeleteUser() {
        return (this.page.locator('#root').locator(`button:text-is("${this.strings.wrapper.editUser.buttons.deleteUser}")`));
    }

    get editUserDeleteUserHeading()  {
        return (this.page.locator(`p:text-is("${this.strings.wrapper.editUser.text.deleteUser}")`));
    }

    get editUserDeleteUserAlertTitle() {
        return (this.page.getByText(`${this.strings.wrapper.editUser.alerts.deleteUserTitle}`));
    }

    get editUserDeleteUserAlertMessage() {
        return (this.page.getByText(`${this.strings.wrapper.editUser.alerts.deleteUserMessage}`));
    }

    get editUserDeleteUserGoBack() {
        return (this.page.locator(`button:text-is("${this.strings.wrapper.editUser.buttons.goBack}")`));
    }

    get overlayDeleteUser() {
        return (this.page.getByRole('dialog').locator(`button:text-is("${this.strings.wrapper.editUser.buttons.deleteUser}")`));
    }

    get overlayDeletedSuccessfully() {
        return this.page.locator(`:text("${this.strings.wrapper.editUser.messages.userDeletedSuccessfully}")`);
    }
}

module.exports = UsersCP