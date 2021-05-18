/// <reference types="Cypress" />
import { contacts } from '../page_objects/contacts.object'
import { newContact } from '../page_objects/new_contact_objects'
import { authLogin } from '../page_objects/login_object'

require('cypress-plugin-tab')
import "cypress-enter-plugin";


const Data = require('../fixtures/data.json')

describe('New Contact', () => {

    beforeEach("Login and click ", () => {
        cy.visit('/')
        authLogin.login(Data.Login.Email, Data.Login.Password)
        contacts.newContactButton.click()
    })

    it("Create new Contact", () => {
        
        cy.intercept('POST', 'https://aeva-api.vivifyideas.com/api/v1/contacts/').as('successfulNewContact')
        newContact.createNewContact(Data.NewContact.Name, Data.NewContact.Phone, Data.NewContact.Email)
        // newContact.name.type(Data.NewContact.Name)
        // newContact.phoneNumber.type(Data.NewContact.Phone)
        // newContact.email.type(Data.NewContact.Email)
        // newContact.contactOwner.type('dfdf')
        // newContact.contactOwner.type('{enter}')
        // newContact.contactOwner.then(($nav) => {
        //     cy.wrap($nav).type('{enter}')
        // }) 
        // cy.wrap('iframe[class="spec-iframe"]').find(newContact.submit).click()
        
        // newContact.submit.focus().type("{enter}");
     
        
        cy.wait('@successfulNewContact').then((interception) => {
            cy.log(interception)
            expect(interception.response.statusCode).to.equal(201); 
            expect(interception.response.body.name).to.equal(Data.NewContact.Name)
            expect(interception.response.body.phone_number).to.equal(Data.NewContact.Phone)
            console.log(interception.response.body)
        })
        
    })


    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
})