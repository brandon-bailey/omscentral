import React from 'react';
import { render } from 'react-dom';
import * as sentry from '@sentry/browser';

import { sentryConfig } from 'src/config';

import Root from './components/Root';

sentry.init(sentryConfig);

window.addEventListener(
  'unhandledrejection',
  (event: PromiseRejectionEvent) => {
    sentry.captureMessage('unhandledrejection', {
      level: sentry.Severity.Info,
    });

    event.preventDefault();
  },
);

render(<Root />, document.getElementById('root'));
