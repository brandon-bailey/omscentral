/// <reference path="../../support/index.d.ts" />

import { ReviewInputType } from '../../../src/graphql';
import { user } from '../../fixtures/user';

describe('given user is at Update Review page', () => {
  before(() => {
    cy.omsClearLS();
  });

  let reviewInitial: ReviewInputType;

  beforeEach(() => {
    reviewInitial = {
      id: '',
      author_id: '',
      course_id: '6400',
      semester_id: 'Fall 2019',
      difficulty: 3,
      workload: 10,
      rating: 4,
      body: `foo bar: ${+new Date()}`,
    };

    cy.omsPrimeLS()
      .omsCreateReview(reviewInitial, { user })
      .omsGoToUpdateReview();
  });

  afterEach(() => {
    cy.omsCacheLS();
  });

  describe('when page is rendered', () => {
    it('then has a title of Update Review', () => {
      cy.dataCy('title').should('have.text', 'Update Review');
    });

    it('then does displays the id field', () => {
      cy.dataCy('review:id').should('exist');
    });
  });

  describe('when user updates the review and presses submit', () => {
    let reviewUpdated: ReviewInputType;

    beforeEach(() => {
      reviewUpdated = {
        id: '',
        author_id: '',
        course_id: '6440',
        semester_id: 'Spring 2020',
        difficulty: 4,
        workload: 20,
        rating: 5,
        body: `bar foo: ${+new Date()}`,
      };

      cy.omsPopulateReview(reviewUpdated).omsSubmitReview();
    });

    it(`then navigates to Course page for the review's course`, () => {
      cy.url().should('match', /\/course\/CS-6440$/);
    });

    it('then displays a success message', () => {
      cy.dataCy('toast').should('contain.text', 'Review updated.');
    });

    it('then displays the updated review', () => {
      cy.omsCheckMostRecentReviewCard(reviewUpdated);
    });
  });
});
