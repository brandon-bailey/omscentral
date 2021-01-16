/// <reference path="../../support/index.d.ts" />

import { user } from '../../fixtures/user';
import { ReviewInputType } from '../../../src/graphql';

describe('given user is at Reviews page after publishing a review', () => {
  before(() => {
    cy.omsClearLS();
  });

  let review: ReviewInputType;

  beforeEach(() => {
    review = {
      id: '',
      author_id: '',
      course_id: '6400',
      semester_id: 'Fall 2019',
      difficulty: 3,
      workload: 10,
      rating: 4,
      body: `foo bar: ${+new Date()}`,
    };

    cy.omsPrimeLS().omsCreateReview(review, { user });
  });

  afterEach(() => {
    cy.omsCacheLS();
  });

  describe('when page is rendered', () => {
    it('then displays a card for published review w/an edit button', () => {
      cy.omsSortReviewsBy('created')
        .dataCy('review_card')
        .first()
        .within(() => cy.dataCy('review_card:edit_button').should('exist'));
    });
  });

  describe('when edit button is clicked', () => {
    beforeEach(() => {
      cy.omsGoToUpdateReview();
    });

    it(`then navigates to Update Review page`, () => {
      cy.url().should('match', /\/review\/-\w+$/);
    });

    it(`then displays the Review in update mode`, () => {
      cy.dataCy('title').should('have.text', 'Update Review');
      cy.dataCy('review:submit').should('have.text', 'Update');
      cy.dataCy('review:delete').should('have.text', 'Delete');
    });
  });
});
