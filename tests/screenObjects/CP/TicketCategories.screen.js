const fs = require('fs');
class TicketCategoriesCP {
    constructor(page) {
        const errorlabels = JSON.parse(fs.readFileSync("tests/screenObjects/CP/errorlabels.json"));
        this.page = page;
        this.errorLabels = errorlabels;
        this.strings = require('../../i18n/en-CP.json').screens.ticketCategories;
    }

    get errorLabelPosition() {
        return (this.page.getByText(this.errorLabels.ticket_categories.position_ensure_this_value).first());
    }

    get errorLabelName() {
        return (this.page.getByText(this.errorLabels.ticket_categories.name_ensure_this_field).last());
    }

    get errorLabelNameRequired() {
        return (this.page.getByText(this.errorLabels.ticket_categories.name_is_required));
    }

    get errorLabelPositionRequired() {
        return (this.page.getByText(this.errorLabels.ticket_categories.position_is_required));
    }

    get newTicketCategory() {
        return (this.page.locator(`button:text-is("${this.strings.buttons.newTicketCategory}")`));
    }

    get textCreateANewTicketCategory() {
        return (this.page.locator('div').filter({hasText: `${this.strings.wrapper.newTicketCategory.text.createANewTicketCategory}`}).last())
    }

    get inputName() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTicketCategory.inputs.name}"]`));
    }

    get inputPosition() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTicketCategory.inputs.position}"]`));
    }

    get inputDescription() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTicketCategory.inputs.description}"]`));
    }

    get btnSubmit() {
        return (this.page.locator(`button:text-is("${this.strings.buttons.submit}")`));
    }

    get overlayCreatedSuccessfully() {
        return (this.page.locator(`div:text-is("${this.errorLabels.ticket_categories.overlay_ticket_categorie_success}")`).last());
    }

    get linkDelete() {
        return (this.page.locator(`a:text-is("${this.strings.buttons.delete}")`));
    }
    get btnBack() {
        return (this.page.locator('div').filter({ hasText: /^Create a new Ticket Category$/ }).getByRole('link'));
    }
}

module.exports = TicketCategoriesCP