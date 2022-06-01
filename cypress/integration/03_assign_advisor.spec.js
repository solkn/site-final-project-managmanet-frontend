/* eslint-disable no-undef */
/* eslint-disable jest/valid-title */
describe('check assign advisor', () => {
  it('it must login into the system and assign advisor from asa coordinator', () => {
    cy.login('staff1', 'Y4CF3472sD');
  });
  it('it must go to coordiantor page and assign advisor', () => {
    cy.assignAdv();
  });
  it('it must login into the system & assign advisor from asa coordinator', () => {
    cy.login('staff1', 'Y4CF3472sD');
  });
  it('it should not allow coordinator to assign advisor with one letter suggested', () => {
    cy.get('[data-cy="gotogroup"]')
    .click()
    .get('[data-cy="groups"]')
    .last()
    .click()
    .get('[data-cy="addadvisor"]')
    .click()
    .get('[data-cy="advisorauto"]')
    .click();
   cy.contains('y')
    .then((option) => {
      option[0].click();
    })
    .get('[data-cy="addadvisorbtn"]');
  });
  it('it must login into the system && assign advisor from asa coordinator', () => {
    cy.login('staff1', 'Y4CF3472sD');
  });
  it('it should not allow coordinator to assign advisor with empty value', () => {
    cy.get('[data-cy="gotogroup"]')
    .click()
    .get('[data-cy="groups"]')
    .last()
    .click()
    .get('[data-cy="addadvisor"]')
    .click()
    .get('[data-cy="addadvisorbtn"]').click()
  });
});
