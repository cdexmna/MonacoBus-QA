class LoginScreen {
    constructor(page) {
        this.page = page;
    }

    get textUsername() {
        return (this.page.getByLabel('Username:'));
    }

    get textPassword() {
        return (this.page.getByLabel('Password:'));
    }

    get btnLogin() {
        return (this.page.getByRole('button', { name: 'Log in' }));
    }
}

module.exports = LoginScreen