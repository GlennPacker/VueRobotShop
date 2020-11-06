/// <reference types="cypress" />

context('Home page', () => {
    it('should contain the spa application container', () => {
        cy.visit(Cypress.env().url);
        cy.get('#app');
    })

    it('should contain the main navigation', () => {
        cy.visit(Cypress.env().url);
        cy.get('#app').find('header');
    })

    it('should contain the main spa application window', () => {
        cy.visit(Cypress.env().url);
        cy.get('#app').find('.container');
    })

    it('should highlight that the build a bot link is the currently active route', () => {
        cy.visit(Cypress.env().url);
        cy.get('a.router-link-active').contains('Build-a-Bot');
    })

    it('should highlight only 1 active route', () => {
        cy.visit(Cypress.env().url);
        cy.get('a.router-link-active').should('have.length', 1);
    })

    it('should have the standard sidebar', () => {
        cy.visit(Cypress.env().url);
        cy.get('.sidebar').should('have.class', 'standard');
    })

    it('should have the home view', () => {
        cy.visit(Cypress.env().url);
        cy.get('main').find('.home');
    })
})