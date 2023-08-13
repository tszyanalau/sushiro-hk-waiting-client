const data = require('../../src/mockData/store.json');

const mockResponse = { delay: 1000, body: { ...data, timestamp: 1691312155034 } };

describe('Google Map Test', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('i18nextLng', 'zh-HK');
    });
    cy.intercept('GET', `${Cypress.env('apiUrl')}/store`, mockResponse).as('apiRequest');
    cy.visit('/');
  });

  it('should not load google map but loading components before API fetch', () => {
    cy.get('#map').should('be.empty');
    cy.get('#map-filter').should('not.exist');
    cy.get('.spinner-border').should('exist');
    cy.get('.navbar-nav .refresh-btn').should('have.class', 'disabled');
  });

  it('should load google map and related components after API fetch', () => {
    cy.wait('@apiRequest');
    cy.get('#map').should('not.be.empty');
    cy.get('#map-filter').should('be.visible');
    cy.contains('最後更新：2023年8月6日(週日) 16:55:55').should('be.visible');
    cy.get('[role="dialog"]').should('not.exist');
    cy.get('button.marker').should('have.length', 23);
    cy.get('button.marker.btn-tier-2').should('have.length', 5);
    cy.get('#map-filter input').should('have.length', 7);
    cy.get('#map-filter input[disabled]').should('have.length', 1);
    cy.get('[value="100組或以上"]').should('have.attr', 'disabled');
  });

  it('should filter the stores with selected tier', () => {
    cy.wait('@apiRequest');
    cy.get('[value="無需等候"]').click();
    cy.get('button.marker').should('have.length', 20);
    cy.get('[value="無需等候"]').click();
    cy.get('button.marker').should('have.length', 23);
  });

  it('should show respective store information after clicking the marker', () => {
    cy.wait('@apiRequest');
    cy.contains('18').click();
    cy.get('[role="dialog"].offcanvas-end').should('have.length', 1);
    cy.contains('元朗廣場店').should('be.visible');
    cy.contains('營業中').should('be.visible');
    cy.contains('接受取票').should('be.visible');
    cy.get('.waiting-group').should('contain', 18);
    cy.get('.text-tier-2').should('exist');
  });

  it('should hide respective store information after clicking the close button', () => {
    cy.wait('@apiRequest');
    cy.contains('18').click();
    cy.get('[role="dialog"].offcanvas-end button[aria-label="Close"]').click();
    cy.get('[role="dialog"].offcanvas-end').should('not.exist');
  });

  it('should fetch data after clicking the refresh button', () => {
    cy.wait('@apiRequest');
    cy.contains('18').click();
    cy.get('.offcanvas-end button').contains('更新').click();
    cy.wait('@apiRequest');
  });

  it('should show respective store information at bottom after clicking the marker', () => {
    cy.viewport('ipad-2');
    cy.wait('@apiRequest');
    cy.contains('18').click();
    cy.get('[role="dialog"].offcanvas-bottom').should('have.length', 1);
  });
});
