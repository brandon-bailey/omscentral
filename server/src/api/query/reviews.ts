import { QueryResolvers } from '../../graphql';
import { Review } from '../../models';
import { searchReviews as search } from '../../functions';

type Resolver = QueryResolvers['reviews'];

export const resolver: Resolver = async (
  _,
  { query, offset, limit, course_id, author_id, semester_ids, order_by_desc },
) => {
  if (query) {
    const ids = await search({ query, offset, limit, sort: order_by_desc });
    return ids.length ? Review.eagerQuery().whereIn('id', ids) : [];
  }
  return Review.eagerQuery().modify((qb) => {
    qb.offset(offset).limit(limit);
    course_id && qb.where('course_id', course_id);
    author_id && qb.where('author_id', author_id);
    semester_ids.length && qb.whereIn('semester_id', semester_ids);
    order_by_desc.forEach((column) => qb.orderBy(column, 'desc'));
  });
};
