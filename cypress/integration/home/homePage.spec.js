/// <reference types="cypress" />

context('Home page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env().url);
    })

    it('should contain the spa application container', () => {
        cy.get('#app');
    })

    it('should contain the main navigation', () => {
        cy.get('#app').find('header');
    })

    it('should contain the main spa application window', () => {
        cy.get('#app').find('.container');
    })

    it('should highlight that the build a bot link is the currently active route', () => {
        cy.get('a.router-link-active').contains('Build-a-Bot');
    })

    it('should highlight only 1 active route', () => {
        cy.get('a.router-link-active').should('have.length', 1);
    })

    it('should have the standard sidebar', () => {
        cy.get('.sidebar').should('have.class', 'standard');
    })

    it('standard sidebar text is correct', () => {
        cy.get('.sidebar').contains('Standard Sidebar');
    })

    it('standard sidebar text is correct using data-cy', () => {
        cy.get('[data-cy=sidebar-title]').contains('Standard Sidebar');
    })

    it('should have the home view', () => {
        cy.get('main').find('.home');
    })
})