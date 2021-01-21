import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { Helmet } from 'react-helmet';

import Apollo from '../Apollo';
import App from '../App';
import Auth from '../Auth';
import Firebase from '../Firebase';
import Notification from '../Notification';
import Sentry from '../Sentry';
import Theme from '../Theme';

const Root: React.FC = () => (
  <CssBaseline>
    <Theme>
      <Apollo>
        <Firebase>
          <Auth>
            <Notification>
              <Helmet
                titleTemplate="%s | OMSCentral"
                defaultTitle="OMSCentral"
              />
              <Sentry />
              <App />
            </Notification>
          </Auth>
        </Firebase>
      </Apollo>
    </Theme>
  </CssBaseline>
);

export default Root;
