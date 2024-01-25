const fs = require('fs');
class TicketTypesCP {
    constructor(page) {
        const errorlabels = JSON.parse(fs.readFileSync("tests/screenObjects/CP/errorlabels.json"));
        this.page = page;
        this.errorLabels = errorlabels;
        this.strings = require('../../i18n/en-CP.json').screens.ticketTypes;
    }

    get btnNewTicketType() {
        return (this.page.locator(`button:has-text("${this.strings.buttons.newTicketType}")`));
    }

    get textOfferANewTicketType() {
        return (this.page.getByText(this.strings.wrapper.newTicketTypes.text.offerANewTicketType));
    }

    get btnBack() {
        return (this.page.locator('div').filter({ hasText: /^Create a new TicketTypes$/ }).getByRole('link'));
    }

    get textCreateANewTicketType() {
        return (this.page.getByText(this.strings.wrapper.newTicketTypes.text.createANewTicketType));
    }

    get messageTicketTypesCreatedSuccessfully() {
        return (this.page.getByText(this.strings.wrapper.messages.userCreatedSuccessfully));
    }

    get inputName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTicketTypes.inputs.name}"]`));
    }

    get inputPrice() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTicketTypes.inputs.price}"]`));
    }

    get inputPosition() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTicketTypes.inputs.position}"]`));
    }

    get btnSubmit() {
        return (this.page.locator(`button:has-text("${this.strings.wrapper.buttons.submit}")`));
    }

    get overlayCreatedSuccessfully() {
        return (this.page.locator(`div:has-text("${this.strings.wrapper.messages.createdSuccessfully}")`).last());
    }

    get linkDelete() {
        return (this.page.locator(`a:has-text("${this.strings.links.delete}")`));
    }

    get errorLabelNameRequired() {
        return (this.page.getByText(this.errorLabels.users.nameRequired));
    }

    get errorLabelPriceRequired() {
        return (this.page.getByText(this.errorLabels.users.priceRequired));
    }

    get errorLabelNameRequired() {
        return (this.page.getByText(this.errorLabels.users.nameRequired));
    }

    get errorLabelNameAlreadyExist() {
        return (this.page.getByText(this.errorLabels.users.nameExisting));
    }

    get errorLabelPositionAlreadyExist() {
        return (this.page.getByText(this.errorLabels.users.positionExisting));
    }

    get errorLabelPositionRequired() {
        return (this.page.getByText(this.errorLabels.users.positionRequired));
    }

    get errorLabelPositionInvalid() {
        return (this.page.getByText(this.errorLabels.users.positionInvalid));
    }



   get editTicketTypesHeading() {
        return (this.page.locator(`p:text-is("${this.strings.wrapper.editTicketTypes.text.editTicketTypes}")`));
    }

    get editTicketTypesTicketTypesname() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editTicketTypes.inputs.username}"]`));
    }

    get editTicketTypesName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editTicketTypes.inputs.name}"]`));
    }

    get editTicketTypesPrice() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editTicketTypes.inputs.price}"]`));
    }

    get editTicketTypesPosition() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editTicketTypes.inputs.position}"]`));
    }

    get editTicketTypesUpdateTicketTypes() {
        return (this.page.locator(`button:text-is("${this.strings.wrapper.editTicketTypes.buttons.updateTicketTypes}")`));
    }

    get overlayUpdatedSuccessfully() {
        return this.page.locator(`:text("${this.strings.wrapper.editTicketTypes.messages.userUpdatedSuccessfully}")`);
    }
    get overlayCreateError() {
        return this.page.locator(`:text("${this.strings.wrapper.editTicketTypes.messages.userCreateError}")`);
    }

    get overlayUpdateError() {
        return this.page.locator(`:text("${this.strings.wrapper.editTicketTypes.messages.userUpdatedError}")`);
    }

    get overlayDeleteError() {
        return this.page.locator(`:text("${this.strings.wrapper.editTicketTypes.messages.userDeleteError}")`);
    }

    get editTicketTypesDeleteTicketTypes() {
        return (this.page.locator('#root').locator(`button:text-is("${this.strings.wrapper.editTicketTypes.buttons.deleteTicketTypes}")`));
    }

    get editTicketTypesDeleteTicketTypesHeading()  {
        return (this.page.locator(`p:text-is("${this.strings.wrapper.editTicketTypes.text.deleteTicketTypes}")`));
    }

    get editTicketTypesDeleteTicketTypesAlertTitle() {
        return (this.page.getByText(`${this.strings.wrapper.editTicketTypes.alerts.deleteTicketTypesTitle}`));
    }

    get editTicketTypesDeleteTicketTypesAlertMessage() {
        return (this.page.getByText(`${this.strings.wrapper.editTicketTypes.alerts.deleteTicketTypesMessage}`));
    }

    get editTicketTypesDeleteTicketTypesGoBack() {
        return (this.page.locator(`button:text-is("${this.strings.wrapper.editTicketTypes.buttons.goBack}")`));
    }

    get overlayDeleteTicketTypes() {
        return (this.page.getByRole('dialog').locator(`button:text-is("${this.strings.wrapper.editTicketTypes.buttons.deleteTicketTypes}")`));
    }

    get overlayDeletedSuccessfully() {
        return this.page.locator(`:text("${this.strings.wrapper.editTicketTypes.messages.userDeletedSuccessfully}")`);
    }
}

module.exports = TicketTypessCP