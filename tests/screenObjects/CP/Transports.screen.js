const { throws } = require('assert');
const fs = require('fs');
class TransportsScreen {
    constructor(page, locale) {
        const errorlabels = JSON.parse(fs.readFileSync("tests/screenObjects/CP/errorlabels.json"));
        this.page = page;
        this.errorLabels = errorlabels;
        this.strings = require('../../i18n/en-CP.json').screens.transports;
    }

    // delete locator
    get iconDelete() {
      return this.page.locator('button:[role="element"]:text-is("${this.strings.buttons.delete}"):eq(12)');
    }

    // newTransport locator
    get btnNewTransport() {
      return (this.page.locator(`button:text-is("${this.strings.buttons.newTransport}")`));
    }

    get btnBack() {
        return (this.page.locator('div').filter({ hasText: /^Create a new Transport$/ }).getByRole('link'));
    }
     
    get textCreateANewTransport() {
        return (this.page.getByText(`${this.strings.wrapper.newTransport.text.createANewTransport}`));
    }

    get textIncludeANewTransport() {
        return (this.page.getByText(`${this.strings.wrapper.newTransport.text.includeANewTransport}`));
    }
    // Generated getters based on locators for input elements
    
    get inputIdentifier() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTransport.inputs.identifier}"]`));
    }

    get inputManufacturer() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTransport.inputs.manufacturer}"]`));
    }
    
    get inputLastOdometerReading() {
        return (this.page.locator(`input[name="${this.strings.wrapper.newTransport.inputs.lastOdometerReading}"]`));
    }

    // Generated getters based on locators for select elements
    
    get selectStatus() {
        return (this.page.locator(`select[name="${this.strings.wrapper.newTransport.selects.status}"]`));
    }
    
    get selectTransportType() {
        return (this.page.locator(`select[name="${this.strings.wrapper.newTransport.selects.transportType}"]`));
    }

    get btnSubmit() {
        return (this.page.locator(`button:text-is("${this.strings.buttons.submit}")`));
    }

    get errorLabelIdentifierRequired() {
        return (this.page.getByLabel(`${this.errorLabels.transports.identifierRequired}`));
    }

    get errorLabelIdentifierAlreadyExist() {
        return (this.page.getByText(this.errorLabels.transports.identifier_already_exist));
    }

    get errorLabelLastOdometerReadingRequired() {
        return (this.page.getByLabel(`${this.errorLabels.transports.lastOdometerReadingRequired}`));
    }

    get errorLabelLastOdometerReading() {
        return (this.page.getByLabel(`${this.errorLabels.transports.lastOdometerReading}`));
    }

    get errorLabelStatusRequired() {
        return (this.page.locator(`div[title="${this.errorLabels.transports.isRequired}"]`).locator(`select[name="${this.strings.wrapper.newTransport.selects.status}"]`));;
    }

    get errorLabelTransportTypeRequired() {
        return (this.page.locator(`div[title="${this.errorLabels.transports.isRequired}"]`).locator(`select[name="${this.strings.wrapper.newTransport.selects.transportType}"]`));;
    }

    get errorLabelMaxChars() {
        return (this.page.getByLabel(`${this.errorLabels.transports.maxChars}`));
    }

    get errorLabelMinChars() {
        return (this.page.getByLabel(`${this.errorLabels.transports.minChars}`));
    }

    get errorLabelSpecialChars() {
        return (this.page.getByLabel(`${this.errorLabels.transports.specialChars}`));
    }

    get errorLabelLastOdometerReadingRequired() {
        return (this.page.getByText(this.errorLabels.transports.lastOdometerReadingRequired));
    }

    get errorLabelLastOdometerReading() {
        return (this.page.getByText(this.errorLabels.transports.lastOdometerReading));
    }

    get errorLabelManufacturerRequired() {
        // return (this.page.getByText(this.errorLabels.transports.manufacturerRequired));
        return (this.page.locator(`div[title="${this.errorLabels.transports.isRequired}"]`).locator('select[name="manufacturer"]'));
    }

    get errorLabelManufacturerMaxChars() {
        return (this.page.getByText(this.errorLabels.transports.manufacturerMaxChars));
    }

    get errorLabelManufacturerMinChars() {
        return (this.page.getByText(this.errorLabels.transports.manufacturerMinChars));
    }


   get editTransportHeading() {
        return (this.page.locator(`p:text-is("${this.strings.wrapper.editTransport.text.editTransport}")`));
    }

    get editTransportIdentifier() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editTransport.inputs.identifier}"]`));
    }

    get editTransportManufacturer() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editTransport.inputs.manufacturer}"]`));
    }

    get editTransportLastOdometerReading() {
        return (this.page.locator(`input[name="${this.strings.wrapper.editTransport.inputs.lastOdometerReading}"]`));
    }

    get editTransportStatus() {
        return (this.page.locator(`select[name="${this.strings.wrapper.editTransport.selects.status}"]`));
    }

    get editTransportTransportType() {
        return (this.page.locator(`select[name="${this.strings.wrapper.editTransport.selects.transportType}"]`));
    }

    get editTransportUpdateTransport() {
        return (this.page.locator(`button:text-is("${this.strings.wrapper.editTransport.buttons.updateTransport}")`));
    }

    get overlayUpdatedSuccessfully() {
        return this.page.locator(`:text("${this.strings.wrapper.editTransport.messages.transportUpdatedSuccessfully}")`);
    }
    get overlayCreateError() {
        return this.page.locator(`:text("${this.strings.wrapper.editTransport.messages.transportCreateError}")`);
    }

    get overlayUpdateError() {
        return this.page.locator(`:text("${this.strings.wrapper.editTransport.messages.transportUpdatedError}")`);
    }

    get overlayDeleteError() {
        return this.page.locator(`:text("${this.strings.wrapper.editTransport.messages.transportDeleteError}")`);
    }

    get editTransportDeleteTransport() {
        return (this.page.locator('#root').locator(`button:text-is("${this.strings.wrapper.editTransport.buttons.deleteTransport}")`));
    }

    get editTransportDeleteTransportHeading()  {
        return (this.page.locator(`p:text-is("${this.strings.wrapper.editTransport.text.deleteTransport}")`));
    }

    get editTransportDeleteTransportAlertTitle() {
        return (this.page.getByText(`${this.strings.wrapper.editTransport.alerts.deleteTransportTitle}`));
    }

    get editTransportDeleteTransportAlertMessage() {
        return (this.page.getByText(`${this.strings.wrapper.editTransport.alerts.deleteTransportMessage}`));
    }

    get editTransportDeleteTransportGoBack() {
        return (this.page.locator(`button:text-is("${this.strings.wrapper.editTransport.buttons.goBack}")`));
    }

    get overlayDeleteTransport() {
        return (this.page.getByRole('dialog').locator(`button:text-is("${this.strings.wrapper.editTransport.buttons.deleteTransport}")`));
    }

    get overlayDeletedSuccessfully() {
        return this.page.locator(`:text("${this.strings.wrapper.editTransport.messages.transportDeletedSuccessfully}")`);
    }

}

module.exports = TransportsScreen;