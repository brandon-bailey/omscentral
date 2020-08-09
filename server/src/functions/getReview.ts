import { Review } from '../models';

export const getReview = (id: string) => Review.eagerQuery().findById(id);
