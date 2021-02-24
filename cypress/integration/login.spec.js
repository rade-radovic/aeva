/// <reference types="Cypress" />
import { authLogin } from '../page_objects/login_object'
import { header } from '../page_objects/header.object'

const Data = require('../fixtures/data.json')

describe('Login', () => {

    beforeEach("Visit Aeva app", () => {
        cy.visit('/')
        cy.url().should("contains", 'login')
    })

    it('login using valid credentials', () => {
        cy.intercept('POST', ' https://aeva-api.vivifyideas.com/api/v1/login/', 
        (req) =>{
        }).as('succesfullLogin')
        authLogin.login(Data.Login.Email, Data.Login.Password)
        header.contactSettingsButton.should('be.visible')
        cy.wait('@succesfullLogin').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(localStorage.getItem('token')).to.have.length.of.at.least(50)
        })
    })

    it('Login with wrong password', () => {
        cy.intercept('POST', ' https://aeva-api.vivifyideas.com/api/v1/login/', 
        (req) =>{
        }).as('unSuccesfullLogin')
        authLogin.login(Data.Login.Email, Data.Login.WrongPassword)
        authLogin.loginTitle.should('be.visible')
        cy.wait('@unSuccesfullLogin').then((interception) => {
            expect(interception.response.statusCode).to.equal(401); 
            expect(interception.response.body.detail).to.equal("No active account found with the given credentials")
        })
    })

    it('Login with wrong email', () => {
        cy.intercept('POST', ' https://aeva-api.vivifyideas.com/api/v1/login/', 
        (req) =>{
        }).as('unSuccesfullLogin')
        authLogin.login(Data.Login.WrongEmail, Data.Login.Password)
        authLogin.loginTitle.should('be.visible')
        cy.wait('@unSuccesfullLogin').then((interception) => {
            expect(interception.response.statusCode).to.equal(401); 
            expect(interception.response.body.detail).to.equal("No active account found with the given credentials")
        })
    })

    it('Login with invalid email', () => {
        authLogin.login(Data.Login.InvalidEmal, Data.Login.Password)
        authLogin.loginTitle.should('be.visible')
        authLogin.invalidEmailValidation.should('have.text', 'Email Address must be a valid email')    
    })

    it('Login with wrong credentials', () => {
        cy.intercept('POST', 'https://aeva-api.vivifyideas.com/api/v1/login/', 
        (req) =>{
        }).as('unSuccesfullLogin')
        authLogin.login(Data.Login.WrongEmail, Data.Login.WrongPassword)
        authLogin.loginTitle.should('be.visible')
        cy.wait('@unSuccesfullLogin').then((interception) => {
            expect(interception.response.statusCode).to.equal(401); 
            expect(interception.response.body.detail).to.equal("No active account found with the given credentials")
        })
        
    })

    it('Login with empty password', () => {
        authLogin.email.type(Data.Login.Email)
        authLogin.submit.click()
        authLogin.loginTitle.should('be.visible')
        authLogin.emptyPasswordValidation.should('have.text', 'Password is required')
    })

    it('Login with empty email', () => {
        authLogin.password.type(Data.Login.Password)
        authLogin.submit.click()
        authLogin.loginTitle.should('be.visible')
        authLogin.emptyEmailValidation.should('have.text', 'Email Address is required')
    })

    // it('sql injection 105', () => {
    //     authLogin.login("105 OR 1=1", "test1234!Y")
    //     authLogin.loginTitle.should('be.visible')   //nisam siguran za asertaciju  
    // })

    // it.only('SQL injection 105', () => {
    //     cy.request('POST', 'https://aeva-api.vivifyideas.com/api/v1/login/', {
    //         email:"105 OR 1=1",
    //         password: Data.Login.Password,
    //         failOnStatusCode: false 
    //     }).its('body').then((responseBody) => {
    //         console.log(responseBody)
    //     })
    // })

    it.only('SQL injection 105', () => {
        cy.request({
            method: 'POST',
            url: 'https://aeva-api.vivifyideas.com/api/v1/login/',
            failOnStatusCode: false,
            body:
            {
                username: '105 OR 1=1',
                password: Data.Login.Password,
            }
        }).then((response) => {
            expect(response.body.detail).to.equal('No active account found with the given credentials')
            expect(response.status).to.equal(401)
        })
    })



    it('logout', ()=> {
        cy.intercept('POST', ' https://aeva-api.vivifyideas.com/api/v1/logout/', 
        (req) =>{
        }).as('succesfullLogout')
        authLogin.login(Data.Login.Email, Data.Login.Password)
        header.logoutButton.click()
        authLogin.loginTitle.should('be.visible')
        cy.wait('@succesfullLogout').then((interception) => {
            expect(interception.response.statusCode).to.equal(204);
        })
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

})