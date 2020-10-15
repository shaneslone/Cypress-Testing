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

    describe('Filling out the form works', () => {
        it('submit button starts disabled', () => {
            submitBtn().should('be.disabled')
        })

        it('can fill out form inputs', () => {
            submitBtn().should('be.disabled')
            nameInput()
                .should('have.value', '')
                .type('Shane Slone')
                .should('have.value', 'Shane Slone')
            emailInput()
                .should('have.value', '')
                .type('slone.shane@gmail.com')
                .should('have.value', 'slone.shane@gmail.com')
            passwordInput()
                .should('have.value', '')
                .type('testpassword')
                .should('have.value', 'testpassword')
            roleSelect()
                .should('have.value', '')
                .select('student')
                .should('have.value', 'student')
            tosInput()
                .should('not.be.checked')
                .check()
                .should('be.checked')
            submitBtn().should('not.be.disabled')
        })
    })

    describe('adding a new user', () => {
        it('submitting the form', () => {
            cy.contains(/Shane Slone/).should('not.exist')
            nameInput().type('Shane Slone')
            emailInput().type('slone.shane@gmail.com')
            passwordInput().type('testpassword')
            roleSelect().select('student')
            tosInput().check()
            submitBtn().click()
            cy.contains(/Shane Slone/).should('exist')
        })
    })
    
    describe('error messages display', () => {
        it('displays an error if password is not 6 chars long', () => {
            cy.contains('Password must me 6 characters long.').should('not.exist')
            passwordInput().type('123')
            cy.contains('Password must me 6 characters long.').should('exist')
        })
        it('displays an error if email is not valid', () => {
            cy.contains('Please enter a valid email.').should('not.exist')
            emailInput().type('my email')
            cy.contains('Please enter a valid email.').should('exist')
        })
    })
    
})