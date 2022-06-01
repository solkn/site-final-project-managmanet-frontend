/* eslint-disable testing-library/await-async-utils */
/* eslint-disable jest/valid-title */
/* eslint-disable no-undef */
describe('registerstudent student', () => {
  beforeEach(() => {
    cy.login('yideg', 'PASSabc123!');
  });

  it('fields must not be empty', () => {
    cy.get('[id="tostudent"]')
      .click()
      .get('[data-cy="addstudentbtn"]')
      .click()
      .get('[data-cy="studentregisterbtn"]')
      .click();
  });
  it('user must login into the system', () => {
    cy.login('yideg', 'PASSabc123!');
  });
  it('it must not registerstudent  with empty first name and all field valid', () => {
    cy.get('[id="tostudent"]')
      .click()
      .get('[data-cy="addstudentbtn"]')
      .click()
      .get('[data-cy="username"]')
      .type('Ana')
      .get('[data-cy="email"]')
      .type('ana@gmail.com')
      .get('[data-cy="first_name"]')
      .should('not.be.empty')
      .get('[data-cy="last_name"]')
      .type('anana')
      .get('[data-cy="studentregisterbtn"]')
      .click();
  });
  it('it must not registerstudent  with empty last name and all field valid', () => {
    cy.get('[id="tostudent"]')
      .click()
      .get('[data-cy="addstudentbtn"]')
      .click()
      .get('[data-cy="username"]')
      .type('Ana')
      .get('[data-cy="email"]')
      .type('ana@gmail.com')
      .get('[data-cy="first_name"]')
      .type('anana')
      .get('[data-cy="last_name"]')
      .should('not.be.empty')
      .get('[data-cy="studentregisterbtn"]')
      .click();
  });

  it('it must not registerstudent  with empty email name and all field valid', () => {
    cy.get('[id="tostudent"]')
      .click()
      .get('[data-cy="addstudentbtn"]')
      .click()
      .get('[data-cy="username"]')
      .type('Ana')
      .get('[data-cy="email"]')
      .should('not.be.empty')
      .get('[data-cy="first_name"]')
      .type('anana')
      .get('[data-cy="last_name"]')
      .type('abebe')
      .get('[data-cy="studentregisterbtn"]')
      .click();
  });
  it('it must not registerstudent  with empty username and all field valid', () => {
    cy.get('[id="tostudent"]')
      .click()
      .get('[data-cy="addstudentbtn"]')
      .click()
      .get('[data-cy="username"]')
      .should('not.be.empty')
      .get('[data-cy="email"]')
      .type('anexx')
      .get('[data-cy="first_name"]')
      .type('anana')
      .get('[data-cy="last_name"]')
      .type('abebe')
      .get('[data-cy="studentregisterbtn"]')
      .click();
  });

  it('it must not registerstudent all field valid', () => {
    cy.intercept('POST', '**/api/students').as('new-student');
    cy.get('[id="tostudent"]')
      .click()
      .get('[data-cy="addstudentbtn"]')
      .click()
      .get('[data-cy="username"]')
      .type('username222132')
      .get('[data-cy="email"]')
      .type('anexx@gmail.com')
      .get('[data-cy="first_name"]')
      .type('anana')
      .get('[data-cy="last_name"]')
      .type('abebe')
      .get('[data-cy="studentregisterbtn"]')
      .click();
    cy.wait('@new-student').its('request.body').should('have.contain', 
    {
      username: 'username222132',
      email: 'anexx@gmail.com',
      first_name: 'anana',
      last_name: 'abebe'
    });
  });

  //   it('it must not registerstudent  with empty last name and all field valid', () => {
  //     cy.get('[id="tostudent"]')
  //       .click()
  //       .get('[data-cy="addstudentbtn"]')
  //       .click()
  //       .get('[data-cy="username"]')
  //       .type('Ana')
  //       .get('[data-cy="email"]')
  //       .type('ana@gmail.com')
  //       .get('[data-cy="first_name"]')
  //       .type('anana')
  //       .get('[data-cy="last_name"]')
  //       .should('not.be.empty')
  //       .get('[data-cy="studentregisterstudentbtn"]')
  //       .click();
  //   });

  //   it('it must not registerstudent  with with invalid Last Name and all field valid',()=>{
  //       cy.registerstudent('Ababe','abebe@gmail.com','Abebe','Abebe2');
  //   });
  //   it('it must not registerstudent  with with valid Last Name and all field valid',()=>{
  //       cy.registerstudent('Ababe','abebe@gmail.com','Abebe','Abebe2');
  //   });
  //   it('it must not registerstudent  with empty  UserName and all field valid',()=>{
  //       cy.registerstudent('Ababe','abebe@gmail.com','Abebe','Abebe2');
  //   });
  //   it('it must not registerstudent  with invalid  UserName and all field valid',()=>{
  //       cy.registerstudent('Ababe','abebe@gmail.com','Abebe','Abebe2');
  //   });
  //   it('it must not registerstudent  with valid  UserName and all field valid',()=>{
  //       cy.registerstudent('Ababe','abebe@gmail.com','Abebe','Abebe2');
  //   });
  //   it('it must not registerstudent  with empty Password and all field valid',()=>{
  //       cy.registerstudent('Ababe','abebe@gmail.com','Abebe','Abebe2');
  //   });
  //   it('it must not registerstudent  with invalid Password and all field valid',()=>{
  //       cy.registerstudent('Ababe','abebe@gmail.com','Abebe','Abebe2');
  //   });
  //   it('it must not registerstudent  with valid Password and all field valid',()=>{
  //       cy.registerstudent('Ababe','abebe@gmail.com','Abebe','Abebe2');
  //   });
  //   it('it must not registerstudent  with empty email and all field valid',()=>{
  //       cy
  //       .get('[data-cy="tostaff"]')
  //       .click()
  //       .get('[data-cy="addstaffbtn"]')
  //       .click()
  //       .get('[data-cy="username"]').type('Ana')
  //       .get('[data-cy="email"]').should('not.be.empty')
  //       .get('[data-cy="first_name"]').type('ani')
  //       .get('[data-cy="last_name"]').type('anana')
  //       .get('[data-cy="staffregisterstudentbtn"]')
  //       .click();
  //   });
  //   it('it must not registerstudent  with invalid email and all field valid',()=>{
  //       cy.registerstudent('Ababe','abebe@gmail.com','Abebe','Abebe2');
  //   });

  //     it('it must  registerstudent staff with valid username and all field valid', () => {
  //       cy.registerstudent('Ababee', 'abebee@gmail.com', 'Abebe', 'Abebe2');
  //     });
});
