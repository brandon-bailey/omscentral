import React from 'react';
import { Helmet } from 'react-helmet';

import ReviewCreate from './ReviewCreate';

const ReviewCreateContainer: React.FC = () => (
  <>
    <Helmet title="Create Review">
      <meta name="description" content="Review form for publishing a review." />
    </Helmet>
    <ReviewCreate />
  </>
);

export default ReviewCreateContainer;
