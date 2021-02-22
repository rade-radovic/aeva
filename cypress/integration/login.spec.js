/// <reference types="Cypress" />
import { authLogin } from '../page_objects/login_object'
import { header } from '../page_objects/header.object'

describe('Login', () => {

    beforeEach("Visit Aeva app", () => {
        cy.visit('/')
        cy.url().should("contains", 'login')
    })

    it('login using valid credentials', () => {
        authLogin.login("org1@test.com", "test1234!Y")
        header.contactSettingsButton.should('be.visible')
    })

    it('Login with wrong password', () => {
        authLogin.login("org1@test.com", "testtest")
        authLogin.loginTitle.should('be.visible')
    })

    it('Login with wrong email', () => {
        authLogin.login("wronguser@test.com", "test1234!Y")
        authLogin.loginTitle.should('be.visible')
    })

    it('Login with wrong credentials', () => {
        authLogin.login("wronguser@test.com", "testest")
        authLogin.loginTitle.should('be.visible')
    })

    it('Login with empty password', () => {
        authLogin.email.type("org1@test.com")
        authLogin.submit.click()
        authLogin.loginTitle.should('be.visible')  //da li ovo u page object ili ovako?
    })

    it('Login with empty email', () => {
        authLogin.password.type("test1234!Y")
        authLogin.submit.click()
        authLogin.loginTitle.should('be.visible')
    })

    it('sql injection 105', () => {
        authLogin.login("105 OR 1=1", "test1234!Y")
        authLogin.loginTitle.should('be.visible')   //nisam siguran za asertaciju  
    })

    it('logout', ()=> {
        authLogin.login("org1@test.com", "test1234!Y")
        header.logoutButton.click()
        authLogin.loginTitle.should('be.visible')
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

})