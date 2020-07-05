import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import { useReviewQuery } from 'src/graphql';
import ReviewUpdate from './ReviewUpdate';

const ReviewUpdateContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useReviewQuery({
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
  });

  return (
    <>
      <Helmet title="Update Review">
        <meta name="description" content="Review form for making updates." />
      </Helmet>
      {data?.review ? <ReviewUpdate review={data.review} /> : null}
    </>
  );
};

export default ReviewUpdateContainer;
