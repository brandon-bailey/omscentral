import React from 'react';
import { Helmet } from 'react-helmet';

import ReviewCardListConnected from 'src/components/ReviewCardListConnected';
import useQueryParams from 'src/core/hooks/useQueryParams';

const ReviewsContainer: React.FC = () => {
  const { query } = useQueryParams<{ query: string }>();

  return (
    <>
      <Helmet title="Reviews">
        <meta name="description" content="Reviews published recently." />
      </Helmet>
      <ReviewCardListConnected variables={{ query }} />
    </>
  );
};

export default ReviewsContainer;
