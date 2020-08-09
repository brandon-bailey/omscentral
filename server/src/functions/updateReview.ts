import { PartialModelObject as PMO } from 'objection';

import { Review } from '../models';
import { indexReview } from './indexReviews';
import { upsertReviewCourseMetrics } from './utils';

export const updateReview = async (review: PMO<Review>): Promise<Review> => {
  const updated = await Review.eagerQuery().updateAndFetchById(
    review.id as string,
    review,
  );

  await Promise.all([
    upsertReviewCourseMetrics(updated),
    indexReview(updated, 'update'),
  ]);

  return updated;
};
