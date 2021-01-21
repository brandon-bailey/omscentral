import React, { useContext } from 'react';
import assignDefined from 'src/core/utils/assignDefined';
import {
  useProgramsQuery,
  UserInputType,
  UserQuery,
  useSpecializationsQuery,
  useUpdateUserMutation,
} from 'src/graphql';

import { AuthContext } from '../Auth';
import { NotificationContext } from '../Notification';
import UserForm from './UserForm';

interface Props {
  user: UserQuery['user'];
}

const UserFormContainer: React.FC<Props> = ({ user }) => {
  const notification = useContext(NotificationContext)!;
  const auth = useContext(AuthContext);
  const mode = auth.user?.uid === user.id ? 'edit' : 'view';

  const [programs, specializations] = [
    useProgramsQuery(),
    useSpecializationsQuery(),
  ];

  const [update, { loading }] = useUpdateUserMutation();

  const handleSubmit = async (data: UserInputType) => {
    try {
      const { __typename, ...rest } = user;
      await update({ variables: { user: assignDefined(rest, data) } });
      notification.success('User updated.');
    } catch {
      notification.error('Something went wrong.');
    }
  };

  if (!programs.data?.programs || !specializations.data?.specializations) {
    return null;
  }

  return (
    <UserForm
      data={{ ...programs.data, ...specializations.data }}
      mode={mode}
      user={user}
      disabled={loading}
      onSubmit={handleSubmit}
    />
  );
};

export default UserFormContainer;
