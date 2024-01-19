class NavigationCP {
   constructor(page, locale) {
      this.page = page;
      this.strings = require('../../i18n/en-CP.json').screens.home;
    }

  
    // dashboard locator
    get linkDashboard() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.dashboard}")`));
    }
    // transports locator
    get linkTransports() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.transports}")`));
    }
    // ticketCategories locator
    get linkTicketCategories() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.ticketCategories}")`));
    }
    // ticketTypes locator
    get linkTicketTypes() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.ticketTypes}")`));
    }
    // users locator
    get linkUsers() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.users}")`));
    }
    // vouchers locator
    get linkVouchers() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.vouchers}")`));
    }
    // sales locator
    get linkSales() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.sales}")`));
    }

    get hiAmigo() {
      return (this.page.getByText("Hi Amigo"));
    }

    get signOut() {
      return (this.page.getByText("Sign out"))
    }
}

module.exports = NavigationCP