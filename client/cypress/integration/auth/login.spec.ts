/// <reference path="../../support/index.d.ts" />

import users from '../../fixtures/users';

describe('auth : login', () => {
  beforeEach(() => {
    cy.clearCookies().clearLocalStorage();
    cy.visit('/login');
    cy.dataCy('header').should('have.text', 'Login');
  });

  users.forEach(({ email, password }) => {
    describe(`when logging in as ${email}`, () => {
      beforeEach(() => {
        cy.login(email, password);
      });

      afterEach(() => {
        cy.logout();
      });

      it('then navigates to courses page', () => {
        cy.dataCy('courses').should('exist');
      });

      it('then displays the user menu icon in navbar', () => {
        cy.dataCy('navbar').dataCy('user_menu_icon').should('exist');
      });
    });
  });

  describe('when forgot password is clicked', () => {
    it('then navigates to reset password page', () => {
      cy.dataCy('login_forgot_pw').click();
      cy.url().should('match', /\/reset-password$/);
    });
  });

  describe('when register is clicked', () => {
    it('then navigates to registration page', () => {
      cy.dataCy('login_register').click();
      cy.url().should('match', /\/register$/);
    });
  });
});
