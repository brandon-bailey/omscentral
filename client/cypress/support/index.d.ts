/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     *
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;

    /**
     * Custom command to sign in to the application.
     *
     * @param email
     * @param password
     */
    login(email: string, password: string): void;

    /**
     * Custom command to sign out of the application.
     */
    logout(): void;
  }
}
