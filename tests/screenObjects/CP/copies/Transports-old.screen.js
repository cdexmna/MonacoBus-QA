class TransportsCP {
    constructor(page) {
       
        this.page = page;
    }

    get btnNewTransports() {
        return (this.page.locator('button:has-text("New Transport")'));
    }

    get textCreateANewTransport() {
        return (this.page.getByText('Create a new transport'));
    }

    get btnBack() {
        return (this.page.locator('div').filter({ hasText: /^Create a new Transport$/ }).getByRole('link'));
    }

    get textIncludeANewTransport() {
        return (this.page.getByText('Include a new transport into your fleet'));
    }

    get inputIdentifier() {
        return (this.page.locator('input[name="identifier"]'));
    }

    get inputManufacturer() {
        return (this.page.locator('input[name="manufacturer"]'));
    }

    get inputLastOdometerReading() {
        return (this.page.locator('input[name="lastOdometerReading"]'));
    }

    get dropdownStatus() {
        return (this.page.locator('select[name="status"]'));
    }

    get dropdownTransportType() {
        return (this.page.locator('select[name="transportType"]'));
    }

    get btnSubmit() {
        return (this.page.locator('button:has-text("Submit")'));
    }

    get linkDelete() {
        return (this.page.locator('a:has-text("Delete")'));
    }
}

module.exports = TransportsCP