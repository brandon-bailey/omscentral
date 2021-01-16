/// <reference path="../../support/index.d.ts" />

import { TestUser, generateTestUser } from '../../fixtures/user';

describe('given user is at Register page', () => {
  beforeEach(() => {
    cy.omsGoTo('/register');
  });

  describe('when page is rendered', () => {
    it('then has a title of Register', () => {
      cy.dataCy('title').should('have.text', 'Register');
    });
  });

  describe('when valid information is submitted', () => {
    let user: TestUser;

    beforeEach(() => {
      user = generateTestUser();
      cy.omsRegister(user.email, user.password);
    });

    it('then displays a success message', () => {
      cy.dataCy('toast').should('contain.text', `Registered as ${user.email}.`);
    });

    it('then displays the user menu icon in navbar', () => {
      cy.dataCy('navbar').dataCy('user_menu_icon').should('exist');
    });

    it('then navigates to Courses page', () => {
      cy.dataCy('courses').should('exist');
    });
  });

  describe('when registering with an account that already exists', () => {
    let user: TestUser;

    beforeEach(() => {
      user = generateTestUser();
      cy.omsRegister(user.email, user.password)
        .omsLogout()
        .omsGoTo('/register')
        .omsRegister(user.email, user.password);
    });

    it('then displays an error message', () => {
      cy.dataCy('toast').should(
        'contain.text',
        'The email address is already in use by another account.',
      );
    });
  });

  describe('when login is clicked', () => {
    it('then navigates to Login page', () => {
      cy.dataCy('register:login').click();
      cy.url().should('match', /\/login$/);
    });
  });
});
