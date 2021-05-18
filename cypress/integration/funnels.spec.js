/// <reference types="Cypress" />
import { authLogin } from '../page_objects/login_object'
import { sidebar } from '../page_objects/sidebar_objects'
import { funnels } from '../page_objects/funnels_objects'

const Data = require('../fixtures/data.json')

const faker = require('faker')

let funnelData = {
    randomTitle: faker.name.title() 
}

let funnelID;
let token;

describe ('funnels', () => {

    beforeEach("Login and click ", () => {
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
        (req) =>{
        }).as('succesfullAddFunnel')
        funnels.addFunnel.click()
        funnels.funnelTitle.should('be.visible').type(funnelData.randomTitle)
        funnels.add.click()
        cy.wait('@succesfullAddFunnel').then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
            expect(interception.response.body.name).to.equal(funnelData.randomTitle)
            funnelID = interception.response.body.id;
        })
    })

    it('reorder funnel', () => {
        funnels.movePiece(funnelData.randomTitle, funnelID, 400, 180)
    })

    it('delete funnel', () => {
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