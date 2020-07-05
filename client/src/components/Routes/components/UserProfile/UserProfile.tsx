import React from 'react';

import { UserQuery } from 'src/graphql';
import UserForm from 'src/components/UserForm';

interface Props {
  user?: UserQuery['user'];
}

const UserProfile: React.FC<Props> = ({ user }) =>
  user ? <UserForm user={user} /> : null;

export default UserProfile;
