import { notFound, forbidden } from '@hapi/boom';

import { MutationResolvers } from '../../graphql';
import { getReview, deleteReview } from '../../functions';

type Resolver = MutationResolvers['deleteReview'];

export const resolver: Resolver = async (_, { id }, { req }) => {
  const review = await getReview(id).select('author_id');
  if (!review) {
    throw notFound();
  }

  if (review.author_id !== req.userId) {
    throw forbidden();
  }

  return deleteReview(id);
};
