/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('[data-cy="username"]').type(username);
  cy.get('[data-cy="password"]').type(password);
  cy.get('[data-cy="loginbtn"]').click();
  
});

Cypress.Commands.add('assignCoord', () => {
  cy.get('[data-cy="tostaff"]')
    .click()
    .get('#tablerow')
    .first()
    .get('#tablecell')
    .get('#c_moreiconbutton')
    .click()
    .get('[data-cy="c_assignbutton"]');
  // .click();
});

Cypress.Commands.add('assignAdv', () => {
  cy.get('[data-cy="gotogroup"]')
    .click()
    .get('[data-cy="groups"]')
    .last()
    .click()
    .get('[data-cy="addadvisor"]')
    .click()
    .get('[data-cy="advisorauto"]')
    .click();
   cy.contains('abebe')
    .then((option) => {
      option[0].click();
    })
    .get('[data-cy="addadvisorbtn"]');
  // .click()
});

Cypress.Commands.add('assignExaminer', () => {
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
    .get('[data-cy="addexaminerbtn"]')
    // .click();
});

Cypress.Commands.add('formGroup', (name) => {
  cy.get('[data-cy="gotogroup"]')
    cy
    .visit('/login')
    .get('[data-cy="username"]').type(username)
    .get('[data-cy="password"]').type(password)
    .get('[data-cy="loginbtn"]')
    .click();

});

// Cypress.Commands.add('assign', () => {
//   cy
//   .get('[id="tostaff"]')
//   .click()
//   .get('[data-cy="creategroupbtn"]')
//   .click()
//   cy.get('[data-cy="groupname"]').type(name)
//   .get('[data-cy="addbtn"]')
//   .click()
  
// });




Cypress.Commands.add(
  'getByDataCy', (dataCy) => cy.get(`[data-cy=${dataCy}]`)
);


Cypress.Commands.add('registerstudent', (username, email,first_name,last_name) => {
  cy
  .get('[data-cy="tostudent"]')
  .click()
  .get('[data-cy="addstudentbtn"]')
  .click()
  .get('[data-cy="first_name"]').type(first_name)
  .get('[data-cy="last_name"]').type(last_name)
  .get('[data-cy="username"]').type(username)
  .get('[data-cy="email"]').type(email)
  .get('[data-cy="studentregisterstudentbtn"]')
  .click();
  
});
Cypress.Commands.add('register', (username, email,first_name,last_name) => {
    cy
    .get('[data-cy="tostaff"]')
    .click()
    .get('[data-cy="addstaffbtn"]')
    .click()
    .get('[data-cy="username"]').type(username)
    .get('[data-cy="email"]').type(email)
    .get('[data-cy="first_name"]').type(first_name)
    .get('[data-cy="last_name"]').type(last_name)
    .get('[data-cy="staffregisterbtn"]')
    .click();
    
 });

 Cypress.Commands.add('viewgroups', () => {
    cy
    .get('[data-cy="gotogroup"]')
    .click()
 });

 Cypress.Commands.add('submission', (name,mark) => {
  cy
  .get('[data-cy="gotosubmission"]')
  .click()
  .get('[data-cy="submissiontype"]')
  .click()
  .get('[data-cy="submisiontypebtn"]')
  .click()
  .get('[data-cy="name"]').type(name)
  .get('[data-cy="mark"]').type(mark)
  .get('[data-cy="semister"]')
  .click();
  cy.contains('semister_1')
  .then((option) => {
    option[0].click();
  })
  .get('[data-cy="submitbtnsubmissiontype"]')
  .click();

});

Cypress.Commands.add('semister', (name) => {
  cy
  .get('[data-cy="gotosubmission"]')
  .click()
  .get('[data-cy="addnewsemister"]')
  .click()
  .get('[data-cy="submitbtn"]')
  .click()
  // .get('[data-cy="name"]').type(name)
  // .get('[data-cy="mark"]').type(mark)
  // .get('[data-cy="semister"]')
  // .click();
  // cy.contains('semister_1')
  // .then((option) => {
  //   option[0].click();
  // })
  // .get('[data-cy="submitbtnsubmissiontype"]')
  // .click();

});


