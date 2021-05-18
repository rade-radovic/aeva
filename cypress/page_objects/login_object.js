class AuthLogin{
    get email() {
        return cy.get("input[name='email']")
    }
    get password() {
        return cy.get("input[name='password']")
    }
    get submit () {
        return cy.get("button[type='submit']")
    }
    get invalidEmailValidation() {
        return cy.get('form#login-form > div:nth-of-type(1) .ant-form-item-control-input-content')
    }
    get emptyEmailValidation() {
        return cy.get('div:nth-of-type(1) > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content')
    }
    get emptyPasswordValidation () {
        return cy.get('div:nth-of-type(3) .ant-form-item-control-input-content')
    }

    get profileIconInitials () {
        return cy.get(".nav-right > .ant-menu > .ant-menu-item")
    }

    get logoutButton () {
        return cy.get ("li[class='ant-dropdown-menu-item']")
    }

    logout () {
        this.profileIconInitials.click({ force: true });
        this.logoutButton.should('be.visible').click();
    }

    login(email, password) {
        this.email.type(email)
        this.password.type(password)
        this.submit.click()
    }
    get loginTitle() {
        return cy.get("h3")
    }
}

export const authLogin = new AuthLogin();