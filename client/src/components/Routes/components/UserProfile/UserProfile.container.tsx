import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';

import { useUserQuery } from 'src/graphql';
import { AuthContext } from 'src/components/Auth';
import UserProfile from './UserProfile';

const UserProfileContainer: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { data } = useUserQuery({
    variables: {
      id: user!.uid,
    },
    fetchPolicy: 'no-cache',
  });

  return (
    <>
      <Helmet title="My Profile">
        <meta name="description" content="User profile settings." />
      </Helmet>
      <UserProfile user={data?.user} />
    </>
  );
};

export default UserProfileContainer;
