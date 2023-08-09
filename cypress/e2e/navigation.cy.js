describe('Navigation Test', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('i18nextLng', 'zh-HK');
    });
  });

  it('should navigate to the disclaimer page', () => {
    cy.visit('/disclaimer', { failOnStatusCode: false });
    cy.contains('免責聲明').should('be.visible');
  });

  it('should be disabled and cannot be navigated', () => {
    cy.visit('/');
    cy.contains('zh').should('have.class', 'disabled');
    cy.contains('zh').click({ force: true });
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should navigate back to the home page', () => {
    cy.visit('/');
    cy.contains('香港壽司郎等侯組數地圖').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should navigate back to the home page and change to zh-HK', () => {
    cy.visit('/');
    cy.contains('ja').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.contains('香港スシローお待ち組数マップ').should('be.visible');
  });

  it('should navigate back to the home page', () => {
    cy.visit('/abc', { failOnStatusCode: false });
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
