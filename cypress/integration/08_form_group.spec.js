/* eslint-disable jest/valid-title */
/* eslint-disable no-undef */
describe('check form group', () => {
  it('it must login into the system', () => {
    cy.login('me1', 'v8wp6ucgT2');
  });
  it('student should sould form a group', () => {
    cy.get('[data-cy="gotogroup"]')
      .click()
      .get('[data-cy="creategroupbtn"]')
      .click()
      .get('[data-cy="addbtn"]');
  });
  it('it must login into the system with student credincials', () => {
    cy.login('me1', 'v8wp6ucgT2');
  });
  it('student should souldnot form a group with empty name', () => {
    cy.get('[data-cy="gotogroup"]')
      .click()
      .get('[data-cy="creategroupbtn"]')
      .click()
      .get('[data-cy="addbtn"]')
      // .click();
  });
});
