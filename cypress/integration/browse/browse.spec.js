context('Browse', () => {
    it('should srender the route of browse', () => {
        cy.visit(Cypress.env().url + 'parts/Browse');
    })

    it('should render the part headings', () => {
        cy.visit(Cypress.env().url + 'parts/Browse');

        cy.get('[data-cy=heads]')
        cy.get('[data-cy=arms]')
        cy.get('[data-cy=torsos]')
        cy.get('[data-cy=bases]')
    })

    it('clicking heads should redirect to parts/browse/heads', () => {
        cy.visit(Cypress.env().url + 'parts/Browse');
        cy.get('[data-cy=heads]').click();
        cy.url().should('include', '/parts/browse/heads')
    })

    it('clicking arms should redirect to parts/browse/arms', () => {
        cy.visit(Cypress.env().url + 'parts/Browse');
        cy.get('[data-cy=arms]').click();
        cy.url().should('include', '/parts/browse/arms')
    })

    it('clicking torsos should redirect to parts/browse/torsos', () => {
        cy.visit(Cypress.env().url + 'parts/Browse');
        cy.get('[data-cy=torsos]').click();
        cy.url().should('include', '/parts/browse/torsos')
    })

    it('clicking bases should redirect to parts/browse/bases', () => {
        cy.visit(Cypress.env().url + 'parts/Browse');
        cy.get('[data-cy=bases]').click();
        cy.url().should('include', '/parts/browse/bases')
    })
})