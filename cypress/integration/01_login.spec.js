/* eslint-disable jest/valid-title */
/* eslint-disable no-undef */

describe('renders login page', () => {
  // before(function(){
  //     cy.fixture('auth').then(function(data){
  //         this.dat=data
  //     })
  // })

  it('it must not log into the system  with empty username and valid password', () => {
    cy.visit('/login')
      .get('[data-cy="username"]')
      .should('not.be.empty')
      .get('[data-cy="password"]')
      .type('PASSabc123!')
      .should('not.be.empty')
      // .get('[data-cy="username"]').type(this.data.username)
      // .get('[data-cy="password"]').type(this.data.password)
      .get('[data-cy="loginbtn"]')
      .click();
  });
  it('it must not log into the system   with valid username and empty password', () => {
    cy.visit('/login')
      .get('[data-cy="username"]')
      .type('yideg')
      .get('[data-cy="password"]')
      .type('not.be.empty')
      .get('[data-cy="loginbtn"]')
      .click();
  });

  it('it must not log into the system  with invalid username and valid password', () => {
    cy.login('yidegmisganaw', 'PASSabc123!');
  });
  it('it must not log into the system  with valid username and invalid password', () => {
    cy.login('yideg', 'PASSabc123');
  });
  it('it must not log into the system  with invalid username and invalid password', () => {
    cy.login('yide', 'PASSabc123');
  });
  it('it must log into the system with correct username and password', () => {
    cy.login('yideg', 'PASSabc123!');
  });
});
