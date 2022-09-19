describe('Dashboard - Notifications', () => {
  it('loads notifications table', () => {
    cy.logInAndVisitOphanim();
    cy.url().should('include', '/dashboard');
  });
});
