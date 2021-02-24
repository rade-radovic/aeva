/// <reference types="Cypress" />
import { header } from '../page_objects/header.object'
import { newContact } from '../page_objects/new_contact_objects'

const Data = require('../fixtures/data.json')

describe('New Contact', () => {

    beforeEach("Login and click ", () => {
        cy.visit('/')
        authLogin.login(Data.Login.Email, Data.Login.Password)
        header.newContactButton.click()
    })

    it("Create new Contact", () => {
        
    })
})