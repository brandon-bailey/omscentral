import { notFound } from '@hapi/boom';

import { Review } from '../models';
import { upsertReviewCourseMetrics } from './utils';
import { getReview } from './getReview';

export const deleteReview = async (id: string): Promise<Review> => {
  const review = await getReview(id);
  if (!review) {
    throw notFound();
  }

  await Review.query().deleteById(id);
  await upsertReviewCourseMetrics(review);

  return review;
};
