Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url : 'https://aeva-api.vivifyideas.com/api/v1/login/',
        body : {
            username : email,
            password : password
        }
    }).its('body').then((responseBody) => {
        window.localStorage.setItem('token', responseBody.access);  
    })
})