describe('User Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const roleSelect = () => cy.get('select[name=role]')
    const tosInput = () => cy.get('input[name=tos]')
    const submitBtn = () => cy.get('button[name=submit]')

    it('the proper elements exsist', () => {
        nameInput().should('exist')
        emailInput().should('exist')
        passwordInput().should('exist')
        roleSelect().should('exist')
        tosInput().should('exist')
        submitBtn().should('exist')
    })

    describe('Filling out the form', () => {
        it('submit button starts disabled', () => {
            submitBtn().should('be.disabled')
        })
    })
})