import React from 'react';

import { ReviewQuery } from 'src/graphql';
import ReviewForm from 'src/components/ReviewForm';

interface Props {
  review: ReviewQuery['review'];
}

const ReviewUpdate: React.FC<Props> = ({ review }) => (
  <ReviewForm review={review} />
);

export default ReviewUpdate;
