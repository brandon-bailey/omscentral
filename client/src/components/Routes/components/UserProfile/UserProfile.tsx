import React from 'react';
import UserForm from 'src/components/UserForm';
import { UserQuery } from 'src/graphql';

interface Props {
  user?: UserQuery['user'];
}

const UserProfile: React.FC<Props> = ({ user }) =>
  user ? <UserForm user={user} /> : null;

export default UserProfile;
