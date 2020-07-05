import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import * as sentry from '@sentry/browser';

import { apolloConfig } from 'src/config';
import { browserHistory, paths } from 'src/constants';

/* eslint-disable no-useless-computed-key */
const errorCodes: { [key: string]: number } = {
  ['Bad Request']: 400,
  ['Forbidden']: 403,
  ['Not Found']: 404,
};
/* eslint-enable no-useless-computed-key */

const error = onError(({ networkError, graphQLErrors, operation }) => {
  sentry.captureException(null, {
    extra: {
      networkError,
      graphQLErrors,
      operation,
    },
  });

  const { message } = (graphQLErrors || [])[0] || {};
  const code = errorCodes[message] || 500;
  browserHistory.push(paths.error.replace(':code', String(code)));
});

const before = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: localStorage.getItem('token') || null,
    },
  });

  return forward(operation);
});

const http = new HttpLink({
  uri: apolloConfig.uri,
});

const client = new ApolloClient({
  link: ApolloLink.from([error, before, http]),
  cache: new InMemoryCache(),
});

export default client;
