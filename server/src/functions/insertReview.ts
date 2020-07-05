import { PartialModelObject as PMO } from 'objection';
import { Review } from '../models';
import { id } from '../utils';
import { upsertReviewCourseMetrics } from './utils';

export const insertReview = (review: PMO<Review>): Promise<Review> =>
  Review.query()
    .insertAndFetch({ ...review, id: id() })
    .then(upsertReviewCourseMetrics);
