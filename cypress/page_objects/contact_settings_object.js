class ContactSettings {

    get customField() {
        return cy.get("a[href='#']")
    }

    get text() {
        return cy.get("li[class='ant-dropdown-menu-item ant-dropdown-menu-item-only-child']").eq(0)
    }

    get dropdown() {
        return cy.get("li[class='ant-dropdown-menu-item ant-dropdown-menu-item-only-child']").eq(1)
    }

    get fieldName() {
        return cy.get("input[id='dynamic_form_item_fieldName']")
    }

    get addField() {
        return cy.get("button[class='ant-btn ant-btn-dashed']")
    }

    get fieldTitle() {
        return cy.get("input[id='dynamic_form_item_names_0']")
    }

    get submit() {
        return cy.get("button[type='submit']")
    }

    get deleteField() {
        return cy.get("svg[data-icon='delete']").eq(1)
    }

    get FieldListItem() {
        return cy.get("li[class='ant-list-item ant-list-item-no-flex']")
    }

    newCustomField(fieldName){
        this.customField.click()
        this.text.click()
        this.fieldName.type(fieldName)
        this.submit.click()
    }

    newDropdownField(fieldName, fieldTitle){
        this.customField.click()
        this.dropdown.click()
        this.fieldName.type(fieldName)
        this.addField.click()
        this.fieldTitle.type(fieldTitle)
        this.submit.click()
    }

    movePiece (number, x, y) {
        cy.get("li[class='ant-list-item ant-list-item-no-flex']").eq(number)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: x, clientY: y })
        .trigger('mouseup', { force: true })
      }

}

export const contactSettings = new ContactSettings();