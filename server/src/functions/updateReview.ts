import { PartialModelObject as PMO } from 'objection';
import { Review } from '../models';
import { upsertReviewCourseMetrics } from './utils';

export const updateReview = (review: PMO<Review>): Promise<Review> =>
  Review.query()
    .updateAndFetchById(review.id as string, review)
    .then(upsertReviewCourseMetrics);
