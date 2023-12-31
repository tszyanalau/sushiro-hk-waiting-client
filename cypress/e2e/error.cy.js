const { onBeforeLoad } = require('../helper').default;

describe('Google Map Test', () => {
  beforeEach(() => {
    cy.visit('/', { onBeforeLoad });
  });

  it('should not load google map but error components after API fetch error', () => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/store`, { forceNetworkError: true }).as('apiRequest');
    cy.wait('@apiRequest');
    cy.get('#map').should('be.empty');
    cy.get('#map').should('have.class', 'error');
    cy.get('#map-filter').should('not.exist');
    cy.contains('發生錯誤，請稍後再試。').should('be.visible');
  });
});
