const fs = require('fs');
class TicketTypesCP {
    constructor(page) {
        const errorlabels = JSON.parse(fs.readFileSync("tests/screenObjects/CP/errorlabels.json"));
        this.page = page;
        this.errorLabels = errorlabels;
        this.strings = require('../../i18n/en-CP.json').screens.ticketTypes;
    }

    get btnNewTicketType() {
        // return (this.page.locator(`a[name="${this.strings.buttons.newTicketType}"]`));
        return (this.page.getByRole('button', { name: this.strings.buttons.newTicketType }));
    }

    get textOfferANewTicketType() {
        return (this.page.getByText(this.strings.wrapper.newTicketType.text.offerANewTicketType));
    }

    get btnBack() {
        return (this.page.locator('div').filter({ hasText: /^Create a new Ticket Type$/ }).getByRole('link'));
    }

    get textCreateANewTicketType() {
        return (this.page.getByText(this.strings.wrapper.newTicketType.text.createANewTicketType));
    }

    get messageTicketTypeCreatedSuccessfully() {
        return (this.page.getByText(this.strings.wrapper.messages.ticketTypeCreatedSuccessfully));
    }

    get inputName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTicketType.inputs.name}"]`));
    }

    get inputPrice() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTicketType.inputs.price}"]`));
    }

    get inputPosition() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTicketType.inputs.position}"]`));
    }

    get selectIcon() {
        return (this.page.locator(`select[name="${this.strings.wrapper.newTicketType.selects.icon}"]`));
    }

    get selectVat() {
        return (this.page.locator(`select[name="${this.strings.wrapper.newTicketType.selects.vat}"]`));
    }

    get selectTicketCategory() {
        return (this.page.locator(`select[name="${this.strings.wrapper.newTicketType.selects.ticketCategory}"]`));
    }

    get btnSubmit() {
        return (this.page.locator(`button:has-text("${this.strings.buttons.submit}")`));
    }

    get overlayCreatedSuccessfully() {
        return (this.page.locator(`div:has-text("${this.strings.wrapper.messages.ticketTypeCreatedSuccessfully}")`).last());
    }

    get linkDelete() {
        return (this.page.locator(`a:has-text("${this.strings.links.delete}")`));
    }

    get errorLabelNameRequired() {
        return (this.page.getByText(this.errorLabels.ticketType.nameRequired));
    }

    get errorLabelPriceRequired() {
        return (this.page.getByText(this.errorLabels.ticketType.priceRequired));
    }

    get errorLabelNameAlreadyExist() {
        return (this.page.getByText(this.errorLabels.ticketType.nameExisting));
    }

    get errorLabelPositionAlreadyExist() {
        return (this.page.getByText(this.errorLabels.ticketType.positionExisting));
    }

    get errorLabelPositionRequired() {
        return (this.page.getByText(this.errorLabels.ticketType.positionRequired));
    }

    get errorLabelPositionInvalid() {
        return (this.page.getByText(this.errorLabels.ticketType.positionInvalid));
    }

    get errorLabelIconRequired() {
        return (this.page.getByText(this.errorLabels.ticketType.iconRequired));
    }

    get errorLabelVatRateRequired() {
        return (this.page.getByText(this.errorLabels.ticketType.vatRateRequired));
    }

    get errorLabelTicketCategoryRequired() {
        return (this.page.getByText(this.errorLabels.ticketType.ticketCategoryRequired));
    }

    get errorLabelPriceInvalid() {
        return (this.page.getByText(this.errorLabels.ticketType.priceInvalid));
    }

    get editTicketTypeHeading() {
        return (this.page.getByText(this.strings.wrapper.editTicketType.heading));
    }

    get btnUpdate() {
        return (this.page.locator(`button:has-text("${this.strings.wrapper.editTicketType.buttons.update}")`));
    }

    get messageTicketTypeUpdatedSuccessfully() {
        return (this.page.getByText(this.strings.wrapper.messages.ticketTypeUpdatedSuccessfully));
    }

    get overlayUpdatedSuccessfully() {
        return (this.page.locator(`div:has-text("${this.strings.wrapper.messages.ticketTypeUpdatedSuccessfully}")`).last());
    }
    get overlayCreateError() {
        return this.page.locator(`:text("${this.strings.wrapper.editTicketType.messages.ticketTypeCreateError}")`);
    }

    get overlayUpdateError() {
        return this.page.locator(`:text("${this.strings.wrapper.editTicketType.messages.ticketTypeUpdatedError}")`);
    }

    get overlayDeleteError() {
        return this.page.locator(`:text("${this.strings.wrapper.editTicketType.messages.ticketTypeDeleteError}")`);
    }

    get editTicketTypeDeleteTicketType() {
        return (this.page.locator('#root').locator(`button:text-is("${this.strings.wrapper.editTicketType.buttons.deleteTicketType}")`));
    }

    get editTicketTypeDeleteTicketTypeHeading()  {
        return (this.page.locator(`p:text-is("${this.strings.wrapper.editTicketType.text.deleteTicketType}")`));
    }

    get editTicketTypeDeleteTicketTypeAlertTitle() {
        return (this.page.getByText(`${this.strings.wrapper.editTicketType.alerts.deleteTicketTypesTitle}`));
    }

    get editTicketTypeDeleteTicketTypeAlertMessage() {
        return (this.page.getByText(`${this.strings.wrapper.editTicketType.alerts.deleteTicketTypesMessage}`));
    }

    get confirmDeleteTicketType() {
        return (this.page.locator(`button:text-is("${this.strings.wrapper.editTicketType.buttons.confirmDeleteTicketType}")`).last());
    }

    get cancelDeleteTicketType() {
        return (this.page.locator(`button:text-is("${this.strings.wrapper.editTicketType.buttons.goBack}")`));
    }

    get messageTicketTypeDeletedSuccessfully() {
        return (this.page.getByText(this.strings.wrapper.messages.ticketTypeDeletedSuccessfully));
    }

    get overlayDeletedSuccessfully() {
        return (this.page.locator(`div:has-text("${this.strings.wrapper.messages.ticketTypeDeletedSuccessfully}")`).last());
    }
}

module.exports = TicketTypesCP