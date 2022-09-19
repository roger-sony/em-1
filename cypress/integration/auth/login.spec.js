describe('Auth - Login', () => {
  it('enters wrong credentials', () => {
    cy.visitOphanim();
    cy.url().should('include', '/login');

    cy.get('[data-test="login-form-username"]').type('nonexistinguser');
    cy.get('[data-test="login-form-password"]').type('asdmfdmmd{enter}');

    cy.wait('@login').its('status').should('eq', 400);

    cy.get('[data-test="login-form-error"]').should('exist');
  });

  it('logs in and logs out', () => {
    cy.visitOphanim('login');

    cy.get('[data-test="login-form-username"]').type(Cypress.env('username'));
    cy.get('[data-test="login-form-password"]').type(Cypress.env('password'));
    cy.get('[data-test="login-form-submit-button"]').click();

    cy.wait('@login').its('status').should('eq', 200);

    cy.url()
      .should('include', '/dashboard')
      .and(() => {
        const currentUser = window.localStorage.getItem('currentUser');
        expect(currentUser).to.be.a('string');
        expect(JSON.parse(currentUser)).to.include({username: Cypress.env('username')});
      });
    cy.get('h1').contains('Welcome to Ophanim II');

    cy.get('[data-test="logout-button"]').click();
    cy.url()
      .should('include', '/login')
      .and(() => {
        const currentUser = window.localStorage.getItem('currentUser');
        expect(currentUser).to.be.null;
      });
  });
});
