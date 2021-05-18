class NewContact {

    get newContactButton(){ 
        return cy.get("button[class='ant-btn ant-btn-primary ant-btn-icon-only ant-btn-background-ghost']").eq(3)
    }
    get name() {
        return cy.get("#create_contact_form_name")
    }
    get phoneNumber() {
        return cy.get("#create_contact_form_phone_number")
    }
    get email() {
        return cy.get("#create_contact_form_email")
    }
    get contactOwner() {
        return cy.get("#create_contact_form_contact_owner")
    }
    get status() {
        return cy.get("#create_contact_form_status")
    }
    get submit() {
        return cy.get("button[type='submit']")
    }
    get cancel() {
        return cy.get("button[class='ant-btn']")
    }

    createNewContact(name, phone, email) {
        this.name.type(name)
        this.phoneNumber.type(phone)
        this.email.type(email)
        this.submit.click({force : true})
    }

}

export const newContact = new NewContact();