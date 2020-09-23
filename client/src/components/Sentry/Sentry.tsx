import React, { useContext, useEffect } from 'react';
import * as sentry from '@sentry/browser';

import { AuthContext } from 'src/components/Auth';

const Sentry: React.FC = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    sentry.setUser(
      user && {
        id: user.uid,
        email: user.email || '',
        username: user.displayName || '',
      },
    );
  }, [user]);

  return null;
};

export default Sentry;
