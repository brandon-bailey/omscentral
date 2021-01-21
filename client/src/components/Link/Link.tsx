import MaterialLink from '@material-ui/core/Link';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';

const Link: React.FC<LinkProps & { to: string | null }> = (props) => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const { to } = props;
    if (to === '') {
      history.goBack();
    } else if (/^http(s?):\/\//.test(to)) {
      firebase.analytics.logEvent('screen_view', {
        app_name: 'external_link',
        screen_name: to,
      });
      window.open(to); // eslint-disable-line
    } else {
      history.push(to);
    }
  };

  return (
    <RouterLink component={MaterialLink} {...props} onClick={handleClick} />
  );
};

export default Link;
