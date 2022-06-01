
describe('renders view group page',()=>{
    it('it must log into the system with correct username and password',()=>{
        cy.login('staff1','Y4CF3472sD');
    });
    
    it('it must show groups list',()=>{
        cy.viewgroups();

    });


});