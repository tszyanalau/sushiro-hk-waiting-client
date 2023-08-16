const { onBeforeLoad } = require('../helper').default;

describe('Navigation Test', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('i18nextLng', 'zh-HK');
    });
    cy.visit('/', { onBeforeLoad });
  });

  it('should navigate to the disclaimer page', () => {
    cy.visit('/disclaimer', { failOnStatusCode: false, onBeforeLoad });
    cy.contains('免責聲明').should('be.visible');
  });

  it('should be disabled and cannot be navigated', () => {
    cy.visit('/', { onBeforeLoad });
    cy.contains('zh').should('have.class', 'disabled');
    cy.contains('zh').click({ force: true });
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should navigate back to the home page', () => {
    cy.visit('/', { onBeforeLoad });
    cy.contains('香港壽司郎等侯組數地圖').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should navigate back to the home page and change to ja', () => {
    cy.visit('/', { onBeforeLoad });
    cy.contains('ja').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.contains('香港スシローお待ち組数マップ').should('be.visible');
    cy.get('title').should('contain', '香港スシローお待ち組数マップ');
    cy.get('html').should('have.attr', 'lang', 'ja');
    cy.visit('/disclaimer', { failOnStatusCode: false, onBeforeLoad });
    cy.contains('免責事項').should('be.visible');
  });

  it('should navigate back to the home page', () => {
    cy.visit('/abc', { failOnStatusCode: false, onBeforeLoad });
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
