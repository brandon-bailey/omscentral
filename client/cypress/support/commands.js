// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { reviewMeta } from '../../src/constants/reviewMeta';

Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy="${value}"]`));

const state = {
  localStorage: new Map(),
};

Cypress.Commands.add('omsCacheLS', () => {
  Object.keys(localStorage).forEach((key) => {
    state.localStorage.set(key, localStorage.getItem(key));
  });
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsPrimeLS', () => {
  for (const [key, value] of state.localStorage) {
    localStorage.setItem(key, value);
  }
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsClearLS', () => {
  cy.clearLocalStorage();
  localStorage.clear();
  state.localStorage.clear();
  return cy.wait(WAIT_MS);
});

const WAIT_MS = 250;

Cypress.Commands.add('omsGoTo', (path) => {
  cy.visit(path);
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsGoToProfile', () => {
  cy.dataCy('user_menu_icon').click();
  cy.dataCy('user_menu_profile').click();
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsGoToCreateReview', () => {
  cy.dataCy('actions').children('button').click();
  cy.dataCy('action:create_review').click();
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsGoToUpdateReview', () => {
  cy.omsSortReviewsBy('created');
  cy.dataCy('review_card')
    .first()
    .within(() => cy.dataCy('review_card:edit_button').click());
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsPopulateReview', (review) => {
  cy.dataCy('review:course_id').type(`${review.course_id}\n`);
  cy.dataCy('review:semester_id').find('select').select(review.semester_id);
  cy.dataCy('review:difficulty')
    .find('select')
    .select(reviewMeta.translateDifficulty(review.difficulty));
  cy.dataCy('review:workload').type('{selectall}{backspace}');
  cy.dataCy('review:workload').type(`${review.workload}`);
  cy.dataCy('review:rating')
    .find('select')
    .select(reviewMeta.translateRating(review.rating));
  cy.dataCy('review:body').type('{selectall}{backspace}');
  cy.dataCy('review:body').type(review.body);
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsSubmitReview', () => {
  cy.dataCy('review:submit').click();
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsCreateReview', (review, options = {}) => {
  if (options.user) {
    cy.omsGoTo('/login').omsLogin(options.user.email, options.user.password);
  }

  cy.omsGoToCreateReview();
  cy.omsPopulateReview(review);
  cy.omsSubmitReview();
});

Cypress.Commands.add('omsSortReviewsBy', (key) => {
  cy.dataCy(`sort_by:${key}`).click({ force: true });
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsCheckMostRecentReviewCard', (review) => {
  cy.omsSortReviewsBy('created');
  cy.dataCy('review_card')
    .first()
    .within(() => {
      cy.dataCy('review_card:content').should('contain.text', review.body);
      cy.dataCy('review_card:difficulty').should(
        'contain.text',
        reviewMeta.translateDifficulty(review.difficulty),
      );
      cy.dataCy('review_card:semester').should(
        'contain.text',
        review.semester_id,
      );
      cy.dataCy('review_card:rating').should(
        'contain.text',
        reviewMeta.translateRating(review.rating),
      );
      cy.dataCy('review_card:workload').should(
        'contain.text',
        `${review.workload} hrs/wk`,
      );
    });
});

Cypress.Commands.add('omsLogin', (email, password) => {
  cy.dataCy('login:email').type(email);
  cy.dataCy('login:password').type(password);
  cy.dataCy('login:submit').click();
  return cy.wait(WAIT_MS * 4);
});

Cypress.Commands.add('omsRegister', (email, password) => {
  cy.dataCy('register:email').type(email);
  cy.dataCy('register:password').type(password);
  cy.dataCy('register:submit').click();
  return cy.wait(WAIT_MS);
});

Cypress.Commands.add('omsLogout', () => {
  cy.dataCy('logout').click();
  return cy.wait(WAIT_MS);
});
