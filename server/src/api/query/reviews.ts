import { QueryResolvers } from '../../graphql';
import { Review } from '../../models';

type Resolver = QueryResolvers['reviews'];

export const resolver: Resolver = (
  _,
  { order_by_desc, offset, limit, course_id, author_id, semester_ids },
) =>
  Review.eagerQuery()
    .modify((qb) =>
      order_by_desc.forEach((column) => qb.orderBy(column, 'desc')),
    )
    .offset(offset)
    .limit(limit)
    .modify((qb) => course_id && qb.where('course_id', course_id))
    .modify((qb) => author_id && qb.where('author_id', author_id))
    .modify(
      (qb) => semester_ids.length && qb.whereIn('semester_id', semester_ids),
    );
