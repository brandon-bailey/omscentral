/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';

describe('given user is at Create Review page', () => {
  before(() => {
    cy.omsClearLS();
  });

  beforeEach(() => {
    cy.omsGoTo('/login')
      .omsLogin(user.email, user.password)
      .omsGoToCreateReview();
  });

  beforeEach(() => {
    cy.omsPrimeLS();
  });

  afterEach(() => {
    cy.omsCacheLS();
  });

  describe('when page is rendered', () => {
    it('then has a title of Create Review', () => {
      cy.dataCy('title').should('have.text', 'Create Review');
    });

    it('then does not display the id field', () => {
      cy.dataCy('review_id').should('not.exist');
    });
  });

  describe('when valid information is submitted', () => {
    let body: string;

    beforeEach(() => {
      body = `foo bar: ${+new Date()}`;
      cy.dataCy('review_course_id').type('6400\n');
      cy.dataCy('review_semester_id').find('select').select('Fall 2019');
      cy.dataCy('review_difficulty').find('select').select('Medium');
      cy.dataCy('review_workload').type('13');
      cy.dataCy('review_rating').find('select').select('Liked');
      cy.dataCy('review_body').type(body);
      cy.dataCy('review_submit').click();
    });

    it(`then navigates to the Reviews page for the review's course`, () => {
      cy.url().should('match', /\/course\/CS-6400$/);
    });

    it('then displays a success message', () => {
      cy.dataCy('toast').should('contain.text', 'Review published.');
    });

    it('then creates the review', () => {
      cy.dataCy('sort_by_created').click({ force: true }).wait(1000);
      cy.dataCy('review_card_content').first().should('contain.text', body);
    });
  });
});
