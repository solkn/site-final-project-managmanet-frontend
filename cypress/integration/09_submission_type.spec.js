/* eslint-disable no-undef */
/* eslint-disable jest/valid-title */

describe('renders submission type page',()=>{

it('it must log into the system with correct username and password',()=>{
        cy.login('staff1','Y4CF3472sD');
     });

    it('it must not add submission type with empty name',()=>{
    cy
    .get('[data-cy="gotosubmission"]')
    .click()
    .get('[data-cy="submissiontype"]')
    .click()
    .get('[data-cy="submisiontypebtn"]')
    .click()
    .get('[data-cy="name"]').should('not.be.empty')
    .get('[data-cy="mark"]').type(50)
    .get('[data-cy="semister"]')
    .click();
    cy.contains('semister_1')
    .then((option) => {
        option[0].click();
    })
    .get('[data-cy="submitbtnsubmissiontype"]')
    .click();
     cy.get('[data-cy="cancel"]')
     .click()
     

    });
    
    it('it must log into system with correct username and password',()=>{
        cy.login('staff1','Y4CF3472sD');
     });

     it('it must not add submission type with invalid name',()=>{
        cy
        .get('[data-cy="gotosubmission"]')
        .click()
        .get('[data-cy="submissiontype"]')
        .click()
        .get('[data-cy="submisiontypebtn"]')
        .click()
        .get('[data-cy="name"]').type('aaaa')
        .get('[data-cy="mark"]').type(50)
        .get('[data-cy="semister"]')
        .click();
        cy.contains('semister_1')
        .then((option) => {
            option[0].click();
        })
        .get('[data-cy="submitbtnsubmissiontype"]')
        .click();
         cy.get('[data-cy="cancel"]')
         .click()
         
    
        });

        it('it must log to the system with correct username and password',()=>{
            cy.login('staff1','Y4CF3472sD');
         });

    it('it must add submission type with valid inputs',()=>{
        cy.submission('cypress3',50);

    });
    

 


});