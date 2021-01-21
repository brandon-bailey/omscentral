import { QueryBuilder, SingleQueryBuilder } from 'objection';

import { Review } from '../models';

export const getReview = (
  id: string,
): SingleQueryBuilder<QueryBuilder<Review>> => Review.eagerQuery().findById(id);
