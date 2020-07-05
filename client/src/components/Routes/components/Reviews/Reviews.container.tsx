import React from 'react';
import { Helmet } from 'react-helmet';

import ReviewCardListConnected from 'src/components/ReviewCardListConnected';

const ReviewsContainer: React.FC = () => (
  <>
    <Helmet title="Reviews">
      <meta name="description" content="Reviews published recently." />
    </Helmet>
    <ReviewCardListConnected />
  </>
);

export default ReviewsContainer;
