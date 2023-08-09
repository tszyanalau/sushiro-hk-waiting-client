const data = require('../../src/mockData/store.json');

const mockResponseBody = { body: { ...data, timestamp: 1691312155034 } };

const verifyResponseBody = (interception) => {
  expect(interception.response.statusCode).to.equal(200);
  const responseBody = interception.response.body;
  expect(responseBody).to.have.property('data').and.to.be.an('array');
  expect(responseBody).to.have.property('timestamp').and.to.be.a('number');
  const dataArray = interception.response.body.data;
  dataArray.forEach((item) => {
    expect(item).to.have.property('id').and.to.be.a('number');
    expect(item).to.have.property('name').and.to.be.a('string');
    expect(item).to.have.property('address').and.to.be.a('string');
    expect(item).to.have.property('area').and.to.be.a('string');
    expect(item).to.have.property('region').and.to.be.a('string');
    expect(item).to.have.property('latitude').and.to.be.a('number');
    expect(item).to.have.property('longitude').and.to.be.a('number');
    expect(item).to.have.property('waitingGroup').and.to.be.a('number');
    expect(item).to.have.property('open').and.to.be.a('boolean');
    expect(item).to.have.property('localTicketing').and.to.be.a('boolean');
  });
};

describe('API Fetch Test', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('i18nextLng', 'zh-HK');
    });
    cy.intercept('GET', `${Cypress.env('apiUrl')}/store`, mockResponseBody).as('apiRequest');
    cy.visit('/');
  });

  it('should trigger an API fetch on load', () => {
    cy.wait('@apiRequest').then(verifyResponseBody);
  });

  it('should trigger an API fetch after clicking on the button on navbar', () => {
    cy.visit('/');
    cy.wait(5000);
    cy.get('.navbar-nav .refresh-btn').click();
    cy.wait('@apiRequest').then(verifyResponseBody);
  });

  it('should trigger an API fetch after clicking on the button under map', () => {
    cy.visit('/');
    cy.wait(5000);
    cy.get('#map-container .refresh-btn').click();
    cy.wait('@apiRequest').then(verifyResponseBody);
  });

  it('should trigger an API fetch after clicking on the refresh button on info container', () => {
    cy.visit('/');
    cy.wait(5000);
    cy.contains('18').click();
    cy.get('[role="dialog"].offcanvas-end .refresh-btn').click();
    cy.wait('@apiRequest').then(verifyResponseBody);
  });
});
