class LoginScreen {
    constructor(page) {
        this.page = page;
    }

    get linkLogo() {
        return (this.page.getByAltText('Logo').first());
    }

    get img1_2() {
        return (this.page.getByRole('img', { name: '1_2' }));
    }

    get headingWelcomeAboard() {
        return (this.page.getByRole('heading', { name: 'BIENVENUE À BORD' }));
    }

    get drpLanguage() {
        return (this.page.getByRole('combobox').last());
    }

    get textUsername() {
        return (this.page.getByPlaceholder('Entrer identifiant'));
    }

    get textPassword() {
        return (this.page.getByPlaceholder('Entrer mot de passe'));
    }

    get btnLogin() {
        return (this.page.getByText('Connexion'));
    }

    get headingSelectYourVehicle() {
        return (this.page.getByRole('heading', { name: 'SÉLECTIONNEZ VOTRE VÉHICULE' }));
    }

    get drpSelectAVehicle() {
        return (this.page.locator('#selected-transport'))
    }

    get textMileage() {
        return (this.page.getByPlaceholder('Enter the vehicle'));
    }

    get btnSelect() {
        return (this.page.getByRole('button', { name: 'Sélectionner' }));
    }
}

module.exports = LoginScreen