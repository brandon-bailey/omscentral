import React, { useContext, useEffect } from 'react';
import * as sentry from '@sentry/browser';

import { AuthContext } from 'src/components/Auth';
import { sentryConfig } from 'src/config';

const Sentry: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { dsn } = sentryConfig;

  if (dsn) {
    sentry.init({ dsn });
  }

  useEffect(() => {
    dsn &&
      sentry.setUser(
        user && {
          id: user.uid,
          email: user.email || '',
          username: user.displayName || '',
        },
      );
  }, [user, dsn]);

  return null;
};

export default Sentry;
