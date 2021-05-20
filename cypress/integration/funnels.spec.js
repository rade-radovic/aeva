/// <reference types="Cypress" />
import { authLogin } from '../page_objects/login_object'
import { sidebar } from '../page_objects/sidebar_objects'
import { funnels } from '../page_objects/funnels_objects'
import { newContact} from '../page_objects/new_contact_objects'

const Data = require('../fixtures/data.json')

const faker = require('faker')

let funnelData = {
    randomTitle: faker.name.title(),
    randomTitle2: faker.name.title(),
    randomFirstName : faker.name.firstName(),
    randomLastName : faker.name.lastName(),
    randomPhoneNumber : faker.phone.phoneNumberFormat(),
    randomEmail : faker.internet.email()
}

let funnelID;
let token;
let contactID;

describe ('funnels', () => {

    beforeEach("Login and click funnels", () => {
        cy.visit('/')
        cy.intercept('POST', 'https://aeva-api.vivifyideas.com/api/v1/login/', 
        (req) =>{
        }).as('succesfullLogin')
        authLogin.login(Data.Login.Email, Data.Login.Password)
        cy.wait('@succesfullLogin').then((interception) => {
            token = interception.response.body.access;
        })
        sidebar.funnels.click({force : true});
    })

    it('add new funnel', () => {
        cy.intercept('POST', ' https://aeva-api.vivifyideas.com/api/v1/funnels/', 
        () =>{
        }).as('succesfullAddFunnel')
        funnels.addNewFunnel(funnelData.randomTitle)
        cy.wait('@succesfullAddFunnel').then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
            expect(interception.response.body.name).to.equal(funnelData.randomTitle)
            funnelID = interception.response.body.id;
        })
    })

    it('add new funnel, emtpty funnel name', () => {
        funnels.addFunnel.click()
        funnels.add.click()
        funnels.errorMessage.contains("Funnel title can't be blank!").should('be.visible')
    })

    it('add new funnel, spaces for funnel title', () => {
        funnels.addNewFunnel("     ")
        funnels.errorMessage.contains("Funnel title can't be blank!").should('be.visible')
    })


    // it('add contact', () => {
    //     cy.intercept('POST', 'https://aeva-api.vivifyideas.com/api/v1/contacts/', () => {
    //     }).as('successfullAddContact')
    //     funnels.addContact(funnelData.randomTitle, funnelID).click()
    //     newContact.createNewContact(funnelData.randomFirstName, Data.NewContact.Phone, funnelData.randomEmail)
    //     cy.wait('@successfullAddContact').then((interception) => {
    //         expect(interception.response.body.name).to.equal(funnelData.randomFirstName)
    //         expect(interception.response.body.phone_number).to.equal(Data.NewContact.Phone)
    //         expect(interception.response.body.email).to.equal(funnelData.randomEmail)
    //     })
    // })

    // it('reorder funnel', () => {
    //     funnels.movePiece(funnelData.randomTitle, funnelID, 400, 180)
    // })

    it('add contact BE', () => {
        let id;
        cy.request ({
            method :'POST', 
            url : `https://aeva-api.vivifyideas.com/api/v1/contacts/`,
            body : {
                custom_fields: [],
                email: funnelData.randomEmail,
                name: funnelData.randomFirstName,
                phone_number: Data.NewContact.Phone,
                status: funnelID
            },
            headers : {
                authorization : `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.body.name).to.equal(funnelData.randomFirstName)
            expect(response.body.phone_number).to.equal(Data.NewContact.Phone)
            expect(response.body.email).to.equal(funnelData.randomEmail)
            expect(response.body.status.id).to.equal(funnelID)
            contactID = response.body.id;
            id = response.body.id;
            
        })
        //.as('successfullAddContact')
        // let as = cy.get('@successfullAddContact').then((interception) => {
        //     return interception.body.id;
        // })

        
        // cy.intercept('GET', `https://aeva-api.vivifyideas.com/api/v1/contacts/${id}/`, () => {
        // }).as('successfulGetContact')
        // funnels.contact(id).should('be.visible').click()
        // cy.wait('@successfulGetContact').then((interception) => {
        //     expect(interception.response.body.name).to.equal(funnelData.randomFirstName)
        //     expect(interception.response.body.phone_number).to.equal(Data.NewContact.Phone)
        //     expect(interception.response.body.email).to.equal(funnelData.randomEmail)
        // })

        

    })

    it('remove contact', () => {
        funnels.contact(contactID).should('be.visible')
        console.log(funnels.contact(contactID))
        funnels.removeContactfunction(contactID)
        cy.request ({
            method :'GET', 
            url : `https://aeva-api.vivifyideas.com/api/v1/contacts/${contactID}/`,
            headers : {
                authorization : `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.body.status).to.equal(null)
        })
        funnels.contact(contactID).should('not.be.visible')
        // expect(funnels.contact(contactID)).to.not.be.visible
    })



    // it('rename funnel FE', () => {
    //     cy.intercept('PUT', `https://aeva-api.vivifyideas.com/api/v1/funnels/${funnelID}/`, 
    //     () =>{
    //     }).as('succesfullRenameFunnel')
    //     funnels.funnelOptions(funnelData.randomTitle, funnelID).click()
    //     funnels.rename.click()
    //     funnels.renameField.clear().type(`${funnelData.randomTitle2}{enter}`)
    //     cy.wait("@succesfullRenameFunnel").then((interception) => {
    //         expect(interception.response.body.name).to.equal(funnelData.randomTitle2)
    //     })
    // })

    it('delete contact', () =>{
        cy.request ({
            method :'POST', 
            url : `https://aeva-api.vivifyideas.com/api/v1/contacts/delete/`,
            body : {
                id: [contactID]
            },
            headers : {
                authorization : `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
        })

    })


    // it('delete funnel FE', () => {
    //     cy.intercept('DELETE', `https://aeva-api.vivifyideas.com/api/v1/funnels/${funnelID}/`, 
    //     () =>{
    //     }).as('succesfullDeleteFunnel')
    //     funnels.funnelOptions(funnelData.randomTitle2, funnelID).click()
    //     funnels.delete.click()
    //     funnels.confirmDelete.click()
    //     cy.wait("@succesfullDeleteFunnel").then((interception) => {
    //         console.log(interception)
    //         expect(interception.response.statusCode).to.equal(200);
            
    //     })
    // })

    it('delete funnel BE', () => {
        cy.request ({
            method :'DELETE', 
            url : `https://aeva-api.vivifyideas.com/api/v1/funnels/${funnelID}/`,
            headers : {
                authorization : `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
        })
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

})