import { notFound } from '@hapi/boom';

import { Review } from '../models';
import { getReview } from './getReview';
import { unindexReview } from './indexReviews';
import { upsertReviewCourseMetrics } from './utils';

export const deleteReview = async (id: string): Promise<Review> => {
  const review = await getReview(id);
  if (!review) {
    throw notFound();
  }

  await Review.query().deleteById(id);
  await Promise.all([upsertReviewCourseMetrics(review), unindexReview(review)]);

  return review;
};
