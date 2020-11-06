
context('Build Page', () => {
    it('should show loading when api has not returned', ()  => {
        cy.fixture('partsResponse').as('partsResponse');
        cy.server();
        cy.route({
            method: 'GET',
            url: 'parts',
            response: '@partsResponse',
            delay: 1000
        }).as('getPartsApi');

        cy.visit(Cypress.env().url + 'build');
        cy.get('[data-cy=loading]')

    })

    context('with api call complete (part data)', ()=> {
        beforeEach(() => {
            cy.fixture('partsResponse').as('partsResponse');
            cy.server();
            cy.route({
                method: 'GET',
                url: 'parts',
                response: '@partsResponse'
            }).as('getPartsApi');

            cy.visit(Cypress.env().url + 'build');
            cy.wait('@getPartsApi');
        })

        it('visiting the route the page should not error', () => {
            cy.get('#app').find('header');
        })

        it('visiting the route the page should show the first head', () => {
            cy.get('.top a').find('img').should('have.attr', 'src', '/api/images/head-big-eye.png')
        })

        it('visiting the route the page should show the first arm', () => {
            cy.get('.left a').find('img').should('have.attr', 'src', '/api/images/arm-articulated-claw.png')
        })

        it('visiting the route the page should show the first torso', () => {
            cy.get('.center a').find('img').should('have.attr', 'src', '/api/images/torso-flexible-gauged.png')
        })

        it('visiting the route the page should show the first right arm', () => {
            cy.get('.right a').find('img').should('have.attr', 'src', '/api/images/arm-articulated-claw.png')
        })

        it('visiting the route the page should show the first base', () => {
            cy.get('.bottom a').find('img').should('have.attr', 'src', '/api/images/base-double-wheel.png')
        })

        context('click hanlders on the part switchers', () => {
            context('Head', () => {
                it('gets the previous in the array', () => {
                    cy.get('.top .prev-selector').click()
                    cy.get('.top a').find('img').should('have.attr', 'src', '/api/images/head-surveillance.png')
                })

                it('gets the previous in the array', () => {
                    cy.get('.top .next-selector').click()
                    cy.get('.top a').find('img').should('have.attr', 'src', '/api/images/head-friendly.png')
                })
            })

            context('Left Arm', () => {
                it('gets the next in the array', () => {
                    cy.get('.left .next-selector').click()
                    cy.get('.left a').find('img').should('have.attr', 'src', '/api/images/arm-dual-claw.png')
                })

                it('gets the previous in the array', () => {
                    cy.get('.left .prev-selector').click()
                    cy.get('.left a').find('img').should('have.attr', 'src', '/api/images/arm-stubby-claw.png')
                })
            })

            context('Torso', () => {
                it('gets the next in the array', () => {
                    cy.get('.center .next-selector').click()
                    cy.get('.center a').find('img').should('have.attr', 'src', '/api/images/torso-gauged.png')
                })

                it('gets the previous in the array', () => {
                    cy.get('.center .prev-selector').click()
                    cy.get('.center a').find('img').should('have.attr', 'src', '/api/images/torso-pouch.png')
                })
            })

            context('Right Arm', () => {
                it('gets the next in the array', () => {
                    cy.get('.right .next-selector').click()
                    cy.get('.right a').find('img').should('have.attr', 'src', '/api/images/arm-dual-claw.png')
                })

                it('gets the previous in the array', () => {
                    cy.get('.right .prev-selector').click()
                    cy.get('.right a').find('img').should('have.attr', 'src', '/api/images/arm-stubby-claw.png')
                })
            })
        })
    })

})
//cy.fixture('goodLoginResponse').as('goodLoginResponse');