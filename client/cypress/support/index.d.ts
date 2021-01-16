/// <reference types="cypress" />

import { ReviewInputType } from '../../src/graphql';
import { TestUser } from '../fixtures/user';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       *
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<Element>;

      omsCacheLS(): Cypress.cy;
      omsPrimeLS(): Cypress.cy;
      omsClearLS(): Cypress.cy;

      omsGoTo(path: string): Cypress.cy;
      omsGoToProfile(): Cypress.cy;
      omsGoToCreateReview(): Cypress.cy;
      omsGoToUpdateReview(): Cypress.cy;

      omsPopulateReview(review: ReviewInputType): Cypress.cy;
      omsSubmitReview(): Cypress.cy;

      omsCreateReview(
        review: ReviewInputType,
        options?: {
          user?: TestUser;
        },
      ): Cypress.cy;

      omsSortReviewsBy(key: string): Cypress.cy;
      omsCheckMostRecentReviewCard(review: ReviewInputType): Cypress.cy;

      omsLogin(email: string, password: string): Cypress.cy;
      omsRegister(email: string, password: string): Cypress.cy;
      omsLogout(): Cypress.cy;
    }
  }
}
