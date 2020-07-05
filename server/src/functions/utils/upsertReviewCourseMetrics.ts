import { Review } from '../../models';
import { upsertCourseMetrics } from '../upsertCourseMetrics';

export const upsertReviewCourseMetrics = (review: Review): Promise<Review> =>
  upsertCourseMetrics(review.course_id).then(() => review);
