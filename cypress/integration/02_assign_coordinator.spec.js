/* eslint-disable testing-library/await-async-utils */
/* eslint-disable jest/valid-title */
/* eslint-disable no-undef */
describe('check assign coordinator', () => {
  it('it must into the system with correct username and password', () => {
    cy.login('yideg', 'PASSabc123!');
  });
  it('it must go to admin page and staff list page', () => {
    cy.assignCoord();
  });
  it('to check for a fixture', () => {
    cy.login('yideg', 'PASSabc123!');
  });
  it('use fixture for assign coordinator', () => {
    cy.intercept('GET', '**/api/staffs', async (req) => {
      req.reply({
        fixture: 'list_staffs.json'
      });
    }).as('stuffs');
    cy.wait('@stuffs');
    cy.assignCoord();
  });
});
