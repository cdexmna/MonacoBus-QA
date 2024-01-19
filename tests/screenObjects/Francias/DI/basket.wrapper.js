class LoginScreen {
    constructor(page) {
        this.page = page;
    }

    get headingBasket() {
        return (this.page.getByRole('heading', { name: 'BASKET' }));
    }

    get animEmptyBasket() {
        return (this.page.getByRole('img', { name: 'Empty Cart' }));
    }


    get btnCheckout() {
        return (this.page.getByText('Checkout'));
    }

    get btnMinus() {
        return (this.page.getByRole('button', {name: '-'}));
    }

    get btnMinusBefore() {
        return (this.page.getByText('PRIVÉ Remove -').getByRole('button', {name: '-'}));
    }

    async btnMinusItem(item) {
        return (this.page.getByText(item+' Remove -').getByRole('button', {name: '-'}))
    }

    async btnPlusItem(item) {
        return (this.page.getByText(item+' Remove -').getByRole('button', {name: '+'}))
    }

    async iconRemove(item) {
        return (this.page.getByText(item+' Remove').getByRole('button', { name: 'Trash Icon Remove' }))
    }

    async textTotalFunc(number) {
        return (this.page.getByText('Total ('+number+'ticket)'))
      }

    get textTotal() {
        return (this.page.getByText('Total ('))
    }
}

module.exports = LoginScreen