/* eslint-disable jest/valid-title */
/* eslint-disable no-undef */

describe('renders staff registeration page',()=>{

    beforeEach(()=>{
        cy.login('yideg','PASSabc123!');

    });

    it('it must not register  with empty first name and all field valid',()=>{
        cy
        .get('[data-cy="tostaff"]')
        .click()
        .get('[data-cy="addstaffbtn"]')
        .click()
        .get('[data-cy="username"]').type('Ana')
        .get('[data-cy="email"]').type('ana@gmail.com')
        .get('[data-cy="first_name"]').should('not.be.empty')
        .get('[data-cy="last_name"]').type('anana')
        .get('[data-cy="staffregisterbtn"]')
        .click();
    
     });
    
    it('it must not register  with invalid first name and all field valid',()=>{
        cy.register('Ababe23$#%','abebe@gmail.com','Abebe','Abebe2');
    });
    
    it('it must not register  with with valid first name and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
   
    it('it must not register  with with empty last name and all field valid',()=>{
        cy
        .get('[data-cy="tostaff"]')
        .click()
        .get('[data-cy="addstaffbtn"]')
        .click()
        .get('[data-cy="username"]').type('Ana')
        .get('[data-cy="email"]').type('ani@gmail.com')
        .get('[data-cy="first_name"]')
        .get('[data-cy="last_name"]').type('anana').should('not.be.empty')
        .get('[data-cy="staffregisterbtn"]')
        .click();
    });
    
    it('it must not register  with with invalid Last Name and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
  
    it('it must not register  with with valid Last Name and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
   
    it('it must not register  with empty  UserName and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
   
    it('it must not register  with invalid  UserName and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
  
    it('it must not register  with valid  UserName and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
   
    it('it must not register  with empty Password and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
   
    it('it must not register  with invalid Password and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
   
    it('it must not register  with valid Password and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
   
    it('it must not register  with empty email and all field valid',()=>{
        cy
        .get('[data-cy="tostaff"]')
        .click()
        .get('[data-cy="addstaffbtn"]')
        .click()
        .get('[data-cy="username"]').type('Ana')
        .get('[data-cy="email"]').should('not.be.empty')
        .get('[data-cy="first_name"]').type('ani')
        .get('[data-cy="last_name"]').type('anana')
        .get('[data-cy="staffregisterbtn"]')
        .click();
    });
  
    it('it must not register  with invalid email and all field valid',()=>{
        cy.register('Ababe','abebe@gmail.com','Abebe','Abebe2');
    });
  

    it('it must  register staff with valid username and all field valid',()=>{
        cy.register('Ababee','abebee@gmail.com','Abebe','Abebe2');
    });
    

});