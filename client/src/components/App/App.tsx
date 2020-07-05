import React, { useContext, Suspense } from 'react';
import { Router } from 'react-router-dom';

import { browserHistory } from 'src/constants';
import { AuthContext } from '../Auth';
import Actions from '../Actions';
import ErrorBoundary from '../ErrorBoundary';
import Loading from '../Loading';
import Navbar from '../Navbar';
import Routes from '../Routes';
import { useStyles } from './App.styles';

const App: React.FC = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  return (
    <Router history={browserHistory}>
      <ErrorBoundary>
        <Navbar />
        {auth.initializing ? (
          <Loading />
        ) : (
          <div className={classes.routes}>
            <Suspense fallback={<Loading />}>
              <Routes />
            </Suspense>
          </div>
        )}
        <Actions />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
