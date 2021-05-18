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
    
    movePiece (title, id, x, y) {
        cy.get(`div[data-rbd-drag-handle-draggable-id='${title}${id}']`)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { which: 1, pageX: x, pageY: y })
        .trigger('mouseup', { force: true })
    }

}

export const funnels = new Funnels();