import React from 'react';
import ReviewForm from 'src/components/ReviewForm';
import { ReviewQuery } from 'src/graphql';

interface Props {
  review: ReviewQuery['review'];
}

const ReviewUpdate: React.FC<Props> = ({ review }) => (
  <ReviewForm review={review} />
);

export default ReviewUpdate;
