import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { paths } from 'src/constants';
import Menu from 'src/components/Menu';

const UserMenu: React.FC = () => (
  <Menu
    data-cy="user_menu"
    id="user_menu"
    icon={<AccountCircle data-cy="user_menu_icon" />}
    items={[
      { key: 'profile', path: paths.userProfile, caption: 'My Profile' },
      { key: 'reviews', path: paths.userReviews, caption: 'My Reviews' },
    ]}
  />
);

export default UserMenu;
