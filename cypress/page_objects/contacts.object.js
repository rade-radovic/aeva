class Contacts {
    get contacts(){
        return cy.get("a[href='/dashboard/contacts']")
    }
    get funnels(){
        return cy.get("a[href='/dashboard/funnels']")
    }
    get automation(){
        return cy.get("a[href='/dashboard/automation']")
    }
    get settings(){
        return cy.get("a[href='/dashboard/settings']")
    }
    get contactSettingsButton(){
        return cy.get("button[class='ant-btn ant-btn-primary ant-btn-icon-only ant-btn-background-ghost']").eq(1)
    }
    get deleteContactButton(){
        return cy.get("button[class='ant-btn ant-btn-primary ant-btn-icon-only ant-btn-background-ghost']").eq(0)
    }
    get newContactButton(){
        return cy.get(":nth-child(5) > .ant-btn > span")
    }
    get logoutButton(){
        return cy.get("li[class='ant-menu-item ant-menu-item-only-child']").eq(3)
    }

    logout(){
        this.logoutButton.click()
    }

}

export const contacts = new Contacts()