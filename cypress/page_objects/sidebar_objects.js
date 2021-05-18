class Sidebar {

    get contacts() {
        return cy.get("a[href='/dashboard/contacts']")
    }

    get conversations() {
        return cy.get("a[href='/dashboard/conversations']")
    }

    get funnels() {
        return cy.get("a[href='/dashboard/funnels']")
    }

    get funnels() {
        return cy.get("a[href='/dashboard/funnels']")
    }

    get marketing() {
        return cy.get("div[class='ant-menu-submenu-title']") // try add contains "Marketing"
    }

    get campaigns() {
        return cy.get("a[href='/dashboard/campaigns']") 
    }

    get htmlBuilder() {
        return cy.get("a[href='/dashboard/email-builder']") 
    }

    get smsTemplates() {
        return cy.get("a[href='/dashboard/sms-builder']") 
    }

    get calendar() {
        return cy.get("a[href='/dashboard/calendar']") 
    }

    get settings() {
        return cy.get("a[href='/dashboard/settings']") 
    }

    movePiece (title, id, x, y) {
        cy.get(`div[data-rbd-drag-handle-draggable-id='${title}${id}']`)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: x, clientY: y })
        .trigger('mouseup', { force: true })
    }




}

export const sidebar = new Sidebar();