
context('Build Page', () => {

    beforeEach(() => {
        cy.fixture('partsResponse').as('partsResponse');
        cy.server();
        cy.route({
            method: 'GET',
            url: 'parts',
            response: '@partsResponse'
        }).as('getPartsApi');
    })

    it('visiting the route the page should not error', () => {
        cy.visit(Cypress.env().url + 'build');
        cy.get('#app').find('header');
    })

    it('visiting the route the page should show the first head', () => {
        cy.visit(Cypress.env().url + 'build');
        cy.get('.top a').find('img').should('have.attr', 'src', '/api/images/head-big-eye.png')
    })

    it('visiting the route the page should show the first arm', () => {
        cy.visit(Cypress.env().url + 'build');
        cy.get('.left a').find('img').should('have.attr', 'src', '/api/images/arm-articulated-claw.png')
    })

    it('visiting the route the page should show the first torso', () => {
        cy.visit(Cypress.env().url + 'build');
        cy.get('.center a').find('img').should('have.attr', 'src', '/api/images/torso-flexible-gauged.png')
    })

    it('visiting the route the page should show the first right arm', () => {
        cy.visit(Cypress.env().url + 'build');
        cy.get('.right a').find('img').should('have.attr', 'src', '/api/images/arm-articulated-claw.png')
    })

    it('visiting the route the page should show the first base', () => {
        cy.visit(Cypress.env().url + 'build');
        cy.get('.bottom a').find('img').should('have.attr', 'src', '/api/images/base-double-wheel.png')
    })
})
//cy.fixture('goodLoginResponse').as('goodLoginResponse');