class Funnels {

    get addFunnel() {
        return cy.get("span[class='anticon anticon-plus']")
    }

    get funnelTitle() {
        return cy.get("#add-board-ref_boardTitle")
    }

    get add() {
        return cy.get("button[type='submit']")
    }

    get rename() {
        return cy.get('.ant-dropdown-menu > :nth-child(1) > :nth-child(2)')
    }

    get delete() {
        return cy.get('.ant-dropdown-menu > :nth-child(2) > :nth-child(2)')
    }

    get renameField() {
        return cy.get("#renameField_title")
    }

    get confirmDelete(){
        return cy.get(".ant-btn-primary")
    } 

    get removeContact(){
        return cy.get('.ant-dropdown-menu > :nth-child(2)')
    }

    get errorMessage(){
        return cy.get('.ant-message-notice-content')
    }

    funnelBody(funnelID){
        return cy.get(`#board-dropzone${funnelID}`)
    }

    contact(contactID){
        return cy.get(`[data-rbd-draggable-id="${contactID}"] > .ant-card > .ant-card-body`)
    }

    contactOptions(contactID){
        return cy.get(`[data-rbd-draggable-id="${contactID}"] > .ant-card > .ant-card-body > :nth-child(1) > :nth-child(2)`)
    }

    addContact(title, id){
        return cy.get(`[data-rbd-draggable-id="${title}${id}"] > .board-add`)
    }

    funnelOptions (title, id) {
        return cy.get(`[data-rbd-draggable-id="${title}${id}"] > .board-title > .ant-dropdown-trigger > .anticon > svg`)
    }

    addNewFunnel(funnelTitle){
        this.addFunnel.click()
        this.funnelTitle.should('be.visible').type(funnelTitle)
        this.add.click()
    }

    movePiece (title, id, x, y) {
        cy.get(`div[data-rbd-drag-handle-draggable-id='${title}${id}']`)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: x, clientY: y })
        .trigger('mouseup', { force: true })
    }

    removeContactfunction(contactID){
        this.contactOptions(contactID).click()
        this.removeContact.click()
        this.confirmDelete.click()
    }

}

export const funnels = new Funnels();