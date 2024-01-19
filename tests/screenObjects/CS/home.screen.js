
class HomeScreen {
    constructor(page, locale) {
      this.page = page;
      this.strings = require('../../i18n/en-CS.json').screens.home;
    }

  
    // logOut locator
    get logOut() {
      return (this.page.locator(`button:text-is("${this.strings.buttons.logOut}")`));
    }


  
    // skipToMainContent locator
    get skipToMainContent() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.skipToMainContent}")`));
    }
    // djangoAdministration locator
    get djangoAdministration() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.djangoAdministration}")`));
    }
    // viewSite locator
    get viewSite() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.viewSite}")`));
    }
    // changePassword locator
    get changePassword() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.changePassword}")`));
    }
    // aPIKeyPermissions locator
    get aPIKeyPermissions() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.aPIKeyPermissions}")`));
    }
    // aPIKeys locator
    get aPIKeys() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.aPIKeys}")`));
    }
    // add locator
    get add() {
      return this.page.locator('a:[role="element"]:text-is("${this.strings.buttons.add}"):eq(22)');
    }
    // change locator
    get change() {
      return this.page.locator('a:[role="element"]:text-is("${this.strings.buttons.change}"):eq(22)');
    }
    // authenticationAndAuthorization locator
    get authenticationAndAuthorization() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.authenticationAndAuthorization}")`));
    }
    // groups locator
    get groups() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.groups}")`));
    }
    // integrations locator
    get integrations() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.integrations}")`));
    }
    // tiqetsProductVariants locator
    get tiqetsProductVariants() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.tiqetsProductVariants}")`));
    }
    // tiqetsProducts locator
    get tiqetsProducts() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.tiqetsProducts}")`));
    }
    // vouchers locator
    get vouchers() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.vouchers}")`));
    }
    // payments locator
    get payments() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.payments}")`));
    }
    // paymentMethods locator
    get paymentMethods() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.paymentMethods}")`));
    }
    // vatRates locator
    get vatRates() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.vatRates}")`));
    }
    // periodicTasks locator
    get periodicTasks() {
      return this.page.locator('a:[role="element"]:text-is("${this.strings.buttons.periodicTasks}"):eq(1)');
    }
    // clocked locator
    get clocked() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.clocked}")`));
    }
    // crontabs locator
    get crontabs() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.crontabs}")`));
    }
    // intervals locator
    get intervals() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.intervals}")`));
    }
    // solarEvents locator
    get solarEvents() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.solarEvents}")`));
    }
    // tickets locator
    get tickets() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.tickets}")`));
    }
    // soldTickets locator
    get soldTickets() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.soldTickets}")`));
    }
    // ticketCategories locator
    get ticketCategories() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.ticketCategories}")`));
    }
    // ticketTypeFavorites locator
    get ticketTypeFavorites() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.ticketTypeFavorites}")`));
    }
    // ticketTypes locator
    get ticketTypes() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.ticketTypes}")`));
    }
    // transports locator
    get transports() {
      return this.page.locator('a:[role="element"]:text-is("${this.strings.buttons.transports}"):eq(1)');
    }
    // depots locator
    get depots() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.depots}")`));
    }
    // itineraries locator
    get itineraries() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.itineraries}")`));
    }
    // transportStatuses locator
    get transportStatuses() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.transportStatuses}")`));
    }
    // transportStops locator
    get transportStops() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.transportStops}")`));
    }
    // transportTypes locator
    get transportTypes() {
      return (this.page.locator(`a:text-is("${this.strings.buttons.transportTypes}")`));
    }
    // users locator
    get users() {
      return this.page.locator('a:[role="element"]:text-is("${this.strings.buttons.users}"):eq(1)');
    }
}

module.exports = HomeScreen;