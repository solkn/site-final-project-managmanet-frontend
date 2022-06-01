/* eslint-disable jest/valid-title */
/* eslint-disable no-undef */
describe('check assign examiner', () => {
  it('it must login into the system and assign examiner from asa coordinator', () => {
    cy.login('staff1', 'Y4CF3472sD');
  });
  it('coordiantor should assign an examiner', () => {
    cy.assignExaminer();
  });

  it('it must login into the system & assign examiner from asa coordinator', () => {
    cy.login('staff1', 'Y4CF3472sD');
  });
  it('it should not allow coordinator to assign examiner with one letter suggested', () => {
    cy.get('[data-cy="gotogroup"]')
      .click()
      .get('[data-cy="groups"]')
      .last()
      .click()
      .get('[data-cy="addexaminer"]')
      .click()
      .get('[data-cy="examinerauto"]')
      .click();
    cy.contains('teodros')
      .then((option) => {
        option[0].click();
      })
      .get('[data-cy="addexaminerbtn"]');
  });
  it('it must login into the system && assign examiner from asa coordinator', () => {
    cy.login('staff1', 'Y4CF3472sD');
  });
  it('it should not allow coordinator to assign examiner with empty value', () => {
    cy.get('[data-cy="gotogroup"]')
    .click()
    .get('[data-cy="groups"]')
    .last()
    .click()
    .get('[data-cy="addexaminer"]')
    .click()
    .get('[data-cy="addexaminerbtn"]')
      .click();
  });
});
