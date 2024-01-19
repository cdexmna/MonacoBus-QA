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

    get errorLabelLastOdometerReadingRequired() {
        return (this.page.getByLabel(`${this.errorLabels.transports.lastOdometerReadingRequired}`));
    }

    get errorLabelLastOdometerReading() {
        return (this.page.getByLabel(`${this.errorLabels.transports.lastOdometerReading}`));
    }

    get errorLabelStatusRequired() {
        return (this.page.getByLabel(`${this.errorLabels.transports.statusRequired}`));
    }

    get errorLabelTransportTypeRequired() {
        return (this.page.getByLabel(`${this.errorLabels.transports.transportTypeRequired}`));
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

    // get errorLabelLastOdometerReadingRequired() {
    //     return (this.page.getByText(this.errorLabels.transports.lastOdometerReadingRequired));
    // }

    // get errorLabelLastOdometerReading() {
    //     return (this.page.getByText(this.errorLabels.transports.lastOdometerReading));
    // }
}

module.exports = TransportsScreen;