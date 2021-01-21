import { notFound } from '@hapi/boom';

import { getReview } from '../../functions';
import { QueryResolvers } from '../../graphql';

type Resolver = QueryResolvers['review'];

export const resolver: Resolver = async (_, { id }) => {
  const review = await getReview(id);
  if (!review) {
    throw notFound();
  }
  return review;
};
