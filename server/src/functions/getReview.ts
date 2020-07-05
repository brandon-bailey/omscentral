import { Review } from '../models';

export const getReview = (id: string) => Review.query().findById(id);
