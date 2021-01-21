import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from 'src/components/Auth';
import ReviewCardListConnected from 'src/components/ReviewCardListConnected';

const UserReviewsContainer: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Helmet title="My Reviews">
        <meta name="description" content="User's published reviews." />
      </Helmet>
      <ReviewCardListConnected
        variables={{ author_ids: [user!.uid] }}
        pagination={false}
      />
    </>
  );
};

export default UserReviewsContainer;
