import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from 'firebase/app';

import { Nullable } from 'src/core';
import { useUpsertUserMutation } from 'src/graphql';
import apollo from 'src/data/apollo';
import { FirebaseContext } from '../Firebase';
import { toInput } from './Auth.utils';

interface State {
  initializing: boolean;
  authenticated: boolean;
  user: Nullable<User>;
}

const initialState: State = {
  initializing: true,
  authenticated: false,
  user: null,
};

export const AuthContext = createContext<State>(initialState);

const Auth: React.FC = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState<State>(initialState);
  const [upsertUser] = useUpsertUserMutation();

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (authUser) => {
      apollo.resetStore();

      setState({
        initializing: false,
        authenticated: Boolean(authUser),
        user: authUser,
      });

      if (!authUser) {
        localStorage.setItem('token', '');
        return;
      }

      localStorage.setItem('token', await authUser.getIdToken());

      const result = await upsertUser({
        variables: {
          user: toInput(authUser),
        },
      });

      if (result.errors && result.errors.length) {
        await firebase.auth.signOut();
        return;
      }

      const user = result.data!.upsertUser;
      firebase.analytics.setUserId(user.id, { global: true });
      firebase.analytics.setUserProperties({ email: user.email });
      firebase.analytics.logEvent('login', { method: user.auth_provider });
      if (!user.updated) {
        firebase.analytics.logEvent('sign_up', { method: user.auth_provider });
      }
    });
  }, [firebase, upsertUser]);

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};

export default Auth;
