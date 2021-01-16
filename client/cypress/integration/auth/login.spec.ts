/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';

describe('given user is at Login page', () => {
  beforeEach(() => {
    cy.omsGoTo('/login');
  });

  describe('when page is rendered', () => {
    it('then has a title of Login', () => {
      cy.dataCy('title').should('have.text', 'Login');
    });

    ['facebook', 'github', 'google', 'twitter'].forEach((network) => {
      it(`then displays a social login button for ${network}`, () => {
        cy.dataCy(`login_social_${network}`).should('not.be.disabled');
      });
    });
  });

  [user].forEach(({ email, password }) => {
    describe(`when logging in as ${email}`, () => {
      beforeEach(() => {
        cy.omsLogin(email, password);
      });

      it('then displays the user menu icon in navbar', () => {
        cy.dataCy('navbar').dataCy('user_menu_icon').should('exist');
      });

      it('then navigates to Courses page', () => {
        cy.dataCy('courses').should('exist');
      });
    });
  });

  describe('when logging in with an account that does not exist', () => {
    beforeEach(() => {
      cy.omsLogin('doesnotexist@omscentral.com', '12341234');
    });

    it('then displays an error message', () => {
      cy.dataCy('toast').should(
        'contain.text',
        'There is no user record corresponding to this identifier. The user may have been deleted.',
      );
    });
  });

  describe('when forgot password is clicked', () => {
    it('then navigates to Reset Password page', () => {
      cy.dataCy('login:forgot_pw').click();
      cy.url().should('match', /\/reset-password$/);
    });
  });

  describe('when register is clicked', () => {
    it('then navigates to Register page', () => {
      cy.dataCy('login:register').click();
      cy.url().should('match', /\/register$/);
    });
  });
});
