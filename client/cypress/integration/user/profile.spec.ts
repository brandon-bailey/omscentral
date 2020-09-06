/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';

describe('given user is at Profile page', () => {
  before(() => {
    cy.omsClearLS();
  });

  beforeEach(() => {
    cy.omsGoTo('/login').omsLogin(user.email, user.password).omsGoToProfile();
  });

  beforeEach(() => {
    cy.omsPrimeLS();
  });

  afterEach(() => {
    cy.omsCacheLS();
  });

  describe('when page is rendered', () => {
    it('then has a title of Update User', () => {
      cy.dataCy('title').should('have.text', 'Update User');
    });

    it('then displays id, auth provider, email, name fields', () => {
      cy.dataCy('user_id').should('exist');
      cy.dataCy('user_auth_provider').should('exist');
      cy.dataCy('user_email').should('exist');
      cy.dataCy('user_name').should('exist');
    });
  });

  describe('when valid information is submitted', () => {
    beforeEach(() => {
      cy.dataCy('user_program_id').find('select').select('cybersec');
      cy.dataCy('user_specialization_id').find('select').select('cybersec:IS');
      cy.dataCy('user_submit').click();
    });

    it('then displays a success message', () => {
      cy.dataCy('toast').should('contain.text', 'User updated.');
    });
  });
});
