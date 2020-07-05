import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { paths } from 'src/constants';
import Menu from 'src/components/Menu';

const UserMenu: React.FC = () => (
  <Menu
    id="user_menu"
    icon={<AccountCircle />}
    items={[
      { key: 'profile', path: paths.userProfile, caption: 'My Profile' },
      { key: 'reviews', path: paths.userReviews, caption: 'My Reviews' },
    ]}
  />
);

export default UserMenu;
