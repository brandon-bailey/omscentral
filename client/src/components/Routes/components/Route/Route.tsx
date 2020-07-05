import React, { useContext } from 'react';
import { Route as RouterRoute, Redirect, RouteProps } from 'react-router';

import { paths } from 'src/constants';
import { AuthContext } from 'src/components/Auth';

interface Props extends RouteProps {
  /**
   * If `true`, user must be logged in.
   * If `false`, user must not be logged in.
   * If `undefined`, auth state does not matter.
   */
  auth?: boolean;
}

const Route: React.FC<Props> = ({ auth, ...props }) => {
  const { authenticated } = useContext(AuthContext);

  const allow =
    typeof auth === 'undefined' || (auth ? authenticated : !authenticated);

  return allow ? (
    <RouterRoute {...props} />
  ) : (
    <Redirect to={auth ? paths.login : paths.landing} />
  );
};

export default Route;
