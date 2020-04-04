describe('Welcome screen tests', () => {
    it('button should navigate to the survey', () => {
        cy.visit('/home')
        
        cy.get('[data-cy="go-to-survey"]').click()

        cy.url().should('include', '/survey')
    })
    it('button should navigate to the map', () => {
        cy.visit('/home')
        
        cy.get('[data-cy="go-to-map"]').click()

        cy.url().should('include', '/map')
    })
})