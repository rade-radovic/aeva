/// <reference types="Cypress" />

import { authLogin } from '../page_objects/login_object'
import { header } from '../page_objects/header.object'
import { contactSettings } from '../page_objects/contact_settings_object'



describe('Contact Settings', () => {

    beforeEach("Login", () => {
        cy.visit('/')
        authLogin.login("space@tet.com", "test1234!T")
    })

    it('Create a custom field', () =>{
        let fieldName = "New Field";
        cy.intercept('POST', 'https://aeva-api.vivifyideas.com/api/v1/contact-settings/', 
        (req) =>{
        }).as('succesfullNewCustomField')
        header.contactSettingsButton.click({force : true})
        contactSettings.newCustomField(fieldName)
        cy.wait('@succesfullNewCustomField').then((interception) => {
            var fieldExist = false;
            for(var i = 0; i < interception.response.body.length; i++){
                if(interception.response.body[i].name === fieldName){
                    fieldExist = true;
                }
            }
            expect(fieldExist).to.be.true;
        })
    })

    it('Spaces for custom field name', () => {
        header.contactSettingsButton.click({force : true})
        contactSettings.newCustomField("       ")
        contactSettings.fieldName.then(($input) => {
            console.log($input)
          })
          //ne znam kako da asertujem ovo. Probao sam da nadjem validacinu poruku, ali za Validation message
          //nadjem Empty string...
    })

    it('Create a custom dropdown field', () =>{
        var fieldName = "New Dropdown Field";
        let fieldTitle = "Option1"
        cy.intercept('POST', 'https://aeva-api.vivifyideas.com/api/v1/contact-settings/', 
        (req) =>{
        }).as('succesfullNewCustomField')
        header.contactSettingsButton.click({force : true})
        contactSettings.newDropdownField(fieldName, fieldTitle)
        cy.wait('@succesfullNewCustomField').then((interception) => {
            var fieldExist = false;
            for(var i = 0; i < interception.response.body.length; i++){
                if(interception.response.body[i].name === fieldName){
                    fieldExist = true;
                }
            }
            expect(fieldExist).to.be.true;
        })
    })

    it('Delete the custom field', () => {
        header.contactSettingsButton.click({force : true})
        contactSettings.deleteField.click()
        //nisam uhvatio dugme
        //failed because this element is detached from the DOM.
    })

    it.only('Move Field from second to first position', () => {
        header.contactSettingsButton.click({force : true})
        contactSettings.movePiece(1, 60, 0)
        //failed because this element is detached from the DOM.
    })



    





    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })


})