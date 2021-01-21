import { badRequest, forbidden, notFound } from '@hapi/boom';

import { getReview, updateReview } from '../../functions';
import { MutationResolvers } from '../../graphql';
import { reviewSchema } from '../schema';

type Resolver = MutationResolvers['updateReview'];

export const resolver: Resolver = async (_, { review }, { req }) => {
  const existing = await getReview(review.id).select('author_id');
  if (!existing) {
    throw notFound();
  }

  if (existing.author_id !== req.userId) {
    throw forbidden();
  }

  if (existing.author_id !== review.author_id) {
    throw badRequest();
  }

  const { value, error } = await reviewSchema.validate(review);
  if (error) {
    throw badRequest(error.message);
  }

  return updateReview(value);
};
